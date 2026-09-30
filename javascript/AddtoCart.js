/* Get cart */

function getCart() {
    let cart = JSON.parse(
        localStorage.getItem("toyHavenCart")
    );

    if (!cart) {
        cart = [];
    }

    return cart;
}


/* Add product to cart */

function addToCart(product, quantity) {
    if (!quantity) {
        quantity = 1;
    }

    let cart = getCart();

    // Check if the product is already in the cart
    let existingProduct = cart.find(function(item) {
        return item.id === product.id;
    });

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    // Save updated cart in LocalStorage
    localStorage.setItem(
        "toyHavenCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    showToast(
        'success',
        'Added to Cart!',
        'Item has been successfully added to your cart.'
    );
}


/* Add product using ID */

function addToCartById(id) {
    let product = products.find(function(item) {
        return item.id === id;
    });

    if (product) {
        addToCart(product, 1);
    }
}


/* Update cart number */

function updateCartCount() {
    let cart = getCart();
    let total = 0;

    // Add all product quantities together
    cart.forEach(function(item) {
        total += item.quantity;
    });

    let cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = total;
    }
}


/* Load cart count */

document.addEventListener(
    "DOMContentLoaded",
    updateCartCount
);