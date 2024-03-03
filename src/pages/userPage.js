import axios from "axios";
import React, {useEffect, useState} from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col
} from "reactstrap";
import { LoginContext, LoginWrapper } from "../context/LoginContext";

/* function RetrieveToken(){
    
    const { token, setToken } = useToken();
    
    if(!token) {
        return <Login setToken={setToken} />
    }
    return (
        <div className="wrapper">
            <h1>Application</h1>
            <BrowserRouter>
                <Switch>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/preferences">
                    <Preferences />
                </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
} */
import '../styles/userPage.css'

const UserPanel = ({currentLoginInfo,revokeToken})=>{
  console.log("?????")
  const [panelState,setPanelState] = useState(false)
  useEffect(()=>{
      axios.get('http://192.168.43.35:8081/api/v1/protected',{
      headers: {
          Authorization: currentLoginInfo
      }
  }).then((resp1)=>{
    console.log("resp1");
    console.log(resp1);
    
  }).catch((e)=>{
    console.log(e)
    console.log("no longer valid, revoking");
    revokeToken();
  });
  },[]);
  
  return (currentLoginInfo
    ?<div>Already logged in</div>
    :<div>Error opening user</div>);
}

const UserPages = ()=>{
  
  let [authMode,setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }
  
  const [formData, setFormData] = useState({
    un: '',
    pw: '',
    remember: false,
    // Add more fields as needed
  });

  return (
        <div className="userBody">
          <LoginWrapper>
              <LoginContext.Consumer>
                {({currentLoginInfo,auth,signup,revokeToken})=>{

                  console.log("defaulting to: ");
                  console.log(currentLoginInfo);
                  const handleInputChange = (event) => {
                    const { name, value } = event.target;
                    setFormData({
                      ...formData,
                      [name]: value,
                    });
                  };

                  const handleAuthSubmit = (event) => {
                    event.preventDefault();
                    // Now you can access formData and pass it to your function
                    auth(formData.un,formData.pw,formData.remember);
                  };
                  const handleSignupSubmit = (event) => {
                    event.preventDefault();
                    // Now you can access formData and pass it to your function
                    signup(formData.un, formData.pw);
                  };

                  if(!currentLoginInfo || currentLoginInfo == null){
                    if (authMode === "signin") return (
                        <div className="Auth-form-container">
                          <form className="Auth-form" onSubmit={handleAuthSubmit}>
                            <div className="Auth-form-content">
                              <h3 className="Auth-form-title">Sign In</h3>
                              <div className="text-center">
                                Not registered yet?{" "}
                                <span className="link-primary" onClick={changeAuthMode}>
                                  Sign Up
                                </span>
                              </div>
                              <div className="form-group mt-3">
                                <label>Username</label>
                                <input
                                  type="text"
                                  name="un"
                                  value={formData.un}
                                  className="form-control mt-1"
                                  placeholder="Enter username"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                  type="password"
                                  name="pw"
                                  value={formData.pw}
                                  className="form-control mt-1"
                                  placeholder="Enter password"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="form-group mt-1">
                                <p style={{marginRight: "10px",display: "initial"}}>Remember me?</p>
                                <input
                                  value={formData.remember}
                                  onChange={handleInputChange}
                                  type="checkbox" name="remember"
                                  checked={formData.remember}
                                />
                              </div>
                              <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                  Submit
                                </button>
                              </div>
                              <p className="text-center mt-2">
                                Forgot <a href="#">password?</a>
                              </p>
                            </div>
                          </form>
                        </div>
                      )
                    return (
                      <div className="Auth-form-container">
                        <form className="Auth-form" onSubmit={handleSignupSubmit}>
                          <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Sign Up</h3>
                            <div className="text-center">
                              Already registered?{" "}
                              <span className="link-primary" onClick={changeAuthMode}>
                                Sign In
                              </span>
                            </div>
                            <div className="form-group mt-3">
                              <label>Username</label>
                              <input
                                type="text"
                                name="un"
                                className="form-control mt-1"
                                placeholder="My unique Username"
                                value={formData.un}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="form-group mt-3">
                              <label>Password</label>
                              <input
                                type="password"
                                name="pw"
                                value={formData.pw}
                                className="form-control mt-1"
                                placeholder="Password"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                              <button type="submit" className="btn btn-primary">
                                Submit
                              </button>
                            </div>
                            <p className="text-center mt-2">
                              Forgot <a href="#">password?</a>
                            </p>
                          </div>
                        </form>
                      </div>
                    )
                  }else{
                    /* const loopback = async ()=>{
                      return await axios.get('http://192.168.43.35:8081/api/v1/protected',{
                        headers: {
                            Authorization: currentLoginInfo
                      }
                      }).then((resp1)=>{
                        console.log("resp1");
                        console.log(resp1);
                        return (<div>Already logged in</div>);
                      }).catch((e)=>{
                        console.log(e)
                        return (<div>Error opening user</div>);
                      });
                    }
                    loopback(); */
                    return (<UserPanel currentLoginInfo={currentLoginInfo} revokeToken={revokeToken}/>);
                  }
                }}
              </LoginContext.Consumer>
          </LoginWrapper>
      </div>
  );
  
}

