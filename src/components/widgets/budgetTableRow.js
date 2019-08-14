import React from 'react';

function BudgetTableRow(
              category,
              budget,
              actual,
              key,
              currency )
{
  let difference = Number(budget) - Number(actual);
  let differenceStyle = { color: "black" };
  if (difference < 0 ) differenceStyle = { color: "maroon" };
  else if (difference > 0) differenceStyle = { color: "green" };

  return(
    <tr key={key}>
      <td>{category}</td>
      <td>{currency}{Number(budget).toFixed(2)}</td>
      <td>{currency}{Number(actual).toFixed(2)}</td>
      <td style={differenceStyle}>{currency}{Number(difference).toFixed(2)}</td>
    </tr>
  )
}

export default BudgetTableRow;
