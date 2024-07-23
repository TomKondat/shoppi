//document.addEventListener('click', (event)=>console.log(event))
const btn = document.querySelector('#root button')
const pointEl = document.querySelector('.point')
document.addEventListener('keydown' , (e)=> {
    console.log(e);
   if(e.key === 'ArrowUp'){
    const top = `${pointEl.computedStyleMap().get('top')}`.replace('px','')
    pointEl.style.top = `${top-15}px`;
// console.log(top);
     
   }
})
const printEvenDetails = (e) => console.log(e.target.innerHTML);
btn.addEventListener('click', printEvenDetails)


  