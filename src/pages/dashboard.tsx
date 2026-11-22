import { Task } from '@/components/task.tsx'
import { TaskCategory } from '@/components/task-category';
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/utils/supabase.ts'

export function Dashboard(){
    const [tasks, setTasks] = useState<any[]>([]);

    async function fetchTasks() {
        const {data, error} = await supabase.from("tasks").select("*");
        if(error){
            console.error(error);
            return;
        }
        setTasks(data);
    }

    useEffect(() => {
        fetchTasks();
    },[])


    return (
        <div className="flex flex-row gap-4 min-h-120">
            <TaskCategory title="Todo">
                {tasks.map((task) => {
                    if(task.status === "Todo")
                        return <Task title={task.title} status={task.status} description={task.description}/>
                    else return;
                })}    
            </TaskCategory>
            <TaskCategory title="In-Progress">
                {tasks.map((task) => {
                    if(task.status === "In-Progress")
                        return <Task title={task.title} status={task.status} description={task.description}/>
                    else return;
                })}
            </TaskCategory>
            <TaskCategory title="In-Review">
                {tasks.map((task) => {
                    if(task.status === "Done")
                        return <Task title={task.title} status={task.status} description={task.description}/>
                    else return;
                })}
            </TaskCategory>
            <TaskCategory title="Done">
                {tasks.map((task) => {
                    if(task.status === "Done")
                        return <Task title={task.title} status={task.status} description={task.description}/>
                    else return;
                })}
            </TaskCategory>
        </div>
    );
}




