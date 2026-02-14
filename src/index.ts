import { serve } from "bun";

const PORT = 2049;

interface Post {
  id: string;
  title: string;
  content: string;
};

let blogPosts: Post[] = [];

function handleGetAllPosts() {
  return new Response(JSON.stringify(blogPosts), {
    headers: { "Content-Type": "application/json" },
  });
}

function handleGetPostsById(id: string) {
  const post = blogPosts.find((post) => post.id === id);

  if (!post) {
    return new Respoinse("Post not found", { status: 404 });
  }

  return new Response(JSON.stringify(post), {
    headers: { "Content-Type": "application/json" },
  });
}

function handleCreatePost(title: string, content: string) {
  const newPost: Post = {
    id: `${blogPosts.length}`,
    title,
    content,
  };

  blogPosts.push(newPost);

  return new Response(JSON.stringify(newPost), {
    headers: {"Content-Type": "application/json"},
    status: 201,
  });
}

function handleUpdatePost(id: string, title: string, content: string) {
  const postIndex = blogPosts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return new Response("Post not found", { status: 404 });
  }

  blogPosts[postIndex] = {
    ...blogPosts[postIndex],
    title,
    content,
  };

  return new Response("Post updated", { status: 200 });
}

function handleDeletePost(id: string) {
  const postIndex = blogPosts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return new Response("Post not found", { status: 404 });
  }

  blogPosts.splice(postIndex, 1);

  return new Response("Post deleted", { status: 200 });
}

serve({
  port: PORT,
  async fetch(request) {
    const { method } = request;
    const { pathname } = new URL(request.url);
    const pathregexForId = /^\/api\/posts\/(\d+)$/;

    if (method === "GET") {
      const match = pathname.match(pathregexForId);
      const id = match && match[1];

      if (id) {
        return handleGetPostsById(id);
      }
    }

    if (method === "GET" && pathname === "/api/posts") {
      return handleGetAllPosts();
    }

    if (method === "POST" && pathname === "/api/posts") {
      const newPost = await request.json();

      return handleCreatePost(newPost.title, newPost.content);
    }

    if (method === "PATCH") {
      const match = pathname.match(pathregexForId);
      const id = match && match[1];

      if (id) {
        const editedPost = await request.json();

        return handleUpdatePost(id, editedPost.title, editedPost.content);
      }
    }

    if (method === "DELETE" && pathname === "/api/posts") {
      const { id } = await request.json();

      return handleDeletePost(id);
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`Listening on http://localhost:${PORT} !`);

