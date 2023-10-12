import { ColorBorderTextField, DropdownFilter} from "./elements"
import { InputForm } from "./views"
import { useAppContext } from "../ContexProvider"
import { TailSpin } from "react-loader-spinner"
import { useState } from "react"
import styled from "styled-components"
import Tipos from "../data/tipo.json"
import { Button } from "@mui/material"

const FormContainer = styled.div`
  position: relative;
`;

// Define un styled component para la capa de fondo semitransparente
const SpinnerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;


const Formulario = ({ setShowForm, setExito }) => {
    // eslint-disable-next-line
    const [state, setState] = useAppContext()
    const [loading, setLoading] = useState(false);

    const handleAddData = (e) => {
        e.preventDefault();
        setLoading(true);
        const fechaHoraActual = new Date().toLocaleString();

        fetch("https://api.steinhq.com/v1/storages/65241cfec5ad5604ce1ef385/Incidencias", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify([{
                "INSTITUCION": state.institucion,
                "SERVICIO": state.servicio,
                "TIPO": state.tipo,
                "FALL": state.fall,
                "REPORTER": state.reporter,
                "CONTACTO": state.contacto,
                "CELULAR": state.celular,
                "CORREO": state.email,
                "FECHA_REPORTE": fechaHoraActual,
                "FECHA_REVISION": "",
                "RESPONSABLE": "",
                "TURNO": "",
                "ESTADO_FINAL": "",
                "ATENCION": "POR ASIGNAR"
            }])
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
        <FormContainer>
            <InputForm onSubmit={handleAddData}>
                <ColorBorderTextField type="text" label="Institución" llave="institucion" required />
                <ColorBorderTextField type="text" label="Servicio" llave="servicio" required />
                <DropdownFilter data={Tipos} llave="tipo" placeholder="Tipo" />
                <ColorBorderTextField type="text" label="Detalle el Incidente" llave="fall" required />
                <ColorBorderTextField type="text" label="Nombre de Representante" llave="reporter" required />
                <ColorBorderTextField type="text" label="Nombre de Contacto" llave="contacto" required />
                <ColorBorderTextField type="tel" label="N° Celular de Contacto" llave="celular" pattern="[9][0-9]{8}" required />
                <ColorBorderTextField type="email" label="E-mail de Contacto" llave="email" />
                <Button type="submit" variant="contained" sx={{marginTop:"1rem",padding:"1rem", fontWeight:"bold"}} >Agregar</Button>
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
    )
}

export default Formulario;