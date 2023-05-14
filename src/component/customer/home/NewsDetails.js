import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import AfterLoginTopbar from '../header/AfterLoginTopbar'
import PageMenu from '../header/PageMenu'
import story from "../../../image/story-news.png";

const NewsDetails = () => {
    const NewsId = useSelector((state) => state.newsdetailsId);
    console.log(NewsId)

  return (
    <>
    <AfterLoginTopbar
      />
      <div className='header-info'>
        <div className='container'>
          Top Stories
        </div>
    
      </div>
      <div className='comon-layout'>
      <div className='container'>
      <PageMenu/>

        <div className='top-stories'>
           
                <div className='story-list stry-details'>
                <div className='row'>
                    <div className='col-lg-5 col-12'>
                        <div className='story-list-img'>
                        <img src={story}/>
                        </div>
                    </div>
                    <div className='col-lg-7 col-12'>
                    <div className='story-list-info'>
                        <h2>Trump Audit Shows Depths of I.R.S. Funding Woes</h2>
                      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. 
                        It has roots in a piece of classical Latin literature from 45 BC, 
                        making it over 2000 years old.</p>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. 
                        It has roots in a piece of classical Latin literature from 45 BC, 
                        making it over 2000 years old.</p>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. 
                        It has roots in a piece of classical Latin literature from 45 BC, 
                        making it over 2000 years old.</p>
                    </div>
                </div>
              </div>
            
             
            </div>
         
        </div>


        </div>
       

    </div>
    </>
  )
}

export default NewsDetails