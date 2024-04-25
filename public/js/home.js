let url = "";
/* al iniciar la aplicaicon*/
document.addEventListener("DOMContentLoaded", () => {
  Consultar();
  ver();
  activarPlanesTexto(1);
  deslisar(); 
  editar()
});
/*funcion de accion para la navegacion y para la izquierda y para la uri*/
function activarNavegacion(element) {
  event.preventDefault(); // Previene la navegación automática por el enlace
  const targetElement = event.target.closest(".navegacionA");
  const linkElement = targetElement.querySelector("a"); // Encuentra el enlace dentro del div clickeado
  const url = linkElement.getAttribute("href"); // Obtiene la URL del enlace

  // Elimina la clase 'navegacionAactivo' de todos los botones
  document.querySelectorAll(".navegacionA").forEach(function (btn) {
    btn.classList.remove("navegacionAactivo");
    btn.querySelector(".flechaIzquierda").style.visibility = "hidden"; // Oculta la flecha
  });

  // Añade la clase 'navegacionAactivo' al div que contiene al <a> clickeado
  targetElement.classList.add("navegacionAactivo");
  targetElement.querySelector(".flechaIzquierda").style.visibility = "visible"; // Muestra la flecha

  // Redirecciona manualmente a la URL del enlace
  window.location.href = url;
  Consultar();
  ver();
}
/*funcion para la otra navegacion interna de planes moviles*/
function activarPlanes(clickedElement) {
  event.preventDefault(); // Prevent default anchor behavior
  // Remove 'planesBAlinkActivo' class from all links
  document.querySelectorAll(".planesBAlink").forEach(function (link) {
    link.classList.remove("planesBAlinkActivo");
  });
  // Add 'planesBAlinkActivo' class to the clicked link
  clickedElement.classList.add("planesBAlinkActivo");
  /*capturar texto*/
  let texto = clickedElement.textContent || clickedElement.innerText;
  console.log(texto);
  switch (texto) {
    case "Planes Ilimitados":
      activarPlanesTexto(1);
      break;
    case "Planes Flask":
      activarPlanesTexto(2);
    case "Planes Estudiante":
      activarPlanesTexto(3);
    default:
      break;
  }
}
function activarPlanesTexto(valor) {  
    const uno=document.getElementById("formularioPlanesA")
    const dos=document.getElementById("formularioPlanesB")
    const tres=document.getElementById("formularioPlanesC")
  switch (valor) {
    case 1:
        uno.style.display="grid"
        dos.style.display="none"
        tres.style.display="none"
      break;
    case 2:
        uno.style.display="none"
        dos.style.display="grid"
        tres.style.display="none"
      break;
    case 3:
        uno.style.display="none"
        dos.style.display="none"
        tres.style.display="grid"
      break;
    default:
      break;
  }
}
/*Funcion para el contenido saber la url y que poner en el contenido*/
function Consultar() {
  url = String(window.location.hash);
}
/*----------poenr condiciones por cada url------------------- */
function ver() {
  const bitelA = document.getElementById("bitelA");
  const bitelB = document.getElementById("bitelB");
  const bitelC = document.getElementById("bitelC");
  if (url === "") {
    bitelA.style.display = "block";
    bitelB.style.display = "none";
    bitelC.style.display = "none";
  } else if (url === "#Planes") {
    bitelA.style.display = "block";
    bitelB.style.display = "none";
    bitelC.style.display = "none";
  } else if (url === "#Internet") {
    bitelA.style.display = "none";
    bitelB.style.display = "block";
    bitelC.style.display = "none";
  } else if (url === "#Accesorios") {
    bitelA.style.display = "none";
    bitelB.style.display = "none";
    bitelC.style.display = "block";
  }
}
/*--------------------formularios-----------------------*/
function submitPlanMovilFormIlimiado(event) {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log(data); // Here you could replace this with an AJAX request to submit the data
    alert("Formulario enviado. Revise la consola para ver los datos.");
}
/*funcion para inicar el loader*/
function deslisar(){
  var slider = tns({
    container: '.slider',
    items: 1,
    slideBy: 'page',
    mouseDrag: true,
    swipeAngle: false,
    speed: 400,
    nav: false,
    controls: false,
    loop: true,
    fixedWidth: 300, // Establece el ancho fijo de cada slide en 300px
    autoWidth: false,
    responsive: {
      640: {
        items: 2, // Ajusta según la necesidad
        gutter: 20
      },
      1000: {
        items: 3,
        gutter: 30
      }
    }
  });
}
/*funcion para rellenar el formuario al darclik en editar*/
function editar(){
  const editButtons = document.querySelectorAll('.editarCarrusel');

  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const carrusel = this.closest('.carrusel');

      // Extracción de datos específicos utilizando atributos de datos
      const tipoPlan = carrusel.dataset.tipoPlan;
      const vPromocion = carrusel.dataset.vpromocion === 'true'; // Asumiendo que el valor es 'true' o 'false' como string
      const tiempoDescuento = carrusel.dataset.tiempoDescuento;
      const tiempoGb = carrusel.dataset.tiempoGb;
      const descuento = carrusel.dataset.descuento;
      const llamadasIlimitadas = carrusel.dataset.llamadasIlimitadas === 'true';
      const internetIlimitado = carrusel.dataset.internetIlimitado === 'true';
      const tipoChip = carrusel.dataset.tipoChip;
      const bonoTiktok = carrusel.dataset.bonoTiktok;
      const precioBase = carrusel.dataset.precioBase;
      const precioPromocional = carrusel.dataset.descuento; // Ejemplo específico mencionado
      const gbAcumulables = carrusel.dataset.gbAcumulables;
      const gbSpotify = carrusel.dataset.gbSpotify;
      const gbTv360 = carrusel.dataset.gbTv360;

      // Asignación de datos a los campos del formulario
      document.getElementById('tipoPlan').value = tipoPlan;
      document.getElementById('vpromocionSi').checked = vPromocion;
      document.getElementById('vpromocionNo').checked = !vPromocion;
      document.getElementById('tiempoPromocionDescuento').value = tiempoDescuento;
      document.getElementById('tiempoPromocionGb').value = tiempoGb;
      document.getElementById('descuento').value = descuento;
      document.getElementById('llamadasIlimitadasSi').checked = llamadasIlimitadas;
      document.getElementById('llamadasIlimitadasNo').checked = !llamadasIlimitadas;
      document.getElementById('internetIlimitadoSi').checked = internetIlimitado;
      document.getElementById('internetIlimitadoNo').checked = !internetIlimitado;
      document.getElementById('tipoChip').value = tipoChip;
      document.getElementById('bonoTiktok').value = bonoTiktok;
      document.getElementById('precioBase').value = precioBase;
      document.getElementById('precioPromocional').value = precioPromocional;
      document.getElementById('gbAcumulables').value = gbAcumulables;
      document.getElementById('gbSpotify').value = gbSpotify;
      document.getElementById('gbTV360').value = gbTv360;

      // Desplazamiento al formulario
      document.getElementById('planMovilFormIlimitado').scrollIntoView();
    });
  });
}
/*function para eliminar tablas*/
function eliminar(id){
  
}