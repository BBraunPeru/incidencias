import {TitleG,MyContainer } from "../components/views"
import Formulario from "../components/formulario"
import { useState } from "react"
import Exito from "../components/exito"
import Error from "../components/error"
import { Link } from "react-router-dom"


export function getCurrentDate(separator = '/') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`
}


const AddInc = () => {
    const [showForm, setShowForm] = useState(true)
    const [exito, setExito] = useState(true)


    return (
        <MyContainer>
            {showForm ? (
                <>
                    <Link to={"/home"} style={{ textDecoration: "none" }}><TitleG>Incidencias BBRAUN</TitleG></Link>
                    <Formulario
                        setShowForm={setShowForm}
                        setExito={setExito} />
                </>
            ) : (
                exito ? (
                    <Exito
                        setShowForm={setShowForm} />
                ) : (
                    <Error
                        setShowForm={setShowForm}
                    />
                )
            )}
        </MyContainer>
    )
}


export default AddInc;