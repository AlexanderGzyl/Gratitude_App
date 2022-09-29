import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GratitudeForm from '../components/GratitudeForm'
import Spinner from '../components/Spinner'
import { getGratitudes, reset } from '../features/gratitudes/gratitudeSlice'
import GratitudeItem from '../components/GratitudeItem'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { gratitudes, isLoading, isError, message } = useSelector(
    (state) => state.gratitudes
  )

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    dispatch(getGratitudes())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p> Dashboard</p>
      </section>

      <GratitudeForm />
      <section className='content'>
        {gratitudes.length > 0 ? (
          <div className='gratitudes'>
            {gratitudes.map((gratitude) => (
              <GratitudeItem key={gratitude._id} gratitude={gratitude} />
            ))}
          </div>
        ) : (
          <h3>Start practicing the virtue of gratitude</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard