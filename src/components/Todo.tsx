import { useState } from 'react'
import { useRemoveTodoMutation, useUpdateTodoMutation } from '../services/todo'
import { TodoType } from '../types'

type Props = {
  todo: TodoType
}

const Todo = ({ todo }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(todo.title)
  const [status, setStatus] = useState<boolean>(todo.completed)
  const [updateTodo] = useUpdateTodoMutation()
  const [removeTodo] = useRemoveTodoMutation()

  const saveChanges = async () => {
    await updateTodo({
      id: todo.id,
      title,
      completed: status,
    })
    setEditMode(false)
  }

  const resetChanges = () => {
    setTitle(todo.title)
    setEditMode(false)
  }

  const deleteTodo = async () => {
    await removeTodo({ id: todo.id })
  }

  return (
    <>
      {editMode ? (
        <div className="edit todo">
          <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className='save-btn' onClick={saveChanges}>Save</button>
          <button className='cancel-btn' onClick={resetChanges}>Cancel</button>
        </div>
      ) : (
        <div className={`todo ${todo.completed ? 'completed': ''}`}>
          <span>{todo.title}</span>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button className='delete-btn' onClick={deleteTodo}>Delete</button>
        </div>
      )}
    </>
  )
}

export default Todo
