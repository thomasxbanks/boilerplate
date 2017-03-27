
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
    aTag.forEach((obj)=>{
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

// These are the functions that run when each page is loaded
