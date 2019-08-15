import React from 'react';
import Modal from 'react-modal';
import _ from 'lodash';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase'
import { withAuthorization } from '../../Session'

import Month from './month';
import AccountSettings from '../user/accountSettings';

import expenseCategories from '../../lists/expenseCategories';
import incomeCategories from '../../lists/incomeCategories';
import { dataTemplate,
         settingsTemplate,
         widgetTemplate,
         WIDGET_COUNT } from '../../data/firebaseTemplate';
import widgetList from '../../lists/defaultWidgetList';
import { removeEmpty } from '../../functions/filters';

// Modal App Element needs to be set to ensure main app is hidden behind modal
Modal.setAppElement(document.getElementById('root'));

class YearBase extends React.Component {
  constructor() {
    super();
    console.log("Year constructed!");
    this.state = {
      loaded: false,
      showSettings: false,

      // Default Values
      generalSettings: settingsTemplate,
      months: dataTemplate,

      widgets: {
        widgets: widgetTemplate,
        counter: WIDGET_COUNT,
      },

    }
  }

  updateSettings = (newSettings, monthId) => {
    this.setState( prevState => ({
      months : {
        ...prevState.months,
        jan: {
          ...prevState.months.jan,
          settings: newSettings
        },
      }
    }));
  }

  handleOpenSettings = () => {
    this.setState({ showSettings: true });
  }

  handleCloseSettings = () => {
    this.setState({ showSettings: false });
  }

  updateGeneralSettings = (newSettings) => {
    this.setState( prevState => ({
      generalSettings: newSettings
    }));
    this.handleCloseSettings();
  }

  updateExpenses = ( newTransactionList, transactionCount, monthId ) => {
    this.setState( prevState => ({
      months : {
        ...prevState.months,
        jan : {
          ...prevState.months.jan,
          expenses: newTransactionList,
          expensesCount: transactionCount
        }
      }
    }), () => { console.log("** Expenses updated!, new list:", this.state.months.jan.expenses) });
  }
  updateIncome = ( newTransactionList, transactionCount, monthId ) => {
    this.setState( prevState => ({
      months: {
        ...prevState.months,
        jan: {
          ...prevState.months.jan,
          income: newTransactionList,
          incomeCount: transactionCount
        }
      }
    }), () => { console.log("** Income updated!, new list:", this.state.months.jan.income) });
  }

  // GRID STUFF

  addWidget = ( widget ) => {
    console.log("** adding widget:", this.state.widgets.counter, ":", widget );

    let newWidget = {
      i: this.state.widgets.counter,
      //x: (this.state.items.length * 2) % (this.state.cols || 12),
      x: 10, y: 10, // puts it at the very bottom
    };
    switch( widget ) {
      case "accountSummary":
        newWidget.i = "0";
        newWidget.w = widgetList[0].w;
        newWidget.h = widgetList[0].h;
        newWidget.minW = widgetList[0].minW; newWidget.minH = widgetList[0].minH;
        newWidget.maxW = widgetList[0].maxW; newWidget.maxH = widgetList[0].maxH;
        break;
      case "monthSummary":
        newWidget.i = "1";
        newWidget.w = widgetList[1].w;
        newWidget.h = widgetList[1].h;
        newWidget.minW = widgetList[1].minW; newWidget.minH = widgetList[1].minH;
        newWidget.maxW = widgetList[1].maxW; newWidget.maxH = widgetList[1].maxH;
        break;
      case "monthBudget":
        newWidget.i = "2";
        newWidget.w = widgetList[2].w;
        newWidget.h = widgetList[2].h;
        newWidget.minW = widgetList[2].minW; newWidget.minH = widgetList[2].minH;
        newWidget.maxW = widgetList[2].maxW; newWidget.maxH = widgetList[2].maxH;
        break;
      case "monthBudgetExtended":
        newWidget.i = "3";
        newWidget.w = widgetList[3].w;
        newWidget.h = widgetList[3].h;
        newWidget.minW = widgetList[3].minW; newWidget.minH = widgetList[3].minH;
        newWidget.maxW = widgetList[3].maxW; newWidget.maxH = widgetList[3].maxH;
        break;
      case "monthGraphicalStats":
        newWidget.i = "4";
        newWidget.w = widgetList[4].w;
        newWidget.h = widgetList[4].h;
        newWidget.minW = widgetList[4].minW; newWidget.minH = widgetList[4].minH;
        newWidget.maxW = widgetList[4].maxW; newWidget.maxH = widgetList[4].maxH;
        break;
      case "monthPieStats":
        newWidget.i = "5";
        newWidget.w = widgetList[5].w;
        newWidget.h = widgetList[5].h;
        newWidget.minW = widgetList[5].minW; newWidget.minH = widgetList[5].minH;
        newWidget.maxW = widgetList[5].maxW; newWidget.maxH = widgetList[5].maxH;
        break;
      case "livingCostComparison":
        newWidget.i = "6";
        newWidget.w = widgetList[6].w;
        newWidget.h = widgetList[6].h;
        newWidget.minW = widgetList[6].minW; newWidget.minH = widgetList[6].minH;
        newWidget.maxW = widgetList[6].maxW; newWidget.maxH = widgetList[6].maxH;
        break;
      default: break;
    }
    this.setState( prevState => ({
      widgets: {
        ...prevState.widgets,
        widgets: prevState.widgets.widgets.concat(newWidget),
        counter: prevState.widgets.counter + 1
      }
    }), () => { console.log("** Widgets updated!, new settings:", this.state.widgets) });
  }

