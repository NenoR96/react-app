var url = `http://localhost:3000/users/`;

const UsersService = {
    addUser: function(user) {
        user = JSON.stringify(user);
        fetch(url, {
            method: 'POST',
            body: user,
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => response.json())
            .then(json => window.location = `/user/profile/${json.id}`)
    },

    updateUser: function(user) {
      const url = `http://localhost:3000/posts/${user.id}`
        user = JSON.stringify(user);
        fetch(url, {
            method: 'PUT',
            body: user,
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => response.json())
    },

    deleteUser: function(id) {
      const postsUrl = `http://localhost:3000/posts?userId=${id}`
      const commentsUrl = `http://localhost:3000/comments?userId=${id}`
      fetch(url + id, {
          method: 'DELETE',
      }).then(
        fetch(commentsUrl, {
          method: 'DELETE',
      }).then(fetch(postsUrl, {
          method: 'DELETE',
      })).then(    window.location = "/" ))
    },

    getUserByID: function(id) {
      return  fetch(url + id).then(response => response.json())
    }
};

export default UsersService;