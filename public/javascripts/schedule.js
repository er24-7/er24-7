$(document).ready(function () {

  let arrayOfDaysOfTheWeek = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  let table = document.getElementById('schedule');
  table.innerHTML = "";
  for (j = 1; j <= 3; j++) {
    for (i = 0; i <= (arrayOfDaysOfTheWeek.length - 1); i++) {
      let newDiv = document.createElement('div');
      newDiv.setAttribute("class", "each-slot");
      newDiv.innerHTML = `
          <input type="checkbox" id="${arrayOfDaysOfTheWeek[i]}${j}" name="codes" value="${arrayOfDaysOfTheWeek[i]}${j}">
          <p class="slot-label">${arrayOfDaysOfTheWeek[i]}${j}</p>
        `
      table.appendChild(newDiv);
    }
  }
});