  widgetBreakpoint = (breakpoint, cols) => {
    this.setState( prevState => ({
      widgets: {
        ...prevState.widgets,
        breakpoint: breakpoint,
        cols: cols
      }
    }), () => { console.log("** Widgets updated!, new settings:", this.state.widgets) });
  }

  widgetLayout = (newLayout) => {
    this.setState( prevState => ({
      widgets: {
        ...prevState.widgets,
        widgets: newLayout
      }
    }), () => { console.log("** Widgets updated!, new settings:", this.state.widgets) });
  }

  removeWidget = (event) => {
    event.persist();
    const target = "" + event.target.dataset.key
    console.log("** removing widget:", target);
    this.setState( prevState => ({
      widgets: {
        ...prevState.widgets,
        widgets: _.reject(prevState.widgets.widgets, { i: target }),
      }
    }), () => { console.log("** Widgets updated!, new settings:", this.state.widgets) });
  }

  componentDidMount() {
    console.log("Year mounted!");

    this.props.firebase.userDat()
    .once('value', snapshot => {
      const obj = snapshot.val();
      const uid = Object.getOwnPropertyNames(obj)[0];

      const objchild = obj[Object.keys(obj)[0]];
      const months = objchild.months;
      const generalSettings = objchild.generalSettings;
      const widgets = objchild.widgets;
      console.log("** Widgets Importing", widgets);
      this.setState({
        loaded: true,
        uid,
        months,
        generalSettings,
        widgets
      }, () => { console.log("** Transactions Imported!", this.state.months) })

    })
  }

  componentWillUnmount() {
    this.props.firebase.userDat().off();
  }

  componentDidUpdate() {
    console.log("** Database Updated!", removeEmpty(this.state.widgets))
    if( typeof this.state.uid !== "undefined" && this.state.loaded) {
      this.props.firebase.userData(this.state.uid)
        .set({
          months: this.state.months,
          generalSettings: this.state.generalSettings,
          widgets: removeEmpty(this.state.widgets)
      })
    }
  }

  render() {
    return(
      <div className="container">
        <Month monthId            = "0"
               expenseCategories  = {expenseCategories}
               incomeCategories   = {incomeCategories}
               generalSettings    = {this.state.generalSettings}

               widgetData         = {this.state.widgets}
               userSet            = {this.state.months.jan.settings}
               incomeData         = {this.state.months.jan.income}
               incomeDataCount    = {this.state.months.jan.incomeCount}
               expensesData       = {this.state.months.jan.expenses}
               expensesDataCount  = {this.state.months.jan.expensesCount}

               updateSettings     = {this.updateSettings}
               updateExpenses     = {this.updateExpenses}
               updateIncome       = {this.updateIncome}

               addWidget          = {this.addWidget}
               onBreakpointChange = {this.widgetBreakpoint}
               onLayoutChange     = {this.widgetLayout}
               onRemoveItem       = {this.removeWidget}
        />

        <Modal isOpen         = {this.state.showSettings}
               onRequestClose = {this.handleCloseSettings} >

          <span className="button-close" onClick={this.handleCloseSettings}>&#10006;</span>
          <AccountSettings generalSettings  = {this.state.generalSettings}
                           handleSubmit     = {this.updateGeneralSettings} />

        </Modal>

        <div>
          <button onClick={this.handleOpenSettings}>Account Settings</button>
        </div>

      </div>
    )
  }
}

const condition = authUser => !!authUser;

const Year = compose(
  withAuthorization(condition),
  withFirebase,
)(YearBase);

export default Year
