import React, { useCallback } from 'react'
import { eventsAdd, eventsEdit, eventsDelete, eventsgetAll } from '../../../store/Category/event';
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Space, Table, Popconfirm, Tag, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { Pagination } from 'antd';
import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import EventsForm from './eventForm';
import moment from 'moment';
import './events.scss'

const Events = () => {

  
  const { eventslist, loadingevents } = useSelector(state => state.eventsReducer)
 


  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(eventsgetAll())
  }, [dispatch])
  const checkstart=(data)=>{
if(data==null){
  return
}else{
  return data[0]
}
  }
  const [searchText, setsearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [idEdit,setIdEdit]=useState(0);
  //modal
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [formAdd] = Form.useForm();    
  const [formEdit] = Form.useForm();
  const checkimage=(img)=>{
if(img==null){
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
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Image',
      
 dataIndex: 'image_url',
      key: 'Image',
      width: '12%',
    
      render: text => <img src={checkimage(text)}  style={{width:"100%",height:"40%"}} alt=""/>
    },

    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      width: '20%',
      sorter: (a, b) => a.cost - b.cost,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('cost'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '20%',
      sorter: (a, b) => a.address - b.address,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('address'),
    },
    {
      title: 'start_time',
      dataIndex: 'start_time',
      key: 'start_time',
      width: '20%',
      sorter: (a, b) => a.start_time - b.start_time,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('start_time'),
    },
    {
      title: 'end_time',
      dataIndex: 'end_time',
      key: 'end_time',
      width: '20%',
      sorter: (a, b) => a.end_time - b.end_time,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('end_time'),
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
      title: 'Description',
      dataIndex: 'des',
      key: 'des',
      width: '20%',
      ...getColumnSearchProps('des'),
    },
    {
      key: 'Action',
      title: <SyncOutlined onClick={() => dispatch(eventsgetAll())} />,
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
  const onFinishAdd = (values) => {
   
   const dataNews = {
    name: values.name,
    cost: values.cost,
    address:values.address,
    start_time: values.date[0].format("HH:mm DD-MM-YYYY"),
    end_time: values.date[1].format("HH:mm DD-MM-YYYY"), 
    ecommerce_id: values.ecommerce_id,
    des: values.des,
    image_url: values.image,
   }
  
    dispatch(eventsAdd(dataNews))
    formAdd.resetFields()
    setIsModalAdd(false)
    console.log("date555",values.date)
console.log(values)
   }

   const handleEditForm = (record) => {
    const editform = {    
      id: record.id,
      name:record.name,
      date: [moment(record.start_time,'HH-mm DD-MM-YYYY'),moment(record.end_time,'HH-mm DD-MM-YYYY')],
      address:record.address,
      ecommerce_id: record.ecommerce.id,
       cost:record.cost,
        des: record.des,
        image:record.image_url 
    }
  
    setIdEdit(record.id);
    formEdit.setFieldsValue(editform)
    setIsModalEdit(true)
  }

  const onFinishEdit = (values) => {
    const edit = {
    id:values.id,
    name: values.name,
    cost: values.cost,
    address:values.address,
    start_time: values.date[0].format("HH:mm YYYY-MM-DD"),
    end_time: values.date[1].format("HH:mm YYYY-MM-DD"),  
    ecommerce_id: values.ecommerce_id,
    des: values.des,
    image_url: values.image,
     }
    
    dispatch(eventsEdit(edit))
    setIsModalEdit(false)   ;
    console.log(edit);
  }
  const handleDelete = (id) => {
    dispatch(eventsDelete(id))
  }
  return (
    <div>
      <div className='addecommerce' >
        <Button type="primary" onClick={() => 
         
          setIsModalAdd(true)}>
          Thêm Event
        </Button>
      </div>
      <br />
      <Modal className='modal-add' title="Thêm Event" visible={isModalAdd} footer="" centered onCancel={() => setIsModalAdd(false)}>
        <EventsForm
          onFinish={onFinishAdd}
          form={formAdd} />
      </Modal>

      <Modal className='modal-edit' title="Sửa Event" visible={isModalEdit} onCancel={() => setIsModalEdit(false)} centered footer="">
        <EventsForm
          onFinish={onFinishEdit}
          form={formEdit}      
          idEdit={idEdit}     
        />
      </Modal>

      <Table scroll={{ x: 900 }}
       pagination= {{defaultCurrent:1,defaultPageSize:10,hideOnSinglePage:true,pageSizeOptions:[10,30,50,100]}}
      loading={loadingevents} columns={columns} dataSource={eventslist} rowKey={record => record.id} bordered />

    </div>
  )
}

export default Events;
