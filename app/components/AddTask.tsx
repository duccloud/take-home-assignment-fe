"use client";

import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal';
import { FormEventHandler, useState } from 'react';
import { addTodo } from '@/public/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>('');
    const [newDescriptionValue, setNewDescriptionValue] = useState<string>('');

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await addTodo({
            id: uuidv4(),
            text: newTaskValue,
            description: newDescriptionValue,
            done: false
        });
        setNewTaskValue("");
        setNewDescriptionValue("");
        setModalOpen(false);
        router.refresh()
    }

    return <div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">Add new task
            <AiOutlinePlus className='ml-2' size={18} />
        </button>

        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <form onSubmit={handleSubmitNewTodo} className="space-y-4">
                <h3 className='font-bold text-lg'>Add new task</h3>
                <div className='form-control'>
                    <label className='label'>
                        <span className='label-text'>Task <span className='text-red-500'>*</span>
                        </span>
                    </label>
                    <input
                        value={newTaskValue}
                        onChange={(e) => setNewTaskValue(e.target.value)}
                        type="text"
                        placeholder="Type task here"
                        className="input input-bordered w-full"
                        required />
                </div>

                <div className='form-control'>
                    <label className='label'>
                        <span className='label-text'>Description</span>
                    </label>
                    <input
                        value={newDescriptionValue}
                        onChange={(e) => setNewDescriptionValue(e.target.value)}
                        type="text"
                        placeholder="Type description here"
                        className="input input-bordered w-full" />
                </div>

                <div className='form-control'>
                    <button type="submit" className='btn w-full'>Submit</button>
                </div>
            </form>
        </Modal>
    </div>
};

export default AddTask;