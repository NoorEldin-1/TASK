<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class CollectionController extends Controller
{
    public function create() {
        $validator = Validator::make(request()->all(), [
            'name' => 'required|string|min:3|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $collection = Collection::create([
            'name' => request('name'),
            'user_id' => request()->user()->id,
        ]);

        return response()->json($collection);
    }

    public function index() {
        $collections = Collection::where('user_id', request()->user()->id)->latest("id", "desc")->get();
        return response()->json($collections);
    }

    public function search($name) {
        $collections = Collection::where('user_id', request()->user()->id)->where('name', 'like', '%' . $name . '%')->latest("id", "desc")->get();
        return response()->json($collections);
    }

    public function edit($id) {
        $collection = Collection::find($id);
        if (!$collection) {
            return response()->json(['error' => 'Collection not found'], 404);
        }

        $validator = Validator::make(request()->all(), [
            'name' => 'required|string|min:3|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $collection->update([
            'name' => request('name'),
            'user_id' => request()->user()->id,
        ]);
        return response()->json($collection);
    }

    public function delete($id) {
        $collection = Collection::find($id);
        if (!$collection) {
            return response()->json(['error' => 'Collection not found'], 404);
        }

        $collection->delete();
        return response()->json(['message' => 'Collection deleted successfully']);
    }
}
