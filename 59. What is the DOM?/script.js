// ============================================================
// 59. What is the DOM? 🌳  — script.js
// ============================================================
//
// The DOM (Document Object Model) is a programming interface
// that represents an HTML document as a TREE of objects.
// Each HTML element becomes a "node" in that tree.
//
// JavaScript can read, change, add, or remove any node —
// that's how we make static pages interactive!
// ============================================================


// ─────────────────────────────────────────────────────────────
// HELPER: write text into an <output> pre element
// ─────────────────────────────────────────────────────────────

function log(outputId, message) {
    const output = document.getElementById(outputId);
    output.textContent = message;
}


// =============================================================
// 1. THE  document  OBJECT
// =============================================================
// `document` is the root of the entire DOM tree.
// It gives us access to every element on the page.
// Common properties:
//   document.title        → page <title>
//   document.URL          → current URL
//   document.body         → <body> element
//   document.head         → <head> element
//   document.documentElement → <html> element
// =============================================================

const btnLogDocument = document.getElementById("btnLogDocument");

btnLogDocument.addEventListener("click", () => {
    const info = [
        `document.title        → "${document.title}"`,
        `document.URL          → "${document.URL}"`,
        `document.body          → ${document.body.tagName}`,
        `document.head          → ${document.head.tagName}`,
        `document.doctype       → ${document.doctype.name}`,
        `document.characterSet  → "${document.characterSet}"`,
        `document.contentType   → "${document.contentType}"`,
    ].join("\n");

    log("outputDocument", info);

    // Also log to console so students can explore the full object
    console.log("document →", document);
    console.dir(document);
});


// =============================================================
// 2. SELECTING ELEMENTS
// =============================================================
// Four main ways to grab elements:
//
//  getElementById("id")
//    → returns ONE element (or null)
//
//  getElementsByClassName("class")
//    → returns a LIVE HTMLCollection
//
//  querySelector("CSS selector")
//    → returns the FIRST match (or null)
//
//  querySelectorAll("CSS selector")
//    → returns a STATIC NodeList of ALL matches
// =============================================================

const outputSelectors = "outputSelectors";
const demoItems = document.querySelectorAll(".demo-list li");

// helper: clear highlights
function clearHighlights() {
    demoItems.forEach((li) => li.classList.remove("highlight"));
}

// 2a — getElementById
document.getElementById("btnById").addEventListener("click", () => {
    clearHighlights();

    const element = document.getElementById("item-two");
    element.classList.add("highlight");

    log(outputSelectors,
        `document.getElementById("item-two")\n` +
        `→ <${element.tagName.toLowerCase()} id="${element.id}">\n` +
        `→ textContent: "${element.textContent}"`
    );
});

// 2b — getElementsByClassName
document.getElementById("btnByClass").addEventListener("click", () => {
    clearHighlights();

    const fruits = document.getElementsByClassName("fruit");

    // HTMLCollection is array-like, not an array
    // Convert to array to use .map()
    const names = Array.from(fruits).map((el) => el.textContent);

    Array.from(fruits).forEach((el) => el.classList.add("highlight"));

    log(outputSelectors,
        `document.getElementsByClassName("fruit")\n` +
        `→ HTMLCollection (${fruits.length} items)\n` +
        `→ ${names.join(", ")}\n\n` +
        `⚠️  Returns a LIVE collection — it auto-updates\n` +
        `    when matching elements are added or removed.`
    );
});

// 2c — querySelector
document.getElementById("btnQuerySelector").addEventListener("click", () => {
    clearHighlights();

    const element = document.querySelector(".veggie");
    element.classList.add("highlight");

    log(outputSelectors,
        `document.querySelector(".veggie")\n` +
        `→ Returns the FIRST match only\n` +
        `→ <${element.tagName.toLowerCase()} class="${element.className}">\n` +
        `→ textContent: "${element.textContent}"`
    );
});

