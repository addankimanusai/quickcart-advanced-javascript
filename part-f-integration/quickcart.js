/**
 * Part F — Final Real-Time Integration Challenge
 * QuickCart Order Management System
 */

// ==========================================
// 1. Product Class Definition (Part A Concept)
// ==========================================
class Product {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  // Method to calculate line item total
  getItemTotal() {
    return this.price * this.quantity;
  }

  // Method for formatted display
  getFormattedLine(currency = "₹") {
    const total = this.getItemTotal();
    return `${this.name.padEnd(8, " ")} - ${currency}${total}`;
  }
}

// ==========================================
// 2. Raw Products Data Setup
// ==========================================
const rawProductsData = [
  { id: 1, name: "Laptop", price: 50000, qty: 1 },
  { id: 2, name: "Mouse", price: 1000, qty: 2 },
  { id: 3, name: "Monitor", price: 15000, qty: 1 },
  { id: 4, name: "Keyboard", price: 2000, qty: 1 }
];

// Instantiate Product class instances using map & destructuring
const products = rawProductsData.map(({ id, name, price, qty }) => {
  return new Product(id, name, price, qty);
});

// ==========================================
// 3. Immutable Order Configuration Object.freeze() (Part B Concept)
// ==========================================
const orderConfig = Object.freeze({
  customerName: "Rahul",
  customerEmail: "rahul@gmail.com",
  currency: "₹",
  highValueThreshold: 5000,
  orderStatus: {
    processing: "Order Status: Processing...",
    confirmed: "Order Status: Confirmed Successfully!"
  }
});

// Destructuring values from orderConfig (Part A Concept)
const {
  customerName,
  currency,
  highValueThreshold,
  orderStatus: { processing: statusProcessing, confirmed: statusConfirmed }
} = orderConfig;

// ==========================================
// 4. Map & Set Implementations (Part B Concept)
// ==========================================
// (A) Set of unique product IDs
const uniqueProductIds = new Set(products.map(({ id }) => id));
const uniqueProductCount = uniqueProductIds.size;

// (B) Map for inventory storage
const inventory = new Map();
products.forEach(product => {
  const { id, name, price, quantity } = product;
  inventory.set(id, {
    name,
    unitPrice: price,
    reservedStock: quantity,
    inStock: true
  });
});

// ==========================================
// 5. Higher-Order Array Methods (Part B Concept)
// ==========================================
// map() for product line totals
const productTotals = products.map(product => ({
  name: product.name,
  total: product.getItemTotal(),
  formatted: product.getFormattedLine(currency)
}));

// filter() for products over ₹5,000
const highValueProducts = products.filter(
  ({ price }) => price > highValueThreshold
);

// reduce() for grand order total
const totalOrderAmount = products.reduce(
  (accumulator, product) => accumulator + product.getItemTotal(),
  0
);

// ==========================================
// 6. JSON Serialization (Part C Concept)
// ==========================================
const orderPayload = {
  orderId: "QC-" + Date.now(),
  customer: customerName,
  items: products.map(({ id, name, price, quantity }) => ({
    id,
    name,
    unitPrice: price,
    quantity,
    itemTotal: price * quantity
  })),
  totalAmount: totalOrderAmount,
  uniqueItemCount: uniqueProductCount,
  createdAt: new Date().toISOString()
};

// JSON.stringify() to serialize order data
const serializedOrderJson = JSON.stringify(orderPayload, null, 2);

// ==========================================
// 7. Async/Await Order Confirmation (Part D Concept)
// ==========================================
const verifyInventoryAsync = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validate inventory from Map
      const allAvailable = products.every(prod => inventory.has(prod.id));
      if (allAvailable) {
        resolve("Inventory confirmed in stock.");
      } else {
        reject(new Error("Inventory stock verification failed."));
      }
    }, 400);
  });

async function processQuickCartOrder() {
  try {
    // Simulated async inventory verification
    await verifyInventoryAsync();

    // Template literal for final order summary output (Part A & F Concept)
    const formattedSummary =
`====== QUICKCART ORDER SUMMARY ======
Customer: ${customerName}
Products:
${productTotals.map(item => item.formatted).join("\n")}
Total Order Amount: ${currency}${totalOrderAmount}
Unique Products: ${uniqueProductCount}
${statusProcessing}
${statusConfirmed}
=====================================`;

    // Output the computed summary
    console.log(formattedSummary);

    return {
      success: true,
      summary: formattedSummary,
      highValueItems: highValueProducts,
      serializedJson: serializedOrderJson
    };
  } catch (error) {
    console.error("Order Confirmation Error:", error.message);
    return { success: false, error: error.message };
  }
}

// Execute the order processing flow
processQuickCartOrder();
