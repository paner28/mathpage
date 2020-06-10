function cuturl(){
    var href = window.location.href ;
    var question_num = Number(href.slice(44,-5));
    return question_num;
}

console.log("12");

//CSVファイルを読み込む関数getCSV()の定義
function getCSV(){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "main.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
    req.onload = function(){
	var result = convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
	return result;
	console.log(result);
    }
    return result;
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
    return result;
}

var question_num = cuturl();
console.log(question_num);
var result = getCSV(question_num);
console.log(result);

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
