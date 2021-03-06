import React from 'react';

function MonthBudgetWidget( budget, actual, handleEditBudget, currency )
{
  console.log("[widget] Monthly Budget Initialized!");

  var plannedStyle = { width: 0 };
  var actualStyle = { width: 0 };

  if( budget !== 0 && actual !== 0  ) {
    plannedStyle = {
      width: (budget >= actual) ? "50%" : ((Number(budget)/Number(actual) * 50) % 50) + "%",
      backgroundColor: "green" }
    actualStyle = {
      width: (budget >= actual) ? ((Number(actual)/Number(budget) * 50) % 50) + "%" : "50%",
      backgroundColor: "crimson" }
  }

  var budgetSaved = budget - actual;
  var budgetStyle = { color: "black" }
  var budgetSummaryText = "Your Budget Summary:";
  if( budget !== 0 && actual !== 0 && budgetSaved < 0) { budgetStyle = { color: "red" };
                         budgetSummaryText = "Budget Not Beat!" }
  else if( budget !== 0 && actual !== 0 && budgetSaved > 0 ) { budgetStyle = { color: "green" };
                               budgetSummaryText = "Budget Beat!" }
  else if( budget !== 0 && actual !== 0 && budgetSaved === 0 ) { budgetSummaryText = "You're on budget!" }

  var plannedText = ( budget !== 0 ) ? "" : "No Budget Set";
      plannedText = ( actual !== 0 ) ? plannedText : "No Expenses";
  var actualText  = ( budget !== 0 ) ? "" : "No Budget Set";
      actualText  = ( actual !== 0 ) ? actualText : "No Expenses";
  var textClass   = ( budget !== 0 && actual !== 0 ) ? "editContainerBody blackText" : "editContainerBody attentionText" ;

  var editContainerClass = ( budget !== 0 && actual !== 0  ) ? "floatContainer chart__bar--horiz" : "floatContainer chart__bar--horiz editContainer";
  var editContainerTextClass = ( budget !== 0 && actual !== 0 ) ? "floatContainer stats none" : "floatContainer stats editContainerText";

  var editBudget = () => { if( budget === 0 ) handleEditBudget() }

  return(
    <div>
      <h3 className="desc">{budgetSummaryText}</h3>
      <h1 className="stats" style={budgetStyle}>{currency}{budgetSaved.toFixed(2)}</h1>
      <p className="desc">Saved this month</p>
      <div className={editContainerClass} onClick={editBudget}>
        <h4 className={editContainerTextClass}>Add Budget Info</h4>
        <ul className="editContainerBody">
          <li>Planned&nbsp;:&nbsp;
            <span className="chart__bar__line" style={plannedStyle}></span>
            <span className={textClass}> {plannedText}</span></li>
          <li>Actual &nbsp;&nbsp;&nbsp;:&nbsp;
            <span className="chart__bar__line" style={actualStyle}></span>
            <span className={textClass}> {actualText}</span></li>
          </ul>
      </div>
    </div>
  )
}

export default MonthBudgetWidget
