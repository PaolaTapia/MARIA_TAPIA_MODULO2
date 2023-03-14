const urlParams = new URLSearchParams(window.location.search);
let detail = document.getElementById("detail")

if (urlParams.has('id')) {
    const id = urlParams.get('id');

    for (let event of data.events) {
        if (event._id == id) {
            console.log('%c :::VER::::', 'background: yellow; color: black', event)

            let detalle = `

            <div class="col p-4 d-flex flex-column position-static">
        <strong class="d-inline-block mb-2 text-success">${event.name}</strong>
        <h3 class="mb-0">${event.name}</h3>
        <div class="mb-1 text-mute">${event.category}</div>
        <div class="mb-1 text-mute">Place</div>
        <p class="mb-auto">
        ${event.description}
        </p>
        <a href="#" class="">Price</a>
        </div>
        <div class="col-auto w-25 d-none d-lg-block position-static">
        <img
          class="object-fit-cover h-75"
          src= ${event.image}
          alt="event"
        />
      </div>          
     
        `
            detail.innerHTML = detalle
        }



    }
}