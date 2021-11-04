window.onload = function () {

    var professor_item = document.getElementsByClassName("professor-item"),
        professor_text = document.getElementsByClassName("professor-text"),
        professor_slide_btn = document.getElementsByClassName("professor-list-control-btn");
    var slogan = document.getElementsByClassName("slogan"),
        topbar_nav = document.getElementsByClassName("category-scroll");

    var slideNum = 0;

    function professorSlide(index) {
        var moveleft = -(index * 280);
        $(".professor-list-m-m").css("transform", "translateX(" + moveleft + "px)");

        $(".professor-list-control-nav-btn[data-index=" + index + "]").addClass("btn-active");
        $(".professor-list-control-nav-btn[data-index!=" + index + "]").removeClass("btn-active");
        $(".professor-text[data-index=" + index + "]").css("opacity", "1");
        $(".professor-text[data-index!=" + index + "]").css("opacity", "0");
    }

    $(function () {
        sessionStorage.setItem("filter-num", 0);
        sessionStorage.setItem("grid", 0);

        $(".professor-text").each(function (index) {
            $(this).attr("data-index", index);
        });

        $(".professor-list-control-nav-btn").each(function (index) {
            $(this).attr("data-index", index);
        }).click(function () {
            var index = $(this).attr("data-index");
            console.log(index);
            professorSlide(index);
        });

        $(professor_slide_btn[0]).on("click", function () {
            if (slideNum > 0) {
                slideNum--;
            }
            professorSlide(slideNum);
        });
        $(professor_slide_btn[1]).on("click", function () {
            if (slideNum < 5) {
                slideNum++;
            }
            professorSlide(slideNum);
        });

        professorSlide(0);

        for (let i = 0; i < professor_item.length; i++) {
            $(professor_item[i]).on("click", function () {
                $(".professor-content").fadeOut();
                var current = document.getElementsByClassName("professor-active");
                if (current.length > 0) {
                    current[0].className = current[0].className.replace(" professor-active", "");
                }

                professor_item[i].className += " professor-active";
                $(".professor-text").css("opacity", "0");
                $(professor_text[i]).css("opacity", "1");
            });
        }

        $(window).scroll(function () {
            $(".category-scroll").removeClass("category-scroll-active");
            for (var i = 0; i < slogan.length; i++) {
                $(slogan[i]).each(function (i) {

                    var middle_of_element = $(this).offset().top - $(this).outerHeight() / 1.2;
                    var middle_of_window = $(window).scrollTop() + $(window).innerHeight() / 1.2;

                    if (middle_of_window > middle_of_element) {
                        $(this).css("opacity", "1");
                    } else {
                        $(this).css("opacity", "0");
                    }
                });
            }
            var bt = $(".breathe-wrap").offset().top - 10,
                dt = $(".dmd-wrap").offset().top - 10,
                pt = $(".professor-wrap").offset().top - 10,
                st = $(window).scrollTop();


            if (dt > st && st >= bt) {
                $(topbar_nav[0]).addClass("category-scroll-active");
            }
            if (pt > st && st >= dt) {
                $(topbar_nav[1]).addClass("category-scroll-active");
            }
            if (pt <= st) {
                $(topbar_nav[2]).addClass("category-scroll-active");
            }

        });
    });
};
