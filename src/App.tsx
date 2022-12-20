import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Homepage from './pages/Homepage'

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App
