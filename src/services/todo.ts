import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/'

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => `todos`,
      providesTags: ['Todo'],
    }),
    updateTodo: builder.mutation({
      query: ({ id, title, completed }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: { title, completed },
      }),
      invalidatesTags: ['Todo'],
    }),
    createTodo: builder.mutation({
      query: ({ title }) => ({
        url: `todos`,
        method: 'POST',
        body: { title, completed: false },
      }),
      invalidatesTags: ['Todo'],
    }),
    removeTodo: builder.mutation({
      query: ({ id }) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
})

export const { useGetTodosQuery, useUpdateTodoMutation, useCreateTodoMutation, useRemoveTodoMutation } = todoApi
