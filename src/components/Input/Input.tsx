import React from "react"
import { Todos } from "../../../interfaces/interface"
import { useState } from "react"
import "./Input.scss"
import { Toast } from 'primereact/toast';


export const Input = ({ setTodos, toast }: { setTodos: React.Dispatch<React.SetStateAction<Todos[]>>, toast: Toast | null }) => {
    const [value, setValue] = useState("");

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value.trim() || value.trim().length < 3) {
            if (toast) {
                toast.show({
                    severity: "warn",
                    summary: "Предупреждение",
                    detail: "Задача не может быть пустой"
                })
            }
            return
        }

            setTodos((prev) => [
                {
                    id: prev.length + 100, 
                    /// после удаления todo, которая прищла из api - todo заданная через input не удаляется и не редактируется. 
                    // сделал через костыль, пока думаю
                    todo: value,
                    completed: false,
                    userId: 1
                },
                ...prev,
            ]);
        setValue("");
    };

    return (
        <div className="w-full">
            <form className="form flex flex-col sm:flex-row gap-2"
                role="form"
                onSubmit={handleAdd}
                onKeyDown={(e) => e.key === "Enter" && handleAdd(e)}>
                <input
                    type="text"
                    placeholder="Введите задачу"
                    className="input_form flex-1 min-w-0 px-3 py-2 text-sm sm:text-base"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit" className="btn btn_form whitespace-nowrap px-4 py-2 text-sm sm:text-base">Добавить</button>
            </form>
        </div>
    );
};
