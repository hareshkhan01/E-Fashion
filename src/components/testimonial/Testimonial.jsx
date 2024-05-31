import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'

function Testimonial() {
    const context = useContext(myContext)
    const { mode } = context
    return (
        <div>
            <section className="text-gray-600 body-font mb-10">
                <div className="container px-5 py-10 mx-auto">
                    <h1 className=' mb-10 text-center text-3xl font-bold text-black' style={{color: mode === 'dark' ? 'white' : ''}}>Testimonial</h1>
                    
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/4 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://firebasestorage.googleapis.com/v0/b/quick-bazar-e968a.appspot.com/o/user_icon.png?alt=media&token=838fa298-6f46-450c-ab42-a50cf77ee38f" />
                                
                                
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Haresh Khan</h2>
                                
                            </div>
                        </div>
                        <div className="lg:w-1/4 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://firebasestorage.googleapis.com/v0/b/quick-bazar-e968a.appspot.com/o/user_icon.png?alt=media&token=838fa298-6f46-450c-ab42-a50cf77ee38f" />
                                
                                
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Partha Raut</h2>
                                
                            </div>
                        </div>
                        <div className="lg:w-1/4 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://firebasestorage.googleapis.com/v0/b/quick-bazar-e968a.appspot.com/o/user_icon.png?alt=media&token=838fa298-6f46-450c-ab42-a50cf77ee38f" />
                                
                                
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Rajashree Roy</h2>
                                
                                
                                
                            </div>
                        </div>
                        <div className="lg:w-1/4 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://firebasestorage.googleapis.com/v0/b/quick-bazar-e968a.appspot.com/o/user_icon.png?alt=media&token=838fa298-6f46-450c-ab42-a50cf77ee38f" />
                                
                                
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Sukanya Parh</h2>
                                
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial