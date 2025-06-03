import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';
import { Toast } from 'primereact/toast';

jest.mock('primereact/toast', () => ({
  Toast: () => <div data-testid="toast" />
}));

describe('Input', () => {
  const mockSetTodos = jest.fn();
  const mockToast = {
    show: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and button', () => {
    render(
      <Input
        setTodos={mockSetTodos}
        toast={mockToast as unknown as Toast}
      />
    );

    expect(screen.getByPlaceholderText('Введите задачу')).toBeInTheDocument();
    expect(screen.getByText('Добавить')).toBeInTheDocument();
  });

  it('adds new todo when form is submitted with valid input', async () => {
    render(
      <Input
        setTodos={mockSetTodos}
        toast={mockToast as unknown as Toast}
      />
    );

    const input = screen.getByPlaceholderText('Введите задачу');
    await userEvent.type(input, 'New todo');

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockSetTodos).toHaveBeenCalled();
    expect(input).toHaveValue('');
  });

  it('shows warning when trying to add empty todo', async () => {
    render(
      <Input
        setTodos={mockSetTodos}
        toast={mockToast as unknown as Toast}
      />
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockSetTodos).not.toHaveBeenCalled();
    expect(mockToast.show).toHaveBeenCalledWith({
      severity: 'warn',
      summary: 'Предупреждение',
      detail: 'Задача не может быть пустой'
    });
  });

  it('shows warning when trying to add todo shorter than 3 characters', async () => {
    render(
      <Input
        setTodos={mockSetTodos}
        toast={mockToast as unknown as Toast}
      />
    );

    const input = screen.getByPlaceholderText('Введите задачу');
    await userEvent.type(input, 'ab');

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockSetTodos).not.toHaveBeenCalled();
    expect(mockToast.show).toHaveBeenCalledWith({
      severity: 'warn',
      summary: 'Предупреждение',
      detail: 'Задача не может быть пустой'
    });
  });
}); 