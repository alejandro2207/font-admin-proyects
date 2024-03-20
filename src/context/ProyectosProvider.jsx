import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";


const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({})

    const navigate = useNavigate();

    useEffect(() => {

        const obtenerProyectos = async() => {
        try{
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await clienteAxios("/proyectos", config);
        setProyectos(data.proyectos)
        }catch(error){
            console.log(error)
        }

        }
        obtenerProyectos()
    }, [])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() =>{
            setAlerta({ })
        }, 4000)
    }

    const submitProyecto = async(proyecto) => {
        const token = localStorage.getItem("token");
        if (!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try{
            const {data} = await clienteAxios.post("/proyectos", proyecto, config);
            console.log(data)
            setProyectos([...proyectos, data.proyectoAlmacenado])
            setAlerta({
                msg: 'Proyecto creado con èxito',
                error: false
            });

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos')
            }, 3000)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto
            }}>
                {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext