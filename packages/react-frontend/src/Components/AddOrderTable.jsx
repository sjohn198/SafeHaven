import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  if (props.orderData === null) {
    return <caption>Data Unavailable</caption>;
  }
  //console.log(props.orderData.length);
  const rows = props.orderData.map((order, index) => {
    //console.log(order);
    return (
        <tr key={index}>
        <td>{order["product"]}</td>
        <td>{order["quantity"]}</td>
        <td>
            <button onClick={() => props.removeOrder(order["_id"])}>Delete</button>
        </td>
        </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function AddOrderTable(props) {
  return (
    <table>
      <TableHeader />
      <TableBody orderData={props.orderData} removeOrder={props.removeOrder} />
    </table>
  );
}

export default AddOrderTable;
