// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取规则列表 GET /api/rule */
export async function inquiry(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Inquiry>('/api/inquiry', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
