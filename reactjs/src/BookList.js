import React from 'react'
import examples from './examples'
import Book from './Book'
class BookList extends React.Component {
    constructor() {
        super()
        this.state = {
            searchValue: "",
            sortValue: "title",
            booksObjects: examples.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1).map(book => <Book
                key={book.id}
                data={book}
                parentCallback={this.callbackFunction}
                callbackDelete={this.callbackDelete} />),
            books: examples
        }
        this.handleChange = this.handleChange.bind(this)
        this.callbackFunction = this.callbackFunction.bind(this)
    }
    addBook(data) {

        this.setState((prevState) => {
            const booksCopy = prevState.books
            return ({
                books: booksCopy.concat([data]),
                searchValue: prevState.searchValue,
                sortValue: prevState.sortValue,
                booksObjects: []
            })


        })
    }
    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    callbackDelete = (id) => {

        var oldBooks = this.state.books
        var newBooks = oldBooks.filter((book) => book.id !== id)
        this.setState(
            {
                books: newBooks
            })
    }
    callbackFunction = (childData) => {
        var oldBooks = this.state.books
        var newBooks = []
        oldBooks.forEach((b) => {
            var newBook = b
            if (b.id === childData.id)
                newBook.rating = childData.rating
            newBooks.push(newBook)
        })

        this.setState(
            {
                books: newBooks
            })

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchValue !== this.state.searchValue) {
            const newBooks = prevState.books.filter(s => s.title.toLowerCase().includes(this.state.searchValue))
            this.setState({
                booksObjects: newBooks.map(book => <Book
                    key={book.id}
                    data={book}
                    callbackDelete={this.callbackDelete}
                    parentCallback={this.callbackFunction} />)
            })
        }
        else {
            console.log(prevState.books)
            if (this.state.books.length !== prevState.books.length)
                var newBooks = this.state.books
            else
                newBooks = prevState.books
            if (this.state.sortValue !== "rating")
                newBooks = newBooks.sort((a, b) => a[this.state.sortValue] > b[this.state.sortValue] ? 1 : -1)
            else
                newBooks = newBooks.sort((a, b) => a[this.state.sortValue] > b[this.state.sortValue] ? -1 : 1)

            if (prevState.sortValue !== this.state.sortValue ||
                prevState.books !== this.state.books) {
                this.setState({
                    booksObjects: newBooks.map(book => <Book
                        key={book.id}
                        data={book}
                        parentCallback={this.callbackFunction}
                        callbackDelete={this.callbackDelete} />)
                })
            }
        }

        // if (prevState.sortValue !== this.state.sortValue && this.state.sortValue !== "rating") {
        //     const newBooks = prevState.books.sort((a, b) => a[this.state.sortValue] > b[this.state.sortValue] ? 1 : -1)
        //     this.setState({
        //         booksObjects: newBooks.map(book => <Book
        //             key={book.id}
        //             data={book}
        //             parentCallback={this.callbackFunction}
        //             callbackDelete={this.callbackDelete} />),
        //     })
        // }
        // else if (prevState.sortValue !== this.state.sortValue && this.state.sortValue === "rating") {
        //     const newBooks = prevState.books.sort((a, b) => a[this.state.sortValue] > b[this.state.sortValue] ? -1 : 1)
        //     this.setState({
        //         booksObjects: newBooks.map(book => <Book
        //             key={book.id}
        //             data={book}
        //             parentCallback={this.callbackFunction}
        //             callbackDelete={this.callbackDelete} />),
        //     })
        // }
        // else if (prevState.searchValue !== this.state.searchValue) {
        //     const newBooks = prevState.books.filter(s => s.title.toLowerCase().includes(this.state.searchValue))
        //     this.setState({
        //         booksObjects: newBooks.map(book => <Book
        //             key={book.id}
        //             data={book}
        //             callbackDelete={this.callbackDelete}
        //             parentCallback={this.callbackFunction} />),
        //     })
        // }
        // else if (prevState.books !== this.state.books && this.state.sortValue === "rating") {
        //     const newBooks = prevState.books.sort((a, b) => a[this.state.sortValue] > b[this.state.sortValue] ? -1 : 1)
        //     this.setState({
        //         booksObjects: newBooks.map(book => <Book
        //             key={book.id}
        //             data={book}
        //             parentCallback={this.callbackFunction}
        //             callbackDelete={this.callbackDelete} />),
        //     })
        // }
        // else if (prevState.books !== this.state.books && this.state.sortValue !== "rating") {
        //     const newBooks = prevState.books.sort((a, b) => a[this.state.sortValue] > b[this.state.sortValue] ? 1 : -1)
        //     this.setState({
        //         booksObjects: newBooks.map(book => <Book
        //             key={book.id}
        //             data={book}
        //             parentCallback={this.callbackFunction}
        //             callbackDelete={this.callbackDelete} />),
        //     })
        // }
    }
    render() {

        return (
            <div>
                <form>
                    <div className="flexRow">

                        <input className="myInput"
                            type="text"
                            autoComplete="off"
                            name="searchValue"
                            placeholder="Search by title..."
                            value={this.state.searchValue}
                            onChange={this.handleChange}
                        />
                        <label>Sort by: </label>
                        <div className="mySelect">
                            <select
                                name="sortValue"
                                value={this.state.sortValue}
                                onChange={this.handleChange}>
                                <option value="title">title</option>
                                <option value="rating">rating</option>
                                <option value="lastName">author's last name</option>
                            </select>
                        </div>
                    </div>
                </form>
                {this.state.booksObjects}
            </div>
        )
    }
}
export default BookList