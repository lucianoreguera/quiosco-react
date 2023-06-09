import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import clienteAxios from '../config/axios'
import { categorias as categoriasDB } from '../data/categorias'

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState(categoriasDB)
  const [categoriaActual, setCategoriaActual] = useState({})
  const [modal, setModal] = useState(false)
  const [producto, setProducto] = useState({})
  const [pedido, setPedido] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
    setTotal(nuevoTotal)
  }, [pedido])

  useEffect(() => {
    obtenerCategorias()
  }, [])
  

  const obtenerCategorias = async () => {
    try {
      const { data } = await clienteAxios('/api/categorias')
      setCategorias(data.data)
      setCategoriaActual(data.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitPedidos = async logout => {
    const token = localStorage.getItem('AUTH_TOKEN')

    try {
      const { data } = await clienteAxios.post('/api/pedidos', {
        // Se envía al request del controlador de laravel
        total,
        productos: pedido.map(producto => (
          {
            id: producto.id,
            cantidad: producto.cantidad
          }
        ))
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      toast.success(data.message)

      setTimeout(() => {
        setPedido([])
      }, 1000);

      // Si queremos cerrar sesión después de cada pedido
      setTimeout(() => {
        localStorage.removeItem('AUTH_TOKEN') // Si queremos cerrar sesión despues de cada pedido
        logout() // Si queremos cerrar sesión despues de cada pedido
      }, 3000)

    } catch (error) {
      console.log(error)
    }
  }
  
  const handleClickCategoria = id => {
    const categoria = categorias.filter(categoria => categoria.id === id)[0]
    setCategoriaActual(categoria)
  }

  const handleClickModal = () => setModal(!modal)

  const handleSetProducto = producto => {
    setProducto(producto)
  }

  const handleAgregarProducto = ({ categoria_id, ...producto }) => {
    if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
      const productoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
      setPedido(productoActualizado)
      toast.success('Guardado Correctamente')
    } else {
      setPedido([...pedido, producto])
      toast.success('Agregado al Pedido')
    }
  }

  const handleEditarCantidad = id => {
    const productoActualizar = pedido.filter(producto => producto.id === id)[0]
    setProducto(productoActualizar)
    setModal(!modal)
  }

  const handleEliminarProductoPedido = id => {
    const pedidoActualizado = pedido.filter(producto => producto.id !== id)
    setPedido(pedidoActualizado)
  }

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        modal,
        handleClickModal,
        producto,
        handleSetProducto,
        pedido,
        handleAgregarProducto,
        handleEditarCantidad,
        handleEliminarProductoPedido,
        total,
        handleSubmitPedidos
      }}
    >{ children }</QuioscoContext.Provider>   
  )
}

export {
  QuioscoProvider
}

export default QuioscoContext