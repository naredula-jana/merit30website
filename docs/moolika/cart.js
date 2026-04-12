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

    html += `
    <div style="
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:8px;
      padding:6px 0;
      border-bottom:1px solid #eee;
      font-size:14px;
    ">

      <div style="flex:2;">
        ${i.name} (${size}kg)
      </div>

      <div style="flex:2; display:flex; align-items:center; gap:4px;">
        <button onclick="changeQty('${k}', -1)">➖</button>
        <span>${qty}</span>
        <button onclick="changeQty('${k}', 1)">➕</button>
      </div>

      <div style="flex:1; text-align:right;">
        ₹${t}
      </div>

      <div style="flex:0.5; text-align:right;">
        <button onclick="removeItem('${k}')">❌</button>
      </div>

    </div>
    `;
  }

  document.getElementById("cart").innerHTML = html || "Empty";
  document.getElementById("total").innerHTML = total;
}
