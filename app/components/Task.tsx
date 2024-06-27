"use client";

import { ITask } from "@/types/tasks";
import React, { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/public/api";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text)

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text: taskToEdit
        });
        setOpenModalEdit(false);
        router.refresh()
    }

    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id);
        router.refresh()
    }

    return <tr key={task.id}>
        <td className='w-1/2'>{task.text}</td>
        <td className='w-1/2'>{task.description}</td>
        <td className='w-1/8 flex gap-5'>
            <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25} />

            <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                <form onSubmit={handleSubmitEditTodo}>
                    <h3 className='font-bold text-lg'>Edit task</h3>
                    <div className='modal-action'>
                        <input
                            value={taskToEdit}
                            onChange={(e) => setTaskToEdit(e.target.value)}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full" />
                        <button type="submit" className='btn'>Submit</button>
                    </div>
                </form>
            </Modal>

            <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={25} />

            <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                <h3>Are you sure?</h3>
                <div className="modal-action">
                    <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="btn"
                    >Yes</button>
                </div>
            </Modal>
        </td>
    </tr>
};

export default Task;