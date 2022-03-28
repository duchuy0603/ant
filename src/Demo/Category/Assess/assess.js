import React, { useCallback } from 'react'
import { assessAdd, assessEdit, assessDelete, assessgetAll } from '../../../store/Category/assess';
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Space, Table, Popconfirm, Tag, Input ,Select} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import AssessForm from './assessForm';
import './assess.scss'

   const Assess = () => {
   const[ecommerce,setecommerce]=useState([])
   const {Option}=Select;
   const { assesslist, loadingassess } = useSelector(state => state.assessReducer)
   const {ecommercelist}=useSelector(state=>state.ecommerceReducer)
   const dispatch = useDispatch();

    useEffect(() => {
      dispatch(assessgetAll())
    
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
        if(dataIndex==='store'){
            return text?.name
          }
          if(dataIndex==='product'){
            return text?.name
          }
        return text;
      }
    }

     
  });
  const onchangeeommerce = (data) => {
    setecommerce(data);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {

    confirm();
    setsearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);

  };
  const handleReset = clearFilters => {
    clearFilters();
    
    
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'product',
      key: 'product',
      width: '20%',
      ...getColumnSearchProps('product'),
    },


    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      width: '20%',
    
      sorter: (a, b) => a.rate - b.rate,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('rate'),
    },
  
    

    {
        title: 'store',
        dataIndex: 'store',
        key: 'store',
        width: '20%',
        ...getColumnSearchProps('store'),
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
      dataIndex: 'description',
      key: 'description',
      width: '20%',
      ...getColumnSearchProps('des'),
    },
    {
      key: 'Action',
      title: <SyncOutlined onClick={() => dispatch(assessgetAll())} />,
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <Space size="middle">
          <EditOutlined style={{ color: "blue" }} onClick={() => handleEditForm(record)} />
          <Popconfirm
            placement="bottomRight"
            title={`Bạn muốn xóa ${record.product?.name} ?`}
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
    parent_id: data.parent_id,
    ecommerce_id: data.ecommerce_id,
    des: data.des,
    image_url: data.image,
   }
    dispatch(assessAdd(dataNews))
    formAdd.resetFields()
    setIsModalAdd(false)

   }

   const handleEditForm = (record) => {
    const editform = {    
      id: record.id,
  
      name: record.name,
      content: record.content,
      ecommerce_id: record.ecommerce?.id,
       parent_id:record.parent_id,
        rate: record.rate,
        image:record.image_url 
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
      parent_id: record.parent_id,
      ecommerce_id: record.ecommerce_id,
      des: record.des,
      image_url: record.image,
     }
    
    dispatch(assessEdit(edit))
    setIsModalEdit(false)   ;
    console.log(edit);
  }
  const handleDelete = (id) => {
    dispatch(assessDelete(id))
  }

  return (
    <div>
      <div className='addecommerce' >
    {/* <div className='btn-add'>
    <Button type="primary" onClick={() => 
         
         setIsModalAdd(true)}>
         Thêm Category
       </Button>
    </div> */}
    
      </div>
      <br />
      <Modal className='modal-add' title="Thêm Danh Mục" visible={isModalAdd} footer="" centered onCancel={() => setIsModalAdd(false)}>
        <AssessForm
          onFinish={onFinishAdd}
          form={formAdd} />
      </Modal>

      <Modal className='modal-edit' title="Sửa Danh Mục" visible={isModalEdit} onCancel={() => setIsModalEdit(false)} centered footer="">
        <AssessForm
          onFinish={onFinishEdit}
          form={formEdit}      
          idEdit={idEdit}     
        />
      </Modal>

      <Table scroll={{ x: 900 }}
       pagination= {{defaultCurrent:1,defaultPageSize:10,hideOnSinglePage:true,pageSizeOptions:[10,30,50,100]}}
      loading={loadingassess} columns={columns} dataSource={assesslist} rowKey={record => record.id} bordered />

    </div>
  )
}

export default Assess;
