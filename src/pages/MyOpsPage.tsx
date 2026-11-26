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
        await runAction(op.id)
    }
}
