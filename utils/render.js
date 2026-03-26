
const homeHeader = () => {
    return `<div class="top_header">
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
            </div>`
}

const emptyExpenses = () => {
    return `<div class="empty_list">
                <div class="line"><img src="assets/svg/line-chart.svg" alt="" class="line_chart"></div>
                <h3 class="no_expenses">No expenses yet</h3>
                <p class="subtitle">Start tracking by adding your first expense</p>
                <div class="button"><button class="add">+ Add Expense</button></div>
            </div>`
}