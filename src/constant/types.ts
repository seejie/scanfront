export interface AnyObject {
  [propName: string]: any;
}

export interface Api {
  [propsName: string]: (params?: AnyObject) => Promise<any>;
}
