export interface Todos {
    id: number,
    todo: string,
    completed: boolean,
    userId: number
}

export type setState<T> = React.Dispatch<React.SetStateAction<T>>


export interface Alert {
    show: boolean,
    severity: 'success' | 'contrast' | 'warn' | 'error',
    summary: string,
    detail: string
}