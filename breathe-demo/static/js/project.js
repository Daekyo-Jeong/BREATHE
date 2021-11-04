window.onload = function () {
    var students = document.getElementsByClassName("project-student"),
        students_info = document.getElementsByClassName("project-student-info-item");

    for (let i = 0; i < students.length; i++) {
        students[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("student-active");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" student-active", "");
            }
            var current2 = document.getElementsByClassName("student-info-active");
            if (current2.length > 0) {
                current2[0].className = current2[0].className.replace(" student-info-active", "");
            }
            students[i].className += " student-active";
            students_info[i].className += " student-info-active";
        });
    }

    $(function () {
        if (sessionStorage.getItem("link") === "work") {
            $("#exit-btn").attr("href", "../../works.html");
            $("#project-bg").attr("href", "../../works.html");
        }
        if (sessionStorage.getItem("link") === "designer") {
            $("#exit-btn").attr("href", "../../designer.html");
            $("#project-bg").attr("href", "../../designer.html");
        }
    });
};
