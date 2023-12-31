import React, { Children, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Header from './Header';
import { ArrowBackIosOutlined,ArrowForwardIosOutlined} from '@material-ui/icons';

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);  
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/admin/dashboard",
            name:"Dashboard",
            icon:<i className="mdi mdi-view-quilt menu-icon" />
        },
        {
            path:"/admin/customer",
            name:"Customer",
            icon:<i className="mdi mdi-account menu-icon" />
        },
        {
            path:"/admin/deliveryBoy",
            name:"DeliveryBoy",
            icon:<i className="mdi mdi-truck-delivery menu-ico" />
        },
        {
            path:"/admin/getTouch",
            name:"GetTocuh",
            icon:<i className="mdi mdi-view-headline menu-icon" />
        },
        {
            path:"/admin/question",
            name:"Question",
            icon:<i className="mdi mdi-plus menu-icon" />
        },
        {
            path:"/admin/cuisines",
            name:"Cuisines",
            icon:<i className="mdi mdi-view-headline menu-icon" />
        },
        // {
        //     path:"/productList",
        //     name:"Product List",
        //     icon:<i className="mdi mdi-view-headline menu-icon" />
        // }
    ]
  return (
    <div className="containerfsf">
        <div>
        </div>
           <div style={{width: isOpen ? "230px" : "60px"}} className="sidebarown">
               <div className="top_section">
                   {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo"></h1> */}
                   <div style={{marginLeft: isOpen ? "198px" : "30px"}} className="bars">
                       {isOpen ? <ArrowBackIosOutlined shapeRendering='10px' onClick={toggle}/> : <ArrowForwardIosOutlined onClick={toggle}/>
                        }
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon" style={{fontSize:'20px'}}>{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text menu-title">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           {/* <main>{children}</main> */}
        </div>  
  )
}

export default Sidebar;