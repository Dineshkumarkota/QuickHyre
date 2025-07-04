const map = L.map('map').setView([17.385044, 78.486671], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

const vehicleIcon = L.icon({
  iconUrl: 'https://img.icons8.com/color/48/car--v1.png',
  iconSize: [48, 48],
    iconAnchor: [25, 25]
});

let marker = L.marker([17.385044, 78.486671], { icon: vehicleIcon }).addTo(map);
let route = [];

function fetchLocation() {
  fetch("http://localhost:3000/location")
    .then((res) => res.json())
    .then((data) => {
      const { latitude, longitude } = data;
      marker.setLatLng([latitude, longitude]);
      route.push([latitude, longitude]);
      L.polyline(route, { color: "blue" }).addTo(map);
      map.setView([latitude, longitude]);
         console.log("Fetched:", latitude, longitude);
    })
    .catch((err) => console.error("Error fetching location:", err));

 

}

setInterval(fetchLocation, 3000);
