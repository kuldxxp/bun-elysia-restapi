import { prisma as db } from '../../lib/prisma';
import { NotFoundError } from 'elysia';

export async function getPosts() {
  try {
    return await db.post.findMany({ orderBy: { createdAt: 'asc' } })
  } catch (err: unknown) {
    console.error(`Error getting posts: ${err}`);
    throw err;
  }
}

export async function getPost(id: number) {
  try {
    const post = await db.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    return post;
  } catch (err: unknown) {
    console.error(`Error getting post by id: ${err}`);
    throw err;
  }
}

export async function createPost(options: { title: string, content: string }) {
  try {
    const { title, content } = options;

    return await db.post.create({ data: { title, content } });
  } catch (err: unknown) {
    console.error(`Error creating post: ${err}`);
    throw err;
  }
}

export async function updatePost(id: number, options: { title?: string, content?: string }) {
  try {
    const { title, content } = options;

    return await db.post.update({
      where: { id },
      data: {
        ...(title ? { title } : {}),
        ...(content ? { content } : {}),
      }
    })
  } catch (err: unknown) {
    console.error(`Error updating post: ${err}`);
    throw err;
  }
}

export async function deletePost(options: { id: number }) {
  try {
    const { id } = options;

    return await db.post.delete({ where: { id } });
  } catch (err: unknown) {
    console.error(`Error deleting post: ${err}`);
    throw err;
  }
}

