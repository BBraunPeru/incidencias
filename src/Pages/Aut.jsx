import React, { useState } from 'react';
import { Button, TextField, Typography, Avatar, Modal } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styled from 'styled-components';
import Users from "../data/users.json"
import { useAppContext } from '../ContexProvider';
import { useNavigate } from 'react-router-dom';


const ContainerLogin = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 90%;
    padding: 1rem;
    background-color: white;
    box-sizing: border-box;
    border-radius: .3rem;
    box-shadow: 0 0 5px 5px rgba(0,0,0,.1);
    @media (min-width:500px){
        width: 500px;
    }
`
const Aut = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const [state, setState] = useAppContext()

    const navigate = useNavigate()


    function autenticarUsuario(username, password) {
        // Simula la autenticación de usuario
        const usuario = Users.find((user) => user.username === username && user.password === password);
        if (usuario) {
            return { success: true, userId: usuario.id };
        } else {
            return { success: false, userId: null };
        }
    }

    const handleEmailChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        const result = autenticarUsuario(username, password);
        if (result.success) {
            // Autenticación exitosa, establece el "id" del usuario autenticado.
            setState({
                ...state,
                currentUserId:result.userId
            })

            console.log('Autenticación exitosa para el usuario con ID:', result.userId);
            navigate('/home')

        } else {
            // Autenticación fallida, muestra el mensaje de error en el popup.
            setErrorPopupOpen(true);
        }
    };

    const closeErrorPopup = () => {
        setErrorPopupOpen(false);
    };
    return (
        <ContainerLogin>
            <Avatar>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Iniciar sesión</Typography>
            <form>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Usuario"
                    name="username"
                    autoComplete="email"
                    value={username}
                    onChange={handleEmailChange}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button style={{ marginTop: "1rem", padding: ".7rem", fontWeight: "bold" }}
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                >
                    Iniciar sesión
                </Button>
            </form>

            <Modal open={errorPopupOpen} onClose={closeErrorPopup}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'white',
                    padding: '16px',
                    textAlign: 'center',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                }}>
                    <Typography variant="h6" color="error">Usuario o contraseña no válidos.</Typography>
                    <Button variant="contained" color="primary" onClick={closeErrorPopup}>Cerrar</Button>
                </div>
            </Modal>
        </ContainerLogin>
    );
};

export default Aut;
