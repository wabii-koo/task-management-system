<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in-progress,completed',
            'due_date' => 'nullable|date|after_or_equal:today',
        ];

        // For update, make fields optional
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['title'] = 'sometimes|string|max:255';
            $rules['status'] = 'sometimes|in:pending,in-progress,completed';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Task title is required',
            'status.in' => 'Status must be pending, in-progress, or completed',
            'due_date.after_or_equal' => 'Due date cannot be in the past',
        ];
    }
}