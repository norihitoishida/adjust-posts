function cleanup(otayori) {
    // String型にする
    otayori = String(otayori);

    // 読点無しの入力に対して文末に。がつかないこと対策
    otayori += "。";

    // 半角・全角スペースと改行を「。」にする
    otayori = otayori.replace(/ /g, "。");
    otayori = otayori.replace(/　/g, "。");
    otayori = otayori.replace(/\r?\n/g, "。");

    // 「。」が2個以上連続してる所を「。」1個にする
    otayori = otayori.replace(/。{2,}/g, "。");

    // 「。」を「。改行改行」にする
    otayori = otayori.replace(/。/g, "。\n\n");
    
    return otayori;
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
