<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RestaurantController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('restaurant',[RestaurantController::class,'index']);
Route::post('/Add',[RestaurantController::class,'store']);
Route::get('/Edit/{id}',[RestaurantController::class,'edit']);
Route::put('EditDone/{id}',[RestaurantController::class,'update']);
Route::delete('Delete/{id}',[RestaurantController::class,'destroy']);
Route::get('/Show/{id}',[RestaurantController::class,'show']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
