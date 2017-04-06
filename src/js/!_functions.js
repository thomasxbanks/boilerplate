// Scroll to anchor
let scrollToAnchor = (aid) => {
    var aTag = document.querySelectorAll("a[name='" + aid + "']")
    aTag.forEach((obj) => {
        document.querySelector('html,body').animate({
            scrollTop: (obj.offset().top)
        }, 900)
    })

}

// Nudge
let nudge = (distance) => {
    document.querySelector("html body").animate({
        scrollTop: distance + "px"
    }, 800)
    return false
}

// Make a button enabled
let enableButton = (target) => {
    document.querySelector(target).prop('disabled', false)
}

// Make a button disabled
let disableButton = (target) => {
    document.querySelector(target).prop('disabled', true)
}

// Destroy element
let destroyElement = (element) => {
    document.querySelector(element).outerHTML = ""
}

// Get the value of the given parameter
let getURLParameter = (sParam) => {
    let sPageURL = window.location.search.substring(1)
    let sURLVariables = sPageURL.split('&')
    sURLVariables.forEach((object, index) => {
        var sParameterName = sURLVariables[index].split('=')
        if (sParameterName[0] == sParam) {
            // Log for debug
            console.log('URL parameter:', sParameterName[1])
            return sParameterName[1]
        }
    })
}

let urlContains = (needle) => {
    let haystack = window.location.href
    return (haystack.includes(needle)) ? true : false
}

let isAdult = (data) => {
    return data.age >= 18
}
