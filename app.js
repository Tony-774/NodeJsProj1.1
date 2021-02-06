const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const {render} = require('ejs');

const app = express();
const router = express.Router();

const dbURI = 'mongodb+srv://tony774:test1234@cluster0.xnzfu.mongodb.net/book-directory?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log("connected to db"))
    .catch((err) => console.log(err));



// register view engine
app.set('view engine', 'ejs');
app.listen(3000)


//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));



const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    Genre: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },

},{timestamps: true});

const Book = mongoose.model('book', bookSchema);






//routing

app.get('/add', (req, res) => {
    res.render("add", {title: 'add'})
});


app.get('/', (req, res) => {
    res.render('index', {title: 'Home'})
});

app.post('/', (req, res) => {
    
    const Book = mongoose.model(req.body.Genre, bookSchema);
    const book = new Book(req.body)
    
    book.save()
    .then((result) =>
    {
      res.redirect('/')
    })
    .catch((err) =>
    {
      console.log(err)
    })
})