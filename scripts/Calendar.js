/**
 * takes current date and assigns to variable.
 */
function currentDate() {
    let time = new Date();
    let today = time.getDate();
    setCurrentDateStyle(today)
}

/**
 * Gets number of days in a month.
 * Code borrowed from stackoverflow.
 * @param {Date} Year
 * @param {Date} Month 
 * @returns {Date} 
 */
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

/**
 * Applies date numbers to calender boxes depending on month. 
 * @param {Date} month 
 * @param {Date} year 
 */
function populateCellsWithCurrentMonthDates(month, year) {
    month++;
    const dates = document.getElementsByClassName('date');
    let thisMonthDays = daysInMonth(month, year);
    for (let i = 0; i < dates.length; i++) {
        dates[i].innerText = i + 1;
        if (dates[i].innerText > thisMonthDays) {
            dates[i].innerText = '';
        }
    }
}

/**
 * Adds current month date to date ID so it can be synced with dagar API.
 * takes current month and applies it to calender.
 * @param {date} month 
 */
function setCalenderDatesIds(month) {
    let time = new Date();
    let year = time.getFullYear();
    const dates = document.getElementsByClassName('date');
    month++;
    if (month < 10) { month = '0' + month; }
    for (let i = 0; i < dates.length; i++) {
        if (i < 9) {
            dates[i].id = `${year}-${month}-0` + (i + 1);
        } else if (i >= 9) {
            dates[i].id = `${year}-${month}-` + (i + 1);
        }
    }
}

/**
 * Loop that applies click event to individual date element.  
 */
function selectCalendarDate() {
    const dates = document.getElementsByClassName('date');
    for (let i = 0; i < dates.length; i++) {
        dates[i].addEventListener('click', boxColorChangeActive);
    }
}

/**
 * @param {Event} event changes color of box based on click and adds active ID.
 */
function boxColorChangeActive(event) {
    const dates = document.getElementsByClassName('date');
    for (const date of dates) {
        if (date.id === event.target.id) {
            date.style.backgroundColor = "rgb(255, 255, 255)";
            setTimeout( () => { date.classList.add("active"); }, 1);
            clearToDoList();
            displayFromLocalStorage();
            addListIds();
            addDateToDoListNumber();
        } else {
            date.classList.remove('active');
            date.style.backgroundColor = "";
        }
    }
}

/**
 * 
 * @param {Date} today applies styling to current date of the month in the calendar.
 */
function setCurrentDateStyle(today) {
    const dates = document.getElementsByClassName('date');
    for (const date of dates) {
        if (today === parseFloat(date.innerText)) {
            date.style.border = "2px solid black";
        }
    }
}

/**
 * Updates circle number based on number of items in the list. 
 */
function addDateToDoListNumber() {
    const list = document.getElementById('ul-items').children.length;
    const dates = document.getElementsByClassName('date');
    const numberOfToDo = document.createElement('p');
    numberOfToDo.className = "toDoCircle";
    numberOfToDo.innerHTML = list;
    for (const date of dates) {
        if (date.classList.contains('active')) {
            date.appendChild(numberOfToDo);
        }else if (list === 0){
            numberOfToDo.remove()
        }
    }
}

/**
 * Populates dates with to do listicles that were previously saved on the specific dates. 
 * Updates number from local storage to reflect amount of todos in list. 
 */
function populateDates() {
    const storedList = JSON.parse(localStorage.getItem('todos')) || [];
    const dates = document.getElementsByClassName('date');
    const counts = {};
    for (let i = 0; i < storedList.length; i++) {
        //Code borrowed from stackoverflow.
        let num = storedList[i].datum;
        counts[num] = counts[num] ? counts[num] + 1 : 1;
        //Code borrowed from stackoverflow.
        for (const date of dates) {
            if (date.id === storedList[i].datum) {
                let box = document.getElementById(date.id);
                let paragraph = document.createElement('p');
                paragraph.className = "toDoCircle";
                paragraph.innerHTML = counts[num];
                box.appendChild(paragraph);
            }
        }
    }
}


