<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'due_date',
        'user_id'
    ];

    protected $casts = [
        'due_date' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }

  
    public function scopeUserTasks($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

 
    public function scopeWithUser($query)
    {
        return $query->with('user');
    }
}