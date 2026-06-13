let cart = JSON.parse(localStorage.getItem("cart")) || [];

let box = document.getElementById("cart-data");

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart(){

    if(cart.length === 0){

        box.innerHTML = `
            <h2 class="empty-cart">Your cart is empty 🛒</h2>
        `;
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach((item,index)=>{

        total += item.price * item.qty;

        html += `
        <div class="cart-item-page">

            <img src="${item.img}" width="80">

            <div class="cart-info-page">
                <h3>${item.name}</h3>
                <p>Size: ${item.size}</p>
                <p>$${item.price}</p>
            </div>

          <div class="qty-page">
    <button onclick="minusQty(${index})">-</button>
    <span>${item.qty}</span>
    <button onclick="plusQty(${index})">+</button>
</div>

<button class="remove-page"
onclick="removeItem(${index})">X</button>
        </div>
        `;
    });

    html += `<h2 class="cart-total-page">Total: $${total}</h2>`;

    box.innerHTML = html;
}

function plusQty(index){
    cart[index].qty++;
    saveCart();
    loadCart();
}

function minusQty(index){

    if(cart[index].qty > 1){
        cart[index].qty--;
    }else{
        cart.splice(index,1);
    }

    saveCart();
    loadCart();
}
function removeItem(index){
    cart.splice(index,1);
    saveCart();
    loadCart();
}

loadCart();