$(function() {
  
    
     function showError(error){
     var position = {
       coords: {
         latitude: '22.620894',
         longitude: '120.311859'
      },
       zoom: 7
     }
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('讀取不到您目前的位置')
        showPosition(position)
        break
      case error.POSITION_UNAVAILABLE:
        alert('讀取不到您目前的位置')
        showPosition(position)
        break
      case error.TIMEOUT:
        alert('讀取位置逾時')
        showPosition(position)
        break
      case error.UNKNOWN_ERROR:
        alert('Error')
        showPosition(position)
        break
    }
  }


   window.map = new L.Map('map');
   
   navigator.geolocation.getCurrentPosition(showPosition,showError,{
    enableHighAccuracy: true, 
  maximumAge        : 5000, 
  timeout           : 3000

   });

    function showPosition(position){
      enableHighAccuracy: true;
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      map.setView([latitude, longitude],14);
  
      const blueMarker = L.icon.pulse({ iconSize: [20, 20], color: '#2e72f0', fillColor: '#2e72f0' })
      // 設定所在位置的icon
      const selfPos = L.marker([position.coords.latitude, position.coords.longitude], { icon: blueMarker }).bindPopup('目前位置')
      map.addLayer(selfPos)
  const goBackPosition = document.querySelector('.js-goBackPosition')
    goBackPosition.addEventListener('click', () => {
      map.setView([position.coords.latitude, position.coords.longitude], 17)
    })

    }

    
       $.ajax({
              url: "OSM.php",
              data: {
                action: 'getdata'
              },//(action)使用php的function需post資料過去php作判別要使用哪個function
              type: "post",
              dataType: "json",

              success: function(result) {

              console.log(result);

               L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              }).addTo(map);
             
            var markers = new L.MarkerClusterGroup().addTo(map);

                 var greenIcon = new L.Icon({
                  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
               })

                var orangeIcon = new L.Icon({
                  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
                })
                var greyIcon = new L.Icon({
                  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
                })


              for (var i = 0; i < result['markerPoint'].length; i++) {
                var info_StationName = result['station'][i]['station_name'];
                var info_Address = result['station'][i]['station_address'];

                // 緯度
                var info_Latitude =  result['markerPoint'][i]['latitude'];

                // 經度
                var info_Longitude =  result['markerPoint'][i]['longitude'];
                
               
             

  var pin="";
       switch (result['station'][i]['category']) {
                   case "捷運":
                     pin = greenIcon;
                     break;
                   case "台鐵":
                     pin = orangeIcon;
                     break;
                 }        
                markers.addLayer(L.marker([info_Latitude, info_Longitude], {
                      icon: pin
                  })
                  .bindPopup(
                    '<h1>' + info_StationName  +'</h1>' + 
                    '<h2>' + info_Address + '</h2>'+ 
                    '<h3>經度：' + info_Longitude + '</h3>'+ 
                    '<h3>緯度：' + info_Latitude + '</h3>')).addTo(map)

              }

              map.addLayer(markers);



              },
              error: function(XMLHttpRequest, textStatus, errorThrown) {
                  console.log(XMLHttpRequest);
                  console.log(textStatus);
                  console.log(errorThrown);
              }
          });  

});