import React from 'react';
import BudgetTable from './budgetTable';

class MonthBudgetExtendedWidget extends React.Component {

  constructor(props) {
    console.log("[widget] Monthly Budget Extended Initialized!");
    super(props);
  }

  render() {

    let expenseList = new Array(this.props.categoriesList.length).fill(0);
    this.props.transactionList.forEach( element => {
      for(let i = 0; i < this.props.categoriesList.length; i++)
      {
        if(element.category === this.props.categoriesList[i]) expenseList[i] += element.amount
      }
    });
    console.log("expenses:", this.props.transactionList);
    console.log("categories:", this.props.categoriesList);
    console.log("budget:", this.props.budgetExtended);
    console.log("expenses:", expenseList);

    let table = BudgetTable( this.props.categoriesList,
                             this.props.budgetExtended,
                             expenseList )

    return(
      <div>
        <h3 className="desc">Detailed Budget vs Actual Analysis</h3>

        <div className="floatContainer">{table}</div>

      </div>
    )

  }
}

export default MonthBudgetExtendedWidget
