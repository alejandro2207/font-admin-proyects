import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(email === ''){
      setAlerta({
        msg: 'El email es obligatorio',
        error: true
      });
      return
    }
    setAlerta({})

    // Eviar correo con instrucciones para cambio de contraseña
    try{
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`,{ email });
      
      setAlerta({
        msg: data.msg,
        error: false
      });
    }catch(error){
      const {data} = error.response
      setAlerta({
        msg: data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera tu acceso y no pierdas tu {' '}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta}/>}
      <form 
        onSubmit={handleSubmit}
        className="my-10 bg-white rounded-lg shadow p-10">
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
            onChange={ e => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Enviar instrucciones"
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
          to="registrar"
          className="block text-center my-5 text-stale-500 uppercase text-sm"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
      </nav>
    </>
  );
}

export default OlvidePassword
