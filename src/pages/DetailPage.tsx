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
}