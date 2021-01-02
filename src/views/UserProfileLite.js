import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";

const UserProfile = (props) => {
  if (props.location.state) {
    const { student, dataSantri, dataUser } = props.location.state;

    if (dataSantri) {
      return (
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
          </Row>
          <Row>
            <Col lg="4">
              <UserDetails dataSantri={dataSantri} student={student} />
            </Col>
            <Col lg="8">
              <UserAccountDetails dataSantri={dataSantri} student={student} />
            </Col>
          </Row>
        </Container>
      )
    } else {
      return (
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
          </Row>
          <Row>
            <Col lg="4">
              <UserDetails dataUser={dataUser} student={false} />
            </Col>
            <Col lg="8">
              <UserAccountDetails dataUser={dataUser} student={false} />
            </Col>
          </Row>
        </Container>
      )
    }
  } else {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
          <Col lg="4">
            <UserDetails student={false} />
          </Col>
          <Col lg="8">
            <UserAccountDetails student={false} />
          </Col>
        </Row>
      </Container>
    )
  }
};

export default UserProfile;
