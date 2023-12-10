import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"
const { useState } = React

export function App() {
    const [page, setPage] = useState('books')

    return (
        <section className="app">
            <header className="app-header">
                <h1>My App</h1>
                <nav className="app-nav">
                    <a onClick={() => setPage('home')} href="#">Home</a>
                    <a onClick={() => setPage('books')} href="#">Books</a>
                    <a onClick={() => setPage('about')} href="#">About</a>
                </nav>
            </header>
            <main className="container">
                {page === 'home' && <Home />}
                {page === 'books' && <BookIndex />}
                {page === 'about' && <About />}
            </main>
        </section>
    )
}