// 2d — querySelectorAll
document.getElementById("btnQueryAll").addEventListener("click", () => {
    clearHighlights();

    const allItems = document.querySelectorAll(".demo-list li");
    allItems.forEach((el) => el.classList.add("highlight"));

    const summary = Array.from(allItems)
        .map((el, i) => `  [${i}] ${el.textContent}`)
        .join("\n");

    log(outputSelectors,
        `document.querySelectorAll(".demo-list li")\n` +
        `→ NodeList (${allItems.length} items)\n${summary}\n\n` +
        `💡 Returns a STATIC NodeList — use forEach() directly!`
    );
});


// =============================================================
// 3. CHANGING CONTENT & ATTRIBUTES
// =============================================================
// .textContent  → get / set plain text (safe, no HTML parsing)
// .innerHTML    → get / set HTML (⚠️ careful: XSS risk)
// .setAttribute("attr", "value") → change any attribute
// .style.property → change inline CSS
// =============================================================

const modifyTarget = document.getElementById("modifyTarget");
const demoImage = document.getElementById("demoImage");
const outputModify = "outputModify";

const originalText = modifyTarget.textContent;
const originalSrc = demoImage.src;

// 3a — textContent
document.getElementById("btnTextContent").addEventListener("click", () => {
    modifyTarget.textContent = "Changed with textContent! 🎉";
    log(outputModify,
        `element.textContent = "Changed with textContent! 🎉"\n\n` +
        `✅ Safe — treats everything as plain text.\n` +
        `   HTML tags are NOT parsed, they appear as text.`
    );
});

// 3b — innerHTML
document.getElementById("btnInnerHTML").addEventListener("click", () => {
    modifyTarget.innerHTML =
        'Changed with <strong style="color:#f472b6;">innerHTML</strong>! 🔥';
    log(outputModify,
        `element.innerHTML = 'Changed with <strong>innerHTML</strong>!'\n\n` +
        `⚠️  innerHTML PARSES HTML tags.\n` +
        `   Avoid using user input here → XSS vulnerability!`
    );
});

// 3c — setAttribute
document.getElementById("btnAttribute").addEventListener("click", () => {
    demoImage.setAttribute(
        "src",
        "https://via.placeholder.com/120x80/38bdf8/0f172a?text=New!"
    );
    log(outputModify,
        `element.setAttribute("src", "newURL")\n\n` +
        `You can also use:\n` +
        `  element.src = "newURL"        (property)\n` +
        `  element.getAttribute("src")   (read)\n` +
        `  element.removeAttribute("src")(remove)`
    );
});

// 3d — style
document.getElementById("btnStyle").addEventListener("click", () => {
    modifyTarget.style.color = "#fb923c";
    modifyTarget.style.fontSize = "1.4rem";
    modifyTarget.style.fontWeight = "bold";
    modifyTarget.style.textShadow = "0 0 12px rgba(251,146,60,0.5)";

    log(outputModify,
        `element.style.color     = "#fb923c"\n` +
        `element.style.fontSize  = "1.4rem"\n` +
        `element.style.fontWeight = "bold"\n\n` +
        `💡 Use camelCase for CSS properties:\n` +
        `   font-size  →  fontSize\n` +
        `   background-color  →  backgroundColor`
    );
});

// 3e — reset
document.getElementById("btnResetModify").addEventListener("click", () => {
    modifyTarget.textContent = originalText;
    modifyTarget.removeAttribute("style");
    demoImage.src = originalSrc;
    log(outputModify, "🔄 Reset to original state!");
});


// =============================================================
// 4. DOM TRAVERSAL
// =============================================================
// Navigate between related elements:
//
//   .parentElement         → the parent node
//   .children              → HTMLCollection of child elements
//   .firstElementChild     → first child element
//   .lastElementChild      → last child element
//   .nextElementSibling    → next sibling element
//   .previousElementSibling→ previous sibling element
// =============================================================

const family = document.getElementById("family");
const middleChild = document.getElementById("middle");
const outputTraversal = "outputTraversal";

function clearTraversalHighlights() {
    family.querySelectorAll("p").forEach((p) => {
        p.classList.remove("highlight-traversal");
    });
}

// 4a — parentElement
document.getElementById("btnParent").addEventListener("click", () => {
    clearTraversalHighlights();
    const parent = middleChild.parentElement;

    log(outputTraversal,
        `middleChild.parentElement\n` +
        `→ <${parent.tagName.toLowerCase()} id="${parent.id}">\n\n` +
        `Keeps going up:\n` +
        `  parent.parentElement → <${parent.parentElement.tagName.toLowerCase()}>\n` +
        `  (the <section> card)`
    );
});

