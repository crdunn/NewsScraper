
//This complete mess outpouts the form selection I deeply apologize fot anyone who has to read it, but it works.  Kind of.

$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<div id='news' class='row justify-content-center'><div class='col-10'><div class='card' data-id='" + data[i]._id + "'><div class='card-header'>" + data[i].title + "</div><div class='card-body'><p><a href='" + data[i].link + "'>Click here for link</a></p><a href='#'' class='btn btn-primary'>Add a note!</a><span>        </span><div class='form-check form-check-inline'><label class='form-check-label'><input class='form-check-input' type='radio' name='inlineRadioOptions' id='onion' value='option1'>The Onion!</label></div><div class='form-check form-check-inline'><label class='form-check-label'><input class='form-check-input' type='radio' name='inlineRadioOptions' id='notOnion' value='option2'> NotTheOnion!</label></div></div></div></div>");
  }
});