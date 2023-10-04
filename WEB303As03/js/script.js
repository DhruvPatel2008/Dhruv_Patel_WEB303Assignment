// Method to fetch data using $.getJSON
function getDataWithGetJSON() {
    $.getJSON('team.json', function (data) {
      // Loop through the array in the returned object
      $.each(data, function (index, item) {
        // Create HTML elements for name, position, and bio
        var nameElement = $('<h2>').text(item.name);
        var positionElement = $('<h5>').text(item.position);
        var bioElement = $('<p>').text(item.bio);
  
        // Append elements to div#team
        $('#team').append(nameElement, positionElement, bioElement);
      });
    });
  }
  
  // Method to fetch data using $.ajax
  function getDataWithAjax() {
    // Display "Loading..." message
    $('#team').text('Loading...');
  
    $.ajax({
      type: 'GET',
      url: 'team.json',
      dataType: 'json',
      success: function (data) {
        // Add a delay for bonus  mark
        setTimeout(function () {
          // Clear the "Loading..." message
          $('#team').empty();
  
          // Loop through the array in the returned object
          $.each(data, function (index, item) {
            // Create HTML elements for name, position, and bio
            var nameElement = $('<h2>').text(item.name);
            var positionElement = $('<h5>').text(item.position);
            var bioElement = $('<p>').text(item.bio);
  
            // Append elements to div#team
            $('#team').append(nameElement, positionElement, bioElement);
          });
        }, 3000); // 3-second delay for bonus
      },
      error: function () {
        // Display an error message if the request fails
        $('#team').text('Error: Content could not be retrieved.');
      }
    });
  }
  
  // Call one of the methods in a ready function
  $(document).ready(function () {

    getDataWithAjax(); 
  });
  
