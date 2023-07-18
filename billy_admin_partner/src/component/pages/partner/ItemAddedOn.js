import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { Link } from "react-router-dom";

const ItemAddedOn = () => {
    const defaultMaterialTheme = createTheme();
    return (
        <div>
        <div className="card">
          <div className='p-3' style={{ cursor: 'pointer' }}>
            <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Addons</a>
          </div>
        </div><br />
        <div className="card">
          <div className="card-body">
          <div style={{ display: 'flex' }}>
            <Link to="ManageAddons"  className='add_link'>
            <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Addons</button>
            {/* <a href='deliveryBoy/managedeliveryBoy'>Add Delivery Boy</a> */}
                </Link>
              </div><br />
            <div style={{ display: 'flex' }}>
         </div>
  
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                  title="Category"
                  columns={[
                    { title: 'S.No #', render: rowData => rowData.tableData.id+1 },
                    { title: 'Restaurant', field: 'restaurant' },
                    { title: 'Addon Name', field: 'addonName' },
                    { title: 'Addon Type', field: 'addonType' },
                    { title: 'Addon Price', field: 'addonPrice' },
                    { title: 'Addon Additional Price', field: 'addonAdditionalPrice' },
                    { title: 'Addon Final Price', field: 'addonFinalPrice' },
                     {
                      title: 'Added On', render: rowData => 
                      <div>
                       2023-01-26
                      </div>
                    },
                    {
                      title: 'Addon Status', render: rowData => 
                      <div style={{ display: 'flex' }}>
                       <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.addonStatus === true ? "true" : ""} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                      </div>
                    },
                    {
                      title: 'Approval Status', render: rowData => 
                      <div style={{ display: 'flex' }}>
                       <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.approvalStatus === 1 ? "true" : ""} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                      </div>
                    },
                    
                    
                  ]}
                  data={
                  //   complain
                    [
                      
                      { restaurant: 'Dominos', addonName: 'Onion',addonType:'veg',addonPrice:30,addonAdditionalPrice:0,addonFinalPrice:30,addonStatus:true,approvalStatus: 0},
                      { restaurant: 'Dominos', addonName: 'Tomatos',addonType:'veg',addonPrice:40,addonAdditionalPrice:0,addonFinalPrice:40,addonStatus:false,approvalStatus: 1},
                      { restaurant: 'Dominos', addonName: 'capcicum',addonType:'veg',addonPrice:20,addonAdditionalPrice:0,addonFinalPrice:20,addonStatus:true,approvalStatus: 0},
                      
                      // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                      // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                      // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                      // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                      // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                      // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                      // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                      // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
  
                      // { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4' },
                    ]
                  }
                  options={{
                    exportButton: true,
                    headerStyle: {
                      borderBlockColor: 'orange',
                      // backgroundColor:'orange',
                      // color:'#fff'
                    },
                    rowStyle: {
                      fontSize: '14px'
                    },
                  }}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
    );
};

export default ItemAddedOn;