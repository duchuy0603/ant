import React, { useCallback } from 'react'
import { ecommercegetAll, ecommerceAdd, ecommerceEdit, ecommerceDelete } from '../../../store/Category/ecommerce';

import ecommerceApi from '../../../api/ecommerce';
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import reactRouterDom, { useHistory } from 'react-router-dom';
import { Button, Form, Modal, Space, Table, Popconfirm, Tag, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { Pagination } from 'antd';
import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import EcommerceForm from './EcommerceForm';
import './ecommerce.scss'

const Ecommerce = () => {
  
  const { ecommercelist, loadingecom } = useSelector(state => state.ecommerceReducer)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(ecommercegetAll())
  }, [dispatch])
  
  const [searchText, setsearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [idEdit,setIdEdit]=useState(0)
  const token=localStorage.getItem('token')
  //modal
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [formAdd] = Form.useForm();    
  const [formEdit] = Form.useForm();
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


    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
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
      dataIndex: 'Name',
      key: 'Name',
      width: '20%',
      ...getColumnSearchProps('Name'),
    },
    {
      title: 'Image',
      
 dataIndex: 'ImageUrl',
      key: 'Image',
      width: '12%',
    
      render: text => <img src={`${process.env.REACT_APP_API_URL}/${text}` }  style={{width:"100%",height:"40%"}} alt=""/>
    },

    {
      title: 'Phone',
      dataIndex: 'Phone',
      key: 'Phone',
      width: '20%',
      sorter: (a, b) => a.Phone - b.Phone,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('Phone'),
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
      width: '20%',
      ...getColumnSearchProps('Email'),
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
      width: '20%',
      ...getColumnSearchProps('Address'),
      sorter: (a, b) => a.Address.length - b.Address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
      width: '20%',
      ...getColumnSearchProps('Description'),
    },
    {
      key: 'Action',
      title: <SyncOutlined onClick={() => dispatch(ecommercegetAll())} />,
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <Space size="middle">
          <EditOutlined style={{ color: "blue" }} onClick={() => handleEditForm(record)} />
          <Popconfirm
            placement="bottomRight"
            title={`Bạn muốn xóa ${record.Name} ?`}
            onConfirm={() => handleDelete(record.Id)}
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
   const dataNews = {
    Name: data.name,
    Email: data.email,
    Phone: data.phone,
    Address: data.address,
    Description: data.description,
    image: data.image,
   }
    dispatch(ecommerceAdd(dataNews,token))
   
    setIsModalAdd(false)
    formAdd.resetFields()
   }

   const handleEditForm = (record) => {
    const editform = {    
      id: record.Id,
      name: record.Name,
      email: record.Email,
      phone: record.Phone,
      address: record.Address,
      description: record.Description,
      image:`${process.env.REACT_APP_API_URL}/${record.ImageUrl} `  
    }
    console.log(editform)
    setIdEdit(record.Id);
    formEdit.setFieldsValue(editform)
    setIsModalEdit(true)
  }

  const onFinishEdit = (data) => {
    const edit = {
      Id:data.id,
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Address: data.address,
      Description: data.description,
      image: data.image,
     }
    dispatch(ecommerceEdit(edit,token))
    setIsModalEdit(false)
    
    console.log(edit)
 
  }
  const handleDelete = (id) => {
    dispatch(ecommerceDelete(id,token))
  }
  return (
    <div>
      <div className='addecommerce' >
        <Button type="primary" onClick={() => 
         
          setIsModalAdd(true)}>
          Thêm Sàn
        </Button>
      </div>
      <br />
      <Modal className='modal-add' title="Thêm Sàn" visible={isModalAdd} footer="" centered onCancel={() => setIsModalAdd(false)}>
        <EcommerceForm
          onFinish={onFinishAdd}
          form={formAdd} />
      </Modal>

      <Modal className='modal-edit' title="Sửa Sàn" visible={isModalEdit} onCancel={() => setIsModalEdit(false)} centered footer="">
        <EcommerceForm
          onFinish={onFinishEdit}
          form={formEdit}
        
          idEdit={idEdit}
         
       
        />
      </Modal>

      <Table scroll={{ x: 900 }}
       pagination= {{defaultCurrent:30,defaultPageSize:10,hideOnSinglePage:true,pageSizeOptions:[10,30,50,100]}}
      loading={loadingecom} columns={columns} dataSource={ecommercelist} rowKey={record => record.id} bordered />

    </div>
  )
}

export default Ecommerce;
