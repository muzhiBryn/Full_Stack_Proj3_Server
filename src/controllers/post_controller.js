import Post from '../models/post_model';

export const createPost = (req, res) => {
  // takes in an object with the fields that poll should shave
  // and saves them to the database
  // returns a promise
  const p = new Post();
  p.title = req.body.title;
  p.tags = req.body.tags;
  p.content = req.body.content;
  p.coverUrl = req.body.coverUrl;
  p.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getPosts = (req, res) => {
  Post.find()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export const getPost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


export const deletePost = (req, res) => {
  const { id } = req.params;
  Post.deleteOne({ _id: id }).then((result) => {
    res.json(result);
  })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const updatePost = (req, res) => {
  const { id } = req.params;
  Post.updateOne(
    { _id: id },
    {
      title: req.body.title,
      tags: req.body.tags,
      content: req.body.content,
      coverUrl: req.body.coverUrl,

    },
  )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
