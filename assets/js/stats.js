let eventos = [];
let categorias = [];

async function getDatos() {
    try {
        let response = await fetch(urlApi);
        let data = await response.json();

        for (const evt of data.events) {
            try {
                let asis = evt.assistance ? evt.assistance : evt.estimate
                eventos.push({ ...evt, assistance: asis })
            } catch (error) {
                console.log(error.message);
            }
        }
        console.log(eventos)

        categories = extractCategories(eventos);
        console.log(categories)

        loadStats(categories);

    } catch (error) {
        console.log(error)
    }
}
getDatos()

function extractCategories(eventos) {
    let categorias = [];
    eventos.map((evento) => {
        if (!categorias.includes(evento.category)) {
            categorias.push(evento.category);
        }
    });
    return categorias;
}
/////////

function getEventsByCategory(category, eventos) {
    return eventos.filter(evento => evento.category.includes(category));
}

function getBiggerRevF(events) {

    return events.reduce((acumulador, valorActual) => {

        if ((valorActual.estimate * valorActual.price) > (acumulador.estimate * acumulador.price)) {
            return valorActual;
        } else {
            return acumulador;
        }

    });
}


function getBiggerRev(events) {

    return events.reduce((acumulador, valorActual) => {

        if ((valorActual.assistance * valorActual.price) > (acumulador.assistance * acumulador.price)) {
            return valorActual;
        } else {
            return acumulador;
        }

    });
}

function getBiggerCap(events) {

    return events.reduce((acumulador, valorActual) => {

        if (valorActual.capacity > acumulador.capacity) {
            return valorActual;
        } else {
            return acumulador;
        }

    });
}
function getBiggerAsisF(events) {
    return events.reduce((acumulador, valorActual) => {
        if (valorActual.estimate > acumulador.estimate) {
            return valorActual;
        } else {
            return acumulador;
        }
    })
}

function getBiggerAsis(events) {
    return events.reduce((acumulador, valorActual) => {
        if (valorActual.assistance > acumulador.assistance) {
            return valorActual;
        } else {
            return acumulador;
        }
    })
}


function getSmallerAsis(events) {

    return events.reduce((acumulador, valorActual) => {
        if (valorActual.assistance < acumulador.assistance) {
            return valorActual;
        } else {
            return acumulador;
        }
    });

}
//////
function loadStats(categories) {
    let container = document.querySelector(".tbody1");
    let tableBodyHTML = "";
    categories.forEach(category => {
        let filteredEvents = getEventsByCategory(category, eventsAll);
        let masGrandeAsis = getBiggerAsis(filteredEvents);
        let masChicoAsis = getSmallerAsis(filteredEvents);
        let masCap = getBiggerCap(filteredEvents);
        tableBodyHTML += `<tr>
        <td>${masGrandeAsis.name}</td>
        <td>${masChicoAsis.name} </td>
        <td>${masCap.name} </td>
    </tr>`;
    })
    container.innerHTML = tableBodyHTML;
    loadStats2(categories)
}

// ///////////////////////
function loadStats2(categories) {
    let container = document.querySelector(".tbody2");
    let tableBodyHTML = "";
    categories.forEach(category => {
        let filteredEvents = getEventsByCategory(category, eventsAll);
        let masGrandeAsis = getBiggerAsisF(filteredEvents);
        let masGrandeRev = getBiggerRevF(filteredEvents);
        tableBodyHTML += `<tr>
        <td>${category} </td>
        <td>${masGrandeRev.name}</td>
        <td>${masGrandeAsis.name} </td>
    </tr>`;
    })
    container.innerHTML = tableBodyHTML;
    loadStats3(categories);
}

