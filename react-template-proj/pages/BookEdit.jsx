import { bookService } from "../services/bookService.js"
const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React


export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    console.log('bookToEdit:', bookToEdit)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.bookId) {
            loadBook()
        }
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBookToEdit)
            .catch(err=>console.log('err:', err))
    }

    function handlePriceChange({target}){
        let value = +target.value 
        const listPrice = {...bookToEdit.listPrice , amount:value     }
        setBookToEdit(prevBook => ({ ...prevBook, listPrice}))

    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        console.log(bookToEdit);
        bookService.save(bookToEdit)
            .then(() => navigate('/books'))
            .catch(err => console.log('err:', err))
    }
    // const price = {listPrice:{
    //     amount: 0
    // }}
    const { title , description, subtitle } = bookToEdit
    {/* description, price, title, subtitle */}
    return (
        <section className="book-edit">
            <h1>Add Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">title: </label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />
                
                <label htmlFor="description">description: </label>
                <input onChange={handleChange} value={description} type="text" name="description" id="description" />
                
                <label htmlFor="subtitle">subtitle: </label>
                <input onChange={handleChange} value={subtitle} type="text" name="subtitle" id="subtitle" />

                <label htmlFor="Price">Price: </label>
                <input onChange={handlePriceChange} value={bookToEdit.listPrice.amount} type="number" name="price" id="price" />
                <button>Save</button>
            </form>
        </section>
    )
}