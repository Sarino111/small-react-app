
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/itemsSlices';

const AddItemForm: React.FC = () => {
    const dispatch = useDispatch();
    
    const [userId, setUserId] = useState('');
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newItem = {
        userId: parseInt(userId),
        id: parseInt(id),
        title,
        completed,
        };
        dispatch(addItem(newItem));
        setUserId('');
        setId('');
        setTitle('');
        setCompleted(false);
    };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-2 bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto my-10">
        <div className="mb-4">
            <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900">User ID</label>
            <input
            type="number"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border-2 border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            />
        </div>
        <div className="mb-4">
            <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900">ID</label>
            <input
            type="number"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border-2 border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            />
        </div>
        <div className="mb-4">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
            <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            />
        </div>
        <div className="flex items-center mb-6">
            <label htmlFor="completed" className="mr-2 text-sm font-medium text-gray-900">Completed</label>
            <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-2 border-black rounded focus:ring-blue-500"
            />
        </div>
        <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full transition-colors duration-300">
            Add Item
        </button>
    </form>

  );
};

export default AddItemForm;

