
interface TaskProps{
    title: string,
    status: string,
    description: string
}

export function Task({title, status, description}:TaskProps){
    return (
        <div className="flex flex-col w-full bg-white p-5 rounded-3xl">
            <div className="flex flex-start">
                <p className="text-2xl font-bold">{title}</p>
            </div>
            <div className="max-w-60">
                <p style={{ overflowWrap: 'break-word' }}>{description}</p>
            </div>
        </div>
    );
}