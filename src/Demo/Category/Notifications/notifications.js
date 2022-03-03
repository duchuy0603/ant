import React, { useCallback } from 'react'
import { notificationsAdd, notificationsEdit, notificationsDelete, notificationsgetAll } from '../../../store/Category/notifications';
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Space, Table, Popconfirm, Tag, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { Pagination } from 'antd';
import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import NotificationsForm from './notificationsForm';
import './notifications.scss'

const Notifications = () => {

  
  const { notificationslist, loadingnotifications } = useSelector(state => state.notificationsReducer)


  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(notificationsgetAll())
  }, [dispatch])
  
  const [searchText, setsearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [idEdit,setIdEdit]=useState(0);
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
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
  

    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      width: '20%',
      sorter: (a, b) => a.content - b.content,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('content'),
    },
   
    {
      title: 'EcomerceId',
      dataIndex: 'ecommerce',
      key: 'ecommerce',
      width: '20%',
      ...getColumnSearchProps('ecommerce'),
      sorter: (a, b) => a.ecommerce.length - b.ecommerce.length,
      sortDirections: ['descend', 'ascend'],
    },

    {
      key: 'Action',
      title: <SyncOutlined onClick={() => dispatch(notificationsgetAll())} />,
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
   const dataNews = {
    name: data.name,
    content: data.content,
    
    ecommerce_id: data.ecommerce_id,

   }
    dispatch(notificationsAdd(dataNews))
    formAdd.resetFields()
    setIsModalAdd(false)

   }

   const handleEditForm = (record) => {
    const editform = {    
      id: record.id,
  
      name: record.name,
      content: record.content,
      ecommerce_id: record.ecommerce.id,
     
    }
  
    setIdEdit(record.id);
    formEdit.setFieldsValue(editform)
    setIsModalEdit(true)
  }

  const onFinishEdit = (record) => {
    const edit = {
      id:record.id,
      name: record.name,
      content: record.content,  
      ecommerce_id: record.ecommerce_id,
 
     }
    
    dispatch(notificationsEdit(edit))
    setIsModalEdit(false)   ;
    console.log(edit);
  }
  const handleDelete = (id) => {
    dispatch(notificationsDelete(id))
  }
  return (
    <div>
      <div className='addecommerce' >
        <Button type="primary" onClick={() => 
         
          setIsModalAdd(true)}>
          Thêm notifications
        </Button>
      </div>
      <br />
      <Modal className='modal-add' title="Thêm notifications" visible={isModalAdd} footer="" centered onCancel={() => setIsModalAdd(false)}>
        <NotificationsForm
          onFinish={onFinishAdd}
          form={formAdd} />
      </Modal>

      <Modal className='modal-edit' title="Sửa notifications" visible={isModalEdit} onCancel={() => setIsModalEdit(false)} centered footer="">
        <NotificationsForm
          onFinish={onFinishEdit}
          form={formEdit}      
          idEdit={idEdit}     
        />
      </Modal>

      <Table scroll={{ x: 900 }}
       pagination= {{defaultCurrent:1,defaultPageSize:10,hideOnSinglePage:true,pageSizeOptions:[10,30,50,100]}}
      loading={loadingnotifications} columns={columns} dataSource={notificationslist} rowKey={record => record.id} bordered />

    </div>
  )
}

export default Notifications;
