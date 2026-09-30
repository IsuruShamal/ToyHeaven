document.addEventListener("DOMContentLoaded", function() {

    /* Get search elements */
    var searchbar = document.getElementById("searchbar");
    var results = document.getElementById("results");

    var products = [];

    /* Set JSON path */
    var jsonPath;

    if (window.location.pathname.includes("/html/")) {
        jsonPath = "../products/products.json";
    } else {
        jsonPath = "./products/products.json";
    }

    /* Load products from JSON */
    fetch(jsonPath)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            products = data;
        })
        .catch(function(error) {
            console.log("Error loading products:", error);
        });

    /* Search when user types */
    searchbar.addEventListener("input", function() {

        var searchText = searchbar.value.toLowerCase().trim();

        results.innerHTML = "";

        /* Stop if search is empty */
        if (searchText === "") {
            return;
        }

        /* Check product names */
        for (var i = 0; i < products.length; i++) {

            if (
                products[i].name
                    .toLowerCase()
                    .includes(searchText)
            ) {

                /* Create search result */
                var item = document.createElement("p");

                item.textContent = products[i].name;

                results.appendChild(item);
            }
        }
    });

    /* Close results when clicking outside */
    document.addEventListener("click", function(event) {

        if (!event.target.closest(".search-box")) {
            results.innerHTML = "";
        }
    });

});