// 4b — children
document.getElementById("btnChildren").addEventListener("click", () => {
    clearTraversalHighlights();
    const children = family.children;

    const list = Array.from(children)
        .map((c, i) => {
            c.classList.add("highlight-traversal");
            return `  [${i}] <${c.tagName.toLowerCase()} id="${c.id}"> → "${c.textContent}"`;
        })
        .join("\n");

    log(outputTraversal,
        `family.children\n` +
        `→ HTMLCollection (${children.length} elements)\n${list}`
    );
});

// 4c — firstElementChild
document.getElementById("btnFirstChild").addEventListener("click", () => {
    clearTraversalHighlights();
    const first = family.firstElementChild;
    first.classList.add("highlight-traversal");

    log(outputTraversal,
        `family.firstElementChild\n` +
        `→ <${first.tagName.toLowerCase()} id="${first.id}">\n` +
        `→ "${first.textContent}"\n\n` +
        `Also available:\n` +
        `  family.lastElementChild → "${family.lastElementChild.textContent}"`
    );
});

// 4d — nextElementSibling
document.getElementById("btnNextSibling").addEventListener("click", () => {
    clearTraversalHighlights();
    const eldest = document.getElementById("eldest");
    const next = eldest.nextElementSibling;
    eldest.classList.add("highlight-traversal");
    next.classList.add("highlight-traversal");

    log(outputTraversal,
        `eldest.nextElementSibling\n` +
        `→ <${next.tagName.toLowerCase()} id="${next.id}">\n` +
        `→ "${next.textContent}"\n\n` +
        `Also available:\n` +
        `  middle.previousElementSibling → "${middleChild.previousElementSibling.textContent}"\n` +
        `  youngest.nextElementSibling   → ${document.getElementById("youngest").nextElementSibling}`
    );
});


// =============================================================
// 5. CREATING & REMOVING ELEMENTS
// =============================================================
// document.createElement("tag")   → create a new element
// parent.appendChild(element)     → add at the end
// parent.insertBefore(new, ref)   → insert before a reference
// parent.removeChild(child)       → remove a child
// element.remove()                → remove itself
// =============================================================

const todoList = document.getElementById("todoList");
const outputCreate = "outputCreate";
let itemCounter = 0;

// 5a — appendChild
document.getElementById("btnAdd").addEventListener("click", () => {
    itemCounter++;

    // Step 1: Create the element
    const newItem = document.createElement("li");

    // Step 2: Set its content
    newItem.textContent = `New task #${itemCounter} ✨`;

    // Step 3: Append it to the parent
    todoList.appendChild(newItem);

    log(outputCreate,
        `const li = document.createElement("li");\n` +
        `li.textContent = "New task #${itemCounter} ✨";\n` +
        `todoList.appendChild(li);\n\n` +
        `📌 Total items: ${todoList.children.length}`
    );
});

// 5b — removeChild (last)
document.getElementById("btnRemoveLast").addEventListener("click", () => {
    if (todoList.lastElementChild) {
        const removed = todoList.lastElementChild;
        const text = removed.textContent;

        // Two equivalent ways to remove:
        // todoList.removeChild(removed);   ← parent removes child
        // removed.remove();                ← element removes itself
        todoList.removeChild(removed);

        log(outputCreate,
            `todoList.removeChild(todoList.lastElementChild)\n` +
            `→ Removed: "${text}"\n\n` +
            `📌 Total items: ${todoList.children.length}`
        );
    } else {
        log(outputCreate, "⚠️  The list is already empty!");
    }
});

// 5c — insertBefore
document.getElementById("btnInsertBefore").addEventListener("click", () => {
    itemCounter++;
    const newItem = document.createElement("li");
    newItem.textContent = `⭐ Priority task #${itemCounter}`;

    // Insert before the first child
    const firstItem = todoList.firstElementChild;

    if (firstItem) {
        todoList.insertBefore(newItem, firstItem);
    } else {
        todoList.appendChild(newItem);
    }

    log(outputCreate,
        `todoList.insertBefore(newItem, todoList.firstElementChild)\n\n` +
        `💡 insertBefore(newNode, referenceNode)\n` +
        `   places newNode right BEFORE referenceNode.\n\n` +
        `📌 Total items: ${todoList.children.length}`
    );
});


