import React from 'react';
import CanvasJSReact from '../../Assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function MonthSummaryWidget( totalExpense,
                             totalIncome,
                             startBalance,
                             endBalance,
                             averageDailyExpense,
                             isAccountActive,
                             currency )
{
  console.log("[widget] Month Summary Widget initialized!");

  var information =
    <div>
      <p>Total Expense:
        <strong> {currency}{Number(totalExpense).toFixed(2)}</strong>
      </p>
      <p>Total Income:
        <strong> {currency}{Number(totalIncome).toFixed(2)}</strong>
      </p>
    </div>
  var column;

  if( isAccountActive )
  {
    var options = {
      exportEnabled:    false,
      animationEnabled: true,
      height:           200,
      backgroundColor:  "#ccc",
      axisY: { maximum: Math.max(Number(startBalance), Number(endBalance)) },
      data: [{
        type:           "column",
        toolTipContent: "<b>{label}</b>: {amount}",
        dataPoints: [{ label: "Start Balance",
                       y: Number(startBalance),
                       amount: currency + Number(startBalance).toFixed(2) },
                     { label: "End Balance",
                       y: Number(endBalance),
                       amount: currency + Number(endBalance).toFixed(2) }],
      }]
    }
    column =
      <table style={{tableLayout:"fixed", width:"100%"}}>
        <tbody>
          <tr style={{"width":"100%"}}>
            <th><CanvasJSChart options={options} /></th>
            <th>{information}</th>
          </tr>
        </tbody>
      </table>
  }
  else
  {
    var net = Number(totalIncome) - Number(totalExpense);
    var netStyle = { color: "black" }

    if( net < 0 ) { net = "-" + currency + Math.abs(net).toFixed(2);
                    netStyle = { color: "maroon" }; }
    else if( net > 0 ) { net = currency + Number(net).toFixed(2);
                         netStyle = { color: "green" }; }
    else net = currency + Number(net).toFixed(2);

    column =
      <table style={{tableLayout:"fixed", width:"100%"}}>
        <tbody>
          <tr>
            <th className="shadedContainer">
              <h3>Total Net:</h3>
              <h1 style={netStyle}>{net}</h1>
            </th>
            <th>{information}</th>
          </tr>
        </tbody>
      </table>
  }

  return(
    <div className="floatContainer">
      <h3 className="desc" style={{"marginBottom":"0"}}>Month Summary</h3>
      {column}
      <p className="stats">Average Daily Expense:
        <strong> {currency}{Number(averageDailyExpense).toFixed(2)}</strong>
      </p>
    </div>
  )
}

export default MonthSummaryWidget
