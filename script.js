let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

let selectedSize = "";
let currentItem = {};
let editIndex = -1;

/* ===============================
   OPEN POPUP
================================= */
function openPopup(name, price, img, index = -1) {

    document.getElementById("popup").style.display = "flex";

    document.getElementById("popup-name").innerText = name;
    document.getElementById("popup-price").innerText = "$" + price;
    document.getElementById("popup-img").src = img;

    currentItem = {
        name: name,
        price: price,
        img: img
    };

    editIndex = index;
    selectedSize = "";

    document.querySelectorAll(".sizes span").forEach(size => {
        size.classList.remove("active");
    });

    /* If editing size */
    if(index >= 0){
        selectedSize = cart[index].size;

        document.querySelectorAll(".sizes span").forEach(size => {
            if(size.innerText === selectedSize){
                size.classList.add("active");
            }
        });
    }
}


/* ===============================
   CLOSE POPUP
================================= */
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

/* ===============================
   CHOOSE SIZE
================================= */
function chooseSize(el) {

    document.querySelectorAll(".sizes span").forEach(size => {
        size.classList.remove("active");
    });

    el.classList.add("active");
    selectedSize = el.innerText;
}

/* ===============================
   CONFIRM CART
================================= */
function confirmCart() {

    if(selectedSize === ""){
        alert("Please choose size.");
        return;
    }

    /* If editing existing item */
    if(editIndex >= 0){
        cart[editIndex].size = selectedSize;
    }

    /* New item */
    else{
        cart.push({
            name: currentItem.name,
            price: currentItem.price,
            img: currentItem.img,
            size: selectedSize,
            qty: 1
        });
    }

    closePopup();
    updateCart();
}

/* ===============================
   UPDATE CART
================================= */
function updateCart() {

    let cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";

    total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        let li = document.createElement("li");

        li.innerHTML = `
        <div class="cart-row">

            <img src="${item.img}" width="55">

            <div class="cart-info">
                <b>${item.name}</b><br>

                Size:
                <button onclick="openPopup('${item.name}',${item.price},'${item.img}',${index})">
                    ${item.size}
                </button>

                <br>$${item.price}
            </div>

            <div class="qty-box">
                <button onclick="decreaseQty(${index})">-</button>
                ${item.qty}
                <button onclick="increaseQty(${index})">+</button>
            </div>

            <button onclick="removeItem(${index})">X</button>

        </div>
        `;

        cartList.appendChild(li);
    });

    document.getElementById("total").innerText = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===============================
   QTY +
================================= */
function increaseQty(index){
    cart[index].qty++;
    updateCart();
}

/* ===============================
   QTY -
================================= */
function decreaseQty(index){

    if(cart[index].qty > 1){
        cart[index].qty--;
    }else{
        cart.splice(index,1);
    }

    updateCart();
}

/* ===============================
   REMOVE
================================= */
function removeItem(index){
    cart.splice(index,1);
    updateCart();
}
/* ===============================
   SEARCH PRODUCT
================================= */
const searchBox = document.getElementById("search");

searchBox.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();
    let products = document.querySelectorAll(".product");
    let noResult = document.getElementById("no-result");

    let found = false;

    products.forEach(product => {

        let name = product.getAttribute("data-name").toLowerCase();

        if (name.includes(value)) {
            product.classList.remove("hidden");
            found = true;
        } else {
            product.classList.add("hidden");
        }
    });

    noResult.style.display = found ? "none" : "block";
});



let currentSlide = 0;

const slides = document.getElementById("slides");
const images = document.querySelectorAll("#slides img");

const totalSlides = images.length;

function showSlide() {
    slides.style.transition = "1s ease";
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide++;
    showSlide();

    // when reaching cloned last image
    if (currentSlide === totalSlides - 1) {
        setTimeout(() => {
            slides.style.transition = "none";
            currentSlide = 0;
            slides.style.transform = `translateX(0%)`;
        }, 1000);
    }
}

function prevSlide() {
    if (currentSlide === 0) {
        slides.style.transition = "none";
        currentSlide = totalSlides - 1;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;

        setTimeout(() => {
            slides.style.transition = "1s ease";
            currentSlide--;
            showSlide();
        }, 50);
    } else {
        currentSlide--;
        showSlide();
    }
}

/* auto scroll */
setInterval(nextSlide, 4000);
updateCart();

/* ===============================
   CATEGORY SEE MORE SYSTEM
================================= */

function hideAllSections() {
    document.getElementById("product-list").style.display = "none";

    let sections = [
        "tshirt-section",
        "jeans-section",
        "jacket-section",
        "sneaker-section",
        "sock-section",
        "necktie-section",
        "heel-section",
        "dress-section",
        "purse-section"
    ];

    sections.forEach(id => {
        let section = document.getElementById(id);
        if (section) {
            section.style.display = "none";
        }
    });
}

/* SHOW FUNCTIONS */
function showTshirt() {
    hideAllSections();
    document.getElementById("tshirt-section").style.display = "grid";
    document.getElementById("back-box").style.display = "block";
}

function showJeans() {
    hideAllSections();
    document.getElementById("jeans-section").style.display = "grid";
    document.getElementById("back-box").style.display = "block";
}

function showJacket() {
    hideAllSections();
    document.getElementById("jacket-section").style.display = "grid";
    document.getElementById("back-box").style.display = "block";
}

function showSneaker() {
    hideAllSections();
    document.getElementById("sneaker-section").style.display = "grid";
    document.getElementById("back-box").style.display = "block";
}

function showSock() {
    hideAllSections();
    document.getElementById("sock-section").style.display = "grid";
    document.getElementById("back-box").style.display = "block";
}

function showNecktie(){
    hideAllSections();
    document.getElementById("necktie-section").style.display = "grid";
    document.getElementById("back-box").style.display = "block";
}
function showDress(){
    hideAllSections();
    document.getElementById("dress-section").style.display = "grid";
    document.getElementById("back-box").style.display = "block";
}
function showPurse(){
    hideAllSections();
    document.getElementById("purse-section").style.display = "grid";
    document.getElementById("back-box").style.display = "block";
}
function showHeel(){
    hideAllSections();
    document.getElementById("heel-section").style.display = "grid";
    document.getElementById("back-box").style.display = "block";
}


/* BACK */
function goBack() {
    hideAllSections();
    document.getElementById("product-list").style.display = "grid";
    document.getElementById("back-box").style.display = "none";
}
/*For home category to make the line stay*/
const links = document.querySelectorAll(".nav a");


