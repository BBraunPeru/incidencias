import Incidente from "../components/Incidente";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../ContexProvider";
import { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import { ContainerCenter, ContainerTop } from "../components/views";
import { ContainerHeader, MyContainer } from "../components/views";
import { InputSearch } from "../components/elements";

const HomeI = () => {

    const navigate = useNavigate()

    const [state, setState] = useAppContext()
    const [searchTerm, setSearchTerm] = useState('');
    const objetCurrentUser = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(objetCurrentUser);
    const textIfNull = currentUser.roll === "representante" ? "Usted no tiene incidencias reportadas, puebe agregando una" : "Usted no tiene incidencias asignadas"
    const [responsables, setResponsables] = useState([])
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
                fetch("https://ssttapi.mibbraun.pe/usuarios")
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Hubo un problema con la petición Fetch: ' + response.status);
                        }

                        return response.json();
                    })
                    .then((data) => {
                        setResponsables(data)
                    })
                    .catch((error) => {
                        console.error(error);
                        alert(error); // Muestra un pop-up de error
                    });

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
    const handleSwitch = (e) => {
        navigate("/add")
    }

    return (
        datos.length > 0 ? (
            <ContainerTop>
                <ContainerHeader>
                    <InputSearch type="text"
                        placeholder="Buscar por institución..."
                        onChange={event => setSearchTerm(event.target.value)} />

                    {currentUser.roll !== "tecnico" && (
                        <Button variant="contained" style={{ flex: 1, height: "3rem" }} onClick={handleSwitch}>Add</Button>
                    )
                    }
                </ContainerHeader>
                <MyContainer >
                    {
                        datosFiltrados.map((fila, i) => {
                            return (
                                <Incidente key={i}
                                    data={fila}
                                    currentUser={currentUser}
                                    responsables={[...responsables].filter(resp => resp.roll === "tecnico")}
                                />
                            )
                        })
                    }
                </MyContainer>
            </ContainerTop>
        ) : <Container sx={{ backgroundColor: "#58178355", textAlign: "center", borderColor: "#44086b", borderRadius: ".3rem", margin: "1rem" }}>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>{textIfNull} </p>
        </Container>

    )

}

export default HomeI