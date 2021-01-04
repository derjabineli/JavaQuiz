function printScore() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscores.sort(function (a, b) {
        return b.score - a.score;
    });

    highscores.foreach(function (score) {
        var liTag = document.createElement("li");
        liTag.textContent = score.initals + " - " + score.score;

        var pageDisplay = document.getElementById("highscore")
        pageDisplay.appendChild(liTag);
        console.log(score)
    })
}

function clearScore() {
    window.localStorage.removeItem("highscore");
    window.location.reload();
}

document.getElementById("clear").onclick = clearScore;

printScore();