"use client";

import React, { useMemo, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import TodoList from './TodoList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTodo, fetchTodos } from "../api/supabaseService";

const mockTodos = [
  { id: 1, title: "t1", completed: false },
  { id: 2, title: "t22", completed: true },
  { id: 3, title: "t3333", completed: true },
]

const MainUI = () => {
  const [newTodo, setNewTodo] = useState("");
  const [search, setIsSearch] = useState("");
  const queryClient = useQueryClient();

  // fetch todos using react query
  const { data: todos=[], isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos
  })

  // add todo using react query
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTodo("");
    }
  });

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [todos, search]);

  const handleAddTodo = () => {
    console.log("click add", newTodo)
    if (newTodo.trim()) {
      mutation.mutate(newTodo);
    }
  }

  if (isError) return <h1>데이터를 가져오는데 실패했습니다. 네트워크 상태 혹은 서버를 확인해주세요</h1>;

  return (
    <div className='w-full p-4 flex h-[500px] items-center flex-col gap-4'>

      {/* search div */}
      <div className='w-2/3 max-w-[600px] mb-4 flex p-2 border-2 shadow-md border-gray-600 rounded-md items-center gap-2'>
        <input
          value={search} onChange={(e) => setIsSearch(e.target.value)}
          className='focus:outline-none flex-1 ml-2 '
          type="text" placeholder='Todo를 검색해주세요.' />
        <FaSearch className='text-xl cursor-pointer hover:scale-105'/>
      </div>

      {/* todo list */}
      <div className='flex-1 w-2/3 max-w-[600px] mb-8'>
        {isLoading ? <h1>Loading...</h1> :  <TodoList todos={filteredTodos} />}
     </div>

      <div className='border-2 border-gray-300 w-2/3 max-w-[600px] '></div>
      
      {/* add todo button */}
      <div className="flex gap-2 items-center w-2/3 max-w-[600px] bg-black text-white py-1  rounded-md">
        <input
          className="flex-1 p-2 bg-black focus:outline-none"
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <FaPlus className='text-2xl mr-2'
          onClick={handleAddTodo}
          disabled={mutation.isLoading} />
      </div>
       
    </div>
  )
}

export default MainUI