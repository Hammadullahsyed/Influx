var num = 1;
var canvas = document.getElementById('spec');
var ctx = canvas.getContext('2d');
ctx.canvas.width = document.documentElement.clientWidth;
ctx.canvas.height = "50";
var dataURL;

// create an image object and get it’s source
var imgg = new Image();

// copy the image to the canvas
$(imgg).load(function () {
    ctx.drawImage(imgg, 0, 0);
    $('.go').hide();
});

imgg.src = 'Spectrum.jpg';

function pick(event) {
    // getting user coordinates
    var x = event.pageX - this.offsetLeft;
    var y = event.pageY - this.offsetTop;
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    var R = data[0];
    var G = data[1];
    var B = data[2];
    var rgb = w3color("rgb(" + R + ',' + G + ',' + B + ")");
    console.log('RGB: ' + R + "," + G + "," + B);
    if (rgb.valid) {
        var hsl = rgb.toHsl();
        console.log(hsl.h);
        console.log(hsl.s * 100 + "%");
        console.log(hsl.l * 100 + "%");
        setMod1(hsl.h);
        //setMod2(hsl.h);
    }
}

// To Set Mod1
function setMod1(h) {
    //Removing previous ones
    var myNode = document.getElementById("mod1");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    //adding new ones
    var s = 100;
    for (var i = 0; i < 21; i++) {
        var mod1 = document.getElementById("mod1");
        var modDiv = document.createElement('div');
        modDiv.className = "modDiv" + i;
        modDiv.id = "hsl(" + h + "," + s + "%," + "50%" + ")";
        modDiv.style.backgroundColor = "hsl(" + h + "," + s + "%," + "50%" + ")";
        modDiv.onmousemove = function () {
            getVal(this);
        }
        modDiv.onclick = function () {
            setMod2(this);
        }
        mod1.appendChild(modDiv);
        s = s - 5;
    }
}


function setMod2(obj) {
    //Removing previous ones
    var myNode = document.getElementById("mod2");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    console.log('i got called');
    var col = obj.id;
    var hsl = w3color(col);
    hsl = hsl.toHsl();
    var h = hsl.h;
    var s = hsl.s * 100;
    console.log(h + "--" + s);

    //adding new ones
    var l = 100;
    for (var i = 0; i < 21; i++) {
        var mod2 = document.getElementById("mod2");
        var modDiv = document.createElement('div');
        modDiv.className = "modDivv" + i;
        modDiv.id = "hsl(" + h + "," + s + "%," + l + "%)";
        modDiv.style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
        modDiv.onmousemove = function () {
            getVal(this);
        }
        modDiv.onclick = function () {
            setVal(this);
        }
        mod2.appendChild(modDiv);
        l = l - 5;
    }
}

function getVal(mod) {
    console.log(mod.id);
    if (num != 0) {
        $(".box" + num).css({
            "background-color": mod.id
        });
    }
}

function setVal(mod) {
    console.log('I should be the last one');
    console.log(mod.id);
    if (num != 0) {
        $(".box" + num).css({
            "background-color": mod.id
        });
        $(".box" + num).attr('id', mod.id);
        $(".box" + num).toggleClass('clicked');
    }
    num++;
    $(".box" + num).toggleClass('clicked');
}

$(document).ready(function () {
    $(".box" + num).toggleClass('clicked');
});

$(".box").click(function () {
    var boxNo = $(this).attr('class');
    console.log(boxNo);
    String(boxNo);
    num = boxNo.charAt(boxNo.length - 1);
    $(this).toggleClass('clicked').siblings('.box').removeClass('clicked');
});

$('#btn1').click(function () {
    $(".box" + num).css({
        "background-color": ""
    });
    $(".box" + num).attr('id', '');
    $(".box" + num).removeClass("clicked");
    num--;
});

$('#btn3').click(function () {
    $(".box").css({
        "background-color": ""
    });
    $(".box" + num).attr('id', '');
    $('.box').removeClass("clicked");
    num = 0;
});

