/**
 * Part C — JSON Handling & Output-Based Debugging
 * QuickCart Order Management System
 */

console.log("==================================================");
console.log("PART C: JSON HANDLING & OUTPUT-BASED DEBUGGING");
console.log("==================================================\n");

// ==========================================
// Task 1 — JSON.stringify() and JSON.parse()
// ==========================================
console.log("--- Task 1: JSON.stringify() and JSON.parse() ---\n");

const order = {
  orderId: 501,
  customer: "Rahul",
  amount: 5000,
  deliveryDate: undefined,
  discount: null,
  calculateTax() {
    return 500;
  }
};

console.log("Original Order Object:", order);

// Convert with JSON.stringify()
const jsonString = JSON.stringify(order, null, 2);
console.log("\nSerialized JSON String:\n", jsonString);

// Convert back with JSON.parse()
const parsedOrder = JSON.parse(jsonString);
console.log("\nParsed Order Object back from JSON:", parsedOrder);

// Identify lost properties
const originalKeys = Object.keys(order);
const parsedKeys = Object.keys(parsedOrder);
const lostProperties = originalKeys.filter(key => !(key in parsedOrder));

console.log("\nLost Properties during serialization:", lostProperties);
console.log("- 'deliveryDate' (value: undefined) was omitted.");
console.log("- 'calculateTax' (value: function) was omitted.");
console.log("- 'discount' (value: null) was preserved as null.");

console.log("\n[Why functions and undefined behave differently in JSON]");
console.log(
  "Explanation:\n" +
  "JSON (JavaScript Object Notation) is a data-interchange standard defined by RFC 8259.\n" +
  "It strictly supports primitive values (strings, numbers, booleans, null) and structures (arrays, objects).\n" +
  "1. 'undefined' is not a valid JSON data type. In an object, JSON.stringify() omits keys with undefined values entirely.\n" +
  "2. Functions are executable code, not static serializable data, and are prohibited in JSON to prevent security and portability issues. Hence, object methods are completely omitted during serialization.\n" +
  "3. 'null', in contrast, is an explicit JSON literal representing intentional absence of an object value, so it is preserved."
);

// ==========================================
// Task 2 — Predict the output
// ==========================================
console.log("\n--- Task 2: Predict the output ---\n");

// Q1 - undefined in an object
console.log("Q1: console.log(JSON.stringify({ name: \"Rahul\", age: undefined }));");
console.log("Expected Output: '{\"name\":\"Rahul\"}'");
const q1Actual = JSON.stringify({ name: "Rahul", age: undefined });
console.log("Actual Output:  ", q1Actual);
console.log(
  "Reason: Object properties whose values are undefined are omitted (censored) during JSON serialization.\n"
);

// Q2 - undefined in an array
console.log("Q2: console.log(JSON.stringify([10, undefined, 30]));");
console.log("Expected Output: '[10,null,30]'");
const q2Actual = JSON.stringify([10, undefined, 30]);
console.log("Actual Output:  ", q2Actual);
console.log(
  "Reason: In arrays, property order and length are positional. Dropping an element would corrupt the indices of subsequent items. Therefore, undefined in arrays is serialized as null.\n"
);

// Q3 - NaN and Infinity
console.log("Q3: console.log(JSON.stringify({ price: NaN, discount: Infinity }));");
console.log("Expected Output: '{\"price\":null,\"discount\":null}'");
const q3Actual = JSON.stringify({ price: NaN, discount: Infinity });
console.log("Actual Output:  ", q3Actual);
console.log(
  "Reason: IEEE 754 special numeric values (NaN, Infinity, -Infinity) are not representable in standard JSON numbers. JSON.stringify() converts all of them to null.\n"
);

// Q4 - invalid JSON
console.log("Q4: console.log(JSON.parse(\"{name: 'Rahul', age: 25}\"));");
console.log("Expected Output: SyntaxError (JSON.parse requires double-quoted property names and strings)");
try {
  JSON.parse("{name: 'Rahul', age: 25}");
} catch (error) {
  console.log("Actual Output:   Caught Error ->", error.name + ": " + error.message);
}
console.log(
  "Reason: Standard JSON requires all object keys and string values to be enclosed in standard double quotes (\"). Unquoted keys and single quotes are syntactically invalid in JSON.\n"
);

// Q5 - circular reference
console.log("Q5: const user = { name: \"Rahul\" }; user.self = user; console.log(JSON.stringify(user));");
console.log("Expected Output: TypeError: Converting circular structure to JSON");
try {
  const user = { name: "Rahul" };
  user.self = user;
  JSON.stringify(user);
} catch (error) {
  console.log("Actual Output:   Caught Error ->", error.name + ": " + error.message);
}
console.log(
  "Reason: Circular references cause infinite recursion while traversing the object graph. JSON.stringify() detects cycles and terminates by throwing a TypeError.\n"
);

// Q6 - Date object
console.log("Q6: console.log(JSON.stringify({ createdAt: new Date(\"2026-01-01\") }));");
console.log("Expected Output: '{\"createdAt\":\"2026-01-01T00:00:00.000Z\"}'");
const q6Actual = JSON.stringify({ createdAt: new Date("2026-01-01") });
console.log("Actual Output:  ", q6Actual);
console.log(
  "Reason: Date objects implement an internal Date.prototype.toJSON() method, which returns an ISO 8601 formatted UTC timestamp string that JSON.stringify() serializes as a string."
);
