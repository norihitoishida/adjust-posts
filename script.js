function format(otayori) {

  // String型にする
  otayori = String(otayori);

  // 文頭(行頭ではなく文全体の頭)のスペース/改行を削除
  otayori = otayori.trimStart();

  // 行末のスペースを削除
  otayori = otayori.replace(/([ 　]+)$/mg, "");

  // 「 」を「改行」にする(英語のスペースは改行しない)
  if(document.getElementById("spacenewline").checked) {
    otayori = otayori.replace(/(?<![a-z]|[A-Z])([ 　]+)(?![a-z]|[A-Z])/g, "\n");
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

  // 改行数を固定する
  if(document.getElementById("doublenewline").checked) {
    otayori = otayori.replace(/\n+/g, "\n");
  }

  return otayori;
}

function linespace() {
  // 単位なし(推奨): 値を要素のフォントサイズに掛けたもの
  // valueはstringなので注意
  let ls = Number(document.getElementById("linespace").value);
  localStorage.setItem('linespace', String(ls));
  document.getElementById("otayori_adjusted").style.lineHeight = ls + 1;
}

function adjust() {
  let otayori = document.getElementById("otayori_raw").value;
  otayori_array[current_otayori_idx] = otayori;
  localStorage.setItem('otayori_array', JSON.stringify(otayori_array));
  otayori = format(otayori);
  document.getElementById("otayori_adjusted").value = otayori;
  fontsize();
  linespace();
  resize_adjusted_otayori_box();
}

function resize_adjusted_otayori_box(){
  //一度縮めてscrollHeightを全体表示に必要な最低限の大きさになるようにする。
  document.getElementById("otayori_adjusted").style.height = "0.1px";
  //scrollHeightより少し大きくなるようにheightを設定
  let scrollHeight = document.getElementById("otayori_adjusted").scrollHeight;
  document.getElementById("otayori_adjusted").style.height = `${scrollHeight+5}px`;
}

function fontsize(){
  let fs = Number(document.getElementById("fontsize").value);
  localStorage.setItem('fontsize', String(fs));
  document.getElementById("otayori_adjusted").style.fontSize = `${fs}px`;
}

function clear() {
  document.getElementById("otayori_raw").value = "";
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

var current_otayori_idx = 0;
var otayori_array = [];

function init_otayori_array() {
  stored_otayori = JSON.parse(localStorage.getItem('otayori_array'));
  if(Array.isArray(stored_otayori)){
    otayori_array = stored_otayori;
    document.getElementById("otayori_num").innerText = otayori_array.length;
  }else{
    create_otayori();
  }
  load_otayori(0);
}

function create_otayori(){
  otayori_array.push("");
  localStorage.setItem('otayori_array', JSON.stringify(otayori_array));
  document.getElementById("otayori_num").innerText = otayori_array.length;
}

function delete_otayori(index){
  otayori_array.splice(index,1);
  localStorage.setItem('otayori_array', JSON.stringify(otayori_array));
  document.getElementById("otayori_num").innerText = otayori_array.length;
}

function delete_all_otayori(){
  otayori_array=[]
  create_otayori();
  localStorage.setItem('otayori_array', JSON.stringify(otayori_array));
  document.getElementById("otayori_num").innerText = otayori_array.length;
}


function load_otayori(idx){
  current_otayori_idx = idx;
  document.getElementById("otayori_idx").value = current_otayori_idx+1;
  if(idx==0){
    document.getElementById("previous").style.visibility = "hidden";
  }else{
    document.getElementById("previous").style.visibility = "visible";
  }
  if(idx==otayori_array.length-1){
    document.getElementById("next").innerText = "新規作成";
  }else{
    document.getElementById("next").innerText = "　　次へ";
  }
  document.getElementById("otayori_raw").value = otayori_array[current_otayori_idx];
  adjust();
}

function on_previous(){
  if(current_otayori_idx>0){
    load_otayori(current_otayori_idx-1);
  }
}

function on_next(){
  if(current_otayori_idx==otayori_array.length-1){
    create_otayori();
  }
  if(current_otayori_idx<otayori_array.length-1){
    load_otayori(current_otayori_idx+1);
  }
}

function on_delete(){
  delete_otayori(current_otayori_idx);
  if(otayori_array.length==0){
    create_otayori();
  }
  if(current_otayori_idx>otayori_array.length-1){
    current_otayori_idx=otayori_array.length-1;
  }
  load_otayori(current_otayori_idx);
}


function on_delete_all(){
  delete_all_otayori();
  load_otayori(0);
}

function init_config(){
  ls = Number(localStorage.getItem("linespace"));
  if(ls!=null){
    document.getElementById("linespace").value=`${ls}`;
  }
  fs = Number(localStorage.getItem("fontsize"));
  if(fs!=null){
    document.getElementById("fontsize").value=`${fs}`;
  }
}

function initialization(){
  init_config();
  init_otayori_array();
}

let fontSize = 16;
document.getElementById("clear").addEventListener("click", function(){
  clear();adjust();
});
document.getElementById("example").addEventListener("click", example);
document.getElementById("linespace").addEventListener("input", adjust);
document.getElementById("fontsize").addEventListener("input", adjust);
document.getElementById("kutennewline").addEventListener("change", adjust);
document.getElementById("addkuten").addEventListener("change", adjust);
document.getElementById("spacenewline").addEventListener("change", adjust);
document.getElementById("doublenewline").addEventListener("change", adjust);
document.getElementById("otayori_raw").addEventListener("input", function(){
    setTimeout(adjust, 10);     // 10ミリ秒後に実行（入力が反映されてから実行）
}, false);
document.getElementById("previous").addEventListener("click", on_previous);
document.getElementById("next").addEventListener("click", on_next);
document.getElementById("delete").addEventListener("click", on_delete);
document.getElementById("delete_all").addEventListener("click", on_delete_all);

window.addEventListener("load",initialization);
window.addEventListener("load",resize_adjusted_otayori_box);
