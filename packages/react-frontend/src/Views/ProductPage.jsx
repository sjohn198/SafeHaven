// ProductPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addAuthHeader } from "../Components/helpers";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct(id)
      .then((res) => {
        if (res) {
          setProduct(res);
        } else {
          setProduct(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  function fetchProduct(id) {
    console.log(`Fetching product with id: ${id}`);
    return fetch(`http://localhost:8000/products/${id}`, {
      headers: addAuthHeader()
    })
      .then((res) => {
        console.log("Response status:", res.status);
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Failed to fetch product");
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  if (!product) {
    return (
      <div className="container">
        <li>
          <img className="ProductPageLogo" src="../assets/yes.png" alt="Loading" />
        </li>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <li>
        <img className="ProductPageLogo" src="../assets/yes.png" alt="Loading" />
      </li>
      <div className="subtitle-container">
        <h2 className="subtitle">Your Product: {product.product}</h2>
      </div>
      <h1 className="edit-product-title">Edit Product</h1>
      <form>
        <div className="input-container">
          <label>Product Name:</label>
          <input type="text" value={product.product} readOnly />
        </div>
        <div className="input-container">
          <label>Quantity:</label>
          <input type="number" value={product.quantity} readOnly />
        </div>
        <div className="input-container">
          <label>Price:</label>
          <input type="number" value={product.price} readOnly />
        </div>
      </form>
    </div>
  );
}

export default ProductPage;