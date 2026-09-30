/* Cart */
/* JSON.parse() reads the saved cart data */
let cart = JSON.parse(
    localStorage.getItem("toyHavenCart")
) || [];
let discountRate = 0;

/* Customer database */
let customerDatabase;
let databaseRequest =
    /* open() opens or creates the database */
    indexedDB.open("ToyHavenDB", 1);

/* Runs when the database is created or upgraded */
databaseRequest.onupgradeneeded = function(event) {
    customerDatabase =
        event.target.result;

    if (
        /* Check if the customers store already exists */
        !customerDatabase.objectStoreNames
            .contains("customers")
    ) {
        /* Create the customers store */
        customerDatabase.createObjectStore(
            "customers",
            {
                keyPath: "id",
                autoIncrement: true
            }
        );
    }
};

/* Runs when the database opens successfully */
databaseRequest.onsuccess = function(event) {
    customerDatabase =
        event.target.result;

    console.log(
        "Toy Haven database ready"
    );
};

/* Runs if the database cannot open */
databaseRequest.onerror = function(event) {
    console.log(
        "Database error:",
        event.target.error
    );
};

/* Checkout price */
function showCheckoutPrices() {
    let subtotal = 0;

    /* forEach() goes through each cart product */
    cart.forEach(function(product) {
        let quantity = product.quantity || 1;

        subtotal += product.price * quantity;
    });

    let freeShippingLimit = 15000;
    let shipping;

    if (subtotal >= freeShippingLimit) {
        shipping = 0;
    } else {
        shipping = 500;
    }

    let tax = subtotal * 0.08;

    let discountAmount =
        subtotal * discountRate;

    let total =
        subtotal +
        shipping +
        tax -
        discountAmount;

    document.getElementById("summarySubtotal").textContent =
        "Rs. " + subtotal.toLocaleString();

    if (shipping === 0) {
        document.getElementById("summaryShipping").innerHTML =
            '<span class="old-shipping">Rs. 500</span> ' +
            '<span class="free-shipping">FREE</span>';
    } else {
        document.getElementById("summaryShipping").textContent =
            "Rs. 500";
    }

    document.getElementById("summaryTax").textContent =
        "Rs. " + tax.toLocaleString();

    document.getElementById("summaryDiscount").textContent =
        "- Rs. " + discountAmount.toLocaleString();

    document.getElementById("summaryTotal").textContent =
        "Rs. " + total.toLocaleString();

    /* Save checkout total in LocalStorage */
    localStorage.setItem(
        "toyHavenCheckoutTotal",
        total
    );
}

/* Promo code */
function applyPromo() {
    let promoInput =
        document.getElementById("promoCode")
            .value
            /* trim() removes extra spaces */
            .trim()
            /* Convert the promo code to uppercase */
            .toUpperCase();

    if (promoInput === "ISURU") {
        discountRate = 0.10;

        showToast(
    "promo",
    "Promo Applied!",
    "You received a 10% discount."
);
    } else {
        discountRate = 0;

        showToast(
    "warning",
    "Invalid Promo Code",
    "The promo code you entered is not valid."
);
    }

    showCheckoutPrices();
}

/* Show prices when page loads */
showCheckoutPrices();

/* Payment method */
const cashPayment =
    document.getElementById("cashPayment");

const cardPayment =
    document.getElementById("cardPayment");

const cardDetails =
    document.getElementById("cardDetails");

const cardholderName =
    document.getElementById("cardholderName");

const cardNumber =
    document.getElementById("cardNumber");

const expiry =
    document.getElementById("expiry");

const cvv =
    document.getElementById("cvv");

const saveCard =
    document.getElementById("saveCard");

/* Card payment */
/* Runs when card payment is selected */
cardPayment.addEventListener("change", function() {
    if (cardPayment.checked) {
        cardDetails.style.display = "block";

        cardholderName.disabled = false;
        cardNumber.disabled = false;
        expiry.disabled = false;
        cvv.disabled = false;
        saveCard.disabled = false;

        cardholderName.required = true;
        cardNumber.required = true;
        expiry.required = true;
        cvv.required = true;
    }
});

/* Cash payment */
/* Runs when cash payment is selected */
cashPayment.addEventListener("change", function() {
    if (cashPayment.checked) {
        cardDetails.style.display = "none";

        cardholderName.disabled = true;
        cardNumber.disabled = true;
        expiry.disabled = true;
        cvv.disabled = true;
        saveCard.disabled = true;

        cardholderName.required = false;
        cardNumber.required = false;
        expiry.required = false;
        cvv.required = false;
    }
});

