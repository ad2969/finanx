import React from 'react';
import Modal from 'react-modal';

import MonthCatalog from './Widgets/monthCatalog';
import MonthSettings from './User/monthSettings';
import MonthBudgetWidget from './Widgets/monthBudgetWidget';
import MonthBudgetExtendedWidget from './Widgets/monthBudgetExtendedWidget';
import MonthPieStatWidget from './Widgets/monthPieStatWidget'
import MonthGraphicalStatsWidget from './Widgets/monthGraphicalStatsWidget'
import './styles/widgets.scss';

import expensesData from '../monthExpensesExample.json';
import incomeData from '../monthIncomeExample.json';

// Grid layout is imported (responsive grid)
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import './styles/month-grid-styles.scss'
const ResponsiveReactGridLayout = WidthProvider(Responsive);


// Style preset for exit buttons
const closeButtonStyle = {
  position: "absolute",
  right: "10px",
  top: "10px",
  cursor: "pointer"
};
const removeStyle = {
  position: "absolute",
  right: "5px",
  top: 0,
  cursor: "pointer"
};

const widgetList = [
  {
    widget: "accountSummary",
    w: 5, h: 1, x: 0, y: 0
  },
  {
    widget: "monthSummary",
    w: 5, h: 2, x: 0, y: 1
  },
  {
    widget: "monthBudget",
    w: 3, h: 2, x: 9, y: 0, minW: 2, minH: 2
  },
  {
    widget: "monthBudgetExtended",
    w: 3, h: 3, x: 9, y: 2, minW: 3, minH: 3
  },
  {
    widget: "monthGraphicalStats",
    w: 5, h: 3, x: 0, y: 3, minW: 3, minH: 3
  },
  {
    widget: "monthPieStats",
    w: 4, h: 3, x: 5, y: 1, minW: 3, minH: 3
  },
  {
    widget: "livingCostComparison",
    w: 4, h: 1, x: 5, y: 0
  }
]

// Modal App Element needs to be set to ensure main app is hidden behind modal
Modal.setAppElement(document.getElementById('root'));


class Month extends React.Component {

