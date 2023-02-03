import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function ProtectedRoute({ children }) {

    const navigate = useNavigate()

    //  ONLY IN TEST FASE
    /* 
        if (!localStorage.getItem('token')) {
            localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NzU3MzI3ODJ9.Ks3C9rqrSpGI8eOzZ_Mj652Eh7_MiQPXfdBfnuu3bvY')
        }
    */

    const { isLoading, error, data } = useQuery('verifyUser', async () => {
        try {
            const res = await fetch('http://localhost:3001/auth/user', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            if (res.status === 401) { return res.json() }
            return res.json()
        } catch (err) {
            return { 'error': 'error' }
        }
    })

    if (isLoading) return <Loading />

    if (data.error || error) return navigate('/login')

    return <children.type user={data} />
}

export default ProtectedRoute