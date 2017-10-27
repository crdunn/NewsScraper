
$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br /><a href='" + data[i].link + "'>Click here for link</a></p>");
  }
});