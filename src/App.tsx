import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import NotFoundPage from './pages/error/NotFoundPage';

function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<><section><h1>home</h1></section></>} />
          <Route path="/search" element={<><section><h1>search</h1></section></>} />
          <Route path="/settings" element={<><section><h1>setting</h1></section></>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  </BrowserRouter>  
  );
}

export default App;
