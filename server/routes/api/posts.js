const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({ text: req.body.text, createdAt: new Date() });
  res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${
      process.env.DB_PASSWORD
    }@cluster0-tscdu.mongodb.net/test?retryWrites=true`,
    { useNewUrlParser: true }
  );
  return client.db('node-crud-posts').collection('posts');
}

module.exports = router;
