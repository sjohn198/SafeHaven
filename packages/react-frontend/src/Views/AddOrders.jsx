import React, { useState, useEffect } from "react";
import OrderTable from "../Components/OrderTable";
import OrderForm from "../Components/OrderForm";
import "../Styles/Navbar.css";

function AddOrders() {
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

  function updateOrder(order) {
    if (typeof order.quantity === 'number') {
      order.quantity = order.quantity.toString();
    }
    postOrder(order)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          return;
        }
      })
      .then((res) => {
        res = JSON.stringify(res).split(",");
        const item_count = Number(res[res.length - 3].slice(res[res.length - 3].indexOf("\"item_count\":") + 13));
        let temp_list = res;
        for(let i = 1; i < 3*item_count; i++){
          let combo = temp_list[0] + ", " + temp_list[1];
          temp_list = temp_list.slice(2)
          temp_list.unshift(combo);
        }
        res = temp_list;
        let temp = res[0].slice(1);
        let temp2 = res[1];
        res[0] = "{" + res[2];
        res[1] = temp;
        res[2] = temp2;
        res = res.slice(1).reduce((accumulator, cur_val) => accumulator + ", " + cur_val, res[0]);
        res = JSON.parse(res);
        setOrders([...orders, res]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchOrders() {
    return fetch("http://localhost:8000/orders");
  }

  function postOrder(order) {
    order = "{\n \"items\": " + JSON.stringify(order) + ",\n" + " \"item_count\": \"" + order.length + "\"\n}";
    return fetch("http://localhost:8000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: order,
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
    <div className="ProductList">
    <h1>Add orders:</h1>
      <OrderTable
        orderData={orders}
        removeOrder={removeOneOrder}
      />
      <OrderForm handleSubmit={updateOrder} />
    </div>
  );
}

export default AddOrders;