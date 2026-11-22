
interface TaskProps{
    id: string,
    title: string,
    status: string,
    description: string
}

export function Task({id, title, status, description}:TaskProps){
    function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
        const card = event.currentTarget;
        const bounds = card.getBoundingClientRect();
        const offsetX = event.nativeEvent.offsetX;
        const offsetY = event.nativeEvent.offsetY;
        const preview = card.cloneNode(true) as HTMLDivElement;

        Object.assign(preview.style, {
            position: 'fixed',
            left: `${event.clientX - offsetX}px`,
            top: `${event.clientY - offsetY}px`,
            width: `${bounds.width}px`,
            height: `${bounds.height}px`,
            boxSizing: 'border-box',
            margin: '0',
            opacity: '1',
            backgroundColor: '#ffffff',
            pointerEvents: 'none',
            zIndex: '2147483647',
        });
        document.body.appendChild(preview);

        const emptyImage = document.createElement('canvas');
        emptyImage.width = 1;
        emptyImage.height = 1;
        document.body.appendChild(emptyImage);
        event.dataTransfer.setData('text/plain', id);
        event.dataTransfer.setDragImage(emptyImage, 0, 0);
        window.setTimeout(() => emptyImage.remove(), 0);

        const movePreview = (dragEvent: DragEvent) => {
            preview.style.left = `${dragEvent.clientX - offsetX}px`;
            preview.style.top = `${dragEvent.clientY - offsetY}px`;
        };
        const removePreview = () => {
            document.removeEventListener('dragover', movePreview);
            document.removeEventListener('drop', removePreview);
            document.removeEventListener('dragend', removePreview);
            preview.remove();
        };

        document.addEventListener('dragover', movePreview);
        document.addEventListener('drop', removePreview);
        document.addEventListener('dragend', removePreview);
    }

    return (
        <div draggable onDragStart={handleDragStart} className="flex flex-col w-full bg-white p-5 rounded-3xl">
            <div className="flex flex-start">
                <p className="text-2xl font-bold">{title}</p>
            </div>
            <div className="max-w-60">
                <p style={{ overflowWrap: 'break-word' }}>{description}</p>
            </div>
        </div>
    );
}