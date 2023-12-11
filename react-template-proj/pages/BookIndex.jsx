import { UserPreview } from '../cmps/UserPreview.jsx'
import { bookService } from '../services/bookService.js'
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "../pages/BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { showSuccessMsg } from "../services/event-bus.service.js"

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onSelectedBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                // const newCars = cars.filter(car => car.id !== carId)
                // setCars(newCars)
                setBooks(prevBooks => {
                    return prevBooks.filter(book => book.id !== bookId)
                })
                showSuccessMsg(`book successfully removed! ${bookId}`)
            })
            .catch(err => console.log('err:', err))

    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index ">
            <h1>Welcome to book index!</h1>
            {/* <BookFilter filterBy={{ txt, minSpeed }} onSetFilter={onSetFilter} /> */}
            <Link to="/books/edit">Add</Link>
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}
