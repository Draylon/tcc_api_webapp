import React, { Component,useRef,useEffect, useState } from 'react';
import '../styles/AnimatedArchitecture.css';
import { gsap } from 'gsap/gsap-core';


const dist = ([x1, y1], [x2, y2])=>{
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy) || 1;
}

class Plus extends Component{
    
    constructor(props){
        super(props);
        this.x = 0;
        this.y = 0;
        this.top = 0;
        this.left = 0;
        this.height = 0;
        this.width = 0;
        this.scale = 1;
        this.rotate=0;
        this.opacity=0.25;
        /* this.state={
            x = 0,
            y = 0,
            top = 0,
            left = 0,
            height = 0,
            width = 0,
            scale = 1
        } */
        this.draw = (ctx)=>{
            ctx.save();
            ctx.beginPath();
            ctx.setTransform(
                this.scale,
                0,
                0,
                this.scale,
                this.left + this.x,
                this.top + this.y
            );
            ctx.lineWidth = 1.4;
            ctx.strokeStyle=`rgba(255,255,255,${this.opacity})`;
            ctx.rotate(this.rotate);

            ctx.moveTo(-this.width / 2, -this.height / 2);
            ctx.lineTo(this.width / 2, this.height / 2);
        
            ctx.moveTo(-this.width / 2, this.height / 2);
            ctx.lineTo(this.width / 2, -this.height / 2);
        
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        };
    }
}

function frag(x1,y1,x2,y2,s,r,a){
    let ab = {x: x2-x1,y: y2-y1};
    //let len = Math.sqrt(Math.pow(ab.x,2) + Math.pow(ab.y,2));
    //len = r
    // ?  = s
    let current = s/r;
    let next = (s+a)/r;
    return {
        from: {x: x1+ab.x*current,y: y1+ab.y*current},
        to: {x: x1+ab.x*next,y: y1+ab.y*next}
    };
}

class FluxParticleLine extends Component{
    constructor(props){
        super(props);
        this.scale = 1;
        this.from = null;
        this.to = null;
        this.progress=Math.floor(Math.random()*21);
        this.limit=45;

        this.draw = (ctx)=>{

            if(!this.from || !this.to) return;
            ctx.save();
            ctx.beginPath();
            ctx.setTransform(
                this.scale,
                0,
                0,
                this.scale,
                0,
                0,
            );
            let s = this.progress;
            let r = this.limit;
            ctx.lineWidth = 5;
            ctx.strokeStyle = `rgb(
                ${Math.floor(255*s/r - 100)},
                ${Math.floor(255-86.40*s/r)},
                ${Math.floor(255-86.40*Math.sin(Math.PI*s/r))}
            )`

            let path = frag(
                (ctx.canvas.width/2) - this.from.left + this.from.kx,
                (ctx.canvas.height/2) - this.from.top + this.from.ky,
                (ctx.canvas.width/2) - this.to.left + this.to.kx,
                (ctx.canvas.height/2) - this.to.top + this.to.ky,
                this.progress,this.limit,3
            )
            ctx.moveTo(path.from.x,path.from.y)
            ctx.lineTo(path.to.x,path.to.y);
            /* ctx.moveTo(
                ctx.canvas.width/2 - this.from.left + this.from.kx,
                ctx.canvas.height/2 - this.from.top + this.from.ky
            );
            ctx.lineTo(
                ctx.canvas.width/2 - this.to.left + this.to.kx,
                ctx.canvas.height/2 - this.to.top + this.to.ky
            ); */
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            this.progress+=1;
            if(this.progress>=this.limit-3) this.progress=0;
        };
    }
}

const AnimatedCanvas2 = props => {
    const { predraw=_predraw, postdraw=_postdraw, onResize=_resizeCanvas, ...rest } = props
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId
        //anim
        let signs = [];
        let mouse = { x: 0, y: 0 };
        let gridLength = 9;
        let mouseOver = false;
        let mouseMoved = false;

        const mouseMove = (e)=>{
            if (e.targetTouches && e.targetTouches[0]) {
                e = e.targetTouches[0];
            }
            var rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouseMoved = true;
        }
        const mouseLeave = ()=>{
            mouseOver = false;
            
            for (var i = 0; i < gridLength; i++) {
                for (var j = 0; j < gridLength; j++) {
                var sign = signs[i][j];
                if (!mouseOver) {
                    //TweenMax.to(sign, 0.3, { x: 0, y: 0, scale: 1 });
                }
                }
            }
        }

        // Create sign grid using 2D array
        for (var i = 0; i < gridLength; i++) {
            signs[i] = [];
            for (var j = 0; j < gridLength; j++) {
            var min = Math.min(canvas.width, canvas.height);
            signs[i][j] = new Plus();
            signs[i][j].left = canvas.width / (gridLength + 1) * (i + 1);
            signs[i][j].top = canvas.height / (gridLength + 1) * (j + 1);
            signs[i][j].width = min / 50;
            signs[i][j].height = min / 50;
            }
        }
        
        // Use GSAP ticker to call draw function on every frame that will draw signs to the canvas
        // You can use requestAnimationFrame as well
        
        //TweenLite.ticker.addEventListener("tick", draw);
        canvas.addEventListener("mousemove", mouseMove);
        canvas.addEventListener("touchmove", mouseMove);
        canvas.addEventListener("mouseenter", function() {
            mouseOver = true;
        });

        canvas.addEventListener("touchstart", function(e) {
        mouseOver = true;
        mouseMove(e);
        });

        canvas.addEventListener("mouseleave", mouseLeave);
        canvas.addEventListener("touchend", mouseLeave);

        const draw = ()=>{
            context.clearRect(0, 0, canvas.width, canvas.height);
        
            if (mouseOver && mouseMoved) {
                for (var i = 0; i < gridLength; i++) {
                    for (var j = 0; j < gridLength; j++) {
                    var sign = signs[i][j];
                    var hyp = Math.min(canvas.width, canvas.height) / (gridLength + 1) / 2;
                    var d = dist([sign.left, sign.top], [mouse.x, mouse.y]);
                    var ax = mouse.x - sign.left;
                    var ay = mouse.y - sign.top;
                    var angle = Math.atan2(ay, ax);
                    if (d < hyp + sign.width) {
                        hyp = d;
                        //TweenMax.to(sign, 0.3, { scale: 2 });
                    } else {
                        //TweenMax.to(sign, 0.3, { scale: 1 });
                    }
                
                    /* TweenMax.to(sign, 0.3, {
                        x: Math.cos(angle) * hyp,
                        y: Math.sin(angle) * hyp
                    }); */
                    }
                }
                mouseMoved = false;
            }
        
            for (var i = 0; i < gridLength; i++) {
                for (var j = 0; j < gridLength; j++) {
                    var sign = signs[i][j];
                    sign.draw(context);
                }
            }
        }

        const render = () => {
            draw();
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()
        
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [])
    
    return <canvas ref={canvasRef} {...rest}/>
}

const _resizeCanvas = (canvas)=>{
    const { width, height } = canvas.getBoundingClientRect()
    
    if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio:ratio=1 } = window
        const context = canvas.getContext('2d')
        canvas.width = width*ratio
        canvas.height = height*ratio
        context.scale(ratio, ratio)
        return true
    }
    return false
}
const _postdraw = (ctx) => {
    ctx.restore()
}

const _predraw = (context, canvas) => {
    context.save()
    _resizeCanvas(context, canvas)
    const { width, height } = context.canvas
    context.clearRect(0, 0, width, height)
}

