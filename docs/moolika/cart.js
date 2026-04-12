function renderCart(){

  var cart = getCart();

  var html = "";
  var total = 0;

  for(var k in cart){

    var i = cart[k];

    var size = String(i.size).replace("kg","");
    var price = Number(i.price);
    var qty   = Number(i.qty);

    var t = price * Number(size) * qty;
    total += t;

    html += '<div style="border-bottom:1px solid #eee;padding:6px 0;font-size:13px;">'

          + '<div><b>' + i.name + ' (' + size + 'kg)</b></div>'

          + '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px;">'

          + '<div>'
          + '<button onclick="changeQty(\'' + k + '\', -1)">➖</button> '
          + qty +
          ' <button onclick="changeQty(\'' + k + '\', 1)">➕</button>'
          + '</div>'

          + '<div>₹' + t + '</div>'

          + '<div>'
          + '<button onclick="removeItem(\'' + k + '\')">❌</button>'
          + '</div>'

          + '</div>'
          + '</div>';
  }

  document.getElementById("cart").innerHTML = html || "Empty";
  document.getElementById("total").innerHTML = total;
}
