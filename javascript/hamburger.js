let mobileHamburger =
    document.getElementById("mobileHamburger");

let mobileSideMenu =
    document.getElementById("mobileSideMenu");

let mobileOverlay =
    document.getElementById("mobileOverlay");

let mobileSearchIcon =
    document.getElementById("mobileSearchIcon");

let mobileSearchArea =
    document.getElementById("mobileSearchArea");

let mobileSearchInput =
    document.getElementById("mobileSearchInput");

let mobileSearchClose =
    document.getElementById("mobileSearchClose");


/* ================= MENU ================= */

mobileHamburger.addEventListener("click", function () {

    mobileHamburger.classList.toggle("active");

    mobileSideMenu.classList.toggle("active");

    mobileOverlay.classList.toggle("active");


    /* Close search */

    mobileSearchArea.classList.remove("active");

});


/* ================= CLOSE MENU ================= */

mobileOverlay.addEventListener("click", function () {

    mobileHamburger.classList.remove("active");

    mobileSideMenu.classList.remove("active");

    mobileOverlay.classList.remove("active");

});


/* ================= SEARCH ================= */

mobileSearchIcon.addEventListener("click", function () {

    mobileSearchArea.classList.toggle("active");


    /* Close menu */

    mobileHamburger.classList.remove("active");

    mobileSideMenu.classList.remove("active");

    mobileOverlay.classList.remove("active");


    if (mobileSearchArea.classList.contains("active")) {

        mobileSearchInput.focus();

    }

});


/* ================= CLOSE SEARCH ================= */

mobileSearchClose.addEventListener("click", function () {

    mobileSearchArea.classList.remove("active");

});