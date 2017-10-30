
//This complete mess outpouts the form selection. I deeply apologize to anyone who has to read it, but it works.  Kind of.

$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<div id='news' class='row justify-content-center'><div class='col-10'><div class='card' data-id='" + data[i]._id + "'><div class='card-header'>" + data[i].title + "</div><div class='card-body'><p><a href='" + data[i].link + "'>Click here for link</a></p><div class='form-group'><label for='noteText'>Note</label><textarea class='form-control' id='noteText' rows='3'></textarea></div><div class='form-group'></div><fieldset class='form-group'><div class='form-check form-check-inline'><label class='form-check-label'><input class='form-check-input' type='radio' name='guess' id='onion' value='false' checked>The Onion</label></div><div class='form-check form-check-inline'><label class='form-check-label'><input class='form-check-input' type='radio' name='guess' id='notOnion' value='true'> NotTheOnion</label></div></fieldset><a href='#'' class='btn btn-primary' id='seeGuess' data-id='"+data[i]._id+"'>See Your Guess</a><span>             </span><a href='#'' class='btn btn-primary' id='addGuess' data-id='"+data[i]._id+"'>Add Your Guess</a></div><div class='results'></div></div></div>");
  }
});



//This will save the note and the guess when the button  is clicked
$(document).on("click", "#addGuess", function() {
  event.preventDefault();
  var thisId = $(this).attr("data-id");

  //This function will log whether the user guessed that the article was 'true' (a real news article), or 'false' (an Onion article).
  var userGuess = $(':radio[name="guess"]:checked').val();
  var userNote = $("#noteText").val()

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      text: userNote,
      guess: userGuess
    }
  })
    .done(function(data) {
      $("#notes").empty();
    });

  $("#noteText").val("");
  $(".results").html("");
  alert("Guess Added");
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
      $('.results').html("<div class='row justify-content-center'><div class='card col-11'><div class='card-header'>You guessed that this was a "+data.note.guess+" story, because:</div><div class='card-body'>"+data.note.text+"</div></div>");
      });
});









