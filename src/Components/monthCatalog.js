import React from 'react';
import CatalogTable from './catalogTable';
import NewTransactionForm from './newTransactionForm';

import initialData from '../monthDataExample.json';

class MonthCatalog extends React.Component {

  constructor() {
    super();

    this.state = {
      transactionObjects: [],
      transactionCount: 1,

      editData:
      {
        date:         1,
        description:  "Enter Description",
        amount:       0,
        category:     "Other",
        id:           0
      },

      isSortedByDate:         false,
      isSortedByDescription:  false,
      isSortedByAmount:       false,
      isSortedByCategory:     false,
      isSortedById:           true,
      isReverseSort:          false,

      isEditting:   false,
      editId:    0
    }

    console.log("Initial count: ", this.state.transactionCount);

    this.toggleSortByDate        = this.toggleSortByDate.bind(this);
    this.toggleSortByDescription = this.toggleSortByDescription.bind(this);
    this.toggleSortByAmount      = this.toggleSortByAmount.bind(this);
    this.toggleSortByCategory    = this.toggleSortByCategory.bind(this);
    this.toggleSortById          = this.toggleSortById.bind(this);

    this.append                  = this.append.bind(this);
    this.remove                  = this.remove.bind(this);
    this.sortData                = this.sortData.bind(this);

    this.handleEdit              = this.handleEdit.bind(this);
    this.cancelEdit              = this.cancelEdit.bind(this);
    this.doneEdit                = this.doneEdit.bind(this);

    this.handleDate              = this.handleDate.bind(this);
    this.handleDescription       = this.handleDescription.bind(this);
    this.handleAmount            = this.handleAmount.bind(this);
    this.handleCategory          = this.handleCategory.bind(this);
  }

  /* Database Functions */

  loadJSON = () => {
    this.setState(prevState => ({
      transactionObjects: initialData,
      transactionCount: prevState.transactionCount + initialData.length
    }));
  }

  append = ( transaction ) =>  {

    let transactionList = this.state.transactionObjects;
    transaction.id = this.state.transactionCount;

    transactionList.push(transaction);
    this.setState(prevState => ({
      transactionObjects: transactionList,
      transactionCount: prevState.transactionCount + 1
    }));

    this.resetForm();
    console.log("** Transaction added!");
  }

  remove = ( transactionId ) =>  {
    let transactionList = this.state.transactionObjects;
    let index = transactionList.findIndex( transaction => transaction.id === transactionId );
    console.log("Index:", index);
    if( index === -1 )
    {
      console.log("/************* Error: Transaction not found! *************/");
      return 0;
    }
    transactionList.splice(index, 1);
    this.setState({ transactionObjects: transactionList });
    console.log("** Transaction removed!");
  }

  /* Database Sorters */

  sortData = () => {
    console.log("** sortData called!");
    console.log("   # Sort is reversed = ", this.state.isReverseSort);
    let transactionList = this.state.transactionObjects;
    let sortedTransactions;
    if( this.state.isSortedByDate )
    {
      sortedTransactions = this.state.isReverseSort ?
                           transactionList.sort( (a,b) => b.date - a.date ) :
                           transactionList.sort( (a,b) => a.date - b.date );
      console.log("** Sorted By Date, Sorted Array: ", sortedTransactions);
      this.setState({ transactionObjects: sortedTransactions });
    }
    else if( this.state.isSortedByDescription )
    {
      sortedTransactions = this.state.isReverseSort ?
                           transactionList.sort( (a,b) => a.description.toUpperCase() < b.description.toUpperCase() ) :
                           transactionList.sort( (a,b) => a.description.toUpperCase() > b.description.toUpperCase() );
      this.setState({ transactionObjects: sortedTransactions });
    }
    else if( this.state.isSortedByAmount )
    {
      sortedTransactions = this.state.isReverseSort ?
                           transactionList.sort( (a,b) => b.amount - a.amount ) :
                           transactionList.sort( (a,b) => a.amount - b.amount );
      this.setState({ transactionObjects: sortedTransactions });
    }
    else if( this.state.isSortedByCategory )
    {
      sortedTransactions = this.state.isReverseSort ?
                           transactionList.sort( (a,b) => a.category.toUpperCase() < b.category.toUpperCase() ) :
                           transactionList.sort( (a,b) => a.category.toUpperCase() > b.category.toUpperCase() );
      this.setState({ transactionObjects: sortedTransactions });
    }
    else if( this.state.isSortedById )
    {
      sortedTransactions = this.state.isReverseSort ?
                           transactionList.sort( (a,b) => a.id - b.id ) :
                           transactionList.sort( (a,b) => b.id - a.id );
      this.setState({ transactionObjects: sortedTransactions });
    }
    else { console.log("/************* Data unsuccesfully sorted! *************/") }
    console.log("** sortData Done!");
  }

