import React, { useContext, useEffect } from 'react';
import './Home.css';
import ProductItems from '../Store/StoreRight/ProductItems/ProductItems';
import { Link } from 'react-router-dom';
import BartContext from '../../store/bartContext';
import { Data } from '../Data/Data';

const Home=() =>{
    const {homeData, SetHomeData} =useContext(BarContext);

    return(
        <div className="home">
            <div  className="home__container">
                <ProductItems   products={homeData}/> 
            </div>
            <div className="home__btnContainer">
                <Link to="/store">
                    <button  className="home__btn2">
                        VIEW ALL PRODUCTS
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default Home;