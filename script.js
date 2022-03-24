const shieldsButton = document.querySelector('#shieldsButton');
const weaponsButton = document.querySelector('#weaponsButton');
const npcsButton = document.querySelector('#npcsButton');
const locationsButton = document.querySelector('#locationsButton');
const ashesOfWarButton = document.querySelector('#ashesOfWarButton');
const searchBar = document.querySelector('#searchbar');
const cardList = document.querySelector('.card-list');
const pageList = document.querySelector('.page-list');

let receivedData;
let currentDataType;
let singleData;

// Update receivedData array when item type buttons are clicked.
const updateReceivedData = (dataType, pageNumber=1) => {
  cardList.innerHTML = "";
  console.log(dataType);
  currentDataType = dataType;
  requestData(dataType, pageNumber);
  createPagination(dataType);
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
    return data.name.toLowerCase().includes(e.target.value.toLowerCase())
  });
  filteredData.forEach(data => createCardList(data));
}

const createCardList = (data) => {
  let card = document.createElement('div');
  let title = document.createElement('p');
  let img = document.createElement('img');
  card.classList.add('card');
  img.src = data.image;
  img.id = data.name;
  title.innerHTML = data.name;
  title.id = data.name;
  card.id = data.name;
  card.appendChild(img);
  card.appendChild(title);
  card.addEventListener('click', e => {
    fetchSingleItemData(String(e.target.id));
  })
  document.querySelector('.card-list').appendChild(card);
}

const requestData = (dataType, pageNumber) => {
  const URL = `https://eldenring.fanapis.com/api/${dataType}?limit=50&page=${pageNumber}`;
  console.log(URL);
  fetch(URL)
    .then(res => res.json())
    .then(data => receivedData = data.data)
    .then(() => receivedData.forEach(data => createCardList(data)))
    .then(err => console.log(err))
}

const createPagination = (dataType) => {
  pageList.innerHTML = ""
  for (let i = 1; i < 10; i ++) {
    const URL = `https://eldenring.fanapis.com/api/${dataType}?limit=50&page=${i}`;
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      if (data.data.length !== 0) {
        let pageLinkListItem = document.createElement('li');
        let pageLink = document.createElement('a');
        pageLink.innerText = i;
        pageLink.addEventListener('click', e => {
          updateReceivedData(dataType, Number(e.target.innerText));
        })
        pageLinkListItem.appendChild(pageLink);
        pageList.appendChild(pageLinkListItem);
      }
    })
  }
}

// Fetch single item data when a card is clicked.
const fetchSingleItemData = (name) => {
  const URL = `https://eldenring.fanapis.com/api/${currentDataType}?name=${name}`;
  fetch(URL)
    .then(res => res.json())
    .then(data => singleData = data.data)
    .then(err => console.log(err))
}

const renderDetailedData = () => {

}

shieldsButton.addEventListener('click', e => {
  updateReceivedData(e.target.dataset.type);
});

weaponsButton.addEventListener('click', e => {
  updateReceivedData(e.target.dataset.type);
});

npcsButton.addEventListener('click', e => {
  updateReceivedData(e.target.dataset.type);
});

locationsButton.addEventListener('click', e => {
  updateReceivedData(e.target.dataset.type);
});

// ashesOfWarButton.addEventListener('click', e => {
//   updateReceivedData(e.target.dataset.type);
// });


searchBar.addEventListener('input', filterContent);







