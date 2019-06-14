import React from 'react';

function BudgetTableRow(
              category,
              budget,
              actual,
              key )
{
  let difference = budget - actual;
  let differenceStyle = { color: "black" };
  if (difference < 0 ) differenceStyle = { color: "maroon" };
  else if (difference > 0) differenceStyle = { color: "green" };

  return(
    <tr key={key}>
      <td>{category}</td>
      <td>{Number(budget).toFixed(2)}</td>
      <td>{Number(actual).toFixed(2)}</td>
      <td style={differenceStyle}>{Number(difference).toFixed(2)}</td>
    </tr>
  )
}

export default BudgetTableRow;
