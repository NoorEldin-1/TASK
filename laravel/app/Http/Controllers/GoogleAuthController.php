<?php

namespace App\Http\Controllers;

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class GoogleAuthController extends Controller
{
    public function redirect() {
        return Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
    }
    public function callback() {
        try {

            $googleUser = Socialite::driver('google')->stateless()->user();
            $user = User::where('google_id', $googleUser->id)->first();

            if (!$user) {
                $user = User::where('email', $googleUser->email)->first();
                if ($user) {
                    $user->google_id = $googleUser->id;
                    $user->save();
                }else {
                    $user = User::create([
                        'name' => $googleUser->name,
                        'email' => $googleUser->email,
                        'google_id' => $googleUser->id,
                        'password' => Hash::make(Str::random(10)),
                        'email_verified_at' => now(),
                    ]);
                }
            }

            $token = $user->createToken('auth_token')->plainTextToken;
            $frontendUrl = 'http://localhost:5173/google-callback?token=' . $token . '&name=' . $user->name;
            return redirect($frontendUrl);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
    public function logout() {
        request()->user()->tokens()->delete();
    }
}
