import React from 'react';
import Table from './table';
import Form from './form';
import initialData from '../monthDataExample.json'


class Month extends React.Component {

  constructor() {
    super();
    console.log("Initial count: ", this.state.transactionCount);

    this.toggleSortByDate = this.toggleSortByDate.bind(this);
  }

  state = {
    transactionObjects: [],
    transactionCount: 1,
    formData:
    {
      date:         1,
      description:  "Enter Description",
      amount:       0,
      category:     "Other",
      id:           0
    },
    editData:
    {
      date:         1,
      description:  "Enter Description",
      amount:       0,
      category:     "Other",
      id:           0
    },

    isSortedByDate:         0,
    isSortedByDescription:  0,
    isSortedByAmount:       0,
    isSortedByCategory:     0,
    isSortedById:           1,
    isReverseSort:          false,

    isEditting:   false,
    editId:    0
  }

  /* Database Functions */

  loadJSON = () => {
    this.setState(prevState => ({
      transactionObjects: initialData,
      transactionCount: prevState.transactionCount + initialData.length
    }));
  }

  append = () =>  {

    let transactionList = this.state.transactionObjects;
    let data = {
      date:         this.state.formData.date,
      description:  this.state.formData.description,
      amount:       this.state.formData.amount,
      category:     this.state.formData.category,
      id:           this.state.transactionCount
    };

    transactionList.push(data);
    this.setState(prevState => ({
      transactionObjects: transactionList,
      transactionCount: prevState.transactionCount + 1
    }));

    this.resetForm();
    console.log("Transaction added!");
  }

  remove = (transactionId) =>  {
    let transactionList = this.state.transactionObjects;
    let index = transactionList.findIndex( transaction => transaction.id === transactionId );
    console.log("Index:", index);
    if( index === -1 )
    {
      console.log("Error: Transaction not found!");
      return 0;
    }
    transactionList.splice(index, 1);
    this.setState({ transactionObjects: transactionList });
    console.log("Transaction removed!");
  }

  /* Database Sorters */

  sortData = () => {
    let transactionList = this.state.transactionObjects;
    let sortedTransactions;
    if( this.state.isSortedByDate && this.state.isReverseSort )
    {
      sortedTransactions = transactionList.sort( (a,b) => a.date - b.date );
      this.setState({ transactionObjects: sortedTransactions });
    }
    else if( this.state.isSortedByDate && !this.state.isReverseSort )
    {
      sortedTransactions = transactionList.sort( (a,b) => b.date - a.date );
      this.setState({ transactionObjects: sortedTransactions });
    }

    else if( this.state.isSortedByDescription && this.state.isReverseSort )
    {
      sortedTransactions = transactionList.sort( (a,b) => a.description < b.description );
      this.setState({ transactionObjects: sortedTransactions });
    }
    else if( this.state.isSortedByDescription && !this.state.isReverseSort )
    {
      sortedTransactions = transactionList.sort( (a,b) => a.description > b.description );
      this.setState({ transactionObjects: sortedTransactions });
    }

    else if( this.state.isSortedByAmount && this.state.isReverseSort )
    {
      sortedTransactions = transactionList.sort( (a,b) => a.amount - b.amount );
      this.setState({ transactionObjects: sortedTransactions });
    }
    else if( this.state.isSortedByAmount && !this.state.isReverseSort )
    {
      sortedTransactions = transactionList.sort( (a,b) => b.amount - a.amount );
      this.setState({ transactionObjects: sortedTransactions });
    }

    else if( this.state.isSortedByCategory && this.state.isReverseSort )
    {
      sortedTransactions = transactionList.sort( (a,b) => a.category < b.category );
      this.setState({ transactionObjects: sortedTransactions });
    }
    else if( this.state.isSortedByCategory && !this.state.isReverseSort )
    {
      sortedTransactions = transactionList.sort( (a,b) => a.category > b.category );
      this.setState({ transactionObjects: sortedTransactions });
    }

    else if( this.state.isSortedById && this.state.isReverseSort )
    {
      sortedTransactions = transactionList.sort( (a,b) => a.id - b.id );
      this.setState({ transactionObjects: sortedTransactions });
    }
    else if( this.state.isSortedById && !this.state.isReverseSort )
    {
      sortedTransactions = transactionList.sort( (a,b) => b.id - a.id );
      this.setState({ transactionObjects: sortedTransactions });
    }
  }

