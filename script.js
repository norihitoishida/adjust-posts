function format(otayori) {

  // String型にする
  otayori = String(otayori);

  // 文頭(行頭ではなく文全体の頭)のスペース/改行を削除
  otayori = otayori.trimStart();

  // 「 」を「改行」にする(英語のスペースは改行しない)
  if(document.getElementById("spacenewline").checked) {
    otayori = otayori.replace(/([ 　]+)(?![a-z]|[A-Z])(?<![a-z]|[A-Z])/g, "\n");
  }

  // 「。」を「。改行」にする
  // 「。 改行」の場合スペースを消去
  if(document.getElementById("kutennewline").checked) {
    otayori = otayori.replace(/(。+[」)）]?)([ 　]*)(?!$)/mg, "$1\n");
  }

  // 「。」の無い行末に「。」を追加する
  // 「エクスクラメーション」「クエスチョン」「括弧閉じ」「、」の場合は無視する
  // 後読みで行末の手前に文字があり(=空行でない)、かつその文字が上記例外文字でない場合に「。」追加
  if(document.getElementById("addkuten").checked) {
    otayori = otayori.replace(/(?<=.)(?<=[^。!！?？、,.」）)])$/mg, "。");
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
  fontsize();
  linespace();
  var min_height = 10;
  //一度縮めてscrollHeightを全体表示に必要な最低限の大きさになるようにする。
  document.getElementById("otayori_adjusted").style.height=`${min_height}px`;
  //scrollHeightより少し大きくなるようにheightを設定
  let scrollHeight = document.getElementById("otayori_adjusted").scrollHeight;
  document.getElementById("otayori_adjusted").style.height = `${scrollHeight+5}px`;
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
document.getElementById("linespace").addEventListener("input", adjust);
document.getElementById("fontsize").addEventListener("input", adjust);
document.getElementById("kutennewline").addEventListener("change", adjust);
document.getElementById("addkuten").addEventListener("change", adjust);
document.getElementById("spacenewline").addEventListener("change", adjust);
document.getElementById("doublenewline").addEventListener("change", adjust);
document.getElementById("otayori_raw").addEventListener("paste", function(){
    setTimeout(adjust, 10);       // 10ミリ秒後に実行（貼り付けが反映されてから実行）
}, false);
