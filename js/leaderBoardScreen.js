var leaderBoardState = function(game){

};

leaderBoardState.prototype = {
    
  init:function()
  {
    this.t1 = 0;
    leaderBoardState.obj = this;

  },
  create:function()
  {
      
    this.click_sound = this.add.sound("click");      
    this.sound.setDecodedCallback([ this.click_sound], this.setScreen, this);
  },
  setScreen:function()
  {
    this.add.image(0,0,"leaderboardbg");     
      
    this.playAgainButton = this.add.button(1618,950,"retry",this.onPlayAgain,this);
    this.playAgainButton.anchor.set(0.5);
          
    this.addUI();
      
    this.t1 = setTimeout(function(){
        leaderBoardState.obj.onPlayAgain();        
    },10000);
      
   
    this.getLeaderBoard();
  },
  onPlayAgain:function()
  {
      clearTimeout(this.t1);
      
      this.playSound("click");      
      
      this.state.start("menu");
  },
  getLeaderBoard:function()
  {
      var i=0;
      
     var name_arr =  JSON.parse(localStorage.getItem("u_array"));
     var score_arr =  JSON.parse(localStorage.getItem("s_array"));
     var lb_arr = [];
      
      var style = { font: "bold 40px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
      
      console.log(name_arr);
      
    if(name_arr !==null)
    {
      
          for(i=0; i<name_arr.length; i++)
          {
              var obj = new Object();

              obj.name = name_arr[i];
              obj.score = score_arr[i];

              lb_arr.push(obj);
          }

          lb_arr.sort(function(a, b){
            return b.score-a.score; });
      
        if(name_arr.length > 9){
            name_arr.length = 9;
        }
    
        for(i=0; i<name_arr.length;i++)
        {
            var xpos = 740;
            var ypos = 320;

            nameStr = lb_arr[i].name;
            pointStr = lb_arr[i].score;

            if(nameStr && nameStr.length > 8){
                nameStr = nameStr.substr(0,8)+"...";
            }

            var nameTxt = this.add.text(xpos, ypos+i*80,nameStr, style);
            nameTxt.anchor.set(0.5,0.5);

            xpos = 1200;
            ypos = 320;

            var pontTxt = this.add.text(xpos, ypos+i*80, pointStr, style);
            pontTxt.anchor.set(0.5,0.5);

        }
    }
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
