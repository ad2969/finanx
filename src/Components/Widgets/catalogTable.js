import React from 'react';
import CatalogTableRow from './catalogTableRow';

class CatalogTable extends React.Component {

  render() {

    var rows = [];

    for(let i = 0; i < this.props.transactionObjects.length; i++ )
    {
      rows.push(
        CatalogTableRow(
          this.props.transactionObjects[i],
          this.props.categories,
          this.props.editData,

          this.props.isEditting,
          this.props.editId,
          this.props.handleEdit,
          this.props.cancelEdit,
          this.props.doneEdit,
          this.props.handleRemove,

          this.props.handleDate,
          this.props.handleDescription,
          this.props.handleAmount,
          this.props.handleCategory,
          this.props.handleSubmit
        )
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
}

export default CatalogTable
