$(document).ready(function() {

        // window.scroll function to style navigation bar
        $(window).on("scroll", function() {
                if ( $(window).scrollTop() ) {
                        $("nav").addClass("transparent");
                } else {
                        $("nav").removeClass("transparent");
                }
        })

        // HOME PAGE SCROLL/ANIMATE FUNCTIONS
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

        // ABOUT PAGE SCROLL / LOAD FUNCTIONS
        $(window).on("load", function() {
                $(".top-sec-header").addClass("animated fadeInLeft");

                $(".about-content-img").addClass("animated fadeInRight");
        })

        $(".about-page-scroll").click(function() {
                $("html, body").animate({
                        scrollTop: $(".about-page-content-container").offset().top - 205
                }, 2000);
        });

        $(".about-content-scroll").click(function() {
                $("html, body").animate({
                        scrollTop: $(".barbers-list-container").offset().top - 115
                }, 2000);
        });

        $(".about-footer-scroll").click(function() {
                $("html, body").animate({
                        scrollTop: $(".about-page-top-sec").offset().top - 50
                }, 2000);
        });

        // ABOUT PAGE SCROLL INTO VIEW FUNCTION
        function isScrolledIntoView(elem) {
                var docViewTop = $(window).scrollTop();
                var docViewBottom = docViewTop + $(window).height() + 700;
                
                var elemTop = $(elem).offset().top;
                var elemBottom = elemTop + $(elem).height();
                
                return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }

                // If element is scrolled into view, fade it in
        $(window).scroll(function() {
                $('.scroll-animations .animated').each(function() {
                        if (isScrolledIntoView(this) === true) {
                                $(this).addClass('fadeInUp delay-.5s');
                        }
                });
        });

        // SERVICES PAGE SCROLL FUNCTIONS
        $(".services-content-scroll").click(function() {
                $("html, body").animate({
                        scrollTop: $(".services-divider-container").offset().top - 200
                }, 2000);
        });

        $(".services-content-scroll").click(function() {
                $("html, body").animate({
                        scrollTop: $(".services-divider-container").offset().top - 200
                }, 2000);
        });

        $(".services-footer-scroll").click(function() {
                $("html, body").animate({
                        scrollTop: $(".services-page-top-sec").offset().top - 50
                }, 2000);
        });

        // GALLERY LANDING PAGE ANIMATED FUNCTIONS
        $(window).on("load", function() {
                $(".gallery-shop-link").addClass("animated fadeInUp");

                $(".gallery-gentlemens-link").addClass("animated fadeInUp");
                console.log(window);
        })

        $(".gallery-footer-scroll").click(function() {
                $("html, body").animate({
                        scrollTop: $(".gallery-page-top-sec").offset().top - 50
                }, 2000);
        });

});