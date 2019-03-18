import {PropertyUtils} from './property-utils';
import {StringUtils} from './string-utils';

// export declare type ScmDomain = 'product' | 'category';
// export declare type ActionMode =  'create' | 'read' | 'edit';

export class MsgUtils {

  constructor() { }

  static getCommonMsg(code?: any, ynSuccess?: boolean, msgType?: string, etc?: string) {
    let result = '';
    let msgList: any;
    let codeAppend = '';

    // code값이 없을경우 기본 메시지 출력
    if (StringUtils.isEmpty(code)) {
      result = '정상처리 되지 않았습니다.';
    } else {
      if (msgType === 'http') {
        // http 코드 지정시 성공실패 상관없이 http 코드로 처리
        msgList = HTTP_CODE_LIST;
        codeAppend =  '(' + code + ')';
      } else if (ynSuccess) {
        // 성공 method로 메시지 핸들링
        msgList = SUCCESS_CODE_LIST_METHOD;
      } else {
        // 실패 method로 메시지 핸들링
        msgList = ERROR_CODE_LIST_METHOD;
      }
      const tempResult = PropertyUtils.getValue(code, msgList);
      result = StringUtils.isEmpty(tempResult) ? result : tempResult + codeAppend;
    }

    result = StringUtils.isEmpty(result) ? '정상처리 되지 않았습니다.' : result;

    return result;
  }

  static success(cnt?: number, action?: string): string {
    let result: string;
    if (cnt === undefined && action === undefined ) {
        result = '정상적으로 처리되었습니다.';
    } else {
        result = `${cnt}건이 ${action} 되었습니다.`;
    }
    return result;
  }

  static getSaveErrMsg() {
    return ( error => {
      console.log(error);
      if (error.status === 409) {
        alert(this.save_dupe());
      } else {
        alert(this.error());
      }
    });
  }

  // 서버에서 returnCd, returnMsg, returnMsgDetail 형식의 결과 값을 가져와 alert을 띄울때 사용.
  static getReturnMsg(res) {
    let returnMsgDetail = res.returnMsgDetail ? res.returnMsgDetail : '';
    if (res.returnCd === '500') {
      returnMsgDetail = returnMsgDetail ? '\n' + returnMsgDetail.split(':')[returnMsgDetail.split(':').length - 1].replace(/(\.\s)/g, '.\n') : '';
      const apitransactionkey = res.apitransactionkey ? res.apitransactionkey : '';
      // alert(this.noDataFound() + returnMsgDetail + apitransactionkey);
      prompt(this.noDataFound() + returnMsgDetail, apitransactionkey);
    } else { // 정의하지 않은 코드에 대해서는 '조회된 결과가 존재하지 않습니다.' 노출
      alert(this.noDataFound());
    }
  }

  static error(errorMsg?: string): string {
    let result: string;
    result = '정상적으로 처리되지 않았습니다.';
    if (errorMsg !== undefined) {
        result = result + errorMsg;
    }
    return result;
  }

  static selectItem(action: string) {
    let result: string;
    result = `${action}할 데이터(행)를 선택해 주세요`;
    return result;
  }

  static logout() {
    return '로그인 되지 않았거나 세션이 종료되었습니다.';
  }

  static login_error() {
    return '로그인에 실패하였습니다. 사용자 ID/비밀번호를 확인하세요';
  }

  static required(requiredItem: string) {
    let result: string;
    result = `${requiredItem}을 입력하세요.`;
    return result;
  }

  static auth_error() {
    return '권한이 불충분합니다.';
  }

  static auth_expired() {
    return '로그인 시간이 만료되어 로그인페이지로 이동합니다.';
  }

  static no_info(info: string) {
    return info + '정보가 없습니다.';
  }

  static not_select() {
    return '선택된 내용이 없습니다.';
  }

  static save_dupe() {
    return '데이터가 중복되었습니다.';
  }

  static can_not_modify() {
    return '수정할 수 없습니다.';
  }

  static menu_error() {
    return '메뉴 불러오기에 실패했습니다.';
  }

  static confirm_item_reset() {
    return '해당 항목을 초기화 하시겠습니까? 토파스에서 지정한 항목으로 초기화 됩니다.';
  }

  static confirm_delete(deleteDataCount?: number) {
    let result: string;
    result = '데이터를 삭제 하시겠습니까?';
    if (deleteDataCount !== undefined) {
        result = deleteDataCount + '건의 ' + result;
    }
    return result;
  }

  static confirm_logout() {
      return '로그아웃 하시겠습니까?';
  }

  static copy_error() {
      return '복사할 데이터(행)를 선택하여 주세요.';
  }

  static noDataFound() {
      return '조회된 결과가 존재하지 않습니다.';
  }

}

export const HTTP_CODE_LIST: { [key: string]: string } = {
  '200': '정상처리되었습니다.',
  '400': '잘못된 요청입니다.',
  '401': '인증되지 않은 요청입니다.',
  '403': '권한이 없습니다.',
  '404': '요청을 처리할 수 없습니다.',
  '408': '요청시간이 초과되었습니다.',
  '500': '서버에 오류가 발생했습니다.',
  '501': '서버에서 해당 기능을 수행할 수 없습니다.',
  '502': '네트워크에 문제가 있습니다.',
};

export const ERROR_CODE_LIST_METHOD: { [key: string]: string } = {
  'put': '수정되지 않았습니다.',
  'save': '저장되지 않았습니다.',
  'post': '입력되지 않았습니다.',
  'delete': '삭제되지 않았습니다.',
  'get': '조회에 실패했습니다.',
  'excel': '엑셀 생성에 실패했습니다.',
};

export const SUCCESS_CODE_LIST_METHOD: { [key: string]: string } = {
  'put': '수정 되었습니다.',
  'save': '저장 되었습니다.',
  'post': '입력 되었습니다.',
  'delete': '삭제 되었습니다.',
  'get': '조회 되었습니다.',
  'excel': '엑셀이 생성되었습니다.',
};
