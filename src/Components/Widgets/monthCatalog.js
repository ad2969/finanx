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
      isReverseSort: false,
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
      transactionCount: this.props.realCount + 1,
      isSortedBy: this.props.isSortedBy,
    }, () => { this.sortData(this.props.isSortedBy) });

  }

  // Update to upper tree
  componentWillUnmount() {
    console.log("Month Catalog Unmounted! Updating tree....");
    // let unsortedTransactions = this.state.sortedTransactions.sort( (a,b) => b.id - a.id )
    // this.props.updateData(unsortedTransactions, this.state.transactionCount);
    this.props.updateData(this.state.sortedTransactions, this.state.transactionCount, this.props.monthId);
  }

  /* Database Functions */

  loadJSON = () => {
    var confirmation = window.confirm("Are you sure you want to load a template JSON File?");
    if(!confirmation) return;
    let data = this.props.realData;
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
    var transactionList = this.state.sortedTransactions;
    var sortedTransactions;
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
    console.log("sorted", sortedTransactions);
    this.setState({
      sortedTransactions: sortedTransactions },
      () => { console.log("** Sorted By", this.state.isSortedBy, ", Sorted Array: ", sortedTransactions) }
    );
  }

  /* Form handlers */

  handleDate = (event) => {
    let updatedForm = this.state.editData;
    updatedForm.date = Number(event.target.value);
    this.setState({ editData: updatedForm });
  }
  handleDescription = (event) => {
    let updatedForm = this.state.editData;
    updatedForm.description = event.target.value;
    this.setState({ editData: updatedForm });
  }
  handleAmount = (event) => {
    let updatedForm = this.state.editData;
    updatedForm.amount = Number(event.target.value);
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
      category:     this.props.categories[0],
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
                            categoriesList = {this.props.categories}
                            transactionCount = {this.state.transactionCount}/>
        <br />
        <hr />
        <br />



        {CatalogTable( this.state.sortedTransactions,
                       this.state.transactionCount,
                       this.props.categories,
                       this.state.editData,
                       this.state.isEditting,
                       this.state.editId,
                       this.handleEdit,
                       this.cancelEdit,
                       this.doneEdit,
                       this.remove,

                       this.handleDate,
                       this.handleDescription,
                       this.handleAmount,
                       this.handleCategory,
                       this.toggleSortBy )}

      <button onClick={this.loadJSON}>LOAD LOCAL JSON DATA</button>
      </div>
    )
  }
}

export default MonthCatalog
