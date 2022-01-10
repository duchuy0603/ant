import React, { useCallback } from 'react'
import { storeAdd, storeEdit, storeDelete, storegetAll } from '../../../store/Category/stores';

import ecommerceApi from '../../../api/ecommerce';
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import reactRouterDom, { useHistory } from 'react-router-dom';
import { Button, Form, Modal, Space, Table, Popconfirm, Tag, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { Pagination } from 'antd';
import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import StoreForm from './storeForm';
import './store.scss'
import { ecommercegetAll } from '../../../store/Category/ecommerce';

const Store = () => {
  // const { register,reset ,handleSubmit, setValue,formState:{errors}, } = useForm();
  
  const { storelist, loadingstore } = useSelector(state => state.storeReducer)
 
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(storegetAll())
  }, [dispatch])
  
  const [searchText, setsearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [idEdit,setIdEdit]=useState(0)
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


    render: text =>{
      if(searchedColumn === dataIndex){
        return <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
      }else{
        if(dataIndex==="ecommerce"){
          return text?.Name;
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
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '20%',
        ...getColumnSearchProps('email'),
      },

    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '20%',
      sorter: (a, b) => a.phone - b.phone,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      width: '20%',
      ...getColumnSearchProps('content'),
    },
    {
      title: 'GMap',
      dataIndex: 'gmap',
      key: 'gmap',
      width:'20%',
      ...getColumnSearchProps('gmap'),
      sorter: (a, b) => a.gmap.length - b.gmap.length,
      sortDirections: ['descend', 'ascend'],
    },
    
    {
      title: 'Description',
      dataIndex: 'des',
      key: 'des',
      width: '20%',
      ...getColumnSearchProps('des'),
    },
    {
    title: 'Facebook',
    dataIndex: 'facebook',
    key: 'facebook',
    width: '20%',
    ...getColumnSearchProps('facebook'),
  },
  {
    title: 'Shopee',
    dataIndex: 'shopee',
    key: 'shopee',
    width: '20%',
    ...getColumnSearchProps('shopee'),
  },
  {
    title: 'Youtube',
    dataIndex: 'youtube',
    key: 'youtube',
    width: '20%',
    ...getColumnSearchProps('youtube'),
  },
  {
    title: 'Ecommerce',
    dataIndex: 'ecommerce',
    key: 'ecommerce',
    width: '20%',
    ...getColumnSearchProps('ecommerce'),
  },

  
    {
      key: 'Action',
      title: <SyncOutlined onClick={() => dispatch(storegetAll())} />,
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
    Content: data.content,
    Description: data.description,
    GMap: data.gmap,
    EcommerceId:data.ecommerceId,
    Facebook: data.facebook,
    Shopee: data.shopee,
    Youtube: data.youtube,
   }
    dispatch(storeAdd(dataNews))
   
    setIsModalAdd(false)
    formAdd.resetFields()
   }

   const handleEditForm = (record) => {
    const editform = {    
      id: record.Id,
      name: record.Name,
      email: record.Email,
      phone: record.Phone,
      content: record.Content,
      description: record.Description,
      gmap: record.GMap,
      ecommerceId:record.EcommerceId,
      facebook: record.Facebook,
      youtube: record.Description,
      shopee: record.Description,
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
    Content: data.content,
    Description: data.description,
    GMap: data.gmap,
    EcommerceId:data.ecommerceId,
    Facebook: data.facebook,
    Shopee: data.shopee,
    Youtube: data.youtube,
     }
    dispatch(storeEdit(edit))
    setIsModalEdit(false)
    
    console.log(edit)
 
  }
  const handleDelete = (id) => {
    dispatch(storeDelete(id))
  }
  return (
    <div>
      <div className='addstore' >
        <Button type="primary" onClick={() => 
         
          setIsModalAdd(true)}>
          Thêm Store
        </Button>
      </div>
      <br />
      <Modal className='modal-add' title="Thêm Sàn" visible={isModalAdd} footer="" centered onCancel={() => setIsModalAdd(false)}>
        <StoreForm
          onFinish={onFinishAdd}
          form={formAdd} />
      </Modal>

      <Modal className='modal-edit' title="Sửa Sàn" visible={isModalEdit} onCancel={() => setIsModalEdit(false)} centered footer="">
        <StoreForm
          onFinish={onFinishEdit}
          form={formEdit}
        
          idEdit={idEdit}
         
       
        />
      </Modal>

      <Table scroll={{ x: 900 }}
       pagination= {{defaultCurrent:30,defaultPageSize:10,hideOnSinglePage:true,pageSizeOptions:[10,30,50,100]}}
      loading={loadingstore} columns={columns} dataSource={storelist} rowKey={record => record.id} bordered />

    </div>
  )
}

export default Store;
