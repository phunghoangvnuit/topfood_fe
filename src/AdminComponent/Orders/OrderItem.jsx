import React from "react";
import { formatMoney } from "AdminComponent/util/moneyUltis";

export const OrderItem = ({item}) => {
  return (
    <>
      <tr style={{ border: "1px solid black" }}>
        <td style={{ width: "10%", border: "1px solid black" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p><span>{item.id}</span></p>
          </div>
        </td>
        <td style={{ width: "10%", border: "1px solid black" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              className="w-[5rem] h-[5rem] object-cover"
              src={item.food.images[0]}
              alt=""
            />
          </div>
        </td>
        <td style={{ width: "30%", border: "1px solid black" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p><span>{item.food.name}</span></p>
          </div>
        </td>
        <td style={{ width: "15%", border: "1px solid black" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p>Quantity: <span>{item.quantity}</span></p>
          </div>
        </td>
        <td style={{ width: "20%", border: "1px solid black" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {item.ingredients.map((ingredient) => (
                <p style={{ margin: 0, padding: 0 }} key={ingredient.ingredientsItem.name}>
                  {`${ingredient.ingredientsItem.name} (+${ingredient.ingredientsItem.price}đ)`}
                </p>
              ))}
            </div>
          </div>
        </td>
        <td style={{ width: "15%", textAlign: "center", border: "1px solid black" }}>
          {formatMoney(item.totalPrice)}đ
        </td>
      </tr>
    </>
  );
};
