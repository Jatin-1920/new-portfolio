

gsap.registerPlugin(ScrollTrigger)

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
if(window.innerWidth>=750){
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
} else{
  const mediaImage = document.querySelectorAll(".media-image")
  const imgs = document.querySelectorAll(".imgs")
  mediaImage.forEach(e =>{
    const lay = e.querySelector(".lay")
    gsap.to(lay,.75,{x:"100%",ease:"power3.inOut",scrollTrigger:{
      trigger:e,
      start:"top 20%",
      end:"bottom bottom",
    }})
    
  })
  imgs.forEach(e =>{
    gsap.to(e,1.25,{ease:"power3.inOut",scale:1,scrollTrigger:{
      trigger:e,
      start:"top 20%",
      end:"bottom bottom",
    }})
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
let canvas = document.querySelector(".canvas")
let footer = document.querySelector(".footer")
let ctx = canvas.getContext("2d")

canvas.width = footer.clientWidth
canvas.height = footer.clientHeight
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



