import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Form,
  FormInput
} from "shards-react";
import { Input, Button } from "antd";
import { 
  dataToken, 
  PUBLIC_API,
} from "../../utils/API";
import axios from "axios";
import swal from "sweetalert2";


const UserAccountDetails = (props) => {
  console.log(props, "<<< ini props");
  const { student, title, dataSantri } = props;
  const { username, fullname, email, role } = dataToken.content;
  const [state, setState] = useState({
    username: username || '',
    fullname: fullname || '',
    email: email || '',
    role: role || '',
    disabled: true,
    nama: '',
    alamat: '',
    kelas: '',
    nama_wali: '',
    no_telp_wali: ''
  })

  const handleUpdateSantri = async() => {
    setState({ ...state, disabled: true})
    const body = {
      nama: state.nama.length > 0 ? state.nama : dataSantri.nama,
      alamat: state.alamat.length > 0 ? state.alamat :  dataSantri.alamat,
      kelas: state.kelas.length > 0 ? state.kelas : dataSantri.kelas,
      nama_wali: state.nama_wali.length > 0 ? state.nama_wali : dataSantri.nama_wali,
      no_telp_wali: state.no_telp_wali.length > 0 ? state.no_telp_wali : dataSantri.no_telp_wali,
      // rekap_nilai: "",
      // rekap_pembayaran: "",
    }

    try {
      const { data } = await axios.put(`${PUBLIC_API}/api/v1/students/${props.dataSantri && props.dataSantri.id}`, body, {
        headers: {
          'authorization': `Bearer ${dataToken.content.token}`
        }
      })
      console.log(data, "<<<< ini result update");
      swal.fire('sukses', '', 'success')
    } catch (err) {
      swal.fire(err.message, '', 'error')
    }
  }

  if (student) {
    const { dataSantri } = props;
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="pt-3 pb-3 pl-4">
              <Form>
                <Row className="form-group col-md-8">
                    <label htmlFor="feFirstName">Nama Santri</label>
                    <Input defaultValue={dataSantri.nama} onChange={(e) => setState({ ...state, nama: e.target.value})} disabled={state.disabled} className="form-group" />
                </Row>
                <Row className="form-group col-md-8">
                    <label htmlFor="feFirstName">Kelas</label>
                    <Input defaultValue={dataSantri.kelas} onChange={(e) => setState({ ...state, kelas: e.target.value})} disabled={state.disabled} className="form-group" />
                </Row>
                <Row className="form-group col-md-8">
                    <label htmlFor="feFirstName">Alamat</label>
                    <Input defaultValue={dataSantri.alamat} onChange={(e) => setState({ ...state, alamat: e.target.value})} disabled={state.disabled} className="form-group" />
                </Row>
                <Row className="form-group col-md-8">
                    <label htmlFor="feFirstName">Nama Wali</label>
                    <Input defaultValue={dataSantri.nama_wali} onChange={(e) => setState({ ...state, nama_wali: e.target.value})} disabled={state.disabled} className="form-group" />
                </Row>
                <Row className="form-group col-md-8">
                    <label htmlFor="feFirstName">Nomer Telp Wali</label>
                    <Input defaultValue={dataSantri.no_telp_wali} onChange={(e) => setState({ ...state, no_telp_wali: e.target.value})} disabled={state.disabled} className="form-group" />
                </Row>
                {
                  state.disabled ?
                  <Button type="primary" onClick={() => setState({ ...state, disabled: false})}>Update Account</Button> :
                  <Button style={{ background: "#52c41a", borderColor: "#52c41a", color: "#fff" }} onClick={handleUpdateSantri}>Save Update</Button>
                }
              </Form>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  } else {
    const { dataUser } = props;
    if (dataUser) {
      console.log("masuk sini");
      return (
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">{title}</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="pt-3 pb-3 pl-4">
                <Form>
                  <Row className="form-group col-md-8">
                    {/* First Name */}
                      <label htmlFor="feFirstName">Full Name</label>
                      <FormInput
                        id="feFirstName"
                        placeholder="Full Name"
                        defaultValue={dataUser.fullname}
                        onChange={() => {}}
                      />
                  </Row>
                  <Row className="form-group col-md-8">
                    {/* Email */}
                      <label htmlFor="feEmail">Email</label>
                      <FormInput
                        type="email"
                        id="feEmail"
                        placeholder="Email Address"
                        defaultValue={dataUser.email}
                        onChange={() => {}}
                        autoComplete="email"
                      />
                    {/* Password */}
                  </Row>
                  <Row className="form-group col-md-8">
                    <label htmlFor="feUsername">Username</label>
                    <FormInput
                      type="text"
                      id="feUsername"
                      placeholder="Username"
                      defaultValue={dataUser.username}
                      onChange={() => {}}
                    />
                  </Row>
                  <Row className="form-group col-md-8">
                    <label htmlFor="feRole">Role</label>
                    <FormInput
                      id="feRole"
                      placeholder="Address"
                      defaultValue={dataUser.role}
                      onChange={() => {}}
                    />
                  </Row>
                  <Row className="form-group col-md-8">
                    <label htmlFor="feClass">Kelas yang diampu</label>
                    <FormInput
                      id="feClass"
                      placeholder="Address"
                      defaultValue={"7"}
                      onChange={() => {}}
                    />
                  </Row>
                  <Button type="primary">Update Account</Button>
                </Form>
            </ListGroupItem>
          </ListGroup>
        </Card>
      );
    } else {
      console.log();
      return (
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">{title}</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="pt-3 pb-3 pl-4">
                <Form>
                  <Row className="form-group col-md-8">
                    {/* First Name */}
                      <label htmlFor="feFirstName">Full Name</label>
                      <FormInput
                        id="feFirstName"
                        placeholder="Full Name"
                        defaultValue={state.fullname}
                        onChange={() => {}}
                      />
                  </Row>
                  <Row className="form-group col-md-8">
                    {/* Email */}
                      <label htmlFor="feEmail">Email</label>
                      <FormInput
                        type="email"
                        id="feEmail"
                        placeholder="Email Address"
                        defaultValue={state.email}
                        onChange={() => {}}
                        autoComplete="email"
                      />
                    {/* Password */}
                  </Row>
                  <Row className="form-group col-md-8">
                    <label htmlFor="feUsername">Username</label>
                    <FormInput
                      type="text"
                      id="feUsername"
                      placeholder="Username"
                      defaultValue={state.username}
                      onChange={() => {}}
                    />
                  </Row>
                  <Row className="form-group col-md-8">
                    <label htmlFor="feRole">Role</label>
                    <FormInput
                      id="feRole"
                      placeholder="Address"
                      defaultValue={state.role}
                      onChange={() => {}}
                    />
                  </Row>
                  <Row className="form-group col-md-8">
                    <label htmlFor="feClass">Kelas yang diampu</label>
                    <FormInput
                      id="feClass"
                      placeholder="Address"
                      defaultValue={"7"}
                      onChange={() => {}}
                    />
                  </Row>
                  <Button type="primary">Update Account</Button>
                </Form>
            </ListGroupItem>
          </ListGroup>
        </Card>
      );
    }
  }

}


UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

export default UserAccountDetails;
