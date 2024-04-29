const apiUrl1 = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const apiUrl2 = "https://www.themealdb.com/api/json/v1/1/filter.php?";

async function consultarAPI(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`fallo la consulte a la api: ${error}`);
  }
}
async function obtenerPlato(url) {
  const contenedorPlatos = await document.querySelector(".menu");
  contenedorPlatos.innerHTML = "";
  const contenedorPlatos1 = document.querySelector(".menu1");
  contenedorPlatos1.innerHTML = "";
  const contError = document.querySelector(".error");
  contError.style.display = "none";

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    // Verificar si la respuesta de la API contiene resultados
    if (!datos.meals || datos.meals.length == 0) {
      //const contenedorError = document.getElementById("contenedor-error"); // Reemplaza con el ID de tu contenedor

      if (contError) {
        contError.style.display = "block";
        console.log("error de erroes");
        //contenedorError.textContent = "No se encontró el plato."; // Establece el mensaje
      } else {
        console.error("No se encontró el contenedor de error."); // Maneja la ausencia del contenedor
      }
      return; // Salir si no se encuentran resultados
    }

    console.log("no se salio de la funcion");

    const nombrePlato = datos.meals[0].strMeal;
    const instrucciones = datos.meals[0].strInstructions;
    const imagenPlato = datos.meals[0].strMealThumb;
    const etiquetaPlato = datos.meals[0].strTags;

    // Creamos elementos HTML para el nombre y la imagen del plato
    const platoElement1= document.createElement("div");
    const platoElement2= document.createElement("div");
    const platoElement3= document.createElement("div");
    const nombrePlatoElement = document.createElement("h2");
    const imagenPlatoElement = document.createElement("img");
    const instruccionesElement = document.createElement("p");
    const etiquetaPlatoElement = document.createElement("p");
   

    // Asignamos clases o estilos si es necesario
    platoElement1.classList.add("titulo");
    platoElement2.classList.add("imagenylista");
    platoElement3.classList.add("instrucciones");
    nombrePlatoElement.classList.add("nombre");
    imagenPlatoElement.classList.add("icon");
    //imagenPlatoElement.style.width = "400px";
    etiquetaPlatoElement.classList.add("description");
    

    // Asignamos contenido y atributos a los elementos
    nombrePlatoElement.textContent = nombrePlato;
    imagenPlatoElement.src = imagenPlato;
    etiquetaPlatoElement.textContent = etiquetaPlato;

    // Separamos las instrucciones en pasos utilizando el método split() y expresiones regulares
    const pasosSeparados = instrucciones.split(/\r\n/);

    // Creamos elementos de párrafo para cada paso
    pasosSeparados.forEach((paso) => {
      const pasoElement = document.createElement("p");
      pasoElement.textContent = paso;
      instruccionesElement.appendChild(pasoElement);
    });
    const listaContenedor = document.createElement("div");
    listaContenedor.classList.add("ingredientes");
    // Iterar sobre cada ingrediente
    for (let i = 1; i <= 20; i++) {
      const strIngrediente = datos.meals[0]["strIngredient" + i];
      const strMedida = datos.meals[0]["strMeasure" + i];

      // Verificar si el ingrediente no está vacío
      if (strIngrediente.trim() !== "") {
        // Crear un nuevo elemento de lista y asignar el ingrediente como su texto
        const listItem = document.createElement("li");
        listItem.textContent = strMedida + " " + strIngrediente;

        // Agregar el elemento de lista al elemento de ingredientes
        listaContenedor.appendChild(listItem);
      } else {
        // Si el ingrediente está vacío, no hay más ingredientes
        break;
      }
    }
   // Obtener el contenedor donde quieres colocar la lista (platoElement)

   // Crear un nuevo elemento de encabezado h2 para el título "Ingredientes"
    const titulo = document.createElement("h3");
    titulo.textContent = "Ingredients:";
    const titulo2 = document.createElement("h3");
    titulo2.textContent = "Instructions:";

    // Agregar el título al contenedor de la lista
    listaContenedor.insertBefore(titulo, listaContenedor.firstChild);
    instruccionesElement.insertBefore(titulo2, instruccionesElement.firstChild);

// Obtener el contenedor donde quieres colocar la lista (platoElement)

    // Agregar el contenedor de la lista al elemento donde deseas mostrar la lista
    
     // Añadimos los elementos al contenedor principal
     platoElement1.appendChild(nombrePlatoElement);
     platoElement2.appendChild(imagenPlatoElement);
     platoElement2.appendChild(listaContenedor);
     platoElement3.appendChild(instruccionesElement);
     platoElement3.appendChild(etiquetaPlatoElement);
     contenedorPlatos.appendChild(platoElement1);
     contenedorPlatos.appendChild(platoElement2);
     contenedorPlatos.appendChild(platoElement3);
 
  } catch (error) {
    // Manejar errores de la API o URL inválida
    console.log(
      "No se encontró ningún plato con ese nombre. Intente con otro nombre válido."
    );
    const contError = document.querySelector(".error");
    contError.style.display = "block";
  }
}

