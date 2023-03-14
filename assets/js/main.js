let htmlEventsPast = "";
let htmlEventsFuture = "";
let htmlEvents = "";
let htmlCategories = "";
let eventsPast = [];
let eventsFuture = [];
// console.log('data', data)

function crearCard(event) {
  return ` <div class="card mt-3" style="width: 18rem; height: 25rem">
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
        <a href="./details.html?id=${event._id}" class="btn btn-primary">More info...</a>
      </div>
    </div>`
}

function crearCategory(category) {
  return `<label class="list-group-item d-flex gap-2">
  <input
    class="form-check-input flex-shrink-0"
    type="checkbox"
    value="${category}"
  />
  <span> ${category}</span>
</label>`
}

// $('.navbar-toggler').click(function () {
//   $('.navbar-toggler-icon').toggleClass('active');
// });

const menuToggle = document.getElementById('menu-toggle');
const navbarCollapse = document.getElementById('navbarNav');

menuToggle.addEventListener('click', () => {
  navbarCollapse.classList.toggle('show');
});



let categories = []

for (let event of data.events) {
  let currentDate = new Date(data.currentDate);
  let eventDate = new Date(event.date);

  if (eventDate < currentDate) {
    htmlEventsPast += crearCard(event);
    eventsPast.push(event)
  } else if (eventDate > currentDate) {
    htmlEventsFuture += crearCard(event);
    eventsFuture.push(event)
  }

  htmlEvents += crearCard(event);

  if (!categories.includes(event.category)) {
    categories.push(event.category)
    htmlCategories += crearCategory(event.category);
  }


}

// console.log(htmlEventsPast);
// console.log(htmlCategories);
// console.log(htmlEventsFuture);
// console.log(htmlEvents);

