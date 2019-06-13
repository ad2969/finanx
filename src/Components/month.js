import React from 'react';
import Modal from 'react-modal';

import MonthCatalog from './Widgets/monthCatalog';
import MonthBudgetWidget from './Widgets/monthBudgetWidget';

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
    w: 3, h: 2, x: 9, y: 0
  },
  {
    widget: "monthBudgetExtended",
    w: 3, h: 3, x: 9, y: 2
  },
  {
    widget: "monthGraphicalStats",
    w: 5, h: 2, x: 0, y: 3
  },
  {
    widget: "monthPieStats",
    w: 4, h: 4, x: 5, y: 1
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
    this.state = {
      showCatalog: false,
      showSettings: false,

      items: [0, 1, 2, 3, 4, 5, 6].map((i, key, list) => {
        return {
          i: i.toString(),
          x: widgetList[i].x, y: widgetList[i].y,
          w: widgetList[i].w, h: widgetList[i].h,
          widget: widgetList[i].widget };
      }),
      layout: [],
      widgetCounter: 5,

      numDays: 30,

      budgetExpense: 0,
      info: {
        totalExpense: 0,
        totalIncome: 0,
        startingBalance: 0,
      }
    };

    this.handleOpenCatalog    = this.handleOpenCatalog.bind(this);
    this.handleCloseCatalog   = this.handleCloseCatalog.bind(this);
    this.addWidget            = this.addWidget.bind(this);
    this.onBreakpointChange   = this.onBreakpointChange.bind(this);
  }

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

  handleEditBudget = () => {
    this.handleOpenSettings();
  }

  createWidget = (el) => {
    let newWidget;
    switch( el.widget ) {
      case "accountSummary":
        break;
      case "monthSummary":
        break;
      case "monthBudget":
        newWidget = MonthBudgetWidget( this.state.budgetExpense, this.state.info.totalExpense, this.handleEditBudget );
        break;
      case "monthBudgetExtended":
        break;
      case "monthGraphicalStats":
        break;
      case "monthPieStats":
        break;
      case "livingCostComparison":
        break;
      default: break;
    }
    return (
      <div key={el.i} data-grid={el}>
        {newWidget}
        <span className="remove"
              style={removeStyle}
              onClick={this.onRemoveItem.bind(this, el.i)}
        >x</span>
      </div>
    )
  }

  addWidget = ( widget ) => {
    console.log("adding", this.state.widgetCounter, ":", widget );

    let newWidget = {
      i: this.state.widgetCounter.toString(),
      x: (this.state.items.length * 2) % (this.state.cols || 12),
      y: Infinity, // puts it at the very bottom
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
    this.setState({
      items: this.state.items.concat(newWidget),
      widgetCounter: this.state.widgetCounter + 1
    });
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
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  // Transaction Functions

  addExpense = (amount) => {
    this.setState(prevState => ({
      info: {
        ...prevState.info,
        totalExpense: this.state.info.totalExpense + amount
      }
    }), console.log("New expenses value: ", this.state.info.totalExpense));
  }
  addIncome = (amount) => {
    this.setState(prevState => ({
      info: {
        ...prevState.info,
        totalIncome: this.state.info.totalIncome + amount
      }
    }), console.log("New income value: ", this.state.info.totalExpense));
  }


  render() {

    var averageDailyExpense = this.state.info.totalExpense / this.state.numDays;
    var endBalance = this.state.startingBalance - this.state.totalExpense + this.state.totalIncome;

    return (
      <div>
        <button onClick={this.addWidget}>Add Item</button>
        <ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange}
                                   onBreakpointChange={this.onBreakpointChange} >
          {_.map(this.state.items, el => this.createWidget(el))}
        </ResponsiveReactGridLayout>

        <button onClick={this.handleOpenCatalog}>Open Month</button>

        <Modal isOpen         = {this.state.showCatalog}
               onRequestClose = {this.handleCloseCatalog} >

          <span style={closeButtonStyle} onClick={this.handleCloseCatalog}>&#10006;</span>
          <MonthCatalog />

        </Modal>

        <button onClick={() => {this.addExpense(100)}}>Add Expense</button>
        <button onClick={() => {this.addIncome(100)}}>Add Income</button>

        <Modal isOpen         = {this.state.showSettings}
               onRequestClose = {this.handleCloseSettings} >

          <span style={closeButtonStyle} onClick={this.handleCloseSettings}>&#10006;</span>

        </Modal>

        <div>
          <button onClick={() => {this.addWidget("monthBudget")}}>Add Budget Widget</button>
        </div>

      </div>
    )
  }
}

export default Month
