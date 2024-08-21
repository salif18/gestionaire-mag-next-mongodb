// import db from "@/lib/db";
import dbConnect from "@/lib/mongoosedb";
import { NextResponse } from "next/server";
import Vente from "../models/ventes"; // Assurez-vous d'avoir un modèle Vente

export const POST = async (req) => {
    const { id, nom, categories, prixAchat, prixVente, stocks, qty, timestamps } = await req.json();

    try {
      await dbConnect();
      
        const vente = new Vente({ id, nom, categories, prixAchat, prixVente, stocks, qty, timestamps });

        const savedVente = await vente.save();

        return NextResponse.json(
            { message: 'Vente effectuée avec succès !!', results: savedVente },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: 'Erreur lors de la sauvegarde de la vente', error: err },
            { status: 500 }
        );
    }
};

// Route pour obtenir toutes les ventes
export const GET = async (req, res) => {
    try {
      await dbConnect();
        const ventes = await Vente.find().sort({ timestamps: -1 });

        return NextResponse.json(
            { message: "ok", results: ventes },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Erreur lors de la récupération des ventes", error: err },
            { status: 500 }
        );
    }
};


// export const POST = async(req)=>{
//     const { id, nom, categories, prixAchat, prixVente, stocks, qty, timestamps} = await req.json();
//     const sql = 'INSERT INTO vente set ?';
//     const ventes= {
//         id:id,
//         nom:nom,
//         categories:categories,
//         prixAchat:prixAchat,
//         prixVente:prixVente,
//         stocks:stocks,
//         qty:qty,
//         timestamps:timestamps
//     }
//     try{
//         const results = await new Promise((reject,resolve)=>{
//             db.query(sql,[ventes],(err,result)=>{
//               if(err){
//                  reject(err)
//               }else{
//                 resolve(result)
//               }
//             })
//         })
//         return NextResponse.json(
//             {message:'Vente effectuée avec succès !!s', results},
//             {status:201}
//         )
//     }catch(err){
//         return NextResponse.json(
//             {message:'err',erro:err},
//             {status:500}
//         )
//     } 
// }

// //route pour obtenir tous
// export const GET = async (req, res) => {
//     try {
//       const sql = 'SELECT * FROM vente ORDER BY timestamps DESC';
//       const results = await new Promise((resolve, reject) => {
//         db.query(sql, (err, result) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(result);
//           }
//         });
//       });
//       return NextResponse.json({ message: "ok", results }, { status: 200 });
//     } catch (err) {
//       return NextResponse.json({ message: "err" }, { status: 500 });
//     }
//   };
  

  
 