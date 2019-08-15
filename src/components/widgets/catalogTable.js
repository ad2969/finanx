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
                       handleCategory,
                       toggleSortBy )
{

  var rows = [];

  for(let i = 0; i < transactionObjects.length; i++ )
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
          <th>
            Date
            <button onClick={() => {toggleSortBy( "Date" )}}>Sort By Date</button>
          </th>
          <th>
            Description
            <button onClick={() => {toggleSortBy( "Description" )}}>Sort By Description</button>
          </th>
          <th>
            Amount
            <button onClick={() => {toggleSortBy( "Amount" )}}>Sort By Amount</button>
          </th>
          <th>
            Category
            <button onClick={() => {toggleSortBy( "Category" )}}>Sort By Category</button>
          </th>
          <th><button onClick={() => {toggleSortBy( "Id" )}}>Sort By Recent</button></th>
        </tr>

        {rows}

      </tbody>
    </table>
  )

}

export default CatalogTable
