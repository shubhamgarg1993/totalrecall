var bootState = function(game){

}

bootState.prototype = {

  init:function()
  {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically  = true;
	//this.scale.setScreenSize();
      
    this.add.plugin(PhaserInput.Plugin);
      
  },
  preload:function()
  {
      var d = new Date();
      var t = d.getTime();
      
      this.load.image('preloader_bg','assets/preloader_bg.png?v='+t);
      this.load.image('loadingbar','assets/loadingbar.png?v='+t);
      this.load.image('loadingbar_bg','assets/loadingbar_bg.png?v='+t);
  },
  create:function()
  {   
    this.state.start('preload');
  }
};
