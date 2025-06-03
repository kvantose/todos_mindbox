import './App.css'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Todo } from './components/Todo/Todo'
import 'primeicons/primeicons.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Todo />
      <Footer />
    </div>
  )
}

export default App
