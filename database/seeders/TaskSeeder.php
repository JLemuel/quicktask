<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        // Create 10 users with 3-5 tasks each
        User::factory(10)
            ->has(
                Task::factory()
                    ->count(fake()->numberBetween(3, 5))
            )
            ->create();

        // Create some additional tasks with specific states
        User::all()->each(function ($user) {
            // Create 1-2 completed tasks
            Task::factory()
                ->count(fake()->numberBetween(1, 2))
                ->completed()
                ->for($user)
                ->create();

            // Create 1-2 tasks due soon
            Task::factory()
                ->count(fake()->numberBetween(1, 2))
                ->dueSoon()
                ->for($user)
                ->create();
        });
    }
}
