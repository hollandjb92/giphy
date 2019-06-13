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

//add another pokemon button
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

//deletes the user added buttons
$("body").on("click", "#delete", function () {
  intiialButtons();
})

//generates gifs upon clicking pokemon button
$("body").on("click", ".pokemonButton", function () {
  //stores pokemon name is a variable
  let pokemon = $(this).attr("data-pokemon");
  //concatenates query URL
  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    pokemon + "&api_key=4flbhHzwF8RVAQ04WmYoFBcfQ9LjhObv&limit=10&rating=PG-13";
  //call ajax method
  $.ajax({
    method: "GET",
    url: queryURL
  }).then(function (response) {
    console.log(response);
    let results = response.data
    for (i = 0; i < results.length; i++) {
      let pokemonDiv = $("<div>");
      let p = $("<h2>").html("Rating: <strong>" + results[i].rating.toUpperCase() + "</strong>");
      let pokemonGif = $("<img class='gif mb-4' src=" + results[i].images.fixed_height_still.url + ">");
      pokemonGif.attr("data-state", "still").attr("data-animate", results[i].images.fixed_height.url).attr("data-still", results[i].images.fixed_height_still.url);
      //download attribute doesnt work anymore but hey I tried
      let download = $("<button>").addClass("btn btn-outline-danger mb-5 d-block download shadow-none").html("<a target='_blank' href='" + results[i].images.fixed_height.url + "' download>Download</a>");
      pokemonDiv.append(p);
      pokemonDiv.append(pokemonGif);
      pokemonDiv.append(download);
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

//

intiialButtons();
addPokemon();