function getCart(){
  try{
    return JSON.parse(localStorage.getItem("cart")) || {};
  }catch(e){
    return {};
  }
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function addItem(name,price){

  var cart = getCart();

  var size = document.getElementById("size_"+name).value;

  var key = name+"_"+size;

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

function renderCart(){

  var cart = getCart();

  var html = "";
  var total = 0;

  for(var k in cart){

    var i = cart[k];

    var price = Number(i.price) || 0;
    var size  = Number(i.size) || 0;
    var qty   = Number(i.qty) || 0;

    var t = price * size * qty;

    total += t;

    html += i.name + " (" + size + "kg) x " + qty + " = ₹" + t + "<br>";
  }

  var cartDiv = document.getElementById("cart");
  var totalDiv = document.getElementById("total");

  if(cartDiv) cartDiv.innerHTML = html || "Empty";
  if(totalDiv) totalDiv.innerHTML = total;
}
