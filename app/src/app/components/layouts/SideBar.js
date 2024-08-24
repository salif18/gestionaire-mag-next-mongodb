"use client"
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
import StyleIcon from '@mui/icons-material/Style';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname()
    const navLinks = [
        {name:"Tableau de bord", href:'/', icon :GridViewIcon},
        {name:"Magasin", href:'/pages/produits', icon :AddBusinessIcon},
        {name:"Categories", href:'/pages/categories', icon :CategoryIcon},
        {name:"Panier", href:'/pages/panier', icon :ShoppingCartIcon},
        {name:"Ventes effectuées", href:'/pages/vendues', icon :MonetizationOnIcon},
        {name:"Rapports", href:'/pages/rapports', icon :AssignmentIcon},
        {name:"Meilleur vente", href:'/pages/best-ventes', icon :AutoAwesomeIcon},
        {name:"Dépenses", href:'/pages/depenses', icon :StyleIcon},

    ]
    return (
        <aside className='sidebar'>
           
           {
            navLinks.map((link)=>{
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return  <Link className={isActive ? "activliens" :"liens"} href={link.href}><link.icon className='icon'/>{link.name}</Link>
            })
           }
          
        </aside>
    );
}

export default SideBar;
  