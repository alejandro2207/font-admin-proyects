import {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';


const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState('')
  const [usuarioConfirmado, setUsuarioConfirmado] = useState(false)
  const params = useParams();
  const {id} = params;

  useEffect(() => {
    const confitmarCuenta = async() => {
      try{
        const url = `/usuarios/confirmar/${id}`;
        const {data} = await clienteAxios(url);

        setAlerta({
          msg: data.msg,
          error: false
        });
      setUsuarioConfirmado(true)
      }catch(error){
        const { data } = error.response;
        setAlerta({
          msg: data.msg,
          error: true
        })
      }
    }
    confitmarCuenta();
  }, []);

  const {msg} = alerta


  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y comienza a crear tus proyectos{" "}
        <span className="text-slate-700">proyecos</span>
      </h1>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta alerta={alerta} />}
        {usuarioConfirmado && (
          <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
            Inicia sesión
          </Link>
        )}
      </div>
    </>
  );
}

export default ConfirmarCuenta
