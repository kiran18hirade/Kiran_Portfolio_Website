const typing = document.getElementById("typing");
const words = ["Java Developer", "DSA Enthusiast", "Machine Learning Explorer", "Backend Learner"];
let wi = 0, ci = 0, deleting = false;

function typeEffect(){
  const word = words[wi];
  typing.textContent = deleting ? word.substring(0,ci--) : word.substring(0,ci++);
  let delay = deleting ? 55 : 90;
  if(!deleting && ci > word.length){ deleting=true; delay=1200; }
  if(deleting && ci < 0){ deleting=false; wi=(wi+1)%words.length; ci=0; delay=350; }
  setTimeout(typeEffect,delay);
}
typeEffect();

const menu=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav-links");
menu.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menu.setAttribute("aria-expanded",open);
});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const theme=document.querySelector(".theme-toggle");
const saved=localStorage.getItem("portfolio-theme");
if(saved==="dark"){document.body.classList.add("dark");theme.textContent="☀️";}
theme.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  const dark=document.body.classList.contains("dark");
  localStorage.setItem("portfolio-theme",dark?"dark":"light");
  theme.textContent=dark?"☀️":"🌙";
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.style.opacity="1";entry.target.style.transform="translateY(0)";observer.unobserve(entry.target);}
  });
},{threshold:.08});
document.querySelectorAll(".section,.project-card,.skill-card,.achievement-grid article").forEach(el=>{
  el.style.opacity="0";el.style.transform="translateY(18px)";el.style.transition="opacity .6s ease, transform .6s ease";
  observer.observe(el);
});
