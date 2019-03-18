import {FormArray, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {StringUtils} from './string-utils';
import {MsgUtils} from './msg-utils';

export class PropertyUtils {
  static getValue(key, props) {
    for (const item of Object.entries(props)) {
      if (item[0] === key) {
        if (key === '') {
          return '';
        }
        return item[1];
      }
    }
  }

  static getValueToMap(param, list) {
    for (const item of Array.from(list.entries())) {
      if (item[0] === param) {
        if (param === '') {
          return '';
        }
        return item[1];
      }
    }
  }

  static checkFormValid(checkForm: FormGroup) {
    const formKeyList = FORM_VALIDATE_LIST;
    let result = true;
    if (checkForm.invalid) {
      for (const key of Object.keys(checkForm.controls)) {
        const errors: ValidationErrors = checkForm.get(key).errors;
        if (errors !== null) {
          for (const keyError of Object.keys(errors)) {
            const tempName = this.getValue(key, formKeyList);
            const errorName = StringUtils.isEmpty(tempName) ? key : tempName;
            const errorType = this.getErrorMsgOfType(keyError);
            alert('[' + errorName + '] ' + errorType);
            result = false;
            break;
          }
        }
        if (!result) {
          break;
        }
      }
    }

    return result;
  }

  static replaceTextRule(replaceList: FormArray, orgControlName: string, modControlName?: string) {
    replaceList.controls.map((data) => {
      const formData = data as FormControl;
      const fromTextAreaData = formData.get(orgControlName);
      const toTextAreaData = modControlName === undefined ? formData.get(orgControlName) : formData.get(modControlName);
      if (fromTextAreaData.value) {
        toTextAreaData.setValue(fromTextAreaData.value.replace(/\n/g, '<BR>'));
      }
    });
  }

  static getErrorMsgOfType(errorType?: string, etc?: any) {
    let result = '필수값이 입력되지 않았습니다.';
    // required 이하는 임의로 입력한 값으로 에러 타입을 새로 정의할경우 아래의 예처럼 정의하면 됨
    if (errorType === 'required') {
      result = '필수값이 입력되지 않았습니다.';
    } else if (errorType === 'minLength') {
      result = '최소길이를 ' + etc + '이상으로 입력해야 합니다.';
    } else if (errorType === 'maxLength') {
      result = '최대길이를 ' + etc + '이하로 입력해야 합니다.';
    } else if (errorType === 'number') {
      result = '숫자만 입력해야 합니다.';
    } else if (errorType === 'string') {
      result = '문자만 입력해야 합니다.';
    }
    return result;
  }
}


export const DEFAULT_PAGE_ROW_CNT = 20;

export const USE_YN: { [key: string]: string } = {
  '': '- 선택 -',
  'Y': '사용',
  'N': '미사용'
};

export const USE_YN_ENG: { [key: string]: string } = {
  '': '-',
  'Y': 'Y',
  'N': 'N'
};

export const USE_YN_NOT_DEFAULT: { [key: string]: string } = {
  'Y': '사용',
  'N': '미사용'
};

export const TRANS_RULE: { [key: string]: string } = {
  '': '- 선택 -',
  'M': 'M',
  'T': 'T',
  'F': 'F',
};

export const HOUR_LIST: { [key: string]: string } = {
  '01': '1', '02': '2', '03': '3', '04': '4', '05': '5', '06': '6', '07': '7', '08': '8', '09': '9', '10': '10',
  '11': '11', '12': '12', '13': '13', '14': '14', '15': '15', '16': '16', '17': '17', '18': '18', '19': '19', '20': '20',
  '21': '21', '22': '22', '23': '23', '24': '24',
};

export const DEP_AREA_CD_LIST: { [key: string]: string } = {
  'D': 'A06',
  'I': 'A06',
};

export const ADD_CHANGE_FLAG_CD_LIST: { [key: string]: string } = {
  '': '- 선택 -',
  'A': '추가',
  'M': '변경',
};

export const AGENT_LIST: { [key: string]: string } = {
  '': '- 선택 -',
  'IQ3': '노랑풍선',
  'STD': '토파스표준여행사',
  // 'STA': 'ETC여행사'
};

export const DYNAMO_RES_TYPE_LIST: { [key: string]: string } = {
  '': '- 선택 -',
  'N': 'Normal',
  'C': 'Cache',
};

export const DYNAMO_RES_CODE_LIST: { [key: string]: string } = {
  '': '- 선택 -',
  '200': '정상',
  '400': '에러',
};

export const UPPER_MENU_ID_LIST: { [key: string]: string } = {
  '51': 'Test',
  '39': '시스템관리',
  '16': '운임규정 관리',
  '22': '테스트',
  '45': '패턴관리',
  '28': '자동테스트',
  '33': '통계',
  '37': '로그',
  '6': '기초관리',
};

export const OPEN_CASE_LIST: { [key: string]: string } = {
  'Y': 'Y',
  'N': 'N'
};

export const TEST_VERSION_LIST: { [key: string]: string } = {
  '': '- 선택 -',
  'N': '현재버전',
  'Y': '배포버전'
};

export const RQ_FLAG_CD_LIST: { [key: string]: string } = {
  '': '- 선택 -',
  'MP': 'MP',
  'PNR': 'PNR'
};

export const PRICE_TYPE_LIST: { [key: string]: string } = {
  '': '- 선택 -',
  'RP': 'RP',
  'RU': 'RU',
  'RW': 'RW'
};

export const AIR_CD_LIST: string[] = [ '2B', '2D', '2H', '2I', '2J', '2K', '2L', '2N', '2P', '2U', '2V', '2Z', '3G', '3H', '3K', '3L',
  '3M', '3O', '3P', '3S', '3U', '3Y', '4B', '4C', '4D', '4I', '4M', '4Q', '4T', '4U', '4X', '5H', '5J', '5N', '5O', '5Q', '5T', '5W',
  '6H', '6I', '7C', '7F', '7I', '7J', '7R', '7T', '7V', '7W', '8F', '8H', '8I', '8M', '8P', '8Q', '8R', '8U', '9B', '9D', '9F', '9K',
  '9N', '9U', '9V', '9W', 'A2', 'A3', 'A5', 'A9', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AH', 'AI', 'AK', 'AM', 'AN', 'AP', 'AR', 'AS',
  'AT', 'AU', 'AV', 'AY', 'AZ', 'B0', 'B2', 'B5', 'B6', 'B7', 'B8', 'BA', 'BB', 'BD', 'BE', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BP',
  'BR', 'BT', 'BU', 'BV', 'BW', 'C2', 'CA', 'CE', 'CF', 'CG', 'CI', 'CJ', 'CM', 'CN', 'CO', 'CT', 'CU', 'CW', 'CX', 'CZ', 'D2', 'D6',
  'D7', 'D8', 'DB', 'DC', 'DE', 'DG', 'DK', 'DL', 'DN', 'DT', 'DV', 'DX', 'DY', 'E7', 'EB', 'EC', 'EI', 'EK', 'EL', 'EN', 'EQ', 'ET',
  'EW', 'EY', 'F7', 'F9', 'FB', 'FC', 'FD', 'FI', 'FJ', 'FL', 'FM', 'FQ', 'FR', 'FS', 'FV', 'FZ', 'G3', 'GA', 'GE', 'GF', 'GK', 'GL',
  'GR', 'GU', 'H1', 'H2', 'HA', 'HF', 'HG', 'HK', 'HM', 'HO', 'HQ', 'HR', 'HS', 'HU', 'HV', 'HX', 'HY', 'HZ', 'I2', 'I5', 'I9', 'IB',
  'IE', 'IG', 'IR', 'IY', 'IZ', 'J2', 'JA', 'JD', 'JF', 'JJ', 'JK', 'JL', 'JN', 'JP', 'JQ', 'JU', 'JV', 'JY', 'K2', 'K5', 'K6', 'KA',
  'KC', 'KE', 'KF', 'KK', 'KL', 'KM', 'KO', 'KP', 'KQ', 'KR', 'KS', 'KU', 'KW', 'KX', 'L6', 'L8', 'LA', 'LC', 'LF', 'LG', 'LH', 'LI',
  'LJ', 'LN', 'LO', 'LP', 'LR', 'LS', 'LT', 'LW', 'LX', 'LY', 'M9', 'MA', 'MD', 'ME', 'MF', 'MH', 'MI', 'MJ', 'MK', 'ML', 'MN', 'MO',
  'MR', 'MS', 'MT', 'MU', 'MW', 'MX', 'MY', 'NF', 'NH', 'NK', 'NN', 'NP', 'NT', 'NU', 'NX', 'NY', 'NZ', 'O6', 'O8', 'OA', 'OB', 'OD',
  'OK', 'OM', 'OR', 'OS', 'OT', 'OU', 'OV', 'OY', 'OZ', 'P0', 'P1', 'P5', 'P9', 'PA', 'PB', 'PC', 'PD', 'PE', 'PG', 'PH', 'PJ', 'PQ',
  'PR', 'PS', 'PU', 'PW', 'PX', 'PY', 'PZ', 'Q8', 'QC', 'QF', 'QH', 'QI', 'QN', 'QR', 'QS', 'QU', 'QV', 'QZ', 'R2', 'R3', 'R7', 'RA',
  'RB', 'RC', 'RG', 'RI', 'RJ', 'RO', 'RQ', 'S2', 'S3', 'S4', 'S7', 'S9', 'SA', 'SB', 'SC', 'SD', 'SE', 'SI', 'SK', 'SN', 'SP', 'SQ',
  'SS', 'ST', 'SU', 'SV', 'SW', 'SX', 'SY', 'SZ', 'T0', 'T3', 'T7', 'TA', 'TB', 'TD', 'TF', 'TG', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO',
  'TP', 'TR', 'TS', 'TT', 'TU', 'TW', 'TX', 'TZ', 'U2', 'U6', 'UA', 'UC', 'UD', 'UG', 'UH', 'UJ', 'UK', 'UL', 'UM', 'UN', 'UO', 'UP',
  'US', 'UT', 'UU', 'UX', 'UY', 'V0', 'V3', 'V7', 'VA', 'VE', 'VF', 'VJ', 'VN', 'VO', 'VR', 'VS', 'VT', 'VV', 'VW', 'VX', 'VY', 'W2',
  'W3', 'W4', 'W5', 'W9', 'WA', 'WB', 'WF', 'WG', 'WH', 'WJ', 'WM', 'WN', 'WP', 'WS', 'WW', 'WX', 'WY', 'X3', 'X6', 'XG', 'XJ', 'XK',
  'XL', 'XM', 'XQ', 'XX', 'XY', 'XZ', 'Y7', 'YC', 'YE', 'YK', 'YM', 'YO', 'YQ', 'YS', 'YV', 'Z2', 'Z4', 'Z5', 'Z6', 'Z8', 'Z9', 'ZC',
  'ZE', 'ZG', 'ZH', 'ZI', 'ZK', 'ZL', 'ZM'
];

export const FORM_VALIDATE_LIST: { [key: string]: string } = {
  'addChangeFlagCd' : '추가/수정',
  'agentCd' : '여행사',
  'agtCd' : '여행사',
  'airCd' : '항공사',
  'airCds' : '항공사',
  'analysisPatrn' : '분석패턴',
  'analysisRqContent' : '분석요청사항',
  'apiTransactionKey' : '트렌젝션키',
  'applyYn' : '적용여부',
  'arrAreaCd' : '도착지',
  'oid' : 'OID',
  'authOid' : 'OID',
  'basisPatrn' : '기초패턴',
  'basisPatrnNm' : '패턴명',
  // 'basisTransRuleSeqNo' : '패턴No',
  'basisTransRuleSeqNo' : '기초패턴',
  'categoryCd' : '카테고리',
  'chgInfo' : '변경정보메모',
  'ctgryCd' : '카테고리',
  'depAreaCd' : '출발지',
  'depFlagCd' : '출발구분',
  'deployNo' : '배포번호',
  'engRule' : '영문규정',
  'fareClass' : '운임클래스',
  'fareInfo' : '운임정보',
  'fareRuleSample' : '원문샘플',
  'fareType' : '운임구분',
  'ftcCd' : 'FTC코드',
  'ignorePatrn' : '제외된패턴',
  'itemCd' : '항목명',
  'itemNm' : '항목명',
  'itinInfo' : '여정정보',
  'korRule' : '한글규정',
  'origincontent' : '영문규정',
  'patrnFlagCd' : '패턴구분',
  'paxCd' : 'PTC',
  'paxInfo' : '탑승객정보',
  'ptcCd' : 'PTC코드',
  'pnr' : 'PNR',
  'priceType' : '요금타입',
  'priortSn' : '우선순위',
  'progrsStatusCd' : '진행상태',
  'regDtm' : '발생일',
  'regexppatrnseq' : '변환Rule',
  'reglrPatrn' : '정규패턴',
  'regUsrId' : '등록자',
  'remark' : '비고',
  'rqFlagCd' : '의뢰구분',
  'ruleNbr' : 'RuleNBR',
  'sortOrder' : '정렬순서',
  'tariffNo' : 'TariffNO',
  'textRule' : '비고',
  'title' : '항목명',
  'transCd' : '번역코드',
  'transContent' : '번역내용',
  'transErrDetailSeqNo' : '번역패턴번호',
  'transErrSeqNo' : 'transErrSeqNo',
  'transKorNm' : '번역한글명',
  'translateRuleSeqNo' : 'RuleNo.',
  'translatRuleNo' : '변환Rule',
  'transRate' : '번역비율',
  'transResult' : '번역결과',
  'transrule' : '한글규정',
  'useYn' : '사용여부',
};