  static defaultProps = {
    className: "layout",
    cols: { lg: 10, md: 8, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100
  };

  constructor() {
    super();
    console.log("Month constructed!");
    this.state = {

      // Modal Status
      showCatalog:    false,
      showSettings:   false,

      // Transaction Information
      expenseCategories: [
        "Food and Groceries",
        "Entertainment",
        "Education",
        "Insurance and Bills",
        "Rent",
        "Other",
      ],
      incomeCategories: [
        "Salary",
        "Interest",
        "Sponsor",
        "Investment",
        "Other",
      ],

      expenseTransactions:        [],
      expenseTransactionsCount:   1,
      incomeTransactions:         [],
      incomeTransactionsCount:    1,

      userSet: {
        budgetExpense:      0,
        budgetExpanded:     [],
        isBudgetExpanded:   false,
        startingBalance:    0,
        isAccountActive:    false,
        defaultSort:        "Id",
        currency:           "$",
      },

      info: {
        totalExpense:     0,
        totalIncome:      0,
      },

      // Widget Info
      items: [0, 1, 2, 3, 4, 5, 6].map((i, key, list) => {
        return {
          i: i.toString(),
          x: widgetList[i].x, y: widgetList[i].y,
          w: widgetList[i].w, h: widgetList[i].h,
          widget: widgetList[i].widget };
      }),
      layout: [],
      widgetCounter: 7,

      // Miscellaneous Info
      numDays: 30

    };

    this.handleOpenCatalog       = this.handleOpenCatalog.bind(this);
    this.handleCloseCatalog      = this.handleCloseCatalog.bind(this);
    this.handleOpenSettings      = this.handleOpenSettings.bind(this);
    this.handleCloseSettings     = this.handleCloseSettings.bind(this);

    this.handleUpdateExpenses    = this.handleUpdateExpenses.bind(this);
    this.handleUpdateIncome      = this.handleUpdateIncome.bind(this);

    this.handleEditBudgetFWidget = this.handleEditBudgetFWidget.bind(this);
    this.handleSettingsChange    = this.handleSettingsChange.bind(this);

    this.addWidget               = this.addWidget.bind(this);
    this.onBreakpointChange      = this.onBreakpointChange.bind(this);
    this.onRemoveItem            = this.onRemoveItem.bind(this);
  }

  /* Lifecycle Functions */

  componentDidMount() {
    console.log("Month Mounted!");

    let newBudget = new Array(this.state.expenseCategories.length).fill(0);
    this.setState(prevState => ({
      userSet: {
        ...prevState.userSet,
        budgetExpanded: newBudget,
      }
    }));
  }

  /* Main handlers */

  handleOpenCatalog = () => {
    this.setState({ showCatalog: true });
  }

  handleCloseCatalog = () => {
    this.setState({ showCatalog: false });
  }

  handleOpenSettings = () => {
    this.setState({ showSettings: true });
  }

  handleCloseSettings = () => {
    this.setState({ showSettings: false });
  }

  handleEditBudgetFWidget = () => {
    this.handleOpenSettings();
  }

  handleUpdateExpenses = ( newTransactionList, transactionCount ) => {
    this.setState({
      expenseTransactions: newTransactionList,
      expenseTransactionsCount: transactionCount
    }, () => { console.log("** Expenses updated!, new list:", this.state.expenseTransactions) });
  }
  handleUpdateIncome = ( newTransactionList, transactionCount ) => {
    this.setState({
      incomeTransactions: newTransactionList,
      incomeTransactionsCount: transactionCount
    }, () => { console.log("** Income updated!, new list:", this.state.incomeTransactions) });
  }

  // Settings

  handleSettingsChange = ( newSettings ) => {
    this.setState( prevState => ({
      userSet: newSettings,
    }), () => { this.handleCloseSettings(); console.log("New settings", this.state.userSet); });

  }

  /* Grid Functions */

  createWidget = ( element,
                   totalExpense,
                   totalIncome,
                   averageDailyExpense,
                   endBalance ) => {
    let newWidget;
    switch( element.widget ) {
      case "accountSummary":
        break;
      case "monthSummary":
        break;
      case "monthBudget":
        newWidget =
        MonthBudgetWidget( this.state.userSet.budgetExpense,
                           totalExpense,
                           this.handleEditBudgetFWidget,
                           this.state.userSet.currency );
        break;
      case "monthBudgetExtended":
        newWidget =
        <MonthBudgetExtendedWidget
                  transactionList = {this.state.expenseTransactions}
                  categoriesList  = {this.state.expenseCategories}
                  budgetExtended  = {this.state.userSet.budgetExpanded}
                  currency        = {this.state.userSet.currency} />;
        break;
      case "monthGraphicalStats":
        newWidget =
        <MonthGraphicalStatsWidget
                  expenditureList   = {this.state.expenseTransactions}
                  incomeList        = {this.state.incomeTransactions}
                  totalExpenditure  = {totalExpense}
                  totalIncome       = {totalIncome}
                  numberOfDays      = {this.state.numDays}
                  startingBalance   = {this.state.userSet.startingBalance}
                  isAccountActive   = {this.state.userSet.isAccountActive}
                  currency          = {this.state.userSet.currency} />
        break;
      case "monthPieStats":
        newWidget =
        MonthPieStatWidget( this.state.expenseCategories,
                            this.state.expenseTransactions,
                            totalExpense,
                            this.state.userSet.currency );
        break;
      case "livingCostComparison":
        break;
      default: break;
    }
    return (
      <div key={element.i} data-grid={element}>
        {newWidget}
        <span className="remove"
              style={removeStyle}
              onClick={this.onRemoveItem.bind(this, element.i)}
        >x</span>
      </div>
    )
  }

  addWidget = ( widget ) => {
    console.log("** adding widget:", this.state.widgetCounter, ":", widget );

    let newWidget = {
      i: this.state.widgetCounter.toString(),
      //x: (this.state.items.length * 2) % (this.state.cols || 12),
      x: Infinity, y: Infinity, // puts it at the very bottom
      widget: widget,
    };
    switch( widget ) {
      case "accountSummary":
        newWidget.w = widgetList[0].w;
        newWidget.h = widgetList[0].h;
        break;
      case "monthSummary":
        newWidget.w = widgetList[1].w;
        newWidget.h = widgetList[1].h;
        break;
      case "monthBudget":
        newWidget.w = widgetList[2].w;
        newWidget.h = widgetList[2].h;
        break;
      case "monthBudgetExtended":
        newWidget.w = widgetList[3].w;
        newWidget.h = widgetList[3].h;
        break;
      case "monthGraphicalStats":
        newWidget.w = widgetList[4].w;
        newWidget.h = widgetList[4].h;
        break;
      case "monthPieStats":
        newWidget.w = widgetList[5].w;
        newWidget.h = widgetList[5].h;
        break;
      case "livingCostComparison":
        newWidget.w = widgetList[6].w;
        newWidget.h = widgetList[6].h;
        break;
      default: break;
    }
    this.setState( prevState => ({
      items: prevState.items.concat(newWidget),
      widgetCounter: prevState.widgetCounter + 1
    }));
  }

  onBreakpointChange = (breakpoint, cols) => {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange = (layout) => {
    this.setState({ layout: layout });
  }

  onRemoveItem = (i) => {
    console.log("** removing widget:", i);
    this.setState( prevState => ({
      items: _.reject(prevState.items, { i: i })
    }));
  }


  render() {

    var totalExpense = (this.state.expenseTransactions.reduce(
      (counter, next) => counter + Number(next.amount), 0));
    var totalIncome = (this.state.incomeTransactions.reduce(
      (counter, next) => counter + Number(next.amount), 0));
    var averageDailyExpense = (totalExpense / this.state.numDays);
    var endBalance = (this.state.userSet.startingBalance - totalExpense);

    return (
      <div>
        <ResponsiveReactGridLayout
            onLayoutChange      = {this.onLayoutChange}
            onBreakpointChange  = {this.onBreakpointChange} >
            {_.map(this.state.items, element =>
              this.createWidget( element,
                                 totalExpense,
                                 totalIncome,
                                 averageDailyExpense,
                                 endBalance )
            )}
        </ResponsiveReactGridLayout>

        <button onClick={this.handleOpenCatalog}>Open Month</button>

        <Modal isOpen         = {this.state.showCatalog}
               onRequestClose = {this.handleCloseCatalog} >

          <span style={closeButtonStyle} onClick={this.handleCloseCatalog}>&#10006;</span>
          <h1>Expenses</h1>
          <MonthCatalog categories  = {this.state.expenseCategories}
                        initialData = {expensesData}
                        realData    = {this.state.expenseTransactions}
                        realCount   = {this.state.expenseTransactionsCount}
                        updateData  = {this.handleUpdateExpenses}
                        isSortedBy  = {this.state.userSet.defaultSort} />
          <h1>Income</h1>
          <MonthCatalog categories  = {this.state.incomeCategories}
                        initialData = {incomeData}
                        realData    = {this.state.incomeTransactions}
                        realCount   = {this.state.incomeTransactionsCount}
                        updateData  = {this.handleUpdateIncome}
                        isSortedBy  = {this.state.userSet.defaultSort} />

        </Modal>

        <Modal isOpen         = {this.state.showSettings}
               onRequestClose = {this.handleCloseSettings} >

          <span style={closeButtonStyle} onClick={this.handleCloseSettings}>&#10006;</span>
          <MonthSettings categoriesList     = {this.state.expenseCategories}
                         userSetData        = {this.state.userSet}
                         handleSubmit       = {this.handleSettingsChange} />

        </Modal>

        <div>
          <button onClick={this.handleOpenSettings}>Month Settings</button>
        </div>

        <div> Add widgets here: (Dropdown menu)
          <button onClick={() => {this.addWidget("monthBudget")}}>Budget Widget</button>
          <button onClick={() => {this.addWidget("monthBudgetExtended")}}>Extended Budget Widget</button>
          <button onClick={() => {this.addWidget("monthGraphicalStats")}}>Asset Flow Widget</button>
          <button onClick={() => {this.addWidget("monthPieStats")}}>Expenditure Chart Widget</button>
        </div>

      </div>
    )
  }
}

export default Month
