// src/component/Gallery.js
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
class Gallery extends React.Component {
    render() {
        return (
            <div>
                <Carousel autoPlay interval="3000" autoplay={true} transitionTime="3000" infiniteLoop>
                    <div>
                        <img src='/img/ms1.png' alt="" />
                    </div>
                    <div>
                        <img src='/img/Grun1.png' alt="" />
                    </div>
                    <div>
                        <img src='/img/yoa1.png' alt="" />
                    </div>
                  
                </Carousel>
            </div>
        )
    };
}
export default Gallery