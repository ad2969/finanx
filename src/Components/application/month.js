import React from 'react';
import Modal from 'react-modal';

// Import widgets
import MonthCatalog from '../widgets/monthCatalog';
import MonthSettings from '../user/monthSettings';
import MonthBudgetWidget from '../widgets/monthBudgetWidget';
import MonthBudgetExtendedWidget from '../widgets/monthBudgetExtendedWidget';
import MonthPieStatWidget from '../widgets/monthPieStatWidget'
import MonthGraphicalStatsWidget from '../widgets/monthGraphicalStatsWidget'
import MonthSummaryWidget from '../widgets/monthSummaryWidget'
import widgetList from '../../lists/defaultWidgetList';

// Import sample data
import expensesData from '../../data/monthExpensesExample.json';
import incomeData from '../../data/monthIncomeExample.json';

// Grid layout is imported (responsive grid)
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';

import '../../styles/widgets.scss';
import '../../styles/month-grid-styles.scss'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

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

    this.handleEditBudgetWidget = this.handleEditBudgetWidget.bind(this);

    this.addWidget               = this.addWidget.bind(this);
    this.onBreakpointChange      = this.onBreakpointChange.bind(this);
    this.onRemoveItem            = this.onRemoveItem.bind(this);
  }

  /* Lifecycle Functions */

  componentDidMount() {
    console.log("Month Mounted!");
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

  handleEditBudgetWidget = () => {
    this.handleOpenSettings();
  }

  handleUpdateExpenses = ( newTransactionList, transactionCount ) => {
    this.props.updateExpenses( newTransactionList, transactionCount, this.props.monthId );
  }
  handleUpdateIncome = ( newTransactionList, transactionCount ) => {
    this.props.updateIncome( newTransactionList, transactionCount, this.props.monthId );
  }

  // Settings

  handleSettingsChange = ( newSettings ) => {
    this.props.updateSettings( newSettings, this.props.monthId);
    this.handleCloseSettings();
    console.log("New settings", this.props.userSet);
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
        newWidget =
        MonthSummaryWidget( totalExpense,
                            totalIncome,
                            this.props.userSet.startingBalance,
                            endBalance,
                            averageDailyExpense,
                            this.props.userSet.balanceTracking,
                            this.props.generalSettings.currency );
        break;
      case "monthBudget":
        newWidget =
        MonthBudgetWidget( this.props.userSet.budgetExpense,
                           totalExpense,
                           this.handleEditBudgetWidget,
                           this.props.generalSettings.currency );
        break;
      case "monthBudgetExtended":
        newWidget =
        <MonthBudgetExtendedWidget
                  transactionList = {this.props.expensesData}
                  categoriesList  = {this.props.expenseCategories}
                  budgetExtended  = {this.props.userSet.budgetExpanded}
                  currency        = {this.props.generalSettings.currency} />;
        break;
      case "monthGraphicalStats":
        newWidget =
        <MonthGraphicalStatsWidget
                  expenditureList   = {this.props.expensesData}
                  incomeList        = {this.props.incomeData}
                  totalExpenditure  = {totalExpense}
                  totalIncome       = {totalIncome}
                  numberOfDays      = {this.state.numDays}
                  startingBalance   = {this.props.userSet.startingBalance}
                  balanceTracking   = {this.props.userSet.balanceTracking}
                  currency          = {this.props.generalSettings.currency} />;
        break;
      case "monthPieStats":
        newWidget =
        MonthPieStatWidget( this.props.expenseCategories,
                            this.props.expensesData,
                            totalExpense,
                            this.props.generalSettings.currency );
        break;
      case "livingCostComparison":
        break;
      default: break;
    }
    return (
      <div key={element.i} data-grid={element}>
        {newWidget}
        <span className="remove"
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

    var totalExpense = (this.props.expensesData.reduce(
      (counter, next) => counter + Number(next.amount), 0));
    var totalIncome = (this.props.incomeData.reduce(
      (counter, next) => counter + Number(next.amount), 0));
    var averageDailyExpense = (totalExpense / this.state.numDays);
    var endBalance = (this.props.userSet.startingBalance - totalExpense);

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

          <span className="button-close" onClick={this.handleCloseCatalog}>&#10006;</span>
          <h1>Expenses</h1>
          <MonthCatalog categories  = {this.props.expenseCategories}
                        initialData = {expensesData}
                        realData    = {this.props.expensesData}
                        realCount   = {this.props.expensesDataCount}
                        updateData  = {this.handleUpdateExpenses}
                        isSortedBy  = {this.props.generalSettings.defaultSort} />
          <h1>Income</h1>
          <MonthCatalog categories  = {this.props.incomeCategories}
                        initialData = {incomeData}
                        realData    = {this.props.incomeData}
                        realCount   = {this.props.incomeDataCount}
                        updateData  = {this.handleUpdateIncome}
                        isSortedBy  = {this.props.generalSettings.defaultSort} />

        </Modal>

        <Modal isOpen         = {this.state.showSettings}
               onRequestClose = {this.handleCloseSettings} >

          <span className="button-close" onClick={this.handleCloseSettings}>&#10006;</span>
          <MonthSettings categoriesList     = {this.props.expenseCategories}
                         userSetData        = {this.props.userSet}
                         handleSubmit       = {this.handleSettingsChange} />

        </Modal>

        <div>
          <button onClick={this.handleOpenSettings}>Month Settings</button>
        </div>

        <div> Add widgets here: (Dropdown menu)
          <button onClick={() => {this.addWidget("monthSummary")}}>Month Summary</button>
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
