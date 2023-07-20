import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import search from '../../../image/bottom-search.png'
import voice from '../../../image/voice-assistant.png'
import cart from '../../../image/shopping-cart.png'
import { useSelector, useDispatch } from "react-redux";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { toast } from 'react-toastify';

const BottomTabCustomer = () => {
    const [text, settext] = useState();
    const [iscondition, setiscondition] = useState(false);

    console.log(text)
   
    const token = localStorage.getItem('accessToken');
    const cartData = useSelector((state) => state.cartstore);
    const dispatch = useDispatch();
   

    function cartqty (){
        var total = 0;
        cartData&&cartData.forEach(function(element){
        total += parseInt(element.qty);
    });
    return total;
    }

    

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
      if (!browserSupportsSpeechRecognition) {
        return null
      }

      const StartListening = ()=>{
        resetTranscript()
        setiscondition(true)
        SpeechRecognition.startListening({continuous: true});
    }

    const StopListening = async ()=>{
        SpeechRecognition.stopListening();
        settext(transcript)
        
        setiscondition(false)
       setTimeout(()=>{
        dispatch({ type: "voice", voicesearch: transcript })
       },1000)

    }


  

   
    

  return (
    <div className='bottom-bar customer-bottom'>
    
        <ul>

        <li>
                <NavLink>
                    <img src={search} alt="widget" />
                </NavLink>
            </li>
            {!iscondition ? 
            <li>
                <button onClick={StartListening}>
                <i class="fa-solid fa-microphone-lines"></i>
                </button>
              
            </li>
            :
            <li>
                <button onClick={StopListening}>
                <i class="fa-solid fa-microphone-lines-slash"></i>
                </button>
              
            </li>
}
            <li>
                <NavLink to="/cart">
                    <img src={cart} alt="dash" />
                    <span>({cartqty()})</span>
                </NavLink>
            </li>
            
          
        </ul>
    </div>
  )
}

export default BottomTabCustomer