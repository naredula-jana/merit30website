// GET CART
function getCart(){
  try{
    return JSON.parse(localStorage.getItem("cart")) || {};
  }catch(e){
    return {};
  }
}

// SAVE CART
function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ADD ITEM
function addItem(name, price){

  var cart = getCart();

  var size = document.getElementById("size_"+name).value;
  var key = name + "_" + size;

  if(!cart[key]){
    cart[key] = {
      name: name,
      size: Number(size),
      price: Number(price),
      qty: 0
    };
  }

  cart[key].qty += 1;

  saveCart(cart);
}

// CHANGE QUANTITY (+ / -)
function changeQty(key, delta){

  var cart = getCart();

  if(cart[key]){
    cart[key].qty += delta;

    if(cart[key].qty <= 0){
      delete cart[key];
    }
  }

  saveCart(cart);
}

// REMOVE ITEM
function removeItem(key){

  var cart = getCart();

  delete cart[key];

  saveCart(cart);
}

// RENDER CART (FINAL UI)
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
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;border-bottom:1px solid #ddd;padding-bottom:5px;">

      <div style="flex:2;">
        <b>${i.name}</b><br>
        <small>${size}kg</small>
      </div>

      <div style="flex:2;text-align:center;">
        <button onclick="changeQty('${k}', -1)">➖</button>
        ${qty}
        <button onclick="changeQty('${k}', 1)">➕</button>
      </div>

      <div style="flex:1;text-align:right;">
        ₹${t}
      </div>

      <div style="flex:0.5;text-align:right;">
        <button onclick="removeItem('${k}')">❌</button>
      </div>

    </div>
    `;
  }

  document.getElementById("cart").innerHTML = html || "Empty";
  document.getElementById("total").innerHTML = total;
}
