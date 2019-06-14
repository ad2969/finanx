import React from 'react';
import CanvasJSReact from '../../Assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function MonthPieStatWidget( categoriesList,
                             transactionList,
                             totalExpenditure,
                             currency )
{
  console.log("[widget] Monthly Pie Chart Initialized!");
  console.log("categoriesList:", categoriesList);
  console.log("transactionList:", transactionList);
  console.log("totalexpenditure:", totalExpenditure);

  var expenditureData = [];

  for(let i = 0; i < categoriesList.length; i++) {
    let data = { p: 0, amount:0, currency: currency }
    data.label = categoriesList[i];
    expenditureData.push(data);
  }

  transactionList.forEach( element => {
    for(let i = 0; i < categoriesList.length; i++)
    {
      if(element.category === categoriesList[i]) expenditureData[i].amount += element.amount;
    }
  });

  for(let i = 0; i < categoriesList.length; i++) {
    expenditureData[i].y = (expenditureData[i].amount / totalExpenditure * 100).toFixed(2);
    expenditureData[i].amount = expenditureData[i].amount.toFixed(2);
  }

  console.log("Pie Data:", expenditureData);

  var options = {
    exportEnabled:    false,
    animationEnabled: true,
    backgroundColor:  "#ccc",
    legend: {verticalAlign: "bottom"},
    data:             [{
      type:               "pie",
      radius:             "90%",
      startAngle:         75,
      toolTipContent:     "<b>{label}</b>: {amount}",
      showInLegend:       true,
      legendText:         "{label}",
      indexLabelFontSize: 12,
      indexLabel:         "{label} - {y}%",
      dataPoints:         expenditureData
    }]
  }

  console.log(options);

  if( totalExpenditure !== 0 )
  {
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
