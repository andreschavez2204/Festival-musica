document.addEventListener('DOMContentLoaded',function(){
    scrollNav();
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
})

function resaltarEnlace(){
    document.addEventListener('scroll', function(){
        const sections=document.querySelectorAll('section')
        const navLinks=document.querySelectorAll('.navegacion-principal a')

        //Detectmos cual es la seccion mas visible en el navegador, al dar scroll.
        let actual='';
        sections.forEach(section=>{
            const sectionTop=section.offsetTop;
            const sectionHeight=section.offsetHeight;
            if(window.scrollY >= (sectionTop-sectionHeight/3)){
                actual=section.id;
            }
        })

        //Iteramos sobre cada uno de los enlaces y detectamos cual tiene el valor de actual, y le agregamos el active
        navLinks.forEach(link=>{
            link.classList.remove('active')
            if(link.getAttribute('href')==='#'+actual){
                link.classList.add('active')
            }
        })
    })
}

function navegacionFija(){
    const header=document.querySelector('.header')
    const sobreFestival=document.querySelector('.sobre-festival')

    window.addEventListener('scroll',function () {
        if(sobreFestival.getBoundingClientRect().bottom<1){
             header.classList.add('fixed')
        }else{
            header.classList.remove('fixed')
        }
      })
}

function crearGaleria() { 
    const cantidad_imagenes=16;
    const galeria=document.querySelector('.galeria-imagenes')
    for(let i=1;i<=cantidad_imagenes;i++){
        const imagen=document.createElement('PICTURE')
        imagen.innerHTML = `
        <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
`;
        imagen.alt='Imagen Galeria'
        
        //Event Handler
        imagen.onclick=function () {
            mostrarimagen(i);
          }
        galeria.appendChild(imagen);
    }
 }

 function mostrarimagen(i) {
    const imagen=document.createElement('PICTURE')
    imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
`;
    imagen.alt='Imagen Galeria'

    //Generr modal
    const modal=document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick=cerrarModal
    //Boton cerrar modal
    const cerrarModalBtn=document.createElement('BUTTON')
    cerrarModalBtn.textContent='X'
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick=cerrarModal

    modal.appendChild(imagen)
    modal.appendChild(cerrarModalBtn)
    //Agregar al html
    const body=document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
   }

function cerrarModal() {
    const modal=document.querySelector('.modal')
    modal.classList.add('fade-out')
    setTimeout(() => {
        modal?.remove();//Si existe el modal, quitalo
        const body=document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 500);//medio segundo
     }

function scrollNav(){
    const navLinks=document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach(link=>{
        link.addEventListener('click', e=>{
            e.preventDefault();
            const sectionScroll=e.target.getAttribute('href')
            const section=document.querySelector(sectionScroll)
            console.log(section)
            section.scrollIntoView({ behavior: "smooth" });
        })
    })
}
