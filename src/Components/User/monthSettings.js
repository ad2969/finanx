import React from 'react';

class MonthSettings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        budgetExpense: this.props.budget
      }
    }
    console.log("Budget is currently", this.props.budget);
  }

  handleBudget = (event) => {
    this.setState({
      data: { budgetExpense: event.target.value }
    });
  }

  render() {

    return(
      <div>
        <form onSubmit={() => this.props.handleSubmit(this.state.data)}>

          <label> Budget for Expenses:
            <input type="number" min="0" defaultValue={this.props.budget} onChange={this.handleBudget} />
          </label>

          <div><input type="submit" value="Save Changes" /></div>
        </form>
      </div>
    )
  }
}

export default MonthSettings
