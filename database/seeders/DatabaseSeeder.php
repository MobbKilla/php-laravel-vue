<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\ShiftTemplate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Employee::factory(15)->create();

        ShiftTemplate::factory()->createMany([
            [
                'name' => 'Утро',
                'start_time' => '06:00:00',
                'end_time' => '14:00:00',
            ],
            [
                'name' => 'День',
                'start_time' => '12:00:00',
                'end_time' => '20:00:00',
            ],
            [
                'name' => 'Вечер',
                'start_time' => '16:00:00',
                'end_time' => '00:00:00',
            ],
        ]);
    }
}
