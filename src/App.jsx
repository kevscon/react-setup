import ShapeSearch from './components/ShapeSearch'
import ShapeFilter from './components/ShapeFilter'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css';

const App = () => {
  return (
    <div className="page-container">
      <ShapeSearch />
      {/* {<ShapeFilter/>} */}
    </div>
    // <Router>
    //   <nav>
    //     <ul>
    //       <li><Link to="/">Search</Link></li>
    //       <li><Link to="/filter">Filter</Link></li>
    //     </ul>
    //   </nav>
    //   <Routes>
    //     <Route path="/" element={<ShapeSearch />} />
    //     <Route path="/filter" element={<ShapeFilter />} />
    //   </Routes>
    // </Router>
  );
};

export default App;