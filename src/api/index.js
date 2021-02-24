  
import {get,post,req} from '@/http/http'
import {SYSURL} from '@/http/url'

/**
 * 登录
 */
export const login = data => post('login',data);

/**
 * 登录
 */
export const logout = data => post('logout',data);

/**
 * 登录
 */
export const mplogin = function(){
	
	location.href = SYSURL['mplogin'] + '&callback=' + encodeURIComponent(window.location.href);//暂时注释
};

/**
 * 用户信息
 */
export const userInfo = data => req('user/info',data);


/**
 * 店铺信息
 */
export const storeInfo = data => get('store/info',data);

/**
 * 店铺信息
 */
export const storeData = data => get('store/data',data);

/**
 * 店铺购物车
 */
export const storeCart = data => get('store/cart',data);

/**
 * 获取商品列表
 */
export const goodsLists = data => get('goods/lists',data);

/**
 * 获取商品信息
 */
export const goodsInfo = data => get('goods/info',data);



/**
 * 获取商品分类
 */
export const cateLists = data => get('category/lists',data);


/**
 * 绑定桌台
 */
export const tableActionAdd = data => post('table/action/add',data);


/**
 * 获取桌台列表
 */
export const tableLists = data => get('table/lists',data);

/**
 * 获取桌台详情
 */
export const tableInfo = data => get('table/info',data);


/**
 * 获取桌台详情
 */
export const tableDetail = data => get('table/detail',data);

/**
 * 添加桌台
 */
export const tableAdd = data => post('table/add',data);


/**
 * 编辑桌台
 */
export const tableEdit = data => post('table/edit',data);


/**
 * 删除桌台
 */
export const tableDelete = data => post('table/delete',data);


/**
 * 获取桌台类型列表
 */
export const tableTypeLists = data => get('table/type/lists',data);

/**
 * 添加桌台类型
 */
export const tableTypeAdd = data => post('table/type/add',data);


/**
 * 编辑桌台类型
 */
export const tableTypeEdit = data => post('table/type/edit',data);


/**
 * 删除桌台类型
 */
export const tableTypeDelete = data => post('table/type/delete',data);


/**
 * 排队列表
 */
export const queueLists = data => get('queue/lists',data);

/**
 * 排队列表
 */
export const queueInfo = data => get('queue/info',data);

/**
 * 排队编辑
 */
export const queueEdit = data => get('queue/edit',data);


/**
 * 获取服务员列表
 */
export const waiterLists = data => get('waiter/lists',data);


/**
 * 购物车列表
 */
export const cartLists = data => post('cart/lists',data);


/**
 * 添加购物车
 */
export const cartAdd = data => post('cart/add',data);


/**
 * 编辑购物车
 */
export const cartEdit = data => post('cart/edit',data);

/**
 * 删除购物车
 */
export const cartDelete = data => post('cart/delete',data);

/**
 * 清空购物车
 */
export const cartClear = data => post('cart/clear',data);

/**
 * 获取订单列表
 */
export const orderLists = data => get('order/lists',data);


/**
 * 获取订单详情
 */
export const orderInfo = data => get('order/info',data);


/**
 * 获取订单详情
 */
export const orderDetail = data => get('order/detail',data);


/**
 * 确认订单
 */
export const orderConfirm = data => get('order/confirm',data);

/**
 * 确认订单
 */
export const orderModifyStatus = data => get('order/modifyStatus',data);

/**
 * 添加订单
 */
export const orderAdd = data => post('order/add',data);

/**
 * 更改商品数量
 */
export const changeItemQuantity = data => post('order/change_item',data);


/**
 * 加菜
 */
export const addOrderItem = data => post('order/add_item',data);

/**
 * 减菜
 */
export const deleteOrderItem = data => post('order/delete_item',data);

/**
 * 减菜
 */
export const orderPress = data => post('order/press',data);



/**
 * 减菜
 */
export const statusLists = data => post('order/status',data);

/**
 * 支付
 */
export const pay = function( order_id,payment_channel_code ) {
	window.location.href = SYSURL['pay/pay'] + '&order_id=' + order_id + '&payment_channel_code=' + payment_channel_code + '&from=customer';
};


/**
 * 搜索首页
 */
export const searchIndex = data => get('search/index',data);

/**
 * 搜索列表
 */
export const searchLists = data => get('search/lists',data);


/**
 * 添加搜索记录
 */
export const searchAdd = data => post('search/add',data);


/**
 * 清除历史记录
 */
export const searchClear = data => post('search/clear',data);

/**
 * 地址信息
 */
export const addressInfo = data => post('address/info',data);

/**
 * 地址列表
 */
export const addressLists = data => post('address/lists',data);


/**
 * 添加地址记录
 */
export const addressSave = data => post('address/save',data);




/**
 * 获取退货单列表
 */
export const returnLists = data => get('return/lists',data);

/**
 * 获取退货理由
 */
export const returnReason = data => get('return/reason',data);


/**
 * 获取退货单详情
 */
export const returnDetail = data => get('return/detail',data);


/**
 * 添加退货单
 */
export const returnAdd = data => post('return/add',data);

/**
 * 取消退货单
 */
export const returnCancel = data => post('return/cancel',data);


/**
 * 退货单
 */
export const returnData = data => get('return/data',data);

/**
 * 获取退单详情
 */
export const modifyReturnState = data => get('return/modify_state',data);