let htmlEventsPast = "";
let htmlEventsFuture = "";
let htmlEvents = "";
// console.log('data', data)
for (let event of data.events) {
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);

    if (eventDate < currentDate) {
        htmlEventsPast += `<div class="card mt-3" style="width: 18rem; height: 25rem">
        <img
          src="${event.image}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${event.name}</h5>
          <p class="card-text">
          ${event.description}
          </p>
          <a href="./details.html" class="btn btn-primary">More info...</a>
        </div>
      </div>`;
    } else if (eventDate > currentDate) {
        htmlEventsFuture += `<div class="card mt-3" style="width: 18rem; height: 25rem">
        <img
          src="${event.image}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${event.name}</h5>
          <p class="card-text">
          ${event.description}
          </p>
          <a href="./details.html" class="btn btn-primary">More info...</a>
        </div>
      </div>`;
    }

    htmlEvents += `<div class="card mt-3" style="width: 18rem; height: 25rem">
        <img
          src="${event.image}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${event.name}</h5>
          <p class="card-text">
          ${event.description}
          </p>
          <a href="./details.html" class="btn btn-primary">More info...</a>
        </div>
      </div>`;
}
// console.log(htmlEventsPast);
// console.log(htmlEventsFuture);
// console.log(htmlEvents);

