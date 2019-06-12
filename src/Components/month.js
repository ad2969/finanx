import React from 'react';
import Modal from 'react-modal';
import MonthCatalog from './monthCatalog';

// Grid layout is imported (responsive grid)
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import './month-grid-styles.css'
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Style preset for exit buttons
const closeButtonStyle = {
  position: "absolute",
  right: "10px",
  top: "10px",
  cursor: "pointer"
};

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

      items: [0, 1, 2, 3, 4].map((i, key, list) => {
        return {
          i:  i.toString(),
          x:  i * 2,  y:  0,
          w:  2,      h:  2 };
      }),
      layout: [],
      widgetCounter: 5,

      info: {

      }
    };

    this.handleOpenCatalog    = this.handleOpenCatalog.bind(this);
    this.handleCloseCatalog   = this.handleCloseCatalog.bind(this);
    this.onAddWidget          = this.onAddWidget.bind(this);
    this.onBreakpointChange   = this.onBreakpointChange.bind(this);
  }

  handleOpenCatalog () {
    this.setState({ showCatalog: true });
  }

  handleCloseCatalog () {
    this.setState({ showCatalog: false });
  }

  createWidget = (el) => {
    const removeStyle = {
      position: "absolute",
      right: "5px",
      top: 0,
      cursor: "pointer"
    };

    return (
      <div key={el.i} data-grid={el}>
        <span className="text">{el.i}</span>
        <span className="remove"
              style={removeStyle}
              onClick={this.onRemoveItem.bind(this, el.i)}
        >x</span>
      </div>
    );
  }

  onAddWidget = () => {
    console.log("adding", this.state.widgetCounter);
    this.setState({
      items: this.state.items.concat(
      {
        i: this.state.widgetCounter.toString(),
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the very bottom
        w: 2, h: 2
      }),
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


  render() {
    return (
      <div>
        <button onClick={this.onAddWidget}>Add Item</button>
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

      </div>
    )
  }
}

export default Month
