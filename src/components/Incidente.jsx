import { Autocomplete, Box, Button, FormControl, FormControlLabel, IconButton, Modal, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Colors } from "../colors";
import hexToRgba from "hex-to-rgba";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';


const ContainerIcidencia = styled.div`
    width: 100%;
    border:.2rem solid ${({ bgcolor }) => bgcolor};
    background-color: ${({ bgcolor }) => hexToRgba(bgcolor, .5)};
    border-radius: .5rem;
    padding: 1rem;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, .1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
    box-sizing: border-box;
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 0rem;
    cursor: pointer;
`;

const Detalle = styled.p`
    font-size: 14px;
    text-align: left;
`;

const DetalleContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: left;
    align-items: center;
`;

const DetalleTitle = styled.p`
    font-size: 16px;
    font-weight: bold;
`;

const Incidente = ({ data, currentUser, responsables }) => {

    const tecnicos = [...responsables].map(item => ({ id: item.id, label: item.nombres + " " + item.apellidos }));
    console.log(tecnicos)
    const modalStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    let datos = [
        data.servicio,
        data.tipo,
        data.fall,
        data.reporter,
        data.contacto,
        data.celular,
        data.email,
        data.fecha_reporte,
        data.responsable,
        data.fecha_revision,
        data.estado_final,
        data.estado];

    const [showDetalle, setShowDetalle] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [estado, setEstado] = useState(data.estado);
    const [selectedResponsable, setSelectedResponsable] = useState(null);
    const [showResp, setShowResp] = useState(false)
    const [responsable, setResponsable] = useState(null)



    const cabeceras = ["Servicio", "Tipo", "Descripción", "Reporter", "Contacto", "Celular", "Email", "Fecha_Reporte", "Responsable", "Fecha_Revision", "Estado_Final", "Estado"]
    const handleShowDetail = () => {
        setShowDetalle(!showDetalle);
    }

    const handleChangeState = (e) => {
        if (currentUser.roll !== "admin") {
            if (estado !== "ATENDIDO") {
                setSelectedValue(e.target.value)
                setModalOpen(true)
            }
            else {
                alert("Una incidencia atendida ya no puede cambiar el estado, comuniquese con el administrador en casoo de error")
            }
        }
        else {
            setSelectedValue(e.target.value)
            setModalOpen(true)
        }
    }

    const bgColorMap = {
        "ATENDIDO": Colors.atendido,
        "POR ASIGNAR": Colors.porasignar,
        "PENDIENTE": Colors.pendiente,
        "ASIGNADO": Colors.asignado,
        "CANCELADO": Colors.cancelado
    };

    const bgColor = bgColorMap[estado] || "#7c29ca";

    if (currentUser.roll === "representante") {
        datos[3] = ""
    }
    if (currentUser.roll !== "representante") {
        datos[8] = ""
        datos[datos.length - 1] = ""
    }

    const updateState = (key, newState) => {
        console.log(`Actulizando incidencia con id ${data.id} a ${newState}`)
        const apiUrl = `https://ssttapi.mibbraun.pe/incidencias/${data.id}`; // Agrega el ID al final de la URL.

        const dataUdated = { [key]: newState };
        setEstado(newState)

        fetch(apiUrl, {
            method: 'PATCH', // O utiliza 'PATCH' si prefieres una actualización parcial.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataUdated),
        })
            .then((response) => {
                if (response.ok) {
                    // La solicitud se completó con éxito.
                    console.log(`Campo "estado" actualizado con éxito para el elemento con ID ${data.id}.`);
                    // Puedes realizar acciones adicionales aquí, si es necesario.
                } else {
                    // La solicitud no se completó con éxito. Puedes manejar errores aquí.
                    console.error(`Error al actualizar el campo "estado" para el elemento con ID ${data.id}.`);
                }
            })
            .catch((error) => {
                // Manejo de errores de red u otros errores.
                console.error('Error de red o solicitud Fetch:', error);
            });
    }
    const handleConfirm = () => {
        setModalOpen(false);
        updateState("estado", selectedValue)
    };

    const handleSelectResponsable = (e) => {
        console.log(data.id)
        setShowResp(true)

    }

    const AsignResp = ()=>{
        updateState("responsable_id",responsable.id)
    }

    return (
        <ContainerIcidencia bgcolor={bgColor}>
            <div style={{ width: "100%", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>

                {
                    currentUser.roll !== "admin" ? (
                        <>
                            <Title>{data.institucion}</Title>
                            <IconButton onClick={handleShowDetail} color="primary" sx={{ backgroundColor: hexToRgba("#0000FF", 0.2) }}>
                                {showDetalle ? <ArrowUpwardIcon style={{ scale: "1.3" }} /> : <ArrowDownwardIcon style={{ scale: "1.3" }} />}
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Title onClick={handleShowDetail}>{data.institucion}</Title>
                            <IconButton onClick={handleSelectResponsable} color="primary" sx={{ backgroundColor: hexToRgba("#0000FF", 0.2) }}>
                                <PersonIcon style={{ scale: "1.3" }} />
                            </IconButton>
                        </>
                    )
                }
            </div>
            {
                (showResp) && (
                    <div style={{display:"flex",gap:"1rem",width:"100%",justifyContent:"space-between"}}>
                        <Autocomplete
                        sx={{flex:6}}
                        options={tecnicos}
                        getOptionLabel={(option) => option.label}
                        value={selectedResponsable}
                        onChange={(_, newValue) => {
                            setSelectedResponsable(newValue);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Selecciona un nombre"
                                variant="outlined"
                            />
                        )}
                    />
                    <IconButton onClick={AsignResp} style={{flex:1}} >
                        <SaveIcon style={{ scale: "1.3" }} />
                    </IconButton>
                    </div>

                )
            }
            {showDetalle && (
                <>
                    {datos.map((dato, index) => {
                        if (dato !== null && dato !== "") {
                            return (
                                <DetalleContainer key={index}>
                                    <DetalleTitle>{cabeceras[index]}:</DetalleTitle>
                                    <Detalle>{dato}</Detalle>
                                    {index === 5 && (
                                        <>
                                            <IconButton color="primary" href={`tel:${dato}`}>
                                                <PhoneIcon style={{ transform: "scale(1.3)" }} />
                                            </IconButton>
                                            <IconButton color="primary" href={`https://wa.me/051${dato}`}>
                                                <WhatsAppIcon style={{ transform: "scale(1.3)" }} />
                                            </IconButton>
                                        </>
                                    )}
                                </DetalleContainer>
                            );
                        }
                        return null;
                    })}

                    {
                        currentUser.roll !== "representante" && (
                            <FormControl component="fieldset">
                                <DetalleTitle>Estado: </DetalleTitle>
                                <RadioGroup
                                    row
                                    aria-label="position"
                                    name="position"
                                    value={estado}
                                    onChange={handleChangeState}
                                    sx={{ display: "flex", justifyContent: "space-between" }}
                                >

                                    <FormControlLabel
                                        value="ATENDIDO"
                                        control={<Radio color="primary" />}
                                        label="Atendido"
                                        labelPlacement="top"
                                    />
                                    <FormControlLabel
                                        value="PENDIENTE"
                                        control={<Radio color="primary" />}
                                        label="Pendiente"
                                        labelPlacement="top"
                                    />
                                    <FormControlLabel
                                        value="CANCELADO"
                                        control={<Radio color="primary" />}
                                        label="Cancelado"
                                        labelPlacement="top"
                                    />

                                </RadioGroup>
                            </FormControl>
                        )
                    }
                </>
            )}

            <Modal open={isModalOpen} style={modalStyle}>
                <Box sx={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px' }}>
                    <p>¿Desea cambiar el estado?</p>
                    <Button color="primary" onClick={() => setModalOpen(false)}>Cancelar</Button>
                    <Button color="error" onClick={handleConfirm}>Confirmar</Button>
                </Box>
            </Modal>
        </ContainerIcidencia>
    );
}

export default Incidente;
