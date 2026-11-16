/**
 * Part A — Objects, Prototypes & ES6 Classes
 * QuickCart Order Management System
 */

console.log("==================================================");
console.log("PART A: OBJECTS, PROTOTYPES & ES6 CLASSES");
console.log("==================================================\n");

// ==========================================
// Task 1 — Prototype-based products
// ==========================================
console.log("--- Task 1: Prototype-based products ---\n");

/**
 * Product constructor function
 * @param {string} productName
 * @param {number} price
 * @param {string} category
 */
function Product(productName, price, category) {
  this.productName = productName;
  this.price = price;
  this.category = category;
}

// Adding displayProduct method to the prototype
Product.prototype.displayProduct = function () {
  return `Product: ${this.productName} | Category: ${this.category} | Price: ₹${this.price}`;
};

// Creating three product instances
const product1 = new Product("Ergonomic Chair", 8500, "Furniture");
const product2 = new Product("Mechanical Keyboard", 3500, "Accessories");
const product3 = new Product("Noise Cancelling Headphones", 12000, "Electronics");

console.log(product1.displayProduct());
console.log(product2.displayProduct());
console.log(product3.displayProduct());

console.log("\n[Task 1 Conceptual Answers]");
console.log("Q1: Why add displayProduct() to the prototype instead of the constructor?");
console.log(
  "A1: Adding methods to the prototype ensures that all instances share a single function reference in memory. If defined inside the constructor, every instance creates a new copy of the method, wasting memory."
);

console.log("\nQ2: What is the difference between __proto__ and prototype?");
console.log(
  "A2: 'prototype' is a property on constructor functions used to build '__proto__' on new instances. '__proto__' (or Object.getPrototypeOf) is the internal reference on an object pointing to the prototype object from which it inherits properties."
);

console.log("\nQ3: What happens when JavaScript cannot find a property on an object?");
console.log(
  "A3: JavaScript traverses up the prototype chain via __proto__. If the property is not found on any prototype up to Object.prototype (whose prototype is null), it evaluates to undefined (or throws a ReferenceError if accessed as an undeclared variable)."
);

// ==========================================
// Task 2 — ES6 classes
// ==========================================
console.log("\n--- Task 2: ES6 classes ---\n");

class ProductClass {
  constructor(productName, price, category) {
    this.productName = productName;
    this.price = price;
    this.category = category;
  }

  getProductDetails() {
    return `${this.productName} [${this.category}] - ₹${this.price}`;
  }
}

class ElectronicProduct extends ProductClass {
  constructor(productName, price, category, warrantyPeriodMonths) {
    super(productName, price, category);
    this.warrantyPeriodMonths = warrantyPeriodMonths;
  }

  getWarrantyDetails() {
    return `${this.productName} includes a ${this.warrantyPeriodMonths}-month official manufacturer warranty.`;
  }
}

class ClothingProduct extends ProductClass {
  constructor(productName, price, category, size, material) {
    super(productName, price, category);
    this.size = size;
    this.material = material;
  }

  getSizeGuide() {
    return `${this.productName} is Size: ${this.size}, crafted from 100% premium ${this.material}.`;
  }
}

const laptop = new ElectronicProduct("Dell XPS 15", 135000, "Electronics", 24);
const jacket = new ClothingProduct("All-Weather Bomber Jacket", 4500, "Apparel", "L", "Polyester Blend");

console.log(laptop.getProductDetails());
console.log(laptop.getWarrantyDetails());
console.log(jacket.getProductDetails());
console.log(jacket.getSizeGuide());

console.log("\n[Task 2 Conceptual Answers]");
console.log("Q1: What is the purpose of extends?");
console.log(
  "A1: 'extends' sets up prototypal inheritance between classes, creating a prototype chain where ChildClass.prototype inherits from ParentClass.prototype, and ChildClass inherits static methods from ParentClass."
);

console.log("\nQ2: Why must super() be called before using this?");
console.log(
  "A2: In derived classes, the derived constructor does not bind 'this' itself. Instead, the parent constructor creates and initializes the instance object. Calling super() invokes the parent constructor and binds 'this' to the child instance. Accessing 'this' before super() throws a ReferenceError."
);

console.log("\nQ3: Are ES6 classes completely different from prototype-based inheritance?");
console.log(
  "A3: No. ES6 classes are syntactical sugar over JavaScript's existing prototype-based inheritance model. Under the hood, classes still use constructor functions and prototype chaining."
);

// ==========================================
// Task 3 — ES6 syntax in checkout
// ==========================================
console.log("\n--- Task 3: ES6 syntax in checkout ---\n");

// (A) Arrow function for final price after discount
const calculateDiscountedPrice = (price, discountPercent) =>
  price - price * (discountPercent / 100);

const originalPrice = 50000;
const discountRate = 10;
const finalDiscounted = calculateDiscountedPrice(originalPrice, discountRate);
console.log(`(A) Discounted Price (₹${originalPrice} with ${discountRate}% off): ₹${finalDiscounted}`);

// (B) Template literal
const customerName = "Rahul";
const orderedItem = "Laptop";
const totalAmount = 50000;
const orderConfirmationMessage = `Hello ${customerName}, your order of ${orderedItem} is confirmed. Total: ₹${totalAmount}.`;
console.log(`(B) Template Literal Output:\n${orderConfirmationMessage}`);

// (C) Destructure name and email from customer
const customer = {
  name: "Rahul",
  email: "rahul@gmail.com",
  city: "Mumbai"
};
const { name: customerDestructuredName, email: customerDestructuredEmail } = customer;
console.log(`(C) Destructured Customer: Name = ${customerDestructuredName}, Email = ${customerDestructuredEmail}`);

// (D) calculateTotal(...prices) using rest operator
const calculateTotal = (...prices) =>
  prices.reduce((accumulator, currentPrice) => accumulator + currentPrice, 0);

const cartTotal = calculateTotal(50000, 800, 1500, 12000, 2500);
console.log(`(D) Total using Rest operator: ₹${cartTotal}`);

// (E) Spread operator to copy a product with a new price without mutating original
const originalProduct = {
  id: 101,
  name: "Laptop",
  price: 50000,
  category: "Electronics"
};

const updatedProduct = {
  ...originalProduct,
  price: 47500
};

console.log("(E) Original Product (immutable check):", originalProduct);
console.log("(E) Copied Product with New Price:", updatedProduct);
console.log(`Original price unchanged: ${originalProduct.price === 50000}`);
