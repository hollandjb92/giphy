// initial array of Pokemon
let topics = ["Bulbasaur", "Squirtle", "Charmander", "Pikachu"];

//generate the initial buttons when page is loaded
function intiialButtons() {
  //empty out this div to avoid many duplicate buttons
  $("#buttons").empty();
  topics.forEach(function (pokemon, index) {
    let button = $("<button>");
    button.addClass("pokemonButton").text(topics[index]).attr("data-pokemon", topics[index]);
    $("#buttons").append(button);
  })
}

function addPokemon() {
  $("#addPokemon").on("click", function (event) {
    event.preventDefault();
    let newPokemon = $("#pokemonInput").val().trim();
    if (newPokemon === "") {
      return false;
    } else {
      topics.push(newPokemon);
      intiialButtons();
    }
  });
}


$("body").on("click", "#delete", function () {
  intiialButtons();
})


// intiialButtons();


//
$("body").on("click", ".pokemonButton", function () {
  let pokemon = $(this).attr("data-pokemon");
  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    pokemon + "&api_key=4flbhHzwF8RVAQ04WmYoFBcfQ9LjhObv&limit=10&rating=PG-13";
  $.ajax({
    method: "GET",
    url: queryURL
  }).then(function (response) {
    console.log(response);
    let results = response.data

    for (i = 0; i < results.length; i++) {
      let pokemonDiv = $("<div>");
      let p = $("<h3>").html("Rating: <strong>" + results[i].rating.toUpperCase() + "</strong>");
      let pokemonGif = $("<img class='gif mb-5' src=" + results[i].images.fixed_height_still.url + ">");
      pokemonGif.attr("data-state", "still").attr("data-animate", results[i].images.fixed_height.url).attr("data-still", results[i].images.fixed_height_still.url);
      pokemonDiv.append(p);
      pokemonDiv.append(pokemonGif);
      $("#gifs").prepend(pokemonDiv);
    }

  })

});

//toggle to pause and play gif
$("body").on("click", ".gif", function () {
  let state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else if (state === "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

intiialButtons();
addPokemon();