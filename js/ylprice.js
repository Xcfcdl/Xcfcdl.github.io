import { initializeMenu } from './menu_container.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
    // 其他初始化代码


function changetext() {
  var price = document.getElementById('price').value;
  var a = Number(price);
  var b = a * 0.95;
  var c = a * 0.9;
  var d = a * 0.85;
  var e = a * 0.80;
  a = a.toFixed(2);
  b = b.toFixed(2);
  c = c.toFixed(2);
  d = d.toFixed(2);
  e = e.toFixed(2);

  var ht = `<br><center><table border="1" id="priceTable"><tr><td>数量（折扣）</td><td>价格</td></tr><tr><td>1-99(原价)</td><td>${a}</td></tr><tr><td>100-500(九五折)</td><td>${b}</td></tr><tr><td>500-1000(九折)</td><td>${c}</td></tr><tr><td>1000-3000(八五折)</td><td>${d}</td></tr><tr><td>5000以上(八折)</td><td>${e}</td></tr></table></center>`;

  var div = document.getElementById('p1');
  div.setAttribute("style", "text-align: left;white-space:pre;");
  div.innerHTML = ht;
}
document.getElementById('copyButton').addEventListener('click', function() {
  var table = document.getElementById('priceTable');
  var range = document.createRange();
  range.selectNode(table);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  navigator.clipboard.writeText(range.toString()).then(() => {
    alert('表格已复制到剪贴板!');
  }).catch(err => {
    console.error('复制失败', err);
    alert('复制失败,请手动复制.');
  });
  window.getSelection().removeAllRanges();
});
});