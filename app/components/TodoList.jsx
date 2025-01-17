"use client";

import React from 'react'
import Todo from "./Todo";


const TodoList = ({todos}) => {
  return (
      <div className='flex flex-col gap-4 h-[320px] overflow-y-auto '>
          {todos.map((todo) => (
              <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
          ))}
    </div>
  )
}

export default TodoList