import { serve } from "bun";

const PORT = 2049;

serve({
  port: PORT,
  async fetch(request) {
    return new Response("Hello");
  },
});

console.log(`Listening on http://localhost:${PORT} !`);

