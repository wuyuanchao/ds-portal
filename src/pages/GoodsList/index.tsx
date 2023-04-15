import { AppstoreOutlined, TagOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Radio, Avatar, List, Space, Card, Input, Tag } from 'antd';
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'products/Goods_SN_${i}',
  title: `Goods_SN_${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description: 'V亚马逊爆款 新款吸盘磨刀器 韩国迷你钨钢磨刀器 家用户外便携',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const goodsData = [
  {
    goodsSn: 'JDHDU806',
    goodsName: 'V亚马逊爆款 新款吸盘磨刀器 韩国迷你钨钢磨刀器 家用户外便携',
    goodsUrl: 'https://detail.1688.com/offer/584525654162.html',
    description:
      '品名】吸盘磨刀器【颜色】红色、蓝色、绿色、黄色【装箱数量】200套【外箱规格】54cmX33cmX35cm 【整箱毛重】抛重13公斤 ' +
      '【彩盒尺寸】6.5cmX6.5cmX6.5cm 【单品重量】48克 备注：吸塑包装加1毛。可定制LOGO/制版费100元、3000套1毛一个LOGO ' +
      '铁质和钢制的区别在于刀片 ，铁质是黑色的 钢制是白色的，钢是坞钢是便宜的坞钢',
    imageUrl: 'https://cbu01.alicdn.com/img/ibank/2019/531/659/10434956135_1177513472.jpg',
    tags: ['red', 'green'],
  },
  {
    goodsSn: 'UYDJ782I',
    goodsName: '新款宽口硅胶沥水器锅边沥水挡家用面条蔬菜倒菜过滤防洒漏滤水器',
    goodsUrl: 'https://detail.1688.com/offer/547414780232.html',
    description:
      '产品名称：新款宽口硅胶沥水器 硅胶滤水器锅边沥水档 产品材质：硅胶 +不锈钢 产品克重：约210g ' +
      '产品包装：常规包装为PE袋自封口 ，100个一箱 ，43*28*48CM 如需彩盒，请与客服联系 ！' +
      '彩盒装箱数量：50个一箱，外箱尺寸：68*24.5*59cm （产品为抛货，付款前请先确认运费。）',
    imageUrl: 'https://cbu01.alicdn.com/img/ibank/2020/419/044/19042440914_816944470.jpg',
    tags: ['orange'],
  },
  {
    goodsSn: 'ABS871S',
    goodsName: '莫代尔固定杯吊带背心女带胸垫薄款内搭小吊带外穿女士打底衫内衣',
    goodsUrl: 'https://detail.1688.com/offer/673372410824.html',
    description: '莫代尔固定杯吊带背心女带胸垫薄款内搭小吊带外穿女士打底衫内衣',
    imageUrl:
      'https://cbu01.alicdn.com/img/ibank/O1CN01UWEdxP1mR9DuBJSQ1_!!2210025724950-0-cib.jpg',
    tags: ['blue'],
  },
];

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const extraContent = (
  <div className={styles.extraContent}>
    <RadioGroup defaultValue="all">
      <RadioButton value="all">
        <IconText icon={AppstoreOutlined} text="全部" key="list-vertical-like-o" />
      </RadioButton>
      <RadioButton value="progress">
        <IconText icon={ThunderboltOutlined} text="带电" key="list-vertical-star-o" />
      </RadioButton>
      <RadioButton value="waiting">
        <IconText icon={TagOutlined} text="特货" key="list-vertical-message" />
      </RadioButton>
    </RadioGroup>
    <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
  </div>
);

const GoodsList: React.FC = () => (
  <PageContainer>
    <div className={styles.standardList}>
      <Card
        className={styles.listCard}
        bordered={false}
        title="商品列表"
        style={{ marginTop: 24 }}
        bodyStyle={{ padding: '0 32px 40px 32px' }}
        extra={extraContent}
      >
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={goodsData}
          // footer={
          //   <div>
          //     <b>ant design</b> footer part
          //   </div>
          // }
          renderItem={(item) => (
            <List.Item
              key={item.goodsSn}
              actions={item.tags.map((k) => (
                <Tag color={k}>标签{k}</Tag>
              ))}
              extra={<img width={222} height={222} alt="logo" src={item.imageUrl} />}
            >
              <List.Item.Meta
                // avatar={<Avatar src={item.avatar} />}
                title={<a href={item.goodsUrl}>{item.goodsSn}</a>}
                description={item.goodsName}
              />
              {item.description}
            </List.Item>
          )}
        />
      </Card>
    </div>
  </PageContainer>
);

export default GoodsList;
