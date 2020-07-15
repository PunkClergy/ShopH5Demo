import network from "./network";

// 直购列表APi
export function getShopList(page, pagesize) {
  return network({
    url: "/v1/shops",
    method: "get",
    params: {
      page, // 页码
      pagesize // 页数
    }
  });
}

// 直购产品详情API
export function getShopDetail(id) {
  return network({
    url: `v1/shop/${id}/detail`,
    method: "get",
  });
}
