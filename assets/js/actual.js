//MUESTRA TODOS LOS EVENTOS
let tarjetas = document.getElementById("cards")
tarjetas.innerHTML = htmlEvents

//RENDERIZA TODAS LAS CATEGORIAS
let categorias = document.getElementById("categorias")
categorias.innerHTML = htmlCategories

//POR CADA CLICK EN CATEGORIA O TEXTO EN INPUT, HACE UNA BUSQUEDA
let itemsCategorias = document.querySelectorAll('input[type=checkbox]')
itemsCategorias.forEach(listItem =>
    listItem.addEventListener("click", buscar))
let inputSearch = document.querySelector('input[type="search"]')
inputSearch.addEventListener("keyup", buscar)

//OBJETO DE BUSQUEDA PARA COMPARAR CON EVENTOS
let busqueda = {
    search: '',
    categorias: [],
}

function buscar(e) {
    //VEO SI ESTOY BUSCANDO POR INPUT O POR CATEGORIAS
    if (e.target.name === 'search')
        busqueda = {
            ...busqueda,
            search: e.target.value,
        }
    else if (e.target.name === 'category' && e.target.checked) {
        busqueda.categorias.push(e.target.value)
    }
    else if (e.target.name === 'category' && !e.target.checked) {
        const nuevaCategoria = busqueda.categorias.filter(categoria => categoria !== e.target.value)
        busqueda.categorias = nuevaCategoria
    }
    let eventosFiltrados = []
    htmlResultadoBusqueda = ""

    //SI NO HAY TEXTO O CATEGORIAS SELECCIONADAS, MUESTRA TODO
    if (busqueda.search === '' && busqueda.categorias.length === 0) {
        eventosFiltrados = data.events;
    } else if (busqueda.search !== '' && busqueda.categorias.length !== 0) {
        // SI HAY TEXTOS Y CATEGORIAS SELECCIONADAS
        eventosFiltrados = data.events.filter(event =>

            (event.name.toLowerCase().includes(busqueda.search.toLowerCase()) || event.description.toLowerCase().includes(busqueda.search.toLowerCase()))
            &&
            (busqueda.categorias.includes(event.category))
        )
    } else if (busqueda.categorias.length !== 0) {
        // SI HAY CATEGORIAS SELECCIONADAS
        eventosFiltrados = eventosFiltrados = data.events.filter(event =>
            (busqueda.categorias.includes(event.category)))
    } else if (busqueda.search !== '') {
        // SI HAY SOLO TEXTOS DE BUSQUEDA 
        eventosFiltrados = eventosFiltrados = data.events.filter(event =>
            (event.name.toLowerCase().includes(busqueda.search.toLowerCase()) || event.description.toLowerCase().includes(busqueda.search.toLowerCase())))
    }

    //ARMO LAS CARDS CON LOS EVENTOS FILTRADOS
    for (let event of eventosFiltrados) {
        htmlResultadoBusqueda += crearCard(event);
    }

    //LAS INSERTO EN EL DOM
    tarjetas.innerHTML = htmlResultadoBusqueda

}
