function format(otayori) {

  // String型にする
  otayori = String(otayori);

  // 文頭(行頭ではなく文全体の頭)のスペース/改行を削除
  otayori = otayori.trim();

  // 「 」を「改行」にする(英語のスペースは改行しない)
  if(document.getElementById("spacenewline").checked) {
    otayori = otayori.replace(/([ 　]+)(?![a-z]|[A-Z])(?<![a-z]|[A-Z])/g, "\n");
  }

  // 「。」を「。改行」にする
  // 「。 改行」の場合スペースを消去
  if(document.getElementById("kutennewline").checked) {
    otayori = otayori.replace(/(。+[」\)）]?)([ 　]*)(?!$)/mg, "$1\n");
  }

  // 「。」の無い行末に「。」を追加する
  // 「エクスクラメーション」「クエスチョン」「括弧閉じ」「、」の場合は無視する
  if(document.getElementById("addkuten").checked) {
    otayori = otayori.replace(/([^。!！?？、,.」）\)])$/mg, "$1。");
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
  otayori = format(otayori);
  document.getElementById("otayori_adjusted").value = otayori;
  let scrollHeight = document.getElementById("otayori_adjusted").scrollHeight;
  document.getElementById("otayori_adjusted").style.height = `${scrollHeight}px`;
  linespace();
}

function fontsize(){
  fontSize = Number(document.getElementById("fontsize").value);
  document.getElementById("otayori_adjusted").style.fontSize = `${fontSize}px`;
}

function clear() {
  document.getElementById("otayori_raw").value = "";
  document.getElementById("otayori_adjusted").value = "";
}


function example() {
  let sampletxt =
    "俺ね、アレのライブ行ったよ、ラブライブ。4回目のライブかな。どこでやってた奴か忘れたけど。" +
    "そう雪ヤバかったやつ。あん時に食ったねえ…そう、あの時牛丼食ったんだよ帰り道に。" +
    "寒い中食った牛丼がめちゃくちゃ美味かったんだよなぁ…人生で一番美味かった。" +
    "それで食べ物の美味しさって値段じゃないんだなって思ったわ。チー牛だったかどうかはちょっと忘れた。";
  document.getElementById("otayori_raw").value = sampletxt;
  adjust();
}


let fontSize = 16;
document.getElementById("adjust").addEventListener("click", adjust);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("example").addEventListener("click", example);
document.getElementById("linespace").addEventListener("input", linespace);
document.getElementById("fontsize").addEventListener("input", fontsize);
document.getElementById("kutennewline").addEventListener("change", adjust);
document.getElementById("addkuten").addEventListener("change", adjust);
document.getElementById("spacenewline").addEventListener("change", adjust);
document.getElementById("doublenewline").addEventListener("change", adjust);
document.getElementById("otayori_raw").addEventListener("paste", function(){
    setTimeout(adjust, 10);       // 10ミリ秒後に実行（貼り付けが反映されてから実行）
}, false);
