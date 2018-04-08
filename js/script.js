// Initialize Firebase
//ar firebase = require("firebase");
$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyCQpVICGzXMlpn6LyYFY9RKF6L4OFc1v8w",
        authDomain: "influxapp-441d9.firebaseapp.com",
        databaseURL: "https://influxapp-441d9.firebaseio.com",
        projectId: "influxapp-441d9",
        storageBucket: "influxapp-441d9.appspot.com",
        messagingSenderId: "348490407315"
    };
    firebase.initializeApp(config);
    console.log(firebase);
});
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
    setTimeout(function () {
        location.href = "pixi.html";
    }, 3000)
});

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}


var i = 1;

function uploadImage(url) {
    //get file and in my case its DataURL
    var file = url;
    var uri;
    var index = guid();
    //create storage ref
    var storageRef = firebase.storage().ref('gallery/pic ' + index +".jpg");

    //upload file
    var uploadTask = storageRef.putString(file, 'data_url');

    //handling callbacks
    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        // Handle unsuccessful uploads
        console.log(error);
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uri = uploadTask.snapshot.downloadURL;
        var d = new Date();

        var imgData = {
            name: 'pic',
            create_date: d,
            img_uri: uri
        }

        var newPostKey = firebase.database().ref().child('images/').push().key;
        var updates = {};
        updates['/images/' + newPostKey] = imgData;
        firebase.database().ref().update(updates);
    });
}