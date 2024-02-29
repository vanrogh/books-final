// App.js
import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

// layouts
import RootLayout from './layouts/RootLayout';

// components
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';
import Favorites from './components/Favorites/Favorites';
import NotFound from './components/NotFound/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<BookList />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/favorites" element={<Favorites />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
