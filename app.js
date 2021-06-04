
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



window.addEventListener('load', () => {


  navigator.geolocation.getCurrentPosition(

    // Success callback
    position => {
      const { latitude, longitude } = position.coords;
      long = longitude;
      lat = latitude
      let api = `https://api.weatherapi.com/v1/current.json?key=35f02e2b9b5d467798e130322210106&q=${lat},${long}&aqi=no`;

      fetch(api).then(
        //get json 
        response => response.json()

      ).then(data => {
        // start loder as soon as the data comes and it will load 1s after data is present 
        load();

        const { localtime, country, region } = data.location;
        const { temp_c, temp_f, condition } = data.current;

        img.src = condition.icon;
        time.textContent = localtime;
        countryName.textContent = country;
        regionName.textContent = region;
        discribtion.textContent = condition.text;
        tmpDegree.textContent = temp_c + ' `c';


        const btn = document.createElement("button");	// Create a new button element 
        btn.setAttribute("class", "btn btn-outline-light btn-sm"); // added bootstrap classes
        btn.innerHTML = 'convect';// inner text
        document.getElementById('degree-div').appendChild(btn); //added it  to the degree div container

        //add an onclick event 
        btn.addEventListener('click',
          convertTmp = () => {
            const tmpDegreeMode = tmpDegree.getAttribute("mode");
            if (tmpDegreeMode == 'c') {

              tmpDegree.textContent = temp_f + ' `f';
              tmpDegree.setAttribute("mode", "f")
            } else {
              tmpDegree.textContent = temp_c + ' `c';
              tmpDegree.setAttribute("mode", "c")

            }
          }
        )

      }
      )

    },
    // error
    error => {

      // everythign is set then start loading for 1s
      load();
      const main = document.getElementById("main");
      main.setAttribute('style', 'height: 100vh');
      console.log(error);
      const hr = document.getElementById('hr');
      hr.style.display = 'none';
      let errorP1 = document.createElement("div");	// Create a new element
      errorP1.innerText = 'Location Access denied';		// Change the text of the element
      let errorP2 = document.createElement("p");	// Create a new element
      errorP2.innerText = 'Quick solution to that \n 1. Turn on Location of this device \n 2. Allow this website to access your location \n 3. Refresh the website \n ✔✔ ';		// Change the text of the element

      main.appendChild(errorP1);	// Add the object to the DOM
      main.appendChild(errorP2);	// Add the object to the DOM


    }
  );

})

