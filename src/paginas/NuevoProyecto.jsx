import FormularioProyecto from "../components/FormularioProyecto";

FormularioProyecto

const NuevoProyecto = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Nuevo Proyecto</h1>
      <div className="mt-10 felx justify-center">
        <FormularioProyecto/>
        
      </div>
    </>
  );
}

export default NuevoProyecto
