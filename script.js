const shieldsButton = document.querySelector('#shieldsButton');
const weaponsButton = document.querySelector('#weaponsButton');
const npcsButton = document.querySelector('#npcsButton');
const locationsButton = document.querySelector('#locationsButton');
const searchBar = document.querySelector('#searchbar');
const cardList = document.querySelector('.card-list');

let receivedData;

// Retrieve shield data and store it in an array
const getShields = () => {
  cardList.innerHTML = "";
  getData('shields');
}

const getWeapons = () => {
  cardList.innerHTML = "";
  getData('weapons');
}

const getNpcs = () => {
  cardList.innerHTML = "";
  getData('npcs');
}

const getLocations = () => {
  cardList.innerHTML = "";
  getData('locations');
}

const sortAlphabeticallyByName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

const filterContent = (e) => {
  cardList.innerHTML = "";
  let filteredData = receivedData.filter(data => {
    return data.name.toLowerCase().includes(e.target.value)
  });
  filteredData.forEach(data => createImageList(data));
}

const createImageList = (data) => {
  let card = document.createElement('div');
  card.classList.add('card');
  let img = document.createElement('img');
  img.src = data.image;
  let title = document.createElement('p');
  title.innerHTML = data.name;
  card.appendChild(img);
  card.appendChild(title);
  document.querySelector('.card-list').appendChild(card);
  card.addEventListener('click', (e) => {
    console.log(e.target);
  })
}

const getData = (dataType) => {
  const URL = `https://eldenring.fanapis.com/api/${dataType}?limit=100`;

  receivedData = fetch(URL)
    .then(res => res.json())
    .then(data => receivedData = data.data)
    .then(() => receivedData.forEach(data => createImageList(data)))
    .then(err => console.log(err))
}

shieldsButton.addEventListener('click', getShields);
weaponsButton.addEventListener('click', getWeapons);
npcsButton.addEventListener('click', getNpcs);
locationsButton.addEventListener('click', getLocations);
searchBar.addEventListener('input', filterContent);







