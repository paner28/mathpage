function cuturl(){
    var href = window.location.href ;
    var a = href.split("question");
    var b = a[1].split("-");
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

if (num[0]==1){
    var question_num = num[1];
}else{
    var question_num = (num[0]-1)*100 + num[1];
}
console.log(question_num);

// ページロード時に実行
window.onload=function () {
    var result = csvToArray("main.csv");
    for (let i=1 ; i < result.length; i++){
        if(result[i][1] == question_num){
            console.log("ok");
            answers = result[i][4].split(" ");
            console.log(answers);
            const child1 = document.createElement('span');
            child1.textContent = result[i][2];
            q1.appendChild(child1)
            const child2 = document.createElement('span');
            child2.textContent = result[i][3];
            q2.appendChild(child2)
            const child3 = document.createElement('span');
            child3.textContent = "Q" + num[1] + ".";
            q3.appendChild(child3)
        }
    }
    console.log(result);
};
