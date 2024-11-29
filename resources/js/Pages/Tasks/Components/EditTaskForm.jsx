import React, { useEffect, Fragment } from "react";
import { useForm } from "@inertiajs/react";
import { Dialog, Transition } from "@headlessui/react";

export default function EditTaskForm({ show, onClose, task }) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        title: task?.title || "",
        description: task?.description || "",
        due_date: task?.due_date || "",
        completed: task?.completed || false,
    });

    useEffect(() => {
        if (task) {
            setData({
                title: task.title,
                description: task.description || "",
                due_date: task.due_date,
                completed: task.completed,
            });
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("tasks.update", task.id), {
            onSuccess: () => {
                onClose();
                reset();
            },
        });
    };

    return (
        <Transition show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-black/50 transition-opacity"
                        aria-hidden="true"
                    />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-6">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-2xl mx-auto transform shadow-xl">
                                <Dialog.Title className="text-lg font-medium mb-4">
                                    Edit Task
                                </Dialog.Title>
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={(e) =>
                                                    setData(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.title && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.title}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                rows="3"
                                            />
                                            {errors.description && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.description}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Due Date
                                            </label>
                                            <input
                                                type="date"
                                                value={data.due_date}
                                                onChange={(e) =>
                                                    setData(
                                                        "due_date",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.due_date && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.due_date}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.completed}
                                                onChange={(e) =>
                                                    setData(
                                                        "completed",
                                                        e.target.checked
                                                    )
                                                }
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label className="ml-2 block text-sm text-gray-700">
                                                Mark as completed
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
