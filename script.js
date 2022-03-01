'use strict';
const ham=document.querySelector('.ham');
const navy=document.querySelector('.navy');
const main=document.querySelector('main');
// const one=document.querySelector('.section1');
const body=document.querySelector('body');
const close=document.querySelector('.close');

const input=document.querySelector('input');
const btn=document.querySelector('.btn_short');
const write=document.querySelector('.write');
const spacy=document.querySelector('.spacy');
const first=document.querySelector('.first');


// console.log(close.style);

ham.addEventListener('click',function(e){
    e.preventDefault();
    navy.classList.remove('hidden');
    // main.classList.add('overlay');
    body.style.overflow='hidden'
    ham.classList.add('hidden')
    close.style.display="block";
    // if(!navy.classList.contains('hidden'))
    // one.style.backgroundImage = 'linear-gradient(180deg , black, white)';
    console.log(navy.classList);
    console.log(main.classList);
    console.log("oooo");
})

close.addEventListener('click',function(e){
    e.preventDefault();
    navy.classList.add('hidden');
    // main.classList.remove('overlay');
    body.style.overflow='scroll'
    ham.classList.remove('hidden')
    close.style.display="none";
    // if(!navy.classList.contains('hidden'))
    // one.style.backgroundImage = 'none';
    console.log(navy.classList);
    console.log(main.classList);
    console.log("oooo");
})


function printMessage(err){
// console.log(err);
const html=` <div class="write">${err}</div>`;
// write.insertAdjacentHTML('afterend',html);
write.insertAdjacentHTML('beforebegin',html);
console.log(write.innerHTML);
}
async function shorten(longLink){
    try{
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${longLink}`);
            const users = await response.json();   
    // console.log(users.result);
    // console.log(users.result.full_short_link);
    // console.log(users.error_code);
if(users.error_code===1) throw new Error('Please add a link');
else if(users.error_code===2) throw new Error('Please enter a valid URL');
else if(!response.ok) throw new Error('Something needs to be done!!');
 return users.result.full_short_link;   
        }catch(err){
        printMessage(err.message);
    }
}
// const a= shorten();
// console.log(a);

btn.addEventListener('click',async()=>{
    const longLink=input.value;
    // console.log(longLink);
    const shortLink=await shorten(input.value);
    // console.log(shortLink);
    if(!shortLink) return;
    const linky=longLink.length>30?longLink.slice(0,30)+'...':longLink
//   console.log(ll);
    const html=`   <div class="spacy ">
    <div class="first">
    ${linky}
    </div>
    <div class="second">
      <div class="link">${shortLink}</div>
  <button class="btn btn_lg btn_copy">Copy</button>
    </div>
  </div>`
  spacy.insertAdjacentHTML('afterend',html)
    input.value='';
    const copy=document.querySelectorAll('.btn_copy');
    const copy_link=document.querySelectorAll('.link');
    copy.forEach((mov,i)=>{
        mov.addEventListener('click',(e)=>{
            console.log(copy_link[i].innerText);
            navigator.clipboard.writeText(copy_link[i].innerText);
            mov.style.backgroundColor="hsl(257, 27%, 26%)";
            mov.innerText="Copied";
            mov.style.pointerEvents = "none"
            setTimeout(()=>{
                mov.style.backgroundColor=" hsl(180, 66%, 49%)";
                mov.innerText="Copied";
               mov.style.pointerEvents = "all"
            },3000)
        })
    })

})
// https://www.geeksforgeeks.org/how-to-return-an-array-in-java/