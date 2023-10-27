import Incidente from "../components/Incidente";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../ContexProvider";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { ContainerCenter, ContainerTop } from "../components/elements";
import hexToRgba from "hex-to-rgba";

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
    const objetCurrentUser = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(objetCurrentUser);
    const textIfNull = currentUser.roll === "representante" ? "Usted no tiene incidencias reportadas, puebe agregando una" : "Usted no tiene incidencias asignadas"
    let datosFiltrados;


    useEffect(() => {
        if (!state.fetchComplete) {
            if (currentUser.roll !== "admin") {
                fetch(`https://ssttapi.mibbraun.pe/incidencias/${currentUser.roll}/${currentUser.id}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Hubo un problema con la petición Fetch: ' + response.status);
                        }

                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
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
            } else {
                fetch(`https://ssttapi.mibbraun.pe/incidencias`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Hubo un problema con la petición Fetch: ' + response.status);
                        }

                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
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

        }
    }, [state, setState, currentUser]);



    const datos = state.datos;
    if (!datos) {
        return (<ContainerCenter>
            <p>Cargando datos...</p>;
        </ContainerCenter>)
    }

    const datosInvertidos = [...datos].reverse().filter(fila => fila.institucion.toLowerCase().includes(searchTerm.toLowerCase()));

    if (currentUser.roll === "representante") {
        datosFiltrados = [...datosInvertidos].filter(fila => currentUser.id === fila.reporter_id)

    }
    else if (currentUser.roll === "tecnico") {
        datosFiltrados = [...datosInvertidos].filter(fila => {
            if (fila.responsable_id) {
                return currentUser.id === fila.responsable_id;
            }
            return false; // Si fila.RESPONSABLE es nulo, excluimos esta fila
        });

    }
    else {
        datosFiltrados = [...datosInvertidos]
    }
    // const datosFiltrados = [...datosInvertidos]
    const handleSwitch = (e) => {
        navigate("/add")
    }

    return (
        datos.length > 0 ? (
            <ContainerTop>
                <ContainerIncidencias >
                    <input
                        type="text"
                        placeholder="Buscar por institución..."
                        onChange={event => setSearchTerm(event.target.value)}
                        style={{
                            padding: "0 1rem",
                            height: "3.5rem",
                            width: "100%",
                            fontSize: "16px",
                            borderRadius: ".4rem",
                            border: "none",
                            boxSizing: "border-box",
                            backgroundColor:hexToRgba("#0000FF",0.1)
                        }} />
                    {
                        datosFiltrados.map((fila, i) => {
                            return (
                                <Incidente key={i}
                                    data={fila}
                                    currentUser={currentUser}
                                />
                            )
                        })
                    }
                    
                    {
                        currentUser.roll !== "tecnico" && (
                            <FloatingButton style={{ scale: "1.5" }} onClick={handleSwitch}>+</FloatingButton>
                        )
                    }
                </ContainerIncidencias>
            </ContainerTop>
        ) : <Container sx={{ backgroundColor: "#58178355", textAlign: "center", borderColor: "#44086b", borderRadius: ".3rem", margin: "1rem" }}>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>{textIfNull} </p>
        </Container>

    )

}

export default HomeI