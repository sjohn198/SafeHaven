import React, { useState, useEffect } from "react";
import AddOrderTable from "../Components/AddOrderTable";
import OrderForm from "../Components/OrderForm";
import "../Styles/Navbar.css";
import { addAuthHeader } from "../Components/helpers";

function AddOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setOrders(json);
        } else {
          setOrders(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneOrder(order_id) {
    const updated = orders.filter((order) => order["_id"] !== order_id);
    deleteOrder(order_id)
      .then((res) => res.status)
      .then((status) => {
        if (status === 204) {
          setOrders(updated);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateOrder(order) {
    if (typeof order.quantity === "number") {
      order.quantity = order.quantity.toString();
    }

    postOrderUnit(order)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else if (res.status === 204) {
          alert(`Invalid order for non-existent product: ${order.product}`);
          return;
        } else if (res.status === 400) {
          res.json().then(quantity => {
            alert(`There's not enough ${order.product} in stock! There's only ${quantity} left`)
          })
          return;
        } else {
          return;
        }
      })
      .then((res) => {
        if (res !== undefined) {
          setOrders([...orders, res]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchOrders() {
    return fetch("https://safehavenapp.azurewebsites.net//order-units", {
      headers: addAuthHeader()
    });
  }

  function postOrderUnit(order) {
    return fetch("https://safehavenapp.azurewebsites.net//order-units", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(order)
    });
  }

  function deleteOrder(id) {
    const uri = `https://safehavenapp.azurewebsites.net//order-units/${id}`;
    return fetch(uri, {
      method: "DELETE",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      })
    });
  }

  function runPost(order_str) {
    return fetch("https://safehavenapp.azurewebsites.net//orders", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      }),
      body: order_str
    });
  }

  function postOrder() {
    let order_str = "{\"items\":" + JSON.stringify(orders) + ", \"item_count\":" + orders.length + "}";
    runPost(order_str);
    for (let i = 0; i < orders.length; i++) {
      deleteOrder(orders[i]["_id"]);
    }
    setOrders([]);
  }

  return (
    <div className="ProductList">
      <h1>Add orders:</h1>
      <AddOrderTable orderData={orders} removeOrder={removeOneOrder} />
      <OrderForm handleSubmit={updateOrder} />
      <input type="button" value="Submit Order" onClick={postOrder} />
    </div>
  );
}

export default AddOrders;
