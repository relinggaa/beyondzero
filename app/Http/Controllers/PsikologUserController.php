<?php

namespace App\Http\Controllers;

use App\Models\Psikolog;
use Illuminate\Http\Request;

class PsikologUserController extends Controller
{
    /**
     * Display a listing of psychologists for users
     */
    public function index()
    {
        $psikologs = Psikolog::orderBy('created_at', 'desc')->get();
        
        return inertia('User/Psikolog', [
            'psikologs' => $psikologs
        ]);
    }
}
