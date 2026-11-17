<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ShiftTemplateController;
use App\Http\Controllers\Api\EmployeeController;

Route::apiResource('employees', EmployeeController::class);
Route::apiResource('shift-templates', ShiftTemplateController::class);
