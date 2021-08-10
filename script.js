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
  if(document.getElementById("kutennewline").checked) {
    otayori = otayori.replace(/(。+)/g, "$1\n");
  }

  // 「。」の無い行末に「。」を追加する
  // 「エクスクラメーション」「クエスチョン」「括弧閉じ」の場合は無視する
  if(document.getElementById("addkuten").checked) {    
    otayori = otayori.replace(/([^。!！?？」\n])([\n])/g, "$1。$2");
    otayori = otayori.replace(/([^。!！?？」\n])$/g, "$1。");
  }

  // 改行数を固定する(空白1行)
  if(document.getElementById("doublenewline").checked) {
    otayori = otayori.replace(/\n+/g, "\n\n");
  }

  return otayori;
}

function linespace(){
  document.getElementById("otayori_adjusted").style.lineHeight = Number(document.getElementById("linespace").value)+1
}

function adjust() {
    let otayori = document.getElementById("otayori_raw").value;
    otayori = cleanup(otayori);
    document.getElementById("otayori_adjusted").value = otayori;
}

function zoomin(){
    fontSize = Math.min(fontSize+5, 100);
    document.getElementById("otayori_adjusted").style.fontSize = `${fontSize}px`;
}

function zoomout(){
    fontSize = Math.max(fontSize-5, 1);
    document.getElementById("otayori_adjusted").style.fontSize = `${fontSize}px`;
}

function clear(){
    document.getElementById("otayori_adjusted").value = "";
}

function initialize(){
    fontSize = 16;
    document.getElementById("otayori_adjusted").style.fontSize = `${fontSize}px`;
}

let fontSize = 16;
document.getElementById("adjust").addEventListener("click", adjust);
document.getElementById("zoomin").addEventListener("click", zoomin);
document.getElementById("zoomout").addEventListener("click", zoomout);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("initialize").addEventListener("click", initialize);
document.getElementById("linespace").addEventListener("input", linespace);
document.getElementById("kutennewline").addEventListener("change", adjust);
document.getElementById("addkuten").addEventListener("change", adjust);
document.getElementById("spacenewline").addEventListener("change", adjust);
document.getElementById("doublenewline").addEventListener("change", adjust);
