
import React, { useState,useEffect,useContext,Component} from 'react';

import {Card,CardImg,CardBody,Placeholder,PlaceholderButton,CardGroup,CardHeader,CardFooter,CardTitle,CardText,CardBodyProps} from 'reactstrap';

import WithScrollbar from '../../util/WithScrollbar';

import { Parallax, Background } from 'react-parallax';

import {fetchLocationData} from '../../util/LocationHandler';

import { ContextContainer,id_} from '../../util/staticVariables';

import axios from 'axios';
import AnimatedArchitecture from '../../components/AnimatedArchitecture';
import { LocationData, LocationDataContext } from '../../context/LocationDataContext';


const MainSectionComponent = (props)=>{
    const {defaultLocationData,...rest} = props;

    const [items_fetching_list, setItemsFetchingList] = useState([]);
    const [loadItemFetcher,setLoadItemFetcher] = useState(false);

    useEffect(()=>{
        if(defaultLocationData!=null){
            axios.get("http://192.168.43.35:8081/api/v2/ui_data/webapp_main_section?cityName="+defaultLocationData.city+"&lat="+defaultLocationData.latitude+"&lng="+defaultLocationData.longitude)
            .then( response => {
                setItemsFetchingList(response.data);
            })
            .catch(error => {
                console.error(error);
                return null;
            });
        }
    },[defaultLocationData,loadItemFetcher])
    
    return (
        <div className='main_section'>
            <div className='mainsection_featured msection_1'>
                {
                    items_fetching_list.length == 0?
                    <div className='mainfeatured_content'>
                        <div className='mainfeatured_content'>
                                <h3 className="display-6 text-white" style={{marginLeft:'3vw', fontSize: '25pt'}}>
                                    Nenhum item a ser exibido no momento.
                                </h3>
                                <div className='cardHorizontalHolder'>
                                    <p style={{
                                        margin: "10vw 0px",
                                        width: "100%",
                                        textAlign: "center",
                                        fontSize: "1.4vw",
                                        color: "white"
                                    }}>O serviço de exibição encontra-se indisponível.</p>
                                </div>
                            </div>
                    </div>
                    :items_fetching_list.map((item,i) => {
                        return (
                            <div className='mainfeatured_content' key={id_()}>
                                <h3 className="display-6 text-white" style={
                                    i==0?
                                    {marginLeft:'3vw', fontSize: '25pt'}
                                    :i==items_fetching_list.length-1?
                                    {margin:'3vw', fontSize: '25pt', textAlign: "end"}
                                    :{margin:'3vw', fontSize: '25pt', textAlign: "center"}
                                }>
                                    {item.objectiveTitle}
                                </h3>
                                <div className='cardHorizontalHolder'>
                                    <WithScrollbar items_fetch={item.carouselItems}></WithScrollbar>
                                </div>
                            </div>
                            /*<div className='mainfeatured_content'>
                                <h3 className="display-6 text-white" style={{marginLeft:'3vw', fontSize: '25pt'}}>
                                    Most visited spots in {cityName}
                                </h3>
                                <div className='cardHorizontalHolder'>
                                    <WithScrollbar items_fetch=""></WithScrollbar>
                                </div>
                            </div>
                            <div className='mainfeatured_content'>
                                <h3 className="display-6 text-white" style={{margin:'3vw', fontSize: '25pt', textAlign: "center"}}>
                                    Near you
                                </h3>
                                <div className='cardHorizontalHolder'>
                                    <WithScrollbar></WithScrollbar>
                                </div>
                            </div>
                            <div className='mainfeatured_content'>
                                <h3 className="display-6 text-white" style={{margin:'3vw', fontSize: '25pt', textAlign: "end"}}>
                                    RECENT CLIMATE ISSUES REPORTED
                                </h3>
                                <div className='cardHorizontalHolder'>
                                    <WithScrollbar></WithScrollbar>
                                </div>
                            </div> */
                            );
                    })
                }
            </div>
            <div className='mainsection_featured msection_2'>
                <h1>Learn more about</h1>
                <p>Este projeto visa fornecer uma plataforma web e mobile de monitoramento remoto de dados, além de uma API RESTful</p>
                <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ut eros eget quam eleifend suscipit. Nam accumsan facilisis magna vitae consequat. Fusce mollis faucibus ipsum, at rhoncus nunc porta sed. Sed dapibus tellus erat, vitae iaculis eros venenatis at. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis laoreet tortor risus, nec porta ante aliquet non. Integer nulla arcu, tempus vitae dolor et, posuere interdum purus. Aliquam congue orci id risus aliquam, sit amet consequat nisl maximus. Aenean iaculis neque at ligula bibendum pharetra. Morbi accumsan posuere sapien, et auctor augue consectetur sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquet faucibus condimentum. Sed iaculis lacus non molestie fringilla. Aliquam vel molestie sapien.</p>
            </div>
            <div className='mainsection_featured msection_3'>
                <Parallax
                    blur={{ min: 3, max: 8 }}
                    bgImage={require('../../img/placeholder1.jpg')}
                    bgImageStyle={{}}
                    bgImageAlt="the dog"
                    strength={-100}
                >
                    <div>
                    <CardGroup className='feat_aboutcards_gp'>
                        <Card1 title="IoT" body="Utilizar LoRa para comunicação" imalt="IoT" imsrc="https://cdn-icons-png.flaticon.com/512/1185/1185864.png"/>
                        <Card1 title="MQTT" body="Fila de mensagens flexibiliza a instalação" imsrc="https://raw.githubusercontent.com/github/explore/6afe2c43768e7ef1e252839a1f1c12b730faa007/topics/mqtt/mqtt.png"/>
                        <Card1 title="RESTful API" body="API utilizável em múltiplos contextos" imsrc="https://icon-library.com/images/rest-api-icon/rest-api-icon-8.jpg"/>
                        <Card1 title="Aplicações" body="Múltiplas aplicações podem fazer o uso do sistema de forma geral, ou parte dele" imsrc="https://cdn-icons-png.flaticon.com/512/5738/5738077.png"/>
                    </CardGroup>
                    </div>
                </Parallax>
            </div>
            <div className='mainsection_featured msection_4'>
                Arquitetura aqui
            </div>
            <div className='mainsection_featured msection_5'>
                <AnimatedArchitecture/>
            </div>
        </div>
    );
}


