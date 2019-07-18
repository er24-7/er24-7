$(document).ready(function () {

  let arrayOfDaysOfTheWeek = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  let table = document.getElementById('schedule');
  table.innerHTML = "";
  for (j = 1; j <= 3; j++) {
    for (i = 0; i <= (arrayOfDaysOfTheWeek.length - 1); i++) {
      // let newAnch = document.createElement('a');
      let newAnch = document.createElement('div');
      newAnch.setAttribute("tabindex", "1");
      newAnch.setAttribute("class", "each-slot");
      // newAnch.setAttribute("href", "#");
      newAnch.innerHTML = `
          <input type="checkbox" id="${arrayOfDaysOfTheWeek[i]}${j}" name="codes" value="${arrayOfDaysOfTheWeek[i]}${j}">
        `
      table.appendChild(newAnch);
    }
  }
});





