/*
Make fetch requests in the browser for each of the following tasks.
Paste your code for fetch requests here once you finish each task.
*/

/* =============================== Phase 1 ================================ */
/*
  Make a request with fetch request to GET /posts and print the response
  components to the console.
*/

fetch('http://localhost:5002/posts')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:'));



/* =============================== Phase 2 ================================ */
/*
  Make a request with fetch request to POST /posts and print the response
  components to the console.
*/

fetch('http://localhost:5002/posts', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: "New Post!"
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
