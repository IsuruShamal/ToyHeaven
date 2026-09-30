
/* Get cart data from localStorage */
let cart = JSON.parse(localStorage.getItem("toyHavenCart")) || [];


/* Display all cart items */
function displayCart() {

    let container = document.getElementById("cart-items-container");

    let subtotal = 0;

    /* Clear old cart items */
    container.innerHTML = "";


    /* Check if cart is empty */
    if (cart.length === 0) {

        container.innerHTML = "<p>Your cart is empty.</p>";

        document.getElementById("cartSubtotal").textContent = "Rs. 0";
        document.getElementById("cartTotal").textContent = "Rs. 0";

        return;
    }


    /* Go through each cart product */
    cart.forEach(function(product, index) {

        /* Set quantity to 1 if missing */
        if (!product.quantity) {
            product.quantity = 1;
        }


        /* Calculate total price for one item */
        let itemTotal = product.price * product.quantity;

        /* Add item total to subtotal */
        subtotal += itemTotal;


        container.innerHTML += `

            <div class="cart-item">

                <div class="cart-product-image">

                    <img src="${product.image}" alt="${product.name}">

                </div>


                <div class="cart-product-info">

                    <h2>${product.name}</h2>

                    <p class="brand">
                        ${product.category}
                    </p>

                    <p class="item-price">
                        Rs. ${product.price.toLocaleString()}
                    </p>

                </div>


                <button
                    class="remove-button"
                    onclick="removeItem(${index})">

                    ×

                </button>


                <div class="quantity">

                    <button onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>


                <div class="item-total">

                    Rs. ${itemTotal.toLocaleString()}

                </div>

            </div>

        `;
    });


    /* Show subtotal */
    document.getElementById("cartSubtotal").textContent =
        "Rs. " + subtotal.toLocaleString();

    /* Show total */
    document.getElementById("cartTotal").textContent =
        "Rs. " + subtotal.toLocaleString();
}



/* Increase product quantity */
function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();
}



/* Decrease product quantity */
function decreaseQuantity(index) {

    /* Reduce quantity if more than 1 */
    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        /* Remove item if quantity reaches 1 */
        cart.splice(index, 1);

    }

    saveCart();
}



/* Remove a product from the cart */
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
}



/* Save cart data and refresh cart */
function saveCart() {

    /* Save cart as JSON in localStorage */
    localStorage.setItem(
        "toyHavenCart",
        JSON.stringify(cart)
    );

    displayCart();
}



/* Display cart when page loads */
displayCart();