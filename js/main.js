function cuturl(){
    var href = window.location.href ;
    var a = href.split("question");
    var b = a[2].split("-");
    var num = [0,0];
    num[0] = Number(b[0]);
    num[1] = Number(b[1].slice(0,-5));
    return num;
}

// CSVファイル読み込み
function csvToArray(path) {
        var csvData = new Array();
        var data = new XMLHttpRequest();        
        data.open("GET", path, false);
        data.send(null);
        var LF = String.fromCharCode(10);
        var lines = data.responseText.split(LF);
        for (var i = 0; i < lines.length;++i) {
                var cells = lines[i].split(",");
                if( cells.length != 1 ) {
                        csvData.push(cells);
                }
        }
        return csvData;
}

var answers = [];
var num = cuturl();
var q1 = document.getElementById("q1");
var q2 = document.getElementById("q2");
var q3 = document.getElementById("q3");
var q4 = document.getElementById("q4");
var q5 = document.getElementById("q5");

if (num[0]==1){
    var question_num = num[1];
}else{
    var question_num = (num[0]-1)*100 + num[1];
}

// ページロード時に実行
window.onload=function () {
    var result = csvToArray("main.csv");
    for (let i=1 ; i < result.length; i++){
        if(result[i][1] == question_num){
            answers = result[i][4].split(" ");
            const child1 = document.createElement('span');
            child1.textContent = result[i][2];
            q1.appendChild(child1)
            const child2 = document.createElement('span');
            child2.textContent = result[i][3];
            q2.appendChild(child2)
            const child3 = document.createElement('span');
            child3.textContent = "Q" + num[1] + ".";
            q3.appendChild(child3)
            const child4 = document.createElement('span');
            child4.textContent = "☆".repeat(Number(result[i][5]));
            q4.appendChild(child4)
            const child5 = document.createElement('span');
            child5.textContent = result[i][6]
            q5.appendChild(child5)
        }
    }

    // ここから正誤判定
    const sendButton = document.getElementById('send');
    sendButton.addEventListener('click', showResults);

    function showResults(){
        const target = document.getElementById("answer").value.split(' ');
        var judge = 1;
        if(target.length == answers.length){
            for(let i=0; i<target.length; i++){
                if(answers.indexOf(target[i]) >= 0){}else{judge = 0;}
            }
            if(judge==1){alert("正解🎊");}else{alert("✖不正解✖");}
        }else{alert("✖不正解✖");}
    }

    console.log(result);
};


// ここからcanvas
var parent = null; // キャンバスの親要素
var canvas = null; // キャンバス
var g = null;  // コンテキスト
var $id = function(id){ return document.getElementById(id); };  // DOM取得用
var img = new Image(); //画像用
var IMG_COOLMAN = "coolman.png";

// キャンバスのサイズをウインドウに合わせて変更
function getSize(){
    // キャンバスのサイズを再設定
    canvas.width = parent.offsetWidth - 100;
    canvas.height = 800;
}

//  リサイズ時
window.addEventListener("resize", function(){
    getSize();
});

// 起動処理
window.addEventListener("load", function(){
    // キャンバスの親要素情報取得（親要素が無いとキャンバスのサイズが画面いっぱいに表示できないため）
    parent = $id("parent");
    canvas = $id("canvas");
    // キャンバスをウインドウサイズにする
    getSize();

});

// 以下描写に関する内容
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var mouse={x:0,y:0,x1:0,y1:0,color:"black"};

var draw=false;canvas.addEventListener("mousemove",function(e){
    var rect=e.target.getBoundingClientRect();
    ctx.lineWidth=document.getElementById("lineWidth").value;
    mouseX=e.clientX-rect.left;
    mouseY=e.clientY-rect.top;
    if(draw===true){
        ctx.beginPath();
        ctx.moveTo(mouseX1,mouseY1);
        ctx.lineTo(mouseX,mouseY);
        ctx.lineCap="round";
        ctx.stroke();
        mouseX1=mouseX;mouseY1=mouseY;
    }
});

canvas.addEventListener("mousedown",function(e){
    draw=true;mouseX1=mouseX;mouseY1=mouseY;undoImage=ctx.getImageData(0,0,canvas.width,canvas.height);
});

canvas.addEventListener("mouseup",function(e){
    draw=false;
});

lineWidth.addEventListener("mousemove",function(){
    var lineNum=document.getElementById("lineWidth").value;document.getElementById("lineNum").innerHTML=lineNum;
});




color1 = $id("black");
color1.addEventListener("click", function(){
    ctx.strokeStyle = $(this).css('background-color');
});
color2 = $id("white");
color2.addEventListener("click", function(){
    ctx.strokeStyle = $(this).css('background-color');
});
color3 = $id("red");
color3.addEventListener("click", function(){
    ctx.strokeStyle = $(this).css('background-color');
});
color4 = $id("blue");
color4.addEventListener("click", function(){
    ctx.strokeStyle = $(this).css('background-color');
});

$('#clear').click(function(e){
    if(!confirm('本当に消去しますか？'))return;
    e.preventDefault();
    ctx.clearRect(0,0,canvas.width,canvas.height);
});

//戻るボタンを配置
$('#undo').click(function(e) {
    ctx.putImageData(undoImage,0,0);
});

// function save(){
//     var can=document.getElementById('canvas');
//     can=can.replace("image/png","image/octet-stream");
//     window.open(can,"save");
// }


var finger=new Array;for(var i=0;i<10;i++){
    finger[i]={x:0,y:0,x1:0,y1:0,color:"rgb("+Math.floor(Math.random()*16)*15+","+Math.floor(Math.random()*16)*15+","+Math.floor(Math.random()*16)*15+")"};
}

canvas.addEventListener("touchstart",function(e){
    e.preventDefault();
    var rect=e.target.getBoundingClientRect();
    ctx.lineWidth=document.getElementById("lineWidth").value;
    ctx.globalAlpha=1;
    undoImage=ctx.getImageData(0,0,canvas.width,canvas.height);
    for(var i=0;i<finger.length;i++){
        finger[i].x1=e.touches[i].clientX-rect.left;finger[i].y1=e.touches[i].clientY-rect.top;
    }
});

canvas.addEventListener("touchmove",function(e){
    e.preventDefault();var rect=e.target.getBoundingClientRect();
    for(var i=0;i<finger.length;i++){
        finger[i].x=e.touches[i].clientX-rect.left;
        finger[i].y=e.touches[i].clientY-rect.top;
        ctx.beginPath();ctx.moveTo(finger[i].x1,finger[i].y1);
        ctx.lineTo(finger[i].x,finger[i].y);ctx.lineCap="round";
        ctx.stroke();
        finger[i].x1=finger[i].x;finger[i].y1=finger[i].y;
    }
});

lineWidth.addEventListener("touchmove",function(){
    var lineNum=document.getElementById("lineWidth").value;
    document.getElementById("lineNum").innerHTML=lineNum;
});
