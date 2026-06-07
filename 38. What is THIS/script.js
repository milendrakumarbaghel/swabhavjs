// this =   reference to a particular object
//          the reference depends on the immediate context

// this in Global Context
console.log(this);

//     In browser → window
//     In Node → {} (module scope)


// this Inside an Object Method
const person = {
  name: "Milendra",
  greet: function () {
    console.log(this.name);
  }
};
// Here this refers to the object that is calling the function.

person.greet(); // Milendra

// this Inside a Regular Function
function show() {
  console.log(this);
}

show();


// Simple Mental Model (before your brain melts)

// * Object method → this = object
// * Regular function → this = window / undefined
// * Arrow function → this = inherited
// * Event handler → this = element
// * Detached function → this = lost soul
