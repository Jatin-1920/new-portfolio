

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".scrollContainer"),
  smooth: true
}); 


       locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".scrollContainer", {
        scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) :    locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".scrollContainer").style.transform ? "transform" : "fixed"
});


// Web Intro Animation //

const entry = document.querySelector(".entry")

function webIntro() {
  const gs = gsap.timeline()
  gs.to(entry,1,{
    y:-60,
    opacity:0,
    ease:"expo.inOut"
  }).to(".loader1",2,{
    width:200,
    ease:"expo.inOut"
  }).to(".loader2",2,{
    width:100,
    ease:"expo.inOut"
  }).to(".loader",{
    background:"none",
  })
  gsap.to(".loader1",0,{
    y:-50,
    rotate:90,
    ease:"expo.inOut",
    delay:5
  })
  gsap.to(".loader2",0,{
    y:75,
    x:-75,
    ease:"expo.inOut",
    delay:5
  })
  
  gsap.to(".loader",1,{
    delay:6.25,
    ease:"expo.inOut",
    scale:50,
    x:2200,
    y:1000,
    rotate:45
  })
  gsap.to(".web-intro",0,{
    delay:6.75,
    background:"none"
  })
  gsap.to(".loader",.5,{
    delay:6.25,
    opacity:0
  })
  gsap.to(".web-intro",0,{
    delay:6.75,
    display:"none"
  })
}

entry.addEventListener("click",webIntro)
// Web Intro Animation //

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
let state = false
gsap.registerPlugin(ScrollTrigger)


menuToggle.addEventListener("click",(e)=>{
state = !state
    gsap.set(".nav-social",{opacity:0,scale:0})
    menuToggle.innerHTML = state ? "Close":"Menu"
    if(state) {
    gsap.to(primaryNav,{display:"block"})
gsap.fromTo([firstNav,secondNav],{height:"0vh",skewY:3,transformOrigin:"right top"},{height:"100vh",skewY:0,duration:.8,ease:"Power3.inOut",stagger:{
    amount:.1
}})
    gsap.to(".nav-social",{scale:1,opacity:1,delay:.8, duration:.2,ease:"Power3.inOut"})
} else{
    gsap.to(primaryNav,{display:"none",delay:.65})
    gsap.to([secondNav,firstNav],{height:"0vh",duration:.65,ease:"Power3.inOut",stagger:{
        amount:.07
    }})
    }
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
if(window.innerWidth>=700){
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
} 
  

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
gsap.to(".about-img div",1,{y:"-100%",stagger:{
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

const date = new Date()
const year = date.getFullYear()
dates.innerHTML = year;
const canvas = document.querySelector(".canvas")
const footer = document.querySelector(".footer")
const ctx = canvas.getContext("2d")

canvas.width = footer.width
canvas.height = footer.height
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
    if(!drawing) return 
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
canvas.addEventListener("mouseDown",(e)=>{
    drawing= true
    [lastX,lastY] = [e.offsetX,e.offsetY]
})
canvas.addEventListener("mousemove",(e)=>{
   draw(e) 
})
canvas.addEventListener("mouseUp",(e)=>{
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
  y:"-10dvh",
  ease: "none"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
