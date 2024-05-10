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

function convertToDict(order_str){
    let order_arr = order_str.split(",");
    const item_count = Number(order_arr[order_arr.length - 2].slice(order_arr[order_arr.length - 2].indexOf("\"item_count\":") + 13));
    let _id = "";
    let product = "";
    let quant = "";
    let dict_arr = [{ "item_count" : item_count}]
    for (let i = 0; i < item_count; i++){
        let back_step = 0;
        if (i == item_count - 1){
            back_step = 3;
        } else{
            back_step = 2;
        }
        _id = order_arr[0].slice(order_arr[0].indexOf("\"_id\":") + 7, order_arr[0].length - (back_step));
        product = order_arr[1].slice(order_arr[1].indexOf("\"product\":") + 11, order_arr[1].indexOf(","));
        quant = order_arr[2].slice(order_arr[2].indexOf("\"quantity\":") + 11);
        order_arr = order_arr.slice(3);
        dict_arr.push({ "_id": _id, "product" : product, "quantity" : quant});
    }
    return dict_arr;
}
  
function TableBody(props) {
  const rows = props.orderData.map((order, index) => {
    let arr_order = Array(order);
    if (order != undefined){
        let each_item = arr_order.map(item => {
            item = convertToDict(JSON.stringify(item));
            const item_count = item[0]["item_count"];
            let each_product = item.slice(1).map((product, index) => {
                return (
                    <tr key={index}>
                    <td width="1000px">{product["_id"]}</td>
                    <td>{product["product"]}</td>
                    <td>{product["quantity"]}</td>
                    <td>
                        <button onClick={() => props.removeProduct(index)}>
                            Delete
                        </button>
                        </td>
                    </tr>
                );
            });
            return (
                each_product
            );
        });
        return (
            each_item
        )
    }
  });
  return (
    <tbody>
      {rows}
    </tbody>
  );
}


  function OrderTable(props) {
    return (
      <table>
        <TableHeader />
        <TableBody
            orderData={props.orderData}
            removeProduct={props.removeOrder}
        />
      </table>
    );
}

export default OrderTable;