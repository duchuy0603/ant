import React from 'react'
import { Input, Button, Form, InputNumber, Switch, Upload, message,Select } from 'antd';
import { UploadOutlined, InboxOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { ecommercegetAll } from '../../../store/Category/ecommerce';
import { useEffect } from 'react';
import { useState } from 'react';
import './events.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromLocalStorage } from '../../../helpers/common';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import axios from 'axios';
import locale_vi from 'antd/es/date-picker/locale/vi_VN';
const { RangePicker } = DatePicker;

const EventsForm = ({ onFinish, form, idEdit }) => {
    const datauser=getUserFromLocalStorage();
    const { TextArea } = Input;
    const { Dragger } = Upload;
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const {Option}=Select;
    const dispatch=useDispatch();
    const {ecommercelist}=useSelector(state=>state.ecommerceReducer)


  
    const onChange = ({ fileList:newFileList }) => {
        setFileList(newFileList);

      };
      function onOk(value) {
        console.log('onOk: ', value);
      }
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


 
    useEffect(() => {
        if(idEdit) {
            const imageUrl = form.getFieldValue('image');
            setImageUrl(imageUrl)
            console.log(imageUrl);
        }
    }, [form, idEdit])

    const handleChangeFiles = ({ fileList, file }) => {
        // console.log('ON_CHANGE_FILES:', fileList)
        console.log("ON_CHANGE_FILES:", file);
        setFileList([...fileList]);
      };
    const handleBeforeUpload=(file)=>{
        setFileList([...fileList,file])
        return false
    }
    const handleadd = ()=>{
       
        var formData = new FormData();

   
    fileList.forEach(file => {
    
      formData.append("files", new Blob([file]) , file.name);
    });

    axios
      .post(`${process.env.REACT_APP_API_URL}/upload/upload-array`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
       
      if(  response.data.message=="UPLOAD_SUCCESS"){
        form.setFieldsValue({
            image: response.data.url,
            
        })
       
        message.success("upload thành công")
     }
         
      }
      )
      .catch((error) => {
        form.setFieldsValue({
            image: " ",
        })
        message.error("upload thất bại",error)
      });
  };
      
  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
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
                <Form.Item name="cost" label="Giá" required rules={[{ required: true}]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="Ví dụ:10.000$" />
                </Form.Item>
                <Form.Item name="address" label="Address" required rules={[{ required: true, whitespace: true }, { type: 'string', max: 255 }]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <Input placeholder="Ví dụ: 172a  yen lang" />
                </Form.Item>
                <Form.Item name="date" label="Date" 
                    style={{ width: '50%', paddingRight: "10px" }}>
                   
                   
                    <RangePicker
                    locale={locale_vi}
                    disabledDate={(currentdate)=>{
                    return currentdate&&currentdate < moment().startOf('day')
                        }}
                        showTime={{ format: 'HH:mm' }}
                        format="HH:mm DD/MM/YYYY "
                        onChange={onChange}
                        onOk={onOk}
                    />
                   
                </Form.Item>

                <Form.Item name="des" label="Description" required rules={[{ required: true }, { type: 'string'}]}
                    style={{ width: '50%', paddingRight: "10px" }}>
                    <TextArea></TextArea>
                </Form.Item>
             <Form.Item name="ecommerce_id" label="EcommerceId" required rules={[{ required: true }]}
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
                </Form.Item>
           
      <Form.Item name="new_img" label="Ảnh tin tức" valuePropName="file" getValueFromEvent={normFile}
                     style={{ width: '50%'}} >
                    
         <Upload
       
        listType="picture-card"
        name='files'
        beforeUpload={handleBeforeUpload}
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        
      >
          + Upload
      </Upload>
  
  <br/>
  <Button icon={<UploadOutlined />} disabled={fileList==0} onClick={handleadd}>Upload</Button>
                    </Form.Item>
                 
                <Form.Item name="image" hidden={true}>
                    <Input />
                </Form.Item>
        
                <Form.Item
                    style={{ width: '90%' }}>

                </Form.Item>
                <Form.Item className='button'>
                    <Button htmlType="submit" type="primary " onClick={handleadd}>Lưu lại</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EventsForm;
