const CommentsService = {
    
    addComment: function(comment) {
        const url = `http://localhost:3000/comments`
        comment = JSON.stringify(comment);
        return fetch(url, {
            method: 'POST',
            body: comment,
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => response.json())
    },

    updateComment: function(comment) {
        const url = `http://localhost:3000/comments/${comment.id}`
        comment = JSON.stringify(comment);
        fetch(url, {
            method: 'PUT',
            body: comment,
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => response.json())
          .then(json => window.location = `/comment/${json.id}`)
    },

    deleteComment: function(id) {
      const url = `http://localhost:3000/comments/${id}`
      return fetch(url, {
          method: 'DELETE',
      })
    },

    getCommentsByPost: function(id) {
      const url = `http://localhost:3000/comments?postId=${id}`
      return  fetch(url).then(response => response.json())
  }

};

export default CommentsService;