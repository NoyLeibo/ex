const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSetFilterBy(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log(target.type);

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    const { txt} = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSetFilterBy} >
                <label htmlFor="txt">Book Filter: </label> {/* To fix */}
                <input value={txt} onChange={handleChange} type="text" id="txt" name="txt" />
                <button>Submit</button>
            </form>
        </section>
    )
}