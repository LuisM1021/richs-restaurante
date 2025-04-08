import { BrowserRouter, useRoutes } from 'react-router-dom'
import './App.scss'
import Dishes from './pages/Dishes'
import Dish from './pages/Dish'
import Orders from './pages/Orders'
import CreateDish from './pages/CreateDish'


const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Dishes />},
    {path: '/dish/:id', element: <Dish />},
    {path: '/dish/create', element: <CreateDish />},
    {path: '/orders', element: <Orders />},
    {path: '/*', element: <Dishes />}
  ])

  return routes
}

function App() {

  return (
    <BrowserRouter>
    <AppRoutes>
      <div className="app">
      </div>
    </AppRoutes>
    </BrowserRouter>
  )
}

export default App
