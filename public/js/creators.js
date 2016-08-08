  var eddie = document.getElementById('eddie');
  var jim = document.getElementById('jim');
  var henry = document.getElementById('henry');
  var stephen = document.getElementById('stephen');


  function head_model(id){
      var headDirx;
      var headDiry;
      var choosePlace = [100,200,300,400,500,600];
      this.x = choosePlace[Math.floor(Math.random() * choosePlace.length) - 1];
      this.y = choosePlace[Math.floor(Math.random() * choosePlace.length) - 1];
        if(Math.random() < 0.5){
            headDirx = 5
        } else {
            headDirx = -5
        }
        if(Math.random() < 0.5){
            headDiry = 5
        } else {
            headDiry = -5
        }

      this.vx = headDirx;
      this.vy = headDiry;  
      this.element = document.getElementById(id);
   };
  

  
  var heads = [];
  heads.push(eddie_model = new head_model('eddie'));
  heads.push(jim_model = new head_model('jim'));
  heads.push(henry_model = new head_model('henry'));
  heads.push(stephen_model = new head_model('stephen'));

  function update(){
      for(var i = 0; i < heads.length; i++){
          heads[i].x = heads[i].x + heads[i].vx;
          heads[i].y = heads[i].y + heads[i].vy;

            if(heads[i].y > 700 && heads[i].vy > 0) {
                //flip the y direction on the bottom edge
                heads[i].vy *= -1;
            }
            // colliding with top edge
            if(heads[i].y < 0 && heads[i].vy < 0) {
                heads[i].vy *= -1;
            }
            if(heads[i].x > 1440 && heads[i].vx > 0) {
                //flip the y direction on the bottom edge
                heads[i].vx *= -1;
            }
            // colliding with top edge
            if(heads[i].x < 0 && heads[i].vx < 0) {
                heads[i].vx *= -1;
            }
      }

  }
    function drawHeads(){
        for(var i = 0; i < heads.length; i++){
            heads[i].element.style.top = heads[i].y + "px";
            heads[i].element.style.left = heads[i].x + "px";
        }
    }
    function doLoop(){
        update();
        drawHeads();
    }
  
  setInterval(doLoop, 1000/30);
