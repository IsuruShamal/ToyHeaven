
/* Store product data */
let products = [];
let filteredProducts = [];

/* Pagination values */
let currentPage = 1;
let productsPerPage = 6;

/* Get the product container */
let productContainer =
    document.getElementById("productContainer");

function getProductImagePath(image) {

    if (window.location.pathname.includes("/html/")) {
        return image;
    }

    return image.replace("../img/", "./img/");
}

if (productContainer) {

    /* Get the JSON file path */
    let jsonPath =
        productContainer.getAttribute("data-json");


    /* Load product data from JSON */
    fetch(jsonPath)

        /* Convert response into JSON */
        .then(function(response) {

            return response.json();

        })

        /* Save the loaded products */
        .then(function(data) {

            products = data;
            filteredProducts = products;
            showPage(1);

        })

        /* Show error if loading fails */
        .catch(function(error) {

            console.log(
                "Error loading products:",
                error
            );

        });

}



/* Display products on the page */
function displayProducts(productList) {

    let container =
        document.getElementById("productContainer");


    /* Stop if container is not found */
    if (!container) {
        return;
    }


    let productsToShow = productList;


    /* Home page can show only 4 products */
    let limit =
        Number(container.dataset.limit);


    if (limit > 0) {

    /* Make a copy of the product list */
    let shuffledProducts =
        productList.slice();

    /* Shuffle the copied products */
    shuffledProducts.sort(function() {
        return Math.random() - 0.5;
    });

    /* Select only the required number */
    productsToShow =
        shuffledProducts.slice(0, limit);

}


    /* Clear old products */
    container.innerHTML = "";


    /* Go through each product */
    productsToShow.forEach(function(product) {
        
        container.innerHTML += `

        <article class="product-card">

            <div class="product-image">

                ${ 
                    product.badge 
                    ? `<span class="badge ${
                        product.badge === "50% OFF"
                            ? "sale-badge"
                            : product.badge.toLowerCase()
                    }">
                        ${product.badge}
                    </span>` 
                    : "" 
                }


                <button
                    class="wishlist"
                    onclick="addToWishlistById(${product.id})">
                    ♡
                </button>


                <img
                    src="${getProductImagePath(product.image)}"
                    alt="${product.name}">

            </div>


            <div class="product-info">

                <p class="category">
                    ${product.category}
                </p>


                <h2>
                    ${product.name}
                </h2>


                <p class="description">
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <div class="price-area">

                        ${
                            product.originalPrice
                            ? `
                                <span class="old-price">
                                    Rs. ${product.originalPrice.toLocaleString()}
                                </span>

                                <strong class="new-price">
                                    Rs. ${product.price.toLocaleString()}
                                </strong>
                            `
                            : `
                                <strong class="normal-price">
                                    Rs. ${product.price.toLocaleString()}
                                </strong>
                            `
                        }

                    </div>

                    <span>
                        ★★★★★
                    </span>

                </div>


                <div class="buttons">

                    <button
                        class="details"
                        onclick="openProduct(${product.id})">
                        View Details
                    </button>


                    <button
                        class="cart"
                        onclick="addToCartById(${product.id})">
                        Add to Cart
                    </button>

                </div>

            </div>

        </article>

        `;

    });

}

/* Show products for one page */
function showPage(page) {

    currentPage = page;

    /* Find the starting product */
    let start =
        (page - 1) * productsPerPage;

    /* Find the ending product */
    let end =
        start + productsPerPage;

    /* Get only products for this page */
    let pageProducts =
        products.slice(start, end);

    displayProducts(pageProducts);

    showPagination();
}


/* Create pagination buttons */
function showPagination() {

    let pagination =
        document.getElementById("pagination");

    /* Stop if pagination is not found */
    if (!pagination) {
        return;
    }

    /* Clear old buttons */
    pagination.innerHTML = "";

    /* Calculate total number of pages */
    let totalPages =
        Math.ceil(products.length / productsPerPage);


    /* Create one button for each page */
    for (let i = 1; i <= totalPages; i++) {

        let button =
            document.createElement("button");

        button.textContent = i;

        /* Mark the current page button */
        if (i === currentPage) {
            button.classList.add("active");
        }

        /* Run when page button is clicked */
        button.addEventListener("click", function() {

            showPage(i);

            /* Scroll to top smoothly */
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

        /* Add the button to pagination */
        pagination.appendChild(button);
    }
}
