$(document).ready(function () {
    $(".toggleclass .list-tag").click(function () {
        const content = $(this).next(".list-content");

        if (content.is(":visible")) {
            content.slideUp(300);
        } else {
            $(".list-content").slideUp(300);
            content.slideDown(300);
        }
    });

    $(".tab-list li a").click(function (e) {
        e.preventDefault();
        const currentTab = $(this).attr("href");

        $(".tab-list li").removeClass("active");
        $(this).parent().addClass("active");

        $(".tab-content").fadeOut(300);
        $(currentTab).fadeIn(300);
    });
});
