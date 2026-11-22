import { supabase } from '@/lib/utils/supabase.ts'

interface TaskCategoryProps{
    title: string,
    children?: React.ReactNode,
    updateTasks: () => void
}

export function TaskCategory({title, children, updateTasks}: TaskCategoryProps) {

    async function changeStatus(id: string){
        const {error} = await supabase.from("tasks")
        .update({status: title})
        .eq('id', id);
        if(error) console.log(error);
        updateTasks();
    }

    return (
        <div className="flex flex-col gap-4 border p-3 rounded-lg w-full"
            onDragOver={(event) => {event.preventDefault();}}
            onDrop={(event)=>{
                event.preventDefault();
                const taskId = event.dataTransfer.getData('text/plain');
                if(taskId) changeStatus(taskId);
            }}>
            <h2 className="min-w-70">
                {title}
            </h2>
            {children}
        </div>
    );
}