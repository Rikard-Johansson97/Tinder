const imgContainer = document.querySelector(".img-container"); // img card
const matchesContainer = document.querySelector(".matches-container"); // IF match place them here
document.body.addEventListener("click", (e) => {
    switch (e.target.id) {
        case "like":
            getUserData(true);
            break;
        case "dislike":
            getUserData(false);
            break;
        case "show-info":
            const showInfo = document.querySelector(".show-more-info");
            const arrow = document.querySelector(".fa-arrow-up");
            if (showInfo.classList.contains("active")) {
                showInfo.classList.remove("active");
                arrow.classList.remove("active");
            } else {
                showInfo.classList.add("active");
                arrow.classList.add("active");
            }
            break;
        default:
            break;
    }
});
let activeCard = []; // Active card stores the user we want to check if we match with.

const getUserData = async (like) => {
    const response = await fetch("https://randomuser.me/api/"); // här hämtas datan från en server
    if (response.status !== 200) throw new Error("respons status is not 200"); // testar om serverns respons status inte är 200
    const userData = await response.json();
    if (like && activeCard.gender === "female") {
        displayMatchMessage();
        displayMatch();
        setTimeout(() => {
            activeCard = userData.results[0];
            return displayUserData(userData.results[0]);
        }, 500);
    } else {
        activeCard = userData.results[0];
        return displayUserData(userData.results[0]);
    }
};
const displayMatch = () => {
    matchesContainer.innerHTML += `<div class="match">
        <img
            src="${activeCard.picture.large}"
            alt="user"
            class="match-img" />
        <p class="match-name">${activeCard.name.first} <span class="match-age">${activeCard.dob.age}</span></p>
    </div> -->`;
};
const displayMatchMessage = () => {
    const matchOrNot = document.querySelector(".you-match");
    matchOrNot.style.fontSize = "60px";
};
// MY LATITUDE: 57.107117 MY LONGITUDE: 12.252091
function getDistanceFromLatLonInKm(dateLat, dateLong) {
    let radiusOfEarth = 6378; // Radius of the earth in km
    let dLat = deg2rad(dateLat - 57.107117); // deg2rad below
    let dLon = deg2rad(dateLong - 12.252091);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(57.107117)) *
            Math.cos(deg2rad(dateLat)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = radiusOfEarth * c; // Distance in km
    return Math.floor(d);
}
const deg2rad = (deg) => deg * (Math.PI / 180);
const displayUserData = (userData) => {
    imgContainer.innerHTML = `<img
    src="${userData.picture.large}"
    alt="user"
    class="date-img" />
<div class="date-info-container">
    <h2 class="name">${userData.name.first}<span class="age"> ${
        userData.dob.age
    }</span></h2>
    <p>
        <i class="fa-solid fa-house"></i>
        <span class="home">${userData.location.city}</span>
    </p>
    <p>
        <i class="fa-solid fa-location-dot"></i>
        <span class="location">${getDistanceFromLatLonInKm(
            userData.location.coordinates.latitude,
            userData.location.coordinates.longitude
        )} KM</span>
    </p>
    <div class="show-more-info">
        <p><i class="fa-solid fa-phone"></i><a class="tel" href=“tel:${
            userData.cell
        }">${userData.cell}</a></p>
        <p><i class="fa-solid fa-mars-and-venus"></i><span>${
            userData.gender
        }</span></p>
    </div>
</div>
<h4 class="you-match true">MATCH</h4>
<i id="show-info" class="fa-solid fa-arrow-up"></i>`;
};
getUserData(false);
