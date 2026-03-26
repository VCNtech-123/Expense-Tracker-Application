
import * as render from './utils/render.js';
import { Expense } from './models/Expense.js'
import { ExpenseTracker } from './utils/ExpenseTracker.js'

const mainScreen = document.querySelector('body');
const savedData = localStorage.getItem('SavedExpenses');
let allExpenses = [];


if (savedData) {
    allExpenses = JSON.parse(savedData).map(data => {
        return new Expense(data.name, data.amount, data.category, data.date);
    });
    const manager = new ExpenseTracker(allExpenses);
    mainScreen.innerHTML = render.expenseScreen(manager);
    render.renderCard(allExpenses); 
} else {
    mainScreen.innerHTML = render.defaultScreen();
}

let userInput = '';

mainScreen.addEventListener('click', (e) => {
    const startButton = e.target.closest('.add_first');

    if (startButton) {
        mainScreen.innerHTML = render.formScreen();
        userInput = document.querySelectorAll('.user_input');
    }
});

let recentScreen = render.defaultScreen();

mainScreen.addEventListener('click', (e) => {
    const userInput = document.querySelectorAll('.user_input');
    const backButton = e.target.closest('.back');
    if (backButton) {
        mainScreen.innerHTML = recentScreen;
    }

    const cancelButton = e.target.closest('#cancel_btn');
    if (cancelButton) {
        mainScreen.innerHTML = recentScreen;
    }

    const addButton = e.target.closest('#add_btn');
    if (addButton) {
        let eligible = true;

        userInput.forEach(input => {
            if (input.value.trim() == '') {
                eligible = false;
            }
        }); 

        if (eligible) {
            const newExpense = new Expense(userInput[0].value, Number(userInput[1].value), userInput[2].value, userInput[3].value);
            allExpenses.push(newExpense);
            const manager = new ExpenseTracker(allExpenses);
            mainScreen.innerHTML = render.expenseScreen(manager);
            render.renderCard(allExpenses);  
            saveData()
            recentScreen = mainScreen.innerHTML;
        }
        else {
            const form = document.querySelector('.add_expense');
            let warning = form.querySelector('.warning');

            if (!warning) {
                warning = document.createElement('p');
                warning.classList.add('warning');
                warning.textContent = 'All Inputs Required! Please Try Again!';
                form.prepend(warning);
            }
        }
    }
});

mainScreen.addEventListener('click', e => {
    const floatingAdd = e.target.closest('.floating_add');

    if (floatingAdd) {
        mainScreen.innerHTML = render.formScreen();
    }

    const dotButton = e.target.closest('.more_button');

    if (dotButton) {
        e.stopPropagation();
        const dotMenu = dotButton.querySelector('.more_content');

        document.querySelectorAll('.more_content').forEach(m => {
            if (m !== dotMenu) m.classList.remove('show');
        });

        dotMenu.classList.toggle('show');
    }
});


const saveData = () => {
    localStorage.setItem('SavedExpenses', JSON.stringify(allExpenses));
}

