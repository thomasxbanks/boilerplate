"use strict"

window.onload = () => {

    axios.get('data/data.json').then(function(response) {
        const data = response.data
        document.querySelector('main').innerHTML += "<br /><br /><strong>Adults</strong><br /><ul></ul>"
        data.filter(isAdult).forEach((user) => {
            document.querySelector('main ul').innerHTML += "<li class=\"class-added-in-template\">" + user.name + "</li>"
        })

        // Log for debug
        console.log(data)

    }).catch(function(error) {
        // Log for debug
        console.error(error)
    })

    document.querySelector('main').innerHTML += "<br />width: " + browser.width + "<br />height: " + browser.height


    document.querySelector('#nudge').addEventListener('click', (e)=>{
      console.log(browser.height)
      e.currentTarget.classList.add('dynamically-added-class')
      scrollTo(document.body, browser.height, 600)
    })
}
