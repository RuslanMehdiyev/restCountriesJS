const backBtn = document.getElementById("back");
let nameFromLocalStorage = localStorage.getItem("name");
let imgDiv = document.querySelector(".details-img");
let detailInfo = document.querySelector(".details-info");
let moreInfo = document.querySelector(".more-info");
let borderInfo = document.querySelector(".borders");

backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

function getData() {
  fetch(
    `https://restcountries.com/v3.1/name/${nameFromLocalStorage.toLowerCase()}`
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        fillData(element);
      });
    });
}
getData();

function fillData(element) {
  let img = document.createElement("img");
  img.src = element.flags.svg;
  imgDiv.appendChild(img);
  let countryName = document.createElement("h1");
  countryName.innerHTML = element.name.common;
  detailInfo.appendChild(countryName);
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");
  let nativeName = document.createElement("p");
  let native = Object.values(element?.name?.nativeName);
  let obj = native[0].common;
  nativeName.innerHTML = `<b>Native name:</b> ${obj}`;
  let population = document.createElement("p");
  population.innerHTML = `<b>Population:</b> ${element.population}`;
  let region = document.createElement("p");
  region.innerHTML = `<b>Region:</b> ${element.region}`;
  let subRegion = document.createElement("p");
  subRegion.innerHTML = `<b>Sub Region:</b> ${element.subregion}`;
  let capital = document.createElement("p");
  capital.innerHTML = `<b>Capital</b>: ${
    element.capital ? element.capital[0] : "No Capital"
  }`;
  let mainDomain = document.createElement("p");
  mainDomain.innerHTML = `<b>Main domain:</b> ${element.tld}`;
  let curr = Object.values(element.currencies);
  let currencies = document.createElement("p");
  currencies.innerHTML = `<b>Currencies:</b> ${curr[0].name}`;
  let lang = element.languages;
  let langs = Object.values(lang);
  let language = document.createElement("p");
  language.innerHTML = `<b>Languages:</b>`;
  langs?.forEach((e) => {
    language.innerHTML += ` ${e}.`;
  });
  div1.appendChild(nativeName);
  div1.appendChild(population);
  div1.appendChild(region);
  div1.appendChild(subRegion);
  div1.appendChild(capital);
  div2.appendChild(mainDomain);
  div2.appendChild(currencies);
  div2.appendChild(language);
  moreInfo.appendChild(div1);
  moreInfo.appendChild(div2);
  detailInfo.appendChild(moreInfo);
  let borders = element.borders;
  borders
    ? borders.forEach((e) => {
        const borderBtn = document.createElement("button");
        borderBtn.innerHTML += e;
        borderBtn.value += e;
        borderInfo.appendChild(borderBtn);
        detailInfo.appendChild(borderInfo);
        borderBtn.addEventListener("click", (e) => {
          borderCountry(e.target.value);
        });
      })
    : (document.querySelector(".check").style.display = "none");
}

function borderCountry(target) {
  detailInfo.innerHTML = "";
  imgDiv.innerHTML = "";
  detailInfo.innerHTML = "";
  moreInfo.innerHTML = "";
  borderInfo.innerHTML = "";
  fetch(` https://restcountries.com/v3.1/alpha/${target}`)
    .then((res) => res.json())
    .then((data) =>
      data.forEach((e) => {
        fillData(e);
      })
    );
}
