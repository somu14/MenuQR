
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Menupage from './Pages/Menupage';
import Comments from './Pages/Comments';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/:id' element={<Menupage/>}/>
    <Route path='/:id/comments' element={<Comments/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
