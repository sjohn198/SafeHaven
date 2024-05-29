import React, { useState } from "react";

function Form(props) {
  const [order, setOrder] = useState({
    product: "",
    quantity: "",
    price: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "quantity") {
      setOrder({ product: order["product"], quantity: value });
    }
    if (name === "product") {
      setOrder({ product: value, quantity: order["quantity"], price: order["price"] });
    }
    if (name === "price") {
      setOrder({ product: order["product"], quantity: order["quantity"], price: value });
    }
  }

  function submitForm() {
    props.handleSubmit(order);
    setOrder({ product: "", quantity: "", price: "" });
  }

  return (
    <form>
      <label htmlFor="product">product</label>
      <input
        type="text"
        name="product"
        id="product"
        value={order.product}
        onChange={handleChange}
      />
      <label htmlFor="quantity">quantity</label>
      <input
        type="text"
        name="quantity"
        id="quantity"
        value={order.quantity}
        onChange={handleChange}
      />
      <label htmlFor="price">price</label>
      <input type="text" name="price" id="price" value={order.price} onChange={handleChange} />
      <input type="button" value={props.text} onClick={submitForm} />
    </form>
  );
}

export default Form;
