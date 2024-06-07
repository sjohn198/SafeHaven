import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Remove</th>
        <th>Edit</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  if (props.productData === null) {
    return <caption>Data Unavailable</caption>;
  } else {
    const rows = props.productData.map((row, index) => {
      if (row != undefined) {
        return (
          <tr key={index}>
            <td>{row._id.toString()}</td>
            <td>{row.product}</td>
            <td>{row.quantity}</td>
            <td>{row.price}</td>
            <td>
              <button onClick={() => props.removeProduct(index)}>Delete</button>
            </td>
            <td>
              <a href={`https://safehavenapp.azurewebsites.net/products/${row._id}`}>
                <button>Edit</button>
              </a>
            </td>
          </tr>
        );
      }
    });
    return <tbody>{rows}</tbody>;
  }
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody productData={props.productData} removeProduct={props.removeProduct} />
    </table>
  );
}

export default Table;
