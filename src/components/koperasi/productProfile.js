import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
} from "shards-react";
import { Carousel } from 'antd';
import QRCode from "qrcode.react";

const ProductProfile = ({ userDetails }) => {
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
  return (
    <Card small className="mb-4 pt-3">
      <Modal size="sm" open={state.open} toggle={toggle} centered>
          <ModalHeader>Scan Barcode</ModalHeader>
              <ModalBody>
                <QRCode value={JSON.stringify(dummyBarcode)} />
              </ModalBody>
          </Modal>
      <CardHeader className="border-bottom text-center">
        <Carousel autoplay>
            <div>
                <img src={"https://cf.shopee.co.id/file/2cc0fbcb5462782974c2cf09c8d44654"} style={contentStyle} className="col-md-12" />
            </div>
            <div>
                <img src={"https://cf.shopee.co.id/file/2cc0fbcb5462782974c2cf09c8d44654"} style={contentStyle} className="col-md-12" />
            </div>
            <div>
                <img src={"https://cf.shopee.co.id/file/2cc0fbcb5462782974c2cf09c8d44654"} style={contentStyle} className="col-md-12" />
            </div>
            <div>
                <img src={"https://cf.shopee.co.id/file/2cc0fbcb5462782974c2cf09c8d44654"} style={contentStyle} className="col-md-12" />
            </div>
        </Carousel>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="px-4 text-center">
          <div className="progress-wrapper">
            <h4 className="mb-0">{userDetails.name}</h4>
            <span className="text-muted d-block mb-2">{userDetails.jobTitle}</span>
            <Button pill outline size="sm" className="mb-1" onClick={toggle}>
            Show Barcode
            </Button>
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

ProductProfile.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

ProductProfile.defaultProps = {
  userDetails: {
    name: "Sierra Brooks",
    avatar: require("./../../images/avatars/0.jpg"),
    jobTitle: "Project Manager",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
};

const contentStyle = {
    height: '40vh',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
  };

export default ProductProfile