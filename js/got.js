function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  gotCharacters(userDatas);
  var aliveCharacters = gotCharacters(userDatas);
  gotSort(aliveCharacters);
  gotPicturesAndNames(aliveCharacters);
  // getCharacter(aliveCharacters);
  gotSearch(aliveCharacters);
  // filterCharacter(aliveCharacters);
  gotSearchName(aliveCharacters);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function gotCharacters(characters) {
  var alive = [];
  for ( var i = 0; i < characters.length; i++) {
    if (!characters[i].dead) {
      alive.push(characters[i]);
    }
  }
// console.log(alive);
  return alive;
}

function gotSort(characters) {
  characters.sort(function sortedCharacter(first, second) {
    if (first.name > second.name) {
      return 1;
    } return -1;
  });
  console.log(characters);
  return characters;
}

// add pictures and names
function gotPicturesAndNames(characters) {
  var table = '';
  for (var i = 0; i < characters.length; i++) {
    table += `
          <div class="main__div__div">
            <img src="${characters[i].portrait}">
            <p id="main__p">${characters[i].name}</p>
          </div>
  `;
  }
  document.querySelector('#main__div').innerHTML = table;
}

// add search
function gotSearch(characters) {
  document.querySelector('#aside__inputButton').addEventListener('click', function () {filterCharacter( characters);});
}

// create infoBox
// function infoBox(characters) {
//   var table2 = '';
//   for (var i = 0; i < characters.length; i++) {
//     var house = '';
//     if (characters[i].house) {
//       house = `<img src="/assets/houses/${characters[i].house}.png" alt="house"></img>`;
//     } else {
//       house = '';
//     }
//     table2 =
//     `
//     <img src="${characters[i].picture}"></img>
//     <p>${characters[i].name}</p>
//     <p>${house}</p>
//     <p>${characters[i].bio}</p>
//     `;
//     return table2[i];
//   }
// }

function filterCharacter(characters) {
  var info = document.querySelector('#aside__div2');
  var table2 = '';
  var search = document.querySelector('#aside__inputText').value;
  var name = document.querySelector('#main__p').value;
  console.log(name);
  console.log(search);
  console.log(characters.length);
  for (var i = 0; i < characters.length; i++) {
    var house = '';
    if (characters[i].house) {
      house = `<img src="/assets/houses/${characters[i].house}.png" alt="house"></img>`;
    } else {
      house = '';
    }
    table2 =
    `
    <img id="aside__img" src="${characters[i].picture}"></img>
    <p id="aside__name">${characters[i].name}</p>
    <p id="aside__house">${house}</p>
    <p id="aside__bio">${characters[i].bio}</p>
    `;
    if (characters[i].name === search) {
      info.innerHTML = table2;
      console.log(i);
      break;
    } else if (characters[i].name === name) {
      info.innerHTML = table2;
      console.log(name);
      break;
    } else {
      info.innerHTML = 'Character not found';
    }
  }
}



// function getCharacter(characters) {
//   for (var i = 0; i < characters.length; i++) {
//     var table2 =
//     `
//     <img src="${characters[i].picture}">
//     <p>${characters[i].name}</p>
//     <img src="${characters[i].house}.png" alt="house">
//     <p>${characters[i].bio}</p>
//     `;
//     return table2;
//   }
// }

// function filterCharacter(characters) {
//   var info = document.querySelector('#aside__div2');
//   var table2 = '';
//   var search = document.querySelector('#aside__inputText').value;

//   var found = false;
//   var i = -1;
//   while(!found){
//     i+=1;
//     if(characters[i].name === search){
//       found = true;
//     }
//   }
//   if(found){
//   table2 =
//     `
//     <p>${characters[i].name}</p>
//     <p>${characters[i].bio}</p>
//     `;
//   info.innerHTML = table2;
//   } else {
//       info.innerHTML = 'mizu ';
//     }
//   }
// }

// add search to p
function gotSearchName(characters) {
  document.querySelector('#main__p').addEventListener('click', function () {filterCharacter(characters);});
}
