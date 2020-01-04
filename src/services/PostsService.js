var url = `http://localhost:3000/posts/`;

const PostsService = {
    
    addPost: function(post) {
        post = JSON.stringify(post);
        fetch(url, {
            method: 'POST',
            body: post,
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => response.json())
            .then(json => window.location = `/post/${json.id}`)
    },

    updatePost: function(post) {
        const url = `http://localhost:3000/posts/${post.id}`
        post = JSON.stringify(post);
        fetch(url, {
            method: 'PUT',
            body: post,
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => response.json())
    },

    deletePost: function(id) {
      const commentsUrl = `http://localhost:3000/comments?postId=${id}`
      fetch(url + id, {
          method: 'DELETE',
      }).then(
        fetch(commentsUrl, {
          method: 'DELETE',
      }).then(        window.location = "/")
      )
    },

    getPostByID: function(id) {
      return  fetch(url + id).then(response => response.json())
    },

    getPostsByUser: function(id) {
      const url = `http://localhost:3000/posts?userId=${id}`;
      return  fetch(url).then(response => response.json())
    },
    
    getPosts: function() {
      return  fetch(url).then(response => response.json())
    }

};

export default PostsService;