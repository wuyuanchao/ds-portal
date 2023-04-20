// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

//查询询价单列表
export async function getInquiryList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const response = await request<API.Inquiry>('/api/enquiry/list', {
    method: 'POST',
    data: {
      pageIndex: params.current,
      pageSize: params.pageSize,
      // ...params,
    },
    ...(options || {}),
  });

  // todo: 暂时在这里转换响应结构，后面需要统一拦截器处理
  let respData = {
    data: [],
    // success 请返回 true，
    // 不然 table 会停止解析数据，即使有数据
    success: false,
    // 不传会使用 data 的长度，如果是分页一定要传
    total: 0,
  };
  if (response.code == 200) {
    respData.success = true;
    respData.data = response.data.orderList;
    respData.total = response.data.total;
  }

  return respData;
}

export async function handleAdd(inquiry: API.Inquiry) {
  return request<API.Inquiry>('/api/inquiry', {
    method: 'POST',
    data: inquiry,
  });
}

export async function handleRemove(inquiries: API.Inquiry[]) {}

export async function getById(id: string) {
  return request<API.Inquiry>('/api/inquiry/' + id, {
    method: 'GET',
  });
}
