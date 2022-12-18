import {
    useSelector as customReduxSelector,
    TypedUseSelectorHook
} from 'react-redux'
import store from 'redux/store'

const useSelector: TypedUseSelectorHook<typeof store> = customReduxSelector
export default customReduxSelector
