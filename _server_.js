// get posts server side
app.get('/posts/:postId', function(req, res) {
    res.send( JSON.stringify(posts.filter(function (user){ return user.postId == req.params postId})) 
    );
}

// get posts client side
$.get('/posts' + $('#post_title').val(), function(data){ 
    $('#output').html('');
    for (var i = 0; i < data.length; i++) {
        var post = data[i].title;
        $('#output').appent('<p>' + " " + post + '</p>');
    }
}
