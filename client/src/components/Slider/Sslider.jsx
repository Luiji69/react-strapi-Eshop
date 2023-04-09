// src/component/Gallery.js
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
class Gallery extends React.Component {
    render() {
        return (
            <div>
                <Carousel  autoFocus autoPlay interval="4000" showStatus={false} autoplay={true} transitionTime="4000" infiniteLoop>
                    <div>
                        <img src='/img/ms5.png' alt="" />
                    </div>
                    <div>
                        <img src='/img/Grun1.png' alt="" />
                    </div>
                    <div>
                        <img src='/img/test3.png' alt="" />
                    </div>
                  
                </Carousel>
            </div>
        )
    };
}
export default Gallery