export default function MainSection(){
    return (
        <LocationDataContext.Consumer>
            {({defaultLocationData, setDefaultLocationData,isManuallySet,refreshCurrentLocationData})=>(
                <MainSectionComponent 
                    defaultLocationData={defaultLocationData}
                />)}
        </LocationDataContext.Consumer>
    );
}

function OldMainSection(){
    const { appState } = useContext(ContextContainer);

    const [items_fetching_list, setItemsFetchingList] = useState([]);
    const [loadItemFetcher,setLoadItemFetcher] = useState(false);

    useEffect(()=>{
        const loc_data = appState.locationData;
        if(loc_data!=undefined){
            axios.get("http://192.168.43.35:8081/api/v2/ui_data/webapp_main_section?cityName="+loc_data.city+"&lat="+loc_data.latitude+"&lng="+loc_data.longitude)
            .then( response => {
                setItemsFetchingList(response.data);
            })
            .catch(error => {
                console.error(error);
                return null;
            });
        }
    },[appState,loadItemFetcher])
    
    return (
        <div className='main_section'>
            <div className='mainsection_featured msection_1'>
                {
                    items_fetching_list.length == 0?
                    <div className='mainfeatured_content'>
                        <div className='mainfeatured_content'>
                                <h3 className="display-6 text-white" style={{marginLeft:'3vw', fontSize: '25pt'}}>
                                    Nenhum item a ser exibido no momento.
                                </h3>
                                <div className='cardHorizontalHolder'>
                                    <p style={{
                                    margin: "10vw 0px",
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: "1.4vw",
                                    color: "white"
                                }}>O serviço de exibição encontra-se indisponível.</p>
                                </div>
                            </div>
                    </div>
                    :items_fetching_list.map((item,i) => {
                        return (
                            <div className='mainfeatured_content' key={id_()}>
                                <h3 className="display-6 text-white" style={
                                    i==0?
                                    {marginLeft:'3vw', fontSize: '25pt'}
                                    :i==items_fetching_list.length-1?
                                    {margin:'3vw', fontSize: '25pt', textAlign: "end"}
                                    :{margin:'3vw', fontSize: '25pt', textAlign: "center"}
                                }>
                                    {item.objectiveTitle}
                                </h3>
                                <div className='cardHorizontalHolder'>
                                    <WithScrollbar items_fetch={item.carouselItems}></WithScrollbar>
                                </div>
                            </div>
                            /*<div className='mainfeatured_content'>
                                <h3 className="display-6 text-white" style={{marginLeft:'3vw', fontSize: '25pt'}}>
                                    Most visited spots in {cityName}
                                </h3>
                                <div className='cardHorizontalHolder'>
                                    <WithScrollbar items_fetch=""></WithScrollbar>
                                </div>
                            </div>
                            <div className='mainfeatured_content'>
                                <h3 className="display-6 text-white" style={{margin:'3vw', fontSize: '25pt', textAlign: "center"}}>
                                    Near you
                                </h3>
                                <div className='cardHorizontalHolder'>
                                    <WithScrollbar></WithScrollbar>
                                </div>
                            </div>
                            <div className='mainfeatured_content'>
                                <h3 className="display-6 text-white" style={{margin:'3vw', fontSize: '25pt', textAlign: "end"}}>
                                    RECENT CLIMATE ISSUES REPORTED
                                </h3>
                                <div className='cardHorizontalHolder'>
                                    <WithScrollbar></WithScrollbar>
                                </div>
                            </div> */
                            );
                    })
                }
            </div>
            <div className='mainsection_featured msection_2'>
                <h1>Learn more about</h1>
                <p>Este projeto visa fornecer uma plataforma web e mobile de monitoramento remoto de dados, além de uma API RESTful</p>
                <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus ut eros eget quam eleifend suscipit. Nam accumsan facilisis magna vitae consequat. Fusce mollis faucibus ipsum, at rhoncus nunc porta sed. Sed dapibus tellus erat, vitae iaculis eros venenatis at. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis laoreet tortor risus, nec porta ante aliquet non. Integer nulla arcu, tempus vitae dolor et, posuere interdum purus. Aliquam congue orci id risus aliquam, sit amet consequat nisl maximus. Aenean iaculis neque at ligula bibendum pharetra. Morbi accumsan posuere sapien, et auctor augue consectetur sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquet faucibus condimentum. Sed iaculis lacus non molestie fringilla. Aliquam vel molestie sapien.</p>
            </div>
            <div className='mainsection_featured msection_3'>
                <Parallax
                    blur={{ min: 3, max: 8 }}
                    bgImage={require('../../img/placeholder1.jpg')}
                    bgImageStyle={{}}
                    bgImageAlt="the dog"
                    strength={-100}
                >
                    <div>
                    <CardGroup className='feat_aboutcards_gp'>
                        <Card1 title="IoT" body="Utilizar LoRa para comunicação" imalt="IoT" imsrc="https://cdn-icons-png.flaticon.com/512/1185/1185864.png"/>
                        <Card1 title="MQTT" body="Fila de mensagens flexibiliza a instalação" imsrc="https://raw.githubusercontent.com/github/explore/6afe2c43768e7ef1e252839a1f1c12b730faa007/topics/mqtt/mqtt.png"/>
                        <Card1 title="RESTful API" body="API utilizável em múltiplos contextos" imsrc="https://icon-library.com/images/rest-api-icon/rest-api-icon-8.jpg"/>
                        <Card1 title="Aplicações" body="Múltiplas aplicações podem fazer o uso do sistema de forma geral, ou parte dele" imsrc="https://cdn-icons-png.flaticon.com/512/5738/5738077.png"/>
                    </CardGroup>
                    </div>
                </Parallax>
            </div>
            <div className='mainsection_featured msection_4'>
                Arquitetura aqui
            </div>
            <div className='mainsection_featured msection_5'>
                <AnimatedArchitecture/>
            </div>
        </div>
    );
}

