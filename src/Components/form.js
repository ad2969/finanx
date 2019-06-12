import React from 'react';


class Form extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    var data = {
      date:         this.refs.date.value,
      description:  this.refs.description.value,
      amount:       this.refs.amount.value,
      category:     this.refs.category.value
    }

    this.props.addTransaction( data );
    document.getElementById("transactionForm").reset();
  }

  render() {
    return(
      <form id="transactionForm" onSubmit={this.handleSubmit}>

        <label>
          Date:
          <input type="number" min="1" max="31" step="1" defaultValue="1" ref='date' required="required" />
        </label>

        <label>
          Description:
          <input type="text" placeholder="Enter Description" ref='description' />
        </label>

        <label>
          Amount:
          <input type="number" min="0" step=".01" placeholder="Enter Amount" defaultValue="0.00" ref='amount' required="required" />
        </label>

        <select name="Category" ref='category' >
          <option value="Food and Groceries">Food and Groceries</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Education">Education</option>
          <option value="Insurance and Bills">Insurance and Bills</option>
          <option value="Rent">Rent</option>
          <option value="Other">Other</option>
        </select>

        <input type="submit" value="Add Transaction" />

      </form>
    )
  }
}

export default Form
