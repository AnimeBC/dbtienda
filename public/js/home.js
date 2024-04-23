let url=""
/* al iniciar la aplicaicon*/
document.addEventListener("DOMContentLoaded",()=>{
    Consultar();
    ver();
})
/*funcion para la izquierda y para la uri*/
function activarNavegacion(element) {
    event.preventDefault(); // Previene la navegación automática por el enlace
    const targetElement = event.target.closest('.navegacionA');
    const linkElement = targetElement.querySelector('a'); // Encuentra el enlace dentro del div clickeado
    const url = linkElement.getAttribute('href'); // Obtiene la URL del enlace
  
    // Elimina la clase 'navegacionAactivo' de todos los botones
    document.querySelectorAll(".navegacionA").forEach(function(btn) {
      btn.classList.remove("navegacionAactivo");
      btn.querySelector('.flechaIzquierda').style.visibility = 'hidden'; // Oculta la flecha
    });
  
    // Añade la clase 'navegacionAactivo' al div que contiene al <a> clickeado
    targetElement.classList.add("navegacionAactivo");
    targetElement.querySelector('.flechaIzquierda').style.visibility = 'visible'; // Muestra la flecha
  
    // Redirecciona manualmente a la URL del enlace
    window.location.href = url;
    Consultar();
    ver();
}
/*Funcion para el contenido saber la url y que poner en el contenido*/
function Consultar(){
    url=String(window.location.hash);
}
/*----------poenr condiciones por cada url------------------- */
function ver(){
    const bitelA=document.getElementById("bitelA")
    const bitelB=document.getElementById("bitelB")
    const bitelC=document.getElementById("bitelC")
    if(url===""){
        bitelA.style.display="block"
        bitelB.style.display="none"
        bitelC.style.display="none"
    }else if(url==="#Planes"){
        bitelA.style.display="block"
        bitelB.style.display="none"
        bitelC.style.display="none"
    }else if(url==="#Internet"){
        bitelA.style.display="none"
        bitelB.style.display="block"
        bitelC.style.display="none"
    }else if(url==="#Accesorios"){
        bitelA.style.display="none"
        bitelB.style.display="none"
        bitelC.style.display="block"
    }
}