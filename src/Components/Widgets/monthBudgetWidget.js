import React from 'react';
import '../styles/widgets.scss';

function MonthBudgetWidget( budget, actual, handleEditBudget )
{
  var plannedStyle = { width: 0 };
  var actualStyle = { width: 0 };

  if( budget !== 0 ) {
    plannedStyle = {
      width: (budget >= actual) ? "50%" : (budget/actual * 50) + "%",
      backgroundColor: "green" }
    actualStyle = {
      width: (budget >= actual) ? (actual/budget * 50) + "%" : "50%",
      backgroundColor: (budget >= actual) ? "green" : "red" }
  }

  var budgetSaved = budget - actual;
  var budgetStyle = { color: "black" }
  if( budgetSaved < 0) { budgetStyle = { color: "red" } }
  else if( budgetSaved > 0 ) { budgetStyle = { color: "green" } }

  var plannedText = ( budget !== 0 ) ? "" : "No Budget Set";
  var actualText  = ( budget !== 0 ) ? "" : "No Budget Set";
      actualText  = ( actual !== 0 ) ? actualText : "No Expenses";

  var editCointainerClass = ( budget !== 0 ) ? "flatContainer char__bar--horiz" : "floatContainer chart__bar--horiz editContainer";
  var editCointainerTextClass = ( budget !== 0 ) ? "floatContainer stats" : "floatContainer stats editContainerText";

  var editBudget = () => { if( budget === 0 ) handleEditBudget() }

  return(
    <div>
      <p className="desc">Increase in total savings:</p>
      <h1 className="stats" style={budgetStyle}>${budgetSaved}</h1>
      <p className="desc">Saved this month</p>
      <div className={editCointainerClass} onClick={editBudget}>
        <h4 className={editCointainerTextClass}>Add Budget Info</h4>
        <ul className="editContainerBody">
          <li>Planned&nbsp;:&nbsp;<span className="chart__bar__line" style={plannedStyle}></span> {plannedText}</li>
          <li>Actual &nbsp;&nbsp;&nbsp;:&nbsp;<span className="chart__bar__line" style={actualStyle}></span> {actualText}</li>
          </ul>
      </div>
    </div>
  )
}

export default MonthBudgetWidget
