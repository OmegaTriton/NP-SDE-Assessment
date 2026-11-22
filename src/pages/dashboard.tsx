import { Task } from '@/components/task.tsx'
import { TaskCategory } from '@/components/task-category';
import { useEffect, useState, useRef, useImperativeHandle, Ref } from 'react'
import { supabase } from '@/lib/utils/supabase.ts'

export interface DashboardHandle {
    updateTasks: () => void;
}

interface DashboardProps {
    ref ?: Ref<DashboardHandle>;
}

export function Dashboard({ ref }: DashboardProps){
    const [tasks, setTasks] = useState<any[]>([]);
    const [taskUpdated, setTaskUpdated] = useState(false);

    async function fetchTasks() {
        const {data, error} = await supabase.from("tasks").select("*");
        if(error){
            console.error(error);
            return;
        }
        setTasks(data);
        setTaskUpdated(false);
    }

    useImperativeHandle(ref, () => ({
        updateTasks() {
            setTaskUpdated(true);
        }
    }));

    useEffect(() => {
        fetchTasks();
    },[taskUpdated])


    return (
        <div className="flex flex-row gap-4 min-h-120">
            <TaskCategory title="Todo" updateTasks={() => setTaskUpdated(true)}>
                {tasks.map((task) => {
                    if(task.status === "Todo")
                        return <Task key={task.id} id={task.id} title={task.title} status={task.status} description={task.description}/>
                    else return;
                })}    
            </TaskCategory>
            <TaskCategory title="In-Progress" updateTasks={() => setTaskUpdated(true)}>
                {tasks.map((task) => {
                    if(task.status === "In-Progress")
                        return <Task key={task.id} id={task.id} title={task.title} status={task.status} description={task.description}/>
                    else return;
                })}
            </TaskCategory>
            <TaskCategory title="In-Review" updateTasks={() => setTaskUpdated(true)}>
                {tasks.map((task) => {
                    if(task.status === "In-Review")
                        return <Task key={task.id} id={task.id} title={task.title} status={task.status} description={task.description}/>
                    else return;
                })}
            </TaskCategory>
            <TaskCategory title="Done" updateTasks={() => setTaskUpdated(true)}>
                {tasks.map((task) => {
                    if(task.status === "Done")
                        return <Task key={task.id} id={task.id} title={task.title} status={task.status} description={task.description}/>
                    else return;
                })}
            </TaskCategory>
        </div>
    );
}




