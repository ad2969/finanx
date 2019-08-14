import React from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase'
import { withAuthorization } from '../../Session'

import Month from './month';

import { dataTemplate } from '../../data/firebaseTemplate.js'

// Function Imports
// import currencyConvert from '../../functions/currency.js';

class YearBase extends React.Component {
  constructor() {
    super();
    console.log("Year constructed!");
    this.state = {

      // Custom Settings
      generalSettings: {
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
      months: dataTemplate
    }
  }

  updateSettings = (newSettings, monthId) => {
    this.setState( prevState => ({
      months : {
        ...prevState.months,
        jan: {
          ...prevState.months.jan,
          settings: newSettings
        },
      }
    }));
  }

  updateExpenses = ( newTransactionList, transactionCount, monthId ) => {
    this.setState( prevState => ({
      months : {
        ...prevState.months,
        jan : {
          ...prevState.months.jan,
          expenses: newTransactionList,
          expensesCount: transactionCount
        }
      }
    }), () => { console.log("** Expenses updated!, new list:", this.state.months.jan.expenses) });
  }
  updateIncome = ( newTransactionList, transactionCount, monthId ) => {
    this.setState( prevState => ({
      months: {
        ...prevState.months,
        jan: {
          ...prevState.months.jan,
          income: newTransactionList,
          incomeCount: transactionCount
        }
      }
    }), () => { console.log("** Income updated!, new list:", this.state.months.jan.income) });
  }

  componentDidMount() {
    console.log("Year mounted!");

    this.props.firebase.userDat()
    .on('value', snapshot => {
      const obj = snapshot.val();
      const objchild = obj[Object.keys(obj)[0]];
      const months = objchild.months;
      this.setState({
        months
      }, () => { console.log("** Transactions Imported!", this.state.months) })

    })
  }

  componentWillUnmount() {
    this.props.firebase.userDat().off();
    this.props.firebase.userData(this.props.firebase.auth.currentUser.uid)
      .set({
        months: this.state.months
    })
  }

  render() {
    return(
      <div className="container">
        <Month monthId            = "0"
               expenseCategories  = {this.state.expenseCategories}
               incomeCategories   = {this.state.incomeCategories}
               generalSettings    = {this.state.generalSettings}

               userSet            = {this.state.months.jan.settings}
               incomeData         = {this.state.months.jan.income}
               incomeDataCount    = {this.state.months.jan.incomeCount}
               expensesData       = {this.state.months.jan.expenses}
               expensesDataCount  = {this.state.months.jan.expensesCount}

               updateSettings     = {this.updateSettings}
               updateExpenses     = {this.updateExpenses}
               updateIncome       = {this.updateIncome}
        />
      </div>
    )
  }
}

const condition = authUser => !!authUser;

const Year = compose(
  withAuthorization(condition),
  withFirebase,
)(YearBase);

export default Year
