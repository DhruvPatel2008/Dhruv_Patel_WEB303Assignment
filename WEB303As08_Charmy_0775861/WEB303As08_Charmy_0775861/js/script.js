function a_to_m() {
    doSearch({
        search: "a_to_m"
    })
}

function n_to_z() {
    doSearch({
        search: "n_to_z"
    })
}

$(document).ready(function() {
    doSearch({
        search: ""
    })
    $(".search").change(function() {
        var search = $(this).val(); // this.value
        doSearch({
            search: search
        });
    });

});

function doSearch(data) {

    $.ajax({
        url: 'config.php',
        data: data,
        type: 'post'
    }).done(function(responseData) {
        var data = JSON.parse(responseData)
        var tr = ''
        data.forEach(element => {
            var cl = element['class']
            var color = cl == "active" ? 'color:#fff' : ''
            tr += '<tr style="'+color+'">'
            var keys = Object.keys(element)
            
            keys.forEach(key => {
                if (key != "class") {
                    tr += '<td class="' + cl + '">' + element[key.toString()] + '</td>'
                }
            })
            tr += '</tr>'
        })

        document.getElementById("tbody").innerHTML = tr;

        console.log('Done: ', responseData);
    }).fail(function() {
        console.log('Failed');
    });
}