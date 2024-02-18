import { Router } from "itty-router";

// Create a new router
const router = Router();

/*
Our index route, a simple hello world.
*/
router.get("/", () => {
  return new Response(
    "Hello, world! This is the root page of your Worker template."
  );
});

/*
This route demonstrates path parameters, allowing you to extract fragments from the request
URL.

Try visit /example/hello and see the response.
*/
router.get("/example/:text", (request) => {
  // Decode text like "Hello%20world" into "Hello world"
  let input = decodeURIComponent(request.params.text);
  console.log(request.query);
  // Serialise the input into a base64 string
  let base64 = btoa(input);

  // Return the HTML with the string to the client
  return new Response(`<p>Base64 encoding: <code>${base64}</code></p>`, {
    headers: {
      "Content-Type": "text/html",
    },
  });
});

/*
  Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all("*", () => new Response("404, not found!", { status: 404 }));

export default {
  fetch: router.handle,
};
