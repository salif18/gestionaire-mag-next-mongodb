import dbConnect from "../../../lib/mongoosedb";
import Vente from "../../models/ventes"; // Assurez-vous d'avoir un modèle Vente
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
      await dbConnect()
        const results = await Vente.aggregate([
            {
                $group: {
                    _id: { nom: "$nom", categories: "$categories" },
                    total_vendu: { $sum: "$qty" }
                }
            },
            {
                $sort: { total_vendu: -1 } // Trier par total_vendu en ordre décroissant
            }
        ]);

        return NextResponse.json(
            { message: 'ok', results },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { error: 'Une erreur s\'est produite lors de la récupération des statistiques de vente.', message: err.message },
            { status: 500 }
        );
    }
};


// import db from "@/lib/db"
// import { NextResponse } from "next/server"


//  //obternir le total vendue par categories
//  export const GET = async(req,res) => {
//     const sql = `SELECT nom,categories, 
//                      SUM(qty) as total_vendu 
//                      FROM vente 
//                      GROUP BY nom ,categories
//                      ORDER BY total_vendu DESC  `
//     try{
//       const results = await new Promise((resolve,reject) => {
//         db.query(sql,(err,result)=>{
//           if(err){
//             reject(err)
//           }else{
//             resolve(result)
//           }
//         })
//       })
//       return NextResponse.json(
//         {message:'ok',results},
//         {status:200}
//         );
//     }catch(err){
//         return NextResponse.json(
//             { error: 'Une erreur s\'est produite lors de la récupération des statistiques de vente.',results },
//             {status:500});
//         }
//   }