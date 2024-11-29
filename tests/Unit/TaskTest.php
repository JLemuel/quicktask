<?php

namespace Tests\Unit;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_task_belongs_to_user()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $task->user);
        $this->assertEquals($user->id, $task->user->id);
    }

    public function test_task_dates_are_cast_correctly()
    {
        $task = Task::factory()->create([
            'due_date' => '2024-12-31'
        ]);

        $this->assertIsObject($task->due_date);
        $this->assertEquals('2024-12-31', $task->due_date->format('Y-m-d'));
    }

    public function test_completed_is_cast_to_boolean()
    {
        $task = Task::factory()->create([
            'completed' => 1
        ]);

        $this->assertIsBool($task->completed);
        $this->assertTrue($task->completed);
    }
}
