function sortDataByName(data, headers, opt_mass, opt_bool_mass) {
  data.sort((a, b) => {
    for(let i = 0; i < opt_mass.length; i++) {

      let outpInd = opt_mass[i] - 1;
      outpInd = parseInt(outpInd);

      if((outpInd >= 0) && (outpInd < 5)) {
        let navOpt = headers[outpInd];
        //console.log('navOpt = ' + navOpt);

        let nameA = a[navOpt].toLowerCase();
        let nameB = b[navOpt].toLowerCase();

        if((!(isNaN(parseInt(nameA)) || !isFinite(nameA))) &&
           (!(isNaN(parseInt(nameB)) || !isFinite(nameB))) ) {

          nameA = parseFloat(nameA);
          nameB = parseFloat(nameB);
        }

        let bool = opt_bool_mass[i];
  
        if (nameA < nameB) {
          if (bool == true) { return 1 } else { return -1 }
        }
        else if (nameA > nameB) {
          if (bool == true) { return -1 } else { return 1 }
        }
      }      
    }
    return 0;
  });
}

function createTable(data) {
  // Создаем элемент таблицы
  var table = document.createElement("table");
  table.id = 'my-table';

  // Создаем заголовок таблицы
  var headerRow = document.createElement("tr");
  var headerNames = ["Название", "Год выхода", "Рейтинг на кинопоиске", "Жанр", "Количество частей"];
  for (var i = 0; i < headerNames.length; i++) {
    var headerCell = document.createElement("th");
    headerCell.textContent = headerNames[i];
    //headerCell.className = 'title';
    headerRow.appendChild(headerCell);    
    headerRow.className = 'title';
  }
  table.appendChild(headerRow);

  // Создаем строки таблицы
  for (var j = 0; j < data.length; j++) {
    var row = document.createElement("tr");
    var item = data[j];
    var keys = Object.keys(item);
    for (var k = 0; k < keys.length; k++) {
      var cell = document.createElement("td");
      cell.textContent = item[keys[k]];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  // Возвращаем таблицу
  return table;
}

// --------------------

/*
  Убирать из функций те, что мы уже использовали

  И останется сделать фильтрацию записей
*/

// Получаем ссылку на таблицу
let table = document.getElementById("my-table");
let butt_sort = document.getElementById("butt-sort");
let butt_filter = document.getElementById("butt-filter");

if(table == undefined) { 
  alert('Ошибка! На странице не обнаружена требуемая таблица!');
}

// Получаем список заголовков столбцов
const headers = [];
for (let i = 0; i < table.rows[0].cells.length; i++) {
  headers[i] = table.rows[0].cells[i].textContent;
}

console.log(headers);

// Проходим по каждой строке таблицы и сохраняем ее содержимое в массив словарей
let data = [];

for (let i = 1; i < table.rows.length; i++) {
  const tableRow = table.rows[i];
  const rowData = {};

  // Проходим по каждой ячейке в строке и сохраняем ее содержимое в соответствующий заголовок столбца
  for (let j = 0; j < tableRow.cells.length; j++) {
    rowData[headers[j]] = tableRow.cells[j].textContent;
  }

  data.push(rowData);
}

console.log(data);
let data_1 = data;

let opt_mass = [];

opt_mass[0] = 0;
opt_mass[1] = 0;
opt_mass[2] = 0;

let opt_bool_mass = [];

opt_bool_mass[0] = false;
opt_bool_mass[1] = false;
opt_bool_mass[2] = false;

// Пересобираем таблицу
function ReqSort() {
  sortDataByName(data, headers, opt_mass, opt_bool_mass);
  data_1 = data;

  //console.log(data);
  
  table.remove();
  
  var newTable = createTable(data);
  
  var container = document.getElementById("table-container");
  container.insertBefore(newTable, container.firstChild);

  table = document.getElementById("my-table");
}

butt_sort.addEventListener('click', () => {
  //console.log('Кнопка нажата!');
  check_checkboxes_1();
  ReqSort();
});

let strMass = ["", "", 0, 0, 0, 0];

function setSortTable(date, strMass) {
  //console.log('date = ' + date);

  let outDate = [];

  for(let j = 2; j < strMass.length; j++) {
    if(strMass[j] == "") strMass[j] = 0;
    else strMass[j] = parseInt(strMass[j]);
  }

  console.log('strMass = ' + strMass);

  // Прохожу по всем записям в массиве date
  // Если запись соответствует всем условиям, то я добавляю её в выходной массив
  for(let i = 0; i < date.length; i++) {
    let bool = true;

    if(strMass[0] != "") {
      //console.log('strMass[0] = ' + strMass[0] );
      if (date[i].Название.indexOf(strMass[0]) === -1) {
        bool = false;
      }
    }
    if(strMass[1] != "") {
      //console.log('strMass[1] = ' + strMass[1] );
      if (date[i].Жанр.indexOf(strMass[1]) === -1) {
        bool = false;
      }
    }
    if(strMass[2] != 0) {
      if(date[i]["Количество частей"] != strMass[2]) {
        bool = false;
      }
    }
    if(strMass[3] != 0) {
      if(date[i]['Год выхода'] < strMass[3]) {
        bool = false;
      }
    }
    if(strMass[4] != 0) {
      if(date[i]['Год выхода'] > strMass[4]) {
        bool = false;
      }
    }
    if(strMass[5] != 0) {
      if(date[i]['Рейтинг на кинопоиске'] < strMass[5]) {
        bool = false;
      }
    }
    if(strMass[6] != 0) {
      if(date[i]['Рейтинг на кинопоиске'] > strMass[6]) {
        bool = false;
      }
    }


    if(bool == true) {
      outDate.push(date[i]);
    }
  }

  return outDate;
}

/*
  Прикрутить источник фильтраци к странице

  Добавить кнопку сбросить все фильтры и сортировки
  Если при фильтре записей не найдено, выводить надпись об этом, а не пустую таблицу
*/


// Пересобираем таблицу
function ReqFilter() {
  // sortDataByName(data, headers, opt_mass, opt_bool_mass);

  strMass = ["", "", "", "", "", "", "1"]; // Нужно получить из страницы

  let inDate = setSortTable(data_1, strMass);  

  //console.log(data);
  
  table.remove();
  
  var newTable = createTable(inDate);
  
  var container = document.getElementById("table-container");
  container.insertBefore(newTable, container.firstChild);

  table = document.getElementById("my-table");
}

butt_filter.addEventListener('click', () => {
  console.log('Кнопка фильтра нажата!');
  check_checkboxes_1();
  ReqFilter();
});

// Массив, в котором хранятся все строки значений списка
let allElemMass = [];
/*
allElemMass[0] = '<option value="0">--- Нет ---</option>';
allElemMass[1] = '<option value="1">Название</option>';
allElemMass[2] = '<option value="2">Год выхода</option>';
allElemMass[3] = '<option value="3">Рейтинг в кинопоиске</option>';
allElemMass[4] = '<option value="4">Жанр</option>';
allElemMass[5] = '<option value="5">Количество сезонов</option>';
*/

allElemMass[0] = '--- Нет ---';
allElemMass[1] = 'Название';
allElemMass[2] = 'Год выхода';
allElemMass[3] = 'Рейтинг в кинопоиске';
allElemMass[4] = 'Жанр';
allElemMass[5] = 'Количество сезонов';

// Выозвращает нужный элемент option
function getNumElem(name) {
  // Получаем элемент с id = "sort-opt"
  let sortOpt = document.getElementById("sort-opt");
  // Получаем элемент с классом l1 внутри sortOpt
  let l1 = sortOpt.getElementsByClassName(name)[0];
  // Получаем элемент select внутри l1
  let select = l1.getElementsByTagName("select")[0];
  return select;
}

/*
function reqInputElements(indDesel) {

  console.log('itsElementFree = ' + itsElementFree);

  let a = getNumElem('l1');
  let b = getNumElem('l2');
  let c = getNumElem('l3');

  for(let j = 0; j < 3; j++) {

    if(j == 0) a.innerHTML = '';
    if(j == 1) b.innerHTML = '';
    if(j == 2) c.innerHTML = '';

    for(let i = 0; i < 6; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.text = allElemMass[i];
      if(opt_mass[j] == i) {
        option.selected = true;
        console.log('opt_mass[' + j + '] = ' + i);
      }

      if(j == 0) a.appendChild(option);
      if(j == 1) b.appendChild(option);
      if(j == 2) c.appendChild(option);
    }   
  }
}
*/

function reqInputElements(indDesel) {

  console.log('itsElementFree = ' + itsElementFree);

  if(opt_mass[0] == 0 && opt_mass[1] == 0 && opt_mass[2] == 0) {
    itsElementFree = [0, 0, 0, 0, 0];
  }

  let a = getNumElem('l1');
  let b = getNumElem('l2');
  let c = getNumElem('l3');

  for(let j = 0; j < 3; j++) {

    if(j == 0) a.innerHTML = '';
    if(j == 1) b.innerHTML = '';
    if(j == 2) c.innerHTML = '';

    for(let i = 0; i < 6; i++) {
      if ((itsElementFree[i] != 1) || (opt_mass[j] == i)) {
        let option = document.createElement("option");
        option.value = i;
        option.text = allElemMass[i];
        if(opt_mass[j] == i) {
          option.selected = true;
          console.log('opt_mass[' + j + '] = ' + i);
        }
  
        if(j == 0) a.appendChild(option);
        if(j == 1) b.appendChild(option);
        if(j == 2) c.appendChild(option);
      }
    }   
  }
}

// Для получения значения выбранного переключателя:

/*
const radioButtons = document.querySelector('.block-03 .center-edge-2 select');
console.log(radioButtons[0].value);
*/

let itsElementFree = [0, 0, 0, 0, 0];
let bufMass = [0, 0, 0];

const selectElement1 = document.querySelector('.block-03 .l1 select');

selectElement1.addEventListener('change', function() {
  let selectedValue = selectElement1.value;  
  //console.log('selectElement1.value = ' + selectElement1.value);
  opt_mass[0] = selectedValue;

  if(selectedValue != 0) {
    itsElementFree[selectedValue] = 1;
  } else {
    itsElementFree[bufMass[0]] = 0;
  }

  bufMass[0] = selectedValue;
  reqInputElements(1);
});

const selectElement2 = document.querySelector('.block-03 .l2 select');

selectElement2.addEventListener('change', function() {
  let selectedValue = selectElement2.value;  
  console.log('opt_mass[1] = ' + selectedValue);
  opt_mass[1] = selectedValue;

  if(selectedValue != 0) {
    itsElementFree[selectedValue] = 1;
  } else {
    itsElementFree[bufMass[1]] = 0;
  }

  bufMass[1] = selectedValue;
  reqInputElements(2);
});

const selectElement3 = document.querySelector('.block-03 .l3 select');

selectElement3.addEventListener('change', function() {
  let selectedValue = selectElement3.value;  
  console.log('opt_mass[2] = ' + selectedValue);
  opt_mass[2] = selectedValue;

  if(selectedValue != 0) {
    itsElementFree[selectedValue] = 1;
  } else {
    itsElementFree[bufMass[2]] = 0;
  }

  bufMass[2] = selectedValue;
  reqInputElements(3);
});

//Для получения значений выбранных флажков:

const checkboxes = document.querySelectorAll('.block-03 input[type="checkbox"]');
let checkedValues = [];

check_checkboxes_1();

function check_checkboxes_1() {
  checkedValues = [];
  checkboxes.forEach(checkbox => {
    checkedValues.push(checkbox.checked);
  });
  
  //console.log(checkedValues);
  opt_bool_mass = checkedValues;
}

/*
// Функция для удаления опции по индексу
function deleteOption(index, name) {

  if(indMinusser>1){index-=(indMinusser-1)}
  console.log('Delete: index = ' + index + ' name = ' + name);

  // Получаем элемент с id = "sort-opt"
  let sortOpt = document.getElementById("sort-opt");
  // Получаем элемент с классом l1 внутри sortOpt
  let l1 = sortOpt.getElementsByClassName(name)[0];
  // Получаем элемент select внутри l1
  let select = l1.getElementsByTagName("select")[0];
  // Проверяем, что индекс в допустимом диапазоне
  if (index >= 0 && index <= 5) {
    // Удаляем опцию с заданным индексом
    select.remove(index);
  } else {
    // Восстанавливаем все опции изначально
    select.innerHTML = `
      <option value="0">--- Нет ---</option>
      <option value="1">Название</option>
      <option value="2">Год выхода</option>
      <option value="3">Рейтинг в кинопоиске</option>
      <option value="4">Жанр</option>
      <option value="5">Количество сезонов</option>
    `;
  }
}

//deleteOption(1, 'l1');

let indMinusser = 0;

/*
// Функция для добавления опции (по индексу), в элемент, по названию класса
function addOption(index, elementClassName) {

  console.log('Inserte: index = ' + index + ' name = ' + elementClassName);

  // Получаем элемент с id = "sort-opt"
  let sortOpt = document.getElementById("sort-opt");
  let element = sortOpt.querySelector("." + elementClassName); // получаем первый элемент по классу
  // Создаем массив с возможными значениями опций
  let options = ["--- Нет ---", "Название", "Год выхода", 
  "Рейтинг в кинопоиске", "Жанр", "Количество сезонов"];
  // Задаём опцию
  let select = element.querySelector("select"); // получаем первый select внутри элемента
  
  // Создаем новый элемент option с заданным индексом и значением
  let option = document.createElement("option");
  option.value = index;
  option.text = options[index];
  // Получаем элемент option, который находится на месте index
  let nextOption = select.options[index];
  // Добавляем новый элемент option перед ним
  select.insertBefore(option, nextOption);
}

//addOption(1, 'l1');
*/
/*
// Функция для добавления опции (по названию), в элемент, по названию класса
function addOptionByName(name, elementClassName) {
  console.log('Inserte: name = ' + name + ' class = ' + elementClassName);
  
  // Получаем элемент с id = "sort-opt"
  let sortOpt = document.getElementById("sort-opt");
  let element = sortOpt.querySelector("." + elementClassName); 
  // получаем первый элемент по классу
  
  // Создаем массив с возможными значениями опций
  let options = ["--- Нет ---", "Название", "Год выхода", 
  "Рейтинг в кинопоиске", "Жанр", "Количество сезонов"];
  
  // Задаём опцию
  let select = element.querySelector("select"); // получаем первый select внутри элемента
  
  // Создаем новый элемент option с заданным значением и текстом
  let option = document.createElement("option");
  option.value = name;
  option.text = name;
  
  // Добавляем новый элемент option в конец списка опций
  select.appendChild(option);
}
*/
