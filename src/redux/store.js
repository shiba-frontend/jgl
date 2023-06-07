import { createStore } from 'redux'
const initialState = {
 sidebarShow: true,
  sidebarShownews: true,
  sidebarShowbusiness: true,
  newsdetailsId:null,
  accessToken:null,
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
    default:
      return state
  }
}
const store = createStore(changeState)
export default store