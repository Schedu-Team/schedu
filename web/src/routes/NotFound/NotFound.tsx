import React, { FC } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

import image404 from "../../img/undraw_page_not_found_re_e9o6.svg";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

interface NotFoundProps {}

// <div className="container" style="margin-top: 3em;">
//     <div className="row justify-content-center">
//         <div className="col-11 col-sm-11 col-md-10 col-lg-9 col-xl-7"><img alt="404"
//                                                                            src="assets/img/undraw_page_not_found_su7k.svg"
//                                                                            className="unselectable"
//                                                                            style="width: 100%;"></div>
//     </div>
//     <div className="row justify-content-center">
//         <div className="col-md-12" style="margin-top: 20px;"><p className="text-center"
//                                                                 style="font-size: 28px; font-family: Montserrat, sans-serif;">
//             <strong>We couldn't find the page you were looking for</strong></p></div>
//     </div>
//     <div className="row justify-content-center">
//         <div className="col-md-12 text-center" style="margin-top: 20px;"><a role="button" routerlink="/"
//                                                                             className="btn btn-primary btn-lg border rounded"
//                                                                             href="/">Take me home</a></div>
//     </div>
// </div>

const NotFound: FC<NotFoundProps> = () => (
  <Container>
    <Row className={"justify-content-center"}>
      <Col className={"col-md-8 px-3 mx-auto text-center"}>
        <Image src={image404} style={{ width: "100%" }}></Image>
      </Col>
    </Row>
    <Row className={"justify-content-center"}>
      <Col className={"col-md-8 px-3 mx-auto text-center"}>
        <p>
          <strong>We couldn't find the page you were looking for</strong>
        </p>
      </Col>
    </Row>
    <Row className={"justify-content-center"}>
      <Col className={"col-md-8 px-3 mx-auto text-center"}>
        <Link to={"/"}>
          <Button>Take Me Home</Button>
        </Link>
      </Col>
    </Row>
  </Container>
);

export default NotFound;
