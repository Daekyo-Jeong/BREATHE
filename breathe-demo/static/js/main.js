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

var act_area = document.getElementById("act-area"),
    play_button = document.getElementsByClassName("play-button"),
    word = document.getElementsByClassName("word"),
    video = document.getElementsByClassName("video"),
    video1 = document.getElementById("video1"),
    video2 = document.getElementById("video2"),
    close_btn = document.getElementsByClassName("video-close-button"),
    video_bg = document.getElementById("video-background");

var cv = document.getElementById("main"),
    c = cv.getContext("2d"),
    particles = {},
    particleIndex = 0,
    particleNum = 1000,

    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
var t = getRandomInt(0, particleNum);

var video_done = false;


//canvas size
cv.width = WIDTH;
cv.height = HEIGHT;

//background color
c.fillStyle = "black";
c.fillRect(0, 0, cv.width, cv.height);


function Particle() {
    this.count = particleNum;
    this.t = t + Math.random() * 360;
    this.ts = getRandomInt(1, 5);
    this.ns = getRandomInt(1, 8);

    this.w = getRandomInt(0.1, 1.5);

    if (innerWidth > 500) {
        this.targetradius = 200;
        this.targetnoiseX = getRandomInt(-30, 30);
        this.targetnoiseY = getRandomInt(-30, 30);
    }
    if (innerWidth <= 500) {
        this.targetradius = 110;
        this.targetnoiseX = getRandomInt(-15, 15);
        this.targetnoiseY = getRandomInt(-15, 15);
    }

    this.maxradius = 0;
    this.transradius = 0.03;
    this.radius = 0;

    this.noiseX = 0;
    this.noiseY = 0;


    this.transnoise = 0.01;

    particleIndex++;
    particles[particleIndex] = this;
    this.id = particleIndex;
    this.color = "rgba(255,255,255,0.5)";
    //this.color = "rgba(" + parseInt(Math.random() * 360, 10) + ",255,255,0.5) ";
}

