const state = () => ({
  MARITAL_STATUS: [
    // 婚姻情况
    { label: 'scheme.marital.single', value: 'S' }, // 单身
    { label: 'scheme.marital.married', value: 'M' }, // 结婚
    { label: 'scheme.marital.divorce', value: 'D' }, // 离婚
    { label: 'scheme.marital.window', value: 'W' }, // 单亲
    { label: 'scheme.marital.collaboration', value: 'P' }, // 合作
    { label: 'scheme.marital.farewell', value: 'L' }, // 分手
  ],
  EDUCATION_DEGREE_LIST: [
    // 教育情况
    { label: 'scheme.education.primary', value: 'A' }, // 小学
    { label: 'scheme.education.middle', value: 'B' }, // 中学
    { label: 'scheme.education.college', value: 'D' }, // 大学
    { label: 'scheme.education.master', value: 'F' }, // 硕士
    { label: 'scheme.education.none', value: 'N' }, // 文盲
  ],
  RELIGIONS: [
    // 宗教
    { label: 'scheme.religious.christian', value: 'C' }, // 基督教
    { label: 'scheme.religious.islam', value: 'I' }, // 伊斯兰
    { label: 'scheme.religious.other', value: 'O' }, // 其他
  ],
  WORK_STATUS: [
    // 工作状态
    { label: 'scheme.work.A', value: 'A' }, // 家庭主妇
    { label: 'scheme.work.B', value: 'B' }, // 学生
    { label: 'scheme.work.C', value: 'C' }, // 临时员工
    { label: 'scheme.work.D', value: 'D' }, // 小贩
    { label: 'scheme.work.E', value: 'E' }, // 农业部门雇员
    { label: 'scheme.work.F', value: 'F' }, // 固定（公共）合同
    { label: 'scheme.work.G', value: 'G' }, // 临时（公共）合同
    { label: 'scheme.work.H', value: 'H' }, // 固定（私人）合同
    { label: 'scheme.work.I', value: 'I' }, // 临时合同（私人）
    { label: 'scheme.work.J', value: 'J' }, // 自主的
    { label: 'scheme.work.K', value: 'K' }, // 预退休的
    { label: 'scheme.work.L', value: 'L' }, // 退休的
    { label: 'scheme.work.M', value: 'M' }, // 养老金领取者
    { label: 'scheme.work.N', value: 'N' }, // 失业津贴
    { label: 'scheme.work.O', value: 'O' }, // 失业无津贴
  ],
  PAY_PERIOD: [
    // 发薪周期
    { label: 'scheme.pay_period.fortnightly', value: 'fortnightly' },
    { label: 'scheme.pay_period.monthly', value: 'monthly' },
    { label: 'scheme.pay_period.weekly', value: 'weekly' },
    { label: 'scheme.pay_period.other', value: 'other' },
  ],
  MONTHLY_INCOME: [
    // 收入范围 具体见翻译
    { label: 'scheme.income.A', value: 'A' },
    { label: 'scheme.income.B', value: 'B' },
    { label: 'scheme.income.C', value: 'C' },
    { label: 'scheme.income.D', value: 'D' },
    { label: 'scheme.income.E', value: 'E' },
    { label: 'scheme.income.F', value: 'F' },
  ],
  LOAN_STATUS: [
    { label: 'loanStatu.-2', value: -2 },
    { label: 'loanStatu.-1', value: -1 },
    { label: 'loanStatu.0', value: 0 },
    { label: 'loanStatu.1', value: 1 },
    { label: 'loanStatu.1001', value: 1001 },
    { label: 'loanStatu.1002', value: 1002 },
    { label: 'loanStatu.1004', value: 1004 },
    { label: 'loanStatu.2001', value: 2001 },
    { label: 'loanStatu.2002', value: 2002 },
    { label: 'loanStatu.2003', value: 2003 },
    { label: 'loanStatu.2004', value: 2004 },
    { label: 'loanStatu.3001', value: 3001 },
    { label: 'loanStatu.3002', value: 3002 },
    { label: 'loanStatu.3003', value: 3003 },
    { label: 'loanStatu.4001', value: 4001 },
    { label: 'loanStatu.1007', value: 1007 },
    { label: 'loanStatu.3001_1', value: 3010 },
  ],
});
export default {
  namespaced: true,
  state,
};
