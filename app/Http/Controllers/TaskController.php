<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Resources\TaskResource;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::where('user_id', auth()->id())
            ->orderBy('completed')
            ->orderBy('due_date')
            ->get();

        $stats = [
            'total' => $tasks->count(),
            'completed' => $tasks->where('completed', true)->count(),
            'grouped' => $tasks->groupBy(function($task) {
                return $task->due_date->format('Y-m-d');
            })
        ];

        return Inertia::render('Tasks/Index', [
            'tasks' => TaskResource::collection($tasks),
            'stats' => $stats
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = auth()->user()->tasks()->create($request->validated());

        return redirect()->back()->with('success', 'Task created successfully');
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return redirect()->back()->with('success', 'Task updated successfully');
    }

    public function destroy(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }
        
        $task->delete();

        return redirect()->back()->with('success', 'Task deleted successfully');
    }

    public function toggleComplete(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        $task->update([
            'completed' => !$task->completed
        ]);

        return redirect()->back()->with('success', 'Task status updated successfully');
    }
}
