/**
 * Part D — Asynchronous JavaScript & Promises
 * QuickCart Order Management System
 */

console.log("==================================================");
console.log("PART D: ASYNCHRONOUS JAVASCRIPT & PROMISES");
console.log("==================================================\n");

// Helper delay utility for clean sequencing
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// ==========================================
// Task 1 — Event loop
// ==========================================
function runTask1() {
  console.log("--- Task 1: Event Loop Demonstration ---\n");
  console.log("Predicted Execution Order:");
  console.log("1. Order Started");
  console.log("2. Order Completed");
  console.log("3. Payment Successful");
  console.log("4. Payment Processing");
  console.log("\nExecuting Code Snippet Now:\n");

  console.log("Order Started");
  setTimeout(() => console.log("Payment Processing"), 0);
  Promise.resolve().then(() => console.log("Payment Successful"));
  console.log("Order Completed");

  console.log("\n[Task 1 Conceptual Answers]");
  console.log("Q1: Why does the Promise callback run before setTimeout()?");
  console.log(
    "A1: Promise .then() callbacks are placed in the Microtask Queue, while setTimeout callbacks are placed in the Macrotask (Callback/Task) Queue. The Event Loop prioritizes and drains the entire Microtask Queue before executing the next macrotask from the Macrotask Queue."
  );

  console.log("\nQ2: What are the microtask and macrotask queues?");
  console.log(
    "A2: - Microtask Queue: Higher-priority queue handling Promise reactions (.then/.catch/.finally), queueMicrotask(), and MutationObserver callbacks.\n" +
    "    - Macrotask Queue: Standard priority queue handling timers (setTimeout, setInterval), I/O events, and UI rendering tasks."
  );

  console.log("\nQ3: What role does the call stack play?");
  console.log(
    "A3: The Call Stack is a LIFO (Last In, First Out) data structure that tracks active function execution frames. JavaScript is single-threaded; code on the call stack executes synchronously to completion before any queued asynchronous callbacks can run."
  );

  console.log("\nQ4: What does the event loop do?");
  console.log(
    "A4: The Event Loop is a continuous monitoring mechanism that coordinates execution between the Call Stack and task queues. When the Call Stack is empty, it checks the Microtask Queue and runs all microtasks. Once the microtask queue is empty, it dequeues and executes the oldest available macrotask."
  );
}

// ==========================================
// Task 2 — Callbacks
// ==========================================
function validateOrder(cb) {
  setTimeout(() => {
    console.log("Order Validated");
    if (cb) cb();
  }, 1000);
}

function processPayment(cb) {
  setTimeout(() => {
    console.log("Payment Completed");
    if (cb) cb();
  }, 1000);
}

function sendConfirmation(cb) {
  setTimeout(() => {
    console.log("Confirmation Sent");
    if (cb) cb();
  }, 1000);
}

function runTask2CallbackSequence() {
  return new Promise(resolve => {
    console.log("\n--- Task 2: Callbacks (Sequential Flow) ---\n");
    console.log("Starting nested callback flow...");

    validateOrder(() => {
      processPayment(() => {
        sendConfirmation(() => {
          console.log("\nAll callback steps completed.");
          console.log("\n[Why deeply nested callbacks (callback hell) are hard to maintain]");
          console.log(
            "Explanation: Callback hell (the Pyramid of Doom) creates high cognitive load and architectural issues:\n" +
            "1. Deep Indentation: Code shifts rapidly to the right, impairing readability.\n" +
            "2. Complex Error Handling: Every individual callback must separately check and handle errors; errors cannot naturally bubble.\n" +
            "3. Inversion of Control: You surrender execution control to third-party callbacks, which may be called zero times, multiple times, or unexpectedly synchronously.\n" +
            "4. Fragile Refactoring: Reordering, adding, or running tasks in parallel is extremely tedious and error-prone."
          );
          resolve();
        });
      });
    });
  });
}

// ==========================================
// Task 3 — Promises
// ==========================================
function validateOrderPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Order Validated (Promise)");
      resolve("Order validation successful");
    }, 1000);
  });
}

function processPaymentPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Payment Completed (Promise)");
      resolve("Payment of ₹69,000 processed");
    }, 1000);
  });
}

function sendConfirmationPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Confirmation Sent (Promise)");
      resolve("Confirmation email dispatched to customer");
    }, 1000);
  });
}

function runTask3PromiseChain() {
  console.log("\n--- Task 3: Promises (Chaining with .then() & .catch()) ---\n");
  console.log("Starting Promise chain...");

  return validateOrderPromise()
    .then(valMsg => {
      console.log(` -> Step 1 Result: ${valMsg}`);
      return processPaymentPromise();
    })
    .then(payMsg => {
      console.log(` -> Step 2 Result: ${payMsg}`);
      return sendConfirmationPromise();
    })
    .then(confMsg => {
      console.log(` -> Step 3 Result: ${confMsg}`);
      console.log("Promise chain successfully finalized!");
    })
    .catch(error => {
      console.error("Promise Chain Encountered an Error:", error);
    });
}

