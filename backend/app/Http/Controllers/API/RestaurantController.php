<?php

namespace App\Http\Controllers\API;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class RestaurantController extends Controller
{
    public function index()
    {
        $restaurant = Restaurant::all();
        return response()->json([
            'status' => 200,
            'restaurant' => $restaurant,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|max:255',
                'phone' => 'required|numeric|max:9999999999|min:0000000000',
                'email' => 'required|max:255',
                'detail' => 'required',
                'image' => 'required',
            ]
        );

        if($validator->fails()) {
            return response()->json([
                'validate_err'=> $validator->messages(),
            ]);
        }
        else{
                $restaurant = new Restaurant;
                $restaurant->name = $request->input('name');
                $restaurant->phone = $request->input('phone');
                $restaurant->email = $request->input('email');
                $restaurant->detail = $request->input('detail');
                $image = $request->file('image');
                $storedPath = $image->move('images', $image->getClientOriginalName());
                $restaurant->image = $storedPath;
                $restaurant->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Store OK',
        ]);
        }

        
    }
    
    public function edit($id)
    {
        $restaurant = Restaurant::find($id);
        if($restaurant)
        {
            return response()->json([
                'status' => 200,
                'restaurant' => $restaurant,
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'Restaurant ID Not Found',
            ]);
        }
        
    }
    public function update(Request $request,$id)
    {
        // $validator = Validator::make(
        //     $request->all(),
        //     [
        //         'name' => 'required|max:255',
        //         'phone' => 'required|numeric|max:9999999999|min:0000000000',
        //         'email' => 'required|max:255',
        //         'detail' => 'required',
        //         'image' => 'required',
        //     ]
        // );

        // if($validator->fails()) {
        //     return response()->json([
        //         'validate_err'=> $validator->messages(),
        //     ]);
        // }
        // else
        // {
                $restaurant = Restaurant::find($id);
                if($restaurant)
                {
                    $restaurant->name = $request->input('name');
                    $restaurant->phone = $request->input('phone');
                    $restaurant->email = $request->input('email');
                    $restaurant->detail = $request ->input('detail');
                    $image = $request->file('image');
                    $storedPath = $image->move('images', $image->getClientOriginalName());
                    $restaurant->image = $storedPath;
                    $restaurant->update();
                    return response()->json([
                        'status' => 200,
                        'message' => 'Update OK',
                    ]);
                }
                else{
                    return response()->json([
                        'status' => 404,
                        'message' => 'Restaurant ID Not Found',
                    ]);
                }
        // }
    }

    public function destroy($id){
        $restaurant = Restaurant::find($id);
        $restaurant->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Delete OK',
        ]);
    }
    public function show($id)
    {
        $restaurant = Restaurant::find($id);
        return response()->json([
            'status' => 200,
            'restaurant' => $restaurant,
        ]);
    }
}
