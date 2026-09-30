let wishlist =
    JSON.parse(
        localStorage.getItem("toyHavenWishlist")
    ) || [];


// ================= DISPLAY WISHLIST =================

function displayWishlist(filter) {

    let grid =
        document.getElementById("wishlistGrid");

    let empty =
        document.getElementById("wishlistEmpty");

    let count =
        document.getElementById("wishlistCount");


    count.textContent = wishlist.length;


    let itemsToShow = wishlist;


    if (filter && filter !== "all") {

        itemsToShow =
            wishlist.filter(function(item) {
                return item.status === filter;
            });

    }


    grid.innerHTML = "";


    if (itemsToShow.length === 0) {

        empty.style.display = "block";
        grid.style.display = "none";

        return;
    }


    empty.style.display = "none";
    grid.style.display = "grid";


    itemsToShow.forEach(function(product) {

        grid.innerHTML += `

            <article class="wishlist-card">

                <div class="wishlist-card-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}">

                </div>


                <div class="wishlist-card-info">

                    <p class="wishlist-category">
                        ${product.category}
                    </p>

                    <h3>
                        ${product.name}
                    </h3>

                    <strong>
                        Rs. ${Number(product.price).toLocaleString()}
                    </strong>


                    <select
                        onchange="changeWishlistStatus('${product.id}', this.value)">

                        <option
                            value="Interested"
                            ${product.status === "Interested" ? "selected" : ""}>
                            Interested
                        </option>

                        <option
                            value="Owned"
                            ${product.status === "Owned" ? "selected" : ""}>
                            Owned
                        </option>

                        <option
                            value="Not Interested"
                            ${product.status === "Not Interested" ? "selected" : ""}>
                            Not Interested
                        </option>

                    </select>


                    <div class="wishlist-card-buttons">

                        <button
                            class="cart"
                            onclick="addWishlistItemToCart('${product.id}')">

                            Add to Cart

                        </button>


                        <button
                            class="details"
                            onclick="removeFromWishlist('${product.id}')">

                            Remove

                        </button>

                    </div>

                </div>

            </article>

        `;

    });
}


// ================= SAVE =================

function saveWishlist() {

    localStorage.setItem(
        "toyHavenWishlist",
        JSON.stringify(wishlist)
    );

}


// ================= REMOVE =================

function removeFromWishlist(id) {

    wishlist =
        wishlist.filter(function(item) {
            return item.id != id;
        });

    saveWishlist();

    displayWishlist("all");
}


// ================= CHANGE STATUS =================

function changeWishlistStatus(id, newStatus) {

    let product =
        wishlist.find(function(item) {
            return item.id == id;
        });


    if (product) {

        product.status = newStatus;

    }


    saveWishlist();
}


// ================= ADD TO CART =================

function addWishlistItemToCart(id) {

    let product =
        wishlist.find(function(item) {
            return item.id == id;
        });


    if (product) {

        addToCart(product, 1);

    }
}


// ================= FILTERS =================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayWishlist("all");


        let buttons =
            document.querySelectorAll(
                ".wishlist-filter"
            );


        buttons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    buttons.forEach(function(btn) {
                        btn.classList.remove("active");
                    });


                    button.classList.add("active");


                    displayWishlist(
                        button.dataset.filter
                    );

                }
            );

        });

    }
);