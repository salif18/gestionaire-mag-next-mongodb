import dbConnect from "../../../../lib/mongoosedb";
import middlewareAuthenticate from "../../../middlewares/auth";
import Depense from "../../../models/depenses"; // Assurez-vous d'avoir un modèle Depense
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
    try {
        await dbConnect()
        await middlewareAuthenticate(req);
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop(); 

        // Supprimer la dépense par son ID
        const results = await Depense.findByIdAndDelete(id);

        if (!results) {
            return NextResponse.json(
                { message: 'Dépense non trouvée' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Dépense supprimée avec succès !!', results },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: 'Une erreur s\'est produite', error: err.message },
            { status: 500 }
        );
    }
}

// const { default: db } = require("@/lib/db");
// const { NextResponse } = require("next/server");

// export const DELETE = async(req,res)=> {
//     const id = req.url.split('depenses/')[1];
//     try{
//       const results = await new Promise((resolve,reject)=>{
//         db.query('DELETE FROM depenses WHERE id = ?',[id],(err,results)=>{
//             if(err){
//                 reject(err)
//             }else{
//                 resolve(results)
//             }
//         })
//       });
//       return NextResponse.json(
//         {message:'Dépense supprimée avec succès !!',results},
//         {status:200})
//     }catch(err){
//         return NextResponse.json(
//             {message:'err',error:err},
//             {status:500})
//     }
// }