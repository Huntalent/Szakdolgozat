/*--------------------------------------------------------------
# Navbar
--------------------------------------------------------------*/
// navbar működése, kattintásra nyíljon meg és záródjon össze//
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

/*--------------------------------------------------------------
# Datepicker
--------------------------------------------------------------*/
// datepicker jelenjen meg kattintásra 
$(function () {
  $("#min-datepicker").datepicker({
    autoclose: true,
    clearBtn: true,
    format: 'yyyy-mm-dd',
    // todayBtn: "linked",
    // todayHighlight: true,
    startDate: "2022-05-31",
    endDate:'2023-05-31'
  });
});

$(function () {
  $("#max-datepicker").datepicker({
    autoclose: true,
    clearBtn: true,
    format: 'yyyy-mm-dd',
    // todayBtn: "linked",
    // todayHighlight: true,
    startDate: "2022-05-31",
    endDate:'2023-05-31'
  });
});

//Feltöltöm a kezdeti és záró dátumokat 
let startDateGraph = new Date();
let endDateGraph = new Date()

$('#btn').on('click', function(){
  let minDate = new Date($('#min-date').val());
  let maxDate = new Date($('#max-date').val());
  let sday = minDate.getDate();
  let smonth = minDate.getMonth() + 1;
  let syear = minDate.getFullYear();
  let eday = maxDate.getDate();
  let emonth = maxDate.getMonth() + 1;
  let eyear = maxDate.getFullYear();

  if(sday < 10){
    sday = "0" + sday;
    
  }
  if(smonth < 10) {
    smonth = "0" + smonth
    
  }

  if(eday < 10){
    eday = "0" + eday;
   
  }
  if(emonth < 10) {
    emonth = "0" + emonth

  }

  startDateGraph = [syear, smonth, sday].join('-');
  endDateGraph = [eyear, emonth, eday].join('-');

  if ((Date.parse(endDateGraph) <= Date.parse(startDateGraph))) {
    document.getElementById("max-date").value = "";
    endDateGraph = "Nan";
    textType = 1;
  }  

});

//datepicker magyarosítása
$.fn.datepicker.dates["en"] = {
  days: ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"],
  daysShort: ["Vas", "Hét", "Ked", "Szer", "Csüt", "Pén", "Szom"],
  daysMin: ["Va", "Hé", "Ke", "Sz", "Cs", "Pé", "Szo"],
  months: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
  monthsShort: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec"],
  // today: "Mai nap",
  clear: "Törlés",
  format: "yyyy-mm-dd",
  titleFormat: "yyyy MM",
  weekStart: 0,
};

/*--------------------------------------------------------------
# Grafikon 
--------------------------------------------------------------*/
const btn = document.querySelector('#btn');     
const ctx = document.getElementById('myChart');
const radioButtons = document.querySelectorAll('input[name="type"]');
const checkedButtons = document.querySelectorAll('input[name="invests"]');
const checkedValues= document.querySelectorAll('input[name="values"]');
const graphTime = document.createElement('span');
const graphTimeShow = document.querySelector('#graphTime');
const requireStartDate = document.getElementById("min-date").required = true;
const inlineValidation = document.querySelector(".inline-error");

let chartStatus = Chart.getChart("myChart"); 
let selectedGraph = "line";
let selectedInvest = "AAPL";
let selectedValue = "open";
let textType = 0;

//A diagram típusait változtatja kattintásra
function getTypes(){
  //Mely diagram típus van kiválasztva
  for (const radioButton of radioButtons) {
    radioButton.addEventListener('change', showSelectedType);
  }

  //Mely befektetés van kiválasztva 
  for (const checkedButton of checkedButtons) {
    checkedButton.addEventListener('change', showSelectedInvest);
  }

  //Mely árfolyam van kiválasztva 
  for (const checkedValue of checkedValues) {
    checkedValue.addEventListener('change', showSelectedValues);
  }
}

function showSelectedType() {
    if (this.checked) {                       
      selectedGraph = this.value;
    }
}

function showSelectedInvest() {
  if (this.checked) {                       
    selectedInvest = this.value;
  }
}

function showSelectedValues() {
  if (this.checked) {                    
    selectedValue = this.value;
  }
}

//Grafikon felett megjelennek a kiválasztott aktuális dátumok
function addGraphTime() {
  graphTime.textContent = `Grafikon (${startDateGraph}  -  ${endDateGraph})`;
  graphTime.classList.add("graph-time");
  graphTimeShow.appendChild(graphTime);
  if(graphTimeShow.getElementsByClassName("graph-time").length > 1){
    const dateToRemove = document.querySelectorAll('#graphTime span');
    dateToRemove[0].remove()
  }
}

function removeGraphTime(){
  graphTime.textContent = "";
}
//Nem lehet dátum nélkül grafikont megjeleníteni
function missingDates(){
  let emptydate = 0;
  for (const sdate of startDateGraph) {
    if(sdate === "N"){
      emptydate = 1
      break;
    } else {
      emptydate = 0
    }
  }

  for (const edate of endDateGraph) {
    if(edate === "N"){
      emptydate = 1
      break;
    }
  }

  return emptydate
}

//Ha már van egy grafikon akkor ahelyett újat készít
function makeNewChart() {
  let chartStatus = Chart.getChart("myChart"); 
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
}

//Kiírja a label nevét az adott befektetés alapján
function getLabel(){
  let selectedName = "";
  switch(selectedInvest) {
    case "AAPL":
      selectedName = "Alacsony kockázatú befektetések";
      break;
    case "AMZN":
      selectedName = "Közepes kockázatú befektetések";
      break;
    case "GOOGL":
      selectedName = "Magas kockázatú befektetések";
      break;
    case "META":
      selectedName = "Családi csomag";
      break;
    case "MSFT":
      selectedName = "Európai portfólió";
      break;
    case "TSLA":
      selectedName = "Megújuló energia";
      break;
  }
  return selectedName
}


/*--------------------------------------------------------------
# Grafikon létrehozása
--------------------------------------------------------------*/
btn.addEventListener("click", async () =>  {
  //Ha az missingDates "üres", akkor mindkettő dátum ki van választva és megjelenhet a grafikon
  if (missingDates() != 0){
    switch(textType) {
      case 0:
        inlineValidation.innerText = "Kötelező megadni a kezdeti és záró dátumot!";
        break;
      case 1:
        inlineValidation.innerText = "A záró dátum nem lehet nagyobb, vagy egyenlő, mint a kezdő dátum!";
        break;
    }

    makeNewChart()

    removeGraphTime()

  } else{
    const url = `http://localhost:8080/api?ticker=${selectedInvest}&&start_date=${startDateGraph}&end_date=${endDateGraph}`;
    const stockValues = await fetchStockValues(url)

    inlineValidation.innerText = ""

    makeNewChart()

    getTypes()  

    //Grafikon paraméterei
    new Chart(ctx, {
        type: selectedGraph,
        data: {
          labels: stockValues.map(stockValue => stockValue.date),
          datasets: [{
            label: getLabel(),
            data: stockValues.map(stockValue => stockValue[selectedValue]),
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: addGraphTime()
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
  }  
});

async function fetchStockValues(url){
  return fetch(url)
   .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
   }).catch(error => {
    console.log(error);
   })
}