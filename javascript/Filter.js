var toggleBtn =
    document.getElementById('filterToggleBtn');

var closeBtn =
    document.getElementById('filterCloseBtn');

var cancelBtn =
    document.getElementById('filterCancelBtn');

var applyBtn =
    document.getElementById('filterApplyBtn');

var sidebar =
    document.getElementById('filterSidebar');

var overlay =
    document.getElementById('filterOverlay');


// ================= OPEN FILTER =================

function openFilter() {

    sidebar.classList.add('active');

    overlay.classList.add('active');

    document.body.classList.add('no-scroll');

}


// ================= CLOSE FILTER =================

function closeFilter() {

    sidebar.classList.remove('active');

    overlay.classList.remove('active');

    document.body.classList.remove('no-scroll');

}


// ================= BUTTONS =================

if (toggleBtn) {

    toggleBtn.addEventListener(
        'click',
        openFilter
    );

}


if (closeBtn) {

    closeBtn.addEventListener(
        'click',
        closeFilter
    );

}


if (cancelBtn) {

    cancelBtn.addEventListener(
        'click',
        closeFilter
    );

}


// ================= APPLY FILTER =================

if (applyBtn) {

    applyBtn.addEventListener(
        'click',
        function () {


            let filteredProducts =
                products.slice();


            // ================= CATEGORY =================

            let selectedCategories = [];

            let checkedBoxes =
                document.querySelectorAll(
                    '.category-filter:checked'
                );


            checkedBoxes.forEach(
                function (checkbox) {

                    selectedCategories.push(
                        checkbox.value
                    );

                }
            );


            if (
                selectedCategories.length > 0
            ) {

                filteredProducts =
                    filteredProducts.filter(
                        function (product) {

                            return selectedCategories.includes(
                                product.category
                            );

                        }
                    );

            }


            // ================= PRICE =================

            let priceOptions =
                document.querySelectorAll(
                    'input[name="price"]'
                );


            priceOptions.forEach(
                function (radio, index) {

                    if (!radio.checked) {

                        return;

                    }


                    // First price option
                    if (index === 0) {

                        filteredProducts =
                            filteredProducts.filter(
                                function (product) {

                                    return product.price < 5000;

                                }
                            );

                    }


                    // Second price option
                    if (index === 1) {

                        filteredProducts =
                            filteredProducts.filter(
                                function (product) {

                                    return (
                                        product.price >= 5000 &&
                                        product.price <= 10000
                                    );

                                }
                            );

                    }


                    // Third price option
                    if (index === 2) {

                        filteredProducts =
                            filteredProducts.filter(
                                function (product) {

                                    return product.price > 10000;

                                }
                            );

                    }

                }
            );


                        // ================= SORT =================

            let sort =
    document.getElementById("sortFilter");


            if (sort) {


                // Price Low to High

                if (sort.selectedIndex === 1) {

                    filteredProducts.sort(
                        function (a, b) {

                            return a.price - b.price;

                        }
                    );

                }


                // Price High to Low

                if (sort.selectedIndex === 2) {

                    filteredProducts.sort(
                        function (a, b) {

                            return b.price - a.price;

                        }
                    );

                }

            }


            // ================= PRODUCT TYPE =================

            let typeFilter =
                document.getElementById(
                    "typeFilter"
                );


            if (typeFilter) {

                let typeValue =
                    typeFilter.value;


                // New
                if (typeValue === "new") {

                    filteredProducts =
                        filteredProducts.filter(
                            function (product) {

                                return product.badge === "NEW";

                            }
                        );

                }


                // Popular
                if (typeValue === "popular") {

                    filteredProducts =
                        filteredProducts.filter(
                            function (product) {

                                return product.badge === "POPULAR";

                            }
                        );

                }


                // Sale
                    if (typeValue === "sale") {

                        filteredProducts =
                            filteredProducts.filter(
                                function (product) {

                                    return (
                                        product.originalPrice &&
                                        product.price < product.originalPrice
                                    );

                                }
                            );

                    }


                // Discount
                if (typeValue === "discount") {

                    filteredProducts =
                        filteredProducts.filter(
                            function (product) {

                                return product.badge === "DISCOUNT";

                            }
                        );

                }


                // Bundle
                if (typeValue === "bundle") {

                    filteredProducts =
                        filteredProducts.filter(
                            function (product) {

                                return product.badge === "BUNDLE";

                            }
                        );

                }

            }
            // ================= DISPLAY =================

                displayProducts(
                        filteredProducts
                    );


            // ================= DISPLAY =================

            displayProducts(
                filteredProducts
            );


            closeFilter();

        }
    );

}


// ================= OVERLAY =================

if (overlay) {

    overlay.addEventListener(
        'click',
        function () {

            // User must press Close or Apply

        }
    );

}

// ================= FILTER FROM HOME PAGE =================

function applyFilterFromURL() {

    const params =
        new URLSearchParams(window.location.search);

    const category =
        params.get("category");

    const sale =
        params.get("sale");


    // Nothing coming from home page
    if (!category && sale !== "true") {

        return;

    }


    // Wait until products.json has loaded
    if (products.length === 0) {

        setTimeout(
            applyFilterFromURL,
            100
        );

        return;

    }


    // ================= CATEGORY =================

    if (category) {

        const categoryBoxes =
            document.querySelectorAll(
                ".category-filter"
            );


        categoryBoxes.forEach(
            function (checkbox) {

                if (
                    checkbox.value === category
                ) {

                    checkbox.checked = true;

                }

            }
        );

    }


    // ================= SALE =================

    if (sale === "true") {

        const typeFilter =
            document.getElementById(
                "typeFilter"
            );


        if (typeFilter) {

            typeFilter.value = "sale";

        }

    }
    // ================= APPLY EXISTING FILTER =================

    if (applyBtn) {

        applyBtn.click();

    }


    // ================= SCROLL TO PRODUCTS =================

    const productSection =
        document.getElementById(
            "productContainer"
        );


    if (productSection) {

        setTimeout(
            function () {

                productSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            },
            200
        );

    }

}
applyFilterFromURL();

function showPage(page) {

    currentPage = page;

    let start =
        (page - 1) * productsPerPage;

    let end =
        start + productsPerPage;

    let pageProducts =
        filteredProducts.slice(start, end);

    displayProducts(pageProducts);

    showPagination();
}

function showPagination() {

    let pagination =
        document.getElementById("pagination");

    if (!pagination) {
        return;
    }

    pagination.innerHTML = "";

    let totalPages =
        Math.ceil(
            filteredProducts.length / productsPerPage
        );


    for (let i = 1; i <= totalPages; i++) {

        let button =
            document.createElement("button");

        button.textContent = i;

        if (i === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", function() {

            showPage(i);

        });

        pagination.appendChild(button);
    }
}