import { CheckCircle } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../ContexProvider";


const Exito = ({ setShowForm }) => {
    const [state, setState] = useAppContext()
    const navigate = useNavigate()
    const handleHome = (event) => {
        setState({
            institucion: null,
            servicio: null,
            tipo: null,
            fall: "",
            reporter: null,
            contacto: "",
            celular: "",
            email: "",
        })
        setState({
            ...state,
            fetchComplete: false
          });
          
        navigate("/")
    }

    const handleRegister = (event) => {
        setState({
            institucion: state.institucion, // Mantén los valores actuales de "institucion"
            servicio: null,
            tipo: null,
            fall: "",
            reporter: null,
            contacto: "",
            celular: "",
            email: "",
        });

        setShowForm(true);
        navigate("/add")
    }
    return (

        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="h6" gutterBottom>
                Incidencia registrada con éxito
            </Typography>
            <CheckCircle color="primary" style={{ fontSize: 48 }} />
            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="primary" style={{ marginRight: '1rem' }} onClick={handleHome}>
                    Ver Registros
                </Button>
                <Button variant="contained" color="primary" style={{ marginLeft: '1rem' }} onClick={handleRegister}>
                    Registrar otra
                </Button>
            </Box>
        </Box>
    );
};

export default Exito;
