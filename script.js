// ==========================================
// STYLEHUB PRODUCT DATABASE
// ==========================================

const products = {

hoodie:{
id:"hoodie",
name:"Fear of God Essentials Hoodie",
price:8999,
image:"images/hoodie.jpeg",
category:"men"
},

tshirt:{
id:"tshirt",
name:"Lacoste Premium T-Shirt",
price:10499,
image:"images/tshirt.jpeg",
category:"men"
},

jeans:{
id:"jeans",
name:"Gucci GG Monogram Jeans",
price:199999,
image:"images/jeans.jpeg",
category:"men"
},

shirt:{
id:"shirt",
name:"Burberry Cotton Shirt",
price:49999,
image:"images/shirt.jpeg",
category:"men"
},

jacket:{
id:"jacket",
name:"Premium Black Jacket",
price:3999,
image:"images/jacket.jpeg",
category:"men"
},

sneakers:{
id:"sneakers",
name:"Nike Air Force 1",
price:7499,
image:"images/sneakers.jpeg",
category:"men"
},

sportsshoes:{
id:"sportsshoes",
name:"Nike Sports Shoes",
price:9999,
image:"images/sportsshoes.jpeg",
category:"men"
},

dress:{
id:"dress",
name:"Luxury Floral Dress",
price:9999,
image:"images/dress.jpeg",
category:"women"
},

blazer:{
id:"blazer",
name:"Versace Black Blazer",
price:29999,
image:"images/blazer.jpeg",
category:"women"
},

kidshoodie:{
id:"kidshoodie",
name:"Jordan Kids Hoodie",
price:3999,
image:"images/kidshoodie.jpeg",
category:"kids"
},

kidstshirt:{
id:"kidstshirt",
name:"Jordan Kids T-Shirt",
price:2499,
image:"images/kidstshirt.jpeg",
category:"kids"
},

watch:{
id:"watch",
name:"Rolex Automatic Watch",
price:199999,
image:"images/watch.jpeg",
category:"accessories"
},

handbag:{
id:"handbag",
name:"Louis Vuitton Handbag",
price:249999,
image:"images/handbag.jpeg",
category:"accessories"
},

backpack:{
id:"backpack",
name:"Louis Vuitton Backpack",
price:279999,
image:"images/backpack.jpeg",
category:"accessories"
},

sunglasses:{
id:"sunglasses",
name:"Louis Vuitton Sunglasses",
price:79999,
image:"images/sunglasses.jpeg",
category:"accessories"
}

};

// ==========================================
// SEASONAL OFFERS
// ==========================================

const offers = {
    watch: 20,
    handbag: 20,
    backpack: 20,
    sunglasses: 20,
    sneakers: 10,
    kidshoodie: 30,
    kidstshirt: 30
};

// ==========================================
// FORMAT PRICE
// ==========================================

function formatPrice(price){

return "₹"+price.toLocaleString("en-IN");

}

// ==========================================
// HAMBURGER MENU
// ==========================================

const menuToggle=document.querySelector(".menu-toggle");

const navMenu=document.querySelector("nav ul");

if(menuToggle){

menuToggle.addEventListener("click",()=>{

navMenu.classList.toggle("active");

});

}

// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(productId, size="Free Size", quantity=1){

    const product = products[productId];

    if(!product){

        alert("Product not found!");

        return;

    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item=>

        item.id===product.id &&

        item.size===size

    );

    const discount = offers[product.id] || 0;

    const finalPrice = Math.round(

        product.price-(product.price*discount/100)

    );

    if(existing){

        existing.quantity += Number(quantity);

    }

    else{

        cart.push({

            id:product.id,

            name:product.name,

            image:product.image,

            category:product.category,

            originalPrice:product.price,

            discount:discount,

            price:finalPrice,

            size:size,

            quantity:Number(quantity)

        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    alert(product.name+" added to cart!");

}

// ==========================================
// PRODUCT PAGE
// ==========================================

function addProductToCart(){

    const params = new URLSearchParams(window.location.search);

    const productId = params.get("product");

    const size = document.getElementById("size")

    ? document.getElementById("size").value

    : "Free Size";

    const quantity = document.getElementById("quantity")

    ? document.getElementById("quantity").value

    : 1;

    addToCart(productId,size,quantity);

}

// ==========================================
// LOAD PRODUCT DETAILS
// ==========================================

function loadProduct(){

    const image=document.getElementById("product-image");
    const name=document.getElementById("product-name");
    const price=document.getElementById("product-price");
    const sizeLabel=document.getElementById("size-label");
    const sizeSelect=document.getElementById("size");
    const colourContainer=document.getElementById("colour-container");

    if(!image || !name || !price) return;

    const params=new URLSearchParams(window.location.search);

    const productId=params.get("product") || "hoodie";

    const product=products[productId] || products.hoodie;

    image.src=product.image;
    image.alt=product.name;

    name.innerHTML=product.name;

    // Show discount on product page
    const discount=offers[product.id] || 0;

    if(discount>0){

        const finalPrice=Math.round(
            product.price-(product.price*discount/100)
        );

        price.innerHTML=`
        <del>${formatPrice(product.price)}</del><br>
        <span style="color:red;">${discount}% OFF</span><br>
        <strong>${formatPrice(finalPrice)}</strong>
        `;

    }

    else{

        price.innerHTML=formatPrice(product.price);

    }

    if(!sizeLabel || !sizeSelect) return;

    if(colourContainer){

        colourContainer.style.display="none";

    }

    sizeSelect.innerHTML="";

    // Shoes
    if(product.id==="sneakers" || product.id==="sportsshoes"){

        sizeLabel.innerHTML="Shoe Size";

        ["UK 6","UK 7","UK 8","UK 9","UK 10"].forEach(size=>{

            sizeSelect.innerHTML+=`<option>${size}</option>`;

        });

    }

    // Kids
    else if(product.category==="kids"){

        sizeLabel.innerHTML="Age";

        for(let age=5;age<=15;age++){

            sizeSelect.innerHTML+=`<option>${age} Years</option>`;

        }

    }

    // Accessories
    else if(product.category==="accessories"){

        sizeLabel.innerHTML="Size";

        sizeSelect.innerHTML=`
        <option>Free Size</option>
        `;

    }

    // Men & Women
    else{

        sizeLabel.innerHTML="Size";

        ["S","M","L","XL"].forEach(size=>{

            sizeSelect.innerHTML+=`<option>${size}</option>`;

        });

    }

}

// ==========================================
// DISPLAY CART
// ==========================================

function displayCart(){

const cartItems=document.getElementById("cart-items");
const totalPrice=document.getElementById("total-price");
const grandTotal=document.getElementById("grand-total");

if(!cartItems) return;

let cart=JSON.parse(localStorage.getItem("cart")) || [];

cartItems.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

const itemTotal=item.price*item.quantity;

total+=itemTotal;

cartItems.innerHTML+=`

<tr>

<td>

<img src="${item.image}"
alt="${item.name}"
width="70">

</td>

<td>${item.name}</td>

<td>${item.size}</td>

<td>${item.quantity}</td>

<td>

${
item.discount>0

?

`<del>${formatPrice(item.originalPrice)}</del><br>

<span style="color:red;">${item.discount}% OFF</span><br>

<strong>${formatPrice(item.price)}</strong>`

:

formatPrice(item.price)

}

</td>

<td>

${formatPrice(itemTotal)}

</td>

<td>

<button onclick="removeItem(${index})">

Remove

</button>

</td>

</tr>

`;

});

if(totalPrice){

totalPrice.innerHTML=formatPrice(total);

}

if(grandTotal){

grandTotal.innerHTML=formatPrice(total+99);

}

}

