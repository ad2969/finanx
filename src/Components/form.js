import React from 'react';


class Form extends React.Component {

  render() {
    return(
      <form onSubmit={this.props.handleSubmit}>
        <label>
          Date:
          <input type="number" min="1" max="31" step="1" value={this.props.formData.date} onChange={this.props.handleDate} />
        </label>
        <label>
          Description:
          <input type="text" value={this.props.formData.description} onChange={this.props.handleDescription} />
        </label>
        <label>
          Amount:
          <input type="number" value={this.props.formData.amount} onChange={this.props.handleAmount} />
        </label>
        <select name="Category" value={this.props.formData.category} onChange={this.props.handleCategory}>
          <option value="Food and Groceries">Food and Groceries</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Education">Education</option>
          <option value="Insurance and Bills">Insurance and Bills</option>
          <option value="Rent">Rent</option>
          <option value="Other" selected>Other</option>
        </select>
        <input type="submit" value="Add Transaction" />
      </form>
    )
  }
}

export default Form
