"use client"
import React, { useContext, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';
import Image from 'next/image';
import imageDefault from "../../public/images/defaultImg.png"
import Cookies from 'js-cookie';
import { MyStore } from '../context/store';
import withAuth from '../withAuth';


const Categories = () => {
  const { handleAddPanier } = useContext(MyStore)
  const userId = Cookies.get("cookiesUserId");
  const token = Cookies.get("cookiesToken");
  const router = useRouter()
  //etat initiale de la valeur de categorie a filtrer
  const [produits, setProduits] = useState([])
  const [categories, setCategories] = useState('')
  const [options ,setOptions ] = useState([])
  const [alertMessage ,setAlertMessage] =useState("")

  //charger les produits
  useEffect(() => {
    const getProduits = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_URI}/products/${userId}`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProduits(response.data.produits);
        })
        .catch((err) => console.error(err));
    };
    getProduits()
  }, [userId, token]);

     
  //charger les depenses
  useEffect(()=>{
    const getDepenses =()=>{
     axios.get(`${process.env.NEXT_PUBLIC_URI}/categories/${userId}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
     .then((res) =>{
      setOptions(res.data.results)
     }).catch(err => console.error(err))
    };
    getDepenses()
},[])


  // les bouton de categories
  const handleAjouter = (item) => {
    handleAddPanier(item)
    setAlertMessage(item._id); // Store the product ID

  }


  //supprimer le produit
  const handledelete = (id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_URI}/produits/single/${id}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.data)
      .catch((err) => console.error(err))
  };

  //focntion de changer les champs

  const ProductFilter = produits.length > 0 && produits.filter((item) =>
    item.categories.toLocaleLowerCase().includes(categories.toLocaleLowerCase())

  );

  useEffect(() => {
    if (alertMessage) {
        const timer = setTimeout(() => {
            setAlertMessage('');
        }, 1000);
        return () => clearTimeout(timer);
    }
}, [alertMessage]);




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
      field: 'prix_vente', headerName: "Prix de vente", width: 150, renderCell: (params) => {
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

  //vue de frontend
  return (

    <main className='categories'>
      <header className='header-categories'>
        <h1>Categories</h1>
      </header>
      <nav className='categorie-navbar'>
        <select type='text' value={categories} onChange={(e) => setCategories(e.target.value)} placeholder='Categorie'>
          <option >Catégorie--Select</option>
          {options.map((item) => (
            <option key={item.name} value={item.name}>{item.name}</option>
          ))}
        </select>
        <section className='link-create-categorie'>
          <Link href="/create_categorie">Créer votre categorie</Link>
        </section>
      </nav>

      <section className='categorie-container'>
        <h1>Choisir une catégorie de produits</h1>

        <section className='array-products'>
          <DataGrid
            rows={ProductFilter}
            getRowId={(row) => row._id}
            disableSelectionOnclick
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'rgb(121, 177, 252);', // Changez cette couleur selon vos besoins
                color: '#222222', // Pour changer la couleur du texte du header
                textTransform:"uppercase",
                fontWeight:600,
                fontSize:"0.9em"
              },
            }}
          />
        </section>
      </section>
    </main>

  );
}

export default withAuth(Categories)
