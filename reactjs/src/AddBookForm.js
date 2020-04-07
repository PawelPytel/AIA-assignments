import React from 'react'
import defaultImg from './images/defaultImg.jpg'

import examples from './examples'
class AddBookForm extends React.Component {
    constructor() {
        super()
        this.state = {
            title: "",
            firstName: "",
            lastName: "",
            description: "",
            rating: "",
            imgSrc: "",
            id: examples.length + 1

        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        const { name, value, validity } = event.target
        if (name === "rating") {
            if (value !== "") {
                const valueNumber = parseInt(value)
                validity.valid && valueNumber <= 10 && valueNumber >= 0 && this.setState({ [name]: value })
            }
            else
                this.setState({ [name]: value })

        }
        else
            this.setState({ [name]: value })
    }
    checkURL(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    addBook = () => {
        console.log(this.state)
        this.props.addBookCallback(
            this.state
        )
        this.setState((prevState) => {
            return ({
                title: "",
                firstName: "",
                lastName: "",
                description: "",
                rating: "",
                imgSrc: "",
                id: prevState.id + 1
            }
            )
        })
    }
    render() {
        return (
            <div className="addForm">
                <h2>Add new book: </h2>
                <form className="myForm">
                    <input
                        autoComplete="off"
                        className="myInput"
                        type="text"
                        value={this.state.title}
                        placeholder="Enter title..."
                        name="title"
                        onChange={this.handleChange}
                        maxLength="50"
                    />
                    <br />
                    <input
                        autoComplete="off"
                        className="myInput"
                        type="text"
                        value={this.state.firstName}
                        placeholder="Enter author's first name..."
                        name="firstName"
                        onChange={this.handleChange}
                        maxLength="50"
                    />
                    <br />
                    <input
                        autoComplete="off"
                        className="myInput"
                        type="text"
                        value={this.state.lastName}
                        placeholder="Enter author's last name..."
                        name="lastName"
                        onChange={this.handleChange}
                        maxLength="50"
                    />
                    <br />
                    <input
                        autoComplete="off"
                        className="myInput"
                        type="text"
                        value={this.state.imgSrc}
                        placeholder="Enter img URL..."
                        name="imgSrc"
                        onChange={this.handleChange}
                        maxLength="1000"
                    />
                    <br />
                    <input
                        autoComplete="off"
                        className="myInput"
                        type="text"
                        pattern="[0-9]*"
                        value={this.state.rating}
                        placeholder="Enter rating..."
                        name="rating"
                        onChange={this.handleChange}
                    />



                    <textarea
                        autoComplete="off"
                        className="myInput myText"
                        placeholder="Enter description..."
                        onChange={this.handleChange}
                        value={this.state.description}
                        name="description"
                        maxLength="300"
                    />

                </form>
                <button onClick={this.addBook} className="addButton">Add</button>
                <h2>Prototype:</h2>
                <div className="book mt-0">
                    <h4>{this.state.title}</h4>
                    <h5>Directed by: {this.state.firstName} {this.state.lastName}</h5>
                    <img className="img-fluid"
                        src={this.checkURL(this.state.imgSrc) ? this.state.imgSrc :
                            defaultImg}
                        onError={(e) => { e.target.onerror = null; e.target.src = defaultImg }} alt="" />
                    <p>{this.state.description}</p>
                    <h3>Rating: {this.state.rating}</h3>
                </div>


            </div>
        )
    }
}

export default AddBookForm