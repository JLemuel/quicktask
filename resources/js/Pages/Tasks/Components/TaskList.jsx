import React from 'react';
import { useForm } from '@inertiajs/react';

export default function TaskList({ tasks }) {
    const { delete: destroy } = useForm();
    const updateForm = useForm();

    const handleDelete = (taskId) => {
        if (confirm('Are you sure you want to delete this task?')) {
            destroy(route('tasks.destroy', taskId));
        }
    };

    const handleToggleComplete = (task) => {
        updateForm.patch(route('tasks.toggle-complete', task.id));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Tasks</h3>
                <div className="divide-y divide-gray-100">
                    {tasks.map((task) => (
                        <div key={task.id} className="py-4 flex items-center justify-between group">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 pt-1">
                                    <input 
                                        type="checkbox" 
                                        checked={task.completed} 
                                        onChange={() => handleToggleComplete(task)}
                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <h4 className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                        {task.title}
                                    </h4>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm text-gray-500">
                                            {new Date(task.due_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleDelete(task.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-gray-400 hover:text-red-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}