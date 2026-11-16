/**
 * Part B — Higher-Order Functions, Map, Set & Object Methods
 * QuickCart Order Management System
 */

console.log("==================================================");
console.log("PART B: HIGHER-ORDER FUNCTIONS, MAP, SET & OBJECT METHODS");
console.log("==================================================\n");

// Cart Data Setup
const cart = [
  { id: 101, name: "Laptop", price: 50000, quantity: 1, category: "Electronics" },
  { id: 102, name: "Mouse", price: 800, quantity: 2, category: "Accessories" },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, category: "Accessories" },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, category: "Electronics" },
  { id: 105, name: "Headphones", price: 2500, quantity: 2, category: "Accessories" }
];

// ==========================================
// Task 1 — Array methods
// ==========================================
console.log("--- Task 1: Array methods ---\n");

// 1. map() -> names with total item price
const itemTotals = cart.map(item => ({
  name: item.name,
  totalItemPrice: item.price * item.quantity
}));
console.log("1. map() - Names with total item price:", itemTotals);

// 2. filter() -> products above ₹2,000
const productsAbove2000 = cart.filter(item => item.price > 2000);
console.log("\n2. filter() - Products with unit price above ₹2,000:", productsAbove2000);

// 3. reduce() -> total cart value (price × quantity)
const totalCartValue = cart.reduce(
  (accumulator, item) => accumulator + item.price * item.quantity,
  0
);
console.log(`\n3. reduce() - Total Cart Value: ₹${totalCartValue}`);

// 4. forEach() -> log name, category and quantity
console.log("\n4. forEach() - Logging name, category, and quantity:");
cart.forEach(item => {
  console.log(`  - ${item.name} (${item.category}) | Qty: ${item.quantity}`);
});

// 5. combined -> total value of all Electronics products
const totalElectronicsValue = cart
  .filter(item => item.category === "Electronics")
  .reduce((acc, item) => acc + item.price * item.quantity, 0);
console.log(`\n5. Combined (filter + reduce) - Total value of Electronics: ₹${totalElectronicsValue}`);

console.log("\n[Task 1 Conceptual Answers]");
console.log("Q1: What is the difference between map() and forEach()?");
console.log(
  "A1: map() transforms each element and returns a brand-new array of identical length without mutating the original. forEach() simply iterates through an array to execute side effects for each element and returns undefined."
);

console.log("\nQ2: Does filter() change the original array?");
console.log(
  "A2: No. filter() creates a shallow copy of a portion of the original array containing elements that satisfy the predicate callback. The original array remains unchanged."
);

console.log("\nQ3: Why is reduce() useful for totals?");
console.log(
  "A3: reduce() processes an entire array into a single accumulated result (e.g., a number, object, or grouped array) by maintaining an accumulator across iterations."
);

console.log("\nQ4: Which method returns a new transformed array?");
console.log(
  "A4: map() specifically returns a new transformed array whose elements correspond 1:1 with the return values of the callback function."
);

// ==========================================
// Task 2 — Map and Set
// ==========================================
console.log("\n--- Task 2: Map and Set ---\n");

// A. Inventory Map
console.log("A. Inventory Management using Map:");
const inventory = new Map();

// Populate inventory
cart.forEach(item => {
  inventory.set(item.id, {
    name: item.name,
    price: item.price,
    stock: item.quantity * 10,
    category: item.category
  });
});

// 1. Get a product
const retrievedProduct = inventory.get(101);
console.log("Get product 101:", retrievedProduct);

// 2. Update its quantity/stock
const updated101 = { ...inventory.get(101), stock: 15 };
inventory.set(101, updated101);
console.log("Updated product 101 stock to 15:", inventory.get(101));

// 3. Delete one
const deletedResult = inventory.delete(102);
console.log(`Deleted product 102? ${deletedResult}. Has 102 now? ${inventory.has(102)}`);

// 4. Loop over all entries
console.log("All remaining inventory entries:");
inventory.forEach((details, productId) => {
  console.log(`  [ID: ${productId}] ${details.name} -> Stock: ${details.stock}, Price: ₹${details.price}`);
});

// B. Duplicates with Set
console.log("\nB. Deduplication using Set:");
const rawCustomerEmails = [
  "rahul@gmail.com",
  "priya@gmail.com",
  "rahul@gmail.com",
  "arjun@gmail.com",
  "priya@gmail.com"
];

