const cards = {
  "A": "Hello",
  "B": "Bonjour",
  "C": "Hola",
}

function randomize() {
  const currentCard = $("#card").data('selected');
  const [cardName, description] = pickRandomFrom(omit(cards, currentCard));
  const newUrl = "https://via.placeholder.com/300.png/09f/fff?text="+cardName;
  $("#card #picture").attr("src", newUrl);
  $("#card #picture").attr("alt", cardName);
  $("#card #description").text(description);
  $("#card").data('selected', cardName);
}

function omit(obj, omitKey) {
  return Object.keys(obj).reduce((result, key) => {
    if(key !== omitKey) {
       result[key] = obj[key];
    }
    return result;
  }, {});
}

function pickRandomFrom(collection) {
  const keys = Object.keys(collection)
  const prop = keys[Math.floor(Math.random() * keys.length)]
  const value = collection[prop];
  return [prop, value]
}
