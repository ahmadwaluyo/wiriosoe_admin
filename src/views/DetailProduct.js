import React from "react";
import { Container, Row, Col } from "shards-react";
import { Divider } from "antd";

import PictureProduct from "../components/koperasi/pictureProduct";
import ProductProfile from "../components/koperasi/productProfile";
import DetailProductKomponen from "../components/koperasi/detailProduct";

const Products = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PictureProduct title="Detail Product Koperasi" md="12" className="ml-sm-auto mr-sm-auto" />
      <Divider />
    </Row>
    <Row>
      <Col lg="4">
        <ProductProfile />
      </Col>
      <Col lg="8">
        <DetailProductKomponen />
      </Col>
    </Row>
  </Container>
);

export default Products;
