import React, { useState } from "react";

function Form(props) {
  const [order, setOrder] = useState({
    product: "",
    quantity: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "quantity") {
      setOrder({ product: order["product"], quantity: value });
    }      
    else setOrder({ product: value, quantity: order["quantity"] });
  }

  function submitForm() {
    props.handleSubmit(order);
    setOrder({ product: "", quantity: "" });
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
      <input type="button" value="Add to Order" onClick={submitForm} />
    </form>
    
  )
}

export default Form;