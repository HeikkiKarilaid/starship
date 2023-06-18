"use strict";
const codeField = document.querySelector(".message-container"); //HTML element selectors
const startBtn = document.querySelector(".start");
const engineRun = document.querySelector(".engine-run");

/// URL consts. I kept getting a CORS error from the API-s and couldn´t figure it out, so I cheated and added a proxy to the URLs.
const proxy = "http://localhost:8080/";
const startUrl = `${proxy}https://warp-regulator-bd7q33crqa-lz.a.run.app/api/start`;
const statusUrl = `${proxy}https://warp-regulator-bd7q33crqa-lz.a.run.app/api/status`;
const adjustMatterUrl = `${proxy}https://warp-regulator-bd7q33crqa-lz.a.run.app/api/adjust/matter`;
const adjustAntimatterUrl = `${proxy}https://warp-regulator-bd7q33crqa-lz.a.run.app/api/adjust/antimatter`;
let authorizationCode; //Global variable for authCode retrieved from start API

// Function to start the engine and retrieve the authorization code
async function startEngine() {
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify({
    name: "Heikki Karilaid",
    email: "heikki.karilaid.001@gmail.com",
  });
  const response = await fetch(startUrl, { method: "POST", headers, body });

  if (!response.ok) {
    throw new Error(`Failed to fetch data. Server returned ${response.status}`);
  }
  const data = await response.json();
  authorizationCode = data.authorizationCode;
  codeField.textContent = `${authorizationCode}`;
}

startEngine();

// Function to retrieve the status of the engine
let lastExecutionTime = 0;

async function getStatus() {
  const url = `${statusUrl}?authorizationCode=${authorizationCode}`;
  const response = await fetch(url);

  ///Delay for 1.2 seconds so not to call the API more than once n a second + a little spare time
  const currentTime = Date.now();
  if (currentTime - lastExecutionTime < 1200) {
    const delay = 1200 - (currentTime - lastExecutionTime);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  lastExecutionTime = Date.now();

  ///end of delay
  if (!response.ok) {
    engineRun.textContent += "Disaster!!";
    throw new Error(`Failed to fetch data. Server returned ${response.status}`);
  }

  const status = await response.json();

  //   console.log(
  //     `Status: intermix=${status.intermix}, flowRate=${status.flowRate}`
  //   );
  engineRun.textContent = `Flow Rate: ${status.flowRate} Intermix: ${status.intermix}`;

  return status;
}

// Function to adjust the matter injection
async function adjustMatter(amount) {
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify({
    authorizationCode: `${authorizationCode}`,
    value: `${amount}`,
  });
  const inject = await fetch(adjustMatterUrl, {
    method: "POST",
    headers,
    body,
  });

  //delay
  const currentTime = Date.now();
  if (currentTime - lastExecutionTime < 1200) {
    const delay = 1200 - (currentTime - lastExecutionTime);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  lastExecutionTime = Date.now();
  //end delay
  console.log("Injected matter");
  engineRun.textContent += "\n";
  engineRun.textContent += "\nInjected matter.";
}

// Function to adjust the antimatter injection
async function adjustAntimatter(amount) {
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify({
    authorizationCode: `${authorizationCode}`,
    value: `${amount}`,
  });
  const inject = await fetch(adjustAntimatterUrl, {
    method: "POST",
    headers,
    body,
  });

  ///delay
  const currentTime = Date.now();
  if (currentTime - lastExecutionTime < 1200) {
    const delay = 1200 - (currentTime - lastExecutionTime);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  lastExecutionTime = Date.now();

  ///end dealy
  console.log("Injected antimatter");
  engineRun.textContent += "\n";
  engineRun.textContent += "\nInjected antimattermatter.";
}

// Main function that runs for at least a minute
async function runEngine() {
  const startTime = new Date().getTime();
  let elapsedTime = 0;

  while (elapsedTime < 10000) {
    ///60000 here when the code works
    const { intermix, flowRate } = await getStatus();
    console.log(intermix, flowRate);
    adjustAntimatter(0.1);
    // Adjustments based on the current status
    // if (intermix <= 0.5) {
    //   await adjustMatter(0.1);
    // }

    //console.log(`Status: intermix=${intermix}, flowRate=${flowRate}`);

    // Calculate elapsed time
    const currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
  }
}

startBtn.addEventListener("click", runEngine); // Start sim

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
