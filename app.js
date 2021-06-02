window.addEventListener('load', () => {
  let long;
  let lat;

  let time = document.getElementById('time');
  let countryName = document.getElementById('country');
  let regionName = document.getElementById('region');
  let tmpDegree = document.getElementById('degree');
  let discribtion = document.getElementById('discribtion');
  let img = document.getElementById('img');
  // time.textContent = "hi u are the time"
  // country.textContent = "hi u are the time"




  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(long);
      console.log(lat);
      let api = `https://api.weatherapi.com/v1/current.json?key=35f02e2b9b5d467798e130322210106&q=${lat},${long}&aqi=no`;

      fetch(api).then(
        response => response.json()

      ).then(data => {
        const { localtime, country, region } = data.location;
        time.textContent = localtime;
        countryName.textContent = country;
        regionName.textContent = region;

        const { temp_c, temp_f, condition } = data.current;


        tmpDegree.textContent = temp_c + " C";
        discribtion.textContent = condition.text;
        console.log(country)
        console.log(condition.text)
        img.src = condition.icon;

        console.log(data)

        console.log("Location: ", data.location)
        console.log("Location lat: ", data.location.lat)
        console.log("Location long: ", data.location.lon)
        console.log("Location country: ", data.location.country)
        console.log("Location region: ", data.location.region)
        console.log("Location time: ", data.location.localtime)
        console.log("Current: ", data.current)
        console.log("temp_c: ", data.current.temp_c)
        console.log("Temp_f: ", data.current.temp_f)
        console.log("Condition", data.current.condition)
        console.log("condition text: ", data.current.condition.text)
        console.log("condition icon: ", data.current.condition.icon)
      }
      )


    })


  } else {
    h1.textContent = 'can no get your location';
  }
})