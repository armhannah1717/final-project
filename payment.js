
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let orderList = document.getElementById("order-list");
let grandTotal = document.getElementById("grand-total");

function loadOrder(){

    let html = "";
    let total = 0;

    if(cart.length === 0){
        html = "<p>Your cart is empty.</p>";
    }

   cart.forEach((item, index) => {

    total += item.price * item.qty;

    html += `
    <div class="order-item">

        <img src="${item.img}" width="60">

        <div class="order-info">
            <b>${item.name}</b><br>
            <span class="order-meta">Size: ${item.size}</span><br>

            <div class="qty-box">
                <button onclick="decreaseQty(${index})">-</button>
                <span>${item.qty}</span>
                <button onclick="increaseQty(${index})">+</button>
            </div>
        </div>

        <span>$${item.price * item.qty}</span>

        <button class="remove-page" onclick="removeItem(${index})">X</button>

    </div>
    `;
});

    orderList.innerHTML = html;
    grandTotal.innerText = total;
}

loadOrder();


function makePayment(){

    let name = document.getElementById("fullname").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    if(name==="" || phone==="" || address===""){
        alert("Please fill all information.");
        return;
    }

    document.getElementById("payment-box").style.display = "none";
    document.getElementById("success-box").style.display = "block";

    localStorage.removeItem("cart");
}
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQty(index){
    cart[index].qty++;
    saveCart();
    loadOrder();
}

function decreaseQty(index){

    if(cart[index].qty > 1){
        cart[index].qty--;
    }else{
        cart.splice(index,1);
    }

    saveCart();
    loadOrder();
}

function removeItem(index){
    cart.splice(index,1);
    saveCart();
    loadOrder();
}