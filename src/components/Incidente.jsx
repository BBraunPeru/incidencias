import { IconButton } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Colors } from "../colors";
import hexToRgba from "hex-to-rgba";

const Container = styled.div`
    width: 100%;
    border:.1rem solid ${({ bgcolor }) => bgcolor};
    background-color: ${({ bgcolor }) => hexToRgba(bgcolor,.3) };
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
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 0rem;
`;

const Detalle = styled.p`
    font-size: 16px;
    text-align: left;
`;

const DetalleContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: left;
    align-items: center;
`;

const DetalleTitle = styled.p`
    font-size: 18px;
    font-weight: bold;
`;

const Incidente = ({
    institucion,
    servicio,
    tipo,
    detalle,
    reprecentante,
    contacto,
    celular,
    correo,
    fechaReporte,
    fechaRevision,
    responsable,
    turno,
    estadoFinal,
    estadoAtencion,
    cabeceras }) => {
    const datos = [
        servicio,
        tipo,
        detalle,
        reprecentante,
        contacto,
        celular,
        correo,
        fechaReporte,
        fechaRevision,
        responsable,
        turno,
        estadoFinal,
        estadoAtencion];
    const [showDetalle, setShowDetalle] = useState(false);

    const handleShowDetail = () => {
        setShowDetalle(!showDetalle);
    }

    const bgColorMap = {
        "ATENDIDO": Colors.atendido,
        "POR ASIGNAR": Colors.porasignar,
        "PENDIENTE": Colors.pendiente,
        "ASIGNADO": Colors.asignado,
        "CANCELADO":Colors.cancelado
    };

    const bgColor = bgColorMap[estadoAtencion] || "#7c29ca";

    return (
        <Container bgcolor={bgColor}>
            <Title onClick={handleShowDetail}>{institucion}</Title>
            {showDetalle && (
                datos.map((dato, index) => {
                    if (dato !== null) {
                        return (
                            <DetalleContainer key={index}>
                                <DetalleTitle>{cabeceras[index+1]}:</DetalleTitle>
                                <Detalle>{dato}</Detalle>
                                {index === 5 && (
                                    <>
                                        <IconButton color="primary" href={`tel:${dato}`}>
                                            <PhoneIcon  style={{scale:"1.3"}}/>
                                        </IconButton>
                                        <IconButton color="primary" href={`https://wa.me/${dato}`}>
                                            <WhatsAppIcon style={{scale:"1.3"}}/>
                                        </IconButton>
                                    </>
                                )}
                            </DetalleContainer>
                        );
                    }
                    return null;
                })
            )}
        </Container>
    );
}

export default Incidente;
