var Utils = {
    
    
 flipAnimation:function(_objA,_objB,_context,_callback,_scaleX1=0,_scaleX2=1)
 {
     var tween = _context.add.tween(_objA.scale).to({x: _scaleX1}, 260, Phaser.Easing.Linear.In, true);
  
    tween.onComplete.add(function(){
        
        if(Global.exitFlag === false && Global.timeUpFlag === false) {
         _callback(_objB);
        }
             
   }, _context);
 },
    
 shuffle:function(arra1)
 {
    var ctr = arra1.length, temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
 },
 getRandomRange:function(min, max)
 {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
 },
 getID:function()
 {
     var d = new Date().valueOf();
     return d;
 }
    
};