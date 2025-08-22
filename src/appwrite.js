import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async (search, movie) => {
  // console.log(PROJECT_ID,DATABASE_ID, COLLECTION_ID)
    try{
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.equal('searchTerm',search)
        ])

    if (result.documents.length>0){
        const doc = result.documents[0];

        await database.updateDocument(DATABASE_ID,COLLECTION_ID,doc.$id, {
            count:doc.count + 1
        })
    }else{
        await database.createDocument(DATABASE_ID,COLLECTION_ID, ID.unique(),{
            searchTerm:search,
            count:1,
            movie_id: movie.id,
            poster_url : `https://image.tmdb.org/t/p/w500${movie.poster_path}`

        })
    }

    }catch(err){
        console.log(err)
    }
}

// export const checkAppwriteConnection = async () => {
//   try {
//     const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID);
//     console.log("✅ Appwrite connection successful", result);
//   } catch (err) {
//     console.error("❌ Appwrite connection failed", err);
//   }
// };
export const getTrendingMovies = async() =>{
    try{
    const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
        Query.limit(5),
        Query.orderDesc("count")
    ])

    return result.documents.map(doc=>({
        $id:doc.$id,
        title:doc.title,
        poster_url:doc.poster_url,
        count:doc.count
    }));

}catch(err){
    console.log("Error is: ",err)
}
}