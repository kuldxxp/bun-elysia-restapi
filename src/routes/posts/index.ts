import { Elysia, t } from 'elysia';
import { getPosts, getPost, createPost, updatePost, deletePost } from './handlers.ts';

const postRoutes = new Elysia({ prefix: '/posts' })
  .get('/', () => getPosts())
  .get('/:id', ({ params: { id } }) => getPost(id), {
    params: t.Object({
      id: t.Numeric(),
    })
  })
  .post('/', ({ body }) => createPost(body), {
    body: t.Object({
      title: t.String({
        minLength: 3,
        maxLength: 50,
      }),
      content: t.String({
        minLength: 5,
        maxLength: 100,
      }),
    })
  })
  .patch('/:id', ({ params: { id }, body }) => updatePost(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: t.Object({
      title: t.Optional(t.String({
        minLength: 3,
        maxLength: 50,
      })),
      content: t.Optional(t.String({
        minLength: 5,
        maxLength: 100,
      })),
    }, {
      minProperties: 1,
    })
  })
  .delete('/', ({ body }) => deletePost(body), {
    body: t.Object({
      id: t.Numeric(),
    })
  })

export default postRoutes;
