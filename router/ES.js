module.exports = (resolve) => [
  {
    path: '/',
    name: 'Index',
    component: resolve('index.vue'),
    redirect: '/outside',
    children: [
      {
        path: 'outside',
        name: 'Outside',
        component: resolve('pc-loan/outside/index.vue'),
        redirect: 'outside/next',
        children: [
          {
            path: 'next',
            name: 'OutsideNext',
            component: resolve('pc-loan/outside/next/index.vue'),
            meta: {
              eventName: 'web_registerlogin_open',
              gaBackName: '',
              redirect: '/sys/index',
            },
          },
          {
            path: 'login', // 账号密码登录
            name: 'OutsideLogin',
            component: resolve('pc-loan/outside/login/index.vue'),
            meta: {
              gaBackName: '',
            },
          },
          {
            path: 'login2', // 短信验证码登录
            name: 'OutsideLogin2',
            component: resolve('pc-loan/outside/login2/index.vue'),
            meta: {
              gaBackName: '',
            },
          },
          {
            path: 'sms', // 注册页短信验证码提前校验
            name: 'OutsideSms',
            component: resolve('pc-loan/outside/sms/index.vue'),
            meta: {
              title: '',
              required: true,
              eventName: 'web_register_open1',
              gaBackName: '',
            },
          },
          {
            path: 'register',
            name: 'OutsideRegister',
            component: resolve('pc-loan/outside/register/index.vue'),
            meta: {
              title: '',
              required: true,
              eventName: 'web_register_open2',
              gaBackName: '',
            },
          },
          {
            path: 'forget',
            name: 'OutsideForget',
            component: resolve('pc-loan/outside/forget/index.vue'),
            meta: {
              title: '',
              required: true,
              gaBackName: '',
            },
          },
          {
            path: 'invite',
            name: 'OutsideInvite',
            component: resolve('pc-loan/outside/invite/index.vue'),
            meta: {
              title: 'Invitar a amigos',
              required: true,
              gaBackName: '',
            },
          },
          {
            path: 'invite-register',
            name: 'OutsideInviteRegister',
            component: resolve('pc-loan/outside/invite-register/Index.vue'),
            meta: {
              title: 'Regístrate ahora',
              required: true,
              gaBackName: '',
            },
          },
        ],
      },
      {
        path: 'sys',
        name: 'PcHome',
        component: resolve('pc-loan/system/index.vue'),
        redirect: 'sys/index',
        children: [
          {
            path: 'index',
            name: 'SysIndex',
            component: resolve('pc-loan/system/home/index.vue'),
            meta: {
              title: 'Página delantera',
              hideBack: true,
              required: true,
              eventName: 'web_myloanpage',
              gaBackName: '',
            },
          },
          {
            path: 'user',
            name: 'SysUser',
            component: resolve('pc-loan/system/user/index.vue'),
            children: [
              {
                path: 'my',
                name: 'UserMy',
                component: resolve('pc-loan/system/user/my/index.vue'),
                meta: {
                  title: 'Mi perfil',
                  notShowBtn: true,
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'info',
                name: 'UserInfo',
                component: resolve('pc-loan/system/user/info/index.vue'),
                meta: {
                  title: 'Revisar el perfil de solicitud',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/user/my' },
                    {
                      title: 'Revisar el perfil de solicitud',
                      to: '/user/info',
                    },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'modify',
                name: 'UserModify',
                component: resolve('pc-loan/system/user/modify/index.vue'),
                meta: {
                  title: 'Solicitud de préstamos',
                  tabs: [
                    {
                      title: 'Solicitud de préstamo',
                      path: '/sys/user/modify',
                    },
                    {
                      title: 'Identificación',
                      path: '/sys/bank/preview',
                    },
                  ],
                  required: true,
                  eventName: 'web_basic_info_open',
                  gaBackName: '',
                },
              },
              {
                path: 'coupon',
                name: 'Coupon',
                component: resolve('pc-loan/system/user/coupon/Index.vue'),
                meta: {
                  title: 'Coupons',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/sys/user/my' },
                    { title: 'Coupons', to: '/sys/user/coupon' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
            ],
          },
          {
            path: 'bank',
            name: 'SysBank',
            component: resolve('pc-loan/system/bank/index.vue'),
            children: [
              {
                path: 'preview',
                name: 'SysBankPre',
                component: resolve('pc-loan/system/bank/preview/index.vue'),
                meta: {
                  title: 'Identificación',
                  tabs: [
                    {
                      title: 'Solicitud de préstamo',
                      path: '/sys/user/modify',
                    },
                    {
                      title: 'Identificación',
                      path: '/sys/bank/preview',
                    },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'thirdParty',
                name: 'SysThirdParty',
                component: resolve(
                  'pc-loan/system/bank/preview/ThirdParty.vue'
                ),
                meta: {
                  title: 'Identificación',
                  customEvent: 'thirdParty',
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'bind', // 绑定账户
                name: 'SysBankBind',
                component: resolve('pc-loan/system/bank/bind/index.vue'),
                meta: {
                  title: 'Cuenta bancaria',
                  tabs: [
                    {
                      title: 'Cuenta bancaria',
                      path: '/sys/bank/bind',
                    },
                    {
                      title: 'Identificación',
                      path: '/sys/bank/preview',
                    },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'account',
                name: 'SysBankAccount',
                component: resolve('pc-loan/system/bank/account/index.vue'),
                meta: {
                  title: 'Mi cuenta bancaria',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/sys/user/my' },
                    { title: 'Mi cuenta bancaria', to: '/sys/bank/account' },
                  ],
                  required: true,
                  eventName: 'web_bank_info_open',
                  gaBackName: 'web_bank_info_back',
                },
              },
              {
                path: 'bind-result',
                name: 'SysBindBankResult',
                component: resolve(
                  'pc-loan/system/bank/bind-callback/Index.vue'
                ),
                meta: {
                  title: 'Tarjeta bancaria',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/sys/user/my' },
                    { title: 'Tarjeta bancaria', to: '/sys/bank/bind-result' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'bind-result/:name',
                name: 'SysBindBankResultByWay',
                component: resolve(
                  'pc-loan/system/bank/bind-callback/Index.vue'
                ),
                meta: {
                  title: 'Tarjeta bancaria',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Métodos de pago', to: '/sys/loan/repay-method' },
                    { title: 'Tarjeta bancaria', to: '/sys/bank/bind-result' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
            ],
          },
          {
            path: 'log',
            name: 'SysLog',
            component: resolve('pc-loan/system/log/index.vue'),
            children: [
              {
                path: 'loan',
                name: 'SysLogLoan',
                component: resolve('pc-loan/system/log/loan/index.vue'),
                meta: {
                  title: 'Historial de préstamo',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/sys/user/my' },
                    { title: 'Historial de préstamo', to: '/sys/log/loan' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'transaction',
                name: 'SysLogTransaction',
                component: resolve('pc-loan/system/log/transaction/index.vue'),
                meta: {
                  title: 'Movimiento',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/sys/user/my' },
                    { title: 'Movimiento', to: '/sys/log/transaction' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'detail',
                name: 'SysLogDetail',
                component: resolve('pc-loan/system/log/detail/index.vue'),
                meta: {
                  title: 'Detalles',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/sys/user/my' },
                    { title: 'Historial de préstamo', to: '/sys/log/loan' },
                    { title: 'Detalles', to: '/sys/log/detail' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'detail/:name',
                name: 'SysTransitionDetail',
                component: resolve('pc-loan/system/log/detail/index.vue'),
                meta: {
                  title: 'Detalles',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/sys/user/my' },
                    { title: 'Movimiento', to: '/sys/log/transaction' },
                    { title: 'Detalles', to: '/sys/log/detail/tran' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
            ],
          },
          {
            path: 'loan',
            name: 'SysLoan',
            component: resolve('pc-loan/system/loan/index.vue'),
            children: [
              {
                path: 'sure',
                name: 'SysLoanSure',
                component: resolve('pc-loan/system/loan/sure/index.vue'),
                meta: {
                  title: 'Resultado de crédito',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Resultado de crédito', to: '/sys/loan/presale' },
                    { title: 'Resultado de crédito', to: '/sys/loan/sure' },
                  ],
                  required: true,
                  eventName: 'web_confirm_loan_open',
                  gaBackName: 'web_confirm_loan_back',
                },
              },
              {
                path: 'contract',
                name: 'SysContract',
                component: resolve('pc-loan/system/loan/contract/Index.vue'),
                meta: {
                  title: 'Acuerdo de préstamo',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Resultado de crédito', to: '/sys/loan/presale' },
                    { title: 'Resultado de crédito', to: '/sys/loan/sure' },
                    { title: 'Acuerdo de préstamo', to: '/sys/loan/contract' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'repay',
                name: 'SysLoanRepay',
                component: resolve('pc-loan/system/loan/repay/index.vue'),
                meta: {
                  title: 'Pagar mi préstamo',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Pagar mi préstamo', to: '/sys/loan/repay' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'extension-period',
                name: 'SysLoanExtensionPeriod',
                component: resolve(
                  'pc-loan/system/loan/extension-period/Index.vue'
                ),
                meta: {
                  title: 'Pedir una Prórroga',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Pagar mi préstamo', to: '/sys/loan/repay' },
                    {
                      title: 'Pedir una Prórroga',
                      to: '/sys/loan/extension-period',
                    },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'repay-method',
                name: 'SysLoanRepayMethod',
                component: resolve(
                  'pc-loan/system/loan/repay-method/index.vue'
                ),
                meta: {
                  title: 'Métodos de pago',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Pagar mi préstamo', to: '/sys/loan/repay' },
                    { title: 'Métodos de pago', to: '/sys/loan/repay-method' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'wait60',
                name: 'SysLoanWait60',
                component: resolve('pc-loan/system/loan/wait-60/index.vue'),
                meta: {
                  title: 'Account Cancellation',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/sys/user/my' },
                    {
                      title: 'Revisar el perfil de solicitud',
                      to: '/sys/user/info',
                    },
                    { title: 'Account Cancellation', to: '/sys/loan/wait60' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'precredit',
                name: 'SysLoanPrecredit',
                component: resolve('pc-loan/system/loan/pre-credit/index.vue'),
                meta: {
                  title: 'Resultados de la auditoria',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    {
                      title: 'Resultados de la auditoria',
                      to: '/sys/loan/precredit',
                    },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'presale',
                name: 'SysLoanPresale',
                component: resolve('pc-loan/system/loan/pre-sale/index.vue'),
                meta: {
                  title: 'Resultado de crédito',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Resultado de crédito', to: '/sys/loan/presale' },
                  ],
                  required: true,
                  eventName: 'web_credit_result_open',
                  gaBackName: 'web_credit_result_back',
                },
              },
              {
                path: 'agreement',
                name: 'Agreement',
                component: resolve('pc-loan/system/loan/agreement/Index.vue'),
                meta: {
                  title: 'Loan Agreement',
                  required: true,
                  gaBackName: '',
                },
              },
            ],
          },
          {
            path: 'message',
            name: 'SysMessage',
            component: resolve('pc-loan/system/message/index.vue'),
            children: [
              {
                path: 'wait-apply', // 信审结果页
                name: 'SysMessageWaitApply',
                component: resolve(
                  'pc-loan/system/message/wait-apply/index.vue'
                ),
                meta: {
                  title: 'Resultados de la auditoria',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Resultado de crédito', to: '/sys/loan/presale' },
                    {
                      title: 'Resultados de la auditoria',
                      to: '/sys/message/wait-apply',
                    },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'wait-pay', // 还款处理中
                name: 'SysMessageWaitPay',
                component: resolve('pc-loan/system/message/wait-pay/index.vue'),
                meta: {
                  title: 'Pagar mi préstamo',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Pagar mi préstamo', to: '/sys/loan/repay' },
                    { title: 'Métodos de pago', to: '/sys/loan/repay-method' },
                    { title: 'Pagar mi préstamo', to: '/sys/message/wait-pay' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'wait-logout', // 注销冷却页
                name: 'SysMessageWaitLogout',
                component: resolve(
                  'pc-loan/system/message/wait-logout/Index.vue'
                ),
                meta: {
                  title: 'Cancelar la cuenta',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/sys/user/my' },
                    { title: 'Configuración', to: '/sys/message/config' },
                    {
                      title: 'Cancelar la cuenta',
                      to: '/sys/message/wait-logout',
                    },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'about-app',
                name: 'SysMessageAboutApp',
                component: resolve(
                  'pc-loan/system/message/about-app/index.vue'
                ),
                meta: {
                  title: 'Acerca de nosotros',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/sys/user/my' },
                    {
                      title: 'Acerca de nosotros',
                      to: '/sys/message/about-app',
                    },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'config',
                name: 'SysMessageConfig',
                component: resolve('pc-loan/system/message/config/index.vue'),
                meta: {
                  title: 'Configuración',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/sys/user/my' },
                    { title: 'Configuración', to: '/sys/message/config' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'subscribe',
                name: 'SysMessageSubscribe',
                component: resolve(
                  'pc-loan/system/message/subscribe/index.vue'
                ),
                meta: {
                  title: 'Suscripción',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/sys/user/my' },
                    { title: 'Configuración', to: '/sys/message/config' },
                    { title: 'Suscripción', to: '/sys/message/subscribe' },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'wait-credit',
                name: 'SysMessagePrecredit',
                component: resolve(
                  'pc-loan/system/message/wait-precredit/index.vue'
                ),
                meta: {
                  title: 'Resultados de la auditoria',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    {
                      title: 'Resultados de la auditoria',
                      to: '/sys/message/wait-credit',
                    },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'delete-user',
                name: 'SysMessageDeleteUser',
                component: resolve(
                  'pc-loan/system/message/delete-user/index.vue'
                ),
                meta: {
                  title: 'Verificación de identidad',
                  breadcrumb: [
                    { title: 'Página delantera', to: '/sys' },
                    { title: 'Mi perfil', to: '/sys/user/my' },
                    { title: 'Configuración', to: '/sys/message/config' },
                    {
                      title: 'Verificación de identidad',
                      to: '/sys/message/delete-user',
                    },
                  ],
                  required: true,
                  gaBackName: '',
                },
              },
              {
                path: 'pdf-result', // pdf
                name: 'SysMessagePdfResult',
                component: resolve('pc-loan/system/message/pdf/Index.vue'),
                meta: {
                  title: 'Pdf',
                  required: true,
                  gaBackName: '',
                },
              },
            ],
          },
        ],
      },
      {
        path: '/health',
        name: 'Health',
        component: resolve('pc-loan/health/Index.vue'),
      },
      {
        path: '/third-part',
        name: 'SingleThirdPart',
        component: resolve('pc-loan/system/bank/preview/ThirdParty.vue'),
        meta: {
          title: 'Identificación',
          required: true,
          gaBackName: '',
        },
      },
    ],
  },
];
