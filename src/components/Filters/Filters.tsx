import { setState, Todos } from "../../../interfaces/interface";
import "./Filters.scss"
import { TabMenu } from 'primereact/tabmenu';
export const Filters = ({
    todos,
    setFilter,
    handleClearCompleted,
}: {
    todos: Todos[],
    setFilter: setState<string>,
    handleClearCompleted: () => void,
}) => {

    const items = [
        { label: 'Все', command: () => setFilter('all') },
        { label: 'Активные', command: () => setFilter('active') },
        { label: 'Выполненые', command: () => setFilter('completed') },
    ]
    return (
        <div className='flex flex-row justify-between items-center'>
            {todos.filter(item => !item.completed).length > 0 ?
                <span>Осталось: {todos.filter(item => !item.completed).length}</span>
                :
                <span>Все задачи выполнены</span>
            }
            <div className='flex flex-row gap-3'>
                <TabMenu model={items} activeIndex={0} className='' />
            </div>
            <button className="btn_clear" onClick={() => handleClearCompleted()}>Очистить выполненные</button>
        </div>
    )
}