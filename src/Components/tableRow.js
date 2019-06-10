import React from 'react';

function TableRow(props,
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
                  handleSubmit)
{

  if(isEditting && editId === props.id)
  {
    return(
      <tr key={props.id.toString()}>
        <td><input type="number" min="1" max="31" step="1" value={editData.date} onChange={handleDate} /></td>
        <td><input type="text" value={editData.description} onChange={handleDescription} /></td>
        <td><input type="number" value={editData.amount} onChange={handleAmount} /></td>
        <td><select name="Category" value={editData.category} onChange={handleCategory}>
          <option value="Food and Groceries">Food and Groceries</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Education">Education</option>
          <option value="Insurance and Bills">Insurance and Bills</option>
          <option value="Rent">Rent</option>
          <option value="Other" selected>Other</option>
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
        <td>{props.amount}</td>
        <td>{props.category}</td>
        <td>
          <button onClick={() => handleEdit(props.id)}>&#9998;</button>
          <button onClick={() => handleRemove(props.id)}>&#10060;</button>
        </td>
      </tr>
    )
  }
}

export default TableRow;