//////////////////
function loadStats3(categories) {
    let container = document.querySelector(".tbody3");
    let tableBodyHTML = "";
    categories.forEach(category => {
        let filteredEvents = getEventsByCategory(category, eventsPast);
        let masGrandeAsis = getBiggerAsis(filteredEvents);
        let masGrandeRev = getBiggerRev(filteredEvents);
        tableBodyHTML += `<tr>
        <td>${category} </td>
        <td>${masGrandeRev.name}</td>
        <td>${masGrandeAsis.name} </td>
    </tr>`;
    })

    container.innerHTML = tableBodyHTML;

}
///////////



  //     let totAsisPas = 0;
    //     let totAsisCom = 0;
    //     let totAsisGral = 0;
    //     let totRevCom = 0;
    //     let totRevPast = 0;
    //     let percAsisPas = []
    //     let percAsisCom = []
    //     let percGral = []
    //     console.log(data)

    //     categories = extractCategory(eventsAll);

    //     //TOTAL DE ASISTENCIAS
    //     eventsAll.forEach(evt => {
    //         if (evt.estimate)
    //             totAsisGral += evt.estimate
    //         else if (evt.assistance)
    //             totAsisGral += evt.assistance
    //     });

    //     //TOTAL ASISTENCIAS EVENTOS PASADOS
    //     eventsPast.forEach(epast => {
    //         totAsisPas += epast.assistance
    //     });
    //     //TOTAL RECAUDACION EVENTOS PASADOS
    //     eventsPast.forEach(epast => {
    //         totRevPast += (epast.price * epast.assistance)
    //     });
    //     //PORCENTAJE GENERAL DE ASISTENCIA 
    //     eventsPast.map(epast => {
    //         percGral.push({ name: epast.name, porcentaje: Math.round(epast.assistance * 100 / totAsisGral) })
    //     });
    //     // PORCENTAJE DE ASISTENCIA EVENTOS PASADOS
    //     eventsPast.map(epast => {
    //         percAsisPas.push({ name: epast.name, category: epast.category, porcentaje: Math.round(epast.assistance * 100 / totAsisPas) })
    //     });

    //     //TOTAL ASISTENCIAS EVENTOS FUTUROS
    //     eventsFuture.forEach(ecom => {
    //         totAsisCom += ecom.estimate
    //     });
    //     //TOTAL RECAUDACION ESTIMADA EVENTOS FUTUROS
    //     eventsFuture.forEach(ecom => {
    //         totRevCom += (ecom.price * ecom.estimate)
    //     });
    //     //PORCENTAJE GENERAL DE ASISTENCIA 
    //     eventsFuture.map(ecom => {
    //         percGral.push({ name: ecom.name, porcentaje: Math.round(ecom.estimate * 100 / totAsisGral) })
    //     });
    //     // PORCENTAJE DE ASISTENCIA ESTIMADA EVENTOS FUTUROS
    //     eventsFuture.map(ecom => {
    //         percAsisCom.push({ name: ecom.name, category: ecom.category, porcentaje: Math.round(ecom.estimate * 100 / totAsisCom) })
    //     });


    //     //DATOS PRIMERA TABLA: MAY % ASIS | MEN % ASIS | MAY CAPAC
    //     let gralOrderMayAsis = sortMayAsis(percGral).slice(0, 4)
    //     let gralOrderMenAsis = sortMenAsis(percGral).slice(0, 4)
    //     let gralOrderMayCap = sortMayCapacity(eventsAll).slice(0, 4)


    //     function sortMayAsis(perc) {
    //         return perc.sort((a, b) => b.porcentaje - a.porcentaje)
    //     }
    //     function sortMenAsis(perc) {
    //         return perc.sort((a, b) => a.porcentaje - b.porcentaje)
    //     }
    //     function sortMayCapacity(evts) {
    //         return evts.sort((a, b) => b.capacity - a.capacity)
    //     }




    //     //SEGUNDA TABLA

    //     // eventsPast.filter(evt => )

    //     let gralOrderMayPrice = sortRevenues()
    //     console.log('%c :::VER::::', 'background: yellow; color: black', gralOrderMayPrice.slice(0, 6))

    //     function sortRevenues(evts) {
    //         return evts.sort((a, b) => (b.price * b.capacity) - (a.price * a.capacity))
    //     }

    //     function extractCategory(eventsAll) {
    //         let categories = [];
    //         eventsAll.forEach(evt => {
    //             if (!categories.includes(evt.category)) {
    //                 categories.push(evt.category);
    //             }
    //         });
    //         return categories;
    //     }

    //     function getEventsByCategory(categ, evts) {
    //         return evts.filter(evt => evt.category === categ);
    //     }

    //     function loadStats(categories, evts, clase) {
    //         let container = document.querySelector(clase);
    //         let tableBodyHTML = "";
    //         categories.forEach(category => {

    //             tableBodyHTML += `<tr>
    //             <td>${category}</td>
    //          <td>${category}</td>
    //          <td>${category}</td>
    // </tr>`;

    //         });


    //         container.innerHTML = tableBodyHTML;
    //     }

