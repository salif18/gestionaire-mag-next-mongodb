import React from 'react';
import Link from 'next/link';
import CategoryIcon from '@mui/icons-material/Category';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GridViewIcon from '@mui/icons-material/GridView';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const SideBar = () => {
    return (
        <aside className='sidebar'>
           <Link className='liens' href='/' ><GridViewIcon className='icon'/> Tableau de bord</Link> 
           <Link className='liens' href='/pages/produits' ><AddBusinessIcon className='icon'/>Produits</Link> 
           <Link className='liens' href='/pages/categories' ><CategoryIcon className='icon'/>Catégories</Link> 
           <Link className='liens' href='/pages/panier' ><MonetizationOnIcon className='icon'/>Ventes</Link> 
           <Link className='liens' href='/pages/vendues'><ShoppingCartIcon className='icon'/>Ventes effectuées</Link>
           <Link className='liens' href='/pages/rapports' ><AssignmentIcon className='icon'/>Rapports</Link>
           <Link className='liens' href='/pages/best-ventes'><AutoAwesomeIcon className='icon'/>Meilleur vente</Link> 
           <Link className='liens' href='/pages/depenses'><PointOfSaleIcon className='icon'/>Dépenses</Link>
        </aside>
    );
}

export default SideBar;
  