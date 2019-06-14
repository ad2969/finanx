import React from 'react';
import CatalogTable from './catalogTable';
import NewTransactionForm from './newTransactionForm';

class MonthCatalog extends React.Component {

  constructor(props) {
    // console.log('Month Catalog Constructed!');
    super(props);

    this.state = {
      sortedTransactions: [],
      transactionCount: 1,

      editData:
      {
        date:         1,
        description:  "Enter Description",
        amount:       0,
        category:     "Other",
        id:           0
      },

      isSortedBy: "Id",
      isEditting: false,
      editId:    0
    }

    this.toggleSortBy        = this.toggleSortBy.bind(this);

    this.append              = this.append.bind(this);
    this.remove              = this.remove.bind(this);
    this.sortData            = this.sortData.bind(this);

    this.handleEdit          = this.handleEdit.bind(this);
    this.cancelEdit          = this.cancelEdit.bind(this);
    this.doneEdit            = this.doneEdit.bind(this);

    this.handleDate          = this.handleDate.bind(this);
    this.handleDescription   = this.handleDescription.bind(this);
    this.handleAmount        = this.handleAmount.bind(this);
    this.handleCategory      = this.handleCategory.bind(this);
  }

  /* Lifecycle Functions */

  // Update from upper tree
  componentDidMount() {
    console.log("Month Catalog Mounted!");
    this.setState({
      sortedTransactions: this.props.realData,
      transactionCount: this.props.realCount,
      isSortedBy: this.props.isSortedBy,
    }, () => { this.sortData(this.props.isSortedBy) });

  }

  // Update to upper tree
  componentWillUnmount() {
    console.log("Month Catalog Unmounted! Updating tree....");
    // let unsortedTransactions = this.state.sortedTransactions.sort( (a,b) => b.id - a.id )
    // this.props.updateData(unsortedTransactions, this.state.transactionCount);
    this.props.updateData(this.state.sortedTransactions, this.state.transactionCount);
  }

  /* Database Functions */

  loadJSON = () => {
    let data = [];
    for( let i = 0; i < this.props.initialData.length; i++ ) {
      data.push( this.props.initialData[i] )
    }
    this.setState(prevState => ({
      sortedTransactions: data,
      transactionCount: prevState.transactionCount + data.length
    }), () => { this.sortData(this.props.isSortedBy);
                console.log("External Data Loaded!, Array:", this.state.sortedTransactions) }
    );
  }

  append = ( transaction ) =>  {

    let transactionList = this.state.sortedTransactions;
    transaction.id = this.state.transactionCount;

    transactionList.push(transaction);
    this.setState(prevState => ({
      sortedTransactions: transactionList,
      transactionCount: prevState.transactionCount + 1
    }));

    this.resetForm();
    console.log("** Transaction added!");
  }

  remove = ( transactionId ) =>  {
    let transactionList = this.state.sortedTransactions;
    let index = transactionList.findIndex( transaction => transaction.id === transactionId );
    console.log("Index:", index);
    if( index === -1 )
    {
      console.log("/************* Error: Transaction not found! *************/");
      return 0;
    }
    transactionList.splice(index, 1);
    this.setState({ sortedTransactions: transactionList });
    console.log("** Transaction removed!");
  }

  /* Database Sorters */

  toggleSortBy = (argument) => {
    // console.log("Data initialized to sort by", argument, "!");
    if( this.state.isSortedBy !== argument )
    {
      this.setState({
        isSortedBy:     argument,
        isReverseSort:  false
      }, () => { this.sortData(argument) });
    }
    else
    {
      this.setState( prevState => ({
        isReverseSort: !prevState.isReverseSort
      }), () => { this.sortData(argument) })
    }
  }

  sortData = (argument) => {
    // console.log("** sortData called!");
    console.log("   # Sort is reversed = ", this.state.isReverseSort);
    let transactionList = this.state.sortedTransactions;
    let sortedTransactions;
    switch( argument ) {
      case "Date":
        sortedTransactions = this.state.isReverseSort ?
                             transactionList.sort( (a,b) => b.date - a.date ) :
                             transactionList.sort( (a,b) => a.date - b.date );
        break;
      case "Description":
        sortedTransactions = this.state.isReverseSort ?
                             transactionList.sort( (a,b) => a.description.toUpperCase() < b.description.toUpperCase() ) :
                             transactionList.sort( (a,b) => a.description.toUpperCase() > b.description.toUpperCase() );
        break;
      case "Amount":
        sortedTransactions = this.state.isReverseSort ?
                             transactionList.sort( (a,b) => b.amount - a.amount ) :
                             transactionList.sort( (a,b) => a.amount - b.amount );
        break;
      case "Category":
        sortedTransactions = this.state.isReverseSort ?
                             transactionList.sort( (a,b) => a.category.toUpperCase() < b.category.toUpperCase() ) :
                             transactionList.sort( (a,b) => a.category.toUpperCase() > b.category.toUpperCase() );
        break;
      default:
        sortedTransactions = this.state.isReverseSort ?
                             transactionList.sort( (a,b) => a.id - b.id ) :
                             transactionList.sort( (a,b) => b.id - a.id );
        break;
    }
    this.setState({
      sortedTransactions: sortedTransactions },
      () => { console.log("** Sorted By", this.state.isSortedBy, ", Sorted Array: ", sortedTransactions) }
    );
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
    let transactionList = this.state.sortedTransactions;
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
    let transactionList = this.state.sortedTransactions;
    let index = transactionList.findIndex( transaction => transaction.id === transactionId );

    transactionList[index].date         = this.state.editData.date;
    transactionList[index].description  = this.state.editData.description;
    transactionList[index].amount       = this.state.editData.amount;
    transactionList[index].category     = this.state.editData.category;

    this.setState({
      sortedTransactions: transactionList,
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

    // console.log("Month Catalog Rendered!");
    // console.log("Current count: ", this.state.transactionCount);
    // console.log("Printed Array: ", this.state.sortedTransactions);

    return(
      <div>
      <NewTransactionForm addTransaction = {this.append}
                          categoriesList = {this.props.categories} />

        <button onClick={this.loadJSON}>LOAD LOCAL JSON DATA</button>

        <button onClick={() => {this.toggleSortBy( "Date" )}}>Sort By Date</button>
        <button onClick={() => {this.toggleSortBy( "Description" )}}>Sort By Description</button>
        <button onClick={() => {this.toggleSortBy( "Amount" )}}>Sort By Amount</button>
        <button onClick={() => {this.toggleSortBy( "Category" )}}>Sort By Category</button>
        <button onClick={() => {this.toggleSortBy( "Id" )}}>Sort By Recent</button>

        <CatalogTable transactionObjects = {this.state.sortedTransactions}
                      transactionCount   = {this.state.transactionCount}
                      categories         = {this.props.categories}
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