// ==========================================
// Task 4 — Async/await
// ==========================================
async function placeOrder(shouldSimulateFailure = false) {
  console.log(`Starting placeOrder() [simulateFailure: ${shouldSimulateFailure}]...`);
  try {
    const valResult = await validateOrderPromise();
    console.log(`  Await received: ${valResult}`);

    if (shouldSimulateFailure) {
      throw new Error("Card declined during authorization");
    }

    const payResult = await processPaymentPromise();
    console.log(`  Await received: ${payResult}`);

    const confResult = await sendConfirmationPromise();
    console.log(`  Await received: ${confResult}`);

    console.log(">> SUCCESS: Order placed and verified successfully via async/await!");
    return { status: "SUCCESS", message: "Order processed without issues" };
  } catch (error) {
    console.error(`>> FAILURE: Order processing aborted! Reason: ${error.message}`);
    return { status: "FAILED", error: error.message };
  }
}

async function runTask4AsyncAwait() {
  console.log("\n--- Task 4: Async/await with try/catch ---\n");

  console.log("[Test 4.1] Successful Order Flow:");
  await placeOrder(false);

  console.log("\n[Test 4.2] Failure Handling Flow:");
  await placeOrder(true);
}

// ==========================================
// Task 5 — Promise combinators
// ==========================================
const productsAPI = () =>
  new Promise(resolve => setTimeout(() => resolve("Products Loaded"), 1000));

const paymentAPI = () =>
  new Promise((_, reject) => setTimeout(() => reject("Payment Service Failed"), 1500));

const deliveryAPI = () =>
  new Promise(resolve => setTimeout(() => resolve("Delivery Loaded"), 2000));

async function runTask5Combinators() {
  console.log("\n--- Task 5: Promise Combinators ---\n");

  // 1. Promise.all()
  console.log("1. Running Promise.all([productsAPI(), paymentAPI(), deliveryAPI()]):");
  try {
    const allResults = await Promise.all([productsAPI(), paymentAPI(), deliveryAPI()]);
    console.log("Promise.all() resolved with:", allResults);
  } catch (err) {
    console.log("Promise.all() rejected as expected:", err);
  }

  // 2. Promise.allSettled()
  console.log("\n2. Running Promise.allSettled([productsAPI(), paymentAPI(), deliveryAPI()]):");
  const settledResults = await Promise.allSettled([productsAPI(), paymentAPI(), deliveryAPI()]);
  console.log("Promise.allSettled() result:", settledResults);

  // 3. Promise.race()
  console.log("\n3. Running Promise.race([productsAPI(), paymentAPI(), deliveryAPI()]):");
  try {
    const raceWinner = await Promise.race([productsAPI(), paymentAPI(), deliveryAPI()]);
    console.log("Promise.race() settled with winner:", raceWinner);
  } catch (err) {
    console.log("Promise.race() rejected with:", err);
  }

  // 4. Promise.any()
  console.log("\n4. Running Promise.any([productsAPI(), paymentAPI(), deliveryAPI()]):");
  try {
    const anyWinner = await Promise.any([productsAPI(), paymentAPI(), deliveryAPI()]);
    console.log("Promise.any() resolved with first fulfilled:", anyWinner);
  } catch (err) {
    console.log("Promise.any() rejected with AggregateError:", err.errors);
  }

  console.log("\n[Task 5 Conceptual Answers]");
  console.log("Q1: What is the difference between all() and allSettled()?");
  console.log(
    "A1: Promise.all() rejects immediately (fail-fast) if any single promise rejects, discarding pending results. Promise.allSettled() always waits for all input promises to settle, returning an array of descriptor objects with { status: 'fulfilled', value } or { status: 'rejected', reason }."
  );

  console.log("\nQ2: Does race() wait for success or just the first settled result?");
  console.log(
    "A2: Promise.race() returns the very first promise that settles, whether that settlement is a fulfillment (success) or a rejection (error)."
  );

  console.log("\nQ3: How is any() different from race()?");
  console.log(
    "A3: Promise.any() ignores rejections until the first successful (fulfilled) promise resolves. Promise.race() settles on whichever promise finishes first, regardless of whether it succeeded or failed."
  );

  console.log("\nQ4: What happens when every Promise in any() rejects?");
  console.log(
    "A4: When every Promise in Promise.any() rejects, it rejects with an AggregateError containing an 'errors' array that lists each individual rejection reason."
  );
}

// Master execution orchestrator for clean asynchronous output
async function executeAll() {
  runTask1();
  // Allow microtasks and initial macrotasks from Task 1 to flush
  await sleep(100);

  await runTask2CallbackSequence();
  await runTask3PromiseChain();
  await runTask4AsyncAwait();
  await runTask5Combinators();

  console.log("\n==================================================");
  console.log("ALL PART D ASYNCHRONOUS TASKS COMPLETED SUCCESSFULLY!");
  console.log("==================================================");
}

executeAll();
