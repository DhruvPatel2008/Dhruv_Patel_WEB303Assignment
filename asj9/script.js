$(document).ready(function(){
    var originalData = [];
    var currentData = [];
    var clickCounts = { firstName: 0, lastName: 0, age: 0, role: 0, date: 0 };

    function renderTable(data) {
        var tableContent = data.map(function(character) {
            return '<tr>' +
                   `<td>${character.firstName}</td>` +
                   `<td>${character.lastName}</td>` +
                   `<td>${character.age}</td>` +
                   `<td>${character.role}</td>` +
                   `<td>${character.date}</td>` +
                   '</tr>';
        }).join('');

        $('#characterTable tbody').html(tableContent);
    }

    function sortData(column) {
        clickCounts[column]++;
        if (clickCounts[column] === 3) {
            // Reset to original data and click count
            currentData = originalData.slice();
            clickCounts[column] = 0;
        } else {
            currentData.sort(function(a, b) {
                if (a[column] < b[column]) return clickCounts[column] % 2 === 0 ? 1 : -1;
                if (a[column] > b[column]) return clickCounts[column] % 2 === 0 ? -1 : 1;
                return 0;
            });
        }

        updateChevrons(column);
        renderTable(currentData);
    }

    function updateChevrons(column) {
        $('th a').each(function() {
            var currentColumn = $(this).data('column');
            var chevron = clickCounts[currentColumn] === 1 ? '&#x25B2;' : (clickCounts[currentColumn] === 2 ? '&#x25BC;' : '');
            $(this).html(`${currentColumn} ${currentColumn === column ? chevron : ''}`);
        });
    }

    $.ajax({
        url: 'characters.json',
        dataType: 'json',
        success: function(data) {
            originalData = data;
            currentData = originalData.slice(); // create a copy of the original data
            renderTable(currentData);
        }
    });

    $('th a').on('click', function(e) {
        e.preventDefault();
        var column = $(this).data('column');
        sortData(column);
    });
});
