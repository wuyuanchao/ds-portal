import { getInquiryList, handleAdd } from '@/services/ant-design-pro/inquiry';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl, Link, history } from 'umi';
import moment from 'moment';

const InquiryList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Inquiry>();
  const [selectedRowsState, setSelectedRows] = useState<API.Inquiry[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.Inquiry>[] = [
    {
      title: <FormattedMessage id="pages.inquiry.table.col.sn" defaultMessage="询价单号" />,
      dataIndex: 'enquiryOrderSn',
      tip: '询价单识别编号',
      render: (dom, entity) => {
        return <Link to={'/inquiries/' + entity.enquiryOrderSn}>{dom}</Link>;
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.inquiry.table.col.enquiryOrderName"
          defaultMessage="询价单名称"
        />
      ),
      dataIndex: 'enquiryOrderName',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.inquiry.table.col.customer" defaultMessage="客户信息" />,
      dataIndex: 'customerInfo',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.inquiry.table.col.createdAt" defaultMessage="创建时间" />,
      sorter: true,
      dataIndex: 'gmtCreated',
      valueType: 'number',
      render: (_, record) => [moment(record.gmtCreated * 1000).format('YYYY-MM-DD HH:mm:ss')],
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            history.push('/inquiries/' + record.name);
          }}
        >
          <FormattedMessage id="pages.inquiry.table.col.detail" defaultMessage="查看详情" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Inquiry, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.inquiry.table.title',
          defaultMessage: '询价需求列表',
        })}
        actionRef={actionRef}
        rowKey="enquiryOrderId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={getInquiryList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.inquiry.create',
          defaultMessage: '新建询价需求',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.Inquiry);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: <FormattedMessage id="pages.inquiry.name" defaultMessage="必填" />,
            },
          ]}
          width="md"
          name="enquiryOrderSn"
          label="询价单编号"
        />
        <ProFormText name="enquiryOrderName" width="md" label="询价单名称" />
        <ProFormTextArea label="客户信息" width="md" name="customerInfo" />
      </ModalForm>
    </PageContainer>
  );
};

export default InquiryList;
