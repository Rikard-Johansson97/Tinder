const imgContainer = document.querySelector(".img-container");
const matchesContainer = document.querySelector(".matches-container");

const matches = [];

//
const displayMatch = document.querySelector(".you-match");
document.body.addEventListener("click", (e) => {
    switch (e.target.id) {
        case "like":
            checkIfMatch();
            break;
        case "dislike":
            callUserData(false);
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
            console.log("return");
            break;
    }
});

// get data from api https://randomuser.me/api/
const getUserData = async () => {
    const response = await fetch("https://randomuser.me/api/");
    if (response.status !== 200) {
        throw new Error("ERROR");
    }
    const userData = await response.json();
    return userData.results[0];
};

const checkIfMatch = () => {
    const firstRnd = Math.floor(Math.random() * 2);
    const secondRnd = Math.floor(Math.random() * 2);
    if (firstRnd === secondRnd) {
        displayMatchMessage();
        setTimeout(callUserData, 1500, true);
    } else callUserData(false);
};

const callUserData = (status) => {
    getUserData(status)
        .then((userData) => {
            console.log("resolved", userData);
            displayUserData(
                status,
                userData.name.first,
                userData.dob.age,
                userData.location.city,
                userData.picture.large,
                getDistanceFromLatLonInKm(
                    userData.location.coordinates.latitude,
                    userData.location.coordinates.longitude
                ),
                userData.cell,
                userData.gender
            );
        })
        .catch((err) => {
            console.log("rejected", err.message);
        });
};
// MY LATITUDE: 57.107117 MY LONGITUDE: 12.252091
function getDistanceFromLatLonInKm(dateLat, dateLong) {
    var radiusOfEarth = 6378; // Radius of the earth in km
    var dLat = deg2rad(dateLat - 57.107117); // deg2rad below
    var dLon = deg2rad(dateLong - 12.252091);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(57.107117)) *
            Math.cos(deg2rad(dateLat)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = radiusOfEarth * c; // Distance in km
    return Math.floor(d);
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

const displayUserData = (
    status,
    name,
    age,
    home,
    img,
    location,
    number,
    gender
) => {
    matches.push({ name, age, img });
    console.log(matches);
    if (status) displayMatches();

    imgContainer.innerHTML = `<img
    src="${img}"
    alt="user"
    class="date-img" />
<div class="date-info-container">
    <h2 class="name">${name}<span class="age"> ${age}</span></h2>
    <p>
        <i class="fa-solid fa-house"></i>
        <span class="home">${home}</span>
    </p>
    <p>
        <i class="fa-solid fa-location-dot"></i>
        <span class="location">${location} KM</span>
    </p>
    <div class="show-more-info">
        <p><i class="fa-solid fa-phone"></i><a class="tel" href=“tel:${number}">${number}</a></p>
        <p><i class="fa-solid fa-mars-and-venus"></i><span>${gender}</span></p>
    </div>
</div>
<h4 class="you-match true">MATCH</h4>
<i id="show-info" class="fa-solid fa-arrow-up"></i>`;
};

const displayMatches = () => {
    // HJÄLP HÄR! varför måste jag ha matches.length - 1 på första sen byta till -2
    let i = matches.length - 1;
    if (matches.length > 1) {
        i = matches.length - 2;
    } else {
        i = matches.length - 1;
    }
    matchesContainer.innerHTML += `<div class="match">
        <img
            src="${matches[i].img}"
            alt="user"
            class="match-img" />

        <p class="match-name">${matches[i].name} <span class="match-age">${matches[i].age}</span></p>
    </div> -->`;
};

const displayMatchMessage = () => {
    const matchOrNot = document.querySelector(".you-match");
    console.log(matchOrNot);
    matchOrNot.style.fontSize = "60px";
};

callUserData(false);
