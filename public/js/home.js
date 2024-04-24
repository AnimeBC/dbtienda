let url = "";
/* al iniciar la aplicaicon*/
document.addEventListener("DOMContentLoaded", () => {
  Consultar();
  ver();
  activarPlanesTexto(1);
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
        dos.style.display="block"
        tres.style.display="none"
      break;
    case 3:
        uno.style.display="none"
        dos.style.display="none"
        tres.style.display="block"
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