// =============================================================
// 6. EVENT LISTENERS
// =============================================================
// element.addEventListener("event", callbackFunction)
//
// Common events:
//   "click"       → mouse click
//   "dblclick"    → double click
//   "mouseenter"  → mouse enters element
//   "mouseleave"  → mouse leaves element
//   "keydown"     → key pressed down
//   "keyup"       → key released
//   "input"       → input value changed
//   "submit"      → form submitted
// =============================================================

const eventBox = document.getElementById("eventBox");
const outputEvents = "outputEvents";
let eventLog = [];

function addEventLog(message) {
    eventLog.unshift(message); // newest first
    if (eventLog.length > 8) {
        eventLog.pop();        // keep last 8
    }
    log(outputEvents, eventLog.join("\n"));
}

// Click
eventBox.addEventListener("click", (event) => {
    addEventLog(
        `🖱️  click  → x: ${event.offsetX}, y: ${event.offsetY}`
    );
});

// Double click
eventBox.addEventListener("dblclick", () => {
    addEventLog(`🖱️🖱️ dblclick → Double-clicked!`);
});

// Mouse enter
eventBox.addEventListener("mouseenter", () => {
    addEventLog(`➡️  mouseenter → Mouse entered the box`);
    eventBox.textContent = "You're inside! 🎯";
});

// Mouse leave
eventBox.addEventListener("mouseleave", () => {
    addEventLog(`⬅️  mouseleave → Mouse left the box`);
    eventBox.textContent = "Hover, click, or type here!";
});

// Keydown (box must be focused — it has tabindex)
eventBox.addEventListener("keydown", (event) => {
    addEventLog(
        `⌨️  keydown → key: "${event.key}"  code: "${event.code}"`
    );
});


// =============================================================
// 7. DOM TREE VISUALIZER
// =============================================================
// This walks through the actual DOM tree and prints a
// simplified representation — great for understanding the
// tree structure.
// =============================================================

document.getElementById("btnShowTree").addEventListener("click", () => {
    const treeOutput = document.getElementById("outputTree");

    function buildTree(node, indent = "") {
        let result = "";
        const children = node.children;

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const isLast = i === children.length - 1;
            const connector = isLast ? "└── " : "├── ";
            const nextIndent = indent + (isLast ? "    " : "│   ");

            // Build a compact label
            let label = `<${child.tagName.toLowerCase()}>`;
            if (child.id) {
                label += `#${child.id}`;
            }
            if (child.className && typeof child.className === "string") {
                const classes = child.className.trim().split(/\s+/).join(".");
                if (classes) {
                    label += `.${classes}`;
                }
            }

            result += `${indent}${connector}${label}\n`;

            // Recurse into children (limit depth to keep it readable)
            if (child.children.length > 0) {
                result += buildTree(child, nextIndent);
            }
        }

        return result;
    }

    const tree =
        `<html>\n` +
        buildTree(document.documentElement);

    treeOutput.textContent = tree;
    treeOutput.style.color = "#7dd3fc";
});


// =============================================================
// 🎓 SUMMARY — Key Takeaways
// =============================================================
//
// 1. The DOM is a tree-like model of your HTML page.
//
// 2. `document` is the entry point to the DOM.
//
// 3. Select elements with:
//    getElementById, getElementsByClassName,
//    querySelector, querySelectorAll
//
// 4. Modify content with:
//    textContent (safe), innerHTML (parses HTML)
//
// 5. Change attributes with:
//    setAttribute(), getAttribute(), or direct properties
//
// 6. Traverse the tree with:
//    parentElement, children, firstElementChild,
//    nextElementSibling, previousElementSibling
//
// 7. Create & remove elements with:
//    createElement(), appendChild(), insertBefore(),
//    removeChild(), remove()
//
// 8. Listen for events with:
//    addEventListener("event", callback)
//
// =============================================================