Particle.prototype.draw = function () {

    var distR = Math.floor(this.targetradius - this.maxradius);
    this.maxradius = this.maxradius + (distR * this.transradius * this.ns);
    this.radius = this.maxradius;

    var distnX = Math.floor(this.targetnoiseX - this.noiseX);
    this.noiseX = this.noiseX + (distnX * this.transnoise * this.ns);
    this.nX = this.noiseX;

    var distnY = Math.floor(this.targetnoiseY - this.noiseY);
    this.noiseY = this.noiseY + (distnY * this.transnoise * this.ns);
    this.nY = this.noiseY;

    this.t += 0.001 * this.ts;
    this.x = innerWidth / 2 + (Math.sin(this.t) * this.radius) + this.nX;
    this.y = innerHeight / 2 + (Math.cos(this.t) * this.radius) + this.nY;

    c.beginPath();
    c.arc(this.x, this.y, this.w, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
};

for (var i = 0; i < particleNum; i++) {
    new Particle();
}

var speed = 0.05,
    margin = 50,
    areaWidth = $("#act-area").width(),
    areaHeight = $("#act-area").height();

var xpos = new Array,
    ypos = new Array,
    xs = new Array,
    ys = new Array;

var mov_items = {},
    mov_itemIndex = 0,
    mov_itemNum = play_button.length;

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function randomPos() {
    areaWidth = $("#act-area").width();
    areaHeight = $("#act-area").height();
    for (var i = 0; i < mov_itemNum; i++) {
        xs[i] = getRandom(-speed, speed);
        ys[i] = getRandom(-speed, speed);
        xpos[i] = getRandom(margin + i * (areaWidth / 2 - margin / 2), (areaWidth / 2 - margin / 2) + i * areaWidth / 2 - margin / 2);

        //            xpos[0] = getRandom(margin, areaWidth/2-margin/2);
        //            xpos[1] = getRandom(areaWidth/2+margin/2, areaWidth-margin);
        ypos[i] = getRandom(margin, areaHeight - margin);
    }
}

function Movbtn() {
    randomPos();
    mov_itemIndex++;
    mov_items[mov_itemIndex] = this;
    this.id = mov_itemIndex;
}

Movbtn.prototype.draw = function () {
    for (var i = 0; i < 2; i++) {
        xpos[i] += xs[i];
        ypos[i] += ys[i];

        play_button[i].style.left = xpos[i] + "px";
        play_button[i].style.top = ypos[i] + "px";

        if (xpos[i] > (areaWidth / 2 - margin / 2) + i * areaWidth / 2 - margin / 2) {
            xs[i] *= -1;
        }
        if (xpos[i] < margin + i * (areaWidth / 2 - margin / 2)) {
            xs[i] *= -1;
        }

        if (ypos[i] > areaHeight - margin) {
            ys[i] *= -1;
        }
        if (ypos[i] < margin) {
            ys[i] *= -1;
        }
    }
};

for (var i = 0; i < 2; i++) {
    new Movbtn();
}

function draw() {
    requestAnimationFrame(draw);

    if (cv.width !== window.innerWidth || cv.height !== window.innerHeight) {
        cv.width = window.innerWidth;
        cv.height = window.innerHeight;
        c.clearRect(0, 0, cv.width, cv.height);
        randomPos();
        onMouseOut();

    } else {
        c.clearRect(0, 0, cv.width, cv.height);
    }

    for (var i in particles) {
        particles[i].draw();
    }

    for (var i in mov_items) {
        mov_items[i].draw();
    }
}
draw();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onMouseOver() {
    console.log($(window.innerWidth));
    console.log(innerWidth);
    for (var i in particles) {
        var circle = particles[i];
        circle.targetnoiseX = getRandomInt(-3, 3);
        circle.targetnoiseY = getRandomInt(-3, 3);
        if (innerWidth > 500) {
            circle.targetradius = 130;
        }
        if (innerWidth <= 500) {
            circle.targetradius = 70;
        }
    }
    $(".play-button").css("display", "block");
    $(".word").css("opacity", "0");
}

function onMouseOut() {

    for (var i in particles) {
        var circle = particles[i];

        if (innerWidth > 500) {
            circle.targetradius = 200;
            circle.targetnoiseX = getRandomInt(-30, 30);
            circle.targetnoiseY = getRandomInt(-30, 30);
        }
        if (innerWidth <= 500) {
            circle.targetradius = 110;
            circle.targetnoiseX = getRandomInt(-15, 15);
            circle.targetnoiseY = getRandomInt(-15, 15);
        }
    }
    $(".play-button").css("display", "none");
    $(".word").css("opacity", "0");
}

function videoOn() {
    $("#video-background").fadeIn(2000);
    $("#video-box").fadeIn(1500);
    $(".video-close-button").css("display", "block");
}

function videoOff() {
    onMouseOut();
    video1.currentTime = 0;
    video2.currentTime = 0;
    video1.pause();
    video2.pause();
    $(".video-close-button").css("display", "none");
    act_area.style.display = "block";
    $("#video-box").fadeOut(1000);
    $("#video-background").fadeOut(1000);
    $(video1).fadeOut(1000);
    $(video2).fadeOut(1000);
}

$(function () {
    sessionStorage.setItem("filter-num", 0);
    sessionStorage.setItem("grid", 0);
    $(act_area).on("mouseenter", onMouseOver);
    $(act_area).on("mouseleave", onMouseOut);
    close_btn[0].addEventListener("click", videoOff, false);
    video_bg.addEventListener("click", videoOff, false);

    for (let i = 0; i < play_button.length; i++) {
        $(play_button[i]).on("click", function () {
            videoOn();
            $(video[i]).fadeIn(2000);
            video[i].play();
        });
        $(play_button[i]).on("mouseenter", function () {
            $(word[i]).css("opacity", "1");
        });
        $(play_button[i]).on("mouseleave", function () {
            $(word[i]).css("opacity", "0");
        });
    }
    for (let i = 0; i < video.length; i++) {
        video[i].addEventListener("ended", videoOff, false);
    }
});
