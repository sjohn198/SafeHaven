import React, { useState, useEffect } from "react";
import OrderTable from "../Components/OrderTable";
import "../Styles/Navbar.css";
import { addAuthHeader } from "../Components/helpers";

function ManageOrders() {
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
        //console.log(orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneOrder(order_id) {
    //console.log(orders[0]["_id"]);
    const updated = orders.filter((order) => {
      return order["_id"] !== order_id;
    });
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
    };

  function fetchOrders() {
    return fetch("http://localhost:8000/orders", {
      headers: addAuthHeader()
    });
  }

  function deleteOrder(id) {
    const uri = `http://localhost:8000/orders/${id}`;
    return fetch(uri, {
      method: "DELETE",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      })
    });
  }

  return (
    <div className="ProductList">
      <h1>Manage orders:</h1>
      <OrderTable orderData={orders} removeOrder={removeOneOrder} />
    </div>
  );
}

export default ManageOrders;
