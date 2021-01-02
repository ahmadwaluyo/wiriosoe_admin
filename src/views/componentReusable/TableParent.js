import React, { useEffect, useState } from "react";
import { 
  Container, 
  Row, Col, 
  Card, CardHeader, CardBody,
 } from "shards-react";
import {MDBBtn, MDBIcon, MDBInput, MDBSelect, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from "mdbreact";
import PageTitle from "../../components/common/PageTitle";
import { FaPlusCircle } from 'react-icons/fa';
import Table from './Table';
import Swal from "sweetalert2";
import axios from "axios";
import { PUBLIC_API, dataToken } from "../../utils/API";

// const optionSelect = 

const Tables = (props) => {
  const { name } = props;
  const [open, setOpen] = useState(false);
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [kelas, setKelas] = useState('');
  const [nama_wali, setNama_wali] = useState('');
  const [no_telp_wali, setNo_telp_wali] = useState('');
  const [rekap_nilai, setRekapNilai] = useState([]);
  const [rekap_pembayaran, setRekapPembayaran] = useState([]);
  const [dataSantri, setDataSantri] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [state, setState] = useState({
    fileNilai: '',
    filePembayaran: '',
    dataSantri: [],
    loading: true,
    username: '',
    fullname: '',
    password: '',
    email: ''
  })
  const handleModal = () => {
    setOpen(true);
  }
  const toggle = () => {
    setOpen(!open);
  }
  const addEvent = async () => {

    const config = {
      nama,
      alamat,
      kelas,
      nama_wali,
      no_telp_wali,
      // rekap_nilai: rekap_nilai[0],
      // rekap_pembayaran: rekap_pembayaran[0],
    }
    console.log(config, "<< ini yang di kirim")
    let postSantri = await axios.post(`${PUBLIC_API}/api/v1/students`, config, {
      headers: {
        "authorization": `Bearer ${dataToken.content.token}`
      }
    })
    getSantri()
    console.log(postSantri, "coba post")
    Swal.fire(
      {
        position: 'center',
        icon: 'success',
        title: 'Data santri berhasil di tambahkan !',
        showConfirmButton: false,
        timer: 2000
      }
    )
  };

  const addUser = async () => {
    try {
        const config = {
          username: state.username,
          fullname: state.fullname,
          email: state.email,
          password: state.password
        }
        console.log(config, "<< ini yang di kirim")
        let postUser = await axios.post(`${PUBLIC_API}/api/v1/auth/register`, config, {
          headers: {
            "authorization": `Bearer ${dataToken.content.token}`
          }
        })
        console.log(postUser, ">>> post user");
        getUser()
        Swal.fire(
            {
                position: 'center',
                icon: 'success',
                title: 'Data user berhasil di tambahkan !',
                showConfirmButton: false,
                timer: 2000
            }
        )
    } catch (err) {
        Swal.fire(
            {
                position: 'center',
                icon: 'error',
                title: err.message,
                showConfirmButton: false,
                timer: 2000
            }
        )
    }

  };

  useEffect(() => {
    getUser()
    getSantri()
  }, [])

  const getUser = async() => {
    try {
        let dataUser = await axios(`${PUBLIC_API}/api/v1/users`, {
            headers: {
                "authorization": `Bearer ${dataToken.content.token}`
            }
        })
        dataUser.data.content && dataUser.data.content.map((el, index) => {
            el.nomerUrut = index+1
          })
        setDataUser(dataUser.data.content)
        console.log(dataUser.data.content, "<<< data user");
        if(dataUser.data.content.length === 0) {
            Swal.fire(
              "Data Kosong",
              `Data User Kosong, silakan tambah data terlebih dahulu`,
              "warning"
            )
          }
    } catch (err) {
        console.log(err.message);
        Swal.fire(
            "Error",
            `${err.message}`,
            "error"
          )
    }
  }

  const getSantri = async() => {
    try {
      let dataStudents = await axios(`${PUBLIC_API}/api/v1/students`, {
        headers: {
            "authorization": `Bearer ${dataToken.content.token}`
        }
    })
    dataStudents.data.content && dataStudents.data.content.map((el, index) => {
      el.nomerUrut = index+1
    })
    await setDataSantri(dataStudents.data.content)
    if(dataStudents.data.content.length === 0) {
      Swal.fire(
        "Data Kosong",
        `Data Santri Kosong, silakan tambah data terlebih dahulu`,
        "warning"
      )
    }
    setState({
      loading: false
    })
    } catch (err) {
      setState({
        loading: false
      })
      Swal.fire(
        "Error",
        `${err.message}`,
        "error"
      )
    }
  }

  // const handleNilai = (e) => {
  //   setState({
  //     ...state,
  //     fileNilai: e.target.files[0].name
  //   })
  // }
  // const handlePembayaran = (e) => {
  //   setState({
  //     ...state,
  //     filePembayaran: e.target.files[0].name
  //   })
  // }
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title={`Data ${name}`} className="text-sm-left" />
      </Row>
      {
          name.toLowerCase() === "santri" ?
            <MDBModal centered isOpen={open} toggle={toggle}>
                <MDBModalHeader
                className="text-center"
                titleClass="w-100 font-weight-bold"
                toggle={toggle}
                >
                Tambah Data Santri
                </MDBModalHeader>
                <MDBModalBody className="mx-3 grey-text d-flex align-items-center">
                    <form className="mx-3 grey-text">
                        <MDBInput
                            name="name"
                            label="Nama"
                            labelClass="ml-5"
                            icon="user-tie"
                            hint="isi nama"
                            className="ml-5"
                            group
                            type="text"
                            onChange={(e) => setNama(e.target.value)}
                        />
                        <MDBInput
                            name="address"
                            label="Alamat"
                            labelClass="ml-5"
                            icon="map"
                            hint="isi alamat"
                            className="ml-5"
                            group
                            type="text"
                            onChange={(e) => setAlamat(e.target.value)}
                        />
                        <MDBInput
                            name="classroom"
                            label="Kelas"
                            labelClass="ml-5"
                            icon="school"
                            hint="isi kelas"
                            className="ml-5"
                            group
                            type="number"
                            onChange={(e) => setKelas(e.target.value)}
                        />
                        <MDBInput
                            name="parent_name"
                            label="Nama Wali"
                            labelClass="ml-5"
                            icon="user-friends"
                            hint="isi nama wali"
                            className="ml-5"
                            group
                            type="text"
                            onChange={(e) => setNama_wali(e.target.value)}
                        />
                        <MDBInput
                            name="parent_number"
                            label="Nomer Telp Wali"
                            labelClass="ml-5"
                            icon="mobile-alt"
                            hint="isi nomer telpon wali"
                            className="ml-5"
                            group
                            type="text"
                            onChange={(e) => setNo_telp_wali(e.target.value)}
                        />
                        <label>Rekap Nilai</label>
                        <div className="input-group d-flex align-items-center">
                            <MDBIcon icon="book" size="2x" className="mr-1" />
                            <div className="custom-file ml-3">
                            <input type="file" className="form-control-file" id="inputGroupFile0" onChange={(e) => setRekapNilai(e.target.files)}/>
                            </div>
                        </div>
                        <br />
                        <label>Rekap Pembayaran</label>
                        <div className="input-group d-flex align-items-center">
                            <MDBIcon icon="cash-register" size="2x" />
                            <div className="custom-file ml-3 d-flex flex-column">
                            <input type="file" className="form-control-file" id="inputGroupFile01" onChange={(e) => setRekapPembayaran(e.target.files)}/>
                            </div>
                        </div>
                    </form>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                <MDBBtn
                    color="info"
                    className="w-25"
                    onClick={() => {
                    toggle();
                    addEvent();
                    }}
                >
                    Tambah
                </MDBBtn>
                </MDBModalFooter>
            </MDBModal> :
            <MDBModal centered isOpen={open} toggle={toggle}>
                <MDBModalHeader
                className="text-center"
                titleClass="w-100 font-weight-bold"
                toggle={toggle}
                >
                Tambah Data User
                </MDBModalHeader>
                <MDBModalBody className="mx-3 grey-text d-flex align-items-center">
                    <form className="mx-3 grey-text">
                        <MDBInput
                            name="username"
                            label="Username"
                            labelClass="ml-5"
                            icon="user-tie"
                            hint="isi username"
                            className="ml-5"
                            group
                            type="text"
                            onChange={(e) => setState({ ...state, username: e.target.value})}
                        />
                        <MDBInput
                            name="fullname"
                            label="Full Name"
                            labelClass="ml-5"
                            icon="user"
                            hint="isi fullname"
                            className="ml-5"
                            group
                            type="text"
                            onChange={(e) => setState({ ...state, fullname: e.target.value})}
                        />
                        <MDBInput
                            name="fullname"
                            label="Email"
                            labelClass="ml-5"
                            icon="envelope"
                            hint="isi email"
                            className="ml-5"
                            group
                            type="email"
                            onChange={(e) => setState({ ...state, email: e.target.value})}
                        />
                        <MDBInput
                            name="password"
                            label="Password"
                            labelClass="ml-5"
                            icon="lock"
                            hint="isi password"
                            className="ml-5"
                            group
                            type="password"
                            onChange={(e) => setState({ ...state, password: e.target.value})}
                        />
                    </form>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                <MDBBtn
                    color="info"
                    className="w-25"
                    onClick={() => {
                    toggle();
                    addUser();
                    }}
                >
                    Tambah
                </MDBBtn>
                </MDBModalFooter>
            </MDBModal>
      }
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom d-flex align-items-center">
              <h6 className="mt-0 mb-0 ml-0 mr-1">Tambah Data</h6>
              <FaPlusCircle onClick={handleModal} cursor="pointer" />
            </CardHeader>
            <CardBody>
                {
                    name.toLowerCase() === "user" ?
                    <Table dataUser={dataUser} loading={state.loadings} name={"user"} getUser={getUser} /> :
                    <Table dataSantri={dataSantri} loading={state.loadings} name={"santri"} getSantri={getSantri} />
                }
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Tables;