  toggleSortByDate = () => {
    if( !this.state.isSortedByDate )
    {
      console.log("Data initialized to sort by date!");
      this.setState({
        isSortedByDate:         true,
        isSortedByDescription:  false,
        isSortedByAmount:       false,
        isSortedByCategory:     false,
        isSortedById:           false,
        isReverseSort:          false
      }, this.sortData);
    }
    else { this.setState({ isReverseSort: !this.state.isReverseSort }, this.sortData) }
  }
  toggleSortByDescription = () => {
    if( !this.state.isSortedByDescription )
    {
      console.log("Data initialized to sort by description!");
      this.setState({
        isSortedByDate:         false,
        isSortedByDescription:  true,
        isSortedByAmount:       false,
        isSortedByCategory:     false,
        isSortedById:           false,
        isReverseSort:          false
      }, this.sortData);
    }
    else { this.setState({ isReverseSort: !this.state.isReverseSort }, this.sortData) }
  }
  toggleSortByAmount = () => {
    if( !this.state.isSortedByAmount )
    {
      console.log("Data initialized to sort by Amount!");
      this.setState({
        isSortedByDate:         false,
        isSortedByDescription:  false,
        isSortedByAmount:       true,
        isSortedByCategory:     false,
        isSortedById:           false,
        isReverseSort:          false
      }, this.sortData);
    }
    else { this.setState({ isReverseSort: !this.state.isReverseSort }, this.sortData) }
  }
  toggleSortByCategory = () => {
    if( !this.state.isSortedByCategory )
    {
      console.log("Data initialized to sort by Category!");
      this.setState({
        isSortedByDate:         false,
        isSortedByDescription:  false,
        isSortedByAmount:       false,
        isSortedByCategory:     true,
        isSortedById:           false,
        isReverseSort:          false
      }, this.sortData);
    }
    else { this.setState({ isReverseSort: !this.state.isReverseSort }, this.sortData) }
  }
  toggleSortById = () => {
    if( !this.state.isSortedById )
    {
      console.log("Data initialized to sort by Recent!");
      this.setState({
        isSortedByDate:         false,
        isSortedByDescription:  false,
        isSortedByAmount:       false,
        isSortedByCategory:     false,
        isSortedById:           true,
        isReverseSort:          false
      }, this.sortData);
    }
    else { this.setState({ isReverseSort: !this.state.isReverseSort }, this.sortData) }
  }

  /* Form handlers */

  handleDate = (event) => {
    let updatedForm = this.state.editData;
    updatedForm.date = event.target.value;
    this.setState({ editData: updatedForm });
  }
  handleDescription = (event) => {
    let updatedForm = this.state.editData;
    updatedForm.description = event.target.value;
    this.setState({ editData: updatedForm });
  }
  handleAmount = (event) => {
    let updatedForm = this.state.editData;
    updatedForm.amount = event.target.value;
    this.setState({ editData: updatedForm });
  }
  handleCategory = (event) => {
    let updatedForm = this.state.editData;
    updatedForm.category = event.target.value;
    this.setState({ editData: updatedForm });
  }

  handleEdit = ( transactionId ) => {
    let transactionList = this.state.transactionObjects;
    let index = transactionList.findIndex( transaction => transaction.id === transactionId );
    let data = {
      date:         transactionList[index].date,
      description:  transactionList[index].description,
      amount:       transactionList[index].amount,
      category:     transactionList[index].category,
      id:           this.state.transactionCount
    };

    this.setState({
      editData: data,
      editId: transactionId,
      isEditting: true
    });
  }
  cancelEdit = () => { this.setState({ isEditting: false }); }
  doneEdit = ( transactionId ) => {
    let transactionList = this.state.transactionObjects;
    let index = transactionList.findIndex( transaction => transaction.id === transactionId );

    transactionList[index].date         = this.state.editData.date;
    transactionList[index].description  = this.state.editData.description;
    transactionList[index].amount       = this.state.editData.amount;
    transactionList[index].category     = this.state.editData.category;

    this.setState({
      transactionObjects: transactionList,
      isEditting: false
    });
  }

  /* Form Extra Functions */

  resetForm = () => {
    let resettedForm = {
      date:         1,
      description:  "Enter Description",
      amount:       0,
      category:     "Other",
      id:           0
    }
    this.setState({ formData: resettedForm });
  }


  render() {

    // console.log("Current count: ", this.state.transactionCount);
    console.log("Printed Array: ", this.state.transactionObjects);

    return(
      <div>
      <NewTransactionForm addTransaction = {this.append} />

        <button onClick={this.loadJSON}>LOAD LOCAL JSON DATA</button>

        <button onClick={this.toggleSortByDate}>Sort By Date</button>
        <button onClick={this.toggleSortByDescription}>Sort By Description</button>
        <button onClick={this.toggleSortByAmount}>Sort By Amount</button>
        <button onClick={this.toggleSortByCategory}>Sort By Category</button>
        <button onClick={this.toggleSortById}>Sort By Recent</button>

        <CatalogTable transactionObjects = {this.state.transactionObjects}
                      transactionCount   = {this.state.transactionCount}
                      editData           = {this.state.editData}

                      isEditting         = {this.state.isEditting}
                      editId             = {this.state.editId}
                      handleEdit         = {this.handleEdit}
                      cancelEdit         = {this.cancelEdit}
                      doneEdit           = {this.doneEdit}
                      handleRemove       = {this.remove}

                      handleDate         = {this.handleDate}
                      handleDescription  = {this.handleDescription}
                      handleAmount       = {this.handleAmount}
                      handleCategory     = {this.handleCategory} />

      </div>
    )
  }
}

export default MonthCatalog
