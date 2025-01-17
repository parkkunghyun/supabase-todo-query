import { supabase } from "../../lib/supabaseClient";

// fetch todos
export const fetchTodos = async () => {
    const { data, error } = await supabase
        .from("todo")
        .select("*");
    
    if (error) { throw new Error(error.message) };
    console.log("fetch success");
    return data;
}
// add todo
export const addTodo = async (newTodo) => {
    const { data, error } = await supabase
        .from("todo")
        .insert([{ title: newTodo }]);
    
    if (error) { throw new Error(error.message) };
    console.log("add success");
    return data;
}

// update todo
export const editTodo = async (id, updates) => {
    const { data, error } = await supabase
        .from("todo")
        .update(updates)
        .eq("id", id);
    
    if (error) { throw new Error(error.message) };
    console.log("edit success");
    return data;
}

// delete todo
export const deleteTodo = async (id) => {
    const { data, error } = await supabase
        .from("todo")
        .delete()
        .eq("id", id);
    
    if (error) { throw new Error(error.message) };
    console.log("delete success");
    return data;
}
