import { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx";
import { supabase } from "@/lib/utils/supabase.ts"

interface CreateTaskModalProps {
    isOpen: boolean,
    onClose: () => void
}

export function CreateTaskModal({isOpen, onClose}: CreateTaskModalProps){
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            setTitle("");
            setDescription("");
            dialog.close();
        }
    }, [isOpen]);

    const handleBackdropClick = (e: any) => {
        if (e.target === dialogRef.current) {
            onClose();
        }
    };

    async function createTask() {
        setLoading(true);
        setError(null);

        try{
            const {error} = await supabase.from("tasks").insert([{
                title: title,
                description: description,
                status: "Todo"
            }]);
            if(error) throw error;
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
        setLoading(false);
        }
    }

    return (
        <dialog ref={dialogRef} onClick={handleBackdropClick} className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-lg shadow-lg border">
            <div className="flex flex-col gap-4">
                <h2>Create Task</h2>
                <Input placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full"/>
                <textarea placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full min-h-30 min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"/>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <div className="flex flex-row gap-2 justify-end">
                    <Button onClick={()=>onClose()}>Close</Button>
                    <Button onClick={async () => await createTask()} variant="outline">{loading ? "Creating..." : "Create Task"}</Button>
                </div>
            </div>
        </dialog>
    );
}