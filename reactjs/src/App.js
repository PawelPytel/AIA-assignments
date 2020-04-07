import React from 'react';
import Header from './Header'
import BookList from './BookList'
import AddBookForm from './AddBookForm'
class App extends React.Component {
  constructor() {
    super()
    this.bookListElement = React.createRef()
  }
  addBookCallback = (data) => {
    this.bookListElement.current.addBook(data)
  }
  render() {

    return (
      <div className="container">
        <Header />
        <div className="row">
          <div className="col-lg-6 mt-5 ">
            <BookList ref={this.bookListElement} />
          </div>
          <div className="col-lg-6 mt-5">
            <AddBookForm
              addBookCallback={this.addBookCallback} />
          </div>
        </div>

      </div>

    )
  }
}

export default App;
