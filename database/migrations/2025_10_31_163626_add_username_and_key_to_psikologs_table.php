<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add columns if they don't exist
        if (!Schema::hasColumn('psikologs', 'username')) {
            Schema::table('psikologs', function (Blueprint $table) {
                $table->string('username')->nullable()->after('name');
            });
        }

        if (!Schema::hasColumn('psikologs', 'key')) {
            Schema::table('psikologs', function (Blueprint $table) {
                $table->string('key', 6)->nullable()->after('username');
            });
        }

        // Update existing records with null or empty values
        DB::table('psikologs')
            ->whereNull('username')
            ->orWhere('username', '')
            ->update(['username' => DB::raw("CONCAT('psikolog_', id)")]);
        
        DB::table('psikologs')
            ->whereNull('key')
            ->orWhere('key', '')
            ->update(['key' => DB::raw("UPPER(SUBSTRING(MD5(CONCAT(id, NOW())), 1, 6))")]);

        // Check and add unique constraints only if they don't exist
        $dbName = DB::getDatabaseName();
        
        try {
            $usernameIndexExists = DB::selectOne(
                "SELECT COUNT(*) as count FROM information_schema.statistics 
                 WHERE table_schema = ? 
                 AND table_name = 'psikologs' 
                 AND index_name = 'psikologs_username_unique'",
                [$dbName]
            );
            
            if ($usernameIndexExists && $usernameIndexExists->count == 0) {
                Schema::table('psikologs', function (Blueprint $table) {
                    $table->unique('username', 'psikologs_username_unique');
                });
            }
        } catch (\Exception $e) {
            // If check fails, try to add index anyway (will fail gracefully if exists)
            try {
                Schema::table('psikologs', function (Blueprint $table) {
                    $table->unique('username', 'psikologs_username_unique');
                });
            } catch (\Exception $ex) {
                // Index already exists, ignore
            }
        }

        try {
            $keyIndexExists = DB::selectOne(
                "SELECT COUNT(*) as count FROM information_schema.statistics 
                 WHERE table_schema = ? 
                 AND table_name = 'psikologs' 
                 AND index_name = 'psikologs_key_unique'",
                [$dbName]
            );
            
            if ($keyIndexExists && $keyIndexExists->count == 0) {
                Schema::table('psikologs', function (Blueprint $table) {
                    $table->unique('key', 'psikologs_key_unique');
                });
            }
        } catch (\Exception $e) {
            // If check fails, try to add index anyway (will fail gracefully if exists)
            try {
                Schema::table('psikologs', function (Blueprint $table) {
                    $table->unique('key', 'psikologs_key_unique');
                });
            } catch (\Exception $ex) {
                // Index already exists, ignore
            }
        }

        // Make columns not nullable if they are nullable
        $usernameColumn = DB::select("SHOW COLUMNS FROM psikologs WHERE Field = 'username'");
        if (!empty($usernameColumn) && $usernameColumn[0]->Null === 'YES') {
            Schema::table('psikologs', function (Blueprint $table) {
                $table->string('username')->nullable(false)->change();
            });
        }

        $keyColumn = DB::select("SHOW COLUMNS FROM psikologs WHERE Field = 'key'");
        if (!empty($keyColumn) && $keyColumn[0]->Null === 'YES') {
            Schema::table('psikologs', function (Blueprint $table) {
                $table->string('key', 6)->nullable(false)->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('psikologs', function (Blueprint $table) {
            if (Schema::hasColumn('psikologs', 'key')) {
                $table->dropColumn('key');
            }
            if (Schema::hasColumn('psikologs', 'username')) {
                $table->dropColumn('username');
            }
        });
    }
};
