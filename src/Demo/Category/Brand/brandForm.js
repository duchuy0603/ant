import React from 'react'
import { Input, Button, Form, InputNumber, Switch, Upload, message,Select } from 'antd';
import { UploadOutlined, InboxOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { ecommercegetAll } from '../../../store/Category/ecommerce';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
const BrandForm = ({ onFinish, form, idEdit }) => {
    const { TextArea } = Input;
    const {Option}=Select;
    const dispatch=useDispatch();
    const {ecommercelist}=useSelector(state=>state.ecommerceReducer)
    const [showAgeTotal, setShowAgeTotal] = useState(false);
    const [showAgeMore, setShowAgeMore] = useState(false);
    const [fileList, setFileList] = useState([])
   console.log(fileList);
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
    // const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

 
    useEffect(() => {
        if(idEdit) {
            const imageUrl = form.getFieldValue('image');
            setFileList(imageUrl)
            console.log(imageUrl);
        }
    }, [form, idEdit])

    const handleChange = info => {
     
        if (info.file.status === 'uploading') {
            setLoading(true);
          }
    };
    // const propsUpload = {
    //     name: 'files',
    //     maxCount: 5,
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
          console.log('cc',response)
        
      if( response.data.url!==" " &&  response.data.message=="UPLOAD_SUCCESS"){
        form.setFieldsValue({
            image: response.data.url,
        })
        message.success("upload thành công")
     }else{
         message.error("Mời thêm dữ liệu")
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
    const normContent = (value) => {
        return value.text;
    };
    const normFile = (e) => {
        return e && e.file;
    };
  

      
      
    
      const onChange = ({ fileList:newFileList }) => {
        setFileList(newFileList);

      };
      const handleBeforeUpload = (file) => {
        setFileList([...fileList, file]);
        return false;
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
    return (
        <div>
            <Form className="ecommerce-form" validateMessages={validateMessages} onFinish={onFinish} form={form}  >
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


                <Form.Item name="des" label="Description" required rules={[{ required: true }, { type: 'string', max: 255 }]}
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
      <Form.Item name="image_url" label="Ảnh tin tức" valuePropName="file" getValueFromEvent={normFile}
                    style={{ width: '50%', paddingRight: "10px" }} >
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
 
      <Upload
        // action={`${process.env.REACT_APP_API_URL}/upload/upload-array`}
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
                    <Button htmlType="submit" type="primary">Lưu lại</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default BrandForm
