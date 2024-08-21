import dbConnect from "../../lib/mongoosedb";
import Depense from "../models/depenses"; // Assurez-vous d'avoir un modèle Depense
import { NextResponse } from "next/server";


export const POST = async (req) => {
    try {
        await dbConnect()
        const { montants, motifs} = await req.json();

        // Créer une nouvelle dépense
        const nouvelleDepense = new Depense({
            montants: montants,
            motifs: motifs,
        });

        // Sauvegarder dans la base de données
        const results = await nouvelleDepense.save();

        return NextResponse.json(
            { message: 'Dépense enregistrée avec succès !!', results },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        );
    }
}


export const GET = async (req) => {
    try {
        await dbConnect()
        // Récupérer toutes les dépenses triées par date de création décroissante
        const results = await Depense.find().sort({ timestamps: -1 });

        return NextResponse.json(
            { message: 'ok', results },
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

// export const POST = async(req,res)=> {
//     const {montants, motifs} = await req.json();
//     const depenses = {
//         montants:montants, 
//         motifs:motifs
//     }
//     try{
//       const results = await new Promise((resolve,reject)=>{
//         db.query(`INSERT INTO depenses set ?`,depenses,(err,results)=>{
//             if(err){
//                 reject(err)
//             }else{ 
//                 resolve(results)
//             }
//         })
//       });
      
//       return NextResponse.json(
//         {message:'Dépense enregistrée avec succès !!',results},
//         {status:201})
//     }catch(err){
//       return NextResponse.json(
//             {message:err.message},
//             {status:500}
//             )
//     }
// }

// export const GET = async(req,res)=> {
//     try{
//       const results = await new Promise((resolve,reject)=>{
//         db.query('SELECT*FROM depenses ORDER BY timestamps DESC',(err,results)=>{
//             if(err){
//                 reject(err)
//             }else{
//                 resolve(results)
//             }
//         })
//       });
//       return NextResponse.json(
//         {message:'ok',results},{status:200})
//     }catch(err){
//         return NextResponse.json(
//             {message:'error',error:err},{status:500})
//     }
// }