const uniqueEmails = [...new Set(rawCustomerEmails)];
console.log("Raw emails count:", rawCustomerEmails.length);
console.log("Unique emails count:", uniqueEmails.length);
console.log("Unique email list:", uniqueEmails);

console.log("\n[Task 2 Conceptual Answers]");
console.log("Q1: How is Map different from a plain object?");
console.log(
  "A1: Map keys can be of any type (functions, objects, primitives), whereas object keys must be Strings or Symbols. Map preserves explicit insertion order, has a built-in .size property, is directly iterable, and provides optimized performance for frequent additions/removals."
);

console.log("\nQ2: Why is Set good for removing duplicates?");
console.log(
  "A2: A Set inherently stores only unique values. Converting an array with duplicates to a Set automatically discards redundant values in O(N) time complexity."
);

console.log("\nQ3: Can a Map use an object as a key?");
console.log(
  "A3: Yes. In Map, object references can be used directly as keys. The key lookup relies on strict reference equality (SameValueZero)."
);

console.log("\nQ4: Does Set keep insertion order?");
console.log(
  "A4: Yes. Sets in JavaScript maintain insertion order when iterating over elements via forEach, for...of, or spread."
);

// ==========================================
// Task 3 — Object.freeze() vs Object.seal()
// ==========================================
console.log("\n--- Task 3: Object.freeze() vs Object.seal() ---\n");

const productConfig = { name: "Laptop", price: 50000, stock: 20 };

// Create distinct copies
const frozenProduct = Object.freeze({ ...productConfig });
const sealedProduct = Object.seal({ ...productConfig });

console.log("Initial Frozen Product:", frozenProduct);
console.log("Initial Sealed Product:", sealedProduct);

// Test operations on Object.freeze()
console.log("\nTesting Object.freeze():");
try {
  // 1. Modify property
  frozenProduct.price = 55000;
  // 2. Add property
  frozenProduct.discount = 10;
  // 3. Delete property
  delete frozenProduct.stock;
} catch (error) {
  console.log("Caught strict mode error:", error.message);
}
console.log("Frozen Product after attempted mutations:", frozenProduct);
console.log("Is frozen?", Object.isFrozen(frozenProduct));
console.log("Did price change?", frozenProduct.price === 50000 ? "No (Blocked)" : "Yes");
console.log("Was discount added?", "discount" in frozenProduct ? "Yes" : "No (Blocked)");
console.log("Was stock deleted?", "stock" in frozenProduct ? "No (Blocked)" : "Yes");

// Test operations on Object.seal()
console.log("\nTesting Object.seal():");
try {
  // 1. Modify property (Permitted in sealed objects if writable: true)
  sealedProduct.price = 52000;
  // 2. Add property (Blocked)
  sealedProduct.discount = 10;
  // 3. Delete property (Blocked)
  delete sealedProduct.stock;
} catch (error) {
  console.log("Caught strict mode error:", error.message);
}
console.log("Sealed Product after attempted mutations:", sealedProduct);
console.log("Is sealed?", Object.isSealed(sealedProduct));
console.log("Did price change?", sealedProduct.price === 52000 ? "Yes (Permitted)" : "No");
console.log("Was discount added?", "discount" in sealedProduct ? "Yes" : "No (Blocked)");
console.log("Was stock deleted?", "stock" in sealedProduct ? "No (Blocked)" : "Yes");

console.log("\n[Task 3 Conceptual Answers]");
console.log("Q1: What is the difference between freeze() and seal()?");
console.log(
  "A1: Object.freeze() makes an object completely immutable: properties cannot be added, removed, or modified (writable: false, configurable: false). Object.seal() prevents adding or deleting properties (configurable: false), but allows modifying the values of existing writable properties."
);

console.log("\nQ2: Can a property be changed after seal()?");
console.log(
  "A2: Yes, existing properties can be changed after Object.seal() provided their 'writable' descriptor was true prior to sealing."
);

console.log("\nQ3: Are nested objects frozen automatically?");
console.log(
  "A3: No. Object.freeze() is shallow. Nested objects inside a frozen object remain mutable unless recursively frozen via deep freeze."
);

console.log("\nQ4: What is shallow freezing?");
console.log(
  "A4: Shallow freezing means only the top-level direct properties of the target object are frozen. Any object or array referenced by a property on the frozen object can still have its own properties mutated."
);
