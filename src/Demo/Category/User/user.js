import React, { useCallback } from 'react'
import { userAdd,userEdit,userDelete,usergetAll } from '../../../store/Category/user';

import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Button, Form, Modal, Space, Table, Popconfirm, Tag, Input,Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { Pagination } from 'antd';
import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './user.scss'
import UserForm from './userForm';


const User = () => {
  const { userlist, loadinguser } = useSelector(state => state.userReducer)
  console.log(userlist)
  const token=localStorage.getItem('token')
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(usergetAll())
  }, [dispatch])
  
  const [searchText, setsearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  //modal
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [formAdd] = Form.useForm();    //form
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


    render: text =>{
      if(searchedColumn === dataIndex  ){
     
        return <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
      }  else{
        if(dataIndex==="store_id"){
          return text?.name
        }
     if(dataIndex==="category"){
          return text?.name
        }
        return text
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
      title: 'UserName',
      dataIndex: 'user_name',
      key: 'user_name',
      width: '20%',
      ...getColumnSearchProps('user_name'),
    },
    {
        title: 'FullName',
        dataIndex: 'full_name',
        key: 'full_name',
        width: '20%',
        ...getColumnSearchProps('full_name'),
      },
  
    {
      title: 'Avatar',
      // dataIndex: <img src="ImageUrl" alt=""/>,
      dataIndex: 'avatar',
      key: 'avatar',
      width:'20%',
      render: text =>  <img src={`${process.env.REACT_APP_API_URL}/${text}` }  style={{width:"100%",height:"100%"}} alt=""/>
        
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: '20%',
        sorter: (a, b) => a.Phone - b.Phone,
        sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('Phone'),
      },
   
 
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
    },

    {
      title: 'Store',
      dataIndex: 'store',
      key: 'store',
      width: '20%',
      sorter: (a, b) => a.store_id - b.store_id,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('store'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '20%',
      sorter: (a, b) => a.type - b.type,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('type'),
    },
    {
      key: 'Action',
      title: <SyncOutlined onClick={() => dispatch(usergetAll())} />,
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <Space size="middle">
          <EditOutlined style={{ color: "blue" }} onClick={() => handleEditForm(record)} />
          <Popconfirm
            placement="bottomRight"
            title={`Bạn muốn xóa ${record.userName} ?`}
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
  user_name:data.user_name,
  full_name:data.full_name,
  password:data.password,
  email:data.email,
  phone:data.phone,
  store_id:data.store_id,
  type:data.type,
  // image:data.image
}
    dispatch(userAdd(add))
    setIsModalAdd(false)
    formAdd.resetFields();
  

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
      id:record.id,
      user_name:record.user_name,
      full_name:record.full_name,
      password:record.password,
      email:record.email,
      phone:record.phone,
      store_id:record.store_id,
      type:record.type,
    
      image:record.avatar  
      
    
    }
    formEdit.setFieldsValue(editform)
    setIsModalEdit(true)

  }, [formEdit])
  const onFinishEdit = (data) => {
    const edit={
      Id:data.id,
      UserName:data.userName,
      FullName:data.fullName,
      Password:data.password,
      Email:data.email,
      Phone:data.phone,
      StoreId:data.storeId,
      Type:data.type,
      image:data.image
    }
    dispatch(userEdit(edit))
    setIsModalEdit(false)
    formAdd.resetFields()
  
  }
  const handleDelete = (id) => {
    dispatch(userDelete(id))
  }
  return (
    <div>
      <div className='addecommerce' >
        <Button type="primary" onClick={() => setIsModalAdd(true)}>
          Thêm user
        </Button>
      </div>
      <br />
      <Modal className='modal-add' title="Thêm user" visible={isModalAdd} footer="" centered onCancel={() => setIsModalAdd(false)}>
        <UserForm
          onFinish={onFinishAdd}
          form={formAdd} />
      </Modal>

      <Modal className='modal-edit' title="Sửa user" visible={isModalEdit} onCancel={() => setIsModalEdit(false)} centered footer="">
        <UserForm
          onFinish={onFinishEdit}
          form={formEdit}
          idEdit={true}
        />
      </Modal>

      <Table scroll={{ x: 900 }} 
       pagination= {{defaultCurrent:30,defaultPageSize:10,hideOnSinglePage:true,pageSizeOptions:[10,30,50,100]}}
      loading={loadinguser} columns={columns} dataSource={userlist} rowKey={record => record.id} bordered />

    </div>
  )
}

export default User;
