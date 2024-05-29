import React, { useState, useEffect } from "react";
import AddOrderTable from "../Components/AddOrderTable";
import OrderForm from "../Components/OrderForm";
import SearchBar from "../Components/SearchBar";
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
  }

  function updateOrder(order) {
    //console.log("order in updateOder:", order);
    if (typeof order.quantity === "number") {
      order.quantity = order.quantity.toString();
    }
    //console.log(order);
   postOrderUnit(order)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          return;
        }
      })
      .then((res) => {
        //console.log(res);
        res = JSON.stringify(res).split(",");
        const item_count = Number(
          res[res.length - 3].slice(res[res.length - 3].indexOf('"item_count":') + 13)
        );
        let temp_list = res;
        for (let i = 1; i < 3 * item_count; i++) {
          let combo = temp_list[0] + ", " + temp_list[1];
          temp_list = temp_list.slice(2);
          temp_list.unshift(combo);
        }
        res = temp_list;
        let temp = res[0].slice(1);
        let temp2 = res[1];
        res[0] = "{" + res[2];
        res[1] = temp;
        res[2] = temp2;
        res = res.slice(1).reduce((accumulator, cur_val) => accumulator + ", " + cur_val, res[0]);
        //console.log(res);
        res = JSON.parse(res);
        setOrders([...orders, res]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchOrders() {
    return fetch("http://localhost:8000/order-units", {
      headers: addAuthHeader()
    });
  }

  function postOrderUnit(order) {
    //console.log(JSON.stringify(order));
    return fetch("http://localhost:8000/order-units", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(order)
    });
  }

  function deleteOrder(id) {
    const uri = `http://localhost:8000/order-units/${id}`;
    return fetch(uri, {
      method: "DELETE",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      })
    });
  }

  function runPost(order_str){
    return fetch("http://localhost:8000/orders", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      }),
      body: order_str
    });
  }

  function postOrder(){
    //console.log(orders.length)
    //console.log("{\"items\":" + JSON.stringify(orders) + ",\"item_count\":" + orders.length + ",\"total_profits\": " + 0 + "}");
    let order_str = "{\"items\":" + JSON.stringify(orders) + ", \"item_count\":" + orders.length + "}";
    runPost(order_str);
    for(let i = 0; i < orders.length; i++){
      //console.log(orders[i]["_id"])
      deleteOrder(orders[i]["_id"]);
    }
  }

  /*function searchOrder(str) {
    let temp_orders = orders;
    temp_orders = temp_orders.filter((o) => 
    {
      let items = o["items"];
      items = items.filter((i) =>
      {
        console.log(i);
        return(i.includes(str));
      });

    });
    console.log(temp_orders);
  }*/

  return (
    <div className="ProductList">
      <h1>Add orders:</h1>
      <AddOrderTable orderData={orders} removeOrder={removeOneOrder} />
      <OrderForm handleSubmit={updateOrder} />
      <input type="button" value="Submit Order" onClick={postOrder}/>
    </div>
  );
}

export default AddOrders;