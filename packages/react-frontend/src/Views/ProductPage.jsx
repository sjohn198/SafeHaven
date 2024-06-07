import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addAuthHeader } from "../Components/helpers";
import "../Styles/Navbar.css";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    product: '',
    quantity: '',
    price: '',
  });

  useEffect(() => {
    fetchProduct(id)
      .then((res) => {
        if (res) {
          setProduct(res);
          setFormValues({
            product: res.product,
            quantity: res.quantity,
            price: res.price,
          });
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
    return fetch(`https://safehavenapp.azurewebsites.net/products/${id}`, {
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

  function updateProduct(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const updatedProduct = {
      product: formValues.product,
      quantity: formValues.quantity,
      price: formValues.price,
    };

    patchProduct(updatedProduct)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Failed to update product");
        }
      })
      .then((res) => {
        setProduct(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function patchProduct(product) {
    console.log("patching: ", product);
    return fetch(`https://safehavenapp.azurewebsites.net/products/${id}`, {
      method: "PATCH",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(product)
    });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
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
        <img className="ProductPageLogo" src="yes.png" alt="Loading" />
      </li>
      <div className="subtitle-container">
        <h2 className="subtitle">Your Product: {product.product}</h2>
      </div>
      <h1 className="edit-product-title">Edit Product</h1>
      <form onSubmit={updateProduct}>
        <div className="input-container">
          <label>Product Name:</label>
          <input
            type="text"
            name="product"
            value={formValues.product}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formValues.quantity}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
          />
          <button className="input-container" type="submit">Submit change</button>
        </div>
        
      </form>
    </div>
  );
}

export default ProductPage;