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
    const [taskToEdit, setTaskToEdit] = useState<string | undefined>(task.text)
    const [descriptionToEdit, setDescriptionToEdit] = useState<string | undefined>(task.description)
    const [markDone, setMarkDone] = useState<boolean | undefined>(task.done);
    const [loading, setLoading] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);

        await editTodo({
            id: task.id,
            text: taskToEdit,
            description: descriptionToEdit,
            done: markDone
        });
        setOpenModalEdit(false);
        // setLoading(false);
        router.refresh()
    }

    const handleMMarkDone = async (id: string) => {
        console.log("Curent markDone is ", markDone);
        setMarkDone(!markDone)

        await editTodo({
            id: task.id,
            text: taskToEdit,
            description: descriptionToEdit,
            done: !markDone
        });

        router.refresh()
    }

    const handleDeleteTask = async (id: string) => {
        setDeleting(true);
        await deleteTodo(id);
        // setDeleting(false);
        router.refresh()
    }

    return <tr key={task.id}>
        <td className='w-1/8'>
            <input onChange={(e) => handleMMarkDone(task.id)} type="checkbox" checked={markDone} className="checkbox" />
        </td>
        <td className={`w-1/2 ${markDone ? 'text-gray-400' : ''}`}>{task.text}</td>
        <td className={`w-1/2 ${markDone ? 'text-gray-400' : ''}`}>{task.description}</td>
        <td className='w-1/8 flex gap-5'>
            <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25} />

            <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                <form onSubmit={handleSubmitEditTodo} className="space-y-4">
                    <h3 className='font-bold text-lg'>Edit task</h3>

                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Task <span className='text-red-500'>*</span>
                            </span>
                        </label>
                        <input
                            value={taskToEdit}
                            onChange={(e) => setTaskToEdit(e.target.value)}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            autoFocus
                            required
                        />
                    </div>

                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Description</span>
                        </label>
                        <input
                            value={descriptionToEdit}
                            onChange={(e) => setDescriptionToEdit(e.target.value)}
                            type="text"
                            placeholder="Type description here"
                            className="input input-bordered w-full" />
                    </div>

                    <div className='form-control'>
                        <button type="submit" className='btn w-full' disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
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
                        disabled={deleting}
                    >Yes</button>
                </div>
            </Modal>
        </td>
    </tr>
};

export default Task;