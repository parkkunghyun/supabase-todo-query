"use server";

import { supabase } from "../../lib/supabaseClient";

// fetch todos
export async function fetchTodos() {
  const { data, error } = await supabase
    .from("todo")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  console.log("fetch success");
  return data;
}

// add todo
export async function addTodo(newTodo) {
  const { data, error } = await supabase
    .from("todo")
    .insert([{ title: newTodo }]);

  if (error) throw new Error(error.message);

  console.log("add success");
  return data;
}

// update todo
export async function editTodo(id, updates) {
  const { data, error } = await supabase
    .from("todo")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);

  console.log("edit success");
  return data;
}

// delete todo
export async function deleteTodo(id) {
  const { data, error } = await supabase
    .from("todo")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  console.log("delete success");
  return data;
}
