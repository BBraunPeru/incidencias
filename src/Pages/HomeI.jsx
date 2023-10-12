import Incidente from "../components/Incidente";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../ContexProvider";
import { useEffect, useState } from "react";

const FloatingButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    line-height: 50px;
    text-decoration: none;
    background-color: #550a88;
    transition: background-color 0.3s ease-in-out;
    z-index: 999;
    box-shadow: 0px 0px 5px 5px rgba(0,0,0,.3);
    
    &:hover {
        background-color: #7b18bd;
        cursor: pointer;
    }

    @media (min-width:500px){
        bottom: 50px;
        right: 60px;
    }
`;

const ContainerIncidencias = styled.div`
    width: 90%;
    padding-top: 2rem;
    @media (min-width:700px){
        max-width:700px;
    }

`
const HomeI = () => {

    const navigate = useNavigate()

    const [state, setState] = useAppContext()
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!state.fetchComplete) {
            fetch("https://api.steinhq.com/v1/storages/65241cfec5ad5604ce1ef385/Incidencias")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Hubo un problema con la petición Fetch: ' + response.status);
                    }
                    console.log(response)
                    return response.json();
                })
                .then((data) => {
                    setState({
                        ...state,
                        fetchComplete: true,
                        datos: data
                    });
                })
                .catch((error) => {
                    console.error(error);
                    alert(error); // Muestra un pop-up de error
                });
        }
    }, [state, setState]);

    const datos = state.datos;
    if (!datos) {
        return <p>Cargando datos...</p>;
    }

    const datosInvertidos = [...datos].reverse().filter(fila => fila.INSTITUCION.toLowerCase().includes(searchTerm.toLowerCase())); 
    const cabeceras = Object.keys(datos[0])
    const handleSwitch = (e) => {
        navigate("/add")
    }

    return (

        <ContainerIncidencias >
            <input 
            type="text" 
            placeholder="Buscar por institución..." 
            onChange={event => setSearchTerm(event.target.value)} 
            style={{
                padding:"0 1rem",
                height:"3.5rem",
                width:"100%",
                fontSize:"16px",
                borderRadius:".4rem",
                border:"none",
                boxSizing:"border-box"}} />
            {
                datosInvertidos.map((fila, i) => {
                    return (
                        <Incidente key={i}
                            institucion={fila.INSTITUCION}
                            servicio={fila.SERVICIO}
                            tipo={fila.TIPO}
                            detalle={fila.FALL}
                            reprecentante={fila.REPORTER}
                            contacto={fila.CONTACTO}
                            celular={fila.CELULAR}
                            correo={fila.CORREO}
                            fechaReporte={fila.FECHA_REPORTE}
                            fechaRevision={fila.FECHA_REVISION}
                            responsable={fila.RESPONSABLE}
                            turno={fila.TURNO}
                            estadoFinal={fila.ESTADO_FINAL}
                            estadoAtencion={fila.ATENCION}
                            cabeceras={cabeceras}
                        />
                    )
                })
            }

            <FloatingButton style={{ scale: "1.5" }} onClick={handleSwitch}>+</FloatingButton>
        </ContainerIncidencias>
    )

}

export default HomeI