const _draw2 = (ctx, frameCount) => {
    ctx.save();
    ctx.beginPath();
    ctx.setTransform(
        this.scale,
        0,
        0,
        this.scale,
        this.left + this.x,
        this.top + this.y
    );
    ctx.lineWidth = 2;

    ctx.moveTo(0, -this.height / 2);
    ctx.lineTo(0, this.height / 2);

    ctx.moveTo(-this.width / 2, 0);
    ctx.lineTo(this.width / 2, 0);

    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

/* const AnimatedCanvas3 = props=>{
        const { draw, fps = 30, establishContext, establishCanvasWidth, width = "100%", height = "100%", ...rest } = props;
        const canvasRef = useRef(null);
        const [context, setContext] = useState(null);`
        
        `
        useEffect(() => {
            let frameCount = 0;
            let animationFrameId, fpsInterval, now, then, elapsed;
    
            if (context) {
                const render = () => {
                    animationFrameId = window.requestAnimationFrame(render);
                    now = Date.now();
                    elapsed = now - then;
                    if (elapsed > fpsInterval) {
                        // Get ready for next frame by setting then=now, but also adjust for your
                        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
                        then = now - (elapsed % fpsInterval);
                        frameCount++;
                        draw();
                    }
                };
                const startRendering = (fps) => {
                    fpsInterval = 1000 / fps;
                    then = Date.now();
                    render();
                };
                startRendering(fps);
            }
            return () => {
                window.cancelAnimationFrame(animationFrameId);
            };
        }, [draw, context, resizeCanvas]);
        return (
            <canvas ref={canvasRef} {...rest} style={{ backgroundColor: "#000", width, height, position: "absolute" }} />
        );
    
}
 */

const MatrixParticle = (props) => {

    /* const mouseOver=useRef(false);
    const mouse = useRef({x:0,y:0});
    let grid = [];
    const gridLength = 9;

    const draw2 = () => {
        console.log("panik panik panik");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = "#000000";
        context.beginPath();
        context.arc(50, 100, 20 * Math.sin(450 * 0.05) ** 2, 0, 2 * Math.PI);
        context.fill();
    };

    const mouseEnter = (e)=>{
        mouseOver=true;
    }
    const mouseLeave = (e)=>{
        mouseOver=false;
    }
    const mouseMove = (e)=>{
        mouseOver=true;
        mouse.current.x=e.pageX;
        mouse.current.y=e.pageY;
    }

    const resizeCanvas = (canvas)=>{
        const { width, height } = canvas.getBoundingClientRect()
        
        if (canvas.width !== width || canvas.height !== height) {
            const { devicePixelRatio:ratio=1 } = window
            const context = canvas.getContext('2d')
            canvas.width = width*ratio
            canvas.height = height*ratio
            context.scale(ratio, ratio)
            return true
        }
        return false
    }
    // Create sign grid using 2D array
    for (var i = 0; i < gridLength; i++) {
        grid[i] = [];
        for (var j = 0; j < gridLength; j++) {
        var min = Math.min(canvas.width, canvas.height);
        grid[i][j] = new Plus();
        grid[i][j].left = canvas.width / (gridLength + 1) * (i + 1);
        grid[i][j].top = canvas.height / (gridLength + 1) * (j + 1);
        grid[i][j].width = min / 50;
        grid[i][j].height = min / 50;
        }
    } */




    const [ctx, setCtx] = useState(null);
    const [canvasWidth, setCanvasWidth] = useState(null);

    const establishContext = (context) => {
        setCtx(context);
    };

    const establishCanvasWidth = (width) => {
        console.log("canvas width is: "+width);
        setCanvasWidth(width);
    };

    // Setting up the letters
    // Move the array outside draw so it is not needlessly recalculated on each call to draw
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ";
    const letters = chars.split("");

    // Font-size remains constant, so similarly move outside draw
    const fontSize = 10;
    // Setting up the columns
    const columns = canvasWidth ? canvasWidth / fontSize : 10;
    // Setting up the drops
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    const images = [];
    const imageSrc = [
        {
            name:"mongo",
            x:-150,y: -150,
            size: 300,
            src:"https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg"
        },
        {
            "name":"mqtt",
            x: 150,y: -150,
            size: 300,
            "src": "https://mosquitto.org/images/mosquitto-text-side-28.png"
        },
        {
            name:"api",
            x: -150,y:150,
            size: 120,
            src: "https://cdn-icons-png.flaticon.com/512/967/967579.png"
        },
        {
            name:"apps",
            x: 150,y: 150,
            size: 120,
            src: "https://cdn-icons-png.flaticon.com/512/3459/3459528.png"
        }
    ];
    
    useEffect(()=>{
        imageSrc.forEach((k,v) => {
            let i1 = new Image();
            i1.onload = (e)=>{
                createImageBitmap(i1,{resizeWidth:k.size,resizeQuality: 'high'}).then(img =>{
                    i1.bmp = img;
                })
            }
            i1.src=k.src;
            i1.alt=k.name;
            i1.defsize = k.size;
            i1.kx =k.x;
            i1.ky =k.y;
            images.push(i1);
        });
    },[]);

    

    const convertMousePosToRowsAndCols = (x, y) => {
        if(ctx){
            // get col position
            const col = Math.floor(x / fontSize);

            // get row pos
            const row = Math.min(Math.ceil(y / fontSize), Math.floor(ctx.canvas.height));

            return { row, col };
        }else{
            return {row:0,col:0};
        }
    };

    // Disturbance Effect Handlers
    let disturbanceRow = -1;
    let disturbanceCol = -1;
    let timeout;

    const disturbanceEffect = (e) => {
        clearTimeout(timeout);
        const bounds = e.target.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        const { row, col } = convertMousePosToRowsAndCols(x, y);
        disturbanceRow = row;
        disturbanceCol = col;
        timeout = setTimeout(() => {
            disturbanceRow = -1;
            disturbanceCol = -1;
        }, 50);
    };

    const isDisturbanceAffectedPosition = (dropIndex) => {
        return drops[dropIndex] * fontSize > disturbanceRow && dropIndex === disturbanceCol;
    };

    const draw = () => {
        if (ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, .1)";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillStyle = "#0f0";
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                drops[i]++;
                if (drops[i] * fontSize > ctx.canvas.height && Math.random() > 0.95) {
                    drops[i] = 0;
                }
                if (isDisturbanceAffectedPosition(i)) {
                    const h = Math.max(i - 1, 0);
                    const j = Math.min(i + 1, Math.floor(columns));
                    drops[h] = disturbanceRow;
                    drops[i] = disturbanceRow;
                    drops[j] = disturbanceRow;
                }
            }

            images.forEach(img =>{
                if(img.complete && img.naturalHeight !== 0){
                    let ratio = img.naturalHeight / img.naturalWidth;
                    //console.log(img.alt+" "+ratio+" "+Number(img.kx)+" "+Number(img.ky)+" "+(Number(img.defsize)+Number(img.kx))+" "+(Number(img.ky) + Number(img.defsize*ratio)));
                    
                    //            image,    sx, sy, sWidth,             sHeight,            dx,     dy,     dWidth,             dHeight
                    ctx.drawImage(img.bmp,ctx.canvas.width / 2 - img.kx - img.bmp.width/2,ctx.canvas.height/2 - img.ky - img.bmp.height/2);
                }
            })
        }
    };

    return (
        <AnimatedCanvas
            draw={draw}
            onMouseMove={disturbanceEffect}
            establishContext={establishContext}
            establishCanvasWidth={establishCanvasWidth}
            /* onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onMouseMove={mouseMove}
            onTouchMove={mouseMove}
            onTouchStart={mouseEnter}
            onTouchEnd={mouseLeave} */
        />
    );
};

