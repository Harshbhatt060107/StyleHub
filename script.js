// ===========================
// HAMBURGER MENU
// ===========================

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

if (menuToggle) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
}

// ===========================
// ADD TO CART
// ===========================

function addToCart(name, price, size, colour, quantity) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: Number(price),
        size: size,
        colour: colour,
        quantity: Number(quantity)
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart successfully!");
}

// ===========================
// PRODUCT PAGE
// ===========================

function addProductToCart() {

    const size = document.getElementById("size").value;
    const colour = document.getElementById("colour").value;
    const quantity = document.getElementById("quantity").value;

    addToCart(
        "Men's Premium Hoodie",
        2499,
        size,
        colour,
        quantity
    );
}

// ===========================
// DISPLAY CART
// ===========================

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const grandTotal = document.getElementById("grand-total");

    if (!cartItems) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td>${item.colour}</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td>₹${itemTotal}</td>
            <td>
                <button onclick="removeItem(${index})">Remove</button>
            </td>
        </tr>
        `;
    });

    if (totalPrice) {
        totalPrice.innerHTML = "₹" + total;
    }

    if (grandTotal) {
        grandTotal.innerHTML = "₹" + (total + 99);
    }
}

// ===========================
// REMOVE ITEM
// ===========================

function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

// ===========================
// LOAD CART
// ===========================

window.onload = function(){

    displayCart();

};