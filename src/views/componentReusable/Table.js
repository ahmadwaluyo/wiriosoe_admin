  import React from 'react';
import { Table, Input, Button, Space, Dropdown, Menu, Tag, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import { SearchOutlined, DashOutlined } from '@ant-design/icons';
import moment from "moment";
import axios from "axios";
import { PUBLIC_API, dataToken } from "../../utils/API";
import swal from "sweetalert2";


class App extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    loading: true
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  confirmDeleteSantri = (data) => {
    console.log(data, "<<< data ini apa");
    swal.fire({
      title: 'Are you sure?',
      text: `Apakah anda yakin akan menghapus data user ${this.props.name === "user" ? data.fullname : data.name} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteSantri(data)
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Data user tidak terhapus!',
          'error'
        )
      }
    })
  }

  deleteSantri = async (data) => {
    try {
      let deleted = await axios.delete(`${PUBLIC_API}/api/v1/${this.props.name === "user" ? "users" : "students"}/${data.id}`, {
        headers: {
          'authorization': `Bearer ${dataToken.content.token}`
        }
      })
      this.props.getSantri()
      console.log(deleted, "<<< delete");
      swal.fire('Success Delete',`Data santri ${data.nama} berhasil dihapus`,'success')
    } catch (err) {
      swal.fire(err.message, '', 'error')
    }
  }

  menu = (record) => 
  {
    return (
      <Menu>
        <Menu.Item>
          {
            this.props.name.toLowerCase() === "santri" ?
            <Link to={{
              pathname: "/student-profile",
              state: { student: true, dataSantri: record }
            }}>Detail</Link> :
            <Link to={{
              pathname: "/student-profile",
              state: { user: true, dataUser: record }
            }}>Detail</Link>
          }
        </Menu.Item>
          <Menu.Item onClick={() => this.confirmDeleteSantri(record)}>
            Hapus
          </Menu.Item>
        {/* {
          this.props.name.toLowerCase() === "user" ? null :
        } */}
      </Menu>
    )
  }

  componentDidUpdate = (prevProps, PrevState) => {
    if (prevProps.dataSantri !== this.props.dataSantri || prevProps.dataUser !== this.props.dataUser) {
      this.setState({
        loading: false
      })
    }
  }

  render() {
    const columnUser = [
      {
        title: 'No',
        dataIndex: 'nomerUrut',
        key: 'nomerUrut',
        fixed: 'left',
        ...this.getColumnSearchProps('nomerUrut'),
      },
      {
        title: 'Nama',
        dataIndex: 'fullname',
        key: 'fullname',
        ...this.getColumnSearchProps('fullname'),
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        ...this.getColumnSearchProps('username'),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...this.getColumnSearchProps('email'),
      },
      {
        title: 'Status',
        dataIndex: 'role',
        key: 'role',
        ...this.getColumnSearchProps('role'),
      },
      {
        title: 'Tanggal Dibuat',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        render: (key, record, i) => {
          return (
            <Tag color="green">{moment(key).format("DD-MM-YYYY LT")}</Tag>
          )
        }
      },
      {
        title: 'Aksi',
        key: 'i',
        align: 'center',
        width: 100,
        fixed: 'right',
        render:(text, record, index) => {
          return (
              <Dropdown overlay={() => this.menu(record)} trigger={['click']}>
                <div className="d-flex justify-content-center">
                  <Button style={{fontSize:18, width: 50, color:'#6d9ae3', borderRadius: 5, display: 'flex', alignItems: 'center' }}><DashOutlined size="large" /></Button>
                </div>
              </Dropdown>
          )
        }
      }
    ]
    const columns = [
      {
        title: 'No',
        dataIndex: 'nomerUrut',
        key: 'nomerUrut',
        fixed: 'left',
        ...this.getColumnSearchProps('nomerUrut'),
      },
      {
        title: 'Nama',
        dataIndex: 'nama',
        key: 'nama',
        ...this.getColumnSearchProps('nama'),
      },
      {
        title: 'Alamat',
        dataIndex: 'alamat',
        key: 'alamat',
        ...this.getColumnSearchProps('alamat'),
      },
      {
        title: 'Kelas',
        dataIndex: 'kelas',
        key: 'kelas',
        ...this.getColumnSearchProps('kelas'),

      },
      {
        title: 'Nama Wali',
        dataIndex: 'nama_wali',
        key: 'nama_wali',
        ...this.getColumnSearchProps('nama_wali'),

      },
      {
        title: 'Nomor Telp Wali',
        dataIndex: 'no_telp_wali',
        key: 'no_telp_wali',
        ...this.getColumnSearchProps('no_telp_wali'),
      },
      {
        title: 'Rekap Nilai',
        dataIndex: 'rekap_nilai',
        key: 'rekap_nilai',
      },
      {
        title: 'Rekap Pembayaran',
        dataIndex: 'rekap_pembayaran',
        key: 'rekap_pembayaran',
      },
      {
        title: 'Aksi',
        key: 'i',
        align: 'center',
        width: 100,
        fixed: 'right',
        render:(text, record, index) => {
          return (
              <Dropdown overlay={() => this.menu(record)} trigger={['click']}>
                <div className="d-flex justify-content-center">
                  <Button style={{fontSize:18, width: 50, color:'#6d9ae3', borderRadius: 5, display: 'flex', alignItems: 'center' }}><DashOutlined size="large" /></Button>
                </div>
              </Dropdown>
          )
        }
      }
    ]
    return (
      this.props.name.toLowerCase() === "santri" ?
      <Table columns={columns} dataSource={this.props.dataSantri} bordered scroll={{ x: true }} loading={this.state.loading} pagination={{ pageSize: 10 }} key={"santri"} /> :
      <Table columns={columnUser} dataSource={this.props.dataUser} bordered scroll={{ x: true }} loading={this.state.loading} pagination={{ pageSize: 10 }} key={"user"} />
    )
  }
}

export default App