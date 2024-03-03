import React from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
//import "./WithScrollbar.css";
import {NavLink} from 'react-router-dom';

import { Card, CardImg, CardBody, Placeholder, PlaceholderButton, CardText, ButtonToggle, Row, Col, CardColumns, CardTitle } from "reactstrap";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function BuildCard(props){
    return (
        <Card>
            <CardImg
                alt="Card image cap"
                src="https://picsum.photos/seed/stonks/318/180?grayscale&blur=7"
                top
                width="100%"
            />
            <CardBody>
                <Row>
                    <CardTitle style={{}}>{props.item.name}</CardTitle>
                    <NavLink to="/data" activeStyle>
                        <ButtonToggle>
                            Info
                        </ButtonToggle>
                    </NavLink>
                </Row>
            </CardBody>
        </Card>
    );
}

class WithScrollbar extends React.Component {
  state = { additionalTransfrom: 0 };
  render() {
    return (<Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={true}
        className=""
        containerClass="container"
        dotListClass=""
        draggable={false}
        focusOnSelect={false}
        infinite={true}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={true}
        responsive={responsive}
        rewind={true}
        rewindWithAnimation={true}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
        >
        {
            this.props.items_fetch.length==0?
            (<div>
                Não há itens a serem exibidos
            </div>)
            :this.props.items_fetch.map( (item,iter) =>{
                return <BuildCard item={item} key={iter}/>
            })
        }
    </Carousel>);
  }
}

export default WithScrollbar;

/*
<div  style={{width: "300px",height: "300px", position: "relative"}}>
            <h3>w3js.com - web front-end studio</h3>
            <div>Appending currency sign to a purchase form in your e-commerce site using plain JavaScript."</div>
            <img style={{width: "100%"}} src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
        </div>
        <div  style={{width: "300px",height: "300px", position: "relative"}}>
            <h3>w3js.com - web front-end studio</h3>
            <div>Fixing CSS load order/style.chunk.css incorrect in Nextjs"</div>
            <img style={{width: "100%"}} src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
        </div>
        <div  style={{width: "300px",height: "300px", position: "relative"}}>
            <h3>w3js.com - web front-end studio</h3>
            <div>Fixing CSS load order/style.chunk.css incorrect in Nextjs"</div>
            <img style={{width: "100%"}} src="https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
        </div>
        <div  style={{width: "300px",height: "300px", position: "relative"}}>
            <h3>w3js.com - web front-end studio</h3>
            <div>React Carousel with Server Side Rendering Support – Part 2"</div>
            <img style={{width: "100%"}} src="https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
        </div>
        <div  style={{width: "300px",height: "300px", position: "relative"}}>
            <h3>w3js.com - web front-end studio</h3>
            <div>React Carousel with Server Side Rendering Support – Part 1"</div>
            <img style={{width: "100%"}} src="https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
        </div>
        <div  style={{width: "300px",height: "300px", position: "relative"}}>
            <h3>w3js.com - web front-end studio</h3>
            <div>React Carousel with Server Side Rendering Support – Part 1"</div>
            <img style={{width: "100%"}} src="https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
        </div>
        <div  style={{width: "300px",height: "300px", position: "relative"}}>
            <h3>w3js.com - web front-end studio</h3>
            <div>React Carousel with Server Side Rendering Support – Part 1"</div>
            <img style={{width: "100%"}} src="https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
        </div>
        <div  style={{width: "300px",height: "300px", position: "relative"}}>
            <h3>w3js.com - web front-end studio</h3>
            <div>Fixing CSS load order/style.chunk.css incorrect in Nextjs"</div>
            <img style={{width: "100%"}} src="https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
        </div>
        <div>
            <h1>w3js.com - web front-end studio</h1>
            <div>Appending currency sign to a purchase form in your e-commerce site using plain JavaScript.</div>
            <img style={{width: "100%"}} src="https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
        </div>
        <div>
            <h1>w3js.com - web front-end studio</h1>
            <div>React Carousel with Server Side Rendering Support – Part 2</div>
            <img style={{width: "100%"}} src="https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
        </div>
        <div>
            <h1>w3js.com - web front-end studio</h1>
            <div>React Carousel with Server Side Rendering Support – Part 1</div>
            <img style={{width: "100%"}} src="https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
        </div>
        <div>
            <h1>w3js.com - web front-end studio</h1>
            <div>Fixing CSS load order/style.chunk.css incorrect in Nextjs</div>
            <img style={{width: "100%"}} src="https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
        </div>
*/