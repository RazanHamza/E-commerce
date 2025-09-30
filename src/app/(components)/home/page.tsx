import AllCategories from '@/app/_components/AllCategories/page';
import MainSlider from '@/app/_components/mainSlider/page';
import React from 'react';
import Products from '../products/page';

const HomeAll = () => {
    return (
        <>
    <MainSlider/>
    <AllCategories/>
    <Products/>
        </>
    );
}

export default HomeAll;
