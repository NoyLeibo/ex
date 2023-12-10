import { UserPreview } from '../cmps/UserPreview.jsx'
import { bookService } from '../services/bookService.js'
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "../pages/BookDetails.jsx"

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    // const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
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

    if (!books) return <div>Loading...</div>
    return (
        <section className="car-index">
            {!selectedBookId &&
                <React.Fragment>
                    <h1>Welcome to book index!</h1>
                    {/* <CarFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
                    <BookList books={books} onSelectedBookId={onSelectedBookId} />
                </React.Fragment>
            }
            {selectedBookId && <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />}
        </section>
    )
}
