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
  const rows = props.productData.map((row, index) => {
    if (row != undefined) {
      return (
        <tr key={index}>
          <td>{row._id.toString()}</td>
          <td>{row.product}</td>
          <td>{row.quantity}</td>
          <td>
              <button onClick={() => props.removeProduct(index)}>
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
            productData={props.productData}
            removeProduct={props.removeProduct}
        />
      </table>
    );
}

export default Table;