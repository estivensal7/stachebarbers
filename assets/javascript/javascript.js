$(document).ready(function() {

        // window.scroll function to style navigation bar
        $(window).on("scroll", function() {
                if ( $(window).scrollTop() ) {
                        $("nav").addClass("transparent");
                } else {
                        $("nav").removeClass("transparent");
                }
        })

})