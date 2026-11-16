# QuickCart — Advanced JavaScript & Asynchronous Programming

> **Practical Assessment & Implementation Suite**  
> **Course / Assessment:** Advanced JavaScript Practical Assignment  
> **Time Duration:** 2 Hours (120 Minutes) | **Total Marks:** 100  
> **Candidate / Author:** Full Stack Engineering Team  
> **Language & Environment:** Modern JavaScript (ES6+), HTML5, CSS3, Node.js (v24+) — *Zero external libraries or frameworks*.

---

## 📋 Table of Contents
1. [Assignment Overview](#-assignment-overview)
2. [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
3. [Technologies Used](#-technologies-used)
4. [How to Run the Project](#-how-to-run-the-project)
5. [In-Depth Solution Walkthrough & Conceptual Q&A](#-in-depth-solution-walkthrough--conceptual-qa)
   - [Part A — Objects, Prototypes & ES6 Classes](#part-a--objects-prototypes--es6-classes)
   - [Part B — Higher-Order Functions, Map, Set & Object Methods](#part-b--higher-order-functions-map-set--object-methods)
   - [Part C — JSON Handling & Output-Based Debugging](#part-c--json-handling--output-based-debugging)
   - [Part D — Asynchronous JavaScript & Promises](#part-d--asynchronous-javascript--promises)
   - [Part E — Performance Optimization & DOM Events (Interactive Console)](#part-e--performance-optimization--dom-events)
   - [Part F — Final Real-Time Integration Challenge](#part-f--final-real-time-integration-challenge)
6. [DOM Optimization Visual Guide & Screenshots](#-dom-optimization-visual-guide--ui-preview)
7. [Coding Standards Compliance Checklist](#-coding-standards-compliance-checklist)
8. [Submission Details](#-submission-details)

---

## 🛍️ Assignment Overview

**QuickCart** is a modern e-commerce order management system. This repository contains the complete practical implementation, debugging, output prediction, and architectural optimizations addressing core issues in:
- Object inheritance and prototypal duplication
- Array calculations and data aggregation
- Duplicate data removal and key-value indexing
- JSON serialization quirks and edge-case error handling
- Asynchronous control flows (Callbacks vs Promises vs Async/Await vs Promise Combinators)
- Browser performance optimization (Debouncing, Throttling, Memoization)
- Event propagation dynamics (Bubbling, `stopPropagation`, Event Delegation)
- Real-time order pipeline integration

---

## 📁 Project Architecture & Directory Structure

```
quickcart-advanced-javascript/
├── part-a-objects-classes/
│   └── products.js                 # Prototypes, ES6 Classes, extends/super, ES6 syntax
├── part-b-array-methods/
│   └── shopping-cart.js            # map, filter, reduce, forEach, Map, Set, freeze vs seal
├── part-c-json-debugging/
│   └── json-handling.js            # JSON.stringify, JSON.parse, edge cases, error predictions
├── part-d-asynchronous/
│   └── order-processing.js         # Event loop, Callbacks, Promises, Async/Await, Combinators
├── part-e-optimization-events/
│   ├── index.html                  # Interactive Performance & DOM Events Testing Console
│   ├── script.js                   # Debounce, Throttle, Memoize, Event Delegation engine
│   └── style.css                   # Clean responsive design styling
├── part-f-integration/
│   └── quickcart.js                # Complete end-to-end order processing integration
└── README.md                       # Comprehensive documentation & evaluation answers
```

---

## 🛠️ Technologies Used

- **Language:** JavaScript (ECMAScript 2015+ / ES6+)
- **Runtime:** Node.js (v24.11.0+)
- **Web Technologies:** HTML5, CSS3, DOM Level 3 Events API
- **Tooling:** Native Browser APIs (`setTimeout`, `clearTimeout`, `addEventListener`, `closest`, `Date`, `JSON`, `Map`, `Set`)
- **Third-Party Libraries:** **None** (100% pure vanilla JavaScript per assignment requirements)

---

## 🚀 How to Run the Project

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or newer) installed.

### 1. Run Node.js Console Scripts
From the repository root directory, execute each part:

```powershell
# Part A: Objects, Prototypes & ES6 Classes
node part-a-objects-classes/products.js

# Part B: Higher-Order Functions, Map, Set & Object Methods
node part-b-array-methods/shopping-cart.js

# Part C: JSON Handling & Output Debugging
node part-c-json-debugging/json-handling.js

# Part D: Asynchronous JavaScript & Promises
node part-d-asynchronous/order-processing.js

# Part F: Final Real-Time Integration Challenge
node part-f-integration/quickcart.js
```

### 2. Run the Interactive Part E Web Interface
To test Debouncing, Throttling, Memoization, and Event Bubbling/Delegation:
- Simply open `part-e-optimization-events/index.html` directly in any modern web browser (Chrome, Edge, Firefox, Safari).
- Or run a lightweight local static server:
  ```powershell
  # Using npx serve or python (optional):
  npx serve part-e-optimization-events
  # or
  python -m http.server -d part-e-optimization-events 3000
  ```

---

## 📖 In-Depth Solution Walkthrough & Conceptual Q&A

---

### Part A — Objects, Prototypes & ES6 Classes
**Location:** [`part-a-objects-classes/products.js`](file:///c:/Users/Admin/Desktop/quickcart-advanced-javascript/part-a-objects-classes/products.js)

#### Tasks Implemented:
1. **Task 1 — Prototype-based Products:** Created constructor function `Product(productName, price, category)` and attached `displayProduct()` to `Product.prototype`. Instantiated three distinct products.
2. **Task 2 — ES6 Classes:** Created base `ProductClass` with `getProductDetails()`. Extended it into `ElectronicProduct` (adding `warrantyPeriodMonths` and `getWarrantyDetails()`) and `ClothingProduct` (adding `size`, `material`, and `getSizeGuide()`) using `super()`.
3. **Task 3 — ES6 Checkout Syntax:**
   - Arrow function `calculateDiscountedPrice(price, discountPercent)`
   - Template literal producing: `Hello Rahul, your order of Laptop is confirmed. Total: ₹50000.`
   - Destructuring `{ name, email }` from `customer`
   - Rest parameter in `calculateTotal(...prices)`
   - Spread operator `{ ...originalProduct, price: 47500 }` to copy without mutating original.

#### Conceptual Questions & Answers:
- **Task 1 Q1: Why add `displayProduct()` to the prototype instead of the constructor?**  
  *Answer:* When a method is defined inside a constructor function, a new copy of that function is allocated in memory for every single object instance created. Adding `displayProduct()` to `Product.prototype` ensures that all instances share a single function reference via prototypal delegation, dramatically reducing memory overhead.
- **Task 1 Q2: What is the difference between `__proto__` and `prototype`?**  
  *Answer:* `prototype` is an explicit property that exists only on functions (specifically constructor functions and classes). It is the blueprint object used to configure the prototype of objects created by invoking that function with `new`. In contrast, `__proto__` (standardized as `Object.getPrototypeOf()`) is an internal property present on every object instance, pointing directly to the prototype object it inherits from.
- **Task 1 Q3: What happens when JavaScript cannot find a property on an object?**  
  *Answer:* JavaScript looks at the object itself. If not found, it traverses up the prototype chain via `__proto__` to its prototype, then to that prototype’s prototype, all the way to `Object.prototype`. If still not found, `Object.prototype.__proto__` evaluates to `null`, terminating the chain. The property access evaluates to `undefined` (or throws a `ReferenceError` if accessed as an uninitialized bare identifier).
- **Task 2 Q1: What is the purpose of `extends`?**  
  *Answer:* The `extends` keyword establishes inheritance between classes. It links the prototype chain so that `SubClass.prototype.__proto__ === SuperClass.prototype` (for instance methods) and `SubClass.__proto__ === SuperClass` (for static methods).
- **Task 2 Q2: Why must `super()` be called before using `this`?**  
  *Answer:* In JavaScript derived classes, the subclass constructor does not initialize the instance's `this` binding. Instead, the parent constructor allocates and initializes the instance object. Calling `super()` invokes the parent constructor, which binds `this` in the subclass context. Accessing `this` before calling `super()` results in a runtime `ReferenceError`.
- **Task 2 Q3: Are ES6 classes completely different from prototype-based inheritance?**  
  *Answer:* No. ES6 classes are syntactical sugar built directly on top of JavaScript's existing prototype-based inheritance system. Behind the scenes, classes are constructor functions with prototype objects and prototype chaining.

---

### Part B — Higher-Order Functions, Map, Set & Object Methods
**Location:** [`part-b-array-methods/shopping-cart.js`](file:///c:/Users/Admin/Desktop/quickcart-advanced-javascript/part-b-array-methods/shopping-cart.js)

#### Tasks Implemented:
1. **Task 1 — Array Methods on `cart`:**
   - `map()`: Extracted product names and calculated item totals (`price * quantity`).
   - `filter()`: Filtered items with unit price `> 2000`.
   - `reduce()`: Accumulated total cart value (₹70,100).
   - `forEach()`: Logged individual item details (`name`, `category`, `quantity`).
   - `combined`: Chained `filter(category === "Electronics")` and `reduce()` to calculate total Electronics value (₹62,000).
2. **Task 2 — Map and Set:**
   - Created `inventory` using `new Map()`: fetched product 101, updated its stock to 15, deleted product 102, and iterated through all key-value entries.
   - Used `new Set()` to deduplicate the email list down from 5 entries to 3 unique emails (`rahul@gmail.com`, `priya@gmail.com`, `arjun@gmail.com`).
3. **Task 3 — Object.freeze() vs Object.seal():**
   - Applied `Object.freeze()`: blocked property value modification, blocked property addition, and blocked property deletion.
   - Applied `Object.seal()`: allowed existing property value mutation, but blocked property addition and deletion.

#### Conceptual Questions & Answers:
- **Task 1 Q1: What is the difference between `map()` and `forEach()`?**  
  *Answer:* `map()` transforms each element by executing a callback and returns a brand-new array containing the transformed values. `forEach()` merely iterates over elements to perform side effects and always returns `undefined`.
- **Task 1 Q2: Does `filter()` change the original array?**  
  *Answer:* No. `filter()` is a non-mutating (pure) method that returns a shallow copy containing only the elements that satisfy the predicate callback. The original array remains untouched.
- **Task 1 Q3: Why is `reduce()` useful for totals?**  
  *Answer:* `reduce()` takes a collection and progressively collapses it into a single accumulated value (such as a sum, average, grouped hash, or object) by carrying an accumulator state across every iteration.
- **Task 1 Q4: Which method returns a new transformed array?**  
  *Answer:* `map()`.
- **Task 2 Q1: How is Map different from a plain object?**  
  *Answer:* 
  1. **Key Types:** A `Map` allows keys of any data type (objects, functions, primitives), whereas object keys are restricted to Strings and Symbols.
  2. **Iteration & Size:** `Map` maintains insertion order and has an instant `.size` property, whereas plain objects require `Object.keys(obj).length`.
  3. **Prototype Pollution:** A plain object inherits properties from `Object.prototype` (unless created with `Object.create(null)`), while a `Map` is a clean container without default keys.
- **Task 2 Q2: Why is Set good for removing duplicates?**  
  *Answer:* A `Set` enforces uniqueness of values using SameValueZero equality. Passing an array into `new Set(array)` automatically discards duplicate entries in $O(N)$ time.
- **Task 2 Q3: Can a Map use an object as a key?**  
  *Answer:* Yes. Object references can be used directly as keys. The key lookup relies on reference identity.
- **Task 2 Q4: Does Set keep insertion order?**  
  *Answer:* Yes. A `Set` guarantees insertion-order iteration when accessed with `forEach`, `for...of`, or the spread operator `[...]`.
- **Task 3 Q1: What is the difference between `freeze()` and `seal()`?**  
  *Answer:* `Object.freeze()` produces total immutability: properties cannot be added, deleted, or re-assigned (`writable: false`, `configurable: false`). `Object.seal()` prevents adding or deleting properties (`configurable: false`), but permits re-assigning values of existing writable properties.
- **Task 3 Q2: Can a property be changed after `seal()`?**  
  *Answer:* Yes, existing property values can be updated after `seal()` as long as their descriptor had `writable: true`.
- **Task 3 Q3: Are nested objects frozen automatically?**  
  *Answer:* No. `Object.freeze()` is shallow. Nested objects remain mutable unless deeply frozen recursively.
- **Task 3 Q4: What is shallow freezing?**  
  *Answer:* Shallow freezing applies only to direct, immediate properties of the target object. If any property holds a reference to an object or array, the internal properties of that nested object are not frozen.

---

### Part C — JSON Handling & Output-Based Debugging
**Location:** [`part-c-json-debugging/json-handling.js`](file:///c:/Users/Admin/Desktop/quickcart-advanced-javascript/part-c-json-debugging/json-handling.js)

#### Tasks Implemented:
1. **Task 1 — JSON Serialization & Parsing:**
   - Serialized `order` containing `{ orderId: 501, customer: "Rahul", amount: 5000, deliveryDate: undefined, discount: null, calculateTax() { return 500; } }`.
   - Identified lost properties: `deliveryDate` (omitted because its value is `undefined`) and `calculateTax` (omitted because its value is a function). `discount: null` is preserved.
2. **Task 2 — Output & Error Predictions:**
   - **Q1:** `JSON.stringify({ name: "Rahul", age: undefined })`  
     *Result:* `'{"name":"Rahul"}'`  
     *Explanation:* Object properties with `undefined` values are omitted during serialization.
   - **Q2:** `JSON.stringify([10, undefined, 30])`  
     *Result:* `'[10,null,30]'`  
     *Explanation:* In arrays, elements are positional; omitting an element would change subsequent indices. Hence, `undefined` becomes `null`.
   - **Q3:** `JSON.stringify({ price: NaN, discount: Infinity })`  
     *Result:* `'{"price":null,"discount":null}'`  
     *Explanation:* `NaN` and `Infinity` are not valid JSON numbers per RFC 8259, so `JSON.stringify()` converts them to `null`.
   - **Q4:** `JSON.parse("{name: 'Rahul', age: 25}")`  
     *Result:* `SyntaxError: Expected property name or '}' in JSON`  
     *Explanation:* Valid JSON mandates double quotes (`"`) around keys and string values. Single quotes and unquoted keys trigger a syntax error.
   - **Q5:** Circular reference: `const user = { name: "Rahul" }; user.self = user; JSON.stringify(user);`  
     *Result:* `TypeError: Converting circular structure to JSON`  
     *Explanation:* Circular references cause infinite recursion; the JSON serializer detects self-references and throws a `TypeError`.
   - **Q6:** `JSON.stringify({ createdAt: new Date("2026-01-01") })`  
     *Result:* `'{"createdAt":"2026-01-01T00:00:00.000Z"}'`  
     *Explanation:* `Date.prototype.toJSON()` is invoked, returning an ISO-8601 formatted string.

---

### Part D — Asynchronous JavaScript & Promises
**Location:** [`part-d-asynchronous/order-processing.js`](file:///c:/Users/Admin/Desktop/quickcart-advanced-javascript/part-d-asynchronous/order-processing.js)

#### Tasks Implemented:
1. **Task 1 — Event Loop Prediction:**
   Demonstrated the execution order of synchronous code vs microtasks vs macrotasks:
   ```
   1. Order Started          (Synchronous call stack)
   2. Order Completed        (Synchronous call stack)
   3. Payment Successful     (Microtask queue from Promise.then)
   4. Payment Processing     (Macrotask queue from setTimeout)
   ```
2. **Task 2 — Callbacks:**
   Implemented `validateOrder(cb)`, `processPayment(cb)`, and `sendConfirmation(cb)` with 1-second delays chained in sequence.
3. **Task 3 — Promises:**
   Rewrote steps as `validateOrderPromise()`, `processPaymentPromise()`, and `sendConfirmationPromise()`, chained cleanly using `.then()` with centralized `.catch()` error handling.
4. **Task 4 — Async/Await:**
   Implemented `async function placeOrder()` using `await` inside a `try/catch` block, testing both successful execution and simulated payment failure.
5. **Task 5 — Promise Combinators:**
   Tested with `productsAPI()` (resolves 1000ms), `paymentAPI()` (rejects 1500ms), and `deliveryAPI()` (resolves 2000ms):
   - `Promise.all()`: Rejects fast with `"Payment Service Failed"` at 1500ms.
   - `Promise.allSettled()`: Waits for all 3 promises and returns status descriptors for each.
   - `Promise.race()`: Returns `"Products Loaded"` as the first settled promise (1000ms).
   - `Promise.any()`: Returns `"Products Loaded"` as the first fulfilled promise (1000ms).

#### Conceptual Questions & Answers:
- **Task 1 Q1: Why does the Promise callback run before `setTimeout()`?**  
  *Answer:* Promise `.then()` callbacks are enqueued into the **Microtask Queue**, while `setTimeout` callbacks go into the **Macrotask Queue**. The Event Loop prioritizes the microtask queue, draining all pending microtasks before processing the next macrotask.
- **Task 1 Q2: What are the microtask and macrotask queues?**  
  *Answer:* The Microtask Queue handles high-priority tasks (Promises, `queueMicrotask`, `MutationObserver`). The Macrotask Queue handles lower-priority scheduled events (`setTimeout`, `setInterval`, I/O, UI render tasks).
- **Task 1 Q3: What role does the call stack play?**  
  *Answer:* The Call Stack is the synchronous LIFO execution engine in the JavaScript V8 engine. Asynchronous callbacks cannot run until the call stack is completely clear.
- **Task 1 Q4: What does the event loop do?**  
  *Answer:* It constantly monitors the call stack. When empty, it flushes the Microtask Queue, and then pulls the oldest callback from the Macrotask Queue to the call stack.
- **Task 2: Why are deeply nested callbacks (callback hell) hard to maintain?**  
  *Answer:* Callback hell leads to: (1) Pyramid of doom indentation, (2) decentralized and repetitive error handling, (3) inversion of control, and (4) high fragility when reordering or chaining steps.
- **Task 5 Q1: What is the difference between `all()` and `allSettled()`?**  
  *Answer:* `Promise.all()` is all-or-nothing (rejects immediately upon the first failure). `Promise.allSettled()` never short-circuits and always awaits all promises to finish, returning an array of `{ status, value/reason }` objects.
- **Task 5 Q2: Does `race()` wait for success or just the first settled result?**  
  *Answer:* `Promise.race()` does not wait for success; it settles on the very first promise that completes, whether fulfilled or rejected.
- **Task 5 Q3: How is `any()` different from `race()`?**  
  *Answer:* `Promise.any()` specifically seeks the first *fulfilled* promise, ignoring rejections until all reject. `Promise.race()` settles on the first settlement regardless of outcome.
- **Task 5 Q4: What happens when every Promise in `any()` rejects?**  
  *Answer:* `Promise.any()` rejects with an `AggregateError` grouping all rejection reasons into an `.errors` array.

---

### Part E — Performance Optimization & DOM Events
**Location:** [`part-e-optimization-events/`](file:///c:/Users/Admin/Desktop/quickcart-advanced-javascript/part-e-optimization-events/)

#### Tasks Implemented:
1. **Task 1 — Debouncing:**
   - Implemented `debounce(callback, delay)` with `setTimeout` and `clearTimeout`.
   - Connected to live catalog search input with a 500ms delay.
   - Keystrokes accumulate on every press, but the query executes only after 500ms of user typing inactivity.
2. **Task 2 — Throttling:**
   - Implemented `throttle(callback, delay)` with a 1000ms execution cap.
   - Attached to the scroll container `#scroll-box`.
   - Rapid scrolling fires 50+ raw events, but the callback executes at most once per second.
3. **Task 3 — Memoization:**
   - Created pure `calculateDiscount(price, percentage)`.
   - Wrapped with `memoize(fn)` using a closure-scoped `Map` cache.
   - Tested cache hits (instant retrieval, 0ms compute) vs cache misses (fresh calculation).
4. **Task 4 — Event Bubbling & Delegation:**
   - Rendered 3 dynamic products with "Remove" buttons.
   - Implemented interactive toggle for `event.stopPropagation()` to demonstrate bubbling to parent container vs stopping propagation.
   - Attached a single delegated click listener to the parent `#product-list-container`, using `event.target.closest(".btn-remove")` to detect and remove elements.
   - Provided "Reset Products" to demonstrate that dynamically recreated items immediately inherit the parent listener without re-attaching event listeners.

#### Conceptual Questions & Answers:
- **Q1: What is the difference between debouncing and throttling?**  
  *Answer:* Debouncing postpones function execution until a quiet period of $N$ milliseconds has elapsed since the last event. Throttling regulates execution to at most once every $N$ milliseconds over a continuous duration of events.
- **Q2: Which suits search suggestions?**  
  *Answer:* **Debouncing**, because search calls should only execute after the user pauses typing, preventing dozens of wasteful API requests.
- **Q3: Which suits scroll and resize events?**  
  *Answer:* **Throttling**, because scrolling and viewport resizing require periodic, steady updates to maintain smooth visual performance.
- **Q4: What is memoization?**  
  *Answer:* An optimization technique that caches the return values of expensive, deterministic function invocations based on their input arguments.
- **Q5: How does it improve performance?**  
  *Answer:* It converts computationally expensive repetitive operations into $O(1)$ constant-time memory lookups.
- **Q6: What role do closures play in memoization?**  
  *Answer:* Closures encapsulate a private, persistent cache structure (like a `Map`) within the higher-order wrapper’s lexical scope, retaining cached results across calls without polluting global state.
- **Q7: What is event bubbling?**  
  *Answer:* The propagation phase where an event triggered on a child node travels upward through its parent and ancestor DOM tree.
- **Q8: What is event delegation?**  
  *Answer:* A design pattern where a single event listener is placed on a shared ancestor to manage events for multiple current and future child elements.
- **Q9: Why is delegation useful for dynamically created elements?**  
  *Answer:* Newly added elements automatically work with the existing parent listener without needing individual listeners attached during DOM manipulation.
- **Q10: What does `event.stopPropagation()` do?**  
  *Answer:* It immediately halts the event from traveling further up or down the DOM hierarchy.
- **Q11: What is the difference between `event.target` and `event.currentTarget`?**  
  *Answer:* `event.target` is the innermost element that initiated the event (e.g. the `<button>`). `event.currentTarget` is the element where the event listener was explicitly attached (e.g. the parent `<div>`).

---

### Part F — Final Real-Time Integration Challenge
**Location:** [`part-f-integration/quickcart.js`](file:///c:/Users/Admin/Desktop/quickcart-advanced-javascript/part-f-integration/quickcart.js)

#### Comprehensive Architecture:
The script orchestrates all concepts from Parts A–E into a production-grade checkout pipeline:
1. **ES6 `Product` Class:** Models product instances with `getItemTotal()` and `getFormattedLine()`.
2. **Destructuring:** Used across array mapping, configuration extraction, and method parameters.
3. **`map()`:** Transforms items into formatted lines and calculated totals.
4. **`filter()`:** Isolates high-value products above ₹5,000.
5. **`reduce()`:** Calculates grand order amount (₹69,000).
6. **`Set`:** Computes unique product count (4 unique products).
7. **`Map`:** Maintains live inventory tracking and availability lookup.
8. **`Object.freeze()`:** Protects the order configuration object from mutation.
9. **`JSON.stringify()`:** Serializes the complete order summary.
10. **`async/await` with `try/catch`:** Manages simulated asynchronous inventory validation and confirmation.
11. **Template Literal:** Generates the exact expected order summary output.

#### Exact Computed Output:
```
====== QUICKCART ORDER SUMMARY ======
Customer: Rahul
Products:
Laptop   - ₹50000
Mouse    - ₹2000
Monitor  - ₹15000
Keyboard - ₹2000
Total Order Amount: ₹69000
Unique Products: 4
Order Status: Processing...
Order Status: Confirmed Successfully!
=====================================
```

---

## 🎨 DOM Optimization Visual Guide & UI Preview

Part E includes a dedicated, responsive dashboard featuring:
1. **Debounced Search Module:**
   - Real-time keystroke counter vs debounced API call counter.
   - Dynamic query execution badge indicating active wait states.
2. **Throttled Activity Monitor:**
   - Interactive high-frequency scroll container.
   - Live visual indicator comparing raw scroll fires against regulated 1,000ms executions.
3. **Memoized Discount Calculator:**
   - Live price and percentage inputs.
   - Instant calculation badges showing **"⚡ Fresh Computation"** vs **"💾 Cache Hit (0ms)"**.
4. **Bubbling & Event Delegation Playground:**
   - Dynamic product list with remove buttons.
   - Interactive `event.stopPropagation()` toggle switch.
   - Live activity terminal logging event paths, `event.target`, and `event.currentTarget`.

```
+-----------------------------------------------------------------------------------+
|               QUICKCART OPTIMIZATION & DOM EVENTS DIAGNOSTIC CONSOLE              |
+---------------------------------------------------+-------------------------------+
| TASK 1: SEARCH DEBOUNCING (500ms)                 | TASK 2: SCROLL THROTTLING (1s)|
| [Input: "laptop"]                                 | [Scrollable Order Stream]     |
| Keystrokes: 18  |  Debounced API Calls: 2         | Raw Scrolls: 94 | Throttled: 3|
+---------------------------------------------------+-------------------------------+
| TASK 3: DISCOUNT MEMOIZATION                      | TASK 4: BUBBLING & DELEGATION |
| [Price: 50000] [Discount: 10%]                    | [x] Enable stopPropagation    |
| Status: CACHE HIT (Retrieved in 0ms)              | Parent: #product-list-container|
| Fresh Calcs: 1  |  Cache Hits: 3                  | [MacBook Pro M3]   [Remove]   |
+---------------------------------------------------+-------------------------------+
| LIVE EVENT TERMINAL:                                                              |
| [10:45:00] CHILD CLICK: <BUTTON> "Apple MacBook Pro M3". StopPropagation: false  |
| [10:45:00] PARENT HEARD: Target <BUTTON> -> Removed item via delegation!          |
+-----------------------------------------------------------------------------------+
```

---

## ✅ Coding Standards Compliance Checklist

- [x] **Strict ES6+ Syntax:** Exclusively uses modern arrow functions, classes, template literals, destructuring, and spread/rest operators.
- [x] **Variables:** `const` used by default; `let` used strictly when variables require reassignment; zero instances of `var`.
- [x] **Strict Equality:** Exclusively uses `===` and `!==`.
- [x] **No External Libraries:** Zero dependencies installed or imported.
- [x] **Clean Global Scope:** All scripts encapsulate logic without polluting the global object.
- [x] **Error Handling:** Robust `try...catch` blocks and `.catch()` handlers present in asynchronous and JSON parsing tasks.
- [x] **Error-Free Execution:** Verified that all scripts run to completion without runtime errors or uncaught exceptions.

---

## 📬 Submission Details

- **Public GitHub Repository URL:** `https://github.com/QuickCart/quickcart-advanced-javascript` *(or your submitted GitHub repo link)*
- **Loom Walkthrough Video Link:** `https://www.loom.com/share/quickcart-advanced-javascript-walkthrough` *(or your recorded Loom link)*
- **Live Deployment Link:** `N.A` (As instructed in the assessment guidelines)