canvas.addEventListener('click', pick);


//Draw on big Canvas
$('#btn4').click(function () {
    console.log('hi there');
    var c = document.getElementById("myCanvas");
    console.log(c);
    var ctx = c.getContext("2d");
    var h_wid = ctx.canvas.width / 2;
    var h_hei = ctx.canvas.height / 2;

    var color = $(".box" + i).attr('id');

    if (num <= 2) {

        // fill the whole box
        console.log('NUM: ' + num);
        var color = $(".box" + 1).attr('id');
        console.log($(".box" + 1));
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, h_wid * 2, h_hei * 2);

    } else if (num <= 3) {

        // fill the two halves
        console.log('NUM: ' + num);
        for (var i = 1; i < num; i++) {
            var color = $(".box" + i).attr('id');
            console.log($(".box" + i));
            ctx.fillStyle = color;
            if (i == 1) {
                ctx.fillRect(0, 0, h_wid, h_hei * 2);
            } else if (i == 2) {
                ctx.fillRect(h_wid, 0, h_wid * 2, h_hei * 2);
            }
        }

    } else if (num <= 4) {

        //fill according to those coordinates
        console.log('NUM: ' + num);
        for (var i = 1; i < num; i++) {
            var color = $(".box" + i).attr('id');
            console.log($(".box" + i));
            ctx.fillStyle = color;
            if (i == 1) {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(h_wid, 0);
                ctx.lineTo(h_wid, h_hei);
                ctx.lineTo(0, h_hei * 2);
                ctx.closePath();
                ctx.fill();
            } else if (i == 2) {
                ctx.beginPath();
                ctx.moveTo(h_wid, h_hei);
                ctx.lineTo(0, h_hei * 2);
                ctx.lineTo(h_wid * 2, h_hei * 2);
                ctx.closePath();
                ctx.fill();
            } else if (i == 3) {
                ctx.beginPath();
                ctx.moveTo(h_wid, 0);
                ctx.lineTo(h_wid * 2, 0);
                ctx.lineTo(h_wid * 2, h_hei * 2);
                ctx.lineTo(h_wid, h_hei);
                ctx.closePath();
                ctx.fill();
            }
        }

    } else if (num <= 5) {
        //four boxes like quadrants
        console.log('NUM: ' + num);
        for (var i = 1; i < num; i++) {
            var color = $(".box" + i).attr('id');
            console.log($(".box" + i));
            ctx.fillStyle = color;
            if (i == 1) {
                ctx.fillRect(0, 0, h_wid, h_hei);
            } else if (i == 2) {
                ctx.fillRect(h_wid, 0, h_wid + h_wid, h_hei);
            } else if (i == 3) {
                ctx.fillRect(0, h_hei, h_wid, h_hei + h_hei);
            } else if (i == 4) {
                ctx.fillRect(h_wid, h_hei, h_wid + h_wid, h_hei + h_hei);
            }
        }
    }

    var dataURL = c.toDataURL("image/png").replace("image/png", "image/base64");
    //dataURL = base64_decode(dataURL);
    //colorSetup();
    console.log(dataURL);
    uploadImage(dataURL);
    setTimeout(function() {
         location.href = "pixi.html";
    }, 3000)
});

function uploadImage(url) {
    function start() {
        console.log('google init');
        // Initializes the client with the API key and the Translate API.
        gapi.client.init({
            'apiKey': 'AIzaSyCytP9chhhrTLLwoTb4BYTIusBgE5xlvoM',
            'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v2/rest'],
        }).then(function (response) {
            console.log(response);
        }, function (reason) {
            console.log('Error: ' + reason.result.error.message);
        });
    };

    // Loads the JavaScript client library and invokes `start` afterwards.
    gapi.load('client', start);
}

//sketch.js

// var COLOURS = [];

