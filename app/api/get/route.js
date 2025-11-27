import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;

    // Use correct DB and Collection
    const db = client.db(process.env.MONGODB_DB);     // moviesDB
    const collection = db.collection("movies");       // movies collection

    const movies = await collection.find({}).toArray();
    console.log(movies)

    const sanitizedMovies = movies.map(({ MovieUrl, MovieId, _id, ...rest }) => rest);

    return NextResponse.json(sanitizedMovies, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}




export async function POST(request) {
  try {

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("movies");

    const body = await request.json();
    const movieName = body.movieName;

    if (!movieName) {
      return Response.json({ error: "Missing movieName" }, { status: 400 });
    }

    const result = await collection.findOne(
      { Movie: movieName },
      { projection: { MovieUrl: 0, MovieId: 0, _id: 0 } }
    );

    if (!result) {
      return NextResponse.json(
        { message: "Movie not found" },
        { status: 404 });
    }

    return NextResponse.json(
      result,
      {status: 200}
    );
  }
  catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}