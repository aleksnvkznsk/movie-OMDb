import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './home/Home';
import Movie from './movie/Movie';
import Featured from './featured/Featured';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/featured" element={<Featured />} />
      </Routes>
    </Router>
  )
}

export default App