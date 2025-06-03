import { Dialog } from 'primereact/dialog';
import { setState, Todos } from '../../../interfaces/interface';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';

export const EditDialog = (
    {
        visible,
        setVisible,
        currentItem,
        setTodos
    }: {
        visible: boolean,
        setVisible: setState<boolean>,
        currentItem: Todos,
        setTodos: setState<Todos[]>
    }
) => {
    const [editedText, setEditedText] = useState(currentItem.todo);
    const toast = useRef<Toast>(null);

    const handleSave = () => {
        if (!editedText.trim() || editedText.trim().length < 3) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Предупреждение',
                detail: 'Задача не может быть пустой или короче 3 символов'
            });
            return;
        }

        setTodos((prev) => prev.map((item) => 
            item.id === currentItem.id ? { ...item, todo: editedText } : item
        ));
        
        toast.current?.show({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Задача успешно обновлена'
        });
        
        setVisible(false);
    };

    return (
        <>
            <Dialog 
                header="Редактирование задачи" 
                visible={visible} 
                style={{ width: '90vw', maxWidth: '600px' }}
                className='bg-gray-900 text-white p-2 sm:p-4'
                onHide={() => { if (!visible) return; setVisible(false); }}
                footer={
                    <div className="flex justify-end gap-2">
                        <Button 
                            label="Отмена" 
                            icon="pi pi-times" 
                            onClick={() => setVisible(false)} 
                            className="bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition-all duration-300 p-2 text-sm sm:text-base"
                        />
                        <Button 
                            label="Сохранить" 
                            icon="pi pi-check" 
                            onClick={handleSave} 
                            className="bg-green-500 text-white hover:bg-green-600 hover:scale-105 transition-all duration-300 p-2 text-sm sm:text-base"
                        />
                    </div>
                }
            >
                <InputTextarea
                    autoFocus
                    className='w-full border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base'
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    rows={5}
                    autoResize
                />
            </Dialog>
            <Toast ref={toast} />
        </>
    )
}