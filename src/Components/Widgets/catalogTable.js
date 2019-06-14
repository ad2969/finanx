import React from 'react';
import CatalogTableRow from './catalogTableRow';

function CatalogTable( transactionObjects,
                       transactionCount,
                       categoriesList,
                       editData,
                       isEditting,
                       editId,
                       handleEdit,
                       cancelEdit,
                       doneEdit,
                       handleRemove,

                       handleDate,
                       handleDescription,
                       handleAmount,
                       handleCategory )
{

  var rows = [];

  for(let i = 0; i < this.props.transactionObjects.length; i++ )
  {
    rows.push(
      CatalogTableRow(
        transactionObjects[i],
        categoriesList,
        editData,

        isEditting,
        editId,
        handleEdit,
        cancelEdit,
        doneEdit,
        handleRemove,

        handleDate,
        handleDescription,
        handleAmount,
        handleCategory )
    );
  }

  // console.log("    ** Number of rows:", this.props.transactionObjects.length);

  return(
    <table className="table__transactions">
      <tbody>

        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th></th>
        </tr>

        {rows}

      </tbody>
    </table>
  )

}

export default CatalogTable
