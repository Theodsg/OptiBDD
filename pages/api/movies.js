import clientPromise from "../../lib/mongodb";


export default async function handler(req, res) {

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch(req.method){
        
        case "POST":
           res.json({ status: 200, data: "Salut les zamis"});
        

        case "GET":
            const movies = await db.collection("movies").find({}).limit(10).toArray();
            res.json({ status: 200, data: movies });

    }


}