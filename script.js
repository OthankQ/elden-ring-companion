const shieldsButton = document.querySelector('#shieldsButton');
const weaponsButton = document.querySelector('#weaponsButton');
const armorsButton = document.querySelector('#armorsButton');
const npcsButton = document.querySelector('#npcsButton');
const locationsButton = document.querySelector('#locationsButton');
const ashesOfWarButton = document.querySelector('#ashesOfWarButton');
const alphabeticalSortButton = document.querySelector('#alphabetical');
const strengthSortButton = document.querySelector('#requiredStrength');
const searchBar = document.querySelector('#searchbar');
const cardList = document.querySelector('.card-list');
const pageList = document.querySelector('.page-list');

let receivedData = [];
let currentDataType;
let singleData;
let activePageNumber;

// Update receivedData array when item type buttons are clicked.
const updateCardList = (dataType) => {
  cardList.innerHTML = "";
  currentDataType = dataType;
  requestAllData(dataType);
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

const sortByRequiredStrength = (a, b) => {
  if (a.requiredAttributes[0].amount < b.requiredAttributes[0].amount) {
    return -1;
  }
  if (a.requiredAttributes[0].amount > b.requiredAttributes[0].amount) {
    return 1;
  }
  return 0;
}

const sortByRequiredDexterity = (a, b) => {
  if (a.requiredAttributes[0].amount < b.requiredAttributes[0].amount) {
    return -1;
  }
  if (a.requiredAttributes[0].amount > b.requiredAttributes[0].amount) {
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

async function requestAllData(dataType) {
  receivedData = [];
  for (let i = 1; i < 20; i ++) {
    const URL = `https://eldenring.fanapis.com/api/${dataType}?page=${i}`;
    await fetch(URL)
    .then(res => res.json())
    .then(data => {
      if (data.data.length !== 0) {
        receivedData.push(...data.data);
      }
    })
  }
  // Exclude armor items that have '(altered)' in the name
  receivedData = receivedData.filter(data => !data.name.includes('(altered)'));
  receivedData.forEach(data => createCardList(data));
}

// Fetch single item data when a card is clicked.
const fetchSingleItemData = (name) => {
  const URL = `https://eldenring.fanapis.com/api/${currentDataType}?name=${name}`;
  fetch(URL)
    .then(res => res.json())
    .then(data => singleData = data.data)
    .then(err => console.log(err))
}

shieldsButton.addEventListener('click', e => {
  updateCardList(e.target.dataset.type);
});

weaponsButton.addEventListener('click', e => {
  updateCardList(e.target.dataset.type);
});

armorsButton.addEventListener('click', e => {
  updateCardList(e.target.dataset.type);
});

npcsButton.addEventListener('click', e => {
  updateCardList(e.target.dataset.type);
});

locationsButton.addEventListener('click', e => {
  updateCardList(e.target.dataset.type);
});

alphabeticalSortButton.addEventListener('click', () => {
  cardList.innerHTML = "";
  let sortedData = receivedData.sort(sortAlphabeticallyByName);
  sortedData.forEach(data => createCardList(data));
})

strengthSortButton.addEventListener('click', () => {
  cardList.innerHTML = "";
  let sortedData = receivedData.sort(sortByRequiredStrength);
  sortedData.forEach(data => createCardList(data));
})

searchBar.addEventListener('input', filterContent);







