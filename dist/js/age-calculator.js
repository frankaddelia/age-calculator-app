let invalidDate = false;
let firstTimeEntered = true;

window.addEventListener("load", () => {
    const day = document.getElementById('day');
    const month = document.getElementById('month');
    const year = document.getElementById('year');
    const errorElem = document.getElementById('error');
    const dayResult = document.getElementById('day-result');
    const monthResult = document.getElementById('month-result');
    const yearResult = document.getElementById('year-result');

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

    const checkDate = (dayValue, monthValue, yearValue) => {
        const dateIsValid = isValidDate(dayValue, monthValue, yearValue);
    
        if (!dateIsValid && !firstTimeEntered) {
            clearResults();
    
            invalidDate = true;
            errorElem.classList.remove('hidden');
    
            return;
        }
    
        if (dateIsValid) {
            const enteredDate = createDate(yearValue, monthValue, dayValue);
            calculate(enteredDate);
        }
    }

    const calculate = (date) => {
        const today = new Date();
    
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

    const isValidDate = (day, month, year) => {
        const date = createDate(year, month, day);
    
        return date.toString() !== "Invalid Date";
    }
    
    const createDate = (year, month, day) => {
        return new Date(`${year}-${month}-${day}`);
    }

    const clearResults = () => {
        yearResult.innerHTML = '--';
        monthResult.innerHTML = '--';
        dayResult.innerHTML = '--';
    }
});
