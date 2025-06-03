import { render, screen, fireEvent } from '@testing-library/react';
import { Items } from '../Items';
import { Toast } from 'primereact/toast';

jest.mock('primereact/toast', () => ({
  Toast: () => <div data-testid="toast" />
}));

jest.mock('../../Dialog/EditDialog', () => ({
  EditDialog: () => <div data-testid="edit-dialog" />
}));

describe('Items', () => {
  const mockTodos = [
    { id: 1, todo: 'Test todo 1', completed: false, userId: 1 },
    { id: 2, todo: 'Test todo 2', completed: true, userId: 1 }
  ];
  const mockSetTodos = jest.fn();
  const mockToast = {
    show: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading spinner when todos is empty', () => {
    render(
      <Items
        todos={[]}
        setTodos={mockSetTodos}
        filter="all"
        toast={mockToast as unknown as Toast}
      />
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders todos correctly', () => {
    render(
      <Items
        todos={mockTodos}
        setTodos={mockSetTodos}
        filter="all"
        toast={mockToast as unknown as Toast}
      />
    );

    expect(screen.getByText('Test todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test todo 2')).toBeInTheDocument();
  });

  it('filters active todos correctly', () => {
    render(
      <Items
        todos={mockTodos}
        setTodos={mockSetTodos}
        filter="active"
        toast={mockToast as unknown as Toast}
      />
    );

    expect(screen.getByText('Test todo 1')).toBeInTheDocument();
    expect(screen.queryByText('Test todo 2')).not.toBeInTheDocument();
  });

  it('filters completed todos correctly', () => {
    render(
      <Items
        todos={mockTodos}
        setTodos={mockSetTodos}
        filter="completed"
        toast={mockToast as unknown as Toast}
      />
    );

    expect(screen.queryByText('Test todo 1')).not.toBeInTheDocument();
    expect(screen.getByText('Test todo 2')).toBeInTheDocument();
  });

  it('toggles todo completion when clicked', () => {
    render(
      <Items
        todos={mockTodos}
        setTodos={mockSetTodos}
        filter="all"
        toast={mockToast as unknown as Toast}
      />
    );

    const todoElement = screen.getByText('Test todo 1');
    fireEvent.click(todoElement);

    expect(mockSetTodos).toHaveBeenCalled();
  });

  it('shows edit dialog when edit icon is clicked', () => {
    render(
      <Items
        todos={mockTodos}
        setTodos={mockSetTodos}
        filter="all"
        toast={mockToast as unknown as Toast}
      />
    );

    const editIcon = screen.getByTestId('edit-icon');
    fireEvent.click(editIcon);

    expect(screen.getByTestId('edit-dialog')).toBeInTheDocument();
  });
}); 