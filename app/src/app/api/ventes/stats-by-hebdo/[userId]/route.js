import moment from "moment";
import dbConnect from "../../../../lib/mongoosedb";
import Vente from "../../../models/ventes";
import { NextResponse } from "next/server";
import mongoose from "mongoose"; 
export const GET = async (req) => {
  await dbConnect();

  try {

    const url = new URL(req.url);
    const userId = url.pathname.split('/').pop(); 

    const startOfWeek = moment().startOf('isoWeek').toDate();
    const endOfWeek = moment().endOf('isoWeek').toDate();

    let data = [];
    let currentDate = moment(startOfWeek);

    while (currentDate <= endOfWeek) {
      const total = await Vente.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            date_vente: {
              $gte: currentDate.toDate(),
              $lt: currentDate.clone().add(1, 'days').toDate(),
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$prix_vente" },
          },
        },
      ]);

      data.push({
        date: currentDate.format('DD-MM-YYYY'),
        total: total.length > 0 ? total[0].total : 0,
      });

      currentDate.add(1, 'day');
    }

    const totalHebdomendaire = await Vente.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date_vente: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$prix_vente" },
        },
      },
    ]);

    return NextResponse.json({
      stats: data,
      totalHebdo: totalHebdomendaire.length > 0 ? totalHebdomendaire[0].total : 0,
    }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      error: error.message,
    }, {
      status: 500,
    });
  }
};
