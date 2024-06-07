import cors from "cors";
import orderService from "./services/order-service.js";
import orderUnitService from "./services/order-unit-service.js";
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
app.use("/uploads", express.static("uploads"));

app.post(
  "/profile-picture",
  upload.single("profilePicture"),
  userService.authenticateUser,
  async (req, res) => {
    const file = req.file;
    const id = req.userID;
    if (!file) {
      res.status(400).send("No file uploaded");
      return;
    }

    try {
      const result = await userService.uploadProfilePicture(file);
      const user = await userService.findUserById(id);

      const pfp = { profilePicture: result._id };

      fetch(`safehaven307.azurewebsites.net/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pfp)
      });
      res.status(201).send(result._id.toString());
    } catch (error) {
      res.status(500).send(error.name);
    }
  }
);

app.patch("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService
    .changeUserProfilePicture(id, req.body.profilePicture)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
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
  userService
    .findProfilePictureById(id)
    .then((result) => {
      if (result) {
        res.contentType(result.contentType);
        res.send(result.data);
      } else {
        res.status(404).send(`Not found: ${id}`);
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.post("/users", (req, res) => { 
  userService.signupUser(req, res);
});

app.post("/users/profile", userService.authenticateUser, (req, res) => {
  const { bio, skills } = req.body; // from form
  const id = req.userID;
  userService.editProfile(id, bio, skills)
  .then((result) => {
    if (result) {
      res.send(result);
    } else {
      res.status(404).send(`Not found: ${id}`);
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
});

app.get("/user-stats", userService.authenticateUser, (req, res) => {
  const id = req.userID;
  userService.getProductOrderCounts(id).then(result => {
    res.send(result)
  })
})

app.get("/users", userService.authenticateUser, (req, res) => {
  const id = req.userID;
  userService
    .findUserById(id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send(`Not found: ${id}`);
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.get("/users/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  userService
    .findUserById(id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send(`Not found: ${id}`);
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.post("/login", (req, res) => {
  userService.loginUser(req, res);
});

app.delete("/users", userService.authenticateUser, (req, res) => {
  const id = req.userID;
  userService
  .removeUser(id)
  .then((result) => {
    res.status(204).send(result);
  })
  .catch((error) => {
    res.status(500).send(error.name);
  });
});

app.delete("/products/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  const userID = req.userID;
  console.log(userID);
  productService
    .removeProduct(id)
    .then((result) => {
      console.log("plz");
      userService.removeProductFromUserID(userID, id).then((Result) => {
        console.log("hi");
        res.status(204).send(Result);
      });
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.post("/products", userService.authenticateUser, (req, res) => {
  const productToAdd = req.body;
  productService
    .addProduct(productToAdd)
    .then((result) => {
      const UserID = req.userID;
      userService.addProductToUser(UserID, result.id);
      console.log(result);
      res.status(201).send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.name);
    });
});

app.get("/products/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  productService
    .findProductById(id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send(`Not found: ${id}`);
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.patch("/products/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  const productChanges = req.body;
  productService
    .changeProductById(id, productChanges)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send(`Not found: ${id}`);
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.get("/products", userService.authenticateUser, async (req, res) => {
  // const product = req.query.product;
  // const quantity = req.query.quantity;
  const UserID = req.userID;
  try {
    const user = await userService.findUserById(UserID);
    productService.findProductsByIds(user.products).then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send("Error retrieving user products");
      }
    });
  } catch (error) {
    res.status(500).send("Error retrieving user products");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//add_orders routes
app.get("/orders", userService.authenticateUser, async (req, res) => {
  //const id = req.query.id;
  //const product = req.query.product;
  //const quantity = req.query.quantity;
  const search = req.query.search;
  const UserID = req.userID;
  const user = await userService.findUserById(UserID);
  console.log(search);
  let srch ={"items.product" : { $regex: search, $options: "i" }};
  console.log(srch);
  if(search === undefined){
    console.log("Normal");
    orderService
      .findOrdersByIds(user.orders)
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error.name);
      });
  } else {
    console.log("Searching");
    orderService
      .search(user.orders, srch)
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error.name);
      });
  }
});


app.get("/orders/:find", userService.authenticateUser, (req, res) => {
  const find = req.params["find"];
  console.log(find);
  let srch = "{$or:{_id:{$regex:\"" + find + "\"}},{product:{$regex:\"" + find + "\"}},{quantity:{$regex:\"" + find + "\"}}]"; 
  console.log("HERE");
  orderService
    .find({srch})
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.post("/orders", userService.authenticateUser, (req, res) => {
  const orderToAdd = req.body;
  console.log(orderToAdd);
  orderService
    .addOrder(orderToAdd)
    .then((result) => {
      const UserID = req.userID;
      userService.addOrderToUser(UserID, result);
      console.log(result);
      res.status(201).send(result);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.delete("/orders/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  const userID = req.userID;
  orderService
    .removeOrder(id)
    .then((result) => {
      userService.removeOrderFromUserID(userID, id).then((Result) => {
        console.log("hi");
        res.status(204).send(Result);
      });
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});


//order-units routes
app.get("/order-units", userService.authenticateUser, (req, res) => {
  const id = req.query.id;
  const product = req.query.product;
  const quantity = req.query.quantity;
  orderUnitService
    .getOrder(id, product, quantity)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.get("/order-units/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  orderUnitService
    .findOrderById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.post("/order-units", userService.authenticateUser, (req, res) => {
  const orderToAdd = req.body;
  const UserID = req.userID;
  console.log(orderToAdd);
  userService.hasProduct(UserID, orderToAdd.product).then(has => {
    if (has) {
      userService.quantityCheck(UserID, orderToAdd.product, orderToAdd.quantity).then(good => {
        if (good == true) {
          orderUnitService
          .addOrder(orderToAdd)
          .then((result) => {
              res.status(201).send(result);
          })
        }
        else {
          res.status(400).send(good.toString());
        }
      })
    } else {
      res.status(204).send(orderToAdd.product);
    }
  })
  .catch(error => {
    res.status(500).json({ error: error.name });
  });
});

app.delete("/order-units/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  orderUnitService
    .removeOrder(id)
    .then((result) => {
      res.status(204).send(result);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at safehaven307.azurewebsites.net:${port}`);
});
=======
import cors from "cors";
import orderService from "./services/order-service.js";
import orderUnitService from "./services/order-unit-service.js";
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
app.use("/uploads", express.static("uploads"));

app.post(
  "/profile-picture",
  upload.single("profilePicture"),
  userService.authenticateUser,
  async (req, res) => {
    const file = req.file;
    const id = req.userID;
    if (!file) {
      res.status(400).send("No file uploaded");
      return;
    }

    try {
      const result = await userService.uploadProfilePicture(file);
      const user = await userService.findUserById(id);

      const pfp = { profilePicture: result._id };

      fetch(`safehaven307.azurewebsites.net/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pfp)
      });
      res.status(201).send(result._id.toString());
    } catch (error) {
      res.status(500).send(error.name);
    }
  }
);

app.patch("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService
    .changeUserProfilePicture(id, req.body.profilePicture)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
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
  userService
    .findProfilePictureById(id)
    .then((result) => {
      if (result) {
        res.contentType(result.contentType);
        res.send(result.data);
      } else {
        res.status(404).send(`Not found: ${id}`);
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.post("/users", (req, res) => { 
  userService.signupUser(req, res);
});

app.post("/users/profile", userService.authenticateUser, (req, res) => {
  const { bio, skills } = req.body; // from form
  const id = req.userID;
  userService.editProfile(id, bio, skills)
  .then((result) => {
    if (result) {
      res.send(result);
    } else {
      res.status(404).send(`Not found: ${id}`);
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
});

app.get("/users", userService.authenticateUser, (req, res) => {
  const id = req.userID;
  userService
    .findUserById(id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send(`Not found: ${id}`);
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.get("/users/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  userService
    .findUserById(id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send(`Not found: ${id}`);
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.post("/login", (req, res) => {
  userService.loginUser(req, res);
});

app.delete("/users", userService.authenticateUser, (req, res) => {
  const id = req.userID;
  userService
  .removeUser(id)
  .then((result) => {
    res.status(204).send(result);
  })
  .catch((error) => {
    res.status(500).send(error.name);
  });
});

app.delete("/products/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  const userID = req.userID;
  console.log(userID);
  productService
    .removeProduct(id)
    .then((result) => {
      console.log("plz");
      userService.removeProductFromUserID(userID, id).then((Result) => {
        console.log("hi");
        res.status(204).send(Result);
      });
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.post("/products", userService.authenticateUser, (req, res) => {
  const productToAdd = req.body;
  productService
    .addProduct(productToAdd)
    .then((result) => {
      const UserID = req.userID;
      userService.addProductToUser(UserID, result.id);
      console.log(result);
      res.status(201).send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error.name);
    });
});

app.get("/products/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  productService
    .findProductById(id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send(`Not found: ${id}`);
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.patch("/products/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  const productChanges = req.body;
  productService
    .changeProductById(id, productChanges)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send(`Not found: ${id}`);
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.get("/products", userService.authenticateUser, async (req, res) => {
  // const product = req.query.product;
  // const quantity = req.query.quantity;
  const UserID = req.userID;
  try {
    const user = await userService.findUserById(UserID);
    productService.findProductsByIds(user.products).then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send("Error retrieving user products");
      }
    });
  } catch (error) {
    res.status(500).send("Error retrieving user products");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//add_orders routes
app.get("/orders", userService.authenticateUser, async (req, res) => {
  //const id = req.query.id;
  //const product = req.query.product;
  //const quantity = req.query.quantity;
  const search = req.query.search;
  const UserID = req.userID;
  const user = await userService.findUserById(UserID);
  console.log(search);
  let srch ={"items.product" : { $regex: search, $options: "i" }};
  console.log(srch);
  if(search === undefined){
    console.log("Normal");
    orderService
      .findOrdersByIds(user.orders)
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error.name);
      });
  } else {
    console.log("Searching");
    orderService
      .search(user.orders, srch)
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error.name);
      });
  }
});


app.get("/orders/:find", userService.authenticateUser, (req, res) => {
  const find = req.params["find"];
  console.log(find);
  let srch = "{$or:{_id:{$regex:\"" + find + "\"}},{product:{$regex:\"" + find + "\"}},{quantity:{$regex:\"" + find + "\"}}]"; 
  console.log("HERE");
  orderService
    .find({srch})
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.post("/orders", userService.authenticateUser, (req, res) => {
  //console.log(req.body);
  const orderToAdd = req.body;
  orderService
    .addOrder(orderToAdd)
    .then((result) => {
      const UserID = req.userID;
      userService.addOrderToUser(UserID, result.id);
      console.log(result);
      res.status(201).send(result);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.delete("/orders/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  const userID = req.userID;
  orderService
    .removeOrder(id)
    .then((result) => {
      userService.removeOrderFromUserID(userID, id).then((Result) => {
        console.log("hi");
        res.status(204).send(Result);
      });
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});


//order-units routes
app.get("/order-units", userService.authenticateUser, (req, res) => {
  const id = req.query.id;
  const product = req.query.product;
  const quantity = req.query.quantity;
  orderUnitService
    .getOrder(id, product, quantity)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.get("/order-units/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  orderUnitService
    .findOrderById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.post("/order-units", userService.authenticateUser, (req, res) => {
  const orderToAdd = req.body;
  //console.log("POST: ", req.body);
  orderUnitService
    .addOrder(orderToAdd)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.delete("/order-units/:id", userService.authenticateUser, (req, res) => {
  const id = req.params["id"];
  orderUnitService
    .removeOrder(id)
    .then((result) => {
      res.status(204).send(result);
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at safehaven307.azurewebsites.net:${port}`);
});