const FloatParticle = (props) => {

    const [ctx, setCtx] = useState(null);
    const [canvasWidth, setCanvasWidth] = useState(null);
    const [redrawFlip,setRedrawFlip] = useState(false);

    const establishContext = (context) => {
        setCtx(context);
    };

    const establishCanvasWidth = (width) => {
        console.log("canvas width is: "+width);
        setCanvasWidth(width);
    };




    const mouseOver=useRef(false);
    const mouseMoved=useRef(false);
    const mouse = useRef({x:0,y:0});
    let grid = [];
    const gridLength = 10;

    const lines = useRef([]);
    const images = useRef([]);
    const imageSrc = [
        {
            name:"mongo",
            x: -200,y: 200,
            size: 140,
            src: "https://miro.medium.com/v2/resize:fit:640/format:webp/1*doAg1_fMQKWFoub-6gwUiQ.png",
            filter: "none",
            //src:"https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg",
            //filter:'invert(1)',
            title: "MongoDB - Database",
            desc: "Aplicação de controle de banco de dados, utilizado para armazenar dados variados em larga escala, e elaborar filtros de busca por dados da aplicação."
        },
        {
            name:"api",
            x: -100,y:0,
            size: 140,
            src: "https://cdn-icons-png.flaticon.com/512/967/967579.png",
            filter:'invert(1)',
            title: "API",
            desc:"Centralizador de toda a aplicação, comunicando MongoDB, aplicações e mensageria",
        },
        {
            name:"iot",
            x: 200,y: 150,
            size: 140,
            src: "https://cdn-icons-png.flaticon.com/512/1185/1185915.png",
            filter:'invert(1)',
            title: "Sensoreamento",
            desc: "Conjunto de dispositivos responsáveis pelo sensoreamento do mundo real, que alimentam a API com dados através de Gateways conectados à Internet."
        },
        {
            name:"apps",
            x:-230,y: -200,
            size: 140,
            src: "https://cdn-icons-png.flaticon.com/512/3459/3459528.png",
            filter:'none',
            title: "Aplicações WEB",
            desc: "Aplicações que utilizam do sistema para fornecer informação útil."
        },
        {
            name:"mobile",
            x:50,y: -200,
            size: 80,
            src: "https://static-00.iconduck.com/assets.00/flutter-icon-413x512-4picx6vy.png",
            filter:'none',
            title: "Aplicações Mobile",
            desc: "Mobile também beneficia do sistema, podendo fornecer soluções e informativos de forma portável e assíncrona."
        },
        {
            "name":"mqtt",
            x: 200,y: -50,
            size: 300,
            "src": "https://mosquitto.org/images/mosquitto-text-side-28.png",
            filter:'none',
            title: "Mosquitto MQTT",
            desc: "Serviço de mensageria responsável por remover o critério de disponibilidade",
        },
    ];
    const rel = [
        {from: "mqtt",to:"iot"},
        {from: "iot",to:"mqtt"},
        
        {from: "mongo",to:"api"},
        {from: "api",to:"mongo"},
        
        {from: "api",to:"mqtt"},
        {from: "mqtt",to:"api"},
        
        {from: "api",to:"apps"},
        {from: "apps",to:"api"},
        
        {from: "apps",to:"mqtt"},
        {from: "mqtt",to:"apps"},
        
        {from: "mqtt",to:"mobile"},
        {from: "mobile",to:"mqtt"},

        {from: "api",to:"mobile"},
        {from: "mobile",to:"api"},
    ];
    


    const mouseEnter = (e)=>{
        mouseOver.current=true;
    }
    const mouseLeave = (e)=>{
        doDrawText.current=false;
        mouseOver.current=false;
        for (var i = 0; i < gridLength; i++) {
            for (var j = 0; j < gridLength; j++) {
            var sign = grid[i][j];
            gsap.to(sign, { x: 0, y: 0, scale: 1,duration:0.3,rotate:0,opacity: 0.25});
            }
        }
        images.current.forEach(img=>{
            gsap.to(img, { kx: 0,ky:0,duration: 0.5});
        })
          
    }
    const mouseMove = (e)=>{
        let r=ctx.canvas.getBoundingClientRect();
        mouseMoved.current=true;
        mouse.current.x=e.clientX-r.left;
        mouse.current.y=e.clientY-r.top;
    }

    const resizeCanvas = (canvas)=>{
        const { width, height } = canvas.getBoundingClientRect()
        
        if (canvas.width !== width || canvas.height !== height) {
            const { devicePixelRatio:ratio=1 } = window
            const context = canvas.getContext('2d')
            canvas.width = width*ratio
            canvas.height = height*ratio
            context.scale(ratio, ratio)
            return true
        }
        return false
    }
    if(ctx){
        // Create sign grid using 2D array
        for (var i = 0; i < gridLength; i++) {
            grid[i] = [];
            for (var j = 0; j < gridLength; j++) {
            var min = Math.min(ctx.canvas.width, ctx.canvas.height);
            grid[i][j] = new Plus();
            grid[i][j].left = ctx.canvas.width / (gridLength + 1) * (i + 1);
            grid[i][j].top = ctx.canvas.height / (gridLength + 1) * (j + 1);
            grid[i][j].width = min / 70;
            grid[i][j].height = min / 70;
            }
        }
    }

    useEffect(()=>{
        images.current = [];
        lines.current=[];
        
        
        
        imageSrc.forEach((k,v) => {
            let i1 = new Image();
            i1.onload = (e)=>{
                createImageBitmap(i1,{resizeWidth:k.size,resizeQuality: 'high'}).then(img =>{
                    i1.bmp = img;
                })
            }
            i1.scale = 1;
            i1.src=k.src;
            i1.alt=k.name;
            i1.defsize = k.size;
            i1.kx =k.x/4.5;
            i1.ky =k.y/4.5;
            i1.left =k.x;
            i1.top =k.y;
            i1.filter = k.filter;
            i1.imgtitle = k.title;
            i1.imgdesc = k.desc;
            images.current.push(i1);
        });
        
        rel.forEach((k,v)=>{
            let from_ = images.current.filter(x=>x.alt==k.from)[0]
            let to_ = images.current.filter(x=>x.alt==k.to)[0]
            if(from_ && to_){
                let l1 = new FluxParticleLine();
                l1.from = from_
                l1.to = to_
                l1.scale = 1;
                lines.current.push(l1);
            }
        })
    },[]);

    

    /* const convertMousePosToRowsAndCols = (x, y) => {
        if(ctx){
            // get col position
            const col = Math.floor(x / fontSize);

            // get row pos
            const row = Math.min(Math.ceil(y / fontSize), Math.floor(ctx.canvas.height));

            return { row, col };
        }else{
            return {row:0,col:0};
        }
    }; */

    // Disturbance Effect Handlers
    /* let disturbanceRow = -1;
    let disturbanceCol = -1;
    let timeout; */

    /* const disturbanceEffect = (e) => {
        clearTimeout(timeout);
        const bounds = e.target.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        const { row, col } = convertMousePosToRowsAndCols(x, y);
        disturbanceRow = row;
        disturbanceCol = col;
        timeout = setTimeout(() => {
            disturbanceRow = -1;
            disturbanceCol = -1;
        }, 50);
    }; */

    /* const isDisturbanceAffectedPosition = (dropIndex) => {
        return drops[dropIndex] * fontSize > disturbanceRow && dropIndex === disturbanceCol;
    };
 */

    const printAtWordWrap = ( context , text, x, y, lineHeight, fitWidth)=>{
        if(text=="")return;
        fitWidth = fitWidth || 0;
        
        if (fitWidth <= 0){
            context.fillText( text, x, y );
            return;
        }
        var words = text.split(' ');
        var currentLine = 0;
        var idx = 1;
        while (words.length > 0 && idx <= words.length){
            var str = words.slice(0,idx).join(' ');
            var w = context.measureText(str).width;
            if ( w > fitWidth ){
                if (idx==1){
                    idx=2;
                }
                context.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) );
                currentLine++;
                words = words.splice(idx-1);
                idx = 1;
            }
            else
            {idx++;}
        }
        if  (idx > 0) context.fillText( words.join(' '), x, y + (lineHeight*currentLine) );
    }

    let drawnTitle = "";
    let drawnDesc = "";
    let drawnPos = {x:0,y: 0};

    const doDrawText=useRef(false);
    const draw = () => {
        if (ctx) {
            ctx.fillStyle = "	#1e2124";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            if (mouseOver.current && mouseMoved.current) {
                mouseMoved.current=false;
                for (var i = 0; i < gridLength; i++) {
                    for (var j = 0; j < gridLength; j++) {
                        var sign = grid[i][j];
                        var hyp = Math.min(ctx.canvas.width, ctx.canvas.height) / (gridLength + 1) / 2;
                        var d = dist([sign.left, sign.top], [mouse.current.x, mouse.current.y]);
                        var ax = mouse.current.x - sign.left;
                        var ay = mouse.current.y - sign.top;
                        var angle = Math.atan2(ay, ax);
                        if (d < hyp + sign.width) {
                            hyp = d;
                            gsap.to(sign,{scale:2,duration:0.3,rotate:0.785398163397448,opacity: 1})
                        } else {
                            gsap.to(sign,{scale: 1,duration:0.3,rotate:0,opacity: 0.25})
                        }
                        gsap.to(sign,{
                            duration:0.3,
                            x: Math.cos(angle) * hyp,
                            y: Math.sin(angle) * hyp
                        })
                    }
                }

                images.current.forEach(img =>{
                    var hyp = Math.min(ctx.canvas.width, ctx.canvas.height) / (gridLength + 1) / 2;
                    var d = dist([ctx.canvas.width/2 - img.left, ctx.canvas.height/2 - img.top], [mouse.current.x, mouse.current.y]);
                    var ax = mouse.current.x - (ctx.canvas.width/2 - img.left);
                    var ay = mouse.current.y - (ctx.canvas.height/2 - img.top);
                    var angle = Math.atan2(ay, ax);
                    if (d < hyp + 50) {
                        doDrawText.current=true;
                        drawnTitle=img.imgtitle;
                        drawnDesc=img.imgdesc;
                        drawnPos.x=img.left < 0? 350:-700;//(ctx.canvas.width/2) + ax;
                        drawnPos.y=img.top<0? 250:-250;//(ctx.canvas.height/2)+ ay;
                        drawnPos.x+=ctx.canvas.width/2;
                        drawnPos.y+=ctx.canvas.height/2;
                        hyp = d;
                        gsap.to(img,{scale:1.3,duration:0.3})
                    } else {
                        gsap.to(img,{scale: 1,duration:0.3})
                    }
                    gsap.to(img,{
                        duration:0.3,
                        kx: Math.cos(angle) * hyp,
                        ky: Math.sin(angle) * hyp
                    })
                })
                mouseMoved.current = false;
            }
        
            for (var i = 0; i < gridLength; i++)
                for (var j = 0; j < gridLength; j++)
                    grid[i][j].draw(ctx);
                
            images.current.forEach(img =>{
                if(img.complete && img.naturalHeight !== 0 && img.bmp != undefined){
                    //let ratio = img.naturalHeight / img.naturalWidth;
                    //console.log(img.alt+" "+ratio+" "+Number(img.kx)+" "+Number(img.ky)+" "+(Number(img.defsize)+Number(img.kx))+" "+(Number(img.ky) + Number(img.defsize*ratio)));
                    
                //            image,    sx,                                                   sy,                                             sWidth,             sHeight,            dx,     dy,     dWidth,             dHeight
                    ctx.filter = img.filter;
                    ctx.drawImage(img.bmp,  ctx.canvas.width / 2 - img.left +img.kx - img.bmp.width/2,ctx.canvas.height/2 - img.top+img.ky - img.bmp.height/2);
                }
            })

            lines.current.forEach(line=>{
                line.draw(ctx);
            })

            if(doDrawText.current==true){
                console.log("drawing");
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.font = "30px Arial";
                printAtWordWrap(ctx,drawnTitle,drawnPos.x,drawnPos.y+20,20,350);
                ctx.font = "15px Arial";
                printAtWordWrap(ctx,drawnDesc,drawnPos.x,drawnPos.y+60,20,350);
                //ctx.strokeText(drawnDesc,40,70);
            }
        }
    };

    return (
        <AnimatedCanvas
            draw={draw}
            establishContext={establishContext}
            establishCanvasWidth={establishCanvasWidth}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onMouseMove={mouseMove}
            onTouchMove={mouseMove}
            onTouchStart={mouseEnter}
            onTouchEnd={mouseLeave}
        />
    );
};

