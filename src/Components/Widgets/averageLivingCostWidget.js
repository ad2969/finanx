import React from 'react';

function AverageLivingCostWidget(
  averageLivingCostWithoutRent = 1000,
  city = "Vancouver",
  currency
) {
  console.log("[widget] Average Living Cost Widget Initialized!");

  return(
    <div>
      <h3 className="desc">The average living cost in {city} is:</h3>
      <h1 className="stats">{currency}{Number(averageLivingCostWithoutRent+1000).toFixed(2)}</h1>
    </div>
  )
}

export default AverageLivingCostWidget
