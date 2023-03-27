import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Resumen from '../components/Resumen'

const Layout = () => {
  return (
    <div className='md:flex'>
      <Sidebar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Resumen />
    </div>
  )
}

export default Layout