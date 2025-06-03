import "./Items.scss"
import { Todos } from "../../../interfaces/interface"
import { ScrollPanel } from 'primereact/scrollpanel';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { useState } from "react";
import { EditDialog } from "../Dialog/EditDialog";
export const Items = ({ todos, setTodos, filter, toast }: { todos: Todos[], setTodos: React.Dispatch<React.SetStateAction<Todos[]>>, filter: string, toast: Toast | null }) => {
    const [editDialog, setEditDialog] = useState(false);
    const [currentItem, setCurrentItem] = useState<Todos | null>(null);
    const handleComplete = (id: number) => {
        if (todos.filter(item => !item.completed).length < 2) {
            if (toast) {
                toast.show({
                    severity: "success",
                    summary: "Успешно",
                    detail: "Выполненные задачи выполнены"
                })
            }
        }

        setTodos((prev) => prev.map((item) =>
            item.id === id ?
                {
                    ...item, completed: !item.completed
                } : item
        ))

    }

    const handleChangeItem = (e: Todos) => {
        setCurrentItem(e)
        setEditDialog(true)
    }

    const handleDelete = (id: number) => {
        setTodos((prev) => prev.filter(item => item.id !== id))
        if (toast) {
            toast.show({
                severity: "success",
                summary: "Успешно",
                detail: "Задача удалена"
            })
        }
    }

        const renderTodos = (todo: Todos) => {
            return (
                <div key={todo.id} className={`todo_item`}>
                    <div className="flex flex-row items-center gap-2 cursor-pointer w-full"
                        onClick={() => handleComplete(todo.id)}
                    >
                        <input type="checkbox" checked={todo.completed} className="checkbox_item" />
                        <span className={`${todo.completed ? "completed" : ""}`}>{todo.todo}</span>
                    </div>
                    <div className="flex flex-row items-center gap-2 icons_item">
                        {!todo.completed && <i className="pi pi-pencil icon_item edit" onClick={() => handleChangeItem(todo)} data-testid="edit-icon"></i>}
                        <i className="pi pi-trash icon_item delete" onClick={() => handleDelete(todo.id)} data-testid="delete-icon"></i>
                    </div>
                </div>
            )
        }
        return (
            <div className="items_container overflow-hidden">
                {todos.length === 0 || !todos ? (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <ProgressSpinner
                            style={{ width: '50px', height: '50px' }}
                            strokeWidth="3" animationDuration=".5s"
                        />
                    </div>
                ) : (
                    <ScrollPanel className="custombar1">
                        {todos.filter(item => filter === "active" ?
                            !item.completed : filter === "completed" ?
                                item.completed :
                                item).map(renderTodos)
                        }
                    </ScrollPanel>
                )}
                {editDialog && currentItem != null &&
                    <EditDialog
                        visible={editDialog}
                        setVisible={setEditDialog}
                        currentItem={currentItem}
                        setTodos={setTodos}
                    />}
            </div>
        )
    }