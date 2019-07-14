document.addEventListener('DOMContentLoaded', () => {

  function printTheShifts(){
    let list = document.getElementById('shifts-list');
    axios.get('http://localhost:3000/shift/api')
    .then((response)=>{
      let arrayOfShifts = response.data.reverse();
      list.innerHTML = "";
      arrayOfShifts.forEach((eachShift)=>{
        let newDiv = document.createElement('div');
        newDiv.setAttribute("class", "each-shift");
        newDiv.innerHTML = `
        <h4>${eachShift.assigned}: ${eachShift.start} - ${eachShift.end}</h4>
        `
        list.appendChild(newDiv);
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  printTheShifts();

  let addButton = document.getElementById('add-btn');
  addButton.onclick = ()=>{
    let assigned = document.getElementById('assigned');
    let start = document.getElementById('start');
    let end = document.getElementById('end');

    axios.post('http://localhost:3000/shifts/api', {
      assigned: assigned.value,
      start: start.value,
      end: end.value
    })
    .then((res)=>{
        printTheShifts();
    })
    .catch((err)=>{
      console.log(err);
    })

    assigned.value = "";
    start.value = "";
    end.value = "";
  }

}, false);