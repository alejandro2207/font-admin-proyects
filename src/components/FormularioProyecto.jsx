import { useState } from "react";
import Alerta from "./Alerta";
import useProyectos from "../hooks/useProyectos";


const FormularioProyecto = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [cliente, setCliente] = useState("");
    
    const { mostrarAlerta, alerta, submitProyecto } = useProyectos();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            mostrarAlerta({
              msg: "Todos los campos son requeridos",
              error: true,
            });
            return
        }

        // Aqui vamos a pasar los datos del formulario al provider
        await submitProyecto({nombre, descripcion, fechaEntrega, cliente})
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('')
    }

    const {msg} = alerta;

  return (
      <form
        onSubmit={handleSubmit}
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
      >
        {msg && <Alerta alerta={alerta}/>}
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            Nombre Proyecto
          </label>
          <input
            id="nombre"
            type="text"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
            placeholder="Nombre del proyecto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="descripcion"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
            placeholder="Descripción del proyecto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="fechaEntrega"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            Fecha de Entrega
          </label>
          <input
            id="fechaEntrega"
            type="date"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="cliente"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            Cliente
          </label>
          <input
            id="cliente"
            type="text"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
            placeholder="Cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </div>
        <div className="mt-10">
          <input
            type="submit"
            value="Crear Proyecto"
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </div>
      </form>
  );
}

export default FormularioProyecto
