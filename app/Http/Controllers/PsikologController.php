<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Psikolog;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class PsikologController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $psikologs = Psikolog::orderBy('created_at', 'desc')->get();
        $admin = auth()->user();
        return inertia('Admin/TambahDataPsikolog', [
            'psikologs' => $psikologs,
            'admin' => $admin
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:psikologs,username',
            'key' => 'required|string|size:6|unique:psikologs,key',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'expertise' => 'required|array|min:1',
            'expertise.*' => 'required|string|max:255',
            'description' => 'required|string',
            'education' => 'required|string',
            'experience' => 'required|string',
            'approach' => 'required|string',
            'philosophy' => 'required|string',
        ]);

        try {
            // Handle image upload
            $imagePath = $request->file('image')->store('psikologs', 'public');

            $psikolog = Psikolog::create([
                'name' => $request->name,
                'username' => $request->username,
                'key' => $request->key,
                'image' => $imagePath,
                'expertise' => $request->expertise,
                'description' => $request->description,
                'education' => $request->education,
                'experience' => $request->experience,
                'approach' => $request->approach,
                'philosophy' => $request->philosophy,
            ]);

            Log::info('Psikolog created successfully', ['psikolog_id' => $psikolog->id]);

            return redirect()->back()->with('success', 'Data psikolog berhasil ditambahkan!');
        } catch (\Exception $e) {
            Log::error('Error creating psikolog', ['error' => $e->getMessage()]);
            return redirect()->back()->withErrors(['error' => 'Gagal menambahkan data psikolog. Silakan coba lagi.']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Psikolog $psikolog)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:psikologs,username,' . $psikolog->id,
            'key' => 'required|string|size:6|unique:psikologs,key,' . $psikolog->id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'expertise' => 'required|array|min:1',
            'expertise.*' => 'required|string|max:255',
            'description' => 'required|string',
            'education' => 'required|string',
            'experience' => 'required|string',
            'approach' => 'required|string',
            'philosophy' => 'required|string',
        ]);

        try {
            $updateData = [
                'name' => $request->name,
                'username' => $request->username,
                'key' => $request->key,
                'expertise' => $request->expertise,
                'description' => $request->description,
                'education' => $request->education,
                'experience' => $request->experience,
                'approach' => $request->approach,
                'philosophy' => $request->philosophy,
            ];

            // Handle image update if new image is provided
            if ($request->hasFile('image')) {
                // Delete old image
                if ($psikolog->image && Storage::disk('public')->exists($psikolog->image)) {
                    Storage::disk('public')->delete($psikolog->image);
                }
                
                // Store new image
                $imagePath = $request->file('image')->store('psikologs', 'public');
                $updateData['image'] = $imagePath;
            }

            $psikolog->update($updateData);

            Log::info('Psikolog updated successfully', ['psikolog_id' => $psikolog->id]);

            return redirect()->back()->with('success', 'Data psikolog berhasil diperbarui!');
        } catch (\Exception $e) {
            Log::error('Error updating psikolog', ['error' => $e->getMessage()]);
            return redirect()->back()->withErrors(['error' => 'Gagal memperbarui data psikolog. Silakan coba lagi.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Psikolog $psikolog)
    {
        try {
            // Delete image file
            if ($psikolog->image && Storage::disk('public')->exists($psikolog->image)) {
                Storage::disk('public')->delete($psikolog->image);
            }

            $psikolog->delete();

            Log::info('Psikolog deleted successfully', ['psikolog_id' => $psikolog->id]);

            return redirect()->back()->with('success', 'Data psikolog berhasil dihapus!');
        } catch (\Exception $e) {
            Log::error('Error deleting psikolog', ['error' => $e->getMessage()]);
            return redirect()->back()->withErrors(['error' => 'Gagal menghapus data psikolog. Silakan coba lagi.']);
        }
    }
}
