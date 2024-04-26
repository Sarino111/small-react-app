

import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setItems, updateItem, removeItem } from '../../redux/slices/itemsSlices';

import axios from 'axios';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const ItemsTable: React.FC = () => {
  const dispatch = useDispatch();

  const items = useSelector((state: any) => state.allItems.items);

  const [loading, setLoading] = useState<boolean>(true);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Todo>({ userId: 0, id: 0, title: '', completed: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        dispatch(setItems(response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleEditClick = (item: Todo) => {
    setEditItemId(item.id);
    setEditFormData(item);
  };

  const handleSaveClick = () => {
    dispatch(updateItem(editFormData));
    setEditItemId(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: name === "completed" ? event.target.checked : value,
    });
  };

  const handleDelete = (id: number) => {
    dispatch(removeItem(id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-auto max-w-4xl border border-gray-300">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">User ID</th>
            <th scope="col" className="py-3 px-6">ID</th>
            <th scope="col" className="py-3 px-6">Title</th>
            <th scope="col" className="py-3 px-6">Completed</th>
            <th scope="col" className="py-3 px-6">Actions</th>
            <th scope="col" className="py-3 px-6">Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: Todo) => (
            <tr key={item.id} className="bg-white border-b border-gray-300">
              <td className="py-4 px-6">{item.userId}</td>
              <td className="py-4 px-6">{item.id}</td>
              <td className="py-4 px-6">
                {editItemId === item.id ? (
                    <input type="text" value={editFormData.title} name="title" onChange={handleInputChange} className="border-gray-300 p-1 rounded" />
                ) : (
                    item.title
                )}
              </td>
              <td className="py-4 px-6">
                {editItemId === item.id ? (
                    <input type="checkbox" checked={editFormData.completed} name="completed" onChange={handleInputChange} />
                ) : (
                    item.completed ? 'Yes' : 'No'
                )}
              </td>
              <td className="py-4 px-6">
                {editItemId === item.id ? (
                    <button onClick={handleSaveClick} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">Save</button>
                ) : (
                    <button onClick={() => handleEditClick(item)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700">Edit</button>
                )}
              </td>
              <td className="py-4 px-6 flex space-x-4">
                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;

