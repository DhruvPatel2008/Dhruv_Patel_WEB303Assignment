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

$(document).ready(function() {
    var sortOrder = {};
    $('.sort-header').click(function(e) {
        e.preventDefault();
        var header = $(this).parent('th');
        var column = header.index();
        var order = sortOrder[column] || 0;
        sortOrder = {};  // Resetting sort order for all columns
        sortOrder[column] = (order + 1) % 3;  // Toggling sort order
        sortTable(column, sortOrder[column]);
        updateChevron(header, sortOrder[column]);
    });

    function sortTable(column, order) {
        var rows = $('#characters-table tbody tr').get();
        rows.sort(function(a, b) {
            var valA = $(a).children('td').eq(column).text().toUpperCase();
            var valB = $(b).children('td').eq(column).text().toUpperCase();
            if (order === 1) return valA < valB ? -1 : valA > valB ? 1 : 0;  // Ascending
            if (order === 2) return valA < valB ? 1 : valA > valB ? -1 : 0;  // Descending
            return $(a).index() - $(b).index();  // Original order
        });
        $.each(rows, function(index, row) {
            $('#characters-table tbody').append(row);
        });
    }

    function updateChevron(header, order) {
        $('.sort-header').parent('th').removeClass('sort-asc sort-desc');
        if (order === 1) header.addClass('sort-asc');
        if (order === 2) header.addClass('sort-desc');
    }
});
