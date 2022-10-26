import React, { FC } from 'react';
import {ListGroup, Row} from "react-bootstrap";

interface HomepageProps {}

const Homepage: FC<HomepageProps> = () => (
  <Row>
      <div className="col-md-6">
          <h2>Your upcoming deadlines</h2>
          <ListGroup>
              <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                  <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">F22_CO-560-A</h5>
                      <small>Tomorrow</small>
                  </div>
                  <p className="mb-1">DBWS Deadline for Assignment 3...</p>
                  <small className="text-muted">10 people completed</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">F22_CO-562-A</h5>
                      <small>3 days left</small>
                  </div>
                  <p className="mb-1">OS Deadline for Assignment 4...</p>
                  <small className="text-muted">2 people completed</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">F22_JTMS-12</h5>
                      <small>Wed, 25th Oct</small>
                  </div>
                  <p className="mb-1">PRP Deadline for Problem Set 2...</p>
                  <small className="text-muted">0 people completed</small>
              </a>
          </ListGroup>
          <nav aria-label="Page navigation example" className="mt-3">
              <ul className="pagination justify-content-center">
                  <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                      </a>
                  </li>
                  <li className="page-item"><a className="page-link active" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                      </a>
                  </li>
              </ul>
          </nav>
      </div>
      <div className="col spacer ml-1"></div>
      <div className="col-sm-5">
          <h2>Your groups</h2>
          <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                  <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">F22_CO-562-A</h5>
                      <small>17 people</small>
                  </div>
                  <p className="mb-1"> Second Year 2022 Operating Systems...</p>
                  <small className="text-muted">Next deadline: in 2 days</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">F22_CO-560-A</h5>
                      <small>32 people</small>
                  </div>
                  <p className="mb-1">Second Year 2022 Databases and Web Services...</p>
                  <small className="text-muted">Next deadline: in 1 day</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">F22_JTMS-12</h5>
                      <small>26 people</small>
                  </div>
                  <p className="mb-1">Second Year 2022 Probabilities and Random Processes...</p>
                  <small className="text-muted">Next deadline: in 4 days</small>
              </a>
          </div>
          <nav aria-label="Page navigation example" className="mt-3">
              <ul className="pagination justify-content-center">
                  <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                      </a>
                  </li>
                  <li className="page-item"><a className="page-link active" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                      </a>
                  </li>
              </ul>
          </nav>
      </div>
  </Row>
);

export default Homepage;
