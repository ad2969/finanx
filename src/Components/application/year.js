import React from 'react';
import Month from './month';

// Function Imports
// import currencyConvert from '../../functions/currency.js';

class Year extends React.Component {
  constructor() {
    super();
    console.log("Year constructed!");
    this.state = {

      // Custom Settings
      generalSettings: {
        defaultSort: "Id",
        currencyCode: "CAD",
        currency: "$",
      },
      expenseCategories: [
        "Food and Groceries",
        "Entertainment",
        "Education",
        "Insurance and Bills",
        "Rent",
        "Other",
      ],
      incomeCategories: [
        "Salary",
        "Interest",
        "Sponsor",
        "Investment",
        "Other",
      ],

      // Data
      months: [
        { month: "January",
          data: [],
          settings: {
            budgetExpense: 0,
            budgetExpanded: [],
            isBudgetExpanded: false,
            startingBalance: 0,
            balanceTracking: false,
          }
        }
      ]

    }
  }

  componentDidMount() {
    console.log("Year mounted!");

  }

  render() {
    return(
      <div className="container">
        <Month expenseCategories  = {this.state.expenseCategories}
               incomeCategories   = {this.state.incomeCategories}
               generalSettings    = {this.state.generalSettings}/>
      </div>
    )
  }
}

export default Year
