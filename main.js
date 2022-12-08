const url = "https://restcountries.com/v3.1/all";
const select = document.getElementById("regions");
let card = document.querySelector(".card");
const search = document.getElementById("search");

async function getData() {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        fillData(element);
      });
    });
}
getData();

const fillData = (element) => {
  let countryImg = document.createElement("img");
  countryImg.src = element.flags.svg;
  let countryName = document.createElement("h2");
  countryName.innerHTML = element.name.common;
  let population = document.createElement("p");
  population.innerHTML = `Population: ${element.population}`;
  let region = document.createElement("p");
  region.innerHTML = `Region: ${element.region}`;
  let capital = document.createElement("p");
  capital.innerHTML = `Capital: ${element.capital ? element.capital[0] : "No"}`;
  let cardDetails = document.createElement("div");
  cardDetails.classList.add("card-details");
  cardDetails.appendChild(countryImg);
  cardDetails.appendChild(countryName);
  cardDetails.appendChild(population);
  cardDetails.appendChild(region);
  cardDetails.appendChild(capital);
  card.appendChild(cardDetails);
};

search.addEventListener("keyup", () => {
  filterByName();
});

const filterByName = () => {
  if (search.value.trim()) {
    fetch(
      `https://restcountries.com/v3.1/name/${search.value.trim().toLowerCase()}`
    )
      .then((res) => res.json())
      .then((data) => {
        card.innerHTML = "";
        data.forEach((e) => {
          fillData(e);
        });
      })
      .catch(() => {
        card.innerHTML = "Not Found";
      });
  } else {
    card.innerHTML = "";
    getData();
  }
};

async function getRegions() {
  let regionArr = [];
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      regionArr = data;
    });

  return regionArr;
}

function fillOptions() {
  let uniqueReg = [];
  getRegions().then((res) => {
    res.forEach((e) => {
      if (!uniqueReg.includes(e.region)) {
        uniqueReg.push(e.region);
      }
    });
    uniqueReg.forEach((e) => {
      let option = document.createElement("option");
      option.value = e;
      option.innerHTML = e;
      select.appendChild(option);
    });
  });
}

fillOptions();

select.addEventListener("change", (e) => {
  filterByRegion(e.target.value);
});

const filterByRegion = (region) => {
  if (region == "All") {
    card.innerHTML = "";
    getData();
  } else {
    fetch(`https://restcountries.com/v3.1/region/${region}`)
      .then((res) => res.json())
      .then((data) => {
        card.innerHTML = "";
        data.forEach((e) => fillData(e));
      });
  }
};
