$(document).ready(function () {

  function a(){
    this.classList.toggle('selected');
  }

  let arrayOfDaysOfTheWeek = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  let table = document.getElementById('schedule');
  table.innerHTML = "";
  for (j = 1; j <= 3; j++) {
    for (i = 0; i <= (arrayOfDaysOfTheWeek.length - 1); i++) {
      let newDiv = document.createElement('div');
      newDiv.setAttribute("class", `each-slot each-slot-${j}`);
      newDiv.setAttribute("id", `each-slot-${arrayOfDaysOfTheWeek[i]}${j}`);
      newDiv.innerHTML = `
          <input type="checkbox" id="${arrayOfDaysOfTheWeek[i]}${j}" name="codes" value="${arrayOfDaysOfTheWeek[i]}${j}">
        `
      table.appendChild(newDiv);
      document.querySelector(`#each-slot-${arrayOfDaysOfTheWeek[i]}${j}`).addEventListener('click', a );
    }
  }
});