import { Toast } from 'primereact/toast';
import { Alert } from '../../../interfaces/interface';
import { useEffect, useRef } from 'react';

export const Alerts = ({
    show,
    severity,
    summary,
    detail
}: Alert) => {
    const toast = useRef<Toast | null>(null);

    useEffect(() => {
        if (toast.current) {
            toast.current.show({
                severity: severity,
                summary: summary,
                detail: detail,
                life: 10000,
            });
        }
    }, [show, severity, summary, detail]);
    return (
        <Toast ref={toast} />
    )
}