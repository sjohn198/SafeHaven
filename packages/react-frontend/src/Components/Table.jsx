import React from "react";

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>ID</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Remove</th>
        </tr>
      </thead>
    );
}
  
function TableBody(props) {
  const rows = props.orderData.map((row, index) => {
    if (row != undefined) {
      return (
        <tr key={index}>
          <td>{row._id.toString()}</td>
          <td>{row.product}</td>
          <td>{row.quantity}</td>
          <td>
              <button onClick={() => props.removeOrder(index)}>
                Delete
              </button>
            </td>
        </tr>
      );
    }
  });
  return (
    <tbody>
      {rows}
    </tbody>
  );
}


  function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody
            orderData={props.orderData}
            removeOrder={props.removeOrder}
        />
      </table>
    );
}

export default Table;