async function filtrarplatos(url) {
  const contenedorPlatos = document.querySelector(".menu1");
  contenedorPlatos.innerHTML = "";
  const contenedorPlatos1 = await document.querySelector(".menu");
  contenedorPlatos1.innerHTML = "";
  
  const contError = document.querySelector(".error");
  contError.style.display = "none";
  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    if (!datos.meals || datos.meals.length == 0) {
      if (contError) {
        contError.style.display = "block";
        console.log("error de erroes");
      } else {
        console.error("No se encontró el contenedor de error."); // Maneja la ausencia del contenedor
      }
      return; // Salir si no se encuentran resultados
    }
      //generar un numero aleatorio de 0 a datos.meals.length
      

    for (let i = 0; i < datos.meals.length; i++) {
        if (i == 18) {
          break;
        }
      const nombrePlato = datos.meals[i].strMeal;
      const imagenPlato = datos.meals[i].strMealThumb;

      // Creamos elementos HTML para el nombre y la imagen del plato
      const platoElement2 = document.createElement("div");
      const nombrePlatoElement = document.createElement("h2");
      const imagenPlatoElement = document.createElement("img");

      // Asignamos clases o estilos si es necesario
      nombrePlatoElement.classList.add("nombre1");
      imagenPlatoElement.classList.add("icon1");
      imagenPlatoElement.style.width = "200px";

      // Asignamos contenido y atributos a los elementos
      nombrePlatoElement.textContent = nombrePlato;
      imagenPlatoElement.src = imagenPlato;

      // Añadimos los elementos al contenedor principal
      platoElement2.appendChild(nombrePlatoElement);
      platoElement2.appendChild(imagenPlatoElement);
      contenedorPlatos.appendChild(platoElement2);

      // Agregamos un evento de clic al contenedor del plato
      platoElement2.addEventListener("click", () => {
        const Plato =nombrePlato; // Pasamos el nombre del plato como parámetro
        const url1 = `${apiUrl1}${Plato}`;
        obtenerPlato(url1);
        console.log(Plato);
        });
    }
  } catch (error) {
    // Manejar errores de la API o URL inválida
    console.log(
      "No se encontró ningún plato con ese nombre en el parametro."
    );
    const contError = document.querySelector(".error");
    contError.style.display = "block";
  }
}

const searchButton = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");
// Obtener el elemento h1 por su ID
const titulo = document.getElementById('titulo');

// Agregar un evento de clic al título
titulo.addEventListener('click', () => {
  // Recargar la página cuando se haga clic en el título
  location.reload();
});

searchButton.addEventListener("click", async () => {
  const opcionBusqueda = document.getElementById("opcionBusqueda").value;
  const plato = searchInput.value;

  console.log(plato);

  switch (opcionBusqueda) {
    case "nombre":
      const url1 = `${apiUrl1}${plato}`;
      await obtenerPlato(url1);

      break;
    case "categoria":
      const url2 = `${apiUrl2}c=${plato}`;
      await filtrarplatos(url2);
      break;

    case "ingrediente":
      const url3 = `${apiUrl2}i=${plato}`;
      await filtrarplatos(url3);
      break;

    case "area":
      const url4 = `${apiUrl2}a=${plato}`;
      await filtrarplatos(url4);
      break;

    default:
      console.error("Opción de búsqueda no válida.");
      break;
  }
});
