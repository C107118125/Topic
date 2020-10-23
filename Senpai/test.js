
/*var map = L.map('map', {
    center: [22.609177, 120.297733],
    zoom: 16
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([22.607988, 120.299278]).addTo(map);
var circle = L.circle([22.611662, 120.300394], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 200
}).addTo(map);
marker.bindPopup("高雄新光碼頭").openPopup();
circle.bindPopup("圓形範圍.");*/

var map = L.map('map', {
    center: [22.733994,120.315534],
    zoom: 16
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.marker([22.72717,120.32453], {icon: greenIcon}).addTo(map)
    .bindPopup('<h1>楠梓火車</h1><p>高雄市楠梓區惠楠里建楠路 229 號</p>')


L.marker([22.76081,120.31017]).addTo(map)
    .bindPopup('<h1>橋頭火車站</h1><p>成人口罩：50<br>兒童口罩:50</p>')


