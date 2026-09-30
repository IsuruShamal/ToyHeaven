var bannerImage = document.getElementById("bannerImage");

var banners = [
    "./img/banners/lego banner.png",
    "./img/banners/lego star wars.jpg",
    "./img/banners/pokemon.jfif"
];

var currentBanner = 0;

setInterval(function() {

    currentBanner++;

    if (currentBanner >= banners.length)
        {
            currentBanner = 0;
        }

    bannerImage.src = banners[currentBanner];
}, 3000);