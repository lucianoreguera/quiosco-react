import useQuiosco from "../hooks/useQuiosco"

const Categoria = ({ categoria }) => {
  const { handleClickCategoria, categoriaActual } = useQuiosco()
  const { icono, nombre, id } = categoria
  
  return (
    <div className={`${ categoriaActual.id === id ? 'bg-amber-400' : 'bg-white' } flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
      <img 
        src={`/img/icono_${icono}.svg`} 
        alt="Imagen Icono" 
        className="w-12"
      />

      <button 
        className="text-lg font-bold cursor-pointer truncate"
        type="button"
        onClick={() => handleClickCategoria(id)}
      >{ nombre }</button>
    </div>
  )
}

export default Categoria