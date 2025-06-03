// import "./Todo.scss"

import { Filters } from "../Filters/Filters"
import { Input } from "../Input/Input"
import { Items } from "../Items/Items"

import { useEffect, useState, useRef } from "react"
import { API } from "../../../api/api"
import { Todos } from "../../../interfaces/interface"
import { Toast } from 'primereact/toast';

export const Todo = () => {
    const toast = useRef<Toast | null>(null);
    const [todos, setTodos] = useState<Todos[]>([])
    const [filter, setFilter] = useState<string>("all")

    useEffect(() => {
        fetch(API.getTodos)
            .then(res => res.json())
            .then(data => setTodos(data.todos))
            .catch(err => {
                if (toast.current) {
                    toast.current.show({
                        severity: "error",
                        summary: "Ошибка",
                        detail: err.message || "Что-то пошло не так"
                    })
                }
            })
    }, [])


    const handleClearCompleted = () => {
        setTodos((prev) => prev.filter(item => !item.completed))
        if (toast.current) {
            toast.current.show({
                severity: "contrast",
                summary: "Успешно",
                detail: "Выполненные задачи удалены"
            })
        }
    }

    return (
        <div style={{ height: "800px" }} className="todo_container
            w-full border border-solid rounded-md border-gray-400
            p-4 flex flex-col gap-4"
        >
            <Input
                setTodos={setTodos}
                toast={toast.current}
            />
            <Items
                todos={todos}
                setTodos={setTodos}
                filter={filter}
                toast={toast.current}
            />
            <Filters
                todos={todos}
                setFilter={setFilter}
                handleClearCompleted={handleClearCompleted}
            />
            <Toast ref={toast} />
        </div>
    )
}