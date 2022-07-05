import React from 'react'
import SchoolIcon from '@mui/icons-material/School';


const Cards = (props) => {
  return (
   <>
           <div className='col-md-3  col-sm-6 mx-2'>
                <div className='card card_stat '>
                    <div className='card-header card-header-info clearfix'>
                        <div className='card_icon bg-info'>
                            <SchoolIcon className='school'/>
                        </div>
                         <div className='card_text'>
                         <p className='card-cetogary'>student</p>
                        <h3 className='card-title'>{props.countdata}</h3>
                         </div>
                    </div>
                </div>
            </div>
            <div className='col-md-3  col-sm-6 mx-2'>
                <div className='card card_stat '>
                    <div className='card-header card-header-info clearfix'>
                        <div className='card_icon bg-info'>
                            <SchoolIcon className='school'/>
                        </div>
                         <div className='card_text'>
                         <p className='card-cetogary'>fees</p>
                        <h3 className='card-title'>{props.feesdata}</h3>
                         </div>
                    </div>
                </div>
            </div>
        
            <div className='col-md-3  col-sm-6 mx-2'>
                <div className='card card_stat '>
                    <div className='card-header card-header-info clearfix'>
                        <div className='card_icon bg-info'>
                            <SchoolIcon className='school'/>
                        </div>
                         <div className='card_text'>
                         <p className='card-cetogary'>count</p>
                        <h3 className='card-title'>{props.countdata}/{props.feesdata}</h3>
                         </div>
                    </div>
                </div>
            </div>
        
        
        
   </>
  )
}

export default Cards
