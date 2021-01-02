import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col
} from "shards-react";
import { 
    Drawer, 
    Form, 
    Button, 
    InputNumber, 
    Select, 
    Descriptions, 
    Input 
} from 'antd';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { WalletOutlined } from '@ant-design/icons';
import { Cameras, Scanner } from "react-instascan";

const { Option } = Select;

const DetailProduct = ({ title }) => {
    const [state, setState] = React.useState({
        visible: false,
        loading: false,
        imageUrl: ''
    });
    const [activate, setActivate] = React.useState(false)
    const showDrawer = () => {
        setState({
            ...state,
          visible: true,
        });
    };
    const onClose = () => {
        setState({
            ...state,
          visible: false,
        });
    };
    const onChange = (value) => {
        console.log('changed', value);
    }
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    } 
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    const handleChange = info => {
        if (info.file.status === 'uploading') {
          setState({ ...state, loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            setState({
            ...state,
              imageUrl,
              loading: false,
            }),
          );
        }
      };
    const uploadButton = (
    <div>
        {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
    );
    const onScan = (e) => {
        console.log(e)
    }
    const onSelect = (e) => {
        console.log(e)
    }
    return (
        <Card small className="mb-4">
            <CardHeader className="border-bottom">
            <h6 className="m-0">{title}</h6>
            </CardHeader>
            <ListGroup flush>
            <ListGroupItem className="p-3">
                <Row>
                <Col>
                    <Form>
                        <Descriptions layout="horizontal" bordered>
                            <Descriptions.Item label="Nama Product" className="w-25">Pulpen</Descriptions.Item>
                        </Descriptions>
                        <Descriptions layout="horizontal" bordered>
                            <Descriptions.Item label="Detail Product" className="w-25">Merk standard</Descriptions.Item>
                        </Descriptions>
                        <Descriptions layout="horizontal" bordered>
                            <Descriptions.Item label="Harga Product" className="w-25">Rp 1,000</Descriptions.Item>
                        </Descriptions>
                        <br />
                        <Button type="primary" className="d-flex align-items-center" onClick={showDrawer}>
                            <WalletOutlined /> Bayar
                        </Button>
                    </Form>
                </Col>
                </Row>
                <Drawer
                title="Create a new account"
                placement="right"
                height={300}
                width={300}
                onClose={onClose}
                visible={state.visible}
                bodyStyle={{ paddingBottom: 80, paddingTop: 80 }}
                footer={
                    <div
                    style={{
                        textAlign: 'right',
                    }}
                    >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Batal
                    </Button>
                    <Button onClick={onClose} type="primary">
                        Bayar
                    </Button>
                    </div>
                }
                >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                            name="nama"
                            label="Nama Product"
                            rules={[{ required: true, message: 'Please select an owner' }]}
                            >
                                <Input defaultValue="Pulpen" disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                            name="harga"
                            label="Harga"
                            rules={[{ required: true, message: 'Please choose the approver' }]}
                            >
                                <InputNumber
                                    defaultValue={1000}
                                    formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={onChange}
                                    className="w-100"
                                    disabled
                                    />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                            name="pilihan_bayar"
                            label="Pilih Jenis Pembayaran"
                            rules={[{ required: true, message: 'Please choose the approver' }]}
                            >
                                <Select defaultValue="Pilih" onSelect={onSelect}>
                                    <Option value="cash">Cash</Option>
                                    <Option value="barcode">Barcode</Option>
                                    <Option value="cashbond">Kasbond</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                            name="barcode"
                            label="Barcode"
                            rules={[{ required: true, message: 'Please choose the approver' }]}
                            >
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {state.imageUrl ? <img src={state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                                <button onClick={() => setActivate(true)}>Click</button>
                                <Cameras onActive={() => activate}>
                                {cameras => (
                                    <div>
                                    <Scanner camera={cameras[0]} onScan={onScan}>
                                        <video style={{ width: "100%", height: "auto", backgroundColor: "gray" }} />
                                    </Scanner>
                                    </div>
                                )}
                                </Cameras>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                            name="jumlah_bayar"
                            label="Jumlah Uang Bayar"
                            rules={[{ required: true, message: 'Please choose the approver' }]}
                            >
                                <InputNumber
                                    defaultValue={0}
                                    formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={onChange}
                                    className="w-100"
                                    />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                            name="kembalian"
                            label="Jumlah Kembalian"
                            rules={[{ required: true, message: 'Please choose the approver' }]}
                            >
                                <InputNumber
                                    defaultValue={1000}
                                    formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    onChange={onChange}
                                    className="w-100"
                                    disabled
                                    />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                </Drawer>
            </ListGroupItem>
            </ListGroup>
        </Card>
    );
}

DetailProduct.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

DetailProduct.defaultProps = {
  title: "Detail & Harga Product"
};

export default DetailProduct;