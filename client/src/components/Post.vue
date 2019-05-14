<template>
  <div class="constainer">
    <h1>Latest Posts</h1>
    <div>
      <label for="create-post">Say Something...</label>
      <br>
      <input type="text" id="create-post" v-model="text">
      <button v-on:click="createPost">Submit</button>
    </div>
    <!-- CREATE POST -->
    <hr>
    <p class="er" v-if="error">{{error}}</p>
    <div class="post" v-for="(post,index) in posts" :item="post" :index="index" :key="post.id">
      {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}
      <p>{{post.text}}</p>
      <button v-on:click="deletePost(post._id)">delete</button>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService.js';

export default {
  name: 'Post',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      if (this.text === '') {
        this.error = 'cannot be blank';
      } else {
        await PostService.insertPost(this.text);
        this.posts = await PostService.getPosts();
        this.text = '';
        this.error = '';
      }
    },
    async deletePost(id) {
      console.log(id);
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
