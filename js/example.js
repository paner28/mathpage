function cuturl(){
    var href = window.location.href ;
    var a = href.split("question");
    var b = a[1].split("-");
    var num = [0,0];
    num[0] = Number(b[0]);
    num[1] = Number(b[1].slice(-5));
    return num;
}

console.log("1");

function getCSV(url){
    //CSVファイルを文字列で取得。
    var txt = new XMLHttpRequest();
    txt.open('get', url, false);
    txt.send();
    //改行ごとに配列化
    var arr = txt.responseText.split('\n');
    //1次元配列を2次元配列に変換
    var result = [];
    for(var i = 0; i < arr.length; i++){
        //空白行が出てきた時点で終了
        if(arr[i] == '') break;
        //","ごとに配列化
        result[i] = arr[i].split(',');
        for(var i2 = 0; i2 < result[i].length; i2++){
            // //数字の場合は「"」を削除
            // if(result[i][i2].match(/\-?\d+(.\d+)?(e[\+\-]d+)?/)){
            //     result[i][i2] = parseFloat(result[i][i2].replace('"', ''));
            // }
        }
    }
    return result;
}

var num = cuturl();
console.log(num);
var result = getCSV(main.csv);
  

var q1 = document.getElementById("q1");
var q2 = document.getElementById("q2");
var q3 = document.getElementById("q3");

if (num[0]==1){
    let question_num = num[1];
}else{
    let question_num = (num[0]-1)*100 + num[1];
}

for (let i=0 ; i < result.length; i++){
    if(result[i][1] == question_num){
        const child1 = document.createElement('span');
        child1.textContent = result[i][2];
        q1.appendChild(child1)
        const child2 = document.createElement('span');
        child2.textContent = result[i][3];
        q2.appendChild(child2)
        const child3 = document.createElement('span');
        child3.textContent = result[i][4];
        q3.appendChild(child3)
    }
}
