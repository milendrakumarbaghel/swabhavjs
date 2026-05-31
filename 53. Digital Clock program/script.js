
const myLabel = document.getElementById("myLabel");

update();
setInterval(update, 1000);

function update() {
    const date = new Date();
    myLabel.innerHTML = formatTime(date);
}

function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const amOrPm = hours >= 12 ? "pm" : "am";

    hours = (hours % 12) || 12;

    const hh = formatZeroes(hours);
    const mm = formatZeroes(minutes);
    const ss = formatZeroes(seconds);

    return `${hh}:${mm}:${ss} ${amOrPm}`;
}

function formatZeroes(time) {
    return time.toString().padStart(2, "0");
}
