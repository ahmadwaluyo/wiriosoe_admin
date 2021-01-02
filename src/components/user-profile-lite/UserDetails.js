import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress,
  ModalHeader,
  ModalBody
} from "shards-react";
import { Modal, Row, Col, Divider } from "antd";
import QRCode from "qrcode.react";

const dataToken = JSON.parse(localStorage.getItem("token"));

const UserDetails = (props) => {
  const { userDetails, student } = props;
  const [state, setState] = useState({
    open: false
  })
  const toggle = () => {
    setState({
      open: !state.open
    });
  }
  const dummyBarcode = [
    {
      "nama": "ahmad waluyo",
      "role": "ustadz"
    }
  ]

  if (student) {
    const { dataSantri } = props;
    return (
      <Card small className="mb-4 pt-3">
        <Modal 
        title={false}
        visible={state.open}
        onCancel={toggle}
        centered
        closable={false}
        footer={false}
        >
            <Row gutter={12} className="d-flex justify-content-center align-items-center">
                <Col>
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title kt-font-bolder">
                            SCAN NOMOR INDUK SANTRI
                        </h3>
                    </div>
                </Col>
                <Divider />
                <Col>
                    <QRCode value={JSON.stringify(dummyBarcode)} size={400} />
                </Col>
            </Row>
        </Modal>
        <CardHeader className="border-bottom text-center">
          <div className="mb-3 mx-auto">
            <img
              className="rounded-circle"
              src={userDetails.avatar}
              alt={userDetails.name}
              width="110"
            />
          </div>
          <h4 className="mb-0">{dataSantri.nama}</h4>
          <span className="text-muted d-block mb-2">Santri</span>
          <Button pill outline size="sm" className="mb-2" onClick={toggle}>
            Show Barcode
          </Button>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="px-4">
            <div className="progress-wrapper">
              <strong className="text-muted d-block mb-2">
                {userDetails.performanceReportTitle}
              </strong>
              <Progress
                className="progress-sm"
                value={userDetails.performanceReportValue}
              >
                <span className="progress-value">
                  {userDetails.performanceReportValue}%
                </span>
              </Progress>
            </div>
          </ListGroupItem>
          <ListGroupItem className="p-4">
            <strong className="text-muted d-block mb-2">
              {userDetails.metaTitle}
            </strong>
            <span>{userDetails.metaValue}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  } else {
    const { dataUser } = props;
    if (dataUser) {
      return (
        <Card small className="mb-4 pt-3">
          <Modal size="sm" open={state.open} toggle={toggle} centered>
              <ModalHeader>Scan Barcode</ModalHeader>
                  <ModalBody>
                    <QRCode value={JSON.stringify(dummyBarcode)} />
                  </ModalBody>
              </Modal>
          <CardHeader className="border-bottom text-center">
            <div className="mb-3 mx-auto">
              <img
                className="rounded-circle"
                src={userDetails.avatar}
                alt={userDetails.name}
                width="110"
              />
            </div>
            <h4 className="mb-0">{dataUser.fullname}</h4>
            <span className="text-muted d-block mb-2">{dataUser.role}</span>
            <Button pill outline size="sm" className="mb-2" onClick={toggle}>
              Show Barcode
            </Button>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="px-4">
              <div className="progress-wrapper">
                <strong className="text-muted d-block mb-2">
                  {userDetails.performanceReportTitle}
                </strong>
                <Progress
                  className="progress-sm"
                  value={userDetails.performanceReportValue}
                >
                  <span className="progress-value">
                    {userDetails.performanceReportValue}%
                  </span>
                </Progress>
              </div>
            </ListGroupItem>
            <ListGroupItem className="p-4">
              <strong className="text-muted d-block mb-2">
                {userDetails.metaTitle}
              </strong>
              <span>{userDetails.metaValue}</span>
            </ListGroupItem>
          </ListGroup>
        </Card>
      );
    } else {
      return (
        <Card small className="mb-4 pt-3">
          <Modal size="sm" open={state.open} toggle={toggle} centered>
              <ModalHeader>Scan Barcode</ModalHeader>
                  <ModalBody>
                    <QRCode value={JSON.stringify(dummyBarcode)} />
                  </ModalBody>
              </Modal>
          <CardHeader className="border-bottom text-center">
            <div className="mb-3 mx-auto">
              <img
                className="rounded-circle"
                src={userDetails.avatar}
                alt={userDetails.name}
                width="110"
              />
            </div>
            <h4 className="mb-0">{userDetails.name}</h4>
            <span className="text-muted d-block mb-2">{userDetails.jobTitle}</span>
            <Button pill outline size="sm" className="mb-2" onClick={toggle}>
              Show Barcode
            </Button>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="px-4">
              <div className="progress-wrapper">
                <strong className="text-muted d-block mb-2">
                  {userDetails.performanceReportTitle}
                </strong>
                <Progress
                  className="progress-sm"
                  value={userDetails.performanceReportValue}
                >
                  <span className="progress-value">
                    {userDetails.performanceReportValue}%
                  </span>
                </Progress>
              </div>
            </ListGroupItem>
            <ListGroupItem className="p-4">
              <strong className="text-muted d-block mb-2">
                {userDetails.metaTitle}
              </strong>
              <span>{userDetails.metaValue}</span>
            </ListGroupItem>
          </ListGroup>
        </Card>
      );
    }
  }
}

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

// const { username, fullname, role } = dataToken.content;

UserDetails.defaultProps = {
  userDetails: {
    name: `${dataToken && dataToken.content.fullname}`,
    avatar: require("../../assets/img/male-avatar.png"),
    jobTitle: `${dataToken && dataToken.content.role}`,
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
};

export default UserDetails