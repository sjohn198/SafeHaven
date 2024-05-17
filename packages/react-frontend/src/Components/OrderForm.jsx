import React, { useState } from "react";

function OrderForm(props) {
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "product") {
      setProduct(value);
    } else if (name === "quantity") {
      setQuantity(value);
    }
  };

  const addToList = () => {
    const newItem = { product, quantity };
    setOrder((prevOrder) => {
      const updatedOrder = [...order, newItem];
      return updatedOrder;
    });
    setProduct("");
    setQuantity("");
  };

  function submitForm() {
    props.handleSubmit(order);
    setOrder([]);
  }

  return (
    <form>
      <label htmlFor="product">product</label>
      <input type="text" name="product" id="product" value={product} onChange={handleChange} />
      <label htmlFor="quantity">quantity</label>
      <input type="text" name="quantity" id="quantity" value={quantity} onChange={handleChange} />
      <input type="button" value="Add to Order" onClick={addToList} />
      <input type="button" value="Submit Order" onClick={submitForm} />
    </form>
  );
}

export default OrderForm;
