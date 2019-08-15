import React from 'react';
import BudgetTable from './budgetTable';

class MonthBudgetExtendedWidget extends React.Component {

  // constructor(props) {
    // console.log("[widget] Monthly Budget Extended Constructed!");
    // super(props);
  // }

  render() {
    console.log("[widget] Monthly Budget Extended Initialized!");

    let expenseList = new Array(this.props.categoriesList.length).fill(0);
    this.props.transactionList.forEach( element => {
      for(let i = 0; i < this.props.categoriesList.length; i++)
      {
        if(element.category === this.props.categoriesList[i]) expenseList[i] += Number(element.amount)
      }
    });

    let table = BudgetTable( this.props.categoriesList,
                             this.props.budgetExtended,
                             expenseList,
                             this.props.currency )

    return(
      <div>
        <h3 className="desc">Detailed Budget vs Actual Analysis</h3>

        <div className="floatContainer">{table}</div>

      </div>
    )

  }
}

export default MonthBudgetExtendedWidget
