import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput } from "shards-react";
import { Input, Button, Select } from "antd";
import { PUBLIC_API, dataToken } from "../../utils/API";
import axios from "axios";
import swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

const { Option } = Select;

const Editor = () => {
  const [state, setState] = useState({
    title: '',
    img_url: '',
    tags: [],
    article: ''
  })
  const handleChange = (e) => {
    console.log(e, "<<< e select");
    setState({
      ...state,
      tags: e
    })
  }
  console.log(dataToken, "<<< ini data token");
  const handleSubmit = async (e) => {
    e.preventDefault()
    const dataToSend = {
      title: state.title,
      img_url: state.img_url,
      tags: state.tags[0],
      author: dataToken.content.username,
      userid: dataToken.content.id,
      article: state.article
    }
    try {
      let postArticle = await axios.post(`${PUBLIC_API}/api/v1/posts`, dataToSend, {
        headers: {
          'authorization': `Bearer ${dataToken.content.token}`
        }
      })
      console.log(postArticle, " <<< success post");
      swal.fire('success', 'Successfully add article', 'success')
    } catch (err) {
      swal.fire(err.message, '', 'error')
    }
  }
  return (
    <Card small className="mb-3">
      <CardBody>
        <Form className="add-new-post">
          <Input placeholder="Your Post Title" className="form-group mb-3" required onChange={(e) => setState({ ...state, title: e.target.value })} />
          <Input placeholder="Input Image URL" className="form-group mb-3" required onChange={(e) => setState({ ...state, img_url: e.target.value })} />
          <Select mode="multiple" className="form-group w-100 mb-3" placeholder="Select Tags" onChange={handleChange}>
              <Option key={'news'} value={'news'}>News</Option>
              <Option key={'blog'} value={'blog'}>Blog</Option>
              <Option key={'announcement'} value={'announcement'}>Announcement</Option>
          </Select>
          <ReactQuill onChange={(e) => setState({ ...state, article: e})} className="add-new-post__editor mb-3" />
          <Button type="primary" onClick={handleSubmit}>Submit</Button>
        </Form>
      </CardBody>
    </Card>
  );
}

export default Editor;
