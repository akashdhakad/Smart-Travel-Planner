const params = new URLSearchParams(window.location.search);

const city = params.get("city");

const cityName = document.getElementById("cityName");
const loading = document.querySelector("#loading");
const cityInfoBox = document.querySelector("#cityInfoBox");
const errorBox = document.querySelector("#error");

const lat = document.querySelector("#lat");
const lon = document.querySelector("#lon");
const country = document.querySelector("#country");
const state = document.querySelector("#state");
const population = document.querySelector("#population");

let GEODB_API_KEY = "f83d61f4dcmsh1977e04dc26ee2bp12c91ajsn23b7bc374f7e";
let GEODB_HOST = "wft-geo-db.p.rapidapi.com";
if (city) {
  cityName.textContent = city;

  async function fetchCityDetails(cityName) {
    try {
      let res = await fetch(
        `https://${GEODB_HOST}/v1/geo/cities?namePrefix=${city}&limit=1`,
        {
          method: "GET",
          headers: {
            "x-RapidAPI-Key": GEODB_API_KEY,
            "X-RapiAPI-host": GEODB_HOST,
          },
        }
      );
      console.log(res);
      if (!res.ok) {
        console.log("API Response Not Found...");
      }
      let data = await res.json();
      console.log(data);

      if (!data.data || data.data.length === 0) {
        console.log("City Not Found");
      }
      let cityData = data.data[0];
      console.log(cityData);

      lat.textContent = cityData.latitude;
      lon.textContent = cityData.longitude;
      country.textContent = cityData.country;
      state.textContent = cityData.region || "N/A";
      population.textContent = cityData.population
        ? cityData.population.toLocaleString()
        : "N/A";

      loading.classList.add("hidden");
      cityInfoBox.classList.remove("hidden");
    } catch (error) {
      console.log(error);
      loading.classList.add("hidden");
      errorBox.classList.remove("hidden");
    }
  }

  fetchCityDetails(city);
} else {
  cityName.textContent = "Unknown City";
}
