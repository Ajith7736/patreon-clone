import React from 'react'

function Loading() {
    return (
        <div>
            <div className="flex items-center justify-center w-full h-[90vh]">
                <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">

                    <svg  className="w-6 h-6 animate-spin text-text-col" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                        <path clipRule='evenodd'
                            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                            fill='currentColor' fillRule='evenodd' />
                    </svg>
                    <div className='text-text-col'>Loading ...</div>
                </div>
            </div>
        </div>
    )
}

export default Loading
