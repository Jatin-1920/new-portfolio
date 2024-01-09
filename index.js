



gsap.registerPlugin(ScrollTrigger,ScrambleText)


const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".gsapPin"),
  smooth: true,
  lerp:0.1,
  gestureDirection:"both",

  // for tablet smooth
  tablet: { smooth: true },

  // for mobile
  smartphone: { smooth: true }
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".gsapPin", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
})
  
// animations //
// Web Intro Animation //

const entry = document.querySelector(".entry")

function webIntro() {
  let gs = gsap.timeline()
  gs.to(entry,1,{
    y:-60,
    opacity:0,
    ease:"expo.inOut"
  }).to(".loader1",2,{
    width:200,
    ease:"power2.inOut"
  }) 
    gsap.to(".loader2",2,{
    width:100,
      delay:1.9,
    ease:"power2.inOut"
  })
      gsap.to(".loader",0,{
    background:"none",
        delay:5
  })
  gsap.to(".loader1",.5,{
    y:-50,
    rotate:90,
    ease:"expo.inOut",
    delay:5
  })
  gsap.to(".loader2",.5,{
    y:75,
    x:-75,
    ease:"expo.inOut",
    delay:5
  })
  
  gsap.to(".loader",1,{
    delay:5.75,
    ease:"expo.inOut",
    scale:50,
    x:2200,
    y:1000,
    rotate:45
  })

  gsap.to(".web-intro",.5,{
    delay:6.25,
    opacity:0,
    ease:"power1.inOut"
  })
  
    gsap.to(".web-intro",0,{
      delay:6.76,
    display:"none"
  })
}

entry.addEventListener("click",webIntro)
// Web Intro Animation //

// Card Stack Animation //


// Card Stack Animation //

const left = document.getElementById("left")
const header = document.querySelector(".header")
let mouse = document.querySelector(".mouse-event")
const handleMove = e => {
    const x = e.clientX / window.innerWidth * 100

    left.style.width = `${x}%`
}

header.onmousemove = e => handleMove(e)
header.ontouchmove = e => handleMove(e.touches[0])


const animated = e => {
    const x = e.pageX
    const y = e.pageY
    mouse.animate({
        left: `${x}px`,
        top: `${y}px`
    }, { duration: 1000, fill: "forwards" })
}
window.onmousemove = e => {
    const interatable = e.target.closest(".interact")
    const interacting = interatable !== null

    animated(e)
}

const menuToggle = document.querySelector(".menu-toggle")

