import ajax from './ajax'


// 1. 定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc';

export const getHomeData = () => ajax(BASE_URL + '/api/homeApi');
export const getCategories = () => ajax(BASE_URL + '/api/homeApi/categories');
export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams);





// 2. 用户中心接口
//  http://localhost:3000/web/xlmc/api/send_code
const LOCAL_BASE_URL = 'http://demo.itlike.com/web/xlmc';
// const LOCAL_BASE_URL = '/api';

// 2.1 获取短信验证码(GET)
export const getPhoneCode = (phone) => ajax(LOCAL_BASE_URL + '/api/send_code', { phone });
// 2.2 手机验证码登录(POST)
export const phoneCodeLogin = (phone, code) => ajax(LOCAL_BASE_URL + '/api/login_code', { phone, code }, 'POST');
// 2.3 用户名和密码登录(POST)
export const pwdLogin = (user_name, user_pwd, captcha) => ajax(LOCAL_BASE_URL + '/api/login_pwd', { user_name, user_pwd, captcha }, 'POST');
// 2.4 自动登录
export const getUserInfo = () => ajax(LOCAL_BASE_URL + '/api/userinfo');
// 2.5 退出登录
export const getLogOut = () => ajax(LOCAL_BASE_URL + '/api/logout');




// 3. 购物车接口
/*
3.1 添加商品
请求方式：POST
参数：{goods_id: String, goods_name: String, goods_price: Number, small_image: String}
*/
export const addGoodsToCart = (user_id, goods_id, goods_name, goods_price, small_image) => ajax(LOCAL_BASE_URL + '/api/cart/add', { user_id, goods_id, goods_name, goods_price, small_image }, 'POST');

// 3.2 获取当前用户购物车中的商品
export const getGoodsCart = (user_id) => ajax(LOCAL_BASE_URL + '/api/cart/search/' + user_id);

// 3.3 修改购物车商品数量
export const changeCartNum = (user_id, goods_id, type) => ajax(LOCAL_BASE_URL + '/api/cart/num', { user_id, goods_id, type }, 'POST');

// 3.4 删除当前用户购物车中所有的商品
export const clearAllCart = (user_id) => ajax(LOCAL_BASE_URL + '/api/cart/clear/' + user_id);

// 3.5 单个商品的选中和取消选中
export const singerGoodsSelect = (user_id, goods_id) => ajax(LOCAL_BASE_URL + '/api/cart/singer_select', { user_id, goods_id }, 'POST');

// 3.6 所有商品的选中和取消选中
export const allGoodsSelect = (user_id, flag) => ajax(LOCAL_BASE_URL + '/api/cart/all_select', { user_id, flag }, 'POST');

// 3.7 查询所有已经被选中的商品
export const getAllSelectedGoods = (user_id) => ajax(LOCAL_BASE_URL + '/api/cart/selected/' + user_id);

// 3.8 删除已经生成订单的商品
export const delAllSelectedGoods = (user_id) => ajax(LOCAL_BASE_URL + '/api/cart/del_checked/' + user_id);


// 4. 地址接口

// 4.1 获取当前用户的地址
export const getUserAddress = (user_id) => ajax(LOCAL_BASE_URL + '/api/address/search/' + user_id);

// 4.2 添加新的地址
export const addUserAddress = (user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode) => ajax(LOCAL_BASE_URL + '/api/address/add', { user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode }, 'POST');

// 4.3 编辑用户的地址
export const changeUserAddress = (address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode) => ajax(LOCAL_BASE_URL + '/api/address/edit', { address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode }, 'POST');

// 4.4 删除用户的地址
export const delUserAddress = (address_id) => ajax(LOCAL_BASE_URL + '/api/address/del/' + address_id);

// 4.5 获取单条地址
export const getCurrentUserAddress = (user_id, address_id) => ajax(LOCAL_BASE_URL + '/api/address/one', { user_id, address_id }, 'POST');

// 5. 订单接口
// 5.1 提交订单
export const postOrder = (user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price) => ajax(LOCAL_BASE_URL + '/api/order/post', { user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price }, 'POST');

// 5.2 订单支付成功
export const orderPaySuccess = (user_id, order_id) => ajax(LOCAL_BASE_URL + '/api/order/change_status', { user_id, order_id }, 'POST');

// 5.3 查询订单
export const getOrder = (user_id, status) => ajax(LOCAL_BASE_URL + '/api/order/get', { user_id, status }, 'POST'); // pay will


// 6. 微信支付接口部署

const PAY_URL = 'http://47.98.157.152/WXPayProject/pay';
// const PAY_URL = '/pay';
// 6.1 获取支付的URL
export const getWXCode = (outTradeNo, totalFee) => ajax(PAY_URL + '/createNative.do', { outTradeNo, totalFee });
// 6.2 查询是否支付成功
export const queryPayStatus = (out_trade_no) => ajax(PAY_URL + '/queryPayStatus.do', { out_trade_no });