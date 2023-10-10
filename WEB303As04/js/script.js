$(function () {
  if (!navigator.geolocation) {
    document.getElementById("locationhere").textContent =
      "Geolocation is not supported by your browser.";
    return;
  }

  function showLocation(position) {
    const currentLatitude = position.coords.latitude;
    const currentLongitude = position.coords.longitude;

    document.getElementById(
      "locationhere"
    ).textContent = `Latitude: ${currentLatitude} °, Longitude: ${currentLongitude} °`;

    try {
      const storedLocation = JSON.parse(localStorage.getItem("location"));

      if (storedLocation) {
        const distance = calculateDistance(
          currentLatitude,
          currentLongitude,
          storedLocation.latitude,
          storedLocation.longitude
        );
        const oldLocationElement = document.createElement("p");
        oldLocationElement.textContent = `Previous Latitude: ${storedLocation.latitude} °, Previous Longitude: ${storedLocation.longitude} °`;

        const welcomeBackHeader = document.createElement("h3");
        welcomeBackHeader.textContent = "Welcome back!";

        const distanceElement = document.createElement("p");
        distanceElement.textContent = `You traveled ${distance.toFixed(
          2
        )} meters since your last visit.`;

        const parentElement = document.getElementById("locationhere")
          .parentNode;
        parentElement.appendChild(oldLocationElement);
        parentElement.appendChild(welcomeBackHeader);
        parentElement.appendChild(distanceElement);
      } else {
        const firstTimeHeader = document.createElement("h3");
        firstTimeHeader.textContent = "Welcome for the first time!";
        document
          .getElementById("locationhere")
          .parentNode.appendChild(firstTimeHeader);
      }

      localStorage.setItem(
        "location",
        JSON.stringify({
          latitude: currentLatitude,
          longitude: currentLongitude
        })
      );
    } catch (e) {
      console.error("Error accessing or manipulating localStorage:", e);
    }
  }

  function showError() {
    document.getElementById("locationhere").textContent =
      "You must allow geolocation to use this application.";
  }

  navigator.geolocation.getCurrentPosition(showLocation, showError);

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Radius of Earth in meters
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  function toRadians(num) {
    return num * (Math.PI / 180);
  }
});
