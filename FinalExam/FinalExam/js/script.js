// Your Name: [Your Name Here]
// Your Student Number: [Your Student Number Here]

$(document).ready(function() {
  let postalCodeList = [];
  let shipmentList = [];

  // Load postal codes from JSON
  $.ajax({
      url: 'windsor_postal_codes.json',
      dataType: 'json',
      success: function(data) {
          postalCodeList = data;
      }
  });

  // Postal Code format validator
  function isValidPostalCode(postalCode) {
      return /^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(postalCode) &&
             postalCodeList.some(pc => pc.code === postalCode);
  }

  // Weight converters
  function kilogramsToGrams(kg) { return kg * 1000; }
  function gramsToKilograms(g) { return g / 1000; }
  function poundsToGrams(lb) { return lb * 453.592; }
  function gramsToPounds(g) { return g / 453.592; }

  // Distance calculator
  function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
      // This function should be provided as per the exam instructions
  }

  class Shipment {
      constructor(senderName, senderPostalCode, deliveryName, deliveryPostalCode) {
          this.senderName = senderName;
          this.senderPostalCode = senderPostalCode;
          this.deliveryName = deliveryName;
          this.deliveryPostalCode = deliveryPostalCode;
      }

      #weightInGrams = 0;

      get WeightInKilograms() {
          return gramsToKilograms(this.#weightInGrams);
      }

      set WeightInKilograms(value) {
          this.#weightInGrams = kilogramsToGrams(value);
      }

      get WeightInPounds() {
          return gramsToPounds(this.#weightInGrams);
      }

      set WeightInPounds(value) {
          this.#weightInGrams = poundsToGrams(value);
      }

      distanceInKilometers() {
          let senderLocation = postalCodeList.find(pc => pc.code === this.senderPostalCode);
          let deliveryLocation = postalCodeList.find(pc => pc.code === this.deliveryPostalCode);

          if (!senderLocation || !deliveryLocation) return null;

          return calcDistanceBetweenPoints(
              senderLocation.latitude, senderLocation.longitude,
              deliveryLocation.latitude, deliveryLocation.longitude
          ) / 1000;
      }

      getHTML() {
          return `<tr>
                      <td>${this.senderName}</td>
                      <td>${this.senderPostalCode}</td>
                      <td>${this.deliveryName}</td>
                      <td>${this.deliveryPostalCode}</td>
                      <td>${this.distanceInKilometers().toFixed(2)}</td>
                      <td>${this.WeightInKilograms.toFixed(2)}</td>
                      <td>${this.WeightInPounds.toFixed(2)}</td>
                  </tr>`;
      }
  }

  // Form validation and submission
  $('#addShipment').on('click', function(e) {
      e.preventDefault();
      let errors = [];
      let senderName = $('#senderName').val();
      let senderPostalCode = $('#senderPostalCode').val().toUpperCase();
      let deliveryName = $('#deliveryName').val();
      let deliveryPostalCode = $('#deliveryPostalCode').val().toUpperCase();
      let weight = $('#weight').val();
      let unit = $('#unit').val();

      // Validation
      if (!senderName || !deliveryName) errors.push('Name fields cannot be blank.');
      if (!isValidPostalCode(senderPostalCode) || !isValidPostalCode(deliveryPostalCode)) errors.push('Invalid or out-of-area postal code.');
      if (isNaN(weight)) errors.push('Weight must be numeric.');

      if (errors.length > 0) {
          // Display errors in a modal
          // Assuming a modal setup is available
          $('#errorModal').find('.modal-body').html(errors.join('<br>'));
          $('#errorModal').modal('show');
          return;
      }

      // Create and add shipment
      let shipment = new Shipment(senderName, senderPostalCode, deliveryName, deliveryPostalCode);
      if (unit === 'kg') {
          shipment.WeightInKilograms = parseFloat(weight);
      } else {
          shipment.WeightInPounds = parseFloat(weight);
      }
      shipmentList.push(shipment);

      // Update table
      updateShipmentTable();
  });

  // Update shipment table
  function updateShipmentTable() {
      let tableBody = $('#shipmentTable tbody');
      tableBody.empty();
      shipmentList.forEach(shipment => tableBody.append(shipment.getHTML()));
  }

  // Table sorting (assuming a function sortTableByColumn is available)
  $('#shipmentTable th').on('click', function() {
      let column = $(this).index();
      sortTableByColumn('#shipmentTable', column);
  });

  // Uppercase postal codes on leaving the field
  $('.postalCodeInput').on('blur', function() {
      $(this).val($(this).val().toUpperCase());
  });
});