const AnimatedCanvas = props=>{
  
    const { draw,fps = 30,establishContext, establishCanvasWidth, width = "100%", height = "100%", ...rest } = props;
    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);

    const resizeCanvas = (canvas)=>{
        const { width, height } = canvas.getBoundingClientRect()
        
        if (canvas.width !== width || canvas.height !== height) {
            const { devicePixelRatio:ratio=1 } = window
            const context = canvas.getContext('2d')
            canvas.width = width*ratio
            canvas.height = height*ratio
            context.scale(ratio, ratio)
            return true
        }
        return false
    }

    useEffect(() => {
        //i.e. value other than null or undefined
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            setContext(ctx);
            resizeCanvas(canvas);
            if(establishCanvasWidth){
                establishCanvasWidth(canvas.width);
            }
            if (establishContext) {
                establishContext(ctx);
            }
        }
    }, []);

    useEffect(() => {
        let animationFrameId, fpsInterval, now, then, elapsed;

        //i.e. value other than null or undefined
        

        if (context) {
            const render = () => {
                animationFrameId = window.requestAnimationFrame(render);
                now = Date.now();
                elapsed = now - then;
                if (elapsed > fpsInterval) {
                    // Get ready for next frame by setting then=now, but also adjust for your
                    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
                    then = now - (elapsed % fpsInterval);
                    draw();
                }
            };
            const startRendering = (fps) => {
                fpsInterval = 1000 / fps;
                then = Date.now();
                render();
            };
            startRendering(fps);
        }
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw, context, resizeCanvas]);
    

    return (<canvas ref={canvasRef} { ...rest } style={{ backgroundColor: "#222", width, height, position: "absolute" }}/>);
}


const AnimatedArchitecture = ()=>{
    /* <div className='abcl_content'>
        <div className='abcl_block'>
            <img src='../sla.jpg'/>
            <p>Aplicações</p>
        </div>
        <div className='abcl_block'>
            <img src='https://mosquitto.org/images/mosquitto-text-side-28.png' style={{width: "350px"}}/>
            <p>Mosquitto</p>
        </div>
        <div className='abcl_block'>
            <img src='../sla.jpg'/>
            <p>API</p>
        </div>
        <div className='abcl_block'>
            <img src='https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg' style={{width: "350px"}}/>
            <p>MongoDB</p>
        </div>
    </div> */
    return (
        <div className='architecture_basecl'>
            <FloatParticle className='abcl_dotMatrix'/>
        </div>);
}

export default AnimatedArchitecture;