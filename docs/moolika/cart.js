function getCart(){
try{return JSON.parse(localStorage.getItem("cart"))||{};}catch(e){return {};}
}

function saveCart(cart){
localStorage.setItem("cart",JSON.stringify(cart));
renderCart();
}

function addItem(name,price){

var cart=getCart();
var size=parseFloat(document.getElementById("size_"+name).value)||0;
var key=name+"_"+size;

if(!cart[key]){
cart[key]={name:name,size:size,price:price,qty:0};
}

cart[key].qty++;
saveCart(cart);
}

function changeQty(key,delta){

var cart=getCart();

if(cart[key]){
cart[key].qty+=delta;
if(cart[key].qty<=0){delete cart[key];}
}

saveCart(cart);
}

function removeItem(key){
var cart=getCart();
delete cart[key];
saveCart(cart);
}

function renderCart(){

var cart=getCart();
var html="";
var total=0;

for(var k in cart){

var i=cart[k];
var t=i.price*i.size*i.qty;
total+=t;

html+="<div style='padding:6px;border-bottom:1px solid #eee;'>";

html+="<div><b>"+i.name+" ("+i.size+"kg)</b></div>";

html+="<div style='display:flex;justify-content:space-between;'>";

html+="<div>";
html+="<button onclick=\"changeQty('"+k+"',-1)\">-</button> "+i.qty+" ";
html+="<button onclick=\"changeQty('"+k+"',1)\">+</button>";
html+="</div>";

html+="<div>₹"+t+"</div>";

html+="<div><button onclick=\"removeItem('"+k+"')\">X</button></div>";

html+="</div></div>";
}

document.getElementById("cart").innerHTML=html||"Empty";
document.getElementById("total").innerHTML=total;
}
