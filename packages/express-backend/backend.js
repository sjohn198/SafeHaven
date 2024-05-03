import express from "express";
import cors from "cors";
import productservice from "./services/product-service.js";
import orderservice from "./services/order-service.js"

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Routes
app.delete("/orders/:id", (req, res) => {
  const id = req.params["id"];
  orderservice.removeOrder(id)
                .then((result) => {
                  res.status(204).send(result);
                })
                .catch((error) => {
                  res.status(500).send(error.name);
                });
});

app.post("/orders", (req, res) => {
  const userToAdd = req.body;
  orderservice.addOrder(userToAdd)
               .then((result) => {
                   res.status(201).send(result);
               })
               .catch((error) => {
                 res.status(500).send(error.name);
               });
});

app.get("/orders/:id", (req, res) => {
  const id = req.params["id"];
  orderservice.findOrderById(id)
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

app.get("/orders", (req, res) => {
  const job = req.query.job;
  const name = req.query.name;
  orderservice.getOrders(name, job)
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

