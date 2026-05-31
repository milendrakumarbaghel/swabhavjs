// The Date object is used to work with dates & times


// let date = new Date(0);
// let date = new Date(2023, 0, 1, 2, 3, 4, 5);
// let date = new Date("January 1, 2023 00:00:00");

/*
let year = date.getFullYear();
let dayOfMonth = date.getDate();
let dayofWeek = date.getDay();
let month = date.getMonth();
let hour = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
let ms = date.getMilliseconds();
*/

/*
date.setFullYear(2024);
date.setMonth(11);
date.setDate(31);
date.setHours(23);
date.setMinutes(1);
date.setSeconds(30);
date.setMilliseconds(0);
*/

const dateLabel = document.getElementById("myLabel");
const timeLabel = document.getElementById("timeLabel");

update();
setInterval(update, 1000);

function update() {
    const date = new Date();
    dateLabel.innerHTML = formatDate(date);
    timeLabel.innerHTML = formatTime(date);
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = formatZeroes(date.getMonth() + 1);
    const day = formatZeroes(date.getDate());

    return `${month}/${day}/${year}`;
}

function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const amOrPm = hours >= 12 ? "PM" : "AM";

    hours = (hours % 12) || 12;

    const hh = formatZeroes(hours);
    const mm = formatZeroes(minutes);
    const ss = formatZeroes(seconds);

    return `${hh}:${mm}:${ss} ${amOrPm}`;
}

function formatZeroes(time) {
    return time.toString().padStart(2, "0");
}
