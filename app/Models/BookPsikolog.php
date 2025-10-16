<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookPsikolog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'psikolog_id',
        'appointment_date',
        'appointment_time',
        'session_type',
        'notes',
        'status',
    ];

    protected $casts = [
        'appointment_date' => 'date',
        'appointment_time' => 'datetime:H:i',
    ];

    /**
     * Get the user that owns the booking.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the psikolog that is booked.
     */
    public function psikolog(): BelongsTo
    {
        return $this->belongsTo(Psikolog::class);
    }
}