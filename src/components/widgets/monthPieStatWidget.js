import React from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function MonthPieStatWidget( categoriesList,
                             transactionList,
                             totalExpenditure,
                             currency )
{
  console.log("[widget] Monthly Pie Chart Initialized!");

  if( totalExpenditure !== 0 )
  {
    var expenditureData = [];

    for(let i = 0; i < categoriesList.length; i++) {
      let data = { y: 0, amount:0, currency: currency }
      data.label = categoriesList[i];
      expenditureData.push(data);
    }

    transactionList.forEach( element => {
      for(let i = 0; i < categoriesList.length; i++)
      {
        if( element.category === categoriesList[i] ) expenditureData[i].amount += Number(element.amount);
      }
    });

    // Filters out empty/null array elements

    expenditureData = expenditureData.filter(el => {
      return (Number(el.amount) !== 0)
    });

    // Calculates percentage and displays two decimal places

    for(let i = 0; i < expenditureData.length; i++) {
      expenditureData[i].y = (Number(expenditureData[i].amount) / Number(totalExpenditure) * 100).toFixed(2);
      expenditureData[i].amount = Number(expenditureData[i].amount).toFixed(2);
    }

    var options = {
      exportEnabled:    false,
      animationEnabled: true,
      backgroundColor:  "#ccc",
      data:             [{
        type:               "pie",
        radius:             "90%",
        startAngle:         75,
        toolTipContent:     "<b>{label}</b>: {currency}{amount}",
        showInLegend:       true,
        legendText:         "{label}",
        indexLabelFontSize: 12,
        indexLabel:         "{label} - {y}%",
        dataPoints:         expenditureData
      }]
    }

    return(
      <div>
        <h3 className="desc" style={{"marginBottom":"0"}}>Monthly Spendings by Category</h3>
        <div className="floatContainer--smaller">
          <CanvasJSChart options={options} />
        </div>
      </div>
    )
  }
  else
  {
    return(
      <div>
        <h3 className="desc" style={{"marginBottom":"0"}}>Monthly Spendings by Category</h3>
        <h4 className="stats attentionText">No expenditures found!</h4>
      </div>
    )
  }

}

export default MonthPieStatWidget
