import React from 'react';


class NewTransactionForm extends React.Component {

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

    var options = [];
    for( let i = 0; i < this.props.categoriesList.length; i++ ) {
      options.push(
        <option key={"form-option-"+i} value={this.props.categoriesList[i]}>
          {this.props.categoriesList[i]}
        </option>
      );
    }

    return(
      <form id="transactionForm" onSubmit={this.handleSubmit}>

        <label>Date:
          <input type="number" min="1" max="31" step="1" defaultValue="1" ref='date' required="required" />
        </label>

        <label>Description:
          <input type="text" placeholder="Enter Description" ref='description' />
        </label>

        <label>Amount:
          <input type="number" min="0" step=".01" placeholder="Enter Amount" defaultValue="0.00" ref='amount' required="required" />
        </label>

        <select name="Category" ref='category' >
          {options}
        </select>

        <input type="submit" value="Add Transaction" />

      </form>
    )
  }
}

export default NewTransactionForm
