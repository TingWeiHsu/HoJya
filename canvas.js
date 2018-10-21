
const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

// rect
// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100,100,100,100);

//circle
// c.beginPath();
// c.arc(300,300,30,0, Math.PI * 2, false);
// c.strokeStyle = "black";
// c.stroke();

// for ( let i = 0 ; i < 5 ; i ++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc( x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = "black";
//     c.stroke();
// }

    // let x = Math.random() * innerWidth;
    // let y = Math.random() * innerHeight;
    // let dx = (Math.random() - 0.5)* 8;
    // let dy = (Math.random() - 0.5)* 8;
    // let radius = 30;

    // function animate() {
    //     requestAnimationFrame(animate);
    //     c.clearRect(0,0,innerWidth,innerHeight);

    //     c.beginPath();
    //     c.arc( x, y, radius, 0, Math.PI * 2, false);
    //     c.strokeStyle = "pink";
    //     c.stroke();

    //     if (x + radius > innerWidth || x - radius < 0) {
    //         dx = -dx;
    //     }

    //     if (y + radius > innerHeight || y - radius < 0){
    //         dy = -dy;
    //     }

    //     x += dx;
    //     x += dy;
    // }

    // animate();