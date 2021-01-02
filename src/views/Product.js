import React from "react";
import { Card, Col, Row } from 'antd';
import { Typography } from 'antd';
import { Menu, Input, Divider } from 'antd';
// import { Empty } from 'antd';
import List from './components/ListProduct';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Search } = Input;
const { Meta } = Card;

export default function Product (props) {
    const [state, setState] = React.useState({
        current: 'app'
    })
    const [selectView, setSelectView] = React.useState(false);
    const handleClick = e => {
        console.log('click ', e);
        setState({ current: e.key });
    };
    const {history} = props;
    return (
        <div className="site-card-wrapper ml-5 mr-5">
            <Menu onClick={handleClick} selectedKeys={[state.current]} mode="horizontal" className="sticky-top bg-transparent">
                <Menu.Item key="app" title="Tampilan Grid" icon={<AppstoreOutlined />} onClick={() => setSelectView(false)}>
                Tampilan Grid
                </Menu.Item>
                <Menu.Item key="mail" title="Tampilan List" icon={<UnorderedListOutlined />} onClick={() => setSelectView(true)}>
                Tampilan List
                </Menu.Item>
            </Menu>
            {
                selectView ?
                (
                <section>
                    <List />
                    <br />
                </section>
                )
                :
               (
               <section>
                    <br />
                    <Row>
                        <Col span={12}>
                            <Title level={3}>Produk Koperasi</Title>
                        </Col>
                        <Col span={12}>
                            <Search
                            placeholder="input product"
                            allowClear
                            enterButton="Search"
                            size="large"
                            // onSearch={onSearch}
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <br />
                    {/* <Empty /> */}
                    <Row gutter={16}>
                        <Col lg={6} md={6} xs={12} className="mb-4">
                            <Card
                                onClick={() => history.push("/id_product/1")}
                                hoverable
                                cover={<img alt="example" src="https://cf.shopee.co.id/file/2cc0fbcb5462782974c2cf09c8d44654" />}
                                actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                                ]}
                                >
                                <Meta title="Europe Street beat" description="Rp. 100,000,-" />
                            </Card>
                        </Col>
                        <Col lg={6} md={6} xs={12} className="mb-4">
                            <Card
                                hoverable
                                cover={<img alt="example" src="https://cf.shopee.co.id/file/2cc0fbcb5462782974c2cf09c8d44654" />}
                                actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                                ]}
                                >
                                <Meta title="Europe Street beat" description="Rp. 100,000,-" />
                            </Card>
                        </Col>
                        <Col lg={6} md={6} xs={12} className="mb-4">
                            <Card
                                hoverable
                                cover={<img alt="example" src="https://cf.shopee.co.id/file/2cc0fbcb5462782974c2cf09c8d44654" />}
                                actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                                ]}
                                >
                                <Meta title="Europe Street beat" description="Rp. 100,000,-" />
                            </Card>
                        </Col>
                        <Col lg={6} md={6} xs={12} className="mb-4">
                            <Card
                                hoverable
                                cover={<img alt="example" src="https://cf.shopee.co.id/file/2cc0fbcb5462782974c2cf09c8d44654" />}
                                actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                                ]}
                                >
                                <Meta title="Europe Street beat" description="Rp. 100,000,-" />
                            </Card>
                        </Col>
                        <Col lg={6} md={6} xs={12} className="mb-4">
                            <Card
                                hoverable
                                cover={<img alt="example" src="https://cf.shopee.co.id/file/2cc0fbcb5462782974c2cf09c8d44654" />}
                                actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                                ]}
                                >
                                <Meta title="Europe Street beat" description="Rp. 100,000,-" />
                            </Card>
                        </Col>
                        <Col lg={6} md={6} xs={12} className="mb-4">
                            <Card
                                hoverable
                                cover={<img alt="example" src="https://cf.shopee.co.id/file/2cc0fbcb5462782974c2cf09c8d44654" />}
                                actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                                ]}
                                >
                                <Meta title="Europe Street beat" description="Rp. 100,000,-" />
                            </Card>
                        </Col>
                        <Col lg={6} md={6} xs={12} className="mb-4">
                            <Card
                                hoverable
                                cover={<img alt="example" src="https://cf.shopee.co.id/file/2cc0fbcb5462782974c2cf09c8d44654" />}
                                actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                                ]}
                                >
                                <Meta title="Europe Street beat" description="Rp. 100,000,-" />
                            </Card>
                        </Col>
                        <Col lg={6} md={6} xs={12} className="mb-4">
                            <Card
                                hoverable
                                cover={<img alt="example" src="https://cf.shopee.co.id/file/2cc0fbcb5462782974c2cf09c8d44654" />}
                                actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                                ]}
                                >
                                <Meta title="Europe Street beat" description="Rp. 100,000,-" />
                            </Card>
                        </Col>
                    </Row>
                </section>
                )
            }
        </div>
    )
}