/* Shipping form */
const shippingForm =
    document.getElementById("shippingForm");

/* Runs when the shipping form is submitted */
shippingForm.addEventListener("submit", function(event) {
    /* Stop the form from refreshing the page */
    event.preventDefault();

    let shippingDetails = {
        fullName:
            document.getElementById("fullName").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        address:
            document.getElementById("streetAddress").value,

        city:
            document.getElementById("city").value,

        postalCode:
            document.getElementById("postalCode").value
    };

    /* Save shipping details in LocalStorage */
    localStorage.setItem(
        "toyHavenShipping",
        JSON.stringify(shippingDetails)
    );

    showToast(
    "success",
    "Address Saved",
    "Shipping address saved successfully."
);
});

/* Save customer */
function saveCustomerToDatabase(
    shippingDetails,
    paymentMethod
) {
    if (!customerDatabase) {
        showToast(
    "error",
    "Database Error",
    "Database is not ready. Please try again."
        );

        return;
    }

    let customerData = {
        fullName:
            shippingDetails.fullName,

        email:
            shippingDetails.email,

        phone:
            shippingDetails.phone,

        address:
            shippingDetails.address,

        city:
            shippingDetails.city,

        postalCode:
            shippingDetails.postalCode,

        paymentMethod:
            paymentMethod,

        date:
            new Date().toLocaleString()
    };

    let transaction =
        /* Start a read and write database transaction */
        customerDatabase.transaction(
            ["customers"],
            "readwrite"
        );

    let store =
        /* Get the customers store */
        transaction.objectStore(
            "customers"
        );

    let addRequest =
        /* add() saves the customer record */
        store.add(customerData);

    /* Runs after the customer is saved */
    addRequest.onsuccess = function() {
        console.log(
            "Customer saved successfully:",
            customerData
        );

        /* Show success after customer is saved */
        showPaymentSuccess();
    };

    /* Runs if saving the customer fails */
    addRequest.onerror = function(event) {
        console.log(
            "Database save error:",
            event.target.error
        );

        alert(
            "Customer details could not be saved."
        );
    };
}

/* Place order */
const placeOrderButton =
    document.getElementById("placeOrderButton");

/* Runs when Place Order is clicked */
placeOrderButton.addEventListener("click", function() {
    /* Check shipping form is valid */
    /* checkValidity() checks the required fields */
    if (!shippingForm.checkValidity()) {
        /* Show browser validation messages */
        shippingForm.reportValidity();

        return;
    }

    /* Get shipping details */
    let shippingDetails = {
        fullName:
            document.getElementById("fullName").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        address:
            document.getElementById("streetAddress").value,

        city:
            document.getElementById("city").value,

        postalCode:
            document.getElementById("postalCode").value
    };

    /* Save shipping details in LocalStorage */
    localStorage.setItem(
        "toyHavenShipping",
        JSON.stringify(shippingDetails)
    );

    /* Check card details */
    if (cardPayment.checked) {
        if (
            cardholderName.value.trim() === "" ||
            cardNumber.value.trim() === "" ||
            expiry.value.trim() === "" ||
            cvv.value.trim() === ""
        ) {
            showToast(
                "error",
                "Card Details Required",
                "Please complete all card details."
            );

            return;
        }
    }

    /* Choose payment method */
    let paymentMethod;

    if (cashPayment.checked) {
        paymentMethod =
            "Cash on Delivery";
    } else {
        paymentMethod =
            "Credit / Debit Card";
    }

    /* Save selected payment method */
    localStorage.setItem(
        "toyHavenPaymentMethod",
        paymentMethod
    );

    /* Save customer to database */
    saveCustomerToDatabase(
        shippingDetails,
        paymentMethod
    );
});

/* Payment success popup */
function showPaymentSuccess() {
    let modal =
        document.getElementById(
            "paymentSuccessModal"
        );

    modal.style.display = "flex";

    /* Stop page scrolling behind popup */
    document.body.style.overflow =
        "hidden";

    /* Restart the success animation */
    let circle =
        /* Find the success circle inside the popup */
        modal.querySelector(".o-circle");

    let newCircle =
        /* cloneNode() copies the success circle */
        circle.cloneNode(true);

    /* Replace the circle to replay the animation */
    circle.parentNode.replaceChild(
        newCircle,
        circle
    );
}

/* Back to home */
function goBackHome() {
    /* Remove cart after successful order */
    localStorage.removeItem(
        "toyHavenCart"
    );

    /* Open home page */
    window.location.href =
        "../index.html";
}