// }


// async function getPokemons() {
//     try {
//         let response = await fetch(urlAPI);
//         let dataAPI = await response.json();

//         for (const pokemon of dataAPI.results) {
//             try {
//                 let pokeData = await getPokemon(pokemon.url);
//                 pokeData.types = pokeData.types.map(item => item.type.name);
//                 pokemons.push(pokeData);
//             } catch (error) {
//                 console.log(error.message);
//             }
//         }
//         // ya tengo disponible el array pokemons para hacer todas las operaciones iniciales

//         types = extractTypes(pokemons);

//         loadStats(types);

//     } catch (error) {
//         console.log(error.message);
//     }
// }
// getPokemons();

// async function getPokemon(url) {
//     try {
//         let response = await fetch(url);
//         let pokemon = await response.json();
//         return pokemon;
//     } catch (error) {
//         console.log(error.message);
//         return {};
//     }
// }

// function extractTypes(pokemons) {
//     let types = [];
//     pokemons.forEach(pokemon => {
//         pokemon.types.forEach(type => {
//             if (!types.includes(type)) {
//                 types.push(type);
//             }
//         })
//     });
//     return types;
// }

// function loadStats(types) {
//     let container = document.querySelector("tbody");
//     let tableBodyHTML = "";
//     types.forEach(type => {
//         let filteredPokemons = getPokemonsByType(type, pokemons);
//         let promedioAltura = getPromedioAltura(filteredPokemons);
//         let masGrande = getBigger(filteredPokemons);
//         let masChico = getSmaller(filteredPokemons);
//         tableBodyHTML += `<tr>
//         <td>${type}</td>
//         <td>${promedioAltura}</td>
//         <td>${masGrande.height} (${masGrande.name})</td>
//         <td>${masChico.height} (${masChico.name})</td>
//     </tr>`;
//     })
//     container.innerHTML = tableBodyHTML;
// }

// function getPokemonsByType(type, pokemons) {
//     return pokemons.filter(pokemon => pokemon.types.includes(type));
// }

// function getPromedioAltura(pokemons) {
//     let sumaAlturas = 0;
//     pokemons.forEach(pokemon => sumaAlturas += pokemon.height);
//     return Math.round(sumaAlturas / pokemons.length);
// }

// function getBigger(pokemons) {
//     return pokemons.reduce((acumulador, valorActual) => {
//         if (valorActual.height > acumulador.height) {
//             return valorActual;
//         } else {
//             return acumulador;
//         }
//     });
// }

// function getSmaller(pokemons) {
//     return pokemons.reduce((acumulador, valorActual) => {
//         if (valorActual.height < acumulador.height) {
//             return valorActual;
//         } else {
//             return acumulador;
//         }
//     });
// }

///////////////

// let totAsisGral = 0;
//     //  TOTAL DE ASISTENCIAS
//     eventsAll.forEach(evt => {
//         if (evt.estimate)
//             totAsisGral += evt.estimate
//         else if (evt.assistance)
//             totAsisGral += evt.assistance
//     });
//     console.log(data)

//     let porc = [];

//     function tb1() {
//         let container = document.querySelector('tbody1');
//         let tableBodyHTML = "";
//         {
//             eventsAll.forEach(evt => {
//                 if (evt.assistance)
//                     porc.push({ id: evt._id, pc: Math.round(evt.assistance * 100 / totAsisGral) })
//                 else if (evt.estimate)
//                     porc.push({ id: evt._id, pc: Math.round(evt.estimate * 100 / totAsisGral) })
//             });
//             let porcO = porc.sort((a, b) => b.pc - a.pc).slice(0, 4)

//             tableBodyHTML += `<tr>
//         <td>${porcO[0].id}</td>
//      <td>${porcO[0].id}</td>
//      <td>${porcO[0].id}</td>
// </tr>`;
//         }
//         container.innerHTML = tableBodyHTML;
//     }

//     tb1()