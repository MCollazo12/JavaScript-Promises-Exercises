//Part 1: Number Facts

$(document).ready(function () {
  const URL = 'https://numbersapi.com';
  const favNumber = 42;

  $.getJSON(`${URL}/${favNumber}?json`).then((data) => {
    console.log(data.text);
  });

  let favNumbers = [4, 7, 13, 24];
  $.getJSON(`${URL}/${favNumbers}?json`).then((data) => {
    console.log(data);
  });

  Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${URL}/${favNumber}?json`))
  ).then((facts) => {
    facts.forEach((f) => $('body').append(`<p>${f.text}</p>`));
  });
});
