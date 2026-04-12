function placeOrder(){

var name = document.getElementById("name").value;
var phone = document.getElementById("phone").value;
var address = document.getElementById("address").value;

if(!name || !phone || !address){
alert("Fill all details");
return;
}

var cart = JSON.parse(localStorage.getItem("cart") || "{}");

var text="";
var total=0;

for(var k in cart){
var i=cart[k];
var t=i.price*i.size*i.qty;
total+=t;
text += i.name+"("+i.size+"kg)x"+i.qty+", ";
}

var orderId = "ORD"+new Date().getTime();

var url = "https://script.google.com/macros/s/AKfycbyiSzKMSOQzxYceiq6_vUh5P82zF2OtATCi2DOAuUzOKxSvyII0pGeTrlSL2_JHP0I/exec"
+ "?orderId=" + encodeURIComponent(orderId)
+ "&name=" + encodeURIComponent(name)
+ "&phone=" + encodeURIComponent(phone)
+ "&address=" + encodeURIComponent(address)
+ "&cart=" + encodeURIComponent(text)
+ "&total=" + encodeURIComponent(total)
+ "&agentId=DIRECT";

// ✅ instant response
alert("Order placed: " + orderId);

// ✅ background request
fetch(url).catch(()=>{});

// clear cart
localStorage.setItem("cart","{}");
renderCart();
}
