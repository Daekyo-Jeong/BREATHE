window.onload = function () {
    var designers = document.getElementsByClassName("designers-item");
    var designers_info = document.getElementsByClassName("designers-info-item");

    for (let i = 0; i < designers.length; i++) {
        designers[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("designers-active");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" designers-active", "");
            }
            var current2 = document.getElementsByClassName("designers-info-active");
            if (current2.length > 0) {
                current2[0].className = current2[0].className.replace(" designers-info-active", "");
            }
            $(".designers-info").show();
            $(designers[i]).addClass("designers-active");
            $(designers_info[i]).addClass("designers-info-active");
            sessionStorage.setItem("link","designer");
        });
    }

    $(function () {
        sessionStorage.setItem("filter-num", 0);
        sessionStorage.setItem("grid", 0);
        
        $(".designers-exit-btn").on("click", function () {
        $(".designers-info").hide();
    });
    });
};
