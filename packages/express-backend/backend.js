import cors from "cors";
import productService from "./services/product-service.js";
import userService from "./services/user-service.js";
import express from "express";
import multer from "multer";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Routes
const upload = multer({ dest: "uploads/" });
app.use('/uploads', express.static('uploads'))

app.post("/profile-picture", upload.single("profilePicture"), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send("No file uploaded");
    return;
  }

  try {
    const result = await userService.uploadProfilePicture(file);
    const user = await userService.getUsers(req.body.username, undefined, undefined);
    
    const pfp = { profilePicture : result._id }

    fetch(`http://localhost:8000/users/${user[0]._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pfp),
    });
    res.status(201).send(result._id.toString());
  } catch (error) {
    res.status(500).send(error.name);
  }
});

app.patch("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService.changeUserProfilePicture(id, req.body.profilePicture)
               .then((result) => {
                 if (result) {
                   res.send(result);
                 }
                 else {
                   res.status(404).send(`Not found: ${id}`);
                 }
               })
               .catch((error) => {
                console.log(error);
                 res.status(500).send(error);
               });
});

app.get("/profile-picture/:id", (req, res) => {
  const id = req.params["id"];
  userService.findProfilePictureById(id)
               .then((result) => {
                 if (result) {
                   res.contentType(result.contentType)
                   res.send(result.data);
                 }
                 else {
                   res.status(404).send(`Not found: ${id}`);
                 }
               })
               .catch((error) => {
                 res.status(500).send(error.name);
               });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService.addUser(userToAdd)
               .then((result) => {
                   res.status(201).send(result);
               })
               .catch((error) => {
                 res.status(500).send(error);
               });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService.findUserById(id)
               .then((result) => {
                 if (result) {
                   res.send(result);
                 }
                 else {
                   res.status(404).send(`Not found: ${id}`);
                 }
               })
               .catch((error) => {
                 res.status(500).send(error.name);
               });
});

app.post("/login", (req, res) => {
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  userService.getPassword(username)
    .then((result) => {
      if (result !== null && result.password === password) {
        userService.generateAccessToken(username)
        .then((token) => {
          res.status(200).send(token);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
      }
      else {
        res.status(401).send("Invalid Username or Password");
      }
      })
    .catch((error) => {
      res.status(500).send(error);
      });
});

app.delete("/products/:id", (req, res) => {
  const id = req.params["id"];
  productService.removeProduct(id)
                .then((result) => {
                  res.status(204).send(result);
                })
                .catch((error) => {
                  res.status(500).send(error.name);
                });
});

app.post("/products", (req, res) => {
  const productToAdd = req.body;
  productService.addProduct(productToAdd)
               .then((result) => {
                   res.status(201).send(result);
               })
               .catch((error) => {
                 res.status(500).send(error.name);
               });
});

app.get("/products/:id", (req, res) => {
  const id = req.params["id"];
  productService.findProductById(id)
               .then((result) => {
                 if (result) {
                   res.send(result);
                 }
                 else {
                   res.status(404).send(`Not found: ${id}`);
                 }
               })
               .catch((error) => {
                 res.status(500).send(error.name);
               });
});

app.get("/products", (req, res) => {
  const product = req.query.product;
  const quantity = req.query.quantity;
  productService.getProducts(product, quantity)
               .then((result) => {
                   res.send(result);
               })
               .catch((error) => {
                 res.status(500).send(error.name);
               });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

