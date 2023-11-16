$(document).ready(function() {
    // Load character data from the JSON file
    $.getJSON('characters.json', function(characters) {
        // Populate the table with character data
        characters.forEach(function(character) {
            $('#characters-table tbody').append(
                '<tr>' +
                '<td>' + character.firstName + '</td>' +
                '<td>' + character.lastName + '</td>' +
                // Add other character details here
                '</tr>'
            );
        });

        // Implement search functionality
        $('#search-input').on('keyup', function() {
            var searchTerm = $(this).val().toLowerCase();
            $('#characters-table tbody tr').filter(function() {
                $(this).toggle($(this).find('td:first').text().toLowerCase().indexOf(searchTerm) > -1)
            });
        });

        // Implement filter functionality
        $('#filter-button-a-m').on('click', function() {
            filterByLastName('A', 'M');
        });

        $('#filter-button-n-z').on('click', function() {
            filterByLastName('N', 'Z');
        });

        function filterByLastName(startLetter, endLetter) {
            $('#characters-table tbody tr').filter(function() {
                var lastName = $(this).find('td:nth-child(2)').text().charAt(0).toUpperCase();
                var isVisible = lastName >= startLetter && lastName <= endLetter;
                $(this).toggle(isVisible);
            });
        }
    });
});
