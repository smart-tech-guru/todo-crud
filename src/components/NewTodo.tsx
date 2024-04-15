import { useState } from 'react'
import { useCreateTodoMutation } from '../services/todo'

const NewTodo = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [createTodo] = useCreateTodoMutation()

  const saveChanges = async () => {
    await createTodo({
      title,
    })
    resetChanges()
  }

  const resetChanges = () => {
    setTitle('')
    setEditMode(false)
  }

  return (
    <>
      {editMode ? (
        <div className="edit todo">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className='save-btn' onClick={saveChanges}>Save</button>
          <button className='cancel-btn' onClick={resetChanges}>Cancel</button>
        </div>
      ) : (
        <div className='add-todo'>
          <button onClick={() => setEditMode(true)}>Add new note</button>
        </div>
      )}
    </>
  )
}

export default NewTodo
