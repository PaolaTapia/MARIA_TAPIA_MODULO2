//MUESTRA TODOS LOS EVENTOS
let tarjetas = document.getElementById("cards")
tarjetas.innerHTML = htmlEvents

//RENDERIZA TODAS LAS CATEGORIAS
let categorias = document.getElementById("categorias")
categorias.innerHTML = htmlCategories

//FILTRO POR CATEGORIAS
let itemsCategorias = document.querySelectorAll('input[type=checkbox]')

let selected = []
let eventsCategorizados = []
let htmlResultadoPorCategoria = "";

itemsCategorias.forEach(listItem => {
    listItem.addEventListener('click', () => {
        if (resultado.length !== 0) {
            if (listItem.checked) {
                if (!eventsCategorizados.includes(!resultado.filter(event => event.category === listItem.value)))
                    eventsCategorizados.push(resultado.filter(event => event.category === listItem.value))

            } else {

                let aux = eventsCategorizados

                eventsCategorizados = aux.filter(event => event[0].category !== listItem.value)

            }

            htmlResultadoPorCategoria = ""

            for (let event of eventsCategorizados) {

                htmlResultadoPorCategoria += crearCard(event[0]);
            }
        } else {

            if (listItem.checked) {
                if (!eventsCategorizados.includes(!eventsPast.filter(event => event.category === listItem.value)))
                    eventsCategorizados.push(eventsPast.filter(event => event.category === listItem.value))

            } else {
                let aux = eventsCategorizados
                eventsCategorizados = aux.filter(event => event[0].category !== listItem.value)
            }

            htmlResultadoPorCategoria = ""

            for (let event of eventsCategorizados) {

                htmlResultadoPorCategoria += crearCard(event[0]);

            }

        }

        if (eventsCategorizados.length !== 0) {
            tarjetas.innerHTML = htmlResultadoPorCategoria
        }
        else if (resultado.length === 0 && eventsCategorizados.length === 0) {
            tarjetas.innerHTML = htmlEvents
        }

    })
})


// FILTRO INPUT SEARCH
let inputSearch = document.querySelector('input[type="search"]')
const log = document.getElementById("log");
inputSearch.addEventListener("keyup", buscar);

let textoBusqueda = ""
let resultado = []
let htmlResultadoPorName = ""

inputSearch.addEventListener("onkeyup", buscar())

function buscar() {
    resultado = []
    htmlResultadoPorName = ""
    textoBusqueda = inputSearch.value;
    if (textoBusqueda !== '') {

        if (eventsCategorizados.length === 0) {
            resultado = eventsPast.filter(event => event.name?.toUpperCase().includes(textoBusqueda.toUpperCase()))
            for (let event of resultado) {
                htmlResultadoPorName += crearCard(event);
            }
        }
        else {

            resultado = eventsCategorizados.filter(event => event[0].name?.toUpperCase().includes(textoBusqueda.toUpperCase()))
            for (let event of resultado) {
                htmlResultadoPorName += crearCard(event[0]);

            }
        }
        tarjetas.innerHTML = htmlResultadoPorName
    } else {
        if (eventsCategorizados.length !== 0) {
            tarjetas.innerHTML = htmlResultadoPorCategoria
        }
        else if (resultado.length === 0 && eventsCategorizados.length === 0) {
            tarjetas.innerHTML = htmlEvents
        }
    }
}


//onkeyup="buscar()"