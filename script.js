const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width= window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numberOfParticle = 10;

//measure title element
let titleElement=document.getElementById('title1');
let titleMeasurements = titleElement.getBoundingClientRect();
let title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: titleMeasurements.height  
}

class Particle 
{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = Math.random() *15 + 1;
        this.weight = Math.random() *5 + 1;
        this.directionX= Math.random();
    }
    update(){
        if(this.y > canvas.height){
            this.y = 0 - this.size;
            this.weight =Math.random() *1 +1;
            this.x= Math.random()*canvas.width *1.3;
        } 
        this.weight +=0.01;
        this.y += this.weight;
        this.x += this.directionX;

        // check for collision
        if (
            this.x < title.x + title.width &&
            this.x + this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y
        ){
            this.y -= 3;
            this.weight *= -0.2;
        }
    }
    draw(){
        ctx.fillStyle = '#99EDF3';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function init(){
    for (let i =0; i< numberOfParticle; i++){
        const x= Math.random() *canvas.width;
        const y= Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}
init();

function animate(){
    ctx.fillStyle = 'rgba(255, 255, 255 ,0.01)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0 ; i< particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();