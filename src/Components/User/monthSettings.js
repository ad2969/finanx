import React from 'react';
import '../styles/widgets.scss';

class MonthSettings extends React.Component {

  constructor(props) {
    console.log("Month Settings constructed!");
    super(props);

    this.state = {
      data: {
        budgetExpense:    0,
        budgetExpanded:   [],
        isBudgetExpanded: false,
        startingBalance:  0
      },
      temporaryExpense: 0,

    }

    this.handleBudget       = this.handleBudget.bind(this);
    this.toggleExpandBudget = this.toggleExpandBudget.bind(this);

    console.log("Budget passed: ", this.props.userSetData.budgetExpense);
    console.log("* Expanded Budget: ", this.props.userSetData.budgetExpanded);
    console.log("* BudgetExpanded Bool:", this.props.userSetData.isBudgetExpanded);
  }

  /* Lifecycle Functions */

  componentDidMount() {
    console.log("Month Settings mounted!");
    this.setState({
      data: {
        budgetExpense:    this.props.userSetData.budgetExpense,
        budgetExpanded:   this.props.userSetData.budgetExpanded,
        isBudgetExpanded: this.props.userSetData.isBudgetExpanded,
        startingBalance:  this.props.userSetData.startingBalance,
      },
      temporaryExpense: this.props.userSetData.budgetExpense
    });
  }

  /* Main Handlers */

  handleBudget = (event) => {
    event.preventDefault();
    console.log("recieved change", event.target.value, "from", event.target.dataset.ref)
    let data = this.state.data;
    if(event.target.dataset.ref === "total")
    {
      data.budgetExpense = event.target.value;
      this.setState({
        data: data,
        temporaryExpense: event.target.value
      });
    }
    else
    {
      data.budgetExpanded[event.target.dataset.ref] = event.target.value;
      data.budgetExpense = data.budgetExpanded.reduce((a,b) => Number(a) + Number(b), 0);
      this.setState({ data: data });
    }
  }

  toggleExpandBudget = () => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        budgetExpense: prevState.data.isBudgetExpanded ?
                       prevState.temporaryExpense :
                       prevState.data.budgetExpanded.reduce((a,b) => Number(a) + Number(b), 0),
        isBudgetExpanded: !prevState.data.isBudgetExpanded
      }
    }));
  }

  render() {

    var options = [];
    for( let i = 0; i < this.props.categoriesList.length; i++ ) {
      options.push(
        <li key = {"budget-setting-"+i} className="clearList">{this.props.categoriesList[i]}:
          <input data-ref     = {i}
                 type         = "number" min= "0"
                 defaultValue = {this.state.data.budgetExpanded[i]}
                 onChange     = {this.handleBudget}/>
        </li>
      );
    }

    var totalBudget =
      this.state.data.isBudgetExpanded ?
      <label> Budget for Expenses:
        <input data-ref     = "total"
               type         = "number" min= "0"
               value        = {this.state.data.budgetExpense}
               onChange     = {this.handleBudget}
               readOnly />
      </label> :
      <label> Budget for Expenses:
        <input data-ref     = "total"
               type         = "number" min= "0"
               value        = {this.state.data.budgetExpense}
               onChange     = {this.handleBudget} />
      </label>

    var expandedBudget =
        this.state.data.isBudgetExpanded ?
        <ul>
          {options}
          <button type="button" onClick={this.toggleExpandBudget}>Collapse Budget!</button>
        </ul> :
        <div>
          <button type="button" onClick={this.toggleExpandBudget}>Expand Budget!</button>
        </div>;

    return(
      <div>
        <form onSubmit={() => this.props.handleSubmit(this.state.data)}>

          {totalBudget}
          {expandedBudget}

          <div><input type="submit" value="Save Changes" /></div>

        </form>
      </div>
    )
  }
}

export default MonthSettings
