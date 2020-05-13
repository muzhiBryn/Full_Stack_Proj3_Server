import { Router } from 'express';
import * as Posts from './controllers/post_controller';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.route('/posts')
  .get((req, res) => {
    Posts.getPosts(req, res);
  })
  .post((req, res) => {
    Posts.createPost(req, res);
  });


router.route('/posts/:id')
  .get((req, res) => {
    Posts.getPost(req, res);
  })
  .put((req, res) => {
    Posts.updatePost(req, res);
  })
  .delete((req, res) => {
    Posts.deletePost(req, res);
  });


export default router;
