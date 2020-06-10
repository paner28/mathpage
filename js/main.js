// urlを読みこむ関数
function cuturl(){
    var href = window.location.href ;
    var question_num = Number(href.slice(45,-5));
    return question_num;
    console.log(question_num");
}

//CSVファイルを読み込む関数getCSV()の定義
function getCSV(){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "main.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
    req.onload = function(){
	convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
    var result = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }
    console.log(result)

    var q1 = document.getElementById("q1");
    var q2 = document.getElementById("q2");
    var q3 = document.getElementById("q3");

    const child1 = document.createElement('div');
    child1.textContent = result[question_num][2];
    q1.appendChild(child1)
    const child2 = document.createElement('div');
    child2.textContent = result[question_num][3];
    q2.appendChild(child2)
    const child3 = document.createElement('div');
    child3.textContent = result[question_num][4];
    q3.appendChild(child3)
}

var question_num = cuturl();
var result = getCSV(question_num);

// ここから正誤判定
const sendButton = document.getElementById('send');
sendButton.addEventListener('click', showResults);

function showResults(){
    const target = document.getElementById("answer").value.split(' ');
    var answers=[0,1];
    var judge = 1;
    if(target.length == answers.length){
        for(let i=0; i<target.length; i++){
            if(answers.indexOf(parseFloat(target[i])) >= 0){}else{judge = 0;}
        }
        if(judge==1){alert("正解🎊");}else{alert("✖不正解✖");}
    }else{alert("✖不正解✖");}
}

// 以下描写に関する内容
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var mouse={x:0,y:0,x1:0,y1:0,color:"black"};

var draw=false;canvas.addEventListener("mousemove",function(e){
    var rect=e.target.getBoundingClientRect();
    ctx.lineWidth=document.getElementById("lineWidth").value;
    ctx.globalAlpha=document.getElementById("alpha").value/100;mouseX=e.clientX-rect.left;
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

$('li').click(function(){
    ctx.strokeStyle=$(this).css('background-color');
});

$('#clear').click(function(e){
    if(!confirm('本当に消去しますか？'))return;
    e.preventDefault();
    ctx.clearRect(0,0,canvas.width,canvas.height);
});

function save(){
    var can=canvas.toDataURL("image/png");
    can=can.replace("image/png","image/octet-stream");
    window.open(can,"save");
}

var finger=new Array;for(var i=0;i<10;i++){
    finger[i]={x:0,y:0,x1:0,y1:0,color:"rgb("+Math.floor(Math.random()*16)*15+","+Math.floor(Math.random()*16)*15+","+Math.floor(Math.random()*16)*15+")"};
}

canvas.addEventListener("touchstart",function(e){
    e.preventDefault();
    var rect=e.target.getBoundingClientRect();
    ctx.lineWidth=document.getElementById("lineWidth").value;ctx.globalAlpha=document.getElementById("alpha").value/100;undoImage=ctx.getImageData(0,0,canvas.width,canvas.height);
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

alpha.addEventListener("touchmove",function(){
    var alphaNum=document.getElementById("alpha").value;document.getElementById("alphaNum").innerHTML=alphaNum;
});