function Card1(parameters){
    //CardHeader,CardBody,CardFooter,CardTitle,CardText,CardBodyProps
    return (<Card>
        <CardHeader
        style={{
            width: "85%",
            margin: "auto"
        }}
        >{parameters.title}</CardHeader>
        <CardImg
            alt={parameters.imalt == undefined? parameters.title:parameters.imalt}
            src={parameters.imsrc}
            style={{
                margin: "30px auto 0px auto",
                width: "100px",
                height: "100px",
            }}
        />
        <CardBody>
            <CardText>{parameters.body}</CardText>
        </CardBody>
    </Card>);
}

function Card2(parameters){
    return (<Card>
        <CardImg
            alt="Card image cap"
            src="https://picsum.photos/id/135/318/180?grayscale&blur=10"
            top
            width="30vw"
        />
        <CardBody>
            <Placeholder
            animation="wave"
            tag={function noRefCheck(){}}
            >
            <Placeholder xs={8} />
            </Placeholder>
            <Placeholder
            animation="wave"
            tag={function noRefCheck(){}}
            >
            <Placeholder xs={12} />
            <Placeholder xs={7} />
            </Placeholder>
            <PlaceholderButton xs={8} />
        </CardBody>
    </Card>);
}

/* const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30
  }
}; */
/* const images = [
  "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
]; */

// Because this is an inframe, so the SSR mode doesn't not do well here.
// It will work on real devices.
/* const Simple = ({ deviceType }) => {
  return (
    <Carousel
      ssr
      partialVisbile
      deviceType={deviceType}
      itemClass="image-item"
      responsive={responsive}
    >
      {images.slice(0, 5).map(image => {
        return (
            <img src={image}/>
        );
      })}
    </Carousel>
  );
};
 */

