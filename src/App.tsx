import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import NotFoundPage from './pages/error/NotFoundPage';
import NewsFeed from './pages/newsfeed/NewsFeed';
import Setting from './pages/setting/Setting';

function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NewsFeed />} />
          <Route path="/search" element={<><section><h1>search</h1></section></>} />
          <Route path="/settings" element={<Setting />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  </BrowserRouter>  
  );
}

export default App;
