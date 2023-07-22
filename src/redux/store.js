import { createStore } from 'redux'
const initialState = {
 sidebarShow: true,
  sidebarShownews: true,
  sidebarShowbusiness: true,
  newsdetailsId:null,
  accessToken:null,
  profiledata:{},
  isbusinessdata:null,
  cartstore:[],
  voicesearch:"",
  newsresult:[],
  dealsLocationList:[],
  businessLocationList:[],
  isstatus:false,
}
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
      case 'setnews':
      return { ...state, ...rest }
      case 'setbusiness':
      return { ...state, ...rest }
      case 'setid':
        return { ...state, ...rest }
        case 'setToken':
        return { ...state, ...rest }
        case 'setprofile':
        return { ...state, ...rest }
        case 'setbusinessId':
        return { ...state, ...rest }
        case 'cartpage':
          return { ...state, ...rest }
          case 'voice':
          return { ...state, ...rest }
          case 'news':
          return { ...state, ...rest }
       
            case 'dealslocation':
              return { ...state, ...rest }
              case 'businesslocation':
                return { ...state, ...rest }
            
                  case 'status':
                    return { ...state, ...rest }
    default:
      return state
  }
}
const store = createStore(changeState)
export default store