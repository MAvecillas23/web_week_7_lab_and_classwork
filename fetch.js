// ISS location JS

// API URL
let url = 'https://api.wheretheiss.at/v1/satellites/25544'

// spans from the HTML lat and long paragraphs
let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeIssLocationFetched = document.querySelector('#time')

// number of times API call is failed
let maxFailedAttempts = 3

let update = 10000 // the number of milliseconds iss function is called
let issMarker // iss marker

// replace default marker with a marker of your choice
// set icon size anchor and connect it with your icon url
let issIcon = L.icon({
    iconUrl: 'icon.png',
    iconSize: [50,50],
    iconAnchor: [25, 25]
})

// create map of the whole world
let map = L.map('iss-map').setView([0,0], 1)

// tile layer allows for map to be displayed on webpage
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// setInterval calls the iss function every 10 seconds
// setInterval(iss, update)

iss(maxFailedAttempts) // call iss function one time to avoid having to wait 10 seconds after page is loaded

// iss function that gets location of iss and sets it to webpage
function iss(attempts) {
    // if more than 3 API calls fail and cause an error,
    // webpage tells user and no longer attempts to call iss function
    if (attempts <= 0) {
        alert('Failed to contact ISS server, failed after several attempts.')
        return
    }

    // alternate less code to type version of below
    fetch(url).then(res => res.json()).then((issData) => {
        console.log(issData)
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long

        // create marker if it doesn't exist
        // move marker if it does exist
        if (!issMarker) {
            //create marker
            issMarker = L.marker([lat, long], {icon : issIcon}).addTo(map)
        } else {
            issMarker.setLatLng([lat, long])
        }

        // gets the date and time the last time the iss moved/ updated
        let now = Date()
        timeIssLocationFetched.innerHTML = `This data was fetched at ${now}`

    }).catch((err) => {
        // everytime an error occurs, attempts is subtracted by one
        attempts--
        console.log('Error!', err)

    }) .finally(() => {
        // finally runs whether fetch() worked or failed
        // call the iss function after a delay of update milliseconds
        // to update the position
        setTimeout(iss, update, attempts)

    })
}
// getting data from API and catching any errors that are caught
// fetch(url).then(res => {
//     return res.json()
// }).then( (issData) => {
//     console.log(issData)
//     let lat = issData.latitude  // get lat data
//     let long = issData.longitude // get long data
//     issLat.innerHTML = lat // set lat coords to webpage
//     issLong.innerHTML = long // set long coords to webpage
//
//     // if an error occurs this is displayed
// }).catch((err) => {
//     console.log('ERROR!', err)
// })


