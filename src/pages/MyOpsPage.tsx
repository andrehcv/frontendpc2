import {useCallback, useEffect, useState} from "react";
import {getMine, runAction, getApiError} from "../api";
import type {Operation} from "../types";
import { ACTION_LABEL,ACTION_STATUS, MINE_TITLE, STATE_CODE, STATE_MSG } from "../config";
import { buttonClass, cardClass } from "../ui";
import Status from "../components/status";

export default function MyOpsPage() {
    const [ops, setOps] = useState <Operation[] > ([]);
    const [loading, setLoading] = useState (true);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [busyId, setBusyId] = useState<number | null > (null);

    const load = useCallback(() => {
        setLoading(true)
        setError("");
        getMine()
        .then(setOps)
        .catch((err)) => {
            setOps ([]);
            setError(getApiError(err).message);
        }
        .finally(() => setLoading(false));
    }; [];
    useEffect(load, [load]);

const handleAction = async (op: Operation) => {
    if (!window.confirm (`¿Confirmas ${ACTION_LABEL.toLowerCase()} la operacion #4{op.id}?`|| return;
    setNotice("");
    setBusyId(op.id);
    try {
        await runAction(op.id);
        setNotice (`Operacion #$ {op.id} actualizada correctamente.`);
    } catch (err) {
        const {code, message} = getApiError(err);
        setNotice(code === STATE_CODE ? STATE_MSG: message);
    } finally {
        setBusyId(null);
        load();
    }
};

return (
    <section>
        <h1 className = "mb-4 text-2xl font-bold"> {MINE_TITLE}  </h1>
        {notice && <p className = "mb-4 rounded bg-blue-100 p-3 text-blue-800"> {notice} </p>}
        <Status loading = {loading} error = {error} empty = {ops.length === 0}
        emptyText = "Aun no tienes préstamos." onRetry={load}/>
        {!loading &&  !error && (<ul className = "space-y-3"> {ops.map((op) => (<li key={op.id}className = {`${cardClass} flex items-
        center justify-betweeen`}>
            <div>
                <p className = "font-semibold">
                    #{op.id} / {op.book title}

                </p>
                <p> Días: {op.days} </p>
                <p> Devolver hasta: {op.dueDate} </p>
                <p> Estado: {op.status} </p>
            </div>
            {op.status === ACTION_STATUS && (<button className = {buttonClass} disabled = {busyId === op.id}
            onClick = {() => handleAction(op)} > 
            {busyId === op.id ? "Procesando...": ACTION_LABEL}
            </button>
            )}
            </li>
        ))}

        </ul>
        )}
    </section>
);
