
import * as render from './utils/render.js';
import { Expense } from './models/Expense.js'
import { ExpenseTracker } from './utils/ExpenseTracker.js'

const mainScreen = document.querySelector('body');
const savedData = localStorage.getItem('SavedExpenses');
const savedId = localStorage.getItem('SavedId');
let allExpenses = [];
let id = 0;

if (savedData) {
    allExpenses = JSON.parse(savedData).map(data => {
        return new Expense(data.name, data.amount, data.category, data.date, data.id);
    });
    id = JSON.parse(savedId);
    const manager = new ExpenseTracker(allExpenses);
        if (allExpenses.length > 0) {
            mainScreen.innerHTML = render.expenseScreen(manager);
            render.renderCard(allExpenses); 
        }
        else {
            mainScreen.innerHTML = render.defaultScreen();
        }
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

mainScreen.addEventListener('click', (e) => {
    const userInput = document.querySelectorAll('.user_input');
    const backButton = e.target.closest('.back');
    if (backButton) {
        const manager = new ExpenseTracker(allExpenses);
        mainScreen.innerHTML = render.expenseScreen(manager);
        render.renderCard(allExpenses);
    }

    const cancelButton = e.target.closest('#cancel_btn');
    if (cancelButton) {
        const manager = new ExpenseTracker(allExpenses);
        mainScreen.innerHTML = render.expenseScreen(manager);
        render.renderCard(allExpenses);
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
            const newExpense = new Expense(userInput[0].value, Number(userInput[1].value), userInput[2].value, userInput[3].value, id);
            allExpenses.push(newExpense);
            const manager = new ExpenseTracker(allExpenses);
            id++;
            mainScreen.innerHTML = render.expenseScreen(manager);
            render.renderCard(allExpenses);  
            saveData();
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

let dotMenu = '';

mainScreen.addEventListener('click', e => {
    const floatingAdd = e.target.closest('.floating_add');

    if (floatingAdd) {
        mainScreen.innerHTML = render.formScreen();
    }

    const dotButton = e.target.closest('.more_button');

    if (dotButton) {
        e.stopPropagation();
        dotMenu = dotButton.querySelector('.more_content');

        document.querySelectorAll('.more_content').forEach(m => {
            if (m !== dotMenu) m.classList.remove('show');
        });

        dotMenu.classList.toggle('show');
    }
});

mainScreen.addEventListener('click', e => {
    
    const editButton = e.target.closest('.edit_btn');

    if (editButton) {
        e.preventDefault();
        const mainCard = editButton.closest('.expense_card');
        const editIndex = allExpenses.findIndex( expense => +mainCard.dataset.id === +expense.id);
        mainScreen.innerHTML = render.updateScreen(allExpenses[editIndex]); 

    }

    const deleteButton = e.target.closest('.del_btn');

    if (deleteButton) {
        e.preventDefault();
        const mainCard = deleteButton.closest('.expense_card');
        const removeIndex = allExpenses.findIndex( expense => +mainCard.dataset.id === +expense.id);
        mainCard.remove();
        allExpenses.splice(removeIndex, 1);

        if (allExpenses.length > 0) {
            const manager = new ExpenseTracker(allExpenses);
            mainScreen.innerHTML = render.expenseScreen(manager);
            render.renderCard(allExpenses);
        }
        else {
            mainScreen.innerHTML = render.defaultScreen();
        }

        saveData();
    }   
});

mainScreen.addEventListener('click', (e) => {
    const userInput = document.querySelectorAll('.user_input');

    const updateButton = e.target.closest('.update_btn');
    if (updateButton) {
        let eligible = true;

        userInput.forEach(input => {
            if (input.value.trim() == '') {
                eligible = false;
            }
        }); 

        if (eligible) {
            const expenseForm = document.querySelector('.add_expense');
            const updateIndex = allExpenses.findIndex( expense => +expenseForm.dataset.id === +expense.id);
            allExpenses[updateIndex] = { ...allExpenses[updateIndex], 
                name: userInput[0].value, 
                amount: Number(userInput[1].value), 
                category: userInput[2].value, 
                date: userInput[3].value
        };
            
            const manager = new ExpenseTracker(allExpenses);
            mainScreen.innerHTML = render.expenseScreen(manager);
            render.renderCard(allExpenses);  
            saveData();
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



const saveData = () => {
    localStorage.setItem('SavedExpenses', JSON.stringify(allExpenses));
    localStorage.setItem('SavedId', JSON.stringify(id));
}  



