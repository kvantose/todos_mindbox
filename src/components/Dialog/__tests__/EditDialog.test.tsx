import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditDialog } from '../EditDialog';

jest.mock('primereact/toast', () => ({
  Toast: () => <div data-testid="toast" />
}));

describe('EditDialog', () => {
  const mockSetVisible = jest.fn();
  const mockSetTodos = jest.fn();
  const mockCurrentItem = {
    id: 1,
    todo: 'Test todo',
    completed: false,
    userId: 1
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dialog with correct content', () => {
    render(
      <EditDialog
        visible={true}
        setVisible={mockSetVisible}
        currentItem={mockCurrentItem}
        setTodos={mockSetTodos}
      />
    );

    expect(screen.getByText('Редактирование задачи')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test todo')).toBeInTheDocument();
    expect(screen.getByText('Сохранить')).toBeInTheDocument();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
  });

  it('closes dialog when cancel button is clicked', () => {
    render(
      <EditDialog
        visible={true}
        setVisible={mockSetVisible}
        currentItem={mockCurrentItem}
        setTodos={mockSetTodos}
      />
    );

    fireEvent.click(screen.getByText('Отмена'));
    expect(mockSetVisible).toHaveBeenCalledWith(false);
  });

  it('updates todo when save button is clicked with valid input', async () => {
    render(
      <EditDialog
        visible={true}
        setVisible={mockSetVisible}
        currentItem={mockCurrentItem}
        setTodos={mockSetTodos}
      />
    );

    const textarea = screen.getByDisplayValue('Test todo');
    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'Updated todo');

    fireEvent.click(screen.getByText('Сохранить'));

    expect(mockSetTodos).toHaveBeenCalled();
    expect(mockSetVisible).toHaveBeenCalledWith(false);
  });

  it('shows warning when trying to save empty todo', async () => {
    render(
      <EditDialog
        visible={true}
        setVisible={mockSetVisible}
        currentItem={mockCurrentItem}
        setTodos={mockSetTodos}
      />
    );

    const textarea = screen.getByDisplayValue('Test todo');
    await userEvent.clear(textarea);

    fireEvent.click(screen.getByText('Сохранить'));

    expect(mockSetTodos).not.toHaveBeenCalled();
    expect(mockSetVisible).not.toHaveBeenCalled();
  });

  it('shows warning when trying to save todo shorter than 3 characters', async () => {
    render(
      <EditDialog
        visible={true}
        setVisible={mockSetVisible}
        currentItem={mockCurrentItem}
        setTodos={mockSetTodos}
      />
    );

    const textarea = screen.getByDisplayValue('Test todo');
    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'ab');

    fireEvent.click(screen.getByText('Сохранить'));

    expect(mockSetTodos).not.toHaveBeenCalled();
    expect(mockSetVisible).not.toHaveBeenCalled();
  });
}); 