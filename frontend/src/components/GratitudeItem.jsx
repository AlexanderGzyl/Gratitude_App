import { useDispatch } from 'react-redux'
import {deleteGratitude} from '../features/gratitudes/gratitudeSlice'


function GratitudeItem({gratitude}){
    const dispatch = useDispatch()
    return(
        <div className="gratitude">
            <div>
                {new Date(gratitude.createdAt).toLocaleString('en-US')}
            </div>
            <div>{gratitude.text}</div>
            <button onClick={() => dispatch(deleteGratitude(gratitude._id))} className='close'>
        X
      </button>
        </div>
    )
}

export default GratitudeItem