  toggleSortByDate = () => {
    if( this.state.isSortedByDate === 0 )
    {
      this.setState({
        isSortedByDate:         1,
        isSortedByDescription:  0,
        isSortedByAmount:       0,
        isSortedByCategory:     0,
        isSortedById:           0,
        isReverseSort:          false
      })
    }
    else { this.setState({ isReverseSort: !this.state.isReverseSort }) }

    console.log("  * reverse sort = ", this.state.isReverseSort);
    this.sortData();
  }
  toggleSortByDescription = () => {
    if( this.state.isSortedByDescription === 0 )
    {
      this.setState({
        isSortedByDate:         0,
        isSortedByDescription:  1,
        isSortedByAmount:       0,
        isSortedByCategory:     0,
        isSortedById:           0,
        isReverseSort:          false
      })
    }
    else { this.setState({ isReverseSort: !this.state.isReverseSort }) }

    console.log("  * reverse sort = ", this.state.isReverseSort);
    this.sortData();
  }
  toggleSortByAmount = () => {
    if( this.state.isSortedByAmount === 0 )
    {
      this.setState({
        isSortedByDate:         0,
        isSortedByDescription:  0,
        isSortedByAmount:       1,
        isSortedByCategory:     0,
        isSortedById:           0,
        isReverseSort:          false
      })
    }
    else { this.setState({ isReverseSort: !this.state.isReverseSort }) }

    console.log("  * reverse sort = ", this.state.isReverseSort);
    this.sortData();
  }
  toggleSortByCategory = () => {
    if( this.state.isSortedByCategory === 0 )
    {
      this.setState({
        isSortedByDate:         0,
        isSortedByDescription:  0,
        isSortedByAmount:       0,
        isSortedByCategory:     1,
        isSortedById:           0,
        isReverseSort:          false
      })
    }
    else { this.setState({ isReverseSort: !this.state.isReverseSort }) }

    console.log("  * reverse sort = ", this.state.isReverseSort);
    this.sortData();
  }
  toggleSortById = () => {
    if( this.state.isSortedById === 0 )
    {
      this.setState({
        isSortedByDate:         0,
        isSortedByDescription:  0,
        isSortedByAmount:       0,
        isSortedByCategory:     0,
        isSortedById:           1,
        isReverseSort:          false
      });
    }
    else { this.setState({ isReverseSort: !this.state.isReverseSort }) };

    console.log("  * reverse sort = ", this.state.isReverseSort);
    this.sortData();
  }

  /* Form handlers */

  handleSubmit = (event) => {
    this.append();
    event.preventDefault();
  }
  handleDate = (event) => {
    let updatedForm;
    if (this.state.isEditting)
    {
      updatedForm = this.state.editData;
      updatedForm.date = event.target.value;
      this.setState({ editData: updatedForm });
    }
    else
    {
      updatedForm = this.state.formData;
      updatedForm.date = event.target.value;
      this.setState({ formData: updatedForm });
    }
  }
  handleDescription = (event) => {
    let updatedForm;
    if (this.state.isEditting)
    {
      updatedForm = this.state.editData;
      updatedForm.description = event.target.value;
      this.setState({ editData: updatedForm });
    }
    else
    {
      updatedForm = this.state.formData;
      updatedForm.description = event.target.value;
      this.setState({ formData: updatedForm });
    }
  }
  handleAmount = (event) => {
    let updatedForm;
    if (this.state.isEditting)
    {
      updatedForm = this.state.editData;
      updatedForm.amount = event.target.value;
      this.setState({ editData: updatedForm });
    }
    else
    {
      updatedForm = this.state.formData;
      updatedForm.amount = event.target.value;
      this.setState({ formData: updatedForm });
    }
  }
  handleCategory = (event) => {
    let updatedForm;
    if (this.state.isEditting)
    {
      updatedForm = this.state.editData;
      updatedForm.category = event.target.value;
      this.setState({ editData: updatedForm });
    }
    else
    {
      updatedForm = this.state.formData;
      updatedForm.category = event.target.value;
      this.setState({ formData: updatedForm });
    }
  }

  handleEdit = (transactionId) => {
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
  doneEdit = (transactionId) => {
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

    console.log("Current count: ", this.state.transactionCount);
    console.log(this.state.transactionObjects);

    return(
      <div>
      <Form formData          = {this.state.formData}
            handleDate        = {this.handleDate}
            handleDescription = {this.handleDescription}
            handleAmount      = {this.handleAmount}
            handleCategory    = {this.handleCategory}
            handleSubmit      = {this.handleSubmit} />

        <button onClick={this.loadJSON}>LOAD LOCAL JSON DATA</button>

        <button onClick={this.toggleSortByDate}>Sort By Date</button>
        <button onClick={this.toggleSortByDescription}>Sort By Description</button>
        <button onClick={this.toggleSortByAmount}>Sort By Amount</button>
        <button onClick={this.toggleSortByCategory}>Sort By Category</button>
        <button onClick={this.toggleSortById}>Sort By Recent</button>

        <Table transactionObjects = {this.state.transactionObjects}
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
               handleCategory     = {this.handleCategory}
               handleSubmit       = {this.handleSubmit}/>

      </div>
    )
  }
}

export default Month
