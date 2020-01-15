const url = "https://nhuyb.sse.codesandbox.io";

export default {
  /**
   * ACTIVITY TYPES
   */
  getActivityTypes: () => {
    return fetch(url + "/activities")
      .then(res => res.json())
      .then(types => {
        console.log("the activity types are", types);
        return types;
      });
  },

  /**
   * ACTIVITY LOG ENTRIES
   */
  createLogEntry: entry => {
    return postData(url + "log", entry).then(data => {
      console.log(data); // JSON data parsed by `response.json()` call
    });
  }
};

// // Example POST method implementation:
// postData('https://example.com/answer', { answer: 42 })
// .then((data) => {
//   console.log(data); // JSON data parsed by `response.json()` call
// });

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}
