// exporting module
export let authorizationCode; //Global variable for authCode retrieved from start API
let lastExecutionTime = 0;
const proxy = "http://localhost:8080/";
const adjustMatterUrl = `${proxy}https://warp-regulator-bd7q33crqa-lz.a.run.app/api/adjust/matter`;
const adjustAntimatterUrl = `${proxy}https://warp-regulator-bd7q33crqa-lz.a.run.app/api/adjust/antimatter`;
const statusUrl = `${proxy}https://warp-regulator-bd7q33crqa-lz.a.run.app/api/status`;
const startUrl = `${proxy}https://warp-regulator-bd7q33crqa-lz.a.run.app/api/start`;
const codeField = document.querySelector(".message-container"); //HTML element selector
const engineRun = document.querySelector(".engine-run"); //HTML element selector
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// Function to start the engine and retrieve the authorization code
export const startEngine = async function startEngine() {
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
  //console.log(authorizationCode);
  codeField.textContent = `${authorizationCode}`;
  return authorizationCode;
};
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//function to get status of the engine
export const getStatus = async function getStatus() {
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
  console.log(status);
  engineRun.textContent = `Flow Rate: ${status.flowRate} Intermix: ${status.intermix}`;

  return status;
};
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// Function to adjust the matter injection
export const adjustMatter = async function adjustMatter(amount) {
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify({
    authorizationCode: `${authorizationCode}`,
    value: `${amount}`,
  });
  try {
    const inject = await fetch(adjustMatterUrl, {
      method: "POST",
      headers,
      body,
    });
    // Handle the resolved value of the `inject` promise if necessary
    console.log("Injected matter");
    engineRun.textContent += "\n";
    engineRun.textContent += "\nInjected matter.";
  } catch (error) {
    // Handle any errors that occurred during the `fetch` operation
    console.error("Error occurred during fetch:", error);
    // Optionally, throw the error to propagate it further
    throw error;
  }
};

// Function to adjust the antimatter injection
export const adjustAntimatter = async function adjustAntimatter(amount) {
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify({
    authorizationCode: `${authorizationCode}`,
    value: `${amount}`,
  });
  try {
    const inject = await fetch(adjustMatterUrl, {
      method: "POST",
      headers,
      body,
    });
    // Handle the resolved value of the `inject` promise if necessary
    console.log("Injected matter");
    engineRun.textContent += "\n";
    engineRun.textContent += "\nInjected matter.";
  } catch (error) {
    // Handle any errors that occurred during the `fetch` operation
    console.error("Error occurred during fetch:", error);
    // Optionally, throw the error to propagate it further
    throw error;
  }
};
///delay
//   const currentTime = Date.now();
//   if (currentTime - lastExecutionTime < 1200) {
//     const delay = 1200 - (currentTime - lastExecutionTime);
//     await new Promise((resolve) => setTimeout(resolve, delay));
//   }
//   lastExecutionTime = Date.now();

///end dealy
