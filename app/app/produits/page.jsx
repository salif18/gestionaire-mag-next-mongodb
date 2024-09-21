"use client"

import React, { useContext, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useRouter } from 'next/navigation'
import { DataGrid } from '@mui/x-data-grid';
import imageDefault from "../../public/images/defaultImg.png"
import Image from 'next/image';
import Cookies from 'js-cookie';
import { MyStore } from '../context/store';
import withAuth from '../withAuth';


const Produits = () => {
  const userId = Cookies.get("cookiesUserId");
  const token = Cookies.get("cookiesToken");
  const [produits, setProduits] = useState([])
  const [stocks , setStocks ] = useState(0)
  const router = useRouter()
  const { handleAddPanier } = useContext(MyStore)
  const [alertMessage ,setAlertMessage] =useState("")

  //charger les produits
  useEffect(() => {
    const getProduits = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_URI}/products/${userId}`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      })
        .then((response) => {
          setProduits(response.data.produits);
          setStocks(response.data.stocks)
        })
        .catch((err) => console.error(err));
    };
    getProduits()
  }, [userId, token]);


  //ajouter produit dans le panier de vente
  const handleAjouter = (item) => {
    handleAddPanier(item)
    setAlertMessage(item._id); // Store the product ID
  }

  //supprimer le produit
  const handledelete = (id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_URI}/produits/single/${id}`, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
  })
      .then((res) => res.data)
      .catch((err) => console.error(err))
  }

  
  useEffect(() => {
    if (alertMessage) {
        const timer = setTimeout(() => {
            setAlertMessage('');
        }, 1000);
        return () => clearTimeout(timer);
    }
}, [alertMessage]);

  //la valeur de recherche
  const [searchValue, setSearchValue] = useState('')

  const ProductFilter = produits.length > 0 && produits.filter((item) =>
    item.nom.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase()) ||
    item.nom.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
    item.categories.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase()) ||
    item.categories.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
    item.prixVente == parseInt(searchValue) ||
    item.stocks == parseInt(searchValue)
  );


  //DEFINITION DES DIFFERENTES COLONNES POUR LE TABLEAU DE DATA GRID
  const columns = [
    {
      field: "image", headerName: "Image", width: 100, renderCell: (params) => {
        return (
          <figure className='title'>
            <Image src={params.row.image || imageDefault } width={50} height={50} alt=""/>
          </figure>
        )
      }
    },
    {
      field: "nom", headerName: "Name", width: 200, renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.nom}</p>
          </section>
        )
      }
    },
    {
      field: 'categories', headerName: 'Categories', width: 150, renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.categories}</p>
          </section>
        )
      }
    },
    {
      field: 'prix_achat', headerName: "Prix d'achat", width: 150, renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.prix_achat}</p>
          </section>
        )
      }
    },
    {
      field: 'prixVente', headerName: "Prix de vente", width: 150, renderCell: (params) => {
        return (
          <section className='title'>
            <p>{params.row.prix_vente}</p>
          </section>
        )
      }
    },
    {
      field: 'stocks', headerName: 'Stocks', width: 100,
      renderCell: (params) => {
        return (
          <section className='title'>
            {params.row.stocks <= 0 ? <span className='stock-fini'>Ce stock est fini</span> : params.row.stocks}
          </section>
        )
      }

    },
    {
      field: "dateAchat",
      headerName: "Date d'achat",
      width: 200,
      renderCell: (params) => {
        const formattedDate = new Date(params.row.date_achat).toLocaleDateString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric' })
        return (
          <section className='title'>
            <p>{formattedDate}</p>
          </section>
        )
      }
    },
    {
      field: 'actions', headerName: 'Actions', width: 200,
      renderCell: (params) => {
        return (
          <section className='action'>
            {params.row.stocks > 0 && <span onClick={() => handleAjouter(params.row)}>  {alertMessage === params.row._id ? "Ajouté" : <ShoppingCartIcon className='icon-add' />}</span>}
            {params.row.stocks > 0 && <span onClick={() => router.push(`/produits/${params.row._id}`)}> <EditIcon className='icon-edit' /> </span>}
            {params.row.stocks <= 0 &&
              <span onClick={() => handledelete(params.row._id)}>
                <DeleteIcon className='icon-del' />
              </span>
            }
          </section>
        )
      }
    },

  ];

  return (

    <main className='produits'>
      <section className='title-stock'>
        <section className='left'>
          <h3>Nombre de stocks</h3>
          <p> {stocks} </p>
        </section>
        <button className='btn-add' onClick={() => router.push('/add-product')}>Ajouter <AddBusinessIcon style={{ marginLeft: 5 }} /></button>
      </section>
      <section className='search'>
        <input className='search-champs' type='text' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Rechercher un produit...' />
      </section>

      <section className='products-content'>
        <DataGrid
          rows={!searchValue ? produits : ProductFilter}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#376369;', // Changez cette couleur selon vos besoins
                color: '#000000', // Pour changer la couleur du texte du header
                textTransform:"uppercase",
                fontWeight:600
              },
            }}
        />

      </section>
    </main>
  );
}

export default withAuth(Produits)
