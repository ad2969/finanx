import React from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MonthGraphicalStatsWidget extends React.Component {

  constructor(props) {
    //console.log("[widget] Month Graphical Stats Widget Constructed!");
    super(props);
    this.state = {
      isExpenseDisplayed: true,
      isIncomeDisplayed: true,
      isBalanceDisplayed: true
    }

    this.toggleExpenseDisplay = this.toggleExpenseDisplay.bind(this);
    this.toggleIncomeDisplay = this.toggleIncomeDisplay.bind(this);
    this.toggleBalanceDisplay = this.toggleBalanceDisplay.bind(this);
  }

  componentDidMount() {
    if(this.props.balanceTracking)
    {
      this.setState({ isBalanceDisplayed: true });
    }
  }

  toggleExpenseDisplay() {
    this.setState(prevState => ({
      isExpenseDisplayed: !prevState.isExpenseDisplayed
    }));
  }

  toggleIncomeDisplay() {
    this.setState(prevState => ({
      isIncomeDisplayed: !prevState.isIncomeDisplayed
    }));
  }

  toggleBalanceDisplay() {
    this.setState(prevState => ({
      isBalanceDisplayed: !prevState.isBalanceDisplayed
    }));
  }

  render() {
    console.log("[widget] Month Graphical Stats Widget Initialized!");

    var expenseChartData = [];
    var incomeChartData = [];
    var balanceChartData = [];
    var balance = Number(this.props.startingBalance);

    if(this.props.balanceTracking) {
      expenseChartData.push({ x: 0, y: 0, toolTipContent: "Initial" });
      incomeChartData.push({ x: 0, y: 0, toolTipContent: "Balance:" });
      balanceChartData.push({ x: 0, y: balance, toolTipContent: this.props.currency+"<strong>{y}</strong>" });
    }

    for(let i = 1; i < this.props.numberOfDays; i++ )
    {
      let expenses = 0;
      let income = 0;

      this.props.expenditureList.forEach( element => {
        if(Number(element.date) === i) expenses += Number(element.amount);
      });
      expenseChartData.push({ x: i, y: expenses });

      this.props.incomeList.forEach( element => {
        if(element.date === i) income += Number(element.amount);
      });
      incomeChartData.push({ x: i, y: income });

      if(this.props.balanceTracking) {
        balance -= expenses;
        balance += income;
        balanceChartData.push({ x: i, y: balance })
      }
    }

    var options = {
      exportEnabled:      false,
      animationEnabled:   true,
      backgroundColor:    "#ccc",
      toolTip: {
  			shared: true,
  			contentFormatter: (e) => {
  				let content = "<strong>" + e.entries[0].dataPoint.x + "</strong><br/>";
  				for (var i = 0; i < e.entries.length; i++) {
            let style = this.props.currency + "<span style=color:black>";
            if(e.entries[i].dataSeries.name === "Balance")
            {
              if(e.entries[i].dataPoint.y < 0) style = "<strong style=color:red>-" + this.props.currency;
              else if(e.entries[0].dataPoint.y > e.entries[1].dataPoint.y ) style = this.props.currency + "<strong style=color:maroon>";
              else if(e.entries[0].dataPoint.y < e.entries[1].dataPoint.y) style = this.props.currency + "<strong style=color:green>";
            }
            content += e.entries[i].dataSeries.name + " " +
                       "<strong>" + style + Math.abs(e.entries[i].dataPoint.y).toFixed(2) + "</span></strong>";
    				content += "<br/>";
  				}
  				return content;
  			}
  		},
      axisY: {
        title:          "Value ("+this.props.currency+")",
        includeZero:    true,
        titleFontSize:  16,
        suffix:         this.props.currency
      },
      axisX: {
        title:          "Date",
        titleFontSize:  16,
        interval:       3,
      },
      data: [{ type:        "line",
               name:        "Inflow",
               visible:     this.state.isIncomeDisplayed,
               dataPoints:  incomeChartData },
             { type:        "line",
               name:        "Outflow",
               visible:     this.state.isExpenseDisplayed,
               dataPoints:  expenseChartData }]
    }

    if(this.props.balanceTracking) options.data.push({
      type:           "line",
      name:           "Balance",
      visible:        this.state.isBalanceDisplayed,
      dataPoints:     balanceChartData
    });

    var budgetCheckbox = this.props.balanceTracking ?
        <label> &nbsp;&nbsp;&nbsp; Show Balance? &nbsp;
          <input type           = "checkbox"
                 value          = {this.state.isBalanceDisplayed}
                 defaultChecked = {this.state.isIncomeDisplayed}
                 onChange       = {this.toggleBalanceDisplay} />
        </label> :
        ""

    if( this.props.totalExpenditure !== 0 | this.props.totalIncome !== 0 )
    {
      return (
        <div>

          <h3 className="desc" style={{"marginBottom":"0"}}>Asset Flow Chart</h3>
          <div className="floatContainer--smaller">
            <CanvasJSChart options={options} />
          </div>

          <div className="desc">
            <label> Show Expenses? &nbsp;
              <input type           = "checkbox"
                     value          = {this.state.isExpenseDisplayed}
                     defaultChecked = {this.state.isExpenseDisplayed}
                     onChange       = {this.toggleExpenseDisplay} />
            </label>
            <label> &nbsp;&nbsp;&nbsp; Show Income? &nbsp;
              <input type           = "checkbox"
                     value          = {this.state.isIncomeDisplayed}
                     defaultChecked = {this.state.isIncomeDisplayed}
                     onChange       = {this.toggleIncomeDisplay} />

            </label>
            {budgetCheckbox}
          </div>

        </div>
      )
    }
    else
    {
      return (
        <div>
          <h3 className="desc" style={{"marginBottom":"0"}}>Asset Flow Chart</h3>
          <h4 className="stats attentionText">No expenditures or income found!</h4>
        </div>
      )
    }
  }


}

export default MonthGraphicalStatsWidget
