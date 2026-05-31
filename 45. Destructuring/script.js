/*
Definition: Destructuring assignment is a convenient way of extracting
values from arrays or properties from objects into distinct variables.
It makes code concise and readable by matching the structure on the left
with the value on the right. Supports defaults, renaming, nesting, and
rest/spread patterns.
*/

// -------------------- Array destructuring --------------------
const numbers = [10, 20, 30, 40, 50];

// Extract first two values and collect the rest
const [first, second, ...others] = numbers;
console.log('first:', first);   // 10
console.log('second:', second); // 20
console.log('others:', others); // [30, 40, 50]

// Swap two variables with array destructuring
let a = 1, b = 2;
[a, b] = [b, a];
console.log('a,b after swap:', a, b); // 2 1

// Provide defaults when array elements may be missing
const [x = 100, y = 200, z = 300] = [7];
console.log('defaults:', x, y, z); // 7 200 300

// -------------------- Object destructuring --------------------
const person = {
    name: 'Asha',
    age: 28,
    contact: { email: 'asha@example.com', city: 'Bengaluru' }
};

// Basic property extraction
const { name, age } = person;
console.log('name, age:', name, age);

// Rename properties and set default values
const { name: fullName, country = 'India' } = person;
console.log('fullName, country:', fullName, country);

// Nested object destructuring
const { contact: { email, city } } = person;
console.log('email, city:', email, city);

// Collect remaining properties using rest pattern
const { name: n, ...restProps } = person;
console.log('restProps:', restProps);

// -------------------- Function parameter destructuring --------------------
function introduce({ name, age, contact: { city } = {} }) {
    return `${name} is ${age} years old and lives in ${city}.`;
}
console.log(introduce(person));

// Give a default object when argument might be undefined
function safeIntroduce(obj = { name: 'Guest', age: 'unknown' }) {
    const { name, age } = obj;
    return `${name} — ${age}`;
}
console.log(safeIntroduce());

// -------------------- Practical example: array of objects --------------------
const users = [
    { id: 1, username: 'alice', role: 'admin' },
    { id: 2, username: 'bob', role: 'editor' }
];

// Map usernames using destructuring in the callback
const usernames = users.map(({ username }) => username);
console.log('usernames:', usernames); // ['alice', 'bob']

/*
Notes:
- Use array destructuring when order matters (tuples, swap, etc.).
- Use object destructuring when picking properties by name.
- Defaults, nested patterns and rest make destructuring flexible.
*/
