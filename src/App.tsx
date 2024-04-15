import Todo from './components/Todo'
import NewTodo from './components/NewTodo'
import { useGetTodosQuery } from './services/todo'
import { TodoType } from './types'

export default function App() {
  const { data, error, isLoading } = useGetTodosQuery('todos')

  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <div className='todos'>
          {data.map((todo: TodoType) => (
            <Todo key={todo.id} todo={todo} />
          ))}
          <NewTodo />
        </div>
      ) : null}
    </div>
  )
}