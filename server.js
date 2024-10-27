const http = require('http');

const posts = [
  {
    postId: 1,
    message: "Hello World!"
  },
  {
    postId: 2,
    message: "Ciao!"
  },
];

let nextPostId = 3;

function getNewPostId() {
  const newPostId = nextPostId;
  nextPostId++;
  return newPostId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {


    // only parse the body if it's not a GET request
    if (req.method !== 'GET' && reqBody) {
      try {
        const contentType = req.headers['content-type'];
        if (contentType === 'application/json') {
          req.body = JSON.parse(reqBody);
        } else if (contentType === 'application/x-www-form-urlencoded') {
        req.body = reqBody
          .split("&")
          .map((keyValuePair) => keyValuePair.split("="))
          .map(([key, value]) => [key, value.replace(/\+/g, " ")])
          .map(([key, value]) => [key, decodeURIComponent(value)])
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});
        }
      } catch (e) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify("Could not parse body"));
        return res.end();
      }
    }

    if (req.method === 'GET' && req.url === '/posts') {
      // Return the posts array as JSON in the body of the response
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(posts));
      return res.end();
    }

    if (req.method === 'POST' && req.url === '/posts') {
      // Return the posts array as JSON in the body of the response
      const { message } = req.body;
      if (!message) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify("Message is required"));
        return res.end();
      }
      const post = { postId: getNewPostId(), message };
      posts.push(post);
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(post));
      return res.end();
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify("Endpoint not found"));
    return res.end();
  });
});

const port = 5002;

server.listen(port, () => console.log('Server is listening on port', port));
