import React from 'react';

function CatalogTableRow(
                  props,
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

  var options = [];
  for( let i = 0; i < categoriesList.length; i++ ) {
    options.push(
      <option key={"table-option-"+i} value={categoriesList[i]}>
        {categoriesList[i]}
      </option>
    );
  }

  if( isEditting && editId === props.id )
  {
    return(
      <tr key={props.id.toString()}>
        <td><input type="number" min="1" max="31" step="1" value={editData.date} onChange={handleDate} required="required"/></td>
        <td><input type="text" value={editData.description} onChange={handleDescription} /></td>
        <td><input type="number" min="0" step=".01" pattern="^\d+(?:\.\d{1,2})?$" value={editData.amount} onChange={handleAmount} /></td>
        <td><select name="Category" value={editData.category} onChange={handleCategory}>
          {options}
        </select></td>
        <td>
          <button onClick={() => doneEdit(props.id)}>&#10004;</button>
          <button onClick={() => cancelEdit()}>&#10006;</button>
        </td>
      </tr>
    )
  }
  else
  {
    return(
      <tr key={props.id.toString()}>
        <td>{props.date}</td>
        <td>{props.description}</td>
        <td>{props.amount.toFixed(2)}</td>
        <td>{props.category}</td>
        <td>
          <button onClick={() => handleEdit(props.id)}><span role="img" aria-label="lr=pencil">&#9998;</span></button>
          <button onClick={() => handleRemove(props.id)}><span role="img" aria-label="cross-mark">&#10060;</span></button>
        </td>
      </tr>
    )
  }
}

export default CatalogTableRow;
