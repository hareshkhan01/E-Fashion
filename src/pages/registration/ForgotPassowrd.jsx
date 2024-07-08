import React, { useContext,useState } from 'react'
import Loader from '../../components/loader/Loader';
import myContext from '../../context/data/myContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';

const ForgotPassowrd = () => {
    const [email, setEmail] = useState('');
    const context=useContext(myContext)
    const { loading, setLoading } = context
    const resetPassword=async()=>{
        setLoading(true)
        await sendPasswordResetEmail(auth,email).then((data)=>{
            toast.success("Check your mail box")
            setLoading(false)
        }).catch((err)=>{
            alert(err.code)
            setLoading(false)
        })

    }
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Reset Password</h1>
                </div>
                <div>
                    <input type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={resetPassword}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassowrd