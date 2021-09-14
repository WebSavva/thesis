export const roundNumber = (number, toDigits = 0) => {
  return Math.round(number * Math.pow(10, toDigits)) / Math.pow(10, toDigits);
};

export const detectMobileDevice = () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
};

//function for forwarding other function to make sure that DRY principle is followed
export const forwardFunction = (func, thisObject, data) => {
  return function (event) {
    func.call(thisObject, event, data);
  };
};
