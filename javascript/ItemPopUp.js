
/* Store the selected product */
let selectedProduct = null;

/* Store popup quantity */
let popupQuantity = 1;


/* Open product popup using product id */
function openProduct(id) {

    /* Find the selected product */
    selectedProduct = products.find(function(product) {
        return product.id === id;
    });


    /* Stop if product is not found */
    if (!selectedProduct) {
        return;
    }


    /* Show product image */
    document.getElementById("popupImage").src =
        selectedProduct.image;

    /* Show product category */
    document.getElementById("popupCategory").textContent =
        selectedProduct.category;

    /* Show product name */
    document.getElementById("popupName").textContent =
        selectedProduct.name;

    /* Show product description */
    document.getElementById("popupDescription").textContent =
        selectedProduct.description;

    /* Show product price */
    document.getElementById("popupPrice").textContent =
        "Rs. " + selectedProduct.price.toLocaleString();


    /* Reset quantity to 1 */
    popupQuantity = 1;

    let quantityText =
        document.getElementById("popupQuantity");

    if (quantityText) {
        quantityText.textContent = popupQuantity;
    }


    /* Add selected product to cart */
    document.getElementById("popupCart").onclick = function() {

        addToCart(
            selectedProduct,
            popupQuantity
        );

    };


    /* Add selected product to wishlist */
    document.getElementById("popupWishlist").onclick = function() {

    addToWishlistById(selectedProduct.id);

};


    /* Show the popup */
    document.getElementById("productPopup").style.display =
        "flex";
}



/* Run after HTML page is fully loaded */
document.addEventListener("DOMContentLoaded", function() {

    let popup =
        document.getElementById("productPopup");

    let close =
        document.getElementById("closePopup");

    let increase =
        document.getElementById("increaseQuantity");

    let decrease =
        document.getElementById("decreaseQuantity");


    /* Close the popup */
    if (close) {

        close.addEventListener("click", function() {

            popup.style.display = "none";

        });

    }


    /* Increase popup quantity */
    if (increase) {

        increase.addEventListener("click", function() {

            popupQuantity++;

            document.getElementById(
                "popupQuantity"
            ).textContent = popupQuantity;

        });

    }


    /* Decrease popup quantity */
    if (decrease) {

        decrease.addEventListener("click", function() {

            /* Do not go below 1 */
            if (popupQuantity > 1) {

                popupQuantity--;

                document.getElementById(
                    "popupQuantity"
                ).textContent = popupQuantity;

            }

        });

    }


    /* Close popup when clicking outside the product box */
    if (popup) {

        popup.addEventListener("click", function(event) {

            if (event.target === popup) {

                popup.style.display = "none";

            }

        });

    }

});
