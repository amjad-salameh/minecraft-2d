const pickedElement = {
  grass: 0,
  leaves: 0,
  wood: 0,
  stone: 0,
  soil: 0,
};

const landPage = document.querySelector("#land-page");
const world = document.querySelector("#world");
const startBtn = document.querySelector(".start-btn");
const resetGameBtn = document.querySelector(".reset-game");
const resetWorldBtn = document.querySelector(".reset-world");
const mainGame = document.querySelector(".main");
const storageStone = document.querySelector(".storage-box-stone");
const storageLeaves = document.querySelector(".storage-box-leaves");
const storageWood = document.querySelector(".storage-box-wood");
const storageGrass = document.querySelector(".storage-box-grass");
const storageSoil = document.querySelector(".storage-box-soil");
const storages = document.querySelectorAll(".storage-box");
const tools = document.querySelectorAll(".tool");
const axe = document.querySelector(".axe");
const pickaxe = document.querySelector(".pickaxe");
const shovel = document.querySelector(".shovel");

const matrix = [];
function matrixBuilder(rowsArg, colsArg) {
  mainGame.style.gridTemplateRows = `repeat(${rowsArg},1fr)`;
  mainGame.style.gridTemplateColumns = `repeat(${colsArg},1fr)`;
  for (let rows = 0; rows < rowsArg; rows++) {
    matrix[rows] = [];
    for (let cols = 0; cols < colsArg; cols++) {
      const tile = document.createElement("div");
      tile.setAttribute("rows", rows);
      tile.setAttribute("cols", cols);
      // tile.setAttribute("type",'tile');
      tile.classList.add("sky");
      mainGame.appendChild(tile);
      matrix[rows][cols] = tile;
    }
  }
}
const restart = () => {
  landPage.style.display = "none";
  world.style.display = "flex";
  matrixBuilder(20, 30);
  //* inject explaining - row,untilRow,col(default = left screen),untilCol(default = right screen),element
  inject("grass", 15, 16);
  inject("soil", 16, 20);
  inject("wood", 12, 15, 23, 24);
  inject("stone", 12, 15, 11, 14);
  inject("leaves", 13, 14, 12, 13);

  //* Creating side stones with for loop
  for (let i = 0; i < 4; i++) {
    inject("stone", 11 + i, 15, 0 + i, 1 + i);
  }

  //* Creating clouds (row,untilRow,col,untilCol)
  createClouds(3, 5, 4, 6);
  createClouds(2, 4, 17, 21);

  //* Creating Tree-Leaves (row,untilRow,col,untilCol)
  createLeaves(8, 12, 23, 24);
};

startBtn.addEventListener("click", restart);

resetGameBtn.addEventListener("click", () => {
  location.reload();
});

function inject(element, row, untilRow, col = 0, untilCol = matrix[0].length) {
  for (let i = row; i < untilRow; i++) {
    for (let j = col; j < untilCol; j++) {
      matrix[i][j].classList.value = element;
    }
  }
}
function createClouds(row, untilRow, col, untilCol) {
  for (let i = 0; i < untilRow - row; i++) {
    inject("cloud", row + i, untilRow, col - i, untilCol + i);
  }
}
function createLeaves(row, untilRow, col, untilCol) {
  for (let i = 0; i < untilRow - row; i++) {
    inject("leaves", row + i, untilRow, col - i, untilCol + i);
  }
}

function putElement(storageElement) {
  axeClicked = false;
  pickaxeClicked = false;
  shovelClicked = false;
  axe.style.background = "#000";
  pickaxe.style.background = "#000";
  shovel.style.background = "#000";
  let elementClicked;
  if (storageElement.innerHTML > 0) {
    elementClicked = true;
  }
  mainGame.addEventListener("click", (e) => {
    if (elementClicked === true) {
      let matrixlocation =
        matrix[e.target.attributes.rows.value][e.target.attributes.cols.value]
          .classList.value;
      if (matrixlocation !== "sky") {
        return null;
      } else {
        matrix[e.target.attributes.rows.value][
          e.target.attributes.cols.value
        ].classList.value = storageElement.classList[1];
        pickedElement[storageElement.classList[1]]--;
        storageElement.innerHTML = pickedElement[storageElement.classList[1]];
        elementClicked = false;
        return;
      }
    }
  });
}
storages.forEach((el) => {
  el.addEventListener("click", () => putElement(el));
});

let axeClicked;
let pickaxeClicked;
let shovelClicked;
axe.addEventListener("click", () => {
  if (axeClicked) {
    axeClicked = false;
    axe.style.background = "#000";
    mainGame.style.cursor = `url("../img/iron_axe.png"), auto`;
  } else {
    axeClicked = true;
    pickaxeClicked = false;
    shovelClicked = false;
    axe.style.background = "blue";
    pickaxe.style.background = "#000";
    shovel.style.background = "#000";
  }
});
pickaxe.addEventListener("click", () => {
  if (pickaxeClicked) {
    pickaxeClicked = false;
    pickaxe.style.background = "#000";
  } else {
    axeClicked = false;
    pickaxeClicked = true;
    shovelClicked = false;
    axe.style.background = "#000";
    pickaxe.style.background = "blue";
    shovel.style.background = "#000";
  }
});
shovel.addEventListener("click", () => {
  if (shovelClicked) {
    shovelClicked = false;
    shovel.style.background = "#000";
  } else {
    axeClicked = false;
    pickaxeClicked = false;
    shovelClicked = true;
    axe.style.background = "#000";
    pickaxe.style.background = "#000";
    shovel.style.background = "blue";
  }
});

mainGame.addEventListener("click", (e) => {
  if (e.target.className === "stone" && pickaxeClicked) {
    e.target.className = "sky";
    pickedElement.stone++;
    counter = pickedElement.stone;
    storageStone.innerHTML = counter;
  }
  if (e.target.className === "leaves" && axeClicked) {
    e.target.className = "sky";
    pickedElement.leaves++;
    counter = pickedElement.leaves;
    storageLeaves.innerHTML = counter;
  }
  if (e.target.className === "wood" && axeClicked) {
    e.target.className = "sky";
    pickedElement.wood++;
    counter = pickedElement.wood;
    storageWood.innerHTML = counter;
  }
  if (e.target.className === "grass" && shovelClicked) {
    e.target.className = "sky";
    pickedElement.grass++;
    counter = pickedElement.grass;
    storageGrass.innerHTML = counter;
  }
  if (e.target.className === "soil" && shovelClicked) {
    e.target.className = "sky";
    pickedElement.soil++;
    counter = pickedElement.soil;
    storageSoil.innerHTML = counter;
  }
});
