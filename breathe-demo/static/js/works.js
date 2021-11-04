window.onload = function () {
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function ( /* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 30);
            };
    })();
    var works_item = document.getElementsByClassName("works-item"),
        works_content = document.getElementsByClassName("works-content"),
        works_thumbnail = document.getElementsByClassName("works-thumbnail-nongrid"),
        category_filter = document.getElementsByClassName("category-filter");

    var btn = document.getElementsByClassName("btn");

    var gridTF = false,
        dropTF = false;

    var margin = 250,
        speed = 0.005,
        areahalf = 180;

    var WIDTH = innerWidth;
    var HEIGHT = innerHeight;

    var xpos = new Array,
        xpost = new Array,
        ypos = new Array,
        ypost = new Array,
        xs = new Array,
        ys = new Array,
        w = new Array,
        r = new Array;

    var miniSize = 15,
        bigSize = 180;

    var works_items = {},
        works_itemIndex = 0,
        works_itemNum = works_item.length;

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomInt(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    function ExceptionRandom(min, max, exmin, exmax) {
        var r = getRandomInt(1, 2);
        if (r == 1) {
            return getRandom(min, exmin);
        } else {
            return getRandom(exmax, max);
        }
    }

    function randomPos() {
        for (var i = 0; i < works_itemNum; i++) {
            xpos[i] = ExceptionRandom(margin, WIDTH - margin, WIDTH / 2 - areahalf, WIDTH / 2 + areahalf);
            //            ypos[i] = ExceptionRandom(margin, HEIGHT - margin, HEIGHT / 2 - areahalf, HEIGHT / 2 + areahalf);
            ypos[i] = getRandom(margin, HEIGHT - margin);
            xs[i] = getRandom(-speed, speed);
            ys[i] = getRandom(-speed, speed);
            r[i] = 0;
            w[i] = miniSize;

            xpost[i] = 0;
            ypost[i] = 0;
        }
    }

    function Worksitem() {
        randomPos();
        works_itemIndex++;
        works_items[works_itemIndex] = this;
        this.id = works_itemIndex;
    }

    Worksitem.prototype.draw = function () {
        //        

        for (var i = 0; i < works_item.length; i++) {
            var distX = Math.floor(xpost[i] - xpos[i]);
            xpos[i] = xpos[i] + (distX * 0.00015 * r[i]) + xs[i];

            var distY = Math.floor(ypost[i] - ypos[i]);
            ypos[i] = ypos[i] + (distY * 0.00015 * r[i]) + ys[i];

            works_item[i].style.left = xpos[i] + "px";
            works_item[i].style.top = ypos[i] + "px";
            works_item[i].style.width = works_item[i].style.height = w[i] + "px";

            if (xpos[i] > WIDTH - margin || xpos[i] < margin) {
                xs[i] *= -1;
            }
            if (ypos[i] > HEIGHT - margin || ypos[i] < margin) {
                ys[i] *= -1;
            }

            if (HEIGHT / 2 - areahalf < ypos[i] && ypos[i] < HEIGHT / 2 + areahalf) {
                if (WIDTH / 2 - areahalf < xpos[i] && xpos[i] < WIDTH / 2 + areahalf) {
                    xs[i] *= -1;
                    ys[i] *= -1;
                }
            }
        }
    };

    function draw() {
        requestAnimFrame(draw);

        if (WIDTH !== innerWidth || HEIGHT !== innerHeight) {
            WIDTH = innerWidth;
            HEIGHT = innerHeight;
            for (var i = 0; i < works_itemNum; i++) {
                xpos[i] = xpos[i] = ExceptionRandom(margin, WIDTH - margin, WIDTH / 2 - areahalf, WIDTH / 2 + areahalf);
                ypos[i] = getRandom(margin, HEIGHT - margin);
            }
        }

        for (var i in works_items) {
            works_items[i].draw();
        }
    }

    for (var i = 0; i < works_itemNum; i++) {
        new Worksitem();
    }

    draw();

    function Searching() {
        var input, filter, div, li, p, i;
        input = document.getElementById("Search");
        filter = input.value.toUpperCase();
        div = document.getElementById("container");
        li = div.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            p = li[i].getElementsByTagName("p")[0];

            if (p.innerHTML.toUpperCase().indexOf(filter) != -1) {
                if (gridTF === false) {
                    li[i].style.display = "block";
                    li[i].style.pointerEvents = "all";
                    li[i].style.opacity = "1";
                    w[i] = miniSize;
                }
                if (gridTF === true) {
                    li[i].style.pointerEvents = "all";
                    $(li[i]).fadeIn("slow");
                    li[i].style.opacity = "1";
                }
            } else {
                if (gridTF === false) {
                    li[i].style.pointerEvents = "none";
                    li[i].style.opacity = "0.5";
                    w[i] = 8;
                }
                if (gridTF === true) {
                    //                        li[i].style.display = "none";
                    $(li[i]).fadeOut("slow");
                    li[i].style.pointerEvents = "none";
                }
            }
        }
    }

    function screenSize(e) {

        if (e === "0" && gridTF === false) {
            if (WIDTH <= 1366) {

                if (WIDTH <= 500) {
                    bigSize = 120;
                } else {
                    bigSize = 150;
                }
                gridTF = true;
                sessionStorage.setItem("grid", 1);

                $("#standard").hide();
                $(btn[1]).hide();
                $(".works-item")
                    .css("display", "block")
                    .css("opacity", "1")
                    .css("position", "inherit")
                    .css("transform", "translate(0, 0)")
                    .css("-ms-transform", "translate(0, 0)")
                    .css("-webkit-transform", "translate(0, 0)")
                    .css("-moz-transform", "translate(0, 0)")
                    .css("-o-transform", "translate(0, 0)")
                    .css("background-color", "rgba(255,255,255,0)");
                $(".works-link").css("opacity", "1");
                $(".works-content")
                    .css("display", "block");
                $("#works-info-area").css("display", "none");
                $("#totop").css("display", "block");
                for (var i = 0; i < works_itemNum; i++) {
                    xpost[i] = WIDTH / 2;
                    ypost[i] = HEIGHT / 2;
                    r[i] = 100;
                    w[i] = bigSize;
                }
            }
            if (WIDTH > 1366) {

                bigSize = 180;
                gridTF = false;
                sessionStorage.setItem("grid", 0);

                $("#standard").show();
                $(btn[1]).show();
                $(".works-item")
                    .css("display", "block")
                    .css("opacity", "1")
                    .css("position", "absolute")
                    .css("transform", "translate(-50%, -50%)")
                    .css("-ms-transform", "translate(-50%, -50%)")
                    .css("-webkit-transform", "translate(-50%, -50%)")
                    .css("-moz-transform", "translate(-50%, -50%)")
                    .css("-o-transform", "translate(-50%, -50%)")
                    .css("background-color", "rgba(255,255,255,0.7)");
                $(".works-link").css("opacity", "0");
                $(".works-content")
                    .css("display", "none");
                $("#works-info-area").css("display", "block");
                $("#totop").css("display", "none");
                for (var i = 0; i < works_itemNum; i++) {

                    w[i] = miniSize;
                    //$(works_item[i]).css("animation","breathing "+getRandomInt(3,7)+"s ease-in infinite normal");
                }
            }
        }
        if (e === "1" && gridTF === true) {
            if (WIDTH > 1366) {

                bigSize = 180;

                $("#standard").show();
                $(btn[1]).show();
                $(btn[1]).css("opacity", "1");
                $(".works-item")
                    .css("display", "block")
                    .css("opacity", "1")
                    .css("position", "inherit")
                    .css("transform", "translate(0, 0)")
                    .css("-ms-transform", "translate(0, 0)")
                    .css("-webkit-transform", "translate(0, 0)")
                    .css("-moz-transform", "translate(0, 0)")
                    .css("-o-transform", "translate(0, 0)")
                    .css("background-color", "rgba(255,255,255,0)");
                $(".works-link").css("opacity", "1");
                $(".works-content")
                    .css("display", "block");
                $("#works-info-area").css("display", "none");
                $("#totop").css("display", "block");
                for (var i = 0; i < works_itemNum; i++) {
                    xpost[i] = WIDTH / 2;
                    ypost[i] = HEIGHT / 2;
                    r[i] = 100;
                    w[i] = bigSize;
                }
            }
            if (WIDTH <= 1366) {

                if (WIDTH <= 500) {
                    bigSize = 120;
                } else {
                    bigSize = 150;
                }

                $("#standard").hide();
                $(btn[1]).hide();
                $(".works-item")
                    .css("display", "block")
                    .css("opacity", "1")
                    .css("position", "inherit")
                    .css("transform", "translate(0, 0)")
                    .css("-ms-transform", "translate(0, 0)")
                    .css("-webkit-transform", "translate(0, 0)")
                    .css("-moz-transform", "translate(0, 0)")
                    .css("-o-transform", "translate(0, 0)")
                    .css("background-color", "rgba(255,255,255,0)");
                $(".works-link").css("opacity", "1");
                $(".works-content")
                    .css("display", "block");
                $("#works-info-area").css("display", "none");
                $("#totop").css("display", "block");
                for (var i = 0; i < works_itemNum; i++) {
                    xpost[i] = WIDTH / 2;
                    ypost[i] = HEIGHT / 2;
                    r[i] = 100;
                    w[i] = bigSize;
                }
            }
        }
    }

    function filtering(e) {
        var current = document.getElementsByClassName("category-filter-active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" category-filter-active", "");
        }
        $(category_filter[e]).addClass("category-filter-active");

        var button, filter, div, li, p, i;
        filter = category_filter[e].innerHTML.toUpperCase();
        div = document.getElementById("container");
        li = div.getElementsByClassName("works-item");
        for (i = 0; i < li.length; i++) {
            p = li[i].getElementsByTagName("p")[0];
            if (p.innerHTML.toUpperCase().indexOf(filter) > -1) {
                if (!gridTF) {
                    $(li[i])
                        .css("display", "block")
                        .css("pointer-events", "all")
                        .css("opacity", "1");
                    w[i] = miniSize;
                }
                if (gridTF) {
                    $(li[i]).show()
                        .css("pointer-events", "all")
                        .css("opacity", "1");
                }
            } else {
                if (!gridTF) {
                    $(li[i])
                        .css("pointer-events", "none")
                        .css("opacity", "0.5");
                    w[i] = miniSize / 2;
                }
                if (gridTF) {
                    $(li[i]).hide()
                        .css("pointer-events", "none");
                }
            }
        }
    }

    function align() {
        var current = document.getElementsByClassName("category-filter-active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" category-filter-active", "");
        }
        $(category_filter[0]).addClass("category-filter-active");
        sessionStorage.setItem("filter-num", 0);
        //스탠다드    
        if (!gridTF) {
            for (var i = 0; i < works_itemNum; i++) {
                xpost[i] = innerWidth / 2;
                ypost[i] = innerHeight / 2;
                r[i] = getRandom(1, 5);
            }
            $("#works-info-area").fadeOut(1000);
            $(".works-item")
                .css("opacity", "1")
                .fadeOut(1000)
                .css("pointer-events", "all");

            $(btn[1]).css("opacity", "1");
            sessionStorage.setItem("grid", 1);

            setTimeout(function () {
                $(".works-item")
                    .fadeIn("slow")
                    .css("position", "inherit")
                    .css("transform", "translate(0, 0)")
                    .css("-ms-transform", "translate(0, 0)")
                    .css("-webkit-transform", "translate(0, 0)")
                    .css("-moz-transform", "translate(0, 0)")
                    .css("-o-transform", "translate(0, 0)")
                    .css("background-color", "rgba(255,255,255,0)");
                $(".works-link").css("opacity", "1");
                $(".works-content")
                    .css("display", "block");
                $("#totop").css("display", "block");

                for (var i = 0; i < works_itemNum; i++) {
                    w[i] = bigSize;
                }
            }, 1000);
        }
        //자유분방
        if (gridTF) {
            $(btn[1]).css("opacity", "0.6");
            $(".works-item")
                .css("display", "block")
                .css("opacity", "1")
                .css("position", "absolute")
                .css("transform", "translate(-50%, -50%)")
                .css("-ms-transform", "translate(-50%, -50%)")
                .css("-webkit-transform", "translate(-50%, -50%)")
                .css("-moz-transform", "translate(-50%, -50%)")
                .css("-o-transform", "translate(-50%, -50%)")
                .css("background-color", "rgba(255,255,255,0.7)")
                .css("pointer-events", "none");
            $(".works-link").css("opacity", "0");
            $(".works-content")
                .css("display", "none");
            $("#totop").css("display", "none");
            $("#works-info-area").fadeIn(1000);
            sessionStorage.setItem("grid", 0);

            for (var i = 0; i < works_itemNum; i++) {
                xpost[i] = ExceptionRandom(margin, WIDTH - margin, WIDTH / 2 - (areahalf + 150), WIDTH / 2 + (areahalf + 150));
                ypost[i] = getRandom(margin, HEIGHT - margin);
                r[i] = getRandom(3, 5);
                w[i] = miniSize;
            }

            setTimeout(function () {
                for (var i = 0; i < works_itemNum; i++) {
                    r[i] = 0;
                    xpost[i] = 0;
                    ypost[i] = 0;
                }
                $(".works-item").css("pointer-events", "all");
            }, 3500);

        }
        gridTF = !gridTF;
    }

    $(function () {
        //align();
        if (sessionStorage.getItem("grid") === null) {
            if (WIDTH <= 1366) {
                sessionStorage.setItem("grid", 1);
            } else {
                sessionStorage.setItem("grid", 0);
            }
        }
        if (sessionStorage.getItem("filter-num") === null) {
            sessionStorage.setItem("filter-num", 0);
        }

        if (sessionStorage.getItem("grid") > 0) {
            gridTF = true;
        } else {
            gridTF = false;
        }

        screenSize(sessionStorage.getItem("grid"));
        filtering(sessionStorage.getItem("filter-num"));



        for (let i = 0; i < works_itemNum; i++) {
            //contents hover
            $(works_item[i]).on("mouseenter", function () {
                if (WIDTH > 1366) {
                    if (gridTF === false) {
                        xs[i] = 0;
                        ys[i] = 0;
                        w[i] = miniSize + 20;
                        works_item[i].style.zIndex = "1";

                        $(works_thumbnail[i])
                            .css("opacity", "1");
                    }
                    if (gridTF === true) {
                        works_item[i].style.transition = "1s";
                        works_item[i].style.transform = "translateY(-2px)";
                    }
                } else {
                    works_item[i].style.transform = "translateY(-2px)";
                }
            });
            //contents leave
            $(works_item[i]).on("mouseleave", function () {
                if (WIDTH > 1366) {
                    if (gridTF === false) {
                        xs[i] = getRandom(-speed, speed);
                        ys[i] = getRandom(-speed, speed);
                        w[i] = miniSize;

                        works_item[i].style.zIndex = "0";
                        $(works_thumbnail[i]).css("opacity", "0");
                    }

                    if (gridTF === true) {
                        w[i] = bigSize;
                        works_item[i].style.transform = "translateY(2px)";
                        works_item[i].style.transition = "1s";
                        setTimeout(function () {
                            works_item[i].style.transition = "0s";
                        }, 1000);
                    }
                } else {
                    works_item[i].style.transform = "translateY(2px)";
                    works_item[i].style.transition = "1s";
                    setTimeout(function () {
                        works_item[i].style.transition = "0s";
                    }, 1000);
                }
            });
            //contents click
            $(".works-item").on("click", function () {
                sessionStorage.setItem("link", "work");
            });

        }
        //search btn
        $("#Search").on("keyup", Searching);

        $("#search-btn").on("click", function () {

            if (WIDTH <= 1366) {
                $(".topbar-nav").fadeOut();
                $(".search-txt")
                    .css("width", WIDTH - 200 + "px");
            } else {
                $(".search-txt")
                    .css("width", 330 + "px");
            }
            $(".search-txt")
                .css("border-bottom", "2px solid")
                .focus();
            $(btn[0]).css("opacity", "1");
        });

        $(".search-txt").on("focusout", function () {
            $(".topbar-nav").fadeIn();
            $(".search-txt")
                .css("width", "0")
                .css("border", "none");
            $(btn[0]).css("opacity", "0.6");
        });

        //grid btn
        $("#grid-btn").on("click", function () {
            align();
        });

        //filter btn
        for (let i = 0; i < category_filter.length; i++) {
            $(category_filter[i]).on("click", function () {
                filtering(i);
                if (typeof (Storage) !== "undefined") {
                    sessionStorage.setItem("filter-num", i);
                }
                console.log(sessionStorage.getItem("filter-num"));
            });
        }
        //$(".category-filter").on("click", filtering());
    });
};
