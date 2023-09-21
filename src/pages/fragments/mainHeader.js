import React, { useState,useEffect,Component, useContext } from 'react';
import UserAlerts from '../../components/userAlerts';
import UserLoginButton from '../../components/userLoginButton';
import axios from 'axios';

//import {fetchLocationData,fetchUserip} from '../../util/LocationHandler';

import {Card,CardImg,CardBody,Placeholder,PlaceholderButton,Input,Container,Row,Col,Button, Dropdown} from 'reactstrap';

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
  } from 'reactstrap';
import NavSearchBar from '../../components/searchBar';
import NewSearchBar from '../../components/newSearchBar';
  
import {ContextContainer,id_} from '../../util/staticVariables';


function RetrieveCarousel(args){
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [carouselData, setCarouselData] = useState([]);
    const [loadCarouselData,setLoadCarouselData] = useState(false);

    

    const { appState } = useContext(ContextContainer);

    console.log("rebuilding: ");
    useEffect(()=>{
        const loc_data = appState.locationData;
        if(loc_data!=undefined){
            axios.get("http://192.168.0.4:8081/api/v2/ui_data/webapp_main_carousel?cityName="+loc_data.city)
            .then( response => {
                setCarouselData(response.data);
            })
            .catch(error => {
                console.error(error);
                return null;
            });
        }
    },[appState,loadCarouselData])
    
    /* useEffect(()=> {
        console.log("effect is:");
        const load = async () => {
            if(loc_data!=undefined){
                console.log("running query");
                const cresp = await axios.get("http://192.168.0.4:8081/api/v2/ui_data/webapp_main_carousel?cityName="+loc_data.city)
                .then( response => {
                    console.log("server response done");
                    return response.data
                } )
                .catch(error => {
                    console.error(error);
                    return null;
                });
                console.log("obtained: ");
                console.log(cresp);
                if(cresp!=null){
                    setCarouselData(cresp);
                }
            }else{
                console.log("not running query");
            }
        }
        
        if(loadCarouselData){
            console.log("will run");
            load();
        }else{
            console.log("wont run");
        }

    },[loadCarouselData]); */

    /* useEffect(() => {
        fetchLocationData().then(cityResponse => {
            console.log(cityResponse);
            axios.get("http://192.168.0.4:8081/api/v2/ui_data/webapp_main_carousel?cityName="+cityResponse.data.city)
            .then(response => {
                setCarouselData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        })
        .catch((e)=>console.error(e));
    }, []) */
        
        
        
        const next = () => {
            if (animating) return;
            const nextIndex = activeIndex === carouselData.length - 1 ? 0 : activeIndex + 1;
            setActiveIndex(nextIndex);
        };
        
        const previous = () => {
            if (animating) return;
            const nextIndex = activeIndex === 0 ? carouselData.length - 1 : activeIndex - 1;
            setActiveIndex(nextIndex);
        };
        
        const goToIndex = (newIndex) => {
            if (animating) return;
            setActiveIndex(newIndex);
        };
        
        if(carouselData.length < 1)
            carouselData.push({
                titleUpper: "Dados indisponíveis no momento",
                titleLower: "não há dados para sua região",
                description: [
                    "Os serviços de busca de dados encontram-se desativados ou fora do ar.",
                    "Contate a administração assim que possível."
                ],
                actions: [
                    {
                        type: "bt1",
                        txt: "Notificar",
                        action:"notify_me"
                    }
                ],
                key: id_()
            })
        
        for(let i=0;i < carouselData.length;i++){
            console.log(carouselData[i])
            carouselData[i].key= id_();
            console.log(carouselData[i])
            console.log("------")
        }
            

        /* const items = [
            {
                src: 'https://picsum.photos/id/123/1200/400',
                altText: 'Slide 1',
                caption: 'Slide 1',
                key: 1,
            },
            {
                src: 'https://picsum.photos/id/456/1200/400',
                altText: 'Slide 2',
                caption: 'Slide 2',
                key: 2,
            },
            {
                src: 'https://picsum.photos/id/678/1200/400',
                altText: 'Slide 3',
                caption: 'Slide 3',
                key: 3,
            },
            ]; */
            /* const items = carouselData.map( x => ({
                    titleUpper: <h1 className="display-3 text-white" style={{textAlign: "justify",borderBottom:"2.5px white solid"}}>{x.upperT}</h1>,
                    titleLower: <h3 className="display-6 text-white" style={{textAlign: "end"}}>{x.lowerT}</h3>,
                    description: x.descr.map( line => ( <p className="lead text-white">{line}</p> )),
                    actions: x.actions.map(action => (
                        action.type=='bt1'
                        ?<Button
                            className="btn-icon mb-3 mb-sm-0"
                            color="info"
                            href={action.action}
                            >
                            <span className="btn-inner--icon mr-1">
                                <i className="fa fa-code" />
                            </span>
                            <span className="btn-inner--text">{action.txt}</span>
                        </Button>
                        :action.type=='bt2'
                        ?<Button 
                            href={action.action}
                            className='btn-white btn-icon mb-3 mb-sm-0 ml-1'color='default'>
                            <span className='btn-inner--icon mr-1'><i className='ni ni-cloud-download-95' /></span>
                            <span className='btn-inner--text'>{action.txt}</span>
                        </Button>:null
                    )),
                    key: ()=>{return i_++;}
                })
            )
        
        console.log(items); */
        console.log(carouselData);
        const slides = carouselData.map((item) => {
            return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.key}
            >
                <Container className="py-lg-md d-flex">
                <div className="col px-0">
                    <Row>
                        <Col lg="6">
                            <h1 className="display-3 text-white" style={{textAlign: "justify",borderBottom:"2.5px white solid"}}>{item.titleUpper}</h1>
                            <h3 className="display-6 text-white" style={{textAlign: "end"}}>{item.titleLower}</h3>
                            <div>{item.description.map( (line,itl) => ( <p key={itl} className="lead text-white">{line}</p>))}</div>
                            <div className="btn-wrapper">
                                {item.actions.map(action => (
                                    action.type=='bt1'
                                    ?<Button
                                        className="btn-icon mb-3 mb-sm-0"
                                        color="info"
                                        href={action.action}
                                        >
                                        <span className="btn-inner--icon mr-1">
                                            <i className="fa fa-code" />
                                        </span>
                                        <span className="btn-inner--text">{action.txt}</span>
                                    </Button>
                                    :action.type=='bt2'
                                    ?<Button 
                                        href={action.action}
                                        className='btn-white btn-icon mb-3 mb-sm-0 ml-1'color='default'>
                                        <span className='btn-inner--icon mr-1'><i className='ni ni-cloud-download-95' /></span>
                                        <span className='btn-inner--text'>{action.txt}</span>
                                    </Button>:null
                                ))}
                            </div>
                        </Col>
                    </Row>
                    </div>
                </Container>
                {/* <img src={item.src} alt={item.altText} />
                <CarouselCaption
                captionText={item.caption}
                captionHeader={item.caption}
                /> */}
            </CarouselItem>
            );
        });
        
        return (<Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            {...args}
        >
            {carouselData.length>1?
                <CarouselIndicators
                    items={carouselData}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                    />
            :null}
            {slides}
            {carouselData.length>1?
                <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                    />
            :null}
            {carouselData.length>1?
                <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                    />
            :null}
        </Carousel>);
}

