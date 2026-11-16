<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ShiftTemplateResource;
use App\Models\ShiftTemplate;
use Illuminate\Http\Request;

class ShiftTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ShiftTemplateResource::collection(ShiftTemplate::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $shiftTemplate = ShiftTemplate::create($request->all());
        return new ShiftTemplateResource($shiftTemplate);
    }

    /**
     * Display the specified resource.
     */
    public function show(ShiftTemplate $shiftTemplate)
    {
        return new ShiftTemplateResource($shiftTemplate);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ShiftTemplate $shiftTemplate)
    {
        $shiftTemplate->update($request->all());
        return new ShiftTemplateResource($shiftTemplate);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShiftTemplate $shiftTemplate)
    {
        $shiftTemplate->delete();
        return response()->noContent();
    }
}
