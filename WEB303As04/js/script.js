// Assignment #4
// Dhruv patel 

document.addEventListener('DOMContentLoaded', () => {

  const checkGeolocation = () => {
    if(!navigator.geolocation) {
      showMessage('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }

  const handleSuccess = position => {
    const {latitude, longitude} = position.coords;

    showMessage(`Latitude: ${latitude}°, Longitude: ${longitude}°`);
    
    try {
      const stored = localStorage.getItem('location');
      if(stored) {
        const {prevLat, prevLng} = JSON.parse(stored);
        showMessage(`Previous Latitude: ${prevLat}°, Previous Longitude: ${prevLng}°`, 'h3');
        
        const distance = calculateDistance(latitude, longitude, prevLat, prevLng);
        showMessage(`You traveled ${distance.toFixed(2)} meters since your last visit.`);
      } else {
        showMessage('Welcome for the first time!', 'h3');  
      }

      localStorage.setItem('location', JSON.stringify({prevLat: latitude, prevLng: longitude}));

    } catch(err) {
      console.error('Error accessing localStorage', err);
    }
  }

  const handleError = () => {
    showMessage('You must allow geolocation to use this app.');
  }

  const showMessage = (msg, element='p') => {
    const parent = document.getElementById('locationhere').parentNode;
    const el = document.createElement(element);
    el.textContent = msg;
    parent.appendChild(el);
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    // Haversine formula
  }

  checkGeolocation();

});
