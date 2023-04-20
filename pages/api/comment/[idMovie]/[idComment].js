// pages/api/movie/[id].js
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

    // Je récupère l'ID du film depuis les paramètres d'URL
    const idMovieFromURL = req.query.idMovie;

    // Je récupère l'ID du commentaire depuis les paramètres d'URL
    const idCommentFromURL = req.query.idComment;

    // J'accède à la base de données "sample_mflix"
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const fakeCommentToInsert = {"name":"Theo & Ian",
                                "email":"theo.ian@epsi.fr",
                                "movie_id":new ObjectId(idMovieFromURL),
                                "text":"Ceci est un commentaire exceptionnel !",
                                "date":{"$date":{"$numberLong":"1029646567000"}}}

    switch (req.method) {

        case "GET":
        //Je cherche le commentaire correspondant à "idComment"
        const comment = await db.collection("comments").findOne({ _id: new ObjectId(idCommentFromURL) });

        res.json({ status: 200, data: comment });
        break;

        case "POST":

        // J'insère le commentaire dans la base de données
        const returnFromInsertion = await db.collection("comments").insertOne(fakeCommentToInsert);

        // Etant donné que la BDD ne me renvoie que l'ID du film inséré, je refait un findOne pour récupérer toute la ressource
        const commentInserted = await db.collection("comments").findOne({ _id: new ObjectId(returnFromInsertion.insertedId) });
        res.json({ status: 200, dbReturned: returnFromInsertion, data: commentInserted });

        break;

        case "PUT":

        //Je modifie l'attribut text
        const returnFromUpdate = await db.collection("comments").findOneAndUpdate(
          { _id: new ObjectId(idCommentFromURL)},
          { $set : { "text" : 'Ceci est un commentaire encore plus exceptionnel car il a été modifié :)' } },
          { returnNewDocument : true }
        );
    
        res.json({ status: 200, data: returnFromUpdate });
    
        break;

        case "DELETE":

        // Je supprime le film de la base de données
        const returnFromDeletion = await db.collection("comments").deleteOne({ _id: new ObjectId(idCommentFromURL)})

        res.json({ status: 200, data: returnFromDeletion });

        break;
  }

}  