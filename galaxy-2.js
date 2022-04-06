let cv  = document.querySelector('canvas'),
    c   = cv.getContext('2d');

    cv.width  = window.innerWidth;
    cv.height = window.innerHeight  - 3.1;



    window.addEventListener('resize' , function() {
    cv.width  = window.innerWidth;
    cv.height = window.innerHeight - 3.01;
    init();
    });

    let mouseDown = false;
    addEventListener('mousedown' , () => {
        mouseDown = true;
    });
    addEventListener('mouseup' , () => {
        mouseDown = false;
    });


    // window.addEventListener('mouseup' , function() {
    //     mouseDown = false;
    // });


    function Particles(x, y , r , color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        
        
                this.draw = () => {
                    c.beginPath();
                    c.fillStyle = this.color;
                    c.shadowColor = this.color;
                    c.shadowBlur = 20;
                    c.arc(this.x , this.y , this.r ,0 , Math.PI * 2);
                    c.fill();
                    c.closePath();
                }
        
        
                this.update = () => {
                    this.draw();
                }
    } 



    let particles,
        colorArray = [
            '#D74177',
            '#A890FE',
            '#D8B5FF',
            '#6FD6FF',
            '#CD295A',
            '#1BFFFF',
            '#15678D',
            '#130CB7',
        ];
    function init() {
        particles = [];
        let cvWidth = cv.width + 700,
            cvHeight = cv.height + 700;

        for (let i = 0; i < 800; i += 1) {
            let x = Math.random() *cvWidth - cvWidth /2,
                y = Math.random() * cvHeight - cvHeight /2,
                r = Math.random() * 2,
                color = colorArray[Math.floor(Math.random() * colorArray.length)];

                particles.push(new Particles(x , y , r , color));
        }
    }

let radian = 0,
    alpha = 1;
    function animate() {
        requestAnimationFrame(animate);
        c.fillStyle = `rgba( 10, 10, 10 , ${alpha})`;
        c.fillRect(0 , 0 , innerWidth , innerHeight);

        c.save();
        c.translate(cv.width / 2 , cv.height /2);
        c.rotate(radian);
                particles.forEach(element => {
            element.update();
        });
        
        c.restore();
        radian += .001;
        

                if (mouseDown && alpha >= .01) {
                radian += .003;
            alpha -= .01;
        }
        else if (!mouseDown && alpha < 1) {
            alpha += .01;
        }

    }

init();
animate();