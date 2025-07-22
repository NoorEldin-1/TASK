<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function create($collection_id) {
        $validator = Validator::make(request()->all(), [
            'title' => 'required|string|min:3|max:255',
            'description' => 'required|string|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $task = Task::create([
            'title' => request('title'),
            'description' => request('description'),
            'collection_id' => $collection_id,
        ]);
        return response()->json($task);
    }

    public function index($collection_id) {
        $tasks = Task::where('collection_id', $collection_id)->latest('id', 'desc')->get();
        return response()->json($tasks);
    }

    public function search($collection_id, $title) {
        $tasks = Task::where('collection_id', $collection_id)->where('title', 'like', '%' . $title . '%')->latest('id', 'desc')->get();
        return response()->json($tasks);
    }

    public function edit($collection_id, $task_id) {
        $collection = Collection::find($collection_id);
        if (!$collection) {
            return response()->json(['error' => 'Collection not found'], 404);
        }

        $task = Task::where('collection_id', $collection_id)->where('id', $task_id)->first();
        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        $validator = Validator::make(request()->all(), [
            'title' => 'required|string|min:3|max:255',
            'description' => 'required|string|min:3',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $task->update([
            'title' => request('title'),
            'description' => request('description'),
        ]);

        return response()->json($task);
    }

    public function delete($collection_id, $task_id) {
        $collection = Collection::find($collection_id);
        if (!$collection) {
            return response()->json(['error' => 'Collection not found'], 404);
        }

        $task = Task::where('collection_id', $collection_id)->where('id', $task_id)->first();
        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }

    public function toggleComplete($collection_id, $task_id) {
        $collection = Collection::find($collection_id);
        if (!$collection) {
            return response()->json(['error' => 'Collection not found'], 404);
        }

        $task = Task::where('collection_id', $collection_id)->where('id', $task_id)->first();
        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        $task->update([
            'is_completed' => !$task->is_completed,
        ]);

        return response()->json($task);
    }

    public function filter($collection_id, $filter) {
        if ($filter == 'completed') {
            $tasks = Task::where('collection_id', $collection_id)->where('is_completed', true)->latest('id', 'desc')->get();
        } else if ($filter == 'incomplete') {
            $tasks = Task::where('collection_id', $collection_id)->where('is_completed', false)->latest('id', 'desc')->get();
        } else {
            $tasks = Task::where('collection_id', $collection_id)->latest('id', 'desc')->get();
        }
        return response()->json($tasks);
    }
}