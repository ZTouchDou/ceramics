export default {
  fontName:'方正楷体',
  pageSize:10,
  reg: {
    required: {
      required: true,
      message: '必填'
    },
    phone: {
      pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
      message: '请填写正确的手机号码'
    },
    positiveInteger: {
      pattern: /^[1-9]\d*$/,
      message: '请填写正整数'
    },
    integer: {
      pattern: /^[0-9]\d*$/,
      message: '请填写非负整数'
    },
    price: {
      pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
      message: '请填写正确的钱数'
    },
    long: {
      pattern: /^(-?\d+)(\.\d+)?$/,
      message: '请填写正确的数值'
    },
    space: {
      pattern: /^\S*$/,
      message: '请勿输入空格'
    },
    lengthMax: {
      max: 200,
      message: '超出最大字数限制'
    },
    absLong: {
      pattern: /^(\d+)(\.\d+)?$/,
      message: '请填写大于等于的0的数字'
    },
    long1: {
      pattern: /(^[1-9]\d*(\.\d{0,1})?$)|(^0(\.\d{0,1})?$)/,
      message: '保留一位小数'
    },
    long2: {
      pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
      message: '保留两位小数'
    },
    date: {
      pattern: /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
      message: '日期格式应为：2018-01-01'
    },
    coordinates: {
      pattern: /^(\-|\+)?\d+(\.\d+)?(,(\-|\+)?\d+(\.\d+)?)$/,
      message: '格式错误,例:‘经度’,‘纬度’'
    },
    email:{
      pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      message: '请填写正确的邮箱'
    }
  },

  poxzy:{
    url:'http://192.168.56.1:8080',
    imgUrl:'http://116.62.152.234:88/',
    uploadUrl:'http://192.168.56.1:8080',
  }
}