import { SubTaskInterface, TaskInterface } from "@/interfaces";
import { useState } from "react";
import Subtask from "../Subtask";
import Attachement from "./Attachement";

const images = [
    "https://picsum.photos/id/1/400/400",
    "https://picsum.photos/id/12/400/400",
    "https://picsum.photos/id/33/400/400",
    "https://picsum.photos/id/45/400/400",
    "https://picsum.photos/id/51/400/400",
    "https://picsum.photos/id/66/400/400",
];

export default function TaskModalBody({
    task,
    subtasks,
    colId,
    title,
    setTitle,
}: {
    task: TaskInterface;
    subtasks: SubTaskInterface[] | undefined;
    colId: number;
    title: string;
    setTitle: (e: string) => void;
}) {
    const [description, setDescription] = useState("");
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    if (isFirstLoad && task && task.subtasks) {
        setTitle(task.title || "");
        setDescription(task.description || "");
        setIsFirstLoad(false);
    }

    return (
        <div className="basis-1/2 p-8">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="task-name-input"
                type="text"
                className="bg-transparent w-full px-4 py-2 outline-none focus:border-0 rounded-md text-3xl  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
                placeholder=" e.g Take coffee break"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="task-description-input"
                className="mt-8 w-full  bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
                placeholder="Description e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
            />
            <div className="mt-8 flex flex-col space-y-3">
                {subtasks && (
                    <Subtask
                        subtasks={subtasks}
                        setSubtasks={(newSubtasks: SubTaskInterface[] | undefined) =>
                            (subtasks = newSubtasks)
                        }
                        taskId={task.id}
                        colId={colId}
                    />
                )}
            </div>
            <div className="mt-8 flex flex-col space-y-3">
                <Attachement images={images} />
            </div>
        </div>
    );
}
