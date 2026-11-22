
interface TaskCategoryProps{
    title: string,
    children?: React.ReactNode
}

export function TaskCategory({title, children}: TaskCategoryProps) {
    return (
        <div className="flex flex-col gap-4 border p-3 rounded-lg w-full">
            <h2 className="min-w-70">
                {title}
            </h2>
            {children}
        </div>
    );
}