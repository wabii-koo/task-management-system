<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = auth()->login($user);

        return response()->json([
            'message' => 'User registered successfully',
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role, 
            ]
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->only(['email', 'password']);

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'error' => 'Invalid credentials'
            ], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => [
                'id' => auth()->user()->id,
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'role' => auth()->user()->role, 
            ]
        ]);
    }

    public function logout(): JsonResponse
    {
        auth()->logout();
        
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function me(): JsonResponse
    {
        return response()->json([
            'user' => [
                'id' => auth()->user()->id,
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'role' => auth()->user()->role, 
            ]
        ]);
    }

    public function refresh(): JsonResponse
    {
        return response()->json([
            'access_token' => auth()->refresh(),
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }

    public function getAllUsers(): JsonResponse 
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Admin access required'], 403);
        }

        $users = User::select('id', 'name', 'email', 'role', 'created_at')->get();
        
        return response()->json([
            'users' => $users,
            'total' => $users->count()
        ]);
    }

    /**
     * Delete user (Admin only)
     */
    public function deleteUser($id): JsonResponse
    {
        // Check if user is admin
        if (auth()->user()->role !== 'admin') {
            return response()->json([
                'error' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        // Prevent users from deleting themselves
        if (auth()->id() == $id) {
            return response()->json([
                'error' => 'You cannot delete your own account.'
            ], 403);
        }

        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'error' => 'User not found.'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully.'
        ]);
    }

    /**
     * Update user status (Admin only)
     */
    public function updateUserStatus(Request $request, $id): JsonResponse
    {
        // Check if user is admin
        if (auth()->user()->role !== 'admin') {
            return response()->json([
                'error' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        // Prevent users from updating their own status
        if (auth()->id() == $id) {
            return response()->json([
                'error' => 'You cannot change your own status.'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:active,inactive'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 422);
        }

        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'error' => 'User not found.'
            ], 404);
        }

        $user->update([
            'status' => $request->status
        ]);

        return response()->json([
            'message' => 'User status updated successfully.',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status
            ]
        ]);
    }
}