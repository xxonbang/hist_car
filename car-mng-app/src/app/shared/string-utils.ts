import { ArtLogger } from './artLogger';

// export declare type ScmDomain = 'product' | 'category';
// export declare type ActionMode =  'create' | 'read' | 'edit';

export class StringUtils {

  constructor() { }

  static makeQueryString(params: any): string {
    let result = '';
    let prefix = '?';


    const keys = Object.keys(params);
    const values = Object.values(params);
    if (keys !== null && keys.length > 0) {
      // tslint:disable-next-line:forin
      for (const idx in keys) {
        result = result + prefix + keys[idx] + '=' + values[idx];
        prefix = '&';
      }
    }
    return result;
  }

  static appendQueryString(params: any): string {
    let result = '';
    const prefix = '&';

    const keys = Object.keys(params);
    const values = Object.values(params);
    if (keys !== null && keys.length > 0) {
      // tslint:disable-next-line:forin
      for (const idx in keys) {
        result = result + prefix + keys[idx] + '=' + values[idx];
      }
    }
    return result;
  }

  static jsonToMap(data: any, ynSelect?: boolean): any {
    const mapData = new Map();
    if (ynSelect) {
      mapData.set('', '- 선택 -');
    }
    if (data !== null && data !== undefined) {
      Object.keys(data).forEach(key => {
        mapData.set(data[key].selectKey, data[key].selectValue);
      });
    }
    return mapData;
  }

  static isEmpty(data: any): boolean {
    let result = false;
    if (data === undefined || data === '' || data === null) {
      result = true;
    }
    return result;
  }



}
