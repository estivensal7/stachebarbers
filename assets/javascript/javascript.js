$(document).ready(function() {

        // window.scroll function to style navigation bar
        $(window).on("scroll", function() {
                if ( $(window).scrollTop() ) {
                        $("nav").addClass("transparent");
                } else {
                        $("nav").removeClass("transparent");
                }
        })

        $(".first-scroll").click(function() {
                $("html, body").animate({
                        scrollTop: $(".home-content").offset().top - 150
                }, 2000);

                $(".home-content-image").addClass("animated fadeInLeft delay-1s");
        });

        $(".home-content-scroll-down-p").click(function() {
                $("html, body").animate({
                        scrollTop: $(".carousel").offset().top -150
                }, 2000);

                $(".carousel").addClass("animated fadeInUp delay-1s");
        });

        $(".third-scroll").click(function() {
                $("html, body").animate({
                        scrollTop: $(".sec1").offset().top
                }, 2000);
        });

});