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
  // カッコの内側では改行しない
  if(document.getElementById("kutennewline").checked) {
    /*
    二重のreplaceメソッドで処理をする
    外側のreplaceでカッコの外側を抽出し、文章の断片を置換の対象として絞り込む
    "),」,文頭"のいずれかと"(,「,文末"のいずれかとの間にある場合にカッコの外側と判定
    カッコの外側の文その右側にある左カッコ(文末でなければ)を置換する
    例:
    入力:適当な薬品の入った瓶を傾けて。「ははっ。ちょっと調合の具合がおかしいかな。ま、授業用には十分か。」とかほざいてた。友人は当然ハァ？って感じ。
    置換対象:
    適当な薬品の入った瓶を傾けて。「
    とかほざいてた。友人は当然ハァ？って感じ。
    */
    otayori = otayori.replace(/((?<=[\)」）])|^)[^\(\)「」（）]*(([\(「（])|$)/mg, (match, offset, string) => {
      /*
      内側のreplaceで置換対象の末尾以外の「。」を「。改行」にする
      元の文の行末以外は末尾に左カッコがついているので改行されるが、元の文の行末の「。」は改行されない
      例1:
      置換前:
      適当な薬品の入った瓶を傾けて。「
      置換後:
      適当な薬品の入った瓶を傾けて。
      「

      例2:
      置換前:
      とかほざいてた。友人は当然ハァ？って感じ。
      置換後:
      とかほざいてた。
      友人は当然ハァ？って感じ。
      */
      return match.replace(/(。+)([ 　]*)(?!$)/mg, "$1\n");
    });
    /*
    "内側の処理によって置換された各カッコの外側の断片"が外側の置換処理によって元の断片"と置き換えられる
    例:
    入力:適当な薬品の入った瓶を傾けて。「ははっ。ちょっと調合の具合がおかしいかな。ま、授業用には十分か。」とかほざいてた。友人は当然ハァ？って感じ。
    出力
    適当な薬品の入った瓶を傾けて。
    「ははっ。ちょっと調合の具合がおかしいかな。ま、授業用には十分か。」とかほざいてた。
    友人は当然ハァ？って感じ。
    */

    /*
    「。」の直後にカッコ閉じが入る場合にはカッコ閉じの後に改行
    */
    otayori = otayori.replace(/(。+)([ 　]*)([\)」）])(?!$)/mg, "$1$3\n");
  }

  // 「。」の無い行末に「。」を追加する
  // 「エクスクラメーション」「クエスチョン」「括弧閉じ」「、」の場合は無視する
  if(document.getElementById("addkuten").checked) {
    otayori = otayori.replace(/([^。!！?？、,.」])$/mg, "$1。");
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
