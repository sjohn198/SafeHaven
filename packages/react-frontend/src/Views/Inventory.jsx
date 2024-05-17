import React, { useState, useEffect } from "react";
import Table from "../Components/Table";
import Form from "../Components/Form";
import "../Styles/Navbar.css";
import { addAuthHeader } from "../Components/helpers";

function Inventory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setProducts(json);
        } else {
          setProducts(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneProduct(index) {
    let product_id = -1;
    const updated = products.filter((product, i) => {
      if (i === index) {
        product_id = product["_id"];
      }
      return i !== index;
    });
    deleteProduct(product_id)
      .then((res) => res.status)
      .then((status) => {
        if (status === 204) {
          setProducts(updated);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateList(product) {
    if (typeof product.quantity === "number") {
      product.quantity = product.quantity.toString();
    }

    postProduct(product)
      .then((res) => {
        console.log(res.body);
        if (res.status === 201) {
          return res.json();
        } else {
          return;
        }
      })
      .then((res) => {
        console.log(res);
        const productIndex = products.findIndex((product) => product.product === res.product);
        if (productIndex !== -1) {
          setProducts(products.map((product, index) => (index === productIndex ? res : product)));
        } else {
          setProducts([...products, res]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchProducts() {
    const promise = fetch("http://localhost:8000/products", {
      headers: addAuthHeader()
    });
    return promise;
  }

  function postProduct(product) {
    console.log("posting:", product);
    return fetch("http://localhost:8000/products", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(product)
    });
  }

  function deleteProduct(id) {
    const uri = `http://localhost:8000/products/${id}`;
    return fetch(uri, {
      method: "DELETE",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      })
    });
  }

  return (
    <div className="ProductList">
      <h1>Inventory:</h1>
      <Table productData={products} removeProduct={removeOneProduct} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default Inventory;
