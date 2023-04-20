// pages/api/movie/comments.js
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

// Je récupère l'ID du film depuis les paramètres d'URL
const idMovieFromURL = req.query.idMovie;

// J'accède à la base de données "sample_mflix"
const client = await clientPromise;
const db = client.db("sample_mflix");

const comments = await db.collection("comments").find({movie_id: new ObjectId(idMovieFromURL)}).limit(10).toArray();
res.json({ status: 200, data: comments });

}