// function colorSetup() {
//     for (var i = 1; i < num; i++) {
//         var color = $(".box" + i).attr('id');
//         var colour = w3color(color);
//         colour = colour.toHexString();
//         COLOURS[i] = colour;
//         if(i > num){
//             color = $(".box"+num-1).attr('id');
//             var colour = w3color(color);
//             colour = colour.toHexString();
//             COLOURS[num] = colour;
//         }
//     }

//     for (var i = 1; i < num; i++) {
//         console.log('--' + COLOURS[i]);
//     }
// }

// var radius = 0;
// Sketch.create({
//     fullscreen: false,
//     height: 450,
//     width: 1225,
//     container: document.getElementById('canv'),
//     autoclear: false,
//     retina: 'auto',
//     setup: function () {
//         console.log('setup');
//     },
//     update: function () {
//         radius = 2 + abs(sin(this.millis * 0.003) * 50);
//     },
//     // Event handlers
//     keydown: function () {
//         if (this.keys.C) this.clear();
//     },
//     // Mouse & touch events are merged, so handling touch events by default
//     // and powering sketches using the touches array is recommended for easy
//     // scalability. If you only need to handle the mouse / desktop browsers,
//     // use the 0th touch element and you get wider device support for free.
//     touchmove: function () {
//         for (var i = this.touches.length - 1, touch; i >= 0; i--) {
//             touch = this.touches[i];
//             this.lineCap = 'round';
//             this.lineJoin = 'round';
//             this.fillStyle = this.strokeStyle = COLOURS[i % COLOURS.length];
//             this.lineWidth = radius;
//             this.beginPath();
//             this.moveTo(touch.ox, touch.oy);
//             this.lineTo(touch.x, touch.y);
//             this.stroke();
//         }
//     }
// });


// pixi.js
// import * as PIXI from 'pixi.js';

// console.clear();

// var app = new PIXI.Application(1225, 450, {
//     autoStart: false,
//     backgroundColor: 0x000000,
//     view: myCanvas
// });

// var rt = [];
// for (var i = 0; i < 3; i++) rt.push(PIXI.RenderTexture.create(app.screen.width, app.screen.height));
// var current = 0;

// var bg, brush, displacementFilter;

// var container = new PIXI.Container();
// app.stage.addChild(container);

// app.loader.add('bg', dataURL);
// app.loader.add('one', 'https://raw.githubusercontent.com/PavelLaptev/test-rep/master/dis-varOne.png');
// app.loader.load(function (loader, resources) {
//     var tempBg = new PIXI.Sprite(resources.bg.texture);
//     tempBg.width = app.screen.width;
//     tempBg.height = app.screen.height;

//     app.renderer.render(tempBg, rt[0]);
//     bg = new PIXI.Sprite(rt[0]);

//     brush = new PIXI.Sprite(resources.one.texture);
//     brush.anchor.set(0.5);
//     displacementFilter = new PIXI.filters.DisplacementFilter(brush);
//     container.filters = [displacementFilter];
//     displacementFilter.scale.x = 10;
//     displacementFilter.scale.y = 10;

//     container.addChild(bg, brush);

//     app.stage.interactive = true;

//     app.stage.on('pointerdown', onPointerDown)
//         .on('pointerup', onPointerUp)
//         .on('pointermove', onPointerMove);

//     app.start();
// });

// function snap(event) {
//     app.renderer.render(app.stage, rt[2 - current]);
//     bg.texture = rt[2 - current];
//     current = 2 - current;
// }

// var dragging = false;

// function onPointerDown(event) {
//     dragging = true;
//     onPointerMove(event);
// }

// function onPointerMove(event) {
//     const x = event.data.global.x;
//     const y = event.data.global.y;
//     displacementFilter.scale.x = Math.atan(x - brush.x) * 4;
//     displacementFilter.scale.y = Math.atan(y - brush.y) * 4;

//     brush.position.copy(event.data.global);
//     if (dragging) snap(event);
// }

// function onPointerUp() {
//     dragging = false;
// }
