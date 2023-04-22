import {
  PlusOutlined,
  HomeOutlined,
  ContactsOutlined,
  ClusterOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, List, Card, Col, Divider, Input, Row, Tag, Space, Table } from 'antd';
import React, { useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, useRequest, useParams } from 'umi';
import type { RouteChildrenProps } from 'react-router';
import { queryCurrent } from './service';
import styles from './Center.less';

export type tabKeyType = 'skuList' | 'records';
export interface TagType {
  key: string;
  label: string;
}

const { Meta } = Card;

const operationTabList = [
  {
    key: 'skuList',
    tab: (
      <span>
        sku列表 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'records',
    tab: (
      <span>
        记录 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
];

const TagList: React.FC<{ tags: CurrentUser['tags'] }> = ({ tags }) => {
  const ref = useRef<Input | null>(null);
  const [newTags, setNewTags] = useState<TagType[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const showInput = () => {
    setInputVisible(true);
    if (ref.current) {
      // eslint-disable-next-line no-unused-expressions
      ref.current?.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];
    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [...tempsTags, { key: `new-${tempsTags.length}`, label: inputValue }];
    }
    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>标签</div>
      {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key} color="red">
          {item.label}
        </Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ borderStyle: 'dashed' }}>
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

const Center: React.FC<RouteChildrenProps> = () => {
  const [tabKey, setTabKey] = useState<tabKeyType>('skuList');
  const [previewVisible, setPreviewVisible] = useState(false);

  //  获取用户信息
  // const { data: currentUser, loading } = useRequest(() => {
  //   return queryCurrent();
  // });

  const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  }));

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const params = useParams();
  const goodsImg =
    params.goodsId != 'JDHDU806'
      ? 'https://cbu01.alicdn.com/img/ibank/2020/419/044/19042440914_816944470.jpg'
      : 'https://cbu01.alicdn.com/img/ibank/2019/531/659/10434956135_1177513472.jpg';

  const skuItems =
    params.goodsId != 'JDHDU806'
      ? {
          id: '1',
          name: 'Key-product',
          contact: '客户A 联系电话：13867623527',
          createdAt: '2023-04-03',
          items: [
            {
              id: '1',
              name: 'E5401-Suction Cup Whetstone',
              link: 'https://www.clickpickme.co/products/suction-cup-whetstone-1',
              goodsSn: 'YISH723S',
              tag: 'RTS',
            },
          ],
        }
      : {
          id: '2',
          name: 'SN19802',
          contact: '这是一个商品名称',
          createdAt: '客户B QQ：456321',
          items: [
            {
              skuId: 2,
              skuName: '这是sku的名称',
              suppSkuId: '供应商sku的id',
              link: 'https://www.brayou.co/products/tank-with-built-in-bra-50-off-limited-time-only',
              suppName: '义乌小商品供应商',
              purPrice: '27.89',
              color: '红色',
              size: '均码',
              length: '2',
              width: '3',
              height: '5',
              weight: '0.35',
              volumeWeight: '0.35',
              id: '2',
            },
            {
              skuId: 3,
              skuName: '这是sku的名称',
              suppSkuId: '供应商sku的id',
              link: 'https://www.brayou.co/products/tank-with-built-in-bra-50-off-limited-time-only',
              suppName: '义乌百货供应商',
              purPrice: '23.29',
              color: '白色',
              size: '均码',
              length: '2',
              width: '3',
              height: '5',
              weight: '0.35',
              volumeWeight: '0.35',
              id: '3',
            },
          ],
        };

  const columns = [
    {
      title: 'SKU ID',
      key: 'skuId',
      dataIndex: 'skuId',
    },
    {
      title: 'SKU名称',
      dataIndex: 'skuName',
    },
    {
      title: '供方SKU ID',
      dataIndex: 'suppSkuId',
    },
    {
      title: '商品链接',
      dataIndex: 'link',
    },
    {
      title: '供应商名称',
      dataIndex: 'suppName',
    },
    {
      title: '采购价(元)',
      dataIndex: 'purPrice',
    },
    {
      title: '颜色',
      dataIndex: 'color',
    },
    {
      title: '尺码',
      dataIndex: 'size',
    },
    {
      title: '长(cm)',
      dataIndex: 'length',
    },
    {
      title: '宽(cm)',
      dataIndex: 'width',
    },
    {
      title: '高(cm)',
      dataIndex: 'height',
    },
    {
      title: '重量(kg)',
      dataIndex: 'weight',
    },
    {
      title: '体积重(kg)',
      dataIndex: 'volumeWeight',
    },
  ];

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === 'skuList') {
      return (
        <Table rowKey="id" dataSource={skuItems.items} columns={columns} scroll={{ x: 600 }} />
      );
    }
    if (tabValue === 'records') {
      return (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={data}
          footer={
            <div>
              <a href="#">添加记录</a>
            </div>
          }
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      );
    }
    return null;
  };

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card
            style={{ width: 320 }}
            cover={<img alt="example" src={goodsImg} />}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              title="V亚马逊爆款 新款吸盘磨刀器 韩国迷你钨钢磨刀器 家用户外便携"
              description={
                <>
                  【品名】吸盘磨刀器【颜色】红色、蓝色、绿色、黄色【装箱数量】200套【外箱规格】54cmX33cmX35cm
                  【整箱毛重】抛重13公斤 ...
                  <Divider dashed />
                  <TagList tags={[{ key: 'red', label: 'red' }]} />
                </>
              }
            />
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey: string) => {
              setTabKey(_tabKey as tabKeyType);
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default Center;
