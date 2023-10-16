var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = document.getElementById("wrong-audio");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    $("#level-title").text("Game Over");
    startOver();
    $("#button-91").text("Restart");
  }
}

function nextSequence() {
  $("#button-91").css("display", "none");
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playPattern(0);
}

function playPattern(index) {
  if (index < gamePattern.length) {
    var currentColor = gamePattern[index];
    playSound(currentColor);
    animatePress(currentColor);

    setTimeout(function () {
      playPattern(index + 1);
    }, 600);
  } else {
    userClickedPattern = [];
    $(".btn").prop("disabled", false);
  }
}

$("#button-91").click(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    setTimeout(function () {
      nextSequence();
    }, 1000);
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = document.getElementById(name + "-audio");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}

function startOver() {
  $("#button-91").css("display", "");
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}

$("#button-90").click(function () {
  $("#game").css("display", "block");
  $(".videoTutorial").css("display", "none");
  $(".gameInstruction").css("display", "none");
});
