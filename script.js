import {
  getStatus,
  startEngine,
  adjustMatter,
  adjustAntimatter,
  authorizationCode,
} from "./functions.js";

const startBtn = document.querySelector(".start");

await startEngine();
await getStatus();
await getStatus();
await getStatus();
await adjustMatter();
await getStatus();

// Main function that runs for at least a minute
// async function runEngine() {
//   const startTime = new Date().getTime();
//   let elapsedTime = 0;

//   while (elapsedTime < 10000) {
//     ///60000 here when the code works
//     const { intermix, flowRate } = await getStatus();
//     console.log(intermix, flowRate);
//     adjustAntimatter(0.1);
//     adjustMatter(-0.1);
//     // Adjustments based on the current status
//     // if (intermix <= 0.5) {
//     //   await adjustMatter(0.1);
//     // }

//     //console.log(`Status: intermix=${intermix}, flowRate=${flowRate}`);

//     // Calculate elapsed time
//     const currentTime = new Date().getTime();
//     elapsedTime = currentTime - startTime;
//   }
// }

// startBtn.addEventListener("click", runEngine); // Start sim

// async function proov() {
//   try {
//     await startEngine();
//     await getStatus();
//     await getStatus();
//     await getStatus();
//     await getStatus();
//     await getStatus();
//     await adjustAntimatter(0.1);
//     await getStatus();
//     // ... continue with other functions
//   } catch (error) {
//     // Handle errors
//   }
// }

// proov();
