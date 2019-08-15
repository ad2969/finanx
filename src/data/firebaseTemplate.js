import expenseCategories, { MAX_EXPENSE_CATEGORIES } from '../lists/expenseCategories';
import incomeCategories from '../lists/incomeCategories';

const dataTemplate =
{
  jan: {
    income: [
              {
                "date":         1,
                "description":  "income",
                "amount":       0.00,
                "category":     incomeCategories[0],
                "id":           1
              },
            ],
    incomeCount: 1,
    expenses: [
                {
                  "date":         1,
                  "description":  "expense",
                  "amount":       0.00,
                  "category":     expenseCategories[0],
                  "id":           1
                },
              ],
    expensesCount: 1,
    settings: {
      budgetExpense:    0,
      budgetExpanded:   new Array(MAX_EXPENSE_CATEGORIES).fill(0),
      isBudgetExpanded: false,
      startingBalance:  0,
      balanceTracking:  false,
      defaultSort:      "Id",
    }
  },
  feb: {
    income: [
              {
                "date":         1,
                "description":  "income",
                "amount":       0.00,
                "category":     incomeCategories[0],
                "id":           1
              },
            ],
    incomeCount: 1,
    expenses: [
                {
                  "date":         1,
                  "description":  "expense",
                  "amount":       0.00,
                  "category":     expenseCategories[0],
                  "id":           1
                },
              ],
    expensesCount: 1,
    settings: {
      budgetExpense:    0,
      budgetExpanded:   new Array(MAX_EXPENSE_CATEGORIES).fill(0),
      isBudgetExpanded: false,
      startingBalance:  0,
      balanceTracking:  false,
      defaultSort:      "Id",
    }
  },
  mar: {
    income: [
              {
                "date":         1,
                "description":  "income",
                "amount":       0.00,
                "category":     incomeCategories[0],
                "id":           1
              },
            ],
    incomeCount: 1,
    expenses: [
                {
                  "date":         1,
                  "description":  "expense",
                  "amount":       0.00,
                  "category":     expenseCategories[0],
                  "id":           1
                },
              ],
    expensesCount: 1,
    settings: {
      budgetExpense:    0,
      budgetExpanded:   new Array(MAX_EXPENSE_CATEGORIES).fill(0),
      isBudgetExpanded: false,
      startingBalance:  0,
      balanceTracking:  false,
      defaultSort:      "Id",
    }
  },
  apr: {
    income: [
              {
                "date":         1,
                "description":  "income",
                "amount":       0.00,
                "category":     incomeCategories[0],
                "id":           1
              },
            ],
    incomeCount: 1,
    expenses: [
                {
                  "date":         1,
                  "description":  "expense",
                  "amount":       0.00,
                  "category":     expenseCategories[0],
                  "id":           1
                },
              ],
    expensesCount: 1,
    settings: {
      budgetExpense:    0,
      budgetExpanded:   new Array(MAX_EXPENSE_CATEGORIES).fill(0),
      isBudgetExpanded: false,
      startingBalance:  0,
      balanceTracking:  false,
      defaultSort:      "Id",
    }
  },
  may: {
    income: [
              {
                "date":         1,
                "description":  "income",
                "amount":       0.00,
                "category":     incomeCategories[0],
                "id":           1
              },
            ],
    incomeCount: 1,
    expenses: [
                {
                  "date":         1,
                  "description":  "expense",
                  "amount":       0.00,
                  "category":     expenseCategories[0],
                  "id":           1
                },
              ],
    expensesCount: 1,
    settings: {
      budgetExpense:    0,
      budgetExpanded:   new Array(MAX_EXPENSE_CATEGORIES).fill(0),
      isBudgetExpanded: false,
      startingBalance:  0,
      balanceTracking:  false,
      defaultSort:      "Id",
    }
  },
  jun: {
    income: [
              {
                "date":         1,
                "description":  "income",
                "amount":       0.00,
                "category":     incomeCategories[0],
                "id":           1
              },
            ],
    incomeCount: 1,
    expenses: [
                {
                  "date":         1,
                  "description":  "expense",
                  "amount":       0.00,
                  "category":     expenseCategories[0],
                  "id":           1
                },
              ],
    expensesCount: 1,
    settings: {
      budgetExpense:    0,
      budgetExpanded:   new Array(MAX_EXPENSE_CATEGORIES).fill(0),
      isBudgetExpanded: false,
      startingBalance:  0,
      balanceTracking:  false,
      defaultSort:      "Id",
    }
  },
  jul: {
    income: [
              {
                "date":         1,
                "description":  "income",
                "amount":       0.00,
                "category":     incomeCategories[0],
                "id":           1
              },
            ],
    incomeCount: 1,
    expenses: [
                {
                  "date":         1,
                  "description":  "expense",
                  "amount":       0.00,
                  "category":     expenseCategories[0],
                  "id":           1
                },
              ],
    expensesCount: 1,
    settings: {
      budgetExpense:    0,
      budgetExpanded:   new Array(MAX_EXPENSE_CATEGORIES).fill(0),
      isBudgetExpanded: false,
      startingBalance:  0,
      balanceTracking:  false,
      defaultSort:      "Id",
    }
  },
  aug: {
    income: [
              {
                "date":         1,
                "description":  "income",
                "amount":       0.00,
                "category":     incomeCategories[0],
                "id":           1
              },
            ],
    incomeCount: 1,
    expenses: [
                {
                  "date":         1,
                  "description":  "expense",
                  "amount":       0.00,
                  "category":     expenseCategories[0],
                  "id":           1
                },
              ],
    expensesCount: 1,
    settings: {
      budgetExpense:    0,
      budgetExpanded:   new Array(MAX_EXPENSE_CATEGORIES).fill(0),
      isBudgetExpanded: false,
      startingBalance:  0,
      balanceTracking:  false,
      defaultSort:      "Id",
    }
  },
  sep: {
    income: [
              {
                "date":         1,
                "description":  "income",
                "amount":       0.00,
                "category":     incomeCategories[0],
                "id":           1
              },
            ],
    incomeCount: 1,
    expenses: [
                {
                  "date":         1,
                  "description":  "expense",
                  "amount":       0.00,
                  "category":     expenseCategories[0],
                  "id":           1
                },
              ],
    expensesCount: 1,
    settings: {
      budgetExpense:    0,
      budgetExpanded:   new Array(MAX_EXPENSE_CATEGORIES).fill(0),
      isBudgetExpanded: false,
      startingBalance:  0,
      balanceTracking:  false,
      defaultSort:      "Id",
    }
  },
  oct: {
    income: [
              {
                "date":         1,
                "description":  "income",
                "amount":       0.00,
                "category":     incomeCategories[0],
                "id":           1
              },
            ],
    incomeCount: 1,
    expenses: [
                {
                  "date":         1,
                  "description":  "expense",
                  "amount":       0.00,
                  "category":     expenseCategories[0],
                  "id":           1
                },
              ],
    expensesCount: 1,
    settings: {
      budgetExpense:    0,
      budgetExpanded:   new Array(MAX_EXPENSE_CATEGORIES).fill(0),
      isBudgetExpanded: false,
      startingBalance:  0,
      balanceTracking:  false,
      defaultSort:      "Id",
    }
  },
  nov: {
    income: [
              {
                "date":         1,
                "description":  "income",
                "amount":       0.00,
                "category":     incomeCategories[0],
                "id":           1
              },
            ],
    incomeCount: 1,
    expenses: [
                {
                  "date":         1,
                  "description":  "expense",
                  "amount":       0.00,
                  "category":     expenseCategories[0],
                  "id":           1
                },
              ],
    expensesCount: 1,
    settings: {
      budgetExpense:    0,
      budgetExpanded:   new Array(MAX_EXPENSE_CATEGORIES).fill(0),
      isBudgetExpanded: false,
      startingBalance:  0,
      balanceTracking:  false,
      defaultSort:      "Id",
    }
  },
  dec: {
    income: [
              {
                "date":         1,
                "description":  "income",
                "amount":       0.00,
                "category":     incomeCategories[0],
                "id":           1
              },
            ],
    incomeCount: 1,
    expenses: [
                {
                  "date":         1,
                  "description":  "expense",
                  "amount":       0.00,
                  "category":     expenseCategories[0],
                  "id":           1
                },
              ],
    expensesCount: 1,
    settings: {
      budgetExpense:    0,
      budgetExpanded:   new Array(MAX_EXPENSE_CATEGORIES).fill(0),
      isBudgetExpanded: false,
      startingBalance:  0,
      balanceTracking:  false,
      defaultSort:      "Id",
    }
  },
}

export { dataTemplate };
