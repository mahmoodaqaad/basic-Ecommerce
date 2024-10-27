let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let cart_close = document.querySelector("#close-cart")

cartIcon.onclick = () => {
    cart.classList.add("active")

}
cart_close.onclick = () => {
    cart.classList.remove("active")

}

if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}
// making function 

function ready() {
    // remove item from cart

    let removeCartButtons = document.getElementsByClassName("cart-remove")


    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)

    }

    let quantityInput = document.getElementsByClassName("cart-quantity")
    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i]
        input.addEventListener("change", quantityChanged)
    }

    //add to cart 

    let addCart = document.getElementsByClassName("add-cart")
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i]

        button.addEventListener("click", addcartClicked)
    }

    // buy button 

    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buybtn)


}

// fun buy button 


function buybtn() {
    alert("Your Order is plced")
    let cartcontent = document.getElementsByClassName("cart-content")[0]
    while (cartcontent.hasChildNodes()) {

        cartcontent.removeChild(cartcontent.firstChild)
    }
    updateTotal()

}


function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()

}

// quantityChanged 

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}

function addcartClicked(event) {
    // cart.classList.add("active")

    let button = event.target
    let shopPrduct = button.parentElement
    let title = shopPrduct.getElementsByClassName("product-title")[0].innerHTML
    let price = shopPrduct.getElementsByClassName("price")[0].innerHTML
    let prodectImg = shopPrduct.getElementsByClassName("product-img")[0].src
    addProdectToCart(title, price, prodectImg)
    updateTotal()
}

function addProdectToCart(title, price, prodectImg) {
    let s = 0
    let cartShopBox = document.createElement("div")
    cartShopBox.className = "cart-box"
    let cartItems = document.getElementsByClassName("cart-content")[0]
    let cartItemNames = cartItems.getElementsByClassName("cart-product-title")
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerHTML == title) {
            s++
            alert("you Have already add this item to cart")
            document.getElementsByClassName("cart-quantity")[i].value++
        }
    }


    if (s == 0) {
        let cartBoxContent = `
<img src="${prodectImg}" alt="" class="cart-img">
<div class="details-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>

<!-- remove  cart-->
<i class="bx bxs-trash-alt cart-remove"></i>

`
        cartShopBox.innerHTML = cartBoxContent

        cartItems.append(cartShopBox)
        cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem)
        cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged)

    }
}



// update toatal 
function updateTotal() {
    let cartcontent = document.getElementsByClassName("cart-content")[0]
    let cartBoxs = document.getElementsByClassName("cart-box")
    let total = 0;
    for (let i = 0; i < cartBoxs.length; i++) {
        let cartbox = cartBoxs[i]
        var price = parseFloat(cartbox.getElementsByClassName("cart-price")[0].innerHTML.replace('$', ''))
        let quantity = cartbox.getElementsByClassName("cart-quantity")[0].value;

        total = total + (price * quantity)

    }
    total = Math.round(total * 100) / 100


    document.getElementsByClassName("total-price")[0].innerHTML = `$${total}`


}