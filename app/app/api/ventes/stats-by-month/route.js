import dbConnect from "@/lib/mongoosedb";
import Vente from "../../models/ventes"; // Assurez-vous d'avoir un modèle Vente
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
      await dbConnect()
        const results = await Vente.aggregate([
            {
                $group: {
                    _id: {
                        annee: { $year: "$timestamps" },
                        mois: { $month: "$timestamps" }
                    },
                    nombre_ventes: { $sum: 1 },
                    total_ventes: { $sum: { $multiply: ["$prixVente", "$qty"] } }
                }
            },
            {
                $sort: { "_id.annee": 1, "_id.mois": 1 }
            },
            {
                $project: {
                    _id: 0,
                    annee: "$_id.annee",
                    mois: "$_id.mois",
                    nombre_ventes: 1,
                    total_ventes: 1
                }
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

// import db from "@/lib/db";
// import { NextResponse } from "next/server";


//   //obtenir total vendues par mois et annee
//   export const GET = async (req, res) => {
//     try {
//       const sql =`
//         SELECT
//           YEAR(timestamps) AS annee,
//           MONTH(timestamps) AS mois,
//           COUNT(*) AS nombre_ventes,
//           SUM(prixVente * qty) AS total_ventes
//           FROM vente
//           GROUP BY annee, mois
//           ORDER BY annee, mois;
//       `;
      
//       const results = await new Promise((resolve,reject)=>{
//           db.query(sql,(err,results)=>{
//             if(err){
//               reject(err)
//             }else{
//               resolve(results)
//             }
//           })
//       })
//       return NextResponse.json(
//         {message:'ok',results},
//         {status:200}
//         );
//     } catch (err) {
//       return NextResponse.json(
//         { error: 'Une erreur s\'est produite lors de la récupération des statistiques de vente.',results },
//         {status:500});
//     }
//   }