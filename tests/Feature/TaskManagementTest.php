<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_their_tasks()
    {
        $user = User::factory()->create();
        $tasks = Task::factory(3)->create(['user_id' => $user->id]);
        
        $response = $this->actingAs($user)
            ->get('/tasks');
            
        $response->assertStatus(200)
            ->assertInertia(fn ($assert) => $assert
                ->component('Tasks/Index')
                ->has('tasks.data', 3)
            );
    }

    public function test_user_cannot_view_others_tasks()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user2->id]);

        $response = $this->actingAs($user1)
            ->get("/tasks/{$task->id}");

        $response->assertStatus(403);
    }

    public function test_user_can_create_task()
    {
        $user = User::factory()->create();
        
        $taskData = [
            'title' => 'New Test Task',
            'description' => 'Test Description',
            'due_date' => '2024-12-31',
        ];

        $response = $this->actingAs($user)
            ->post('/tasks', $taskData);

        $response->assertRedirect();
        $this->assertDatabaseHas('tasks', [
            'title' => 'New Test Task',
            'user_id' => $user->id
        ]);
    }

    public function test_user_can_update_task()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);
        
        $updatedData = [
            'title' => 'Updated Task Title',
            'description' => 'Updated Description',
            'due_date' => '2024-12-31',
            'completed' => true
        ];

        $response = $this->actingAs($user)
            ->patch("/tasks/{$task->id}", $updatedData);

        $response->assertRedirect();
        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated Task Title',
            'completed' => true
        ]);
    }

    public function test_user_can_delete_task()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)
            ->delete("/tasks/{$task->id}");

        $response->assertRedirect();
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    public function test_user_can_toggle_task_completion()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create([
            'user_id' => $user->id,
            'completed' => false
        ]);

        $response = $this->actingAs($user)
            ->patch("/tasks/{$task->id}/toggle-complete");

        $response->assertRedirect();
        $this->assertTrue($task->fresh()->completed);
    }
}
