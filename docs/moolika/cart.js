function getCart(){
return JSON.parse(localStorage.getItem("cart") || "{}");
}

function saveCart(cart){
localStorage.setItem("cart", JSON.stringify(cart));
renderCart();
}

function addItem(name,price){

var cart = getCart();

var size = document.getElementById("size_"+name).value;
var key = name+"_"+size;

if(cart[key]){
cart[key].qty++;
}else{
cart[key]={name:name,size:size,price:price,qty:1};
}

saveCart(cart);
}

function renderCart(){

var cart = getCart();

var html="";
var total=0;

for(var k in cart){

var i = cart[k];
var t = Number(i.price) * Number(i.size) * Number(i.qty);

total += t;

html += `${i.name} (${i.size}) x ${i.qty} = ₹${t}<br>`;
}

document.getElementById("cart").innerHTML = html || "Empty";
document.getElementById("total").innerHTML = total;
}
