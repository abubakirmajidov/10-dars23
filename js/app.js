const form = document.querySelector("form");
const input = document.querySelector("input");
const div = document.getElementById("result");
const template = document.querySelector("template");

const url = "https://restcountries.com/v3.1/name/";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(url + input.value)
    .then((data) => {
      return data.json();
    })
    .then((posts) => {
      updateUI(posts);
    })
    .catch();
});

function updateUI(data) {
  div.innerHTML = "";
  console.log(data[0]);

  const clone = template.content.cloneNode(true);
  const image = clone.querySelector("img");
  image.src = data[0].flags.svg;
  image.alt = data[0].flags.alt;

  div.appendChild(clone);
  result.innerHTML = `
  <img src="${data[0].flags.svg}" class="flag-img">
  <h2>${data[0].name.common}</h2>
  <div class="wrapper">
      <div class="data-wrapper">
          <h4>Capital:</h4>
          <span>${data[0].capital[0]}</span>
      </div>
  </div>
  <div class="wrapper">
      <div class="data-wrapper">
          <h4>Continent:</h4>
          <span>${data[0].continents[0]}</span>
      </div>
  </div>
   <div class="wrapper">
      <div class="data-wrapper">
          <h4>Population:</h4>
          <span>${data[0].population}</span>
      </div>
  </div>
  <div class="wrapper">
      <div class="data-wrapper">
          <h4>Currency:</h4>
          <span>${data[0].currencies[Object.keys(data[0].currencies)].name} - ${
    Object.keys(data[0].currencies)[0]
  }</span>
      </div>
  </div>
   <div class="wrapper">
      <div class="data-wrapper">
          <h4>Common Languages:</h4>
          <span>${Object.values(data[0].languages)
            .toString()
            .split(",")
            .join(", ")}</span>
      </div>
  </div>
`;

  input.value = "";
}
