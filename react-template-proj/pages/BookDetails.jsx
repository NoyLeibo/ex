import { bookService } from "../services/bookService.js"
const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)
    const params = useParams()
    console.log(params);
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('err:', err)
                navigate('/')
            })
    }

    function onBack() {
        navigate('/books')
        // navigate(-1)
    }

    function getPageCount(){
        const pageCount = book.pageCount
        if (pageCount > 500) return ('Serious Reading')
        if (pageCount > 200) return ('Descent Reading')
        if (pageCount < 100) return ('Light Reading')
    }

    function getPublishedDate(){
        const publishedDate = 2023 - book.publishedDate
        if (publishedDate > 10) return ('Vintage')
        if (publishedDate === 1) return ('New')
        return ('')
    }

    function getColorStyle() {
        const bookAmount = book.listPrice.amount;
        if (bookAmount > 150) return {color: 'red'}
        else if (bookAmount < 20) return {color: 'green'}
        return {color: 'brown'}
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <img src={book.thumbnail} alt="" />
            <h1>Book Title: {book.title}</h1>
            <p>Page Count: {book.pageCount} {getPageCount()}</p>
            <p>Book Amount: <span style={getColorStyle()}>{book.listPrice.amount} {book.listPrice.currencyCode}</span></p>
            <h1>Book Authors: {book.authors}</h1>
            <h1>Book Subtitle: {book.subtitle}</h1>
            <p>Book Description: {book.description}</p>
            <p>Book Published Date: {book.publishedDate} {getPublishedDate()}</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}