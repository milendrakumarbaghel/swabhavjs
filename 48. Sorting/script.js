// Sorting strings
const fruits = ["banana", "apple", "mango", "cherry", "orange"];
const fruitsAsc = [...fruits].sort();
const fruitsDesc = [...fruits].sort().reverse();

console.log("Fruits (original):", fruits);
console.log("Fruits (A-Z):", fruitsAsc);
console.log("Fruits (Z-A):", fruitsDesc);

// Sorting numbers
const scores = [42, 7, 100, 23, 88, 16];
const scoresAsc = [...scores].sort((a, b) => a - b);
const scoresDesc = [...scores].sort((a, b) => b - a);

console.log("Scores (original):", scores);
console.log("Scores (low-high):", scoresAsc);
console.log("Scores (high-low):", scoresDesc);

// Sorting objects by property
const students = [
    { name: "Asha", marks: 82 },
    { name: "Ben", marks: 91 },
    { name: "Chen", marks: 74 },
    { name: "Diya", marks: 88 },
];

const byName = [...students].sort((a, b) => a.name.localeCompare(b.name));
const byMarks = [...students].sort((a, b) => b.marks - a.marks);

console.log("Students (name):", byName);
console.log("Students (marks):", byMarks);
