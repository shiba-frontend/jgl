import React from "react";
import AfterLoginTopbar from "../../customer/header/AfterLoginTopbar";
import dealIcon from "../../../image/headingicon/Folder_file_fill.svg";
import BottomTabCustomer from "../header/BottomTabCustomer";

const UserAgreement = () => {
  return (
    <div className='customer-layout'>
       <div className="top-f-header">
    <AfterLoginTopbar />
    <div className="header-info">
      <div className="container"><img src={dealIcon}/> User Agreement</div>
    </div>
    </div>
    <div className="comon-layout cms-page">
      <div className="container">
        <h2>User Agreement</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          ornare lorem dui. Praesent porta enim sed vehicula iaculis. Proin
          accumsan nisi a eros scelerisque vehicula. Pellentesque non aliquam
          purus. Curabitur ornare et risus id ullamcorper. Fusce nunc ante,
          facilisis at eros nec, fringilla vehicula nisl. Duis vitae feugiat
          nulla. Cras dictum risus vitae lacus interdum varius. Vestibulum
          felis dolor, efficitur id justo eu, dictum aliquet sapien. Curabitur
          elit ex, commodo in iaculis a, posuere vel mi. Vivamus euismod vel
          odio nec pulvinar. Mauris ut mauris ante.
        </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ornare lorem dui. 
Praesent porta enim sed vehicula iaculis. Proin accumsan nisi a eros scelerisque vehicula. 
        </p>
        
      </div>
    </div>
    <BottomTabCustomer/>
  </div>
  )
}

export default UserAgreement