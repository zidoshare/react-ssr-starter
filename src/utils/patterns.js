/**
 * description
 * <p>fill description</p>
 * @author zido
 * @since 2017/6/12 0012
 */
export default {
  phoneNumber:/^1([34578])\d{9}$/,
  justChinese:/^[\u4e00-\u9fa5]*$/,
  email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  idCard:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
}