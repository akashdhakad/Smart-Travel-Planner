let searhBtn = document.getElementById("searchBtn");
searhBtn.addEventListener("click", () => {
  let city = document.getElementById("cityInput").value.trim();

  if (city === "") {
    alert("please Enter a city or country");
    return;
  }
  window.location.href = `destination.html?city=${city}`;
});
