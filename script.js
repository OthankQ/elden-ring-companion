const shieldsButton = document.querySelector('#shieldsButton');
const weaponsButton = document.querySelector('#weaponsButton');

let receivedData;

// Retrieve shield data and store it in an array
const getShields = () => {
  const URL = 'https://eldenring.fanapis.com/api/shields?limit=100';
  receivedData = fetch(URL)
    .then(res => res.json())
    .then(data => receivedData = data.data)
    .then(() => console.log(receivedData))
    .then(() => receivedData.forEach(data => createImageList(data)))
    .then(err => console.log(err))
}

const getWeapons = () => {
  const URL = 'https://eldenring.fanapis.com/api/weapons?limit=100';
  receivedData = fetch(URL)
    .then(res => res.json())
    .then(data => receivedData = data.data)
    .then(() => console.log(receivedData))
    .then(() => receivedData.forEach(data => createImageList(data)))
    .then(err => console.log(err))
}

const createImageList = (data) => {
  let img = document.createElement('img');
  img.src = data.image;
  document.querySelector('.card-list').appendChild(img);
}

shieldsButton.addEventListener('click', getShields);
weaponsButton.addEventListener('click', getWeapons);





