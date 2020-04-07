import React from 'react';
import defaultImg from './images/defaultImg.jpg'

class Book extends React.Component {
    constructor(props) {
        super()
        this.state = {
            rating: props.data.rating
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.sendData = this.sendData.bind(this)
        this.deleteMe = this.deleteMe.bind(this)
    }
    checkURL(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    sendData = (newRating) => {
        this.props.parentCallback({
            id: this.props.data.id,
            rating: newRating
        });
    }
    deleteMe = () => {
        this.props.callbackDelete(this.props.data.id)
    }
    increment() {
        this.setState(prevState => {
            const newRating = prevState.rating < 10 ? prevState.rating + 1 : prevState.rating
            this.sendData(newRating)
            return {
                rating: newRating
            }
        })

    }
    decrement() {
        this.setState(prevState => {
            const newRating = prevState.rating > 0 ? prevState.rating - 1 : prevState.rating
            this.sendData(newRating)
            return {
                rating: newRating
            }
        })

    }
    render() {


        return (
            <div className="book">
                <h4>{this.props.data.title}</h4>
                <h5>Written by: {this.props.data.firstName} {this.props.data.lastName}</h5>

                <img className="img-fluid" src={this.checkURL(this.props.data.imgSrc) ? this.props.data.imgSrc :
                    defaultImg}
                    onError={(e) => { e.target.onerror = null; e.target.src = defaultImg }} alt="" />


                <p>{this.props.data.description}</p>
                <div className="buttonsRow">
                    <h3>Rating: {this.state.rating}</h3>
                    <button className="ratingButton" onClick={this.increment}>+</button>
                    <button className="ratingButton" onClick={this.decrement}>-</button>
                    <button className="deleteButton" onClick={this.deleteMe}>Delete Book</button>
                </div>

            </div>
        )
    }
}

export default Book