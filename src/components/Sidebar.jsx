import { categorias } from '../data/categorias'
import Categoria from './Categoria'

const Sidebar = () => {
  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img 
          className="w-40"
          src="../img/logo.svg" 
          alt="logo" 
        />
      </div>

      <div className="mt-10">
        {
          categorias.map(categoria => (
            <Categoria  categoria={categoria} />
          ))
        }
      </div>
    </aside>
  )
}

export default Sidebar