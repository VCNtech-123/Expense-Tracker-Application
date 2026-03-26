
export class ExpenseTracker {

    constructor (expenses) {
        this.expenses = expenses;
        this.currentIndex = 0;
    }

    getTotalExpense = () => {

       return this.expenses.reduce((acc, cur) => {
            return acc + cur.amount;
        }, 0);
    }

    getAmountAverage = () => {

        const semiTotal = this.expenses.reduce ((acc, cur) => {
            return acc + cur.amount;
        }, 0)

        return semiTotal / this.expenses.length
    }

    getTopCategory = () => {
        const counts = {};

        this.expenses.forEach(expense => {
            counts[expense.category] = (counts[expense.category] || 0) + 1;
        });

        let topCategory = '';
        let maxCount = 0;

        for (const category in counts) {
            if (counts[category] > maxCount) {
                maxCount = counts[category];
                topCategory = category;
            }
        }

        return topCategory;
    }
}