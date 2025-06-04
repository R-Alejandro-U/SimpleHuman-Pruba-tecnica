import type React from "react";
import { useContext, useEffect, useState } from "react";
import type { CandidateFormState, Errors } from "../Compenents/Home/Interfaces/HomeForm.interface";
import { handleImputChange } from "../Compenents/Home/utils/handleInputChange";
import { FormCandidate } from "../Compenents/Home/Form.compenent";
import Swal from "sweetalert2";
import { handleOnSubmit } from "../Compenents/Home/utils/handleOnSubmit";
import { CandidateContext } from "../Context/Candidate.context";
import { validate } from "../Compenents/Home/utils/validate";

export const Home: React.FC = () => {
    const [candidate, setCandidate] = useState<CandidateFormState>({
        carrera_cursada: "",
        correo_electronico: "",
        experiencia_laboral: "",
        habilidades: "",
        institucion_educativa: "",
        nombre_completo: "",
        promedio_academico: undefined
    });
    const [Errors, setErrors] = useState<Errors | undefined>({
        carrera_cursada: "",
        correo_electronico: "",
        experiencia_laboral: "",
        habilidades: "",
        institucion_educativa: "",
        nombre_completo: "",
        promedio_academico: ""
    });
    const { newCandidate } = useContext(CandidateContext);
    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImputChange(e, setCandidate);
    };
    useEffect(() => {setErrors(validate(candidate))}, [candidate])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) : Promise<void> => {
    try {
        e.preventDefault();
        if (!candidate.nombre_completo) {
      setErrors({ ...Errors, nombre_completo: 'No puede estar vacío el nombre.' });
        }
        if (!candidate.correo_electronico) {
        setErrors({ ...Errors, correo_electronico: 'No puede estar vacío el correo electrónico.' });
        }
        if (!candidate.institucion_educativa) {
        setErrors({ ...Errors, institucion_educativa: 'No puede estar vacía la institución educativa.' });
        }
        if (!candidate.carrera_cursada) {
        setErrors({ ...Errors, carrera_cursada: 'No puede estar vacía la carrera.' });
        }
        if (candidate.promedio_academico === null) {
        setErrors({ ...Errors, promedio_academico: 'No puede estar vacío el promedio académico.' });
        }
        if (candidate.habilidades && !candidate.habilidades.length) {
        setErrors({ ...Errors, habilidades: 'No puede estar vacía la lista de habilidades.' });
        }
        if (candidate.experiencia_laboral && !candidate.experiencia_laboral.length) {
        setErrors({ ...Errors, experiencia_laboral: 'No puede estar vacía la experiencia laboral.' });
        }
        if(Errors && Object.keys(Errors).length) {
            Swal.fire({
            title: `Por favor, llene el formularío.`,
            width: 600,
            padding: "3em",
            color: "#fff",
            background: `url("https://media.vandal.net/i/1280x720/9-2020/20209911271965_1.jpg.webp") no-repeat center center`, 
            });
            return;
        };
        await handleOnSubmit(e, {...candidate, promedio_academico: Number(candidate.promedio_academico)}, newCandidate);
        setCandidate({
            carrera_cursada: "",
            correo_electronico: "",
            experiencia_laboral: "",
            habilidades: "",
            institucion_educativa: "",
            nombre_completo: "",
            promedio_academico: undefined
        })
    } catch (error) {
      console.error(error); 
    }
    };
    return (
        <FormCandidate data={candidate} change={change} submit={handleSubmit} errors={Errors}/>
    )
}