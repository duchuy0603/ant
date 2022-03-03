import React, { useCallback } from 'react'
import { brandAdd, brandgetAll, brandEdit, brandDelete } from '../../../store/Category/brand';

import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Space, Table, Popconfirm, Tag, Input } from 'antd';
import Highlighter from 'react-highlight-words';

import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './brand.scss'
import BrandForm from './brandForm';

const Brand = () => {
  const { brandlist, loadingbrand } = useSelector(state => state.brandReducer)
console.log(brandlist)

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(brandgetAll())
  }, [dispatch])
  
  const [searchText, setsearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  //modal
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [idEdit,setIdEdit]=useState(0)
  const [formAdd] = Form.useForm();    //form
  const [formEdit] = Form.useForm();
  const checkImage=(img)=>{
    if(img===null){
      return
    }else{
      return process.env.REACT_APP_API_URL + img[0].url
    }
  }
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 12 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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


        render: text =>{
          if( searchedColumn === dataIndex ){
            return     <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
          }else{
            if(dataIndex==='ecommerce'){
              return text?.name
            }
         
         
            return text;
          }
        }
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {

    confirm();
    setsearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);

  };
  const handleReset = clearFilters => {
    clearFilters();
    setsearchText('')
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'Name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Image',
  
      dataIndex: 'image_url',
      key: 'image_url',
      width:'5%',
      render: text =>  <img src={checkImage(text) }  style={{width:"100%",height:"100%"}} alt=""/>
        
    },
    {
      title: 'Description',
      dataIndex: 'des',
      key: 'des',
      width: '20%',
      ...getColumnSearchProps('des'),
    },
    {
      title: 'EcommerceId',
      dataIndex: 'ecommerce',
      key: 'ecommerce',
      width: '20%',
      sorter: (a, b) => a.ecommerce - b.ecommerce,
        sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('ecommerce'),
    },
    {
      key: 'Action',
      title: <SyncOutlined onClick={() => dispatch(brandgetAll())} />,
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <Space size="middle">
          <EditOutlined style={{ color: "blue" }} onClick={() => handleEditForm(record)} />
          <Popconfirm
            placement="bottomRight"
            title={`Bạn muốn xóa ${record.name} ?`}
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </Space>
      ),

    },
  ];
  // actionform
  const onFinishAdd = (data) => {
const add={
  name:data.name,
  des:data.des,
  ecommerce_id: data.ecommerce_id,
  image_url:data.image
}
    dispatch(brandAdd(add))
    
    setIsModalAdd(false)
    formAdd.resetFields()
    console.log(add)

  //   const newdata = {
  //     Name: data.name,
  //     Email: data.email,
  //     Phone: data.phone,
  //     Address: data.address,
  //     Description: data.description,
  //     // ImageUrl:data.files[0]

  //   }
  //   console.log(data)
  //   dispatch(ecommerceAdd(newdata))
   
  //   setIsModalAdd(false)
  //   formAdd.resetFields()
   }

  const handleEditForm = useCallback((record) => {
    const editform = {
      id: record.id,
      name: record.name,
      des: record.des,
      ecommerce_id: record.ecommerce.id,
      image:record.image_url   
    }
    formEdit.setFieldsValue(editform)
    setIdEdit(record.id);
    setIsModalEdit(true)

  }, [formEdit])
  const onFinishEdit = (data) => {
    const edit={
      id:data.id,
      name:data.name,
      description:data.des,
      ecommerce_id: data.ecommerce_id,
      image_url:data.image
    }
    dispatch(brandEdit(edit))
    setIsModalEdit(false)
    formAdd.resetFields()
    console.log(edit)
  }
  const handleDelete = (id) => {
    dispatch(brandDelete(id))
  }
  return (
    <div>
      <div className='addecommerce' >
        <Button type="primary" onClick={() => setIsModalAdd(true)}>
          Thêm Brand
        </Button>
      </div>
      <br />
      <Modal className='modal-add' title="Thêm Brand" visible={isModalAdd} footer="" centered onCancel={() => setIsModalAdd(false)}>
        <BrandForm
          onFinish={onFinishAdd}
          form={formAdd} />
      </Modal>

      <Modal className='modal-edit' title="Sửa Brand" visible={isModalEdit} onCancel={() => setIsModalEdit(false)} centered footer="">
        <BrandForm
          onFinish={onFinishEdit}
          form={formEdit}
          idEdit={idEdit}
        />
      </Modal>

      <Table scroll={{ x: 900 }} 
       pagination= {{defaultCurrent:30,defaultPageSize:10,hideOnSinglePage:true,pageSizeOptions:[10,30,50,100]}}
      loading={loadingbrand} columns={columns} dataSource={brandlist} rowKey={record => record.id} bordered />

    </div>
  )
}

export default Brand;
