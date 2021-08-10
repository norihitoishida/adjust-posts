function cleanup(otayori) {
    // String型にする
    otayori = String(otayori);
    
    if(document.getElementById("kutennewline").checked) {
      // 「。」を「。改行」にする
      otayori = otayori.replace(/(。+)/g, "$1\n");
    }

<<<<<<< HEAD
    // 読点無しの入力に対して文末に。がつかないこと対策
    otayori += "。";

    // 半角・全角スペースと改行を「。」にする
    otayori = otayori.replace(/ /g, "。");
    otayori = otayori.replace(/　/g, "。");
    otayori = otayori.replace(/\r?\n/g, "。");
=======
    if(document.getElementById("spacenewline").checked) {
      // 「 」を「改行」にする
      otayori = otayori.replace(/([ 　]+)/g, "\n");
    }
>>>>>>> develop

    if(document.getElementById("addkuten").checked) {
      // 「。」の無い行末に「。」を追加する
      // 「エクスクラメーション」「クエスチョン」「括弧閉じ」の場合は無視する
      otayori = otayori.replace(/([^。!！?？」\n])([\n])/g, "$1。$2");
      otayori = otayori.replace(/([^。!！?？」\n])$/g, "$1。");
    }

    if(document.getElementById("doublenewline").checked) {
      // 改行数を固定する(空白1行)
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
