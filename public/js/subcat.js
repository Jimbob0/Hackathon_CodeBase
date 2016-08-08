    var catDirx = 5;

    var subcat = document.getElementById('subcat');
    var cat_model = {
        x: -300,
        y: 100,
        vx: catDirx
    }
    var k = 0;
    function flip(){
        var j = document.getElementById('subcat');
        k += 180;
        j.style.transform = 'rotateY('+k+'deg)';
        j.style.transititonDuration = '0.5s'
    }
    function moveCat(){
        cat_model.x = cat_model.x + cat_model.vx;
        if(cat_model.x > 1440 && cat_model.vx > 0){
            cat_model.vx *= -1;
            flip();
        }
        if(cat_model.x < -150 && cat_model.vx < 0){
            cat_model.vx *= -1;
            flip();
        }
    }
    function draw(){
        subcat.style.top = cat_model.y + "px";
        subcat.style.left = cat_model.x + "px";
    }
    function loop() {
        moveCat()
        draw()
    }
    setInterval(loop, 1000/30);
