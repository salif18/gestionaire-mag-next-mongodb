"use client"
import React, { useContext } from 'react';
import Link from 'next/link';
import CategoryIcon from '@mui/icons-material/Category';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GridViewIcon from '@mui/icons-material/GridView';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import StyleIcon from '@mui/icons-material/Style';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import { usePathname } from 'next/navigation';
import { MyStore } from '../../context/store';

const SideBar = () => {
    const { logout } = useContext(MyStore)
    const pathname = usePathname()
    const navLinks = [
        {name:"Tableau de bord", href:'/', icon :GridViewIcon},
        {name:"Stocks", href:'/pages/produits', icon :AccountBalanceOutlinedIcon},
        {name:"Produit par categories", href:'/pages/categories', icon :CategoryIcon},
        {name:"Liste categorie", href:'/pages/categories-list', icon :ClearAllOutlinedIcon},
        {name:"Panier", href:'/pages/panier', icon :ShoppingCartIcon},
        {name:"Ventes effectuées", href:'/pages/vendues', icon :MonetizationOnIcon},
        {name:"Rapports", href:'/pages/rapports', icon :AssignmentIcon},
        {name:"Meilleur vente", href:'/pages/best-ventes', icon :AutoAwesomeIcon},
        {name:"Dépenses", href:'/pages/depenses', icon :StyleIcon},
        {name:"Fournisseurs", href:'/pages/fournisseurs', icon :AccountBoxIcon},
        

    ]
    return (
        <aside className='sidebar'>
           
           {
            navLinks.map((link)=>{
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return  <Link key={link.name} className={isActive ? "activliens" :"liens"} href={link.href}><link.icon className='icon'/>{link.name}</Link>
            })
           }
          <p className='btn-logout' onClick={logout}><LogoutOutlinedIcon className='icon'/> Se déconnecter</p>
        </aside>
    );
}

export default SideBar;
  