export default UserPages;


class UserPages2 extends React.Component {
  state = {
    defaultModal: false,
    loggedIn: false
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  
  render() {
    localStorage.getItem("stonks")
    sessionStorage.getItem("stonks")
    return (
      <>
        <Row>
          <Col md="4">
            <Button
              block
              className="mb-3"
              color="primary"
              type="button"
              onClick={() => this.toggleModal("defaultModal")}
            >
              Default
            </Button>
            <Modal
              className="modal-dialog-centered"
              isOpen={this.state.defaultModal}
              toggle={() => this.toggleModal("defaultModal")}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  Type your modal title
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("defaultModal")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind
                  texts. Separated they live in Bookmarksgrove right at the
                  coast of the Semantics, a large language ocean.
                </p>
                <p>
                  A small river named Duden flows by their place and supplies
                  it with the necessary regelialia. It is a paradisematic
                  country, in which roasted parts of sentences fly into your
                  mouth.
                </p>
              </div>
              <div className="modal-footer">
                <Button color="primary" type="button">
                  Save changes
                </Button>
                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("defaultModal")}
                >
                  Close
                </Button>
              </div>
            </Modal>
          </Col>
          <Col md="4">
            <Button
              block
              className="mb-3"
              color="warning"
              type="button"
              onClick={() => this.toggleModal("notificationModal")}
            >
              Notification
            </Button>
            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={this.state.notificationModal}
              toggle={() => this.toggleModal("notificationModal")}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Your attention is required
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("notificationModal")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">You should read this!</h4>
                  <p>
                    A small river named Duden flows by their place and
                    supplies it with the necessary regelialia.
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button">
                  Ok, Got it
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("notificationModal")}
                >
                  Close
                </Button>
              </div>
            </Modal>
          </Col>
          <Col md="4">
            <Button
              block
              color="default"
              type="button"
              onClick={() => this.toggleModal("formModal")}
            >
              Form
            </Button>
            <Modal
              className="modal-dialog-centered"
              size="sm"
              isOpen={this.state.formModal}
              toggle={() => this.toggleModal("formModal")}
            >
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent pb-5">
                    <div className="text-muted text-center mt-2 mb-3">
                      <small>Sign in with</small>
                    </div>
                    <div className="btn-wrapper text-center">
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <span className="btn-inner--icon">
                          <img
                            alt="..."
                            /* src={require("assets/img/icons/common/github.svg")} */
                          />
                        </span>
                        <span className="btn-inner--text">Github</span>
                      </Button>
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <span className="btn-inner--icon">
                          <img
                            alt="..."
                            /* src={require("assets/img/icons/common/google.svg")} */
                          />
                        </span>
                        <span className="btn-inner--text">Google</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Or sign in with credentials</small>
                    </div>
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          <Input placeholder="Email" type="email" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          <Input placeholder="Password" type="password" />
                        </InputGroup>
                      </FormGroup>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor=" customCheckLogin"
                        >
                          <span className="text-muted">Remember me</span>
                        </label>
                      </div>
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="primary"
                          type="button"
                        >
                          Sign in
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}