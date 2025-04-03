import { BrowserRouter, useRoutes } from 'react-router-dom'
import './App.scss'
import Dishes from './pages/Dishes'
import Dish from './pages/Dish'


const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Dishes />},
    {path: '/dish/:id', element: <Dish />},
    {path: '/*', element: <Dishes />}
  ])

  return routes
}

function App() {

  return (
    <BrowserRouter>
    <AppRoutes>
      <div className="app">
        <Dishes />
      </div>
    </AppRoutes>
    </BrowserRouter>
  )
}

export default App
