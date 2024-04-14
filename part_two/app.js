$(document).ready(function () {
  // Part 2: Deck of Cards

  let baseURL = 'https://deckofcardsapi.com/api/deck';

  $.getJSON(`${baseURL}/new/draw/`).then((data) => {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });

  $.getJSON(`${baseURL}/new/draw/`)
    .then((data) => {
      card_1 = data.cards[0];
      let deck_id = data.deck_id;
      return $.getJSON(`${baseURL}/${deck_id}/draw/`);
    })
    .then((data) => {
      let card_2 = data.cards[0];
      [card_1, card_2].forEach((card) => {
        console.log(`Card Drawn: ${card.value} of ${card.suit}`);
      });
    })
    .catch((error) => {
      console.error('Error: ', error);
    });

  let deckId = null;

  $.getJSON(`${baseURL}/new/shuffle/`).then((data) => {
    deckId = data.deck_id;
    $('button').show();
  });

  $('button').on('click', function () {
    $.getJSON(`${baseURL}/${deckId}/draw/`).then((data) => {
      let cardSrc = data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $('#cards').append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
          },
        })
      );
      if (data.remaining === 0) $('button').hide();
    });
  });
});
