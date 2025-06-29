import requestServer from '../workers/requestServer';
import {BASE_URL, METHODS} from '../constants/API_constants';
import requestServerMultiPart from '../workers/requestServermultipart';

const req_login = 'api/login';
const req_my_profile = 'api/my_profile';
const req_check_report_password = 'api/check_report_password';
const req_change_password = 'api/change_password';
const req_printer_sizes = 'api/printer_sizes';
const req_edit_profile = 'api/edit_profile';
const req_dashboard = 'api/dashboard';
const req_product_based_report = 'api/product_based_report';
const req_sales_based_report = 'api/sales_based_report';
const req_order_list = 'api/order_list';
const req_stock_category = 'api/stock_category';
const req_category_status_update = 'api/category_status_update';
const req_add_category = 'api/add_category';
const req_edit_category = 'api/edit_category';
const req_delete_category = 'api/delete_category';
const req_all_sub_category = 'api/all_sub_category';
const req_add_sub_category = 'api/add_sub_category';
const req_subcategory_status_update = 'api/subcategory_status_update';
const req_edit_sub_category = 'api/edit_sub_category';
const req_delete_sub_category = 'api/delete_sub_category';
const req_items_get_all_category='api/items_get_all_category'
const req_category_all_sub_category='api/category_all_sub_category'
const req_get_all_product='api/get_all_product'
const req_add_product='api/add_product'
const req_single_product_detail='api/single_product_detail'
const req_category_sub_category='api/category_sub_category'
const req_edit_product='api/edit_product'
const req_delete_product='api/delete_product'
const req_product_status_update='api/product_status_update'
const req_low_stock_list='api/low_stock_list'
const req_update_stock_product='api/update_stock_product'
const req_get_stock_product='api/get_stock_product'
const req_inventry_search_product='api/inventry_search_product'
const req_stock_search_product='api/stock_search_product'
const req_get_category='api/get_category'
const req_get_sub_category='api/get_sub_category'
const req_get_pos_product='api/get_pos_product'
const req_Unit = 'api/unit';
const req_add_unit = 'api/add_unit';
const req_edit_unit = 'api/edit_unit';

//OnlY POST
//Get query keyx

//login
export const getLoginremote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_login,
      payload,
    );
    return response.status === 200
      ? response?.data?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getCheckReportPasswordremote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_check_report_password,
      payload,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getPrinterListremote = async () => {
  try {
    const response = await requestServer(
      METHODS.GET,
      BASE_URL + req_printer_sizes,
      // payload,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};

// profile
export const getChangePasswordremote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_change_password,
      payload,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getMyProfileremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_my_profile,
      // {status:params.queryKey[1]},
      params,
    );
    return response.status === 200
      ? response?.data?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getEditProfileremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_edit_profile,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};

//category
export const getCategoryremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_stock_category,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getPOSGetCategoryemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_category,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getAddCategoryremote = async (params: any) => {
  try {
    const response = await requestServerMultiPart(
      METHODS.POST,
      BASE_URL + req_add_category,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    console.log("errerrerr",err)
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getEditCategoryremote = async (params: any) => {
  try {
    const response = await requestServerMultiPart(
      METHODS.POST,
      BASE_URL + req_edit_category,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getEditUnitremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_edit_unit,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getDeleteCategoryremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_delete_category,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getCategoryStatusremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_category_status_update,
      params,
    );
    return response.status === 200
      ? response
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};

//subCategory
export const getSubCategoryremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_all_sub_category,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};

export const getSubCategoryAddremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_add_sub_category,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getEditSubCategoryremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_edit_sub_category,
      params,
    );
    console.log('response', response);
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getDeleteSubCategoryremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_delete_sub_category,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getSubCategoryStatusremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_subcategory_status_update,
      params,
    );
    return response.status === 200
      ? response
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};

//report
export const getProductBasedremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_product_based_report,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getSalesBasedremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_sales_based_report,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getOrderListremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_order_list,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getReportemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_dashboard,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};


export const getItemsallCategoryremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_items_get_all_category,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getSingleProductremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_single_product_detail,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getCategorySubCatergoryremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_category_sub_category,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getAddProductremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_add_product,
      params,
    );
    console?.log("responseresponse",response)
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    console.log("errrrrrrrrrr",err);
    
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getEditProductremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_edit_product,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};

export const getDeleteProductremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_delete_product,
      params,
    );
    console.log("response",response)
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getProductStatusremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_product_status_update,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getItemsallSubCategoryremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_category_all_sub_category,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getPOSSubCategoryremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_sub_category,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};

export const getAllProductremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_all_product,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};

export const getPOSProductremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_pos_product,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getUnitremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_Unit,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getAddUnitremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_add_unit,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getLowStockListremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_low_stock_list,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getUpdateStockProductremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_update_stock_product,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getStockProductremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_get_stock_product,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getInventrySearchProductremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_inventry_search_product,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
export const getStockSearchProductremote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_stock_search_product,
      params,
    );
    return response.status === 200
      ? response?.data
      : failedLog('getLoginremote()', response);
  } catch (err) {
    return {
      status: false,
      statusCode: err?.statusCode,
      res: err?.data,
    };
  }
};
const failedLog = (functionname: string, response: any) => {
  console.log(
    `\x1b[35m  Request ${functionname} : ${JSON.stringify(response)} \x1b[0m`,
  );
  throw response;
};
