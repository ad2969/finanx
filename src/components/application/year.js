import React from 'react';
import Modal from 'react-modal';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase'
import { withAuthorization } from '../../Session'

import Month from './month';
import AccountSettings from '../user/accountSettings';

import expenseCategories from '../../lists/expenseCategories';
import incomeCategories from '../../lists/incomeCategories';
import { dataTemplate } from '../../data/firebaseTemplate'


// Modal App Element needs to be set to ensure main app is hidden behind modal
Modal.setAppElement(document.getElementById('root'));

class YearBase extends React.Component {
  constructor() {
    super();
    console.log("Year constructed!");
    this.state = {

      showSettings: false,

      // Custom Settings
      generalSettings: {
        currencyCode: "CAD",
        currency: "$",
        defaultSort: "Id"
      },

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

  handleOpenSettings = () => {
    this.setState({ showSettings: true });
  }

  handleCloseSettings = () => {
    this.setState({ showSettings: false });
  }

  updateGeneralSettings = (newSettings) => {
    this.setState( prevState => ({
      generalSettings: newSettings
    }));
    this.handleCloseSettings();
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
      const generalSettings = objchild.generalSettings;
      this.setState({
        months,
        generalSettings
      }, () => { console.log("** Transactions Imported!", this.state.months) })

    })
  }

  componentWillUnmount() {
    this.props.firebase.userDat().off();
    this.props.firebase.userData(this.props.firebase.auth.currentUser.uid)
      .set({
        months: this.state.months,
        generalSettings: this.state.generalSettings
    })
  }

  render() {
    return(
      <div className="container">
        <Month monthId            = "0"
               expenseCategories  = {expenseCategories}
               incomeCategories   = {incomeCategories}
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

        <Modal isOpen         = {this.state.showSettings}
               onRequestClose = {this.handleCloseSettings} >

          <span className="button-close" onClick={this.handleCloseSettings}>&#10006;</span>
          <AccountSettings generalSettings  = {this.state.generalSettings}
                           handleSubmit     = {this.updateGeneralSettings} />

        </Modal>

        <div>
          <button onClick={this.handleOpenSettings}>Account Settings</button>
        </div>

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
