import dbConnect from "@/lib/mongoosedb";
// Assurez-vous d'avoir un modèle Vente
import { NextResponse } from "next/server";
import Vente from "../../models/ventes"; 

export const DELETE = async (req) => {
    try {
        await dbConnect()
        const id = req.url.split('ventes/')[1];
        
        // Trouver et supprimer la vente par ID
        const vente = await Vente.findByIdAndDelete(id);

        if (!vente) {
            return NextResponse.json({ message: 'Vente non trouvée' }, { status: 404 });
        }

        return NextResponse.json(
            { message: 'La vente a été annulée avec succès !!', results: vente },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: 'Erreur lors de l\'annulation de la vente', error: err.message },
            { status: 500 }
        );
    }
};

// const { default: db } = require("@/lib/db")
// const { NextResponse } = require("next/server")


// export const DELETE = async(req,res) => {
//     const id = req.url.split('ventes/')[1]
//     const sql =`DELETE FROM vente WHERE id = ?`
//     try{
//         const results = await new Promise((reject,resolve)=>{
//     db.query(sql,[id] ,(err,result)=>{
//        if(err){
//         reject(err)
//        }else{
//         resolve(result)
//        }
//     })  
// })
// return NextResponse.json(
//     {message:'La vente a été annulée avec succès !!',results},
//     {status:200}
//     )
//   }catch(err){
//     return NextResponse.json(
//         {message:'err',error:err},
//         {status:500}
//     )
//   }
//   }
  
  