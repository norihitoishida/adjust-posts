function cleanup(otayori) {

  // String型にする
  otayori = String(otayori);

  // 文頭のスペースを削除
  if (otayori.charAt(0)===" " || otayori.charAt(0)==="　") {
    otayori = otayori.slice(1);
  }

  // 「 」を「改行」にする
  if(document.getElementById("spacenewline").checked) {
    otayori = otayori.replace(/([ 　]+)/g, "\n");
  }

  // 「。」を「。改行」にする
  // 「。 改行」の場合スペースを消去
  if(document.getElementById("kutennewline").checked) {
    otayori = otayori.replace(/(。+[」)）]?)([ 　]*)(?!$)/mg, "$1\n");
  }

  // 「。」の無い行末に「。」を追加する
  // 「エクスクラメーション」「クエスチョン」「括弧閉じ」「、」の場合は無視する
  if(document.getElementById("addkuten").checked) {
    otayori = otayori.replace(/([^。!！?？、,.」）)])$/mg, "$1。");
  }

  // 改行数を固定する(空白1行)
  if(document.getElementById("doublenewline").checked) {
    otayori = otayori.replace(/\n+/g, "\n\n");
  }

  return otayori;
}

function linespace() {
  document.getElementById("otayori_adjusted").style.lineHeight = Number(document.getElementById("linespace").value)+1
}

function adjust() {
  let otayori = document.getElementById("otayori_raw").value;
  otayori = cleanup(otayori);
  document.getElementById("otayori_adjusted").value = otayori;
  let scrollHeight = document.getElementById("otayori_adjusted").scrollHeight;
  document.getElementById("otayori_adjusted").style.height = `${scrollHeight}px`;
}

function zoomin(){
  fontSize = Math.min(fontSize+5, 100);
  document.getElementById("otayori_adjusted").style.fontSize = `${fontSize}px`;
  adjust();
}

function zoomout(){
  fontSize = Math.max(fontSize-5, 1);
  document.getElementById("otayori_adjusted").style.fontSize = `${fontSize}px`;
  adjust();
}

function clear() {
  document.getElementById("otayori_raw").value = "";
  document.getElementById("otayori_adjusted").value = "";
}

function initialize(){
  fontSize = 16;
  document.getElementById("otayori_adjusted").style.fontSize = `${fontSize}px`;
}

function example() {
  let sampletxt =
    "俺ね、アレのライブ行ったよ、ラブライブ。4回目のライブかな。どこでやってた奴か忘れたけど。" +
    "そう雪ヤバかったやつ。あん時に食ったねえ…そう、あの時牛丼食ったんだよ帰り道に。" +
    "寒い中食った牛丼がめちゃくちゃ美味かったんだよなぁ…人生で一番美味かった。" +
    "それで食べ物の美味しさって値段じゃないんだなって思ったわ。チー牛だったかどうかはちょっと忘れた。";
  document.getElementById("otayori_raw").value = sampletxt;
}

let fontSize = 16;
document.getElementById("adjust").addEventListener("click", adjust);
document.getElementById("zoomin").addEventListener("click", zoomin);
document.getElementById("zoomout").addEventListener("click", zoomout);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("initialize").addEventListener("click", initialize);
document.getElementById("example").addEventListener("click", example);
document.getElementById("linespace").addEventListener("input", linespace);
document.getElementById("kutennewline").addEventListener("change", adjust);
document.getElementById("addkuten").addEventListener("change", adjust);
document.getElementById("spacenewline").addEventListener("change", adjust);
document.getElementById("doublenewline").addEventListener("change", adjust);
