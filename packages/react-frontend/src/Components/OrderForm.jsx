import React, { useState } from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

function OrderForm(props) {
  const [order, setOrder] = useState({
    product: "",
    quantity: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
  };

  const addToList = () => {
    props.handleSubmit(order);
    setOrder({ product: "", quantity: "" }); // Reset form state
  };

  return (
    <form>
      <label htmlFor="product">Product</label>
      <input type="text" name="product" id="product" value={order.product} onChange={handleChange} />
      <label htmlFor="quantity">Quantity</label>
      <input type="text" name="quantity" id="quantity" value={order.quantity} onChange={handleChange} />
      <input type="button" value="Add to Order" onClick={addToList} />
    </form>
  );
}

export default OrderForm;