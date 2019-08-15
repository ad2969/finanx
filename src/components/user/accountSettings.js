import React from 'react';

import currencyConvert from '../../functions/currency';
import currencyList from '../../lists/currencyList';

class AccountSettings extends React.Component {
  constructor(props) {
    console.log("General Settings constructed!");
    super(props);

    this.state = {
      data: {
        currencyCode: "CAD",
        currency: "$",
        defaultSort: "Id"
      },
    }
    this.handleCurrency     = this.handleCurrency.bind(this);
    this.handleDefaultSort  = this.handleDefaultSort.bind(this);
  }

  componentDidMount() {
    console.log("Account Settings mounted!, old settings:", this.props.generalSettings);
    this.setState({
      data: {
        currencyCode: this.props.generalSettings.currencyCode,
        currency:     this.props.generalSettings.currency,
        defaultSort:  this.props.generalSettings.defaultSort
      },
    });
  }

  handleCurrency = (event) => {
    event.preventDefault();
    let data = this.state.data;
    data.currencyCode = event.target.value;
    data.currency = currencyConvert(data.currencyCode);
    this.setState({ data: data });
  }

  handleDefaultSort = (event) => {
    event.preventDefault();
    let data = this.state.data;
    data.defaultSort = event.target.value;
    this.setState({ data: data });
  }

  render() {
    var sortOptions = [];
    var columnList = ["Date", "Description", "Amount", "Category", "Id"]
    for( let i = 0; i < columnList.length; i++ ) {
      sortOptions.push(
        <option key={"sort-option-"+i} value={columnList[i] === "Id" ? "Recent" : columnList[i]}>
          {columnList[i] === "Id" ? "Recent" : columnList[i]}
        </option>
      );
    }
    var currencyOptions = [];
    for( let i = 0; i < currencyList.length; i++ ) {
      currencyOptions.push(
        <option key={"currency-option-"+i} value={currencyList[i]}>
          {currencyList[i]}
        </option>
      );
    }
    return(
      <form onSubmit={(event) => { event.preventDefault(); this.props.handleSubmit(this.state.data); }}>

        <h1> General Account Settings </h1>

        <h2>Display and Personalizations</h2>
        <div>
          <h4>Personalize your default sorting method:</h4>
          <label>Sort Transactions By: &nbsp;<select
                  name      = "Category"
                  value     = { this.state.data.defaultSort === "Id" ?
                                "Recent" : this.state.data.defaultSort }
                  onChange  = {this.handleDefaultSort}>
            {sortOptions}
          </select></label>
        </div>
        <div>
          <h4>Choose Your Currency:</h4>
          <label>Sort Transactions By: &nbsp;<select
                  name      = "Currency"
                  value     = {this.state.data.currencyCode}
                  onChange  = {this.handleCurrency}>
            {currencyOptions}
          </select></label>
        </div>

        <h1><input type="submit" value="Save Changes" /></h1>

      </form>
    )
  }
}

export default AccountSettings
