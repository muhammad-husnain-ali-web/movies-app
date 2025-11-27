import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection("movies");

  const body = await request.json();
  const movieName = body.search;

  if (!movieName) {
    return NextResponse.json(
        { message: "Missing movieName" },
        { status: 400 }
      )
  }

  const result = await collection.find(
    { Movie: { $regex: movieName, $options: "i" } },
    { projection: { MovieUrl: 0, MovieId: 0, _id: 0, MovieDetails: 0 } }
  ).toArray();

  if (!result || result.length === 0) {
    return NextResponse.json(
        { success: false, message: "Movie not found" },
        { status: 400 }
      )
  }

  return NextResponse.json(
        { success: true, result },
        { status: 400 }
      )
}
