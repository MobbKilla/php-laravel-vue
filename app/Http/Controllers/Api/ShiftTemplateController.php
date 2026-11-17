<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreShiftTemplateRequest;
use App\Http\Resources\ShiftTemplateResource;
use App\Models\ShiftTemplate;

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
    public function store(StoreShiftTemplateRequest $request)
    {
        $shiftTemplate = ShiftTemplate::create($request->validated());
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
    public function update(StoreShiftTemplateRequest $request, ShiftTemplate $shiftTemplate)
    {
        $shiftTemplate->update($request->validated());
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
