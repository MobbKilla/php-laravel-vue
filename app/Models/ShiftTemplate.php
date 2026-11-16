<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'description', 'start_time', 'end_time'])]
class ShiftTemplate extends Model
{
    /** @use HasFactory<\Database\Factories\ShiftTemplateFactory> */
    use HasFactory;
}
