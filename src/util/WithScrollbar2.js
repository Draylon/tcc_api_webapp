import React, { useState,Component } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
    }
  }



class WithScrollbar extends React.Component {
    state = { additionalTransfrom: 0 };
    render() {
        const CustomSlider = ({ carouselState }) => {
            let value = 0;
            let carouselItemWidth = 0;
            if (this.Carousel) {
                carouselItemWidth = this.Carousel.state.itemWidth;
                const maxTranslateX = Math.round(
                // so that we don't over-slide
                carouselItemWidth *
                    (this.Carousel.state.totalItems -
                    this.Carousel.state.slidesToShow) +
                    150
                );
                value = maxTranslateX / 100; // calculate the unit of transform for the slider
            }
            const { transform } = carouselState;
            return (
                <div className="custom-slider">
                <input
                    type="range"
                    value={Math.round(Math.abs(transform) / value)}
                    max={
                    (carouselItemWidth *
                        (carouselState.totalItems - carouselState.slidesToShow) +
                        (this.state.additionalTransfrom === 150 ? 0 : 150)) /
                    value
                    }
                    onChange={e => {
                    if (this.Carousel.isAnimationAllowed) {
                        this.Carousel.isAnimationAllowed = false;
                    }
                    const nextTransform = e.target.value * value;
                    const nextSlide = Math.round(nextTransform / carouselItemWidth);
                    if (
                        e.target.value == 0 &&
                        this.state.additionalTransfrom === 150
                    ) {
                        this.Carousel.isAnimationAllowed = true;
                        this.setState({ additionalTransfrom: 0 });
                    }
                    this.Carousel.setState({
                        transform: -nextTransform, // padding 20px and 5 items.
                        currentSlide: nextSlide
                    });
                    }}
                    className="custom-slider__input"
                />
                </div>
            );
            };
        return (
        <Carousel
            swipeable={true}
            draggable={true}
            centerMode={true}
            showDots={false}
            responsive={responsive}
            infinite={false}
            /* autoPlay={this.props.deviceType !== "mobile" ? true : false} */
            autoPlay={false}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            ssr={true}
            ref={el => (this.Carousel = el)}
            partialVisbile={false}
            customButtonGroup={<CustomSlider />}
            itemClass="slider-image-item"
            containerClass="carousel-container-with-scrollbar"
            additionalTransfrom={-this.state.additionalTransfrom}
            beforeChange={nextSlide => {
            if (nextSlide !== 0 && this.state.additionalTransfrom !== 150) {
                this.setState({ additionalTransfrom: 150 });
            }
            if (nextSlide === 0 && this.state.additionalTransfrom === 150) {
                this.setState({ additionalTransfrom: 0 });
            }
            }}
        >
            <div className="image-container increase-size">
                <div className="image-container-text">
                    <p>1</p>
                </div>
                <img
                    draggable={false}
                    style={{ width: "100%", cursor: "pointer" }}
                    src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                />
            </div>
            <div className="increase-size">
            <div className="image-container-text">
                <p>2</p>
            </div>
            <img
                draggable={false}
                style={{ width: "100%", cursor: "pointer" }}
                src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            />
            </div>

            <div className="image-container increase-size">
            <div className="image-container-text">
                <p>3</p>
            </div>
            <img
                draggable={false}
                style={{ width: "100%", cursor: "pointer" }}
                src="https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            />
            </div>

            <div className="image-container increase-size">
            <div className="image-container-text">
                <p>4</p>
            </div>
            <img
                draggable={false}
                style={{ width: "100%", cursor: "pointer" }}
                src="https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            />
            </div>

            <div className="image-container increase-size">
            <div className="image-container-text">
                <p>5</p>
            </div>
            <img
                draggable={false}
                style={{ width: "100%", cursor: "pointer" }}
                src="https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            />
            </div>
            <div className="image-container increase-size">
            <div className="image-container-text">
                <p>6</p>
            </div>
            <img
                draggable={false}
                style={{ width: "100%", cursor: "pointer" }}
                src="https://images.unsplash.com/flagged/photo-1556091766-9b818bc73fad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80"
            />
            </div>
        </Carousel>
        );
    }
}
  
export default WithScrollbar;










/* class WithScrollbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
        //stonks:0
        }
        //this.raisestonks = this.raisestonks.bind(this);
    }
    render(){
        return (
            <Carousel
                swipeable={false}
                draggable={false}
                centerMode={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={5000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={250}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >{
                [1,2,3,4,5,6,7,8,9,10,11,12].map((n)=>{return (<div>Item {n}!!!</div>)})
            }
                
            </Carousel>
        );
    }
};

export default WithScrollbar; */