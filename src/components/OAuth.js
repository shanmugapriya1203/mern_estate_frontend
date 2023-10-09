import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useDispatch } from 'react-redux';
import { signInSuccess,signInFailure } from '../redux/user/userSlice';

function OAuth() {
  const navigate = useNavigate();
  const dispatch= useDispatch()
    const handleGoogleClick=async()=>{
        try {
            const provider= new GoogleAuthProvider()
            const auth= getAuth(app);
            const result= await signInWithPopup(auth,provider)
            console.log(result)
           
const response=await axios.post(`${API_BASE_URL}/api/auth/google`,{
  name: result.user.displayName,
  email: result.user.email,
  photo: result.user.photoURL,
})
const data = response.data;
dispatch(signInSuccess(data))
navigate('/');
        } catch (error) {
            console.log('Could not sign in with Google',error)
        }
    }
    return (
      <div>
        <button type="button" onClick={handleGoogleClick}
          className="bg-red-500 text-white w-full p-3 rounded-lg uppercase hover:opacity-95"
        
        >
          Continue with Google
        </button>
      </div>
    );
  }
  
  export default OAuth;
  