// ===== GET CART =====
function getCart(){
  try{
    return JSON.parse(localStorage.getItem("cart")) || {};
  }catch(e){
    return {};
  }
}

// ===== SAVE CART =====
function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ===== ADD ITEM =====
function addItem(name, price){

  var cart = getCart();

  var sizeEl = document.getElementById("size_" + name);
  if(!sizeEl) return;

  var size = parseFloat(sizeEl.value) || 0;
  var key = name + "_" + size;

  if(!cart[key]){
    cart[key] = {
      name: name,
      size: size,
      price: parseFloat(price),
      qty: 0
    };
  }

  cart[key].qty += 1;

  saveCart(cart);
}

// ===== CHANGE QUANTITY =====
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

// ===== REMOVE ITEM =====
function removeItem(key){

  var cart = getCart();

  delete cart[key];

  saveCart(cart);
}

// ===== RENDER CART (SAFE VERSION) =====
function renderCart(){

  var cart = getCart();

  var html = "";
  var total = 0;

  for(var k in cart){

    var i = cart[k];

    var size = parseFloat(i.size) || 0;
    var price = parseFloat(i.price) || 0;
    var qty = parseFloat(i.qty) || 0;

    var t = price * size * qty;
    total += t;

    html += "<div style='padding:6px;border-bottom:1px solid #eee;'>";

    html += "<div><b>" + i.name + " (" + size + "kg)</b></div>";

    html += "<div style='display:flex;justify-content:space-between;margin-top:5px;'>";

    html += "<div>";
    html += "<button onclick=\"changeQty('" + k + "', -1)\">-</button> ";
    html += qty;
    html += " <button onclick=\"changeQty('" + k + "', 1)\">+</button>";
    html += "</div>";

    html += "<div>₹" + t + "</div>";

    html += "<div>";
    html += "<button onclick=\"removeItem('" + k + "')\">X</button>";
    html += "</div>";

    html += "</div>";
    html += "</div>";
  }

  var cartDiv = document.getElementById("cart");
  var totalDiv = document.getElementById("total");

  if(cartDiv) cartDiv.innerHTML = html || "Empty";
  if(totalDiv) totalDiv.innerHTML = total;
}
