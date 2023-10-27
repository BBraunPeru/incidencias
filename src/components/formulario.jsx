import { ColorBorderTextField, DropdownFilter, SpinnerOverlay } from "./elements"
import { InputForm } from "./views"
import { useAppContext } from "../ContexProvider"
import { TailSpin } from "react-loader-spinner"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Button } from "@mui/material"

const FormContainer = styled.div`
  position: relative;
`;


const Formulario = ({ setShowForm, setExito }) => {

    const [instituciones, setInstituciones] = useState(null)
    const [servicios, setServicios] = useState(null)
    const [usuarios, setUsuarios] = useState(null)
    const [tipos, setTipos] = useState(null)
    const [dataLoaded, setDataLoaded] = useState(false); // Nuevo estado para controlar la carga de datos
    // eslint-disable-next-line
    const [state, setState] = useAppContext()
    const [loading, setLoading] = useState(false);
    const [showReporter, setShowReporter] = useState(false);
    const [Reporters, setReporters] = useState(null);
    const objetCurrentUser = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(objetCurrentUser);
    console.log(currentUser)

    useEffect(() => {

        // Realiza las solicitudes de datos una vez cuando el componente se monta
        Promise.all([
            fetch("https://ssttapi.mibbraun.pe/usuarios").then((response) => response.json()),
            fetch("https://ssttapi.mibbraun.pe/instituciones").then((response) => response.json()),
            fetch("https://ssttapi.mibbraun.pe/servicios").then((response) => response.json()),
            fetch("https://ssttapi.mibbraun.pe/tipos").then((response) => response.json())
        ])
            .then(([usersData, institucionesData, serviciosData, tiposData]) => {
                setUsuarios(usersData);
                setInstituciones(institucionesData);
                setServicios(serviciosData);
                setTipos(tiposData);
                setDataLoaded(true);
                // setReporters(usuarios.filter((user) => user.roll === 'representante').map((rep) => rep.nombre + " " + rep.apellido))// Marca los datos como cargados
            })
            .catch((error) => console.error(error));
    }, []);

    const handleAddData = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch("https://ssttapi.mibbraun.pe/incidencias", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "institucion_id": state.institucion,
                "servicio_id": state.servicio,
                "tipo_id": state.tipo,
                "fall": state.fall,
                "reporter_id": currentUser.id,
                "contacto": state.contacto,
                "celular": state.celular,
                "email": state.email
            })
        })
            .then(resp => {
                if (resp.status === 200) {
                    setExito(true);
                } else {
                    setExito(false);
                }
                return resp.json()
            })
            .then(data => {
                setLoading(false);
                setShowForm(false);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setExito(false); // Puedes configurar esto según tus necesidades
            });

        console.log("agreganddo data")
    };



    return (
        (dataLoaded) ? (
            <FormContainer>
                <InputForm onSubmit={handleAddData}>
                    <DropdownFilter data={instituciones} llave="institucion" placeholder="Institución" required />
                    <DropdownFilter data={servicios} llave="servicio" placeholder="Servicio" required />
                    <DropdownFilter data={tipos} llave="tipo" placeholder="Tipo" required />
                    <ColorBorderTextField type="text" label="Detalle el Incidente" llave="fall" required />
                    {
                        showReporter && (
                            <DropdownFilter data={Reporters} llave="reporter" placeholder="Reprecentante" required />
                        )


                    }
                    <ColorBorderTextField type="text" label="Nombre de Contacto" llave="contacto" required />
                    <ColorBorderTextField type="tel" label="N° Celular de Contacto" llave="celular" pattern="[9][0-9]{8}" required />
                    <ColorBorderTextField type="email" label="E-mail de Contacto" llave="email" />
                    <Button type="submit" variant="contained" sx={{ marginTop: "1rem", padding: "1rem", fontWeight: "bold" }} >Agregar</Button>
                    {loading && (
                        <SpinnerOverlay>
                            <TailSpin
                                color="#007BFF"
                                height={50}
                                width={50}
                            />
                        </SpinnerOverlay>
                    )}
                </InputForm>
            </FormContainer>
        ) : <p>Cargando Datos ....</p>
    )
}

export default Formulario;