const openModalBtn = document.getElementById('openModal')
const closeModalBtn = document.querySelector('.modal-close-btn')
const handleShowModal = ()=>{
    const modalOverlayEl = document.querySelector('.overlay')
    
    modalOverlayEl.style.display = 'flex'
    modalOverlayEl.style.animation = 'fade-in 500ms forwards'
}
const handleCloseModal = ()=>{
    const modalOverlayEl = document.querySelector('.overlay')
    modalOverlayEl.style.animation = 'fade-out 500ms  forwards'
  // modalOverlayEl.style.display = 'none'
    setTimeout(()=>{ modalOverlayEl.style.display = 'none'}, 500)
  
    
   
}
openModalBtn.addEventListener('click', handleShowModal)
closeModalBtn.addEventListener('click', handleCloseModal)