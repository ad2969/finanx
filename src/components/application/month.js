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

  constructor(props) {
    super(props);
    console.log("Month constructed! MonthId: ", this.props.monthId);
    this.state = {

      // Modal Status
      showCatalog:    false,
      showSettings:   false,

      // Miscellaneous Info
      numDays: 30

    };

    this.handleOpenCatalog       = this.handleOpenCatalog.bind(this);
    this.handleCloseCatalog      = this.handleCloseCatalog.bind(this);
    this.handleOpenSettings      = this.handleOpenSettings.bind(this);
    this.handleCloseSettings     = this.handleCloseSettings.bind(this);

    this.handleEditBudgetWidget = this.handleEditBudgetWidget.bind(this);
  }

  /* Lifecycle Functions */

  componentDidMount() {
    console.log("Month Mounted!");
    this.setState({
      items: this.props.widgetData.widgets,
      layout: this.props.widgetData.layout,
      widgetCounter: this.props.widgetData.counter,
    })
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
    switch( element.i ) {
      case "0":
        break;
      case "1":
        newWidget =
        MonthSummaryWidget( totalExpense,
                            totalIncome,
                            this.props.userSet.startingBalance,
                            endBalance,
                            averageDailyExpense,
                            this.props.userSet.balanceTracking,
                            this.props.generalSettings.currency );
        break;
      case "2":
        newWidget =
        MonthBudgetWidget( this.props.userSet.budgetExpense,
                           totalExpense,
                           this.handleEditBudgetWidget,
                           this.props.generalSettings.currency );
        break;
      case "3":
        newWidget =
        <MonthBudgetExtendedWidget
                  transactionList = {this.props.expensesData}
                  categoriesList  = {this.props.expenseCategories}
                  budgetExtended  = {this.props.userSet.budgetExpanded}
                  currency        = {this.props.generalSettings.currency} />;
        break;
      case "4":
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
      case "5":
        newWidget =
        MonthPieStatWidget( this.props.expenseCategories,
                            this.props.expensesData,
                            totalExpense,
                            this.props.generalSettings.currency );
        break;
      case "6":
        break;
      default: break;
    }
    return (
      <div key={element.i} data-grid={element}>
        {newWidget}
        <span className="remove" data-key={element.i}
              onClick={this.props.onRemoveItem}
        >x</span>
      </div>
    )
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
            onLayoutChange      = {this.props.onLayoutChange}
            onBreakpointChange  = {this.props.onBreakpointChange} >
            {_.map(this.props.widgetData.widgets, element =>
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
          <MonthCatalog monthId     = {this.props.monthId}
                        categories  = {this.props.expenseCategories}
                        initialData = {expensesData}
                        realData    = {this.props.expensesData}
                        realCount   = {this.props.expensesDataCount}
                        updateData  = {this.props.updateExpenses}
                        isSortedBy  = {this.props.generalSettings.defaultSort} />
          <h1>Income</h1>
          <MonthCatalog monthId     = {this.props.monthId}
                        categories  = {this.props.incomeCategories}
                        initialData = {incomeData}
                        realData    = {this.props.incomeData}
                        realCount   = {this.props.incomeDataCount}
                        updateData  = {this.props.updateIncome}
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
          <button onClick={() => {this.props.addWidget("monthSummary")}}>Month Summary</button>
          <button onClick={() => {this.props.addWidget("monthBudget")}}>Budget Widget</button>
          <button onClick={() => {this.props.addWidget("monthBudgetExtended")}}>Extended Budget Widget</button>
          <button onClick={() => {this.props.addWidget("monthGraphicalStats")}}>Asset Flow Widget</button>
          <button onClick={() => {this.props.addWidget("monthPieStats")}}>Expenditure Chart Widget</button>
        </div>

      </div>
    )
  }
}

export default Month
