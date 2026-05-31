const user = {
    id: 101,
    name: {
        first: "Asha",
        last: "Iyer",
    },
    contact: {
        email: "asha@example.com",
        phone: {
            countryCode: "+91",
            number: "98765-43210",
        },
    },
    address: {
        street: "12 MG Road",
        city: "Pune",
        state: "MH",
        zip: "411001",
    },
    skills: ["JavaScript", "HTML", "CSS"],
};

console.log("First name:", user.name.first);
console.log("City:", user.address.city);
console.log("Phone:", `${user.contact.phone.countryCode} ${user.contact.phone.number}`);

// Update nested values
user.contact.email = "asha.iyer@example.com";
user.address.zip = "411002";
user.skills.push("React");

console.log("Updated contact:", user.contact);
console.log("Updated address:", user.address);
console.log("Skills:", user.skills.join(", "));

// Loop through nested object keys
for (const [section, value] of Object.entries(user)) {
    console.log(`${section}:`, value);
}
