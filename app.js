
let long;
let lat;
let time = document.getElementById('time');
let countryName = document.getElementById('country');
let regionName = document.getElementById('region');
let discribtion = document.getElementById('discribtion');
let img = document.getElementById('img');

const tmpDegree = document.getElementById('degree');


load = () => {
  setTimeout(showPage, 1000);
}

showPage = () => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("main").style.display = "block";
}

// load()


window.addEventListener('load', () => {


  navigator.geolocation.getCurrentPosition(

    // Success callback
    position => {
      const { latitude, longitude } = position.coords;
      long = longitude;
      lat = latitude
      let api = `https://api.weatherapi.com/v1/current.json?key=35f02e2b9b5d467798e130322210106&q=${lat},${long}&aqi=no`;

      fetch(api).then(
        response => response.json()

      ).then(data => {
        load();

        const { localtime, country, region } = data.location;
        const { temp_c, temp_f, condition } = data.current;
        img.src = condition.icon;
        time.textContent = localtime;
        countryName.textContent = country;
        regionName.textContent = region;
        discribtion.textContent = condition.text;
        tmpDegree.textContent = temp_c + ' `c';
        convertTmp = () => {
          const tmpDegreeMode = tmpDegree.getAttribute("mode");
          if (tmpDegreeMode == 'c') {

            // console.log(tmpDegreeMode)
            tmpDegree.textContent = temp_f + ' `f';
            tmpDegree.setAttribute("mode", "f")
          } else {
            // console.log(tmpDegreeMode)
            tmpDegree.textContent = temp_c + ' `c';
            tmpDegree.setAttribute("mode", "c")

          }
        }


        // convertTmp();
        // console.log(position);
        // console.log(long);
        // console.log(lat);

        // console.log(country)
        // console.log(condition.text)

        // console.log(data)

        // console.log("Location: ", data.location)
        // console.log("Location lat: ", data.location.lat)
        // console.log("Location long: ", data.location.lon)
        // console.log("Location country: ", data.location.country)
        // console.log("Location region: ", data.location.region)
        // console.log("Location time: ", data.location.localtime)
        // console.log("Current: ", data.current)
        // console.log("temp_c: ", data.current.temp_c)
        // console.log("Temp_f: ", data.current.temp_f)
        // console.log("Condition", data.current.condition)
        // console.log("condition text: ", data.current.condition.text)
        // console.log("condition icon: ", data.current.condition.icon)
      }
      )

    },
    // error
    error => {
      const hr = document.getElementById('hr');
      hr.style.display = 'none';
      const main = document.getElementById("main");
      let errorP1 = document.createElement("p");	// Create a new element
      errorP1.innerText = 'Location Access denied';		// Change the text of the element
      let errorP2 = document.createElement("p");	// Create a new element
      errorP2.innerText = 'Turn on Location of this device ';		// Change the text of the element
      // errorP.style.color = 'red';		// Change the text color of the element

      main.appendChild(errorP1);	// Add the object to the DOM
      main.appendChild(errorP2);	// Add the object to the DOM
      load();
      console.log(error);

      // document.getElementById("main").textContent = "";
      // <i class="fa fa-creative-commons" aria-hidden="true"></i>
      // document.getElementById("main").appendChild =

    }
  );

  // tmpDegree.addEventListener('click', () => convect())


})

