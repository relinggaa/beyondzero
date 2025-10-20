<?php

namespace App\Http\Controllers;

use App\Models\ChatSession;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ChatController extends Controller
{
    /**
     * Display a listing of the user's chat sessions.
     */
    public function index()
    {
        $chatSessions = ChatSession::where('user_id', Auth::id())
            ->with(['messages' => function($query) {
                $query->orderBy('timestamp', 'asc');
            }])
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $chatSessions
        ]);
    }

    /**
     * Store a newly created chat session.
     */
    public function storeSession(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'mood' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $chatSession = ChatSession::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'mood' => $request->mood,
            'is_active' => true,
        ]);

        return response()->json([
            'success' => true,
            'data' => $chatSession
        ]);
    }

    /**
     * Get messages for a specific chat session.
     */
    public function getMessages($sessionId)
    {
        $chatSession = ChatSession::where('user_id', Auth::id())
            ->where('id', $sessionId)
            ->with(['messages' => function($query) {
                $query->orderBy('timestamp', 'asc');
            }])
            ->first();

        if (!$chatSession) {
            return response()->json([
                'success' => false,
                'message' => 'Chat session tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $chatSession
        ]);
    }

    /**
     * Store a new message in a chat session.
     */
    public function storeMessage(Request $request, $sessionId)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:user,ai',
            'message' => 'required|string',
            'timestamp' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $chatSession = ChatSession::where('user_id', Auth::id())
            ->where('id', $sessionId)
            ->first();

        if (!$chatSession) {
            return response()->json([
                'success' => false,
                'message' => 'Chat session tidak ditemukan'
            ], 404);
        }

        $message = ChatMessage::create([
            'chat_session_id' => $sessionId,
            'type' => $request->type,
            'message' => $request->message,
            'timestamp' => $request->timestamp ? Carbon::parse($request->timestamp) : now(),
        ]);

        // Update chat session's updated_at timestamp
        $chatSession->touch();

        return response()->json([
            'success' => true,
            'data' => $message
        ]);
    }

    /**
     * Update the specified chat session.
     */
    public function updateSession(Request $request, $sessionId)
    {
        $chatSession = ChatSession::where('user_id', Auth::id())
            ->where('id', $sessionId)
            ->first();

        if (!$chatSession) {
            return response()->json([
                'success' => false,
                'message' => 'Chat session tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'mood' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $chatSession->update($request->only(['title', 'mood', 'is_active']));

        return response()->json([
            'success' => true,
            'data' => $chatSession
        ]);
    }

    /**
     * Remove the specified chat session.
     */
    public function destroySession($sessionId)
    {
        $chatSession = ChatSession::where('user_id', Auth::id())
            ->where('id', $sessionId)
            ->first();

        if (!$chatSession) {
            return response()->json([
                'success' => false,
                'message' => 'Chat session tidak ditemukan'
            ], 404);
        }

        $chatSession->delete();

        return response()->json([
            'success' => true,
            'message' => 'Chat session berhasil dihapus'
        ]);
    }

    /**
     * Get or create active chat session for user.
     */
    public function getActiveSession()
    {
        $activeSession = ChatSession::where('user_id', Auth::id())
            ->where('is_active', true)
            ->with(['messages' => function($query) {
                $query->orderBy('timestamp', 'asc');
            }])
            ->first();

        if (!$activeSession) {
            // Create new active session
            $activeSession = ChatSession::create([
                'user_id' => Auth::id(),
                'title' => 'Curhat Baru',
                'mood' => null,
                'is_active' => true,
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $activeSession
        ]);
    }
}
