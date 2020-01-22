var gameState = function(game){};

gameState.prototype = {

  init:function()
  {
    this.rndArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,
                   0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
      
    this.arr = [{"xpos":135,"ypos":182},{"xpos":317.5,"ypos":182},{"xpos":500,"ypos":182},{"xpos":682.5,"ypos":182},{"xpos":865,"ypos":182},{"xpos":1047.5,"ypos":182},{"xpos":1230,"ypos":182},{"xpos":1412.5,"ypos":182},{"xpos":1595,"ypos":182},{"xpos":1777.5,"ypos":182},{"xpos":135,"ypos":368},{"xpos":317.5,"ypos":368},{"xpos":500,"ypos":368},{"xpos":682.5,"ypos":368},{"xpos":865,"ypos":368},{"xpos":1047.5,"ypos":368},{"xpos":1230,"ypos":368},{"xpos":1412.5,"ypos":368},{"xpos":1595,"ypos":368},{"xpos":1777.5,"ypos":368},{"xpos":135,"ypos":554},{"xpos":317.5,"ypos":554},{"xpos":500,"ypos":554},{"xpos":682.5,"ypos":554},{"xpos":865,"ypos":554},{"xpos":1047.5,"ypos":554},{"xpos":1230,"ypos":554},{"xpos":1412.5,"ypos":554},{"xpos":1595,"ypos":554},{"xpos":1777.5,"ypos":554},{"xpos":135,"ypos":740},{"xpos":317.5,"ypos":740},{"xpos":500,"ypos":740},{"xpos":682.5,"ypos":740},{"xpos":865,"ypos":740},{"xpos":1047.5,"ypos":740},{"xpos":1230,"ypos":740},{"xpos":1412.5,"ypos":740},{"xpos":1595,"ypos":740},{"xpos":1777.5,"ypos":740},{"xpos":135,"ypos":926},{"xpos":317.5,"ypos":926},{"xpos":500,"ypos":926},{"xpos":682.5,"ypos":926},{"xpos":865,"ypos":926},{"xpos":1047.5,"ypos":926},{"xpos":1230,"ypos":926},{"xpos":1412.5,"ypos":926},{"xpos":1595,"ypos":926},{"xpos":1777.5,"ypos":926}];
      
    
    this.gameScore = 0;    
      
    Global.exitFlag = false;
      
    this.revealtimeOut = 0;
    this.reFlipTimeOut = 0;
    Global.timeUpFlag = false;
    
      
    this.rndArr = Utils.shuffle(this.rndArr);
    
    this.previousObj = "";
    
    this.id1 = null;
    this.id2 = null;
    
    this.selectionCount = 0;
    this.matchCount = 0;  
      
    this.flipCompleteCount = 0;
    this.reFlipCompleteCount = 0;
    this.helpCount = 0;
    
    this.timerCount = 120
      
    this.selectPlanetFlag = true;
    
  },
  create:function()
  {  
    gameState.obj = this;    
      
   this.click_sound = this.add.sound("click");      
   //this.sound.setDecodedCallback([ this.click_sound], this.setScreen, this);
      
   this.setScreen();

  },
  setScreen:function()
  {
    
    this.bg = this.add.image(0,0,"bg");   
      
    this.addElements();
      
    this.addPlanet();
      
    this.addUI();
      
    this.timer = this.time.create(false);
    this.timer.repeat(1000,this.timerCount,this.updateCounter);//1000
    
    this.revealtimeOut = setTimeout(this.revealElements,5000);
      
  },
    
  revealElements:function()
  {   
   
    for(var i=0; i<50;i++)
    {
      gameState.obj['element'+i].scale.x = 0;
      gameState.obj['planet'+i].scale.x = 0.8;
    }
    
    gameState.obj.helpButton.inputEnabled = true;
      gameState.obj.helpButton.input.useHandCursor=true;
    gameState.obj.helpButton.alpha = 1;
   
     gameState.obj.timer.start();

  },
  updateCounter:function(e)
  {
      gameState.obj.timerCount--;
     
      gameState.obj.timeField.text = gameState.obj.timerCount.toString();
      
      if(gameState.obj.timerCount===0)
      {
          Global.timeUpFlag = true;
        gameState.obj.showGameOver();
      }
  },    
  addElements:function()
  {   
      
    for(var i=0; i<50;i++)
    {
      var rnd = Utils.getRandomRange(0,this.rndArr.length-1);
        
      var xpos = this.arr[i].xpos;
      var ypos = this.arr[i].ypos;
        
      var n = this.rndArr[rnd];
        
      this.rndArr.splice(rnd,1);
        
      this['element'+i] = this.add.sprite(xpos,ypos,"elements",n);
      this['element'+i].anchor.set(0.5);
        
      this['element'+i].revealed = false;
    
    }
      
    this.arr = [];
      
  },
    
  addPlanet:function()
  {
    var n=0;
      
    for(var j=0; j<5; j++)
    {
        for(var i=0; i<10;i++)
        {
         
         var xpos = 135 + i*182.5;
         var ypos = 182 + j*186;

         this['planet'+n] = this.add.image(xpos,ypos,"planet");   
         this['planet'+n].anchor.set(0.5);

         this['planet'+n].scale.x = 0.8;
         this['planet'+n].scale.y = 0.8;

         this['planet'+n].inputEnabled = true; 
             this['planet'+n].input.useHandCursor=true;
         this['planet'+n].events.onInputDown.add(this.onPlanetClick, this);
         this['planet'+n].id = n;
         this['planet'+n].scale.x = 0;
            
        //this['planet'+n].input.useHandCursor = true;
            
         n++;
            
         }
    }
  },
    
  onPlanetClick:function(event)
  {
      
      if(this.selectPlanetFlag === false || Global.timeUpFlag === true){return;}
      
      var planet = event;
      var element = this['element'+event.id];
       event.inputEnabled = false; 
     // event.input.useHanfCursor=true;
     // event.input.useHanfCursor=true;
      this.selectionCount++;
      
      if(this.selectionCount === 1)
      {
          this.id1 = event.id;          
          
      }
      else if(this.selectionCount === 2)
      {
        this.id2 = event.id;
          
        this.selectionCount = 0;
        this.selectPlanetFlag = false;
      }    
      
      
      Utils.flipAnimation(event,element,this,this.onFlipComplete);
  },
    
  onFlipComplete:function(element)
  {
    var _self = gameState.obj;
      
    element.scale.x = 1;
      
    element.revealed = true;
          
    _self.flipCompleteCount++;
      
    
   if(_self.flipCompleteCount === 2)
    {         
      _self.flipCompleteCount = 0;    
        
      _self.checkMatchingElements();
    }
  },

    
  checkMatchingElements:function()
  {
    var elementStr_1 = this['element'+this.id1]._frame.name;
    var elementStr_2 = this['element'+this.id2]._frame.name;
     
     if(elementStr_1 === elementStr_2)
     {
         //console.log("checkMatchingElements: ",elementStr_1,elementStr_1);
         
         if(elementStr_1 === "newlogo")
         {
          this.onMatching(100);
         }
         else
         {
             this.onMatching(100);
         }
     }
     else if(elementStr_1 !== elementStr_2) {
        this.onNotMacthing();
     }
      
  }, 
 
 onNotMacthing:function()
 {
     this.reFlipTimeOut = setTimeout(this.reFlipAnimation,1000);
 },
 reFlipAnimation:function()
 {
     var _self = gameState.obj;   
     
    var element_1 = _self['element'+_self.id1];
    var element_2 = _self['element'+_self.id2];
     
    var planet_1 = _self['planet'+_self.id1];
    var planet_2 = _self['planet'+_self.id2];     
     
     Utils.flipAnimation(element_1,planet_1,_self,_self.onReFlipComplete,0,0.8);
     Utils.flipAnimation(element_2,planet_2,_self,_self.onReFlipComplete,0,0.8);
 },
 onReFlipComplete:function()
 {
      var _self = gameState.obj;
     
     _self.reFlipCompleteCount++;
     
     if(_self.reFlipCompleteCount === 2)
     {         
        _self['planet'+_self.id1].inputEnabled = true;
         _self['planet'+_self.id2].inputEnabled = true;
                 _self['planet'+_self.id1].input.useHandCursor = true;
         _self['planet'+_self.id2].input.useHandCursor = true;

         _self['planet'+_self.id1].scale.x = 0.8;
         _self['planet'+_self.id2].scale.x = 0.8;
         
         _self['element'+_self.id1].scale.x = 0;
         _self['element'+_self.id2].scale.x = 0;
         
         _self['element'+_self.id1].revealed = false;
           _self['element'+_self.id2].revealed = false;
         
         _self.id1 = null;
         _self.id2 = null;
         
         _self.reFlipCompleteCount = 0;
         
         _self.selectPlanetFlag = true;
     }
     
     
 },
  onMatching:function(scr)
 {
     this.matchCount++;
     
     this.setScore(scr);
     
     if(this.matchCount === 25)//25
     {
        this.onWin();
     }
     
     gameState.obj.selectPlanetFlag = true;
 },
 onWin:function()
 {
     this.showGameOver();
 },
 showGameOver:function()
 {
     this.saveScore();
     
    this.state.start("gameOverScreen");
 },  
 addUI:function()
  {
      
    var style = { font: "30px Arial", fill: "#ff0", boundsAlignH: "center", boundsAlignV: "middle" };
      
    
   this.timeLabel = this.add.text(100, 50, "Time:", style);
   this.timeLabel.anchor.set(0.5);
      
   this.timeField = this.add.text(170, 50, this.timerCount, style);
   this.timeField.anchor.set(0.5);
      
   this.scoreLabel = this.add.text(300, 50, "Score:", style);
   this.scoreLabel.anchor.set(0.5);
      
   this.scoreField = this.add.text(385, 50, "00", style);
   this.scoreField.anchor.set(0.5);
      
    // this.fullScreenButton = this.add.button(1850,50,"enter_fullscreen",this.enterFullScreen,this); 
    // this.exitFullScreenButton = this.add.button(1850,50,"exit_fullscreen",this.exitFullScreen,this); 
    
    // this.fullScreenButton.anchor.set(0.5);
    // this.exitFullScreenButton.anchor.set(0.5);
    // this.exitFullScreenButton.visible = false;
      
   this.soundOnButton = this.add.button(1850,50,"sound_on",this.soundOn,this);  //1720
   this.soundOffButton = this.add.button(1850,50,"sound_off",this.soundOff,this); //1720
      
   this.soundOnButton.anchor.set(0.5);
   this.soundOffButton.anchor.set(0.5); 
   this.soundOffButton.visible = false;
      
   this.helpButton = this.add.button(1880,1030,"helpbutton",this.onHelpClick,this);  //1590
   this.helpButton.inputEnabled = false;
   this.helpButton.alpha = 0.5;
   this.helpButton.anchor.set(0.5);
      
   this.exitButton = this.add.button(1720,50,"exit",this.onExitButtonClick,this);  //1590
   this.exitButton.anchor.set(0.5);  
    
        
   if(Global.soundOnFlag===false){
      this.soundOffButton.visible = true;
      this.soundOnButton.visible = false;
    }
    else {
      this.soundOffButton.visible = false;
      this.soundOnButton.visible = true;       
    }
      
    /*if(Global.fullScreenMode === true) {
      this.fullScreenButton.visible = false;
      this.exitFullScreenButton.visible = true;
        
        if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { 
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { 
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { 
        document.msExitFullscreen();
      }
        
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.startFullScreen(false);
    }
    else {
      this.fullScreenButton.visible = true;
      this.exitFullScreenButton.visible = false;
    }*/
      
  },
  onExitButtonClick:function()
  {
      clearTimeout(this.revealtimeOut);
      clearTimeout(this.reFlipTimeOut);
      
      Global.exitFlag = true;
      
      this.playSound("click");
      this.game.state.start("menu");
  },
  onHelpClick:function()
  {
      if(this.helpCount < 3)
      {
       this.helpCount++;
      this.playSound("click");
      
      this.showElements();
      
      setTimeout(function(){
          gameState.obj.hideElements();
      },5000)
      
      }
      
  },
  showElements:function()
  {
      this.helpButton.inputEnabled = false;
      this.helpButton.alpha = 0.5;
      
      for(i=0;i<50;i++)
      {
          this["planet"+i].visible = false;
          
          if(this['element'+i].revealed === false) {
               this["element"+i].scale.x = 1;
          }
         
      }
  },
  hideElements:function()
  {
      if(this.helpCount < 3){
          
      this.helpButton.inputEnabled = true;
          this.helpButton.input.useHandCursor=true
      this.helpButton.alpha = 1;
          
      }
      
      for(i=0;i<50;i++)
      {
          this["planet"+i].visible = true;
        
          if(this['element'+i].revealed === false) {
               this["element"+i].scale.x = 0;
          }
      }
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
      if(str == "click") { this.click_sound.play(); }
  },
    
  setScore:function(n)
  {
      this.gameScore += n;      
      this.scoreField.text = this.gameScore.toString();
  },
    
 saveScore:function()
 {
     var id = Utils.getID();
     
     Global.gameScore = this.gameScore;
     
     if(localStorage.getItem("u_array")===null)
     {
         var u_arr = [];
         var s_arr = [];
         
         u_arr.push(Global.userName);         
         localStorage.setItem("u_array",JSON.stringify(u_arr));    
         
         s_arr.push(Global.gameScore);         
         localStorage.setItem("s_array",JSON.stringify(s_arr));
        
     }
     else
     {
         var u_arr2 = JSON.parse(localStorage.getItem("u_array"));
         u_arr2.push(Global.userName);
         
         localStorage.setItem("u_array",JSON.stringify(u_arr2));  
         
         var s_arr2 = JSON.parse(localStorage.getItem("s_array"));
         s_arr2.push(Global.gameScore);
        
         localStorage.setItem("s_array",JSON.stringify(s_arr2));

     }
 }
    
};
