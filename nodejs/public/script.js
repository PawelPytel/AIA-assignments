function addToCart(movie) {
    var req = new XMLHttpRequest();
    req.open('POST', '/add');
    req.setRequestHeader('content-type', 'application/json')


    req.send(movie);
    req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 204) {
                alert("You have added all the books available");
            }
        }
    }

}

function removeFromCart(movie, button) {
    console.log(movie)
    var req = new XMLHttpRequest();
    req.open('POST', '/remove');
    req.onreadystatechange = () => {
        window.location = "checkout"
    }
    req.setRequestHeader('content-type', 'application/json')
    req.send(movie);
}

function cancellPurchase() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        window.location = "/"
    }
    req.open('POST', '/cancell');
    req.send();
}

function resetQuantities() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        window.location = "/"
    }
    req.open('POST', '/reset');
    req.send();
}

function finalize() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                window.location = "/"
                alert("Transaction successful");
            }
            else if (req.status === 400) {
                window.location = "/"
                alert("Error,transaction cancelled")
            }
            else if (req.status===204){
                window.location = "/"
                alert("The cart was empty, add some products")
            }
        }
    }
    req.open('POST', '/finalize');
    req.send();
}