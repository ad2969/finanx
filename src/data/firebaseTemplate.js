import expenseCategories, { MAX_EXPENSE_CATEGORIES } from '../lists/expenseCategories';
import incomeCategories from '../lists/incomeCategories';
import widgetList from '../lists/defaultWidgetList';

const widgetTemplate = [0, 1, 2, 3, 4, 5, 6].map((i, key, list) => {
  return {
    i: i.toString(), widget: widgetList[i].widget,
    x: widgetList[i].x, y: widgetList[i].y,
    w: widgetList[i].w, h: widgetList[i].h,
    minW: widgetList[i].minW, minH: widgetList[i].minH,
    maxW: widgetList[i].maxW, maxH: widgetList[i].maxH,
    isDraggable: true, isResizable: true, moved: false, static: false };
})

export const WIDGET_COUNT = 7

const settingsTemplate = {
  currencyCode: "CAD",
  currency:     "$",
  defaultSort:  "Id"
}

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
    }
  },
}

export { dataTemplate, settingsTemplate, widgetTemplate };
