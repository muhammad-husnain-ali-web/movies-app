import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {

    
    const body = await request.json();
    const movieName = body.movieName;

    if (!movieName) {
      return NextResponse.json(
        {message: "Missing movieName"},
        {status: 400}
      )
    }
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("movies");


    const result = await collection.findOne({ Movie: movieName });

    if (!result) {
      return NextResponse.json(
        {message: "Movie not found"},
        {status: 400}
      )
    }
    return NextResponse.json(
        { MovieUrl: result.MovieUrl },
        {status: 200}
      )
    }
    catch (error) {
        return NextResponse.json(
          { message: "Server error" },
          { status: 500 }
        );
      }
    }