import { Link } from "react-router-dom";

const PreviewProyecto = ({ proyecto }) => {
  const { nombre, _id, cliente } = proyecto;
  return (
    <div className="border-b p-5 flex">
      <p className="flex-1 ">
        {nombre}
        <span className="text-gray-400 text-sm uppercase">{' '} {cliente}</span>
        </p>
      <Link
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold" 
        to={`${_id}`}>Ver Proyecto</Link>
    </div>
  );
};

export default PreviewProyecto;
