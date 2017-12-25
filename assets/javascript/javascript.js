var animalList = [
  "baby dog",
  "baby cat",
  "baby deer",
  "baby bear",
  "baby squirrel",
  "baby raccoon",
  "baby goat",
  "baby panada",
  "baby bird",
  "baby tiger",
  "baby giraffe",
  "baby hedgehog",
  "baby elephant",
  "baby chameleon"
];

function renderButton() {
  $("#animalButton").empty();
  for (var i = 0; i < animalList.length; i++) {
    var a = $("<button>");
    a.text(animalList[i]);
    a.addClass("name");
    a.attr("data-name", animalList[i]);
    $("#animalButton").append(a);
  }

  $("button").on("click", function() {
    $("#animals").empty();
    var yourAnimal = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=IlaWjDCFA9RMLebZM1FlTME50oBMwdEZ&q=" +
      yourAnimal +
      "&limit=20";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;

      for (var j = 0; j < results.length; j++) {
        var rates = results[j].rating;
        var image = results[j].images.fixed_height_still.url;
        var imageAnimate = results[j].images.fixed_height_downsampled.url;
        var myimage = $("<div class='gifImage'>");
        var p = $("<p>").text("Rating: " + rates);
        var mygif = $(
          `<img class="mygif" data-animate=${imageAnimate} data-still=${image} data-state="still">`
        ).attr("src", image);
        //    mygif.attr("data-animate",imageAnimate);
        //    mygif.attr("data-still",image);
        myimage.append(p).append(mygif);
        $("#animals").prepend(myimage);
      }
      $(".mygif").on("click", function() {
        var imgState = $(this).attr("data-state");
        if (imgState === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  });
}

$("#addAnimal").on("click", function(event) {
  event.preventDefault();
  var newanimal = $("#animal-input")
    .val()
    .trim()
    .toLowerCase();
  if (animalList.indexOf(newanimal) < 0 && newanimal !== "") {
    animalList.push(newanimal);
  }
  renderButton();
});

renderButton();
