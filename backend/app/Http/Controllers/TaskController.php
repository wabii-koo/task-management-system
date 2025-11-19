<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\TaskRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request): JsonResponse
    {
        
        if (auth()->user()->isAdmin()) {
            $query = Task::with('user'); 
        } else {
            $query = Task::where('user_id', auth()->id()); 
        }
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $tasks = $query->get();

        return response()->json([
            'tasks' => $tasks,
            'count' => $tasks->count(),
            'user_role' => auth()->user()->role 
        ]);
    }

    public function store(TaskRequest $request): JsonResponse
    {
        $task = Task::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status ?? 'pending',
            'due_date' => $request->due_date,
        ]);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task->load('user')
        ], 201);
    }

    public function show(Task $task): JsonResponse
    {
        if (auth()->user()->isUser() && $task->user_id !== auth()->id()) {
            return response()->json([
                'error' => 'Unauthorized access to task'
            ], 403);
        }

        return response()->json([
            'task' => $task->load('user')
        ]);
    }

    public function update(TaskRequest $request, Task $task): JsonResponse
    {
        if (auth()->user()->isUser() && $task->user_id !== auth()->id()) {
            return response()->json([
                'error' => 'Unauthorized access to task'
            ], 403);
        }

        $task->update($request->validated());

        return response()->json([
            'message' => 'Task updated successfully',
            'task' => $task->load('user')
        ]);
    }

    public function destroy(Task $task): JsonResponse
    {
        if (auth()->user()->isUser() && $task->user_id !== auth()->id()) {
            return response()->json([
                'error' => 'Unauthorized access to task'
            ], 403);
        }

        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully'
        ], 200);
    }
}