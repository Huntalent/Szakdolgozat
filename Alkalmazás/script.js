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


function getRemoteData() {
    /*
const ticker = document.getElementById('ticker');

const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8080/api?ticker=" + ticker + "&start_date=2023-03-01&end_date=2023-03-31");
xhr.send();
xhr.responseType = "json";
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.response);
    // TODO: cjhartJS adatforrását feltölteni a válasz json-nel
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};    
    */
}