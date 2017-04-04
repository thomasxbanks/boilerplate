// Trigger resize on completion of event
let Debouncer = (func, timeout) => {
    if (timeout === "") {
        timeout = 200;
    }
    var timeoutID;
    return function() {
        var scope = this,
            args = arguments;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function() {
            func.apply(scope, Array.prototype.slice.call(args));
        }, timeout);
    };
}

// Scroll to anchor
let ScrollToAnchor = (aid) => {
    var aTag = document.querySelectorAll("a[name='" + aid + "']");
    aTag.forEach((obj) => {
        document.querySelector('html,body').animate({
            scrollTop: (obj.offset().top)
        }, 900);
    })

}

// Nudge
let Nudge = (distance) => {
    document.querySelector("html body").animate({
        scrollTop: distance + "px"
    }, 800);
    return false;
}

// Make a button enabled
let enableButton = (target) => {
    document.querySelector(target).prop('disabled', false)
}

// Make a button disabled
let disableButton = (target) => {
    document.querySelector(target).prop('disabled', true)
}

// Get the value of the given parameter
let getURLParameter = (sParam) => {
    let sPageURL = window.location.search.substring(1)
    let sURLVariables = sPageURL.split('&')
    sURLVariables.forEach((object, index) => {
      var sParameterName = sURLVariables[index].split('=');
      if (sParameterName[0] == sParam) {
          // Log for debug
          console.log('URL parameter:', sParameterName[1])
          return sParameterName[1]
      }
    })
}

let urlContains = (needle) => {
  let haystack = window.location.href
  if (haystack.indexOf(needle) !== -1){
    return true
  } else {
    return false
  }
}
