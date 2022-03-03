import React, { useCallback } from 'react'
import { voucherAdd, voucherEdit, voucherDelete, vouchergetAll } from '../../../store/Category/vouchers';
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Space, Table, Popconfirm, Tag, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { Pagination } from 'antd';
import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import VoucherForm from './voucherForm';
import moment from 'moment';
import './voucher.scss'

const Voucher = () => {

  
  const { voucherlist, loadingvoucher } = useSelector(state => state.voucherReducer)
 


  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(vouchergetAll())
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
      title: 'decrease_price',
      dataIndex: 'decrease_price',
      key: 'decrease_price',
      width: '20%',
      sorter: (a, b) => a.decrease_price - b.decrease_price,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('decrease_price'),
    },
    {
        title: 'decrease_percent',
        dataIndex: 'decrease_percent',
        key: 'decrease_percent',
        width: '20%',
        sorter: (a, b) => a.decrease_percent - b.decrease_percent,
        sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('decrease_percent'),
      },
      {
        title: 'max_decrease_price',
        dataIndex: 'max_decrease_price',
        key: 'max_decrease_price',
        width: '20%',
        sorter: (a, b) => a.max_decrease_price - b.max_decrease_price,
        sortDirections: ['descend', 'ascend'],
        ...getColumnSearchProps('max_decrease_price'),
      },
    {
      title: 'created_date',
      dataIndex: 'created_date',
      key: 'created_date',
      width: '20%',
      sorter: (a, b) => a.created_date - b.created_date,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('created_date'),
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
      title: <SyncOutlined onClick={() => dispatch(vouchergetAll())} />,
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
   decrease_percent: values.decrease_percent,
   decrease_price:values.decrease_price,
   ecommerce_id: values.ecommerce_id,
   des: values.des,
   max_decrease_price: values.max_decrease_price,
   created_date: values.date,
  
   }
  
    dispatch(voucherAdd(dataNews))
    formAdd.resetFields()
    setIsModalAdd(false)
    console.log("date555",values.date)
console.log(values)
   }

   const handleEditForm = (record) => {
    const editform = {    
      id: record.id,
      name:record.name,
      date: [moment(record.created_date,'HH-mm DD-MM-YYYY'),moment(record.updated_date,'HH-mm DD-MM-YYYY')],
      decrease_price:record.decrease_price,
      ecommerce_id: record.ecommerce.id,
       max_decrease_price:record.max_decrease_price,
        des: record.des,
        decrease_percent:record.decrease_percent
    }
  
    setIdEdit(record.id);
    formEdit.setFieldsValue(editform)
    setIsModalEdit(true)
  }

  const onFinishEdit = (values) => {
    const edit = {
    id:values.id,
    name: values.name,
    decrease_percent: values.decrease_percent,
    decrease_price:values.decrease_price,
    ecommerce_id: values.ecommerce_id,
    des: values.des,
    max_decrease_price: values.max_decrease_price,
    created_date: values.date[0].format("HH:mm DD-MM-YYYY"),
    
     }
    
    dispatch(voucherEdit(edit))
    setIsModalEdit(false)   ;
    console.log(edit);
  }
  const handleDelete = (id) => {
    dispatch(voucherDelete(id))
  }
  return (
    <div>
      <div className='addecommerce' >
        <Button type="primary" onClick={() => 
         
          setIsModalAdd(true)}>
          Thêm Voucher
        </Button>
      </div>
      <br />
      <Modal className='modal-add' title="Thêm Voucher" visible={isModalAdd} footer="" centered onCancel={() => setIsModalAdd(false)}>
        <VoucherForm
          onFinish={onFinishAdd}
          form={formAdd} />
      </Modal>

      <Modal className='modal-edit' title="Sửa Voucher" visible={isModalEdit} onCancel={() => setIsModalEdit(false)} centered footer="">
        <VoucherForm
          onFinish={onFinishEdit}
          form={formEdit}      
          idEdit={idEdit}     
        />
      </Modal>

      <Table scroll={{ x: 900 }}
       pagination= {{defaultCurrent:1,defaultPageSize:10,hideOnSinglePage:true,pageSizeOptions:[10,30,50,100]}}
      loading={loadingvoucher} columns={columns} dataSource={voucherlist} rowKey={record => record.id} bordered />

    </div>
  )
}

export default Voucher;
