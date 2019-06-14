import React from 'react';
import BudgetTableRow from './budgetTableRow';

function BudgetTable(
        categoriesList,
        budgetList,
        expenseList )
{

  var rows = [];

  console.log("** categories:", categoriesList);
  console.log("** budget:", budgetList);
  console.log("** expenses:", expenseList);

  for(let i = 0; i < categoriesList.length; i++ )
  {
    rows.push(
      BudgetTableRow(
        categoriesList[i],
        budgetList[i],
        expenseList[i],
        i ));
  }

  return(
    <table className="table__budget">
      <tbody>

        <tr>
          <th>Category</th>
          <th>Budget</th>
          <th>Actual</th>
          <th>Diff</th>
        </tr>

        {rows}

      </tbody>
    </table>
  )

}

export default BudgetTable
