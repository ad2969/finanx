
function currencyConvert( countryCode ) {
  var returnString;
  switch(countryCode) {
    case "CAD":
      returnString = "$";
      break;
    case "USD":
      returnString = "$";
      break;
    case "IDR":
      returnString = "Rp. ";
      break;
    default:
      returnString = "$";
      break;
  }
  return returnString;
}

export default currencyConvert
