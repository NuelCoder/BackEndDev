const http = require('http')
const link = 'http://localhost:8080'
const link2 = 'http://localhost:4000'
const link3 = 'http://localhost:3000'
class Book{
    constructor(title,author,isbn,available){
        this.title = title;
        this.author = author;
        const _isbn = isbn; // Private variable to store ISBN
        this.available = true;

        this.getIsbn = () => _isbn;

        this.setIsbn = (newIsbn) => {
            console.log('Sorry, ISBN can\'t be modified directly')
        };
        }
    
    borrowBook(){ //function to show borrow status of a book
        if(this.available){
            this.available = false;
            console.log(`You have successfully borrowed ${this.title} written by ${this.author} with an ISBN ${this.isbn} from the Badejo Library`);
        }
        else{
            console.log(`Kindly come back later, ${this.title} is not available`)
        }
    }
    returnBook(){ //function to show return status of a book
        if(!this.available){
            this.available = true;
            console.log(`Thank you for returning ${this.title}. See you next time!`)
        }
        else{
            console.log(`Sorry, ${this.title} was never borrowed from the Badejo Library`)
        }
    }
    get isbn(){
        return this.getIsbn();
    }
    set isbn(value){
        this.setIsbn(value);
    }
}

class Library{
    constructor(){
        this.books = []
    }


    addBook(book){ //function to add a book to the library database
        this.books.push(book);
        console.log(`${book.title} has been added to the Badejo Library`)
    }


    removeBook(isbn){ // function to remove a book from the library database based on its isbn
        const Book_Index = this.books.findIndex((book) => book.isbn === isbn)
        if(Book_Index !== -1){
            const Removed_Book = this.books.splice(Book_Index,1)[0];
            console.log(`${Removed_Book.title} has been removed from the Library`)
        }
        else{
            console.log(`No book with ISBN${isbn} is present in the Badejo Library`)
        }
    }
    
    
    findBook_byTitle(title){ // function to find a book based on its title
        const book = this.books.find((book) => book.title === title)
        if(book){
            console.log(`${book.title} written by ${book.author} with an ISBN ${book.isbn} has been found`)
        }
        else{
            console.log(`${title} was not found in the Badejo Library `)
        }
    }
}


class DigitalLibrary extends Library{
    Download_Book(isbn){ // method to download a book if it's available
        const book = this.books.find(book => book.isbn === isbn)
        
        if(book && book.available){
            http.createServer((req,res) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(`<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body><h2 style="text-align: center;">Welcome To The Badejo Library</h2><p style="text-align: center;"> Downloading ${book.title}...</p></body></html>`)
                res.end();
            }).listen(8080, () => {
                console.log(`Click on this ${link} to download the book with ISBN${isbn}`)
        })
        }
        
        else if(book && !book.available){
            http.createServer((req,res) => {
                res.writeHead(200, { 'Content-Type': 'text/html'})
                res.write(`<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body><h2 style="text-align: center;">Welcome To The Badejo Library</h2><p style="text-align: center;">${book.title} is currently not available for download</p></body></html>`)
                res.end()
            }).listen(4000, () => {
                console.log(`Click on this ${link2} to download the book with ISBN${isbn}`)
            })
        }
        
        else{
            http.createServer((req,res) => {
                res.writeHead(200,{'Content-Type': 'text/html'})
                res.write(`<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body><h2 style="text-align: center;">Welcome To The Badejo Library</h2><p style="text-align: center;">Error! Book with ISBN ${isbn} can not be found </p></body></html>`)
                res.end()
            }).listen(3000, () => {
                console.log(`Click on this ${link3} to download the book with ISBN ${isbn}`)
            })
        }
    }
}




const book1 = new Book( 'The Catcher in the Rye','J.D. Salinger', '978-0316769174')
const book2 = new Book( 'Pride and Prejudice','Jane Austen','978-0141439511')
const book3 = new Book( 'The Hunger Games','Suzanne Collins','978-0439023528')
const book4 = new Book( 'The Lord of the Rings','J.R.R. Tolkien','978-0261102217')
const book5 = new Book( 'A Game of Thrones','George R. R. Martin','978-0553386790')


book2.borrowBook()
book2.borrowBook()

book2.returnBook()
book2.returnBook()


const library = new Library()
library.addBook(book1)
library.addBook(book2)
library.addBook(book3)
library.addBook(book4)
library.addBook(book5)


library.removeBook('978-0261102217')

library.findBook_byTitle('A Game of Thrones')

const digital_library = new DigitalLibrary()

digital_library.addBook(book1)
digital_library.addBook(book2)
digital_library.addBook(book3)
digital_library.addBook(book4)
digital_library.addBook(book5)

digital_library.Download_Book('978-0261102217')//Available to download
book1.borrowBook()
digital_library.Download_Book( '978-0316769174')//Not available to download at the moment

digital_library.Download_Book( '978-0316769173')//Book is not in the digital library

console.log(book2.isbn)
book2.isbn = '4142352342523'