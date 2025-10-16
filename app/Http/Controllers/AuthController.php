<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Show login form
     */
    public function showLogin()
    {
        return inertia('Auth/LoginUser');
    }

    /**
     * Handle user login
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('username', 'password'), $request->boolean('remember'))) {
            $request->session()->regenerate();
            
            // Redirect based on user role
            if (Auth::user()->role === 'admin') {
                return redirect()->intended('/admin');
            }
            
            return redirect()->intended('/dashboard');
        }

        throw ValidationException::withMessages([
            'username' => __('auth.failed'),
        ]);
    }

    /**
     * Show register form
     */
    public function showRegister()
    {
        return inertia('Auth/RegisterUser');
    }

    /**
     * Handle user registration
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try {
            $user = User::create([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'user', // Default role for user registration
            ]);

            Auth::login($user);

            return redirect('/dashboard');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'])->withInput();
        }
    }

    /**
     * Handle admin login
     */
    public function adminLogin(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('username', 'password'), $request->boolean('remember'))) {
            $request->session()->regenerate();
            
            // Check if user is admin
            if (Auth::user()->role !== 'admin') {
                Auth::logout();
                throw ValidationException::withMessages([
                    'username' => 'Akses ditolak. Hanya admin yang dapat masuk.',
                ]);
            }
            
            return redirect()->intended('/admin');
        }

        throw ValidationException::withMessages([
            'username' => __('auth.failed'),
        ]);
    }

    /**
     * Handle admin registration
     */
    public function adminRegister(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try {
            $user = User::create([
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'admin',
            ]);

            Auth::login($user);

            return redirect('/admin');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan saat mendaftar admin. Silakan coba lagi.'])->withInput();
        }
    }

    /**
     * Handle logout
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}