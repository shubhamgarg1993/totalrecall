var gameOverState = function(game){

};

gameOverState.prototype = {

  init:function()
  {
    this.t1 = 0;
    gameOverState.obj = this;
  },
  create:function()
  {
      this.click_sound = this.add.sound("click");      
      this.sound.setDecodedCallback([ this.click_sound], this.setScreen, this);
  },
  setScreen:function()
  {
      
    this.add.image(0,0,"gameoverbg");      
    
    var style = { font: "bold 90px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        
    this.playAgainButton = this.add.button(this.world.centerX,this.world.centerY+200,"retry",this.onPlayAgain,this);
    this.playAgainButton.anchor.set(0.5);
         
    this.leaderBoardButton = this.add.button(this.world.centerX,this.world.centerY+400,"leaderboardbutton",this.onLeaderBoardButton,this);
    this.leaderBoardButton.anchor.set(0.5);
    
    let scoreText= this.add.text(this.world.centerX,100,"Score: "+ Global.gameScore,style)
scoreText.anchor.set(0.5,0)
    this.addUI();
      
     this.t1 = setTimeout(function(){
        gameOverState.obj.onPlayAgain();        
    },10000);
      
  },
  
  addUI:function()
  {
    // this.fullScreenButton = this.add.button(1850,50,"enter_fullscreen",this.enterFullScreen,this); 
    // this.exitFullScreenButton = this.add.button(1850,50,"exit_fullscreen",this.exitFullScreen,this); 
    // this.fullScreenButton.anchor.set(0.5);
    // this.exitFullScreenButton.anchor.set(0.5);
    // this.exitFullScreenButton.visible = false;
      
   this.soundOnButton = this.add.button(1850,1020,"sound_on",this.soundOn,this);  //1720
   this.soundOffButton = this.add.button(1850,1020,"sound_off",this.soundOff,this); //1720
      
   this.soundOnButton.anchor.set(0.5);
   this.soundOffButton.anchor.set(0.5); 
   this.soundOffButton.visible = false;
      
    if(Global.soundOnFlag===false){
      this.soundOffButton.visible = true;
      this.soundOnButton.visible = false;
    }
    else {
      this.soundOffButton.visible = false;
      this.soundOnButton.visible = true;       
    }
      
//    if(Global.fullScreenMode === true) {
//      this.fullScreenButton.visible = false;
//      this.exitFullScreenButton.visible = true;
//    }
//    else {
//      this.fullScreenButton.visible = true;
//      this.exitFullScreenButton.visible = false;
//    }
      
  },
  onPlayAgain:function()
  {
      clearTimeout(this.t1);
      
      this.playSound("click");
      
      this.state.start("menu");
  },
    
  onLeaderBoardButton:function()
  {
      this.playSound("click");
      this.state.start("leaderBoard");
  
  },
    
    
  soundOn:function()
  {
    Global.soundOnFlag = false;     
    this.soundOffButton.visible = true;
    this.soundOnButton.visible = false;
  },
  soundOff:function()
  {
    Global.soundOnFlag = true;    
    this.playSound("click");      
    this.soundOffButton.visible = false;
    this.soundOnButton.visible = true;
  },
  enterFullScreen:function()
  {
    this.playSound("click");
      
    this.fullScreenButton.visible = false;
    this.exitFullScreenButton.visible = true;
   
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.game.scale.startFullScreen(false);
      
    Global.fullScreenMode = true;
  },
  exitFullScreen:function()
  {
    this.playSound("click");
      
    this.fullScreenButton.visible = true;
    this.exitFullScreenButton.visible = false;
    
    this.game.scale.stopFullScreen();      
     Global.fullScreenMode = false;
  },    
 playSound:function(str)
 {
      if(Global.soundOnFlag===false){return;}
      
      if(str == "click")
      {
          this.click_sound.play();
      }
  }
 

};
