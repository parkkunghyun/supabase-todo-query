"use client";
import React, { useState } from "react";
import { IoMdCheckbox } from "react-icons/io";
import { FaRegSquareCheck } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import { deleteTodo, editTodo } from "../api/supabaseService";

const Todo = ({ id, title, completed }) => {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(title); // 초기값을 title로 설정
  const queryClient = useQueryClient();

  const toggleCompleted = async () => {
    await editTodo(id, { completed: !isCompleted });
    setIsCompleted(!isCompleted);
  };

  const handleEdit = async () => {
    if (isEditing) {
      // 수정 완료 시 서버에 저장
      await editTodo(id, { title: text });
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // 캐시 무효화
    } else {
      // 수정 모드 활성화 시 초기값 설정
      setText(title);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    await deleteTodo(id);
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  return (
    <div className="w-full flex items-center gap-2 mb-2">
      {/* 체크박스 */}
      <div onClick={toggleCompleted}>
        {isCompleted ? (
          <IoMdCheckbox className="text-2xl" />
        ) : (
          <FaRegSquareCheck className="text-2xl" />
        )}
      </div>

      {isEditing ? (
        <input
          value={text}
          className="flex-1 border-2 border-gray-600 rounded-md p-1"
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <p
          className={`flex-1 font-bold text-xl ${
            isCompleted && "line-through"
          }`}
        >
          {title}
        </p>
      )}

      <div className="flex gap-2 items-center">
        {/* 수정 버튼 */}
        <div
          onClick={handleEdit}
          className="cursor-pointer hover:scale-105 bg-black p-1 rounded-md text-white"
        >
          <MdOutlineEdit className="text-xl" />
        </div>
        {/* 삭제 버튼 */}
        <div
          onClick={handleDelete}
          className="cursor-pointer hover:scale-105 bg-black p-1 rounded-md text-white"
        >
          <MdOutlineDelete className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Todo;
