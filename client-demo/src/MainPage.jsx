import React from 'react'
import Navigate from './components/Navigate'
import ListBook from './components/ListBook'

function MainPage() {
    return (
        <>
            <Navigate/>
            <div className="container-main">
                <ListBook />
            </div>
        </>
    )
}

export default MainPage