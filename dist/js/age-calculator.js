let invalidDate = false;
let firstTimeEntered = true;

window.addEventListener("load", () => {
    const day = document.getElementById('day');
    const month = document.getElementById('month');
    const year = document.getElementById('year');


    let dayValue = 0;
    let monthValue = 0;
    let yearValue = 0;

    day.addEventListener("keyup", (e) => {
        dayValue = e.target.value;
        checkDate(dayValue, monthValue, yearValue);
    });
    
    month.addEventListener("keyup", (e) => {
        monthValue = e.target.value;
        checkDate(dayValue, monthValue, yearValue);
    });

    year.addEventListener("keyup", (e) => {
        yearValue = e.target.value;
        checkDate(dayValue, monthValue, yearValue);
    });
});

function checkDate(dayValue, monthValue, yearValue) {
    const dateIsValid = isValidDate(dayValue, monthValue, yearValue);

    if (!dateIsValid && !firstTimeEntered) {
        const dayResult = document.getElementById('day-result');
        const monthResult = document.getElementById('month-result');
        const yearResult = document.getElementById('year-result');
        const errorElem = document.getElementById('error');

        yearResult.innerHTML = '--';
        monthResult.innerHTML = '--';
        dayResult.innerHTML = '--';

        invalidDate = true;
        errorElem.classList.remove('hidden');

        return;
    }

    if (dateIsValid) {
        const enteredDate = createDate(yearValue, monthValue, dayValue);
        calculate(enteredDate);
    }
}

function calculate(date) {
    const dayResult = document.getElementById('day-result');
    const monthResult = document.getElementById('month-result');
    const yearResult = document.getElementById('year-result');
    const today = new Date();
    const errorElem = document.getElementById('error');

    let years = today.getFullYear() - date.getFullYear();
    let months = today.getMonth() - date.getMonth();
    let days = today.getDate() - date.getDate();

    if (months < 0) {
        years--;
        months = 12 - Math.abs(months);
    }

    if (days < 0) {
        months--;
        days = 30 - Math.abs(days);
    }

    yearResult.innerHTML = years;
    monthResult.innerHTML = months;
    dayResult.innerHTML = days;

    invalidDate = false;
    errorElem.classList.add('hidden');
    firstTimeEntered = false;
}

function isValidDate(day, month, year) {
    const date = createDate(year, month, day);

    return date.toString() !== "Invalid Date";
}

function createDate(year, month, day) {
    return new Date(`${year}-${month}-${day}`);
}