function CurrentStatus(){
    //const [ip, setIP] = useState("");

    //creating function to load ip address from the API
    // const getData = async () => {
    //   const res = await axios.get("https://geolocation-db.com/json/");
    //   console.log(res.data);
    //   setIP(res.data.IPv4);
    // };

    // Updated Code
  
    const { appState } = useContext(ContextContainer);
    
    /* const [cityName, setCityName] = useState(null);
    fetchLocationData().then(response=>{
        setCityName(response.data.city);
    })
    .catch(e=>console.error(e)); */
  return (
    <p style={{display: "contents",color: "white",}}>
        {appState.locationData ? 
            /* {JSON.stringify(cityName, null, 2)} */
            appState.locationData.city
         : 'Loading...'}
    </p>
  );
}

function MainHeader(){
    return (
            <div className='main_header'>
            <div className='navmenu'>
                <div className='navmenu_icon'></div>
                <div className='navmenu_diag'>
                    <div className='navmenu_item'>
                        <CurrentStatus></CurrentStatus>
                    </div>
                    <div className='navmenu_item'>
                        <NewSearchBar></NewSearchBar>
                    </div>
                    <div className='navmenu_item'>
                        <UserAlerts></UserAlerts>
                    </div>
                    <div className='navmenu_item'>
                        <UserLoginButton></UserLoginButton>
                    </div>
                </div>
            </div>
            <div className='header_section header_content_evenlyspaced'>
                <RetrieveCarousel></RetrieveCarousel>
            </div>
        </div>
    );
}

class MainHeader2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
        //stonks:0
        }
        //this.raisestonks = this.raisestonks.bind(this);
    }

    /* raisestonks() {
        this.setState({
        stonks:this.state.stonks+1
        })
        
    } */

    render(){
        return(
            <div className='main_header'>
            <div className='navmenu'>
                <div className='navmenu_icon'></div>
                <div className='navmenu_diag'>
                    <div className='navmenu_item'>
                        <CurrentStatus></CurrentStatus>
                    </div>
                    <div className='navmenu_item'>
                        <NewSearchBar></NewSearchBar>
                    </div>
                    <div className='navmenu_item'>
                        <UserAlerts></UserAlerts>
                    </div>
                    <div className='navmenu_item'>
                        <UserLoginButton></UserLoginButton>
                    </div>
                </div>
            </div>
            <div className='header_section header_content_evenlyspaced'>
            <RetrieveCarousel></RetrieveCarousel>
                {/* <div className='header_content headersectioncontent_leftmost'>
                    
                </div> */}
{/*                 <div className='header_content headersectioncontent_rightmost'>
                    
                </div> */}
            </div>
        </div>
        );
    }
}



export default MainHeader;