import React from 'react';
import '../../styles/widgets.scss';

class MonthSettings extends React.Component {

  constructor(props) {
    console.log("Month Settings constructed!");
    super(props);

    this.state = {
      data: {
        budgetExpense:    0,
        budgetExpanded:   [],
        isBudgetExpanded: false,
        startingBalance:  0,
        balanceTracking:  false,
      },
      temporaryExpense: 0,

    }

    this.handleBudget             = this.handleBudget.bind(this);
    this.toggleExpandBudget       = this.toggleExpandBudget.bind(this);
    this.handleAccountActivation  = this.handleAccountActivation.bind(this);
    this.handleStartingBalance    = this.handleStartingBalance.bind(this);
  }

  /* Lifecycle Functions */

  componentDidMount() {
    console.log("Month Settings mounted!, old settings:", this.props.userSetData);
    this.setState({
      data: {
        budgetExpense:    this.props.userSetData.budgetExpense,
        budgetExpanded:   this.props.userSetData.budgetExpanded,
        isBudgetExpanded: this.props.userSetData.isBudgetExpanded,
        startingBalance:  this.props.userSetData.startingBalance,
        balanceTracking:  this.props.userSetData.balanceTracking,
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

  handleAccountActivation = () => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        balanceTracking: !prevState.data.balanceTracking
      }
    }));
  }

  handleStartingBalance = (event) => {
    event.preventDefault();
    let data = this.state.data;
    data.startingBalance = event.target.value;
    this.setState({ data: data });
  }

  render() {

    // Budget Layouts

    var expandedBudgetOptions = [];
    for( let i = 0; i < this.props.categoriesList.length; i++ ) {
      expandedBudgetOptions.push(
        <li key = {"budget-setting-"+i} className="clearList">{this.props.categoriesList[i]}: &nbsp;&nbsp;
          <input data-ref     = {i}
                 type         = "number" min= "0"
                 defaultValue = {this.state.data.budgetExpanded[i]}
                 onChange     = {this.handleBudget}/>
        </li>
      );
    }

    var expandedBudget =
        this.state.data.isBudgetExpanded ?
        <ul>
          {expandedBudgetOptions}
          <p><button type="button" onClick={this.toggleExpandBudget}>Collapse Budget!</button></p>
        </ul> :
        <div>
          <p><button type="button" onClick={this.toggleExpandBudget}>Expand Budget!</button></p>
        </div>;

    // Default Sort Layouts

    var sortOptions = [];
    var columnList = ["Date", "Description", "Amount", "Category", "Id"]
    for( let i = 0; i < columnList.length; i++ ) {
      sortOptions.push(
        <option key={"sort-option-"+i} value={columnList[i] === "Id" ? "Recent" : columnList[i]}>
          {columnList[i] === "Id" ? "Recent" : columnList[i]}
        </option>
      );
    }

    return(
      <form onSubmit={() => this.props.handleSubmit(this.state.data)}>

        <h1> Month Settings </h1>

        <h2>Budget</h2>

        <label> Budget for Expenses: &nbsp;&nbsp;
          <input data-ref     = "total"
                 type         = "number" min= "0"
                 value        = {this.state.data.budgetExpense}
                 onChange     = {this.handleBudget}
                 disabled     = {this.state.data.isBudgetExpanded} />
        </label>
        {expandedBudget}

        <h2>Account</h2>

        <div>
          <div> Enable Balance Tracking? &nbsp;&nbsp;
            <input type           = "checkbox"
                   value          = {this.state.data.balanceTracking}
                   defaultChecked = {this.props.userSetData.balanceTracking}
                   onChange       = {this.handleAccountActivation} />
          </div>
          <div> Enter Initial Account Balance: &nbsp;&nbsp;
            <input type         = "number" min= "0"
                   value        = {this.state.data.startingBalance}
                   onChange     = {this.handleStartingBalance}
                   disabled     = {!this.state.data.balanceTracking}/>
          </div>
        </div>

        <h1><input type="submit" value="Save Changes" /></h1>

      </form>
    )
  }
}

export default MonthSettings
