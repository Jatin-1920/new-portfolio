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
const link = document.querySelectorAll(".primary-navigation li")
const image = document.querySelectorAll(".image")
const projectImage = document.querySelector(".work-container")
const project = document.querySelector(".project")
const content = document.querySelectorAll(".content")
let state = false
gsap.registerPlugin(ScrollTrigger)
menuToggle.addEventListener("click",(e)=>{
state = !state
menuToggle.innerHTML = state ? "Close":"Menu"
if(state) {
    gsap.to(primaryNav,{display:"block"})
gsap.fromTo([firstNav,secondNav],{height:"0vh",skewY:3,transformOrigin:"right top"},{height:"100vh",skewY:0,duration:.8,ease:"Power3.inOut",stagger:{
    amount:.1
}})
    gsap.from(".nav-social",{scale:0,opacity:0,delay:1, duration:1,ease:"Power3.inOut"})
} else{
    gsap.to(".nav-social",{scale:0, opacity:0, duration:.5,ease:"Power3.inOut"})
    gsap.to(primaryNav,{display:"none",delay:.65})
    gsap.to([secondNav,firstNav],{height:"0vh",duration:.65,ease:"Power3.inOut",stagger:{
        amount:.085
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
    let animation = gsap.timeline().to(photos[index],{yPercent:0}).set(allPhotos[index],{autoAlpha:0}).to(".content-container",{background:`${details.dataset.color}`,duration:1,ease:"linear"})
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
    animation:slider
})


    //  TEXT ANIMATION //


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


// contact mask image //
const timeLine =gsap.timeline().from(".bus",{scale:2, duration:2}).to(".mask",{
    clipPath:"polygon(0% 0%,100% 0%,100% 100%,0% 100%)"
},0).to(".mask",{scale:1,duration:1}).from(".soc-el",{scale:0,opacity:0, duration:1,ease:"Power3.inOut"}).from(".contact-info",{opacity:0, duration:1})
ScrollTrigger.create({
    trigger:".contact",
    start:"top 20%",
    end:"bottom bottom",
    animation:timeLine
})
