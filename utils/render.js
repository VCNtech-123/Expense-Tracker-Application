const mainScreen = document.querySelector('body');

export const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}


export const defaultScreen = () => {
    return `<header class="top_section">
                <div class="top_header">
                    <div class="header_text">
                        <h1 class="main_header">Expense Tracker  <span class="author">by John Francis Vecina</span></h1>
                        <p class="subtitle">Manage your finances effortlessly</p>
                    </div>
                    <div class="total_expenses">
                            <img src="assets/svg/line-chart.svg" alt="" class="stat_line">
                        <div class="total">
                            <p>TOTAL EXPENSES</p>
                            <h2 class="total_money">$0.00</h2>
                        </div>
                    </div>
                </div>
            </header>

            <main class="current_screen">
                <div class="empty_list">
                    <div class="line"><img src="assets/svg/line-chart.svg" alt="" class="line_chart"></div>
                    <h3 class="no_expenses">No expenses yet</h3>
                    <p class="subtitle">Start tracking by adding your first expense</p>
                    <div class="button"><button class="add add_first">+ Add Expense</button></div>
                </div>
            </main>`
}

export const formScreen = () => {
    return `<header class="top_section">
                <div class="form_header">
                    <p class="back">⇐ Back</p>
                    <h1 class="main_header">Add New Expense</h1>
                    <p class="subtitle">Fill in the details below</p>
                </div>
            </header>

            <main class="current_screen">
                <div class="expense_form">
                    <div class="add_expense">
                        <div class="input_slot">
                            <label for="expense_name" class="input_label" >Expense Name *</label>
                            <input type="text" class="user_input" id="expense_name" placeholder="eg. Coffee, Games, Movie...">
                        </div>
                        <div class="input_slot">
                            <label for="expense_amount" class="input_label">Amount *</label>
                            <input type="number" class="user_input" id="expense_amount" placeholder="$0.00">
                        </div>
                        <div class="input_slot">
                            <label for="expense_category" class="input_label">Category *</label>
                            <select name="category" id="expense_category" class="user_input">
                                <option value="food" class="select_input" data-svg="assets/svg/food.svg">Food</option>
                                <option value="transport" class="select_input">Transport</option>
                                <option value="entertainment" class="select_input">Entertainment</option>
                                <option value="shopping" class="select_input">Shopping</option>
                                <option value="bills" class="select_input">Bills</option>
                                <option value="health" class="select_input">Health</option>
                                <option value="education" class="select_input">Education</option>
                                <option value="other" class="select_input">Other</option>
                            </select>
                        </div>
                        <div class="input_slot">
                            <label for="expense_date" class="input_label">Date *</label>
                            <input type="date" class="user_input" id="expense_date">
                        </div>
                        <div class="form_buttons">
                            <button class="add form_btn" id="cancel_btn">Cancel</button>
                            <button class="add form_btn" id="add_btn">+ Add Expense</button>
                        </div>
                    </div>
                </div>
            </main>`
}

export const expenseScreen = (manager) => {
    return `<header class="top_section">
            <div class="top_header">
                <div class="header_text">
                    <h1 class="main_header">Expense Tracker  <span class="author">by John Francis Vecina</span></h1>
                    <p class="subtitle">Manage your finances effortlessly</p>
                </div>
                <div class="total_expenses">
                        <img src="assets/svg/line-chart.svg" alt="" class="stat_line">
                    <div class="total">
                        <p>TOTAL EXPENSES</p>
                        <h2 class="total_money">$${manager.getTotalExpense().toFixed(2)}</h2>
                    </div>
                </div>
            </div>
            <div class="bottom_header">
                <div class="expense_summary">
                    <p class="subtitle expense_category">TOTAL ITEMS</p>
                    <h2 class="summary_content">${manager.expenses.length}</h2>
                </div>
                <div class="expense_summary">
                    <p class="subtitle expense_category">AVERAGE</p>
                    <h2 class="summary_content">$${manager.getAmountAverage().toFixed(2)}</h2>
                </div>
                <div class="expense_summary">
                    <p class="subtitle expense_category">TOP CATEGORY</p>
                    <h2 class="summary_content">${capitalize(manager.getTopCategory())}</h2>
                </div>
            </div>
        </header>

        <main class="current_screen">
            <div class="expense_list">
                <h3 class="expense_number">No. of Expenses (${manager.expenses.length})</h3>
            </div>
        </main>
        <button class="floating_add">+</button>`
}

export const createCard = (expense, id) => {
    const newCard = document.createElement('div');
    newCard.classList.add('expense_card');
    newCard.dataset.id = id;
    newCard.innerHTML = `<div class="expense_info">
                        <div class="card_svg" id="category_${expense.category}"><img src="assets/svg/${expense.category}.svg" alt="" class="category_svg"></div>
                        <div class="expense_desc">
                            <h3 class="expense_name">${expense.name}</h3>
                            <div class="expense_type">
                                <p class="expense_subtitle exp_type">${capitalize(expense.category)}</p>
                                <p class="expense_subtitle">${expense.date}</p>
                            </div>
                        </div>
                    </div>
                    <div class="expense_funtionality">
                        <div class="total_money" id="exp_amount">$${expense.amount.toFixed(2)}</div>
                        <div class="more_button">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>

                            <div class="more_content">
                                <a href="" class="more_button edit_btn">Edit</a>
                                <div class="border_line"></div>
                                <a href="" class="more_button del_btn">Delete</a>
                            </div>
                        </div>
                    </div>`

    const expenseList = document.querySelector('.expense_list');
    expenseList.appendChild(newCard);
}

export const updateScreen = (expense) => {
    return `<header class="top_section">
                <div class="form_header">
                    <p class="back">⇐ Back</p>
                    <h1 class="main_header">Edit Expense</h1>
                    <p class="subtitle">Fill in the details below</p>
                </div>
            </header>

            <main class="current_screen">
                <div class="expense_form">
                    <div class="add_expense" data-id="${expense.id}">
                        <div class="input_slot">
                            <label for="expense_name" class="input_label" >Expense Name *</label>
                            <input type="text" class="user_input" id="expense_name" placeholder="eg. Coffee, Games, Movie..." value="${expense.name}">
                        </div>
                        <div class="input_slot">
                            <label for="expense_amount" class="input_label">Amount *</label>
                            <input type="number" class="user_input" id="expense_amount" placeholder="$0.00" value="${expense.amount}">
                        </div>
                        <div class="input_slot">
                            <label for="expense_category" class="input_label">Category *</label>
                            <select name="category" id="expense_category" class="user_input">
                                <option value="food" class="select_input">Food</option>
                                <option value="transport" class="select_input">Transport</option>
                                <option value="entertainment" class="select_input">Entertainment</option>
                                <option value="shopping" class="select_input">Shopping</option>
                                <option value="bills" class="select_input">Bills</option>
                                <option value="health" class="select_input">Health</option>
                                <option value="education" class="select_input">Education</option>
                                <option value="other" class="select_input">Other</option>
                            </select>
                        </div>
                        <div class="input_slot">
                            <label for="expense_date" class="input_label">Date *</label>
                            <input type="date" class="user_input" id="expense_date" value="${expense.date}">
                        </div>
                        <div class="form_buttons">
                            <button class="add form_btn second_btn" id="cancel_btn">Cancel</button>
                            <button class="add form_btn update_btn">Update</button>
                        </div>
                    </div>
                </div>
            </main>`
}
export const renderCard = (allExpenses) => {
    allExpenses.forEach ((expense) => {
        createCard(expense, expense.id);
    });
}

