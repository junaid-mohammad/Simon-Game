// global variables.
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Start the game when any key is pressed.
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Detect Button Clicks and call corresponding functions.
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

// Game Logic.
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      // Update the player's final score.
      var score = 0;
      if (level != 0) {
        score = level - 1;
      }
      $("#level-title").html("Game Over, Final Score:" + score + "<br>Press Any Key to Restart");
      // Call startOver() if the user gets the sequence wrong.
      startOver();
    }
}

// keeps track of the game level, updates h1 at game start, generates the next sequence and pushes it to the game pattern.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// Play corresponding sounds for each button.
function playSound(name) {
  var src = "sounds/" + name + ".mp3";
  var audio = new Audio(src);
  audio.play();
}

// Simple button animation logic utilizing the timeout function.
function animatePress(currentColor) {
  var self = $("#" + currentColor)
  self.addClass("pressed");
  setTimeout(function () {
    self.removeClass("pressed");
  }, 100);
}

// Reset the values of level, gamePattern and started variables.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}