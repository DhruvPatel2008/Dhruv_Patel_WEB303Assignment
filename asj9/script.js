$(document).ready(function(){
    var originalData = [];
    var sortOrder = { column: null, ascending: true };

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
        if (sortOrder.column === column) {
            sortOrder.ascending = !sortOrder.ascending;
        } else {
            sortOrder.column = column;
            sortOrder.ascending = true;
        }

        originalData.sort(function(a, b) {
            if (a[column] < b[column]) return sortOrder.ascending ? -1 : 1;
            if (a[column] > b[column]) return sortOrder.ascending ? 1 : -1;
            return 0;
        });

        updateChevrons();
        renderTable(originalData);
    }

    function updateChevrons() {
        $('th a').html(function() {
            var column = $(this).data('column');
            var chevron = sortOrder.ascending ? '&#x25B2;' : '&#x25BC;';
            return `${column} ${sortOrder.column === column ? chevron : ''}`;
        });
    }

    $.ajax({
        url: 'characters.json',
        dataType: 'json',
        success: function(data) {
            originalData = data;
            renderTable(data);
        }
    });

    $('th a').on('click', function(e) {
        e.preventDefault();
        var column = $(this).data('column');
        sortData(column);
    });
});
