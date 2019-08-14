const dataTemplate =
{
  jan: {
    income: [
              {
                "date":         1,
                "description":  "income",
                "amount":       1.00,
                "category":     "Salary",
                "id":           1
              },
            ],
    incomeCount: 1,
    expenses: [
                {
                  "date":         1,
                  "description":  "expense",
                  "amount":       1.00,
                  "category":     "Food and Groceries",
                  "id":           1
                },
              ],
    expensesCount: 1,
    settings: {
      budgetExpense: 0,
      budgetExpanded: [0, 0, 0, 0, 0, 0],
      isBudgetExpanded: false,
      startingBalance: 0,
      balanceTracking: false,
      defaultSort:        "Id",
    }
  }
}

export { dataTemplate };
