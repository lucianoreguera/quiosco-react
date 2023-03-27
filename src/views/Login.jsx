import { Link } from "react-router-dom"

const Login = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Iniciar Sesión</h1>
      <p>Para crear un pedido, debes iniciar sesión</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              classemail="text-slate-800"
            >Email:</label>
            <input 
              type="text"
              name="email"
              id="email"
              className="mt-2 w-full p-3 bg-gray-50"
              placeholder="Tu Email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="text-slate-800"
            >Password:</label>
            <input 
              type="password"
              name="password"
              id="password"
              className="mt-2 w-full p-3 bg-gray-50"
              placeholder="Tu Password"
            />
          </div>
          
          <input 
            type="submit" 
            value="Iniciar Sesión" 
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          />
        </form>
      </div>

      <nav className="mt-5">
        <Link to="/auth/registro">¿No tienes cuenta? Crea una</Link>
      </nav>
    </>
  )
}

export default Login