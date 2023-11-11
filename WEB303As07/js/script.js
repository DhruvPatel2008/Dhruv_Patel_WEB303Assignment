(function($) {
    $.fn.customPhotoViewer = function() {
        this.each(function() {
            var $thumbnails = $(this).find('.thumbnail');

            // Update main photo and active class on thumbnail click
            $thumbnails.on('click', function(e) {
                e.preventDefault();

                $thumbnails.removeClass('active');

                $(this).addClass('active');

                var newSrc = $(this).attr('href');
                $('.main-photo').attr('src', newSrc);
            });
        });

        return this;
    };
}(jQuery));

$(function () {
    $('#photo-viewer').customPhotoViewer();

    // Open Gallery Button
    $('#open-gallery').on('click', function() {
        $('#photo-viewer').show();
        $('#close-gallery').show();
        $(this).hide();
    });

    // Close Gallery Button
    $('#close-gallery').on('click', function() {
        $('#photo-viewer').hide();
        $('#open-gallery').show();
        $(this).hide();
    });
});
