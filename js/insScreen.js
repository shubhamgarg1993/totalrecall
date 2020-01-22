var insState = function(game){

};

insState.prototype = {

  create:function()
  {
      
   this.click_sound = this.add.sound("click");      
   this.sound.setDecodedCallback([ this.click_sound], this.setScreen, this);
      
  },
  setScreen:function()
  {
   this.add.image(0,0,"instructions");      
    
   var button = this.add.button(this.world.centerX,960,'start',this.onStartClick,this);
   button.anchor.set(0.5,0.5);
      
   this.addUI();    
   
      
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
  soundOn:function()
  {
   
      
    this.soundOffButton.visible = true;
    this.soundOnButton.visible = false;
      
    Global.soundOnFlag = false;

  },
  soundOff:function()
  {    
      
    this.soundOffButton.visible = false;
    this.soundOnButton.visible = true;
      
     Global.soundOnFlag = true;
    
      this.playSound("click");
  },
  enterFullScreen:function()
  {
    this.playSound("click");
      
    this.fullScreenButton.visible = false;
    this.exitFullScreenButton.visible = true;
      
    Global.fullScreenMode = true;
   
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.game.scale.startFullScreen(false);
  },
  exitFullScreen:function()
  {
     this.playSound("click");
      
    this.game.scale.stopFullScreen();
    
    this.fullScreenButton.visible = true;
    this.exitFullScreenButton.visible = false;      
   
      
    Global.fullScreenMode = false;
      
    
  },
  onStartClick:function()
  {
    this.playSound("click");
      
    this.state.start("nameScreen");
    
   
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
