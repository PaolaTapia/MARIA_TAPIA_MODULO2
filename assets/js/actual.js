//MUESTRA TODOS LOS EVENTOS
let tarjetas = document.getElementById("cards")
tarjetas.innerHTML = htmlEvents

//RENDERIZA TODAS LAS CATEGORIAS
let categorias = document.getElementById("categorias")
categorias.innerHTML = htmlCategories

//FILTRO POR CATEGORIAS
let itemCategorias = document.querySelectorAll('input[type=checkbox]')

let selected = []
let eventsCategorizados = []

itemCategorias.forEach(listItem => listItem.onclick = () => {
    let categoria = listItem.value;
    let categoriaClickeada = listItem.checked;

    if (categoriaClickeada === true) {
        let categoriaElegida = eventsPast.filter(event => event.category === categoria)

        if (!selected.includes(categoriaElegida)) selected.push(categoriaElegida)

    } else {
        let categoriaElegida = eventsPast.filter(event => event.category === categoria)
        selected.pop(categoriaElegida)
    }

    let htmlResultadoPorCategoria = "";
    for (let event of selected) {
        eventsCategorizados.push(event)
        htmlResultadoPorCategoria += crearCard(event[0]);
    }

    if (selected.length === 0)
        tarjetas.innerHTML = htmlEvents
    else
        tarjetas.innerHTML = htmlResultadoPorCategoria
}
)

//FILTRO INPUT SEARCH
let inputSearch = document.querySelector('input[type="search"]')
const log = document.getElementById("log");
inputSearch.addEventListener("keyup", buscar);

var textoBusqueda = ""
var resultado = ""
function buscar(e) {

    textoBusqueda = inputSearch.value;
    console.log('%c :::VER::::', 'background: yellow; color: black', eventsCategorizados)
    console.log('%c :::VER::::', 'background: yellow; color: black', eventsPast)
    eventsPast.filter(event => event.name === textoBusqueda)
}

//onkeyup="buscar()"