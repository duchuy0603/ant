import React from 'react'
import { Input, Button, Form, InputNumber, Switch, Upload, message,Select } from 'antd';
import { UploadOutlined, InboxOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { ecommercegetAll } from '../../../store/Category/ecommerce';
import { useEffect } from 'react';
import { useState } from 'react';
import './new.scss'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromLocalStorage } from '../../../helpers/common';
import { RMIUploader } from "react-multiple-image-uploader";
const NewForm = ({ onFinish, form, idEdit }) => {
    const datauser=getUserFromLocalStorage();
    const { TextArea } = Input;
    const { Dragger } = Upload;
    const {Option}=Select;
    const dispatch=useDispatch();
    const {ecommercelist}=useSelector(state=>state.ecommerceReducer)
    const [showAgeTotal, setShowAgeTotal] = useState(false);
    const [showAgeMore, setShowAgeMore] = useState(false);

    useEffect(() => {
    
        dispatch(ecommercegetAll())
    }, [])
    const validateMessages = {
        required: 'Không được để trống !',
        types: {
            string: '${label} không hợp lệ !',
            number: '${label} không hợp lệ !',

        },
        string: {
            max: '${label} tối đa 255 ký tự !',
        },
        number: {
            range: '${label} trong khoảng 1-100 !',
        },
        pattern: {
            mismatch: '${label} không hợp lệ !',
        },
    };

    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState([]);

 
    useEffect(() => {
        if(idEdit) {
            const imageUrl = form.getFieldValue('image');
            setImageUrl(imageUrl)
            console.log(imageUrl);
        }
    }, [form, idEdit])

    const handleChange = info => {
        console.log(info.file);
        if (info.file.status === 'uploading') {
            setLoading(true);
          }
    };
    // const propsUpload = {
    //     name: 'files',
    //     maxCount: 1,
    //     action: `${process.env.REACT_APP_API_URL}/upload/upload-array`,
    
    //     onSuccess: (result, file) => {
    //         console.log('ok', result);
    //         if(result.success) {
    //             form.setFieldsValue({
    //                 image: result.url,
    //             })
    //             setImageUrl(result.url);
    //             message.success('Tải ảnh lên thành công !');
    //         } else {
    //             form.setFieldsValue({
    //                 image: '',
    //             })
    //             setImageUrl('');
    //             if(result.error.message === "File too large") {
    //                 message.error('Dung lượng ảnh không quá 5mb !');
    //             } if(result.error.message === "Images Only!") {
    //                 message.error('Chỉ tải lên định dạng ảnh .jpg, .png, .jpeg !');
    //             } else {
    //                 message.error('Tải ảnh lên thất bại ! Hãy thử lại !');
    //             }
    //         }
    //         setLoading(false);
    //     },
    //     onError: (err, response) => {
    //         form.setFieldsValue({
    //             image: '',
    //         })
    //         setImageUrl('');
    //         message.error('Tải ảnh lên thất bại ! Hãy thử lại');
    //         setLoading(false);
    //     }
    // };
    const props = {
        name: 'files',
        multiple: true,
        action: `${process.env.REACT_APP_API_URL}/upload/upload-array`,
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            const list=info.fileList.map(item=>{return encodeURI(item.name)});
            console.log(list)
            form.setFieldsValue({
                                 image: list,
                      });
                  
                      setImageUrl(info.list);
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            form.setFieldsValue({
                            image: '',
                        })
                        setImageUrl('')
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

    const normContent = (value) => {
        return value.text;
    };
    const normFile = (e) => {
        return e && e.file;
    };
    return (
        <div>
            <Form className="ecommerce-form" validateMessages={validateMessages} onFinish={onFinish} form={form} method='POST' encType='multipart/form-data' >
                {
                    idEdit &&
                    <Form.Item name="id" hidden={true}>
                        <Input />
                    </Form.Item>
                }

                <Form.Item name="name" label="Tên" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="Ví dụ: Eplaza" />
                </Form.Item>
                <Form.Item name="content" label="content" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="Ví dụ: Eplaza" />
                </Form.Item>

                <Form.Item name="description" label="Description" required rules={[{ required: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <TextArea></TextArea>
                </Form.Item>
                {datauser.ecommerce_id==2?null:     <Form.Item name="ecommerceId" label="EcommerceId" required rules={[{ required: true }]}
                    style={{ width: '50%', paddingRight: "10px"  }}>
                    <Select
                       
                        showSearch
                        style={{ width: 200 }}
                        placeholder="EcommerceId"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }>
                      

                        {ecommercelist.map((x,index)=>(
                            <Option key={index} value={x.id} >{x.name}</Option>
                        ))}
                        
                       
                    </Select>
                </Form.Item>}
           
      <Form.Item name="new_img" label="Ảnh tin tức" valuePropName="file" getValueFromEvent={normFile}
                     style={{ width: '50%'}} >
                        {/* <Upload
                            {...propsUpload}
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={`${process.env.REACT_APP_API_URL}/${imageUrl}`} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> 
                                    : <div>
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>}
                        </Upload> */}
                          <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </Dragger>,
                    </Form.Item>
                
                <Form.Item name="image" hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item
                    style={{ width: '90%' }}>

                </Form.Item>
                <Form.Item className='button'>
                    <Button htmlType="submit" type="primary">Lưu lại</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default NewForm
