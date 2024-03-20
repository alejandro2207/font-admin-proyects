import {useState} from 'react'
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([nombre, email, password, confirmarPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return
    }

    if(password !== confirmarPassword){
      setAlerta({
        msg: 'Los passwords no coinciden',
        error: true
      });
      return
    }

    if(password.length < 6){
      setAlerta({
        msg: 'El password debe contener minimo 6 caracteres',
        error: true
      });
      return
    }
    setAlerta({})

    //Crear el usuario en la API
    try{
      const {data} = await clienteAxios.post(`/usuarios`, {nombre, email, password});
      setAlerta({
        msg: data.msg,
        error: false
      });

      setNombre('')
      setEmail('')
      setPassword('')
      setConfirmarPassword('')
    }catch(error){
      const {data} = error.response
        setAlerta({
          msg: data.msg,
          error: true,
        });
    }
  }

  const {msg} = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y crea tus propios{" "}
        <span className="text-slate-700">proyecos</span>
      </h1>

      {msg && <Alerta alerta={alerta}/>}

      <form 
        className="my-10 bg-white rounded-lg shadow p-10"
        onSubmit={handleSubmit}
        >
        <div className="my-5">
          <label
            className="uppercase text-gray-500 block text-xl font-bold"
            htmlFor="nombre"
          >
            Nombre Completo
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre completo"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-500 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-500 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-500 block text-xl font-bold"
            htmlFor="confirma-password"
          >
            Confirma tu password
          </label>
          <input
            id="confirma-password"
            type="password"
            placeholder="Confirma tu password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Crear cuenta"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-stale-500 uppercase text-sm"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link
          to="olvide-password"
          className="block text-center my-5 text-stale-500 uppercase text-sm"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
}

export default Registrar
