import React from 'react';
import {  SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

const FilterDropdown = ({dataIndex, setSelectedKeys, selectedKeys, confirm, clearFilters, handleReset, handleSearch}) => {
    return (
        <div style={{ padding: 12 }}>
            <Input
              placeholder={`Tìm kiếm`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 12, display: 'block' }}
            />
            <Space>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 80 }}>
                Reset
              </Button>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                Tìm kiếm
              </Button>
            </Space>
        </div>
    );
}

export default React.memo(FilterDropdown);