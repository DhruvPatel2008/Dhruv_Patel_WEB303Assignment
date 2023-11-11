(function($) {
    $.fn.customPhotoViewer = function() {
        this.each(function() {
            var $thumbnails = $(this).find('.thumbnail');

            // Update main photo on thumbnail click
            $thumbnails.on('click', function(e) {
                e.preventDefault();
                var newSrc = $(this).attr('href');
                $('.main-photo').attr('src', newSrc);
            });
        });

        return this;
    };
}(jQuery));
