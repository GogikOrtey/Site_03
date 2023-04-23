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
    headerRow.appendChild(headerCell);
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
  Выводить оригинальную таблицу, когда не заданы уровни сортировки
  Сделать обновление таблицы не по изменению параметров, а по нажатию кнопки "Построить"
  Добавить API для галочек

  И останется сделать фильтрацию записей
*/

// Получаем ссылку на таблицу
let table = document.getElementById("my-table");
let butt_sort = document.getElementById("butt-sort");

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

//console.log(data);

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

  //console.log(data);
  
  table.remove();
  
  var newTable = createTable(data);
  
  var container = document.getElementById("table-container");
  container.insertBefore(newTable, container.firstChild);

  table = document.getElementById("my-table");
}

butt_sort.addEventListener('click', () => {
  console.log('Кнопка нажата!');
  ReqSort();
});


// Для получения значения выбранного переключателя:

/*
const radioButtons = document.querySelector('.block-03 .center-edge-2 select');
console.log(radioButtons[0].value);
*/

const selectElement1 = document.querySelector('.block-03 .l1 select');

selectElement1.addEventListener('change', function() {
  let selectedValue = selectElement1.value;  
  console.log('opt_mass[0] = ' + selectedValue);
  opt_mass[0] = selectedValue;
});

const selectElement2 = document.querySelector('.block-03 .l2 select');

selectElement2.addEventListener('change', function() {
  let selectedValue = selectElement2.value;  
  console.log('opt_mass[1] = ' + selectedValue);
  opt_mass[1] = selectedValue;
});

const selectElement3 = document.querySelector('.block-03 .l3 select');

selectElement3.addEventListener('change', function() {
  let selectedValue = selectElement3.value;  
  console.log('opt_mass[2] = ' + selectedValue);
  opt_mass[2] = selectedValue;
});

//Для получения значений выбранных флажков:

const checkboxes = document.querySelectorAll('.block-03 .right-edge-2 input[type="checkbox"]');
const checkedValues = [];

checkboxes.forEach(checkbox => {
  if (checkbox.checked) {
    checkedValues.push(checkbox.value);
  }
});

console.log(checkedValues);