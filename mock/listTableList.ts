import { Request, Response } from 'express';
import moment from 'moment';
import { parse } from 'url';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.RuleListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      goodsName: `商品名称 ${index}`,
      goodsId: index * 20,
      goodsSn: `SN ${index}`,
      remark: `这是备注信息 ${index}`,
      status: Math.floor(Math.random() * 10) % 2,
      updatedAt: moment().format('YYYY-MM-DD'),
      createdAt: moment().format('YYYY-MM-DD'),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.RuleListItem & {
      sorter: any;
      filter: any;
    };

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data?.name?.includes(params.name || ''));
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule: API.RuleListItem = {
          key: tableListDataSource.length,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 2,
          updatedAt: moment().format('YYYY-MM-DD'),
          createdAt: moment().format('YYYY-MM-DD'),
          progress: Math.ceil(Math.random() * 100),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

let inquiries: API.Inquiry[] = [
  {
    enquiryOrderId: 1,
    enquiryOrderSn: 'Key-product',
    enquiryOrderName: 'Key-product',
    customerInfo: '客户A 联系电话：13867623527',
    gmtCreated: '1681912100',
  },
  {
    enquiryOrderId: 2,
    enquiryOrderSn: 'Key-product',
    enquiryOrderName: 'Precheck',
    customerInfo: '客户B QQ：456321',
    gmtCreated: '1682776099',
  },
];

function getInquiryList(req: Request, res: Response, u: string) {
  const { current = 1, pageSize = 10 } = req.query;
  const dataSource = inquiries;
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: current,
  };

  return res.json(result);
}

export default {
  'GET /api/rule': getRule,
  'POST /api/rule': postRule,
  // 'GET /api/inquiry': getInquiryList,
  // 'POST /api/inquiry': { success: true },
  'GET /api/inquiry/Key-product': {
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
  },
  'GET /api/inquiry/Precheck': {
    id: '2',
    name: 'Precheck',
    contact: '客户B QQ：456321',
    createdAt: '2023-04-01',
    items: [
      {
        id: '2',
        name: 'Tank With Built-In Bra',
        link: 'https://www.brayou.co/products/tank-with-built-in-bra-50-off-limited-time-only',
      },
      {
        id: '3',
        name: "Men's Ethnic Style Linen Long-Sleeved T-Shirt",
        link: 'https://www.koolmate.co/products/men-s-ethnic-style-linen-long-sleeved-t-shirt-50-off-limited-time-only',
      },
    ],
  },
};
