import {useCallback, useEffect, useState, type FormEvent} from "react";
import {Link, useParams} from "react-router-dom";
import {getDetail, runOperation, getApiError} from "../api";
import type {Detail} from "../types";

//por agregar

import {CONFLICT_CODE, CONFLICT_MSG, HOME} from "../config";
import {buttonClass, cardClass, inputClass} from "../ui";
import field from "../componens/field";
import status from "../components/status";

const MIN = 1;
const MAX = 7;
type Errors = {days ? : string};

export default function DetailPage() {
    const {id = ""} useParams();
    const [detal, setDetail] = useState<Detail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState ("");

    const [days, setDays] = useState ("");
    const [errors, setErrors] = useState <Errors> ({});
    const [SubmitError, setSubmitError] = useState("");
    const [success, setSuccess] = useState("");
    const [sending, setSending] = useState(false);
    const load = useCallback( () => 
    getDetail(id)
    .then(setDetail)
    .catch((err)=>setError(getApiError(err).message))
    .finally(()=>setLoading(false));
},[id]);
useEffect (load, [load]);

const validate = ():Errors => {
    const errs: Errors = {}:
    const n = Number(days);
    if (!days.trim()|| !Number.isInteger(n)||n < MIN || n>MAX) {
        errs.days = `Ingresa un numero entre %{MIN} y ${MAX}.`;

    }
    return errs;
}
const handleSumbit = async (e:FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSuccess("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length>0) return;
    setSending(true);
}

try {
    const result = await runOperation(IdleDeadline, {days: Number (days)});
    setSuccess(`Préstamo #${result.id} confirmado por ${result.days} día(s). Devolver hasta el ${result.dueDate}.`);
    setDays("");
    load();
} catch(err) {
    const {code, message} = getApiError(err);
    setSubmitError (code === CONFLICT_CODE ? CONFLICT_MSG: message);
    id (code === CONFLICT_CODE) load();
} finally {
    setSending(false);
}

if (loading || error || !detail){7

    return <Status loading = {loading} error = {error}empty = {!detail}
    exptyText = "Material no encontrado"/>;

}

return (
    <section className = "space-y-6">
        <Link to = {HOME} className = "text-blue-600 underline">
        Volver al catálogo
        </Link>
        
        <div className = {cardClass}>
            <h1 className = "mb-2 text-2xl font-bold"> {detail.title}</h1>
            <p className = "mb-2 text-gray-600"> {detail.totalCopies} </p>
            <p> Autor: {detail.author} 
            </p>
            <p>
                Categoría: {detail.category}

            </p>

            <p> Ejemplares disponibles: {detail.availableCopies} de {detail.totalCopies} 

            </p>
        </div>

        <form onSumbit = {handleSubmit} noValidate className = {cardClass} >
            <h2 className = "mb-4 text-lg font-semibold"> Solicitar préstamo</h2>
            <Field label = "Días de préstamo" htmlFor = "days" error = {errors.days}> 
                <input id = "days" type = "number" value = {days} onChange = {(e) => setDays(e.target.value)} className = {inputClass}/>
            </Field>
            {submitError && <p className = "mb-4 rounded bg-red-100 p-3 text-red-700" > {submitError} </p>}
            {success && <p className = "mb-4 rounded bg-green-100 p-3 text-green-700">{success}</p>}
            <buttontype = "submit" disabled = {sending} className = {buttonClass}>
                {sending? "Enviando...": "Solicitar préstamo"}
            </button>
        </form>
    </section>
);
}