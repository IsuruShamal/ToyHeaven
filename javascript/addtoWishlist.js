/* Wishlist */

function getWishlist() {
    /* Get saved wishlist */
    let wishlist =
        JSON.parse(
            localStorage.getItem("toyHavenWishlist")
        ) || [];

    return wishlist;
}

/* Add to wishlist */

function addToWishlistById(id) {
    /* Find product using the ID */
    let product =
        products.find(function(item) {
            return item.id == id;
        });

    /* Stop if product is not found */
    if (!product) {
        return;
    }

    let wishlist = getWishlist();

    /* Check if product is already in wishlist */
    let existingProduct =
        wishlist.find(function(item) {
            return item.id == product.id;
        });

    if (existingProduct) {
        showToast(
            "success",
            "Already Saved",
            product.name + " is already in your wishlist."
        );

        return;
    }

    /* Add product to wishlist */
    wishlist.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        status: "Interested"
    });

    /* Save wishlist in LocalStorage */
    localStorage.setItem(
        "toyHavenWishlist",
        JSON.stringify(wishlist)
    );

    showToast(
        "success",
        "Added to Wishlist!",
        product.name + " has been saved."
    );
}