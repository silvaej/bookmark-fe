import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Homepage from './pages/Homepage'
import configureStore from './redux/configureStore'
import { Provider as ReduxProvider } from 'react-redux'
import Signup from './pages/Signup'

const store = configureStore({})

function App() {
    return (
        <ReduxProvider store={store}>
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Signup />} />
                </Routes>
            </Router>
        </ReduxProvider>
    )
}

export default App
