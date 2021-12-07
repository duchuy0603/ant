import { DeleteOutlined, EditOutlined, SyncOutlined, SearchOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Space, Table, Popconfirm } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import NewListForm from './NewListForm';
import FilterDropdown from '../../_components/FilterDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { news } from '../../_components/otherData';


const NewListComponent = () => {
    const [searchText, setSearchText] = useState('');      //table
    const [searchedColumn, setSearchedColumn] = useState('');

    const [addModalShow, setAddModalShow] = useState(false);    //modal
    const [editModalShow, setEditModalShow] = useState(false); 
    
    const [formAdd] = Form.useForm();    //form
    const [formEdit] = Form.useForm();

    // const {loadingDance, danceList} = useSelector(state => state.danceReducer);  //data

    const dispatch = useDispatch();

    useEffect(() => {
    //   dispatch(getAllDance());
    //   dispatch(getAllCategoryDance());
    }, [dispatch])

    //Table
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <FilterDropdown dataIndex={dataIndex} setSelectedKeys={setSelectedKeys}
            selectedKeys={selectedKeys} confirm={confirm} clearFilters={clearFilters}
            handleSearch={handleSearch} handleReset={handleReset}
          />
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : '#555555' }} />,
        onFilter: (value, record) => record[dataIndex]
              ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
              : '',
        render: (text, record, index) => {
          if(searchedColumn === dataIndex && searchText) {
              return <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                  />
          } else {
            return text
          }
        },
    });
    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    
    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
          key: 'name',
          title: 'Tên Tin Tức',
          dataIndex: 'name',
          width: '26%',
          ...getColumnSearchProps('name'),
        },
        {
            key: 'theme',
            title: 'Chủ Đề',
            dataIndex: 'theme',
            width: '10%',
            ...getColumnSearchProps('theme'),
        },
        {
            key: 'content_summary',
            title: 'Nội Dung Tóm Tắt',
            dataIndex: 'content_summary',
            width: '44%',
            ...getColumnSearchProps('content_summary'),
        },
        {
            key: 'update_at',
            title: 'Thời gian',
            dataIndex: 'update_at',
            width: '12%',
            ...getColumnSearchProps('update_at'),
        },
        {
          key: 'action',
          align: "center",
        //title: <SyncOutlined onClick={() => dispatch(getAllDance())}/>,
          title: <SyncOutlined/>,
          width: '8%',
          render: (text, record, index) => (
            <Space size="middle">
              <EditOutlined onClick={() => handleEditForm(record)}/>
              <Popconfirm
                placement="topRight"
                title={`Bạn muốn xóa ${record.name} ?`}
                onConfirm={() => handleDelete(record.id)}
                okText="Xóa"
                cancelText="Hủy"
              >
                <DeleteOutlined/>
              </Popconfirm>
            </Space>
          ),
        },
    ];
    //End Table
  
    //Data
    const onFinishAdd = useCallback((values) => {
      const newData = {
      };
    //   dispatch(createDance(newData));
      setAddModalShow(false);
      formAdd.resetFields();
    }, [formAdd, dispatch]);

    const handleEditForm = useCallback((record) => {
      const editFormValue = {
      }
      formEdit.setFieldsValue(editFormValue);
      setEditModalShow(true);
    }, [formEdit]);

    const onFinishEdit = useCallback((values) => {
      const dataEdited = {
      }
    //   dispatch(editDance(dataEdited));
      setEditModalShow(false);
    }, [dispatch]);

    const handleDelete = useCallback((id) => {
    //   dispatch(deleteDance(id));
    }, [dispatch]);
    //End Data
    
    return (
        <div className="table-cus-component new-list-component">
            <div className="add-modal">
              <Button type="primary" onClick={() => setAddModalShow(true)}>
                <AppstoreAddOutlined /> Thêm tin tức
              </Button>

              <Modal
                wrapClassName="modal-cus modal-new-list"
                title="Thêm tin tức"
                centered
                footer={null}
                onCancel={() => setAddModalShow(false)}
                visible={addModalShow}
              >
                <NewListForm
                  name="new-list-form-add"
                  onFinish={onFinishAdd}
                  form={formAdd}
                //   loadingCategoryDance={loadingCategoryDance}
                //   categoryDanceList={categoryDanceList}
                />
              </Modal>

              <Modal
                wrapClassName="modal-cus modal-new-list"
                title="Sửa tin tức"
                centered
                footer={null}
                onCancel={() => setEditModalShow(false)}
                visible={editModalShow}
              >
                <NewListForm
                  name="new-list-form-edit"
                  onFinish={onFinishEdit}
                  form={formEdit}
                //   loadingCategoryDance={loadingCategoryDance}
                //   categoryDanceList={categoryDanceList}
                  idEdit={true}
                />
              </Modal>

            </div>
            <div className="table-data">
              {/* <Table scroll={{ x: 900 }} loading={loadingDance} rowKey={record => record.id} columns={columns} dataSource={danceList} bordered/> */}
              <Table scroll={{ x: 1000 }} rowKey={record => record.id} columns={columns} dataSource={news} bordered/>
            </div>
        </div>
    );
}
export default React.memo(NewListComponent);