// ==========================================
// REMOVE ITEM
// ==========================================

function removeItem(index){

let cart=JSON.parse(localStorage.getItem("cart")) || [];

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

displayCart();

}

// ==========================================
// CLEAR CART
// ==========================================

function clearCart(){

localStorage.removeItem("cart");

displayCart();

}

// ==========================================
// SEARCH PRODUCTS
// ==========================================

const search=document.getElementById("search");

if(search){

search.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const cards=document.querySelectorAll(".product-card");

cards.forEach(card=>{

const title=card.querySelector("h3").textContent.toLowerCase();

if(title.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

// ==========================================
// CATEGORY FILTER
// ==========================================

const category=document.getElementById("category");

if(category){

const params=new URLSearchParams(window.location.search);

const urlCategory=params.get("category");

function filterProducts(selected){

const cards=document.querySelectorAll(".product-card");

cards.forEach(card=>{

if(selected==="all"){

card.style.display="block";

}

else if(card.dataset.category===selected){

card.style.display="block";

}

else{

card.style.display="none";

}

});

}

if(urlCategory){

category.value=urlCategory;

filterProducts(urlCategory);

}

else{

filterProducts(category.value);

}

category.addEventListener("change",function(){

filterProducts(this.value);

});

}

// ==========================================
// LOGIN
// ==========================================

const loginForm=document.getElementById("login-form");

if(loginForm){

loginForm.addEventListener("submit",function(e){

e.preventDefault();

const email=document.getElementById("email").value.trim();

const password=document.getElementById("password").value.trim();

if(

email==="demouser@gmail.com" &&

password==="stylehub123"

){

localStorage.setItem("loggedIn","true");

localStorage.setItem("userEmail",email);

alert("Welcome Back, Demo User!");

window.location.href="account.html";

}

else{

alert("Invalid Demo Account Credentials!");

}

});

}

// ==========================================
// NAVBAR LOGIN
// ==========================================

function updateNavbar(){

const loggedIn=localStorage.getItem("loggedIn");

const loginLink=document.querySelector('a[href="login.html"]');

const accountLink=document.querySelector('a[href="account.html"]');

if(loggedIn){

if(loginLink){

loginLink.parentElement.style.display="none";

}

if(accountLink){

accountLink.parentElement.style.display="block";

}

}

else{

if(loginLink){

loginLink.parentElement.style.display="block";

}

if(accountLink){

accountLink.parentElement.style.display="none";

}

}

}

// ==========================================
// PLACE ORDER
// ==========================================

function placeOrder(){

    const fullname=document.getElementById("fullname").value.trim();
    const phone=document.getElementById("phone").value.trim();
    const address=document.getElementById("address").value.trim();

    if(fullname==="" || phone==="" || address===""){

        alert("Please fill all delivery details.");

        return;

    }

    alert("🎉 Order Placed Successfully!\n\nThank you for shopping with StyleHub!");

    localStorage.removeItem("cart");

    window.location.href="index.html";

}

// ==========================================
// PAGE LOAD
// ==========================================

window.onload=function(){

loadProduct();

displayCart();

loadCheckout();

updateNavbar();

};

// ==========================================
// CHECKOUT TOTAL
// ==========================================

function loadCheckout(){

    const subtotal=document.getElementById("checkout-subtotal");
    const total=document.getElementById("checkout-total");

    if(!subtotal || !total) return;

    let cart=JSON.parse(localStorage.getItem("cart")) || [];

    let sum=0;

    cart.forEach(item=>{

        sum+=item.price*item.quantity;

    });

    subtotal.innerHTML=formatPrice(sum);

    total.innerHTML=formatPrice(sum+99);

}