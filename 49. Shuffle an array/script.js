// Fisher-Yates shuffle (in-place)
function shuffleArray(items) {
    for (let i = items.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const letters = ["A", "B", "C", "D", "E", "F"];

console.log("Numbers (original):", numbers);
console.log("Numbers (shuffled):", shuffleArray([...numbers]));

console.log("Letters (original):", letters);
console.log("Letters (shuffled):", shuffleArray([...letters]));
