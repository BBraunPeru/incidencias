import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, Modal, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Colors } from "../colors";
import hexToRgba from "hex-to-rgba";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const Container = styled.div`
    width: 100%;
    border:.1rem solid ${({ bgcolor }) => bgcolor};
    background-color: ${({ bgcolor }) => hexToRgba(bgcolor, .3)};
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

const Incidente = ({ data, currentUser }) => {
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
    const cabeceras = ["Servicio", "Tipo", "Descripción", "Reporter", "Contacto", "Celular", "Email", "Fecha_Reporte", "Responsable", "Fecha_Revision", "Estado_Final", "Estado"]
    const handleShowDetail = () => {
        setShowDetalle(!showDetalle);
    }

    const handleChangeState = (e) =>{
        setModalOpen(true)
    }

    const bgColorMap = {
        "ATENDIDO": Colors.atendido,
        "POR ASIGNAR": Colors.porasignar,
        "PENDIENTE": Colors.pendiente,
        "ASIGNADO": Colors.asignado,
        "CANCELADO": Colors.cancelado
    };

    const bgColor = bgColorMap[data.estado] || "#7c29ca";

    if (currentUser.roll === "representante") {
        datos[3] = ""
    }
    if (currentUser.roll === "tecnico") {
        datos[8] = ""
        datos[datos.length - 1] = ""
    }

    const handleConfirm = () => {
        setModalOpen(false);
        console.log("cambiando de stado")
      };

    return (
        <Container bgcolor={bgColor}>
            <div style={{ width: "100%", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
                <Title>{data.institucion}</Title>
                <IconButton onClick={handleShowDetail} color="primary" sx={{ backgroundColor: hexToRgba("#0000FF", 0.2) }}>
                    {showDetalle ? <ArrowUpwardIcon style={{ scale: "1.3" }} /> : <ArrowDownwardIcon style={{ scale: "1.3" }} />}
                </IconButton>
            </div>
            {showDetalle && (
                datos.map((dato, index) => {
                    if (dato !== null && dato !== "") {
                        return (
                            <DetalleContainer key={index}>
                                <DetalleTitle>{cabeceras[index]}:</DetalleTitle>
                                <Detalle>{dato}</Detalle>
                                {index === 5 && (
                                    <>
                                        <IconButton color="primary" href={`tel:${dato}`}>
                                            <PhoneIcon style={{ scale: "1.3" }} />
                                        </IconButton>
                                        <IconButton color="primary" href={`https://wa.me/${dato}`}>
                                            <WhatsAppIcon style={{ scale: "1.3" }} />
                                        </IconButton>
                                    </>
                                )}
                            </DetalleContainer>
                        );
                    }
                    return null;
                })
            )}
            <FormControl component="fieldset">
                <FormLabel component="legend"><DetalleTitle style={{ color: "black" }}>Estado:</DetalleTitle></FormLabel>
                <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="top"
                    onChange={handleChangeState}
                    sx={{ display: "flex", justifyContent: "space-between" }}>
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


                </RadioGroup>
            </FormControl>
            <Modal open={isModalOpen} style={modalStyle}>
                <Box sx={{ backgroundColor: 'white', padding: '1rem', borderRadius: '8px' }}>
                    <p>¿Desea cambiar el estado?</p>
                    <Button color="primary" onClick={() => setModalOpen(false)}>Cancelar</Button>
                    <Button color="error" onClick={handleConfirm}>Confirmar</Button>
                </Box>
            </Modal>
        </Container>
    );
}

export default Incidente;
