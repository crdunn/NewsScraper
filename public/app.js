
//This complete mess outpouts the form selection. I deeply apologize to anyone who has to read it, but it works.  Kind of.

$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<div id='news' class='row justify-content-center'><div class='col-10'><div class='card' data-id='" + data[i]._id + "'><div class='card-header'>" + data[i].title + "</div><div class='card-body'><p><a href='" + data[i].link + "'>Click here for link</a></p><div class='form-group'></div><a href='#'' class='btn btn-primary' id='seeGuess' data-id='"+data[i]._id+"'>See Your Guess</a><span>             </span><a href='#'' class='btn btn-primary' id='addGuess' data-id='"+data[i]._id+"'>Add Your Guess</a><span>                </span><div class='form-check form-check-inline'><label class='form-check-label'><input class='form-check-input' type='radio' name='guess' id='onion' value='false'>The Onion</label></div><div class='form-check form-check-inline'><label class='form-check-label'><input class='form-check-input' type='radio' name='guess' id='notOnion' value='true'> NotTheOnion</label></div></div></div></div>");
  }
});



//This will save the note and the guess when the button  is clicked
$(document).on("click", "#addGuess", function() {
  event.preventDefault();
  var thisId = $(this).attr("data-id");

  //This function will log whether the user guessed that the article was 'true' (a real news article), or 'false' (an Onion article).
  var userGuess = $(':radio[name="guess"]:checked').val();

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {

      guess: userGuess
    }
  })
    .done(function(data) {
      $("#notes").empty();
    });

  $("#noteText").val("");
  alert("Note Added");
});





  
// This function will show all the previous guesses
$(document).on("click", "#seeGuess", function() {
  event.preventDefault();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })

    .done(function(data) {
      alert("You guessed that this was a "+data.note.guess+" story");
      });
});









