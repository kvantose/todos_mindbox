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
        <div className='flex flex-col sm:flex-row justify-center items-center gap-2 text-sm sm:text-base'>
            <div className="w-full sm:w-auto text-center sm:text-left">
                {todos.filter(item => !item.completed).length > 0 ?
                    <span>Осталось: {todos.filter(item => !item.completed).length}</span>
                    :
                    <span>Все задачи выполнены</span>
                }
            </div>
            <div >
                <TabMenu model={items} activeIndex={0} className='w-full ' />
            </div>
            <button 
                className="btn_clear whitespace-nowrap px-3 py-1 text-sm sm:text-base w-full sm:w-auto" 
                onClick={() => handleClearCompleted()}
            >
                Очистить выполненные
            </button>
        </div>
    )
}