
var game = new Phaser.Game(1920,1080,Phaser.AUTO,"MatchingGame");

game.state.add("boot",bootState);
game.state.add("preload",preloadState);
game.state.add("menu",menuState);
game.state.add("instruction",insState);
game.state.add("nameScreen",nameState);
game.state.add("game",gameState);
game.state.add("gameOverScreen",gameOverState);
game.state.add("leaderBoard",leaderBoardState);
game.state.start("boot");

window.addEventListener("resize", onResize);

onResize();

function onResize()
{
    if(window.innerHeight > window.innerWidth)  
    {
       //portriat
       document.getElementById("warning").style.display = "block";
    }
    else if(window.innerWidth > window.innerHeight)
    {
      //landscape 
      document.getElementById("warning").style.display = "none";
    }
}