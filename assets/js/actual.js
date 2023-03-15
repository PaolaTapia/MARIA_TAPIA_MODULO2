//MUESTRA TODOS LOS EVENTOS
let tarjetas = document.getElementById("cards")
tarjetas.innerHTML = htmlEvents

//RENDERIZA TODAS LAS CATEGORIAS
let categorias = document.getElementById("categorias")
categorias.innerHTML = htmlCategories

let itemsCategorias = document.querySelectorAll('input[type=checkbox]')
itemsCategorias.forEach(listItem =>
    listItem.addEventListener("click", buscar))
let inputSearch = document.querySelector('input[type="search"]')
inputSearch.addEventListener("keyup", buscar)

let busqueda = {
    search: '',
    categorias: [],
}

function buscar(e) {
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
    if (busqueda.search === '' && busqueda.categorias.length === 0) {
        eventosFiltrados = data.events;
    } else if (busqueda.search !== '' && busqueda.categorias.length !== 0) {

        eventosFiltrados = data.events.filter(event =>

            (event.name.toLowerCase().includes(busqueda.search.toLowerCase()) || event.description.toLowerCase().includes(busqueda.search.toLowerCase()))
            &&
            (busqueda.categorias.includes(event.category))
        )
    } else if (busqueda.categorias.length !== 0) {
        eventosFiltrados = eventosFiltrados = data.events.filter(event =>
            (busqueda.categorias.includes(event.category)))
    } else if (busqueda.search !== '') {
        eventosFiltrados = eventosFiltrados = data.events.filter(event =>
            (event.name.toLowerCase().includes(busqueda.search.toLowerCase()) || event.description.toLowerCase().includes(busqueda.search.toLowerCase())))
    }

    for (let event of eventosFiltrados) {
        htmlResultadoBusqueda += crearCard(event);
    }

    tarjetas.innerHTML = htmlResultadoBusqueda

}