const firstNav= document.querySelector(".first-nav")
const secondNav = document.querySelector(".second-nav")
const primaryNav = document.querySelector(".primary-nav")
const link = document.querySelectorAll(".primary-navigation a")
const image = document.querySelectorAll(".image")
const projectImage = document.querySelector(".work-container")
const project = document.querySelector(".project")
const content = document.querySelectorAll(".content")
const movieBtn = document.querySelector(".movie-btn")
const movie= document.querySelectorAll(".movie")
const panMovie = document.querySelector(".panMovie")
let state = false
let movieState = false;
menuToggle.addEventListener("click",(e)=>{
state = !state
  menuToggle.disabled = true
    setTimeout(()=>{
      menuToggle.disabled = false
    menuToggle.innerHTML = state ? "Close":"Menu"
  },1000 )
    
    if(state) {
    gsap.to(primaryNav,{display:"block"})
gsap.fromTo([firstNav,secondNav],{height:"0vh",skewY:3,transformOrigin:"right top"},{height:"100vh",skewY:0,duration:.8,ease:"Power3.inOut",stagger:{
    amount:.1
}})
      
    gsap.to(".movie-mask",{scale:1,opacity:1,delay:.5, duration:.5,ease:"Power3.inOut"})
} else{
      
      gsap.to(".movie-mask",{opacity:0,scale:0})
    gsap.to(primaryNav,{display:"none",delay:.65})
    gsap.to([secondNav,firstNav],{height:"0vh",duration:.65,ease:"Power3.inOut",stagger:{
        amount:.07
    }})
    }
})
const movieTimeline = gsap.timeline({paused:true})
    movieTimeline.to(".nav-movie-block",{duration:1,ease:"power3.inOut",clipPath:"polygon(49.75% 0%, 50.25% 0%, 50.25% 100%, 49.75% 100%)"});
    movieTimeline.to(".nav-movie-block",{duration:1,ease:"power3.inOut",clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"})
  
    
function showMask() {
  movieState = !movieState
  movieBtn.disabled = true;
  setTimeout(()=>{
    movieBtn.disabled = false
    movieBtn.innerHTML = movieState ? "Close":"Open"
  },1500 )
  if(movieState){
    movieTimeline.play()
  } else{
    movieTimeline.reverse()
  }
}

movieBtn.addEventListener("click",showMask)

function showMovie(movi){
 gsap.to(panMovie,.4,{opacity:1,backgroundImage:`url(${movi})`,ease:"power3.inOut"}) 
gsap.from(panMovie,.4,{  skewY: 2,
    transformOrigin: "right top"})
}

movie.forEach(movie=>{
  movie.addEventListener("mouseover",e =>{
    showMovie(e.target.dataset.movie)
  })
 movie.addEventListener("mouseleave",e =>{
   panMovie.style.backgroundImage=""

  }) 
})

link.forEach(li=>{
    
    li.addEventListener("mouseover",(e)=>{
        gsap.to(e.target,{skewX:4,y:3,duration:0.3,ease:"Power3.inOut"
    })
    })
    li.addEventListener("mouseleave",(e)=>{
        gsap.to(e.target,{skewX:0,y:-3,duration:0.3,ease:"Power3.inOut"
    })
    })
})
let isScrollingDown = true
let currentScroll = 0

const photos =gsap.utils.toArray(".image:not(:first-child)")
const allPhotos = gsap.utils.toArray(image)
const contentSection = gsap.utils.toArray(".content:not(:first-child)")
if(window.innerWidth>750){
    gsap.set(photos,{yPercent:101})
ScrollTrigger.create({
    trigger:project,
    start:"top top",
    end:"bottom bottom",
    pin:projectImage
}) 

contentSection.forEach((details,index)=>{
    let headline = details.querySelector("h1")
    let animation = gsap.timeline().to(photos[index],{yPercent:0}).set(allPhotos[index],{autoAlpha:0}).to(".content-container",{background:`${details.dataset.color}`,color:`${details.dataset.clr}`,duration:2,ease:"linear"})
    ScrollTrigger.create({
        trigger:headline,
        start:"top 80%",
        end:"top 50%",
        animation:animation,
        scrub:true
    })
})
} else {
  const mediaImage = document.querySelectorAll(".content")
  
  mediaImage.forEach(e =>{
    const md = e.querySelector(".media-image")
    const imgs = md.querySelector(".imgs")
    const lay = e.querySelector(".lay")
    const h1 = e.querySelector("h1")
  const p = e.querySelector("p")
    const btn = e.querySelector(".linkbtn")
    gsap.set([h1,p,btn],{opacity:0,y:60})
    gsap.to(lay,1,{x:"100%",ease:"power3.inOut",scrollTrigger:{
      trigger:e,
      start:"top 20%",
      end:"bottom bottom",
    }})
    
    gsap.to(imgs,1.25,{ease:"power1.inOut",scale:1,scrollTrigger:{
      trigger:e,
      start:"top 20%",
      end:"bottom bottom",
    }})
    
  gsap.to([h1,p,btn],1,{ease:"power1.inOut",opacity:1,y:0,scrollTrigger:{
      trigger:e,
      start:"top 20%",
      end:"bottom bottom",
  }})

  })
  
}

// skills slider //

  let tween = gsap.to(".work-slide-text",{xPercent:-100,repeat:-1,duration:5,ease:"linear"}).totalProgress(0.5)
gsap.set(".work-slide",{xPercent:-50})

window.addEventListener("scroll",()=>{
    if(window.pageYOffset>currentScroll) {
        isScrollingDown = true    } else{
            isScrollingDown = false

        }
        gsap.to(tween,{
            timeScale:isScrollingDown ? 1 :-1
        })
        currentScroll = window.pageYOffset
})

// skills slider //


const races = document.querySelector(".races")
function getScrollAmount(){
    let racesWidth = races.scrollWidth
    return -(racesWidth-window.innerWidth)

}

const slider = gsap.to(races,{
    x:getScrollAmount,
    duration:5,ease:"none"

})

ScrollTrigger.create({
    trigger:".racesWrapper",
    start:"top  20%",
    end:()=> `+=${getScrollAmount()*-1}`,
    pin:true,
    scrub:1,
    invalidateOnRefresh:true,
    animation:slider,
})


    //  TEXT ANIMATION //




  gsap.to(".div",{ease:"none",duration:1,yPercent:-100, stagger:{
    amount:0.15
  },scrollTrigger:{
    trigger:".about-img",
    start:"top 10%",
    end:"bottom bottom"
  }})


const firstLine = document.querySelectorAll(".about-content h2 span")
const secondLine =document.querySelector(".about-title span")
gsap.to([firstLine,secondLine],{scrollTrigger:{
    trigger:".about-title",
    start:"top 20%",
    end:"bottom bottom",
    ease:"Power3.inOut",
},
duration:1,
    y: 0,
    stagger:0.05,
opacity:1})
gsap.to(".about .btn",{scrollTrigger:{
    trigger:".about-title",
    start:"top 20%",
    end:"bottom bottom",
    ease:"power2",
},width:"10rem",scale:1,duration:1})

// date //
const dates = document.querySelector(".date")
const times = document.querySelector(".times")
let date = new Date()
const year = date.getFullYear()
const month = date.getMonth() +1
const dated = date.getDate()

function showTime() {
  let now = new Date()
let seconds = now.getSeconds()
let mins = now.getMinutes()
let hours = now.getHours()

hours = hours < 10 ? "0" + hours:hours;
seconds = seconds 
  < 10 ? "0" + seconds:seconds
mins = mins < 10 ? "0" + mins:mins;

let currentTime = hours + ":" + mins + ":" + seconds
  times.innerHTML = currentTime
}
dates.innerHTML = dated + "-" + month + "-" + year
  showTime()
setInterval(showTime,1000)

let canvas = document.querySelector(".canvas")
let footer = document.querySelector(".footer")
let ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.lineCap = "round"
ctx.lineJoin = "round"
ctx.lineWidth = 100
ctx.strokeStyle ="green"

let drawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction= true

function draw(e) {
    if(!drawing) return ;
    ctx.beginPath() 
    ctx.moveTo(lastX,lastY)
    ctx.strokeStyle = `hsl(${hue},100%,50%)`
    ctx.lineTo(e.offsetX,e.offsetY)
    ctx.stroke()
    [lastX,lastY] = [e.offsetX,e.offsetY]
    hue++
    if(hue>=360){
        hue = 0
    }
}

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
canvas.addEventListener("mousedown",(e)=>{
    drawing= true
    [lastX,lastY] = [e.offsetX,e.offsetY]
  
})
canvas.addEventListener("mousemove",(e)=>{
   draw(e) 
})
canvas.addEventListener("mouseup",(e)=>{
    drawing= false
    clearCanvas()
})
canvas.addEventListener("mouseout",(e)=>{
    drawing= false
    clearCanvas()
})
gsap.to(".about-img", {
  scrollTrigger: {
      trigger:".about-img",
      scrub: true,
      pin:false
  }, 
  y:"-20vh",
  ease: "none"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

// circle animation //
const circleInner = document.querySelector(".circle-inner")
const circles = [...document.querySelectorAll(".circles")]

circles.shift()

let position = {
  circleOne:{x:0,y:0},
  circleTwo:{x:0,y:0},
  circleThree:{x:0,y:0},
  circleFour:{x:0,y:0},
}

let width = window.innerWidth;
let height = window.innerHeight;
 let x = 0;
let y = 0;


function lerps(start,end,t){
  return start * (1 - t) + end * t;
}

circleInner.addEventListener("mousemove",e => {
  x = e.clientX
  y = e.clientY
})

function animateCircle(){
  position.circleOne.x = lerps(position.circleOne.x,(x - (width / 2))*.2,.1);
  position.circleOne.y = lerps(position.circleOne.y,(y - (height / 2))*.2,.1)

  circles[0].style.transform = `translate(-50% , -50%) translate3d(${position.circleOne.x}px,${position.circleOne.y}px,0)`;


  position.circleTwo.x = lerps(position.circleTwo.x,(-x + (width / 2))*.2,.1);
  position.circleTwo.y = lerps(position.circleTwo.y,(y - (height / 2))*.2,.1)

  circles[1].style.transform = `translate(-50% , -50%) translate3d(${position.circleTwo.x}px,${position.circleTwo.y}px,0)`

  position.circleThree.x = lerps(position.circleThree.x,(x - (width / 2))*.2,.1);
  position.circleThree.y = lerps(position.circleThree.y,(-y + (height / 2))*.2,.1)

  circles[2].style.transform = `translate(-50% , -50%) translate3d(${position.circleThree.x}px,${position.circleThree.y}px,0)`

  position.circleFour.x = lerps(position.circleFour.x,(-x + (width / 2))*.2,.1);
  position.circleFour.y = lerps(position.circleFour.y,(-y + (height / 2))*.2,.1)

  circles[3].style.transform = `translate(-50% , -50%) translate3d(${position.circleFour.x}px,${position.circleFour.y}px,0)`

  requestAnimationFrame(animateCircle)
}
animateCircle()

// circle animation//

// Minimap Webpage //

/*
 let minimap = document.createElement('div')
let minimapSize = document.createElement('div')
let viewer = document.createElement('div')
let minimapContent = document.createElement('iframe')

let scale = 0.1
let realScale;

minimap.className = 'minimap_container';
minimapSize.className = 'minimap_size';
viewer.className = 'minimap_viewer';
minimapContent.className = 'minimap_content';
// Minimap Webpage //

minimap.append(minimapSize,viewer,minimapContent)

document.body.appendChild(minimap)

const minihtml = document.documentElement.outerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,'')

let iframeDoc = minimapContent.contentWindow.document

iframeDoc.open()
iframeDoc.write(minihtml)
iframeDoc.close()


function getDimensions(){
    let bodyWidth = document.body.clientWidth;
    let bodyRatio = document.body.clientHeight / bodyWidth;
    let winRatio = window.innerHeight / window.innerWidth;

    minimap.style.width = '15%';

    realScale = minimap.clientWidth / bodyWidth;

    minimapSize.style.paddingTop = `${bodyRatio * 100}%`
    viewer.style.paddingTop = `${winRatio * 100}%`;

    minimapContent.style.transform = `scale(${realScale})`;
    minimapContent.style.width = `${(100 / realScale)}%`
    minimapContent.style.height = `${(100 / realScale)}%`
}

function trackScroll(){
    viewer.style.transform = `translateY(${window.scrollY * realScale}px)`
}

getDimensions()

window.addEventListener('resize', getDimensions)
window.addEventListener('scroll', trackScroll) 

*/

/* .minimap_container{
    position:fixed;
    top:0px;
    left:0px;
    min-width:20px;
    width:100%;
    z-index:98;
}
.minimap_size{
    position:relative;
    z-index:50;
    border:2px solid white;
}

.minimap_viewer{
  width:100%;
    position: absolute;
    left:0;
    top:0;
    transform-origin:0 0;
    border:1px solid #787786;
    z-index:50;
}

.minimap_content{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    transform-origin:0 0;
    border:1px solid white;
    z-index:49;
} */
