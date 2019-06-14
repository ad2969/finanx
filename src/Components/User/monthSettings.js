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
        startingBalance:  0,
        defaultSort: "Id",
      },
      temporaryExpense: 0,

    }

    this.handleBudget       = this.handleBudget.bind(this);
    this.toggleExpandBudget = this.toggleExpandBudget.bind(this);
    this.handleDefaultSort  = this.handleDefaultSort.bind(this);

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
        defaultSort:      this.props.userSetData.defaultSort,
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

  handleDefaultSort = (event) => {
    event.preventDefault();
    let data = this.state.data;
    data.defaultSort = event.target.value;
    this.setState({ data: data });
  }

  render() {

    // Budget Layouts

    var totalBudget =
      this.state.data.isBudgetExpanded ?
      <label> Budget for Expenses: &nbsp;&nbsp;
        <input data-ref     = "total"
               type         = "number" min= "0"
               value        = {this.state.data.budgetExpense}
               onChange     = {this.handleBudget}
               readOnly />
      </label> :
      <label> Budget for Expenses: &nbsp;&nbsp;
        <input data-ref     = "total"
               type         = "number" min= "0"
               value        = {this.state.data.budgetExpense}
               onChange     = {this.handleBudget} />
      </label>

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
          <button type="button" onClick={this.toggleExpandBudget}>Collapse Budget!</button>
        </ul> :
        <div>
          <button type="button" onClick={this.toggleExpandBudget}>Expand Budget!</button>
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

        {totalBudget}
        {expandedBudget}

        <h2>Display</h2>

        <div>
          <h4>Personalize your default sorting method:</h4>
          <select name="Category"
                  value={ this.state.data.defaultSort === "Id" ?
                          "Recent" : this.state.data.defaultSort }
                  onChange={this.handleDefaultSort}>
            {sortOptions}
          </select>
        </div>

        <h1></h1>
        <div><input type="submit" value="Save Changes" /></div>

      </form>
    )
  }
}

export default MonthSettings
