"use strict"

window.onload = () => {

    document.querySelector('main').innerHTML += "<br />" + browser.width + "<br />" + browser.height

    axios.get('data/data.json').then(function(response) {
        const data = response.data
        console.log(data)
    }).catch(function(error) {
        console.log(error)
    })

}
