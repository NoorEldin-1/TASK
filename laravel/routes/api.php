<?php

use App\Http\Controllers\AiChatController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('auth/google/redirect', [GoogleAuthController::class, 'redirect']);
Route::get('auth/google/callback', [GoogleAuthController::class, 'callback']);
Route::delete('auth/google/logout', [GoogleAuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('collection/create', [CollectionController::class, 'create'])->middleware('auth:sanctum');
Route::get('collection/all', [CollectionController::class, 'index'])->middleware('auth:sanctum');
Route::get('collection/search/{name}', [CollectionController::class, 'search'])->middleware('auth:sanctum');
Route::put('collection/edit/{id}', [CollectionController::class, 'edit'])->middleware('auth:sanctum');
Route::delete('collection/delete/{id}', [CollectionController::class, 'delete'])->middleware('auth:sanctum');

Route::post('tasks/create/{collection_id}', [TaskController::class, 'create'])->middleware('auth:sanctum');
Route::get('tasks/all/{collection_id}', [TaskController::class, 'index'])->middleware('auth:sanctum');
Route::get('tasks/search/{collection_id}/{title}', [TaskController::class, 'search'])->middleware('auth:sanctum');
Route::put('tasks/edit/{collection_id}/{task_id}', [TaskController::class, 'edit'])->middleware('auth:sanctum');
Route::delete('tasks/delete/{collection_id}/{task_id}', [TaskController::class, 'delete'])->middleware('auth:sanctum');
Route::put('tasks/toggleComplete/{collection_id}/{task_id}', [TaskController::class, 'toggleComplete'])->middleware('auth:sanctum');
Route::get('tasks/filter/{collection_id}/{filter}', [TaskController::class, 'filter'])->middleware('auth:sanctum');

