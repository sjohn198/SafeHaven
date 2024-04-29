import React, { useState, useEffect } from "react";
import Table from "../Components/Table";
import Form from "../Components/Form";
import "../Styles/MyApp.css";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders()
      .then((res) => res.json())
      .then((json) => setOrders(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneOrder(index) {
    let order_id = -1;
    const updated = orders.filter((order, i) => {
      if (i === index) {
        order_id = order["_id"];
      }
      return i !== index;
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
  }

  function updateList(person) {
    postOrder(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          return;
        }
      })
      .then((res) => {
        setOrders([...orders, res]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchOrders() {
    return fetch("http://localhost:8000/orders");
  }

  function postOrder(person) {
    return fetch("http://localhost:8000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function deleteOrder(id) {
    const uri = `http://localhost:8000/orders/${id}`;
    return fetch(uri, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="orderList">
        <h1>Manage Orders:</h1>
      <Table
        orderData={orders}
        removeOrder={removeOneOrder}
      />
      <Form handleSubmit={updateList} />
      
    </div>
  );
}

export default ManageOrders;
