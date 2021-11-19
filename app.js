const express = require("express");

const book_details = require("./book_details.json");

const app = express();

app.use(express.json())

// ************************ middleware ***************************

const middleware = (req, res, next) => { //middle ware function
    console.log("before")
    next()
    console.log("after")
}

app.post("/books/:name", middleware, (req, res) => {
    const obj = {}
    obj.api_requested_by = req.params.name
    obj.book = book_details
    res.send(obj)
})

app.get("/:id/:name", (req, res) => {   //for single book returned
    const obj = {}
    obj.api_requested_by = req.params.name

    const newBook = book_details.map( (each_book) => {
        if(+req.params.id === each_book.id){
            obj.book = each_book
        }
    } )

    
    res.send(obj)
})

// ***************************************************

app.get("/", (req, res) => {
    res.send({book_details})
})

app.post("/books", (req, res) => {
    const new_book = [...book_details, req.body]
    
    res.send(new_book)
})

app.patch("/books/:id/:author/:year", (req, res) => {
    console.log("from post")
    const newBook = book_details.map( (each_book) => {
        if(+req.params.id === each_book.id){
            each_book.author = req.params.author;
            each_book.year = req.params.year;
        }
    } )

    res.send(book_details)

})

app.delete("/books/:id", (req, res) => {

    const newBook = book_details.filter( (each_book) => each_book.id !== +req.params.id )

    res.send(newBook)

})


app.listen(1237, () => {
    console.log("Hai friend I am listening port number 1237")
})