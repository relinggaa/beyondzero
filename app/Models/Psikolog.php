<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Psikolog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'key',
        'image',
        'expertise',
        'description',
        'education',
        'experience',
        'approach',
        'philosophy',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'expertise' => 'array',
    ];

    /**
     * Get the image URL.
     */
    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return asset('storage/' . $this->image);
        }
        return asset('images/default-avatar.png');
    }

    /**
     * Get the bookings for the psikolog.
     */
    public function bookings()
    {
        return $this->hasMany(BookPsikolog::class);
    }
}