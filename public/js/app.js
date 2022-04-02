const $ = (sel) => { return document.querySelector(sel) }

const cards = getJSON('assets/data.json');

function getJSON(url, qs_params) {
  function buildQueryString(params) {
    return Object.entries(params).map(d => `${d[0]}=${d[1]}`).join('&');
  }

  return new Promise((resolve, reject) => {
    const qs = qs_params ? '?' + buildQueryString(qs_params) : '';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}${qs}`);

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 400) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        resolve(xhr.responseText);
      }
    };
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

const randomize = async() => {
  const currentCard = $("#card").getAttribute('data-selected');
  const eligibleCards = (await cards).filter(card => card.name !== currentCard)
  const { name: cardName, description, imageUrl: newUrl } = pickRandomFrom(eligibleCards);
  $("#card #picture").setAttribute("src", newUrl);
  $("#card #picture").setAttribute("alt", cardName);
  $("#card #description").innerHTML = description;
  $("#card").setAttribute('data-selected', cardName);
}

function pickRandomFrom(collection) {
  const keys = Object.keys(collection)
  const prop = keys[Math.floor(Math.random() * keys.length)]
  const value = collection[prop];
  return value;
}

