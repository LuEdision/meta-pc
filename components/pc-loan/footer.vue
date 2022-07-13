<template>
  <div class="pc-loan-footer">
    <div class="pc-wrapper">
      <ul aria-expanded="false" class="link">
        <li class="link_item">
          <a href="/privacy-policy" target="_blank">Política de privacidad</a>
        </li>
        <li class="link_item">
          <a href="javascript:void(0)" @click="openCookieSetting"
            >Configuración de cookies</a
          >
        </li>
        <li class="link_item">
          <a href="/terms-of-use" target="_blank">Condiciones de uso</a>
        </li>
        <li class="link_item">
          <div><a href="/secci" target="_blank">SECCI</a></div>
        </li>
        <li class="link_item">
          <a href="/cookie-policy" target="_blank">Política de cookies</a>
        </li>
      </ul>
      <div class="split"></div>
      <div class="download">
        <!-- <div class="google-play">
          <a
            href="https://play.google.com/store/apps/details?id="
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="@/assets/img/es/google-play.png" alt="mib" />
          </a>
        </div> -->
        <div class="chat">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="@/assets/img/facebook.png" alt="mib" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="@/assets/img/instagram.png" alt="mib" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="@/assets/img/twitter.png" alt="mib" />
          </a>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogShowFirst"
      width="60%"
      top="35vh"
      append-to-body
      custom-class="setting-dialog"
      :show-close="false"
      lock-scroll
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div slot="title" class="setting-dialog-title">
        RIVENDELL TECHNOLOGY usa cookies propias y de terceros
      </div>
      <span class="setting-dialog-content"
        >Las cookies de este sitio web se usan con finalidades técnicas,
        analíticas, de personalización y de publicidad comportamental. Puedes
        obtener más información pulsando
        <a
          href="/cookie-policy"
          target="_blank"
          style="text-decoration: underline; color: #438cff"
          >AQUÍ</a
        >. Puedes aceptar todas las cookies pulsando el botón “Aceptar” o
        configurarlas y rechazar su uso pulsando “Configuración”.</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="openSecondDialog">Configurar</el-button>
        <el-button type="primary" @click="handleReqCookie"
          >Aceptar cookies</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="Controles de privacidad"
      :visible.sync="dialogShowSecond"
      width="65%"
      top="10vh"
      append-to-body
      custom-class="setting-dialog spec"
      :show-close="false"
      :close-on-click-modal="false"
      lock-scroll
      :before-close="handleClose"
    >
      <div slot="title" class="setting-dialog-title">
        <div class="dialog-title">Controles de privacidad</div>
        <p class="dialog-title-content">
          Algunas de estas cookies se utilizan con fines estadísticos, y otras
          las crean servicios de terceros. Al hacer clic en ‘Aceptar’, usted
          acepta el uso de cookies.
          <a
            href="javascript:;"
            style="text-decoration: underline; color: #6a6e75"
            @click="openCookies"
            >Acerca de las cookies</a
          >
          y
          <a
            href="/cookie-policy"
            target="_blank"
            style="text-decoration: underline; color: #6a6e75"
            >Política de cookies</a
          >
        </p>
      </div>
      <div class="cookies-wrapper-L">
        <div class="cookie-all">
          <el-button @click="selectAll">SELECCIONAR TODO</el-button>
        </div>
        <div class="cookies-setting">
          <div class="cookies-switch">
            <span class="cookies-switch-title">Cookies técnicas</span>
          </div>
          <p class="cookies-setting-content">
            RIVENDELL usa las Cookies técnicas con la única finalidad de
            permitirle la navegación a través de este Sitio Web y utilizar las
            diferentes opciones o servicios que en él existan).
          </p>
          <el-switch
            v-model="cookiesTech"
            active-value="cookie_cat_technical"
            inactive-value=""
          >
          </el-switch>
        </div>
        <div class="cookies-setting">
          <div class="cookies-switch">
            <span class="cookies-switch-title">Cookies de personalización</span>
          </div>
          <p class="cookies-setting-content">
            RIVENDELL usa las Cookies de personalización con la única finalidad
            de permitirle acceder al servicio con algunas características de
            carácter general predefinidas en función de una serie de criterios
            en el dispositivo (como por ejemplo el idioma, país, etc.) durante
            la búsqueda o para futuras visitas.
          </p>
          <el-switch
            v-model="peronalCookie"
            active-value="cookie_cat_personalization"
            inactive-value=""
          >
          </el-switch>
        </div>
        <div class="cookies-setting">
          <div class="cookies-switch">
            <span class="cookies-switch-title">Cookies de análisis</span>
          </div>
          <div class="cookies-setting-content">
            <p>
              RIVENDELL utiliza Cookies de terceros de Google Analytics, con el
              fin de ayudarnos a entender cómo se utiliza el sitio web y Google
              Analytics recopila Cookies de origen, datos relacionados con el
              dispositivo/navegador, la dirección IP y las actividades en el
              sitio/aplicación para medir e informar de las estadísticas sobre
              las interacciones de los usuarios. Google utiliza Google Analytics
              para prestar el servicio de medición de Google Analytics a
              RIVENDELL. Para más información sobre las Cookies de Google
              Analytics,
              <a
                href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"
                target="_blank"
                style="text-decoration: underline; color: #6a6e75"
                >lea aquí</a
              >.
            </p>

            <p>
              RIVENDELL también utiliza Cookies de terceros (por ejemplo,
              AppsFlyer, Branch) para fines de análisis de marketing. Para más
              información sobre las cookies de AppsFlyer, por favor
              <a
                href="https://www.appsflyer.com/legal/services-privacy-policy/"
                target="_blank"
                style="text-decoration: underline; color: #6a6e75"
                >lea aquí</a
              >. Para más información sobre las cookies de Branch, por favor
              <a
                href="https://www.appsflyer.com/legal/privacy-policy/"
                target="_blank"
                style="text-decoration: underline; color: #6a6e75"
                >lea aquí</a
              >.
            </p>
          </div>
          <el-switch
            v-model="analyzeCookie"
            active-value="cookie_cat_analysis"
            inactive-value=""
          >
          </el-switch>
        </div>
        <div class="cookies-setting">
          <div class="cookies-switch">
            <span class="cookies-switch-title"
              >Cookies de publicidad comportamental</span
            >
          </div>
          <p class="cookies-setting-content">
            RIVENDELL utiliza Cookies publicitarias. Éstas son establecidas por
            nosotros y por nuestros socios publicitarios para ofrecerle
            contenidos relevantes y para comprender la eficacia de esos
            contenidos. Pueden utilizarse para recopilar información sobre sus
            actividades en línea a lo largo del tiempo y en diferentes sitios
            web para predecir sus preferencias y mostrarle anuncios más
            relevantes. Estas Cookies también permiten construir un perfil sobre
            usted y sus intereses y permiten que se le muestren anuncios
            personalizados basados en su perfil.
          </p>
          <el-switch
            v-model="behaviorAddCookie"
            active-value="cookie_cat_behavioral_advertising"
            inactive-value=""
          >
          </el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openCurrentDialog">Ocultar detalles</el-button>
        <el-button type="primary" @click="handleReqCookie"
          >ACTUALIZAR CONSENTIMIENTO</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="Declaración de cookies"
      :visible.sync="dialogShowThird"
      width="70%"
      top="6vh"
      append-to-body
      custom-class="setting-dialog spec first"
      :show-close="false"
      lock-scroll
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="common-content">
        <h3>Declaración de cookies</h3>
        <div class="cookie-multi-lang" v-html="Doc"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancelThird">Controles de privacidad</el-button>
        <el-button type="primary" @click="handleReqCookie"
          >Aceptar cookies</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mexico from './multi-lang/MX';
import nigeria from './multi-lang/NG';
import peru from './multi-lang/PE';
import MS from './multi-lang/MS';
import UG from './multi-lang/UG';
import { common } from '@/api/index';
import { v4 as uuidv4 } from 'uuid';

const { acceptCookies } = common;
export default {
  name: 'PcFooter',
  data() {
    return {
      dialogShowSecond: false,
      dialogShowFirst: false,
      dialogShowThird: false,
      cookiesTech: 'cookie_cat_technical',
      peronalCookie: 'cookie_cat_personalization',
      analyzeCookie: 'cookie_cat_analysis',
      behaviorAddCookie: 'cookie_cat_behavioral_advertising',
    };
  },
  computed: {
    Doc() {
      if (this.$country === 'peru') return peru;
      if (this.$app === 'Meta' || this.$country === 'meta') return MS;
      if (this.$country === 'uganda') return UG;

      return (this.$country === 'mexico' && mexico) || nigeria;
    },
    linkList() {
      return [
        { label: 'Política de privacidad', url: '/privacy-policy' },
        { label: 'Configuración de cookies', url: '' },
        { label: 'Condiciones de uso', url: '/terms-of-use' },
        { label: 'SECCI', url: '/secci' },
        { label: 'Política de cookies', url: '/cookie-policy' },
      ];
    },
  },
  methods: {
    getImg(name) {
      return this.$cdn + '/icon/' + name + '.png';
    },
    openCookieSetting() {
      this.dialogShowFirst = true;
    },
    openCookies() {
      this.dialogShowThird = true;
    },
    openSecondDialog() {
      this.dialogShowSecond = true;
    },
    openCurrentDialog() {
      this.dialogShowSecond = false;
    },
    handleReqCookie() {
      let approved = [
        this.cookiesTech,
        this.peronalCookie,
        this.analyzeCookie,
        this.behaviorAddCookie,
      ];
      let consents_approved = approved.filter((_) => {
        return !!_;
      });
      acceptCookies({
        website_uuid: 'ef9da495-99c6-4f4e-b11a-df20d3c62b3f',
        timestamp: new Date().toISOString(),
        consent_url: location.href,
        consent_website: location.hostname,
        consent_domain: location.host,
        user_uid: uuidv4(),
        consents_approved: consents_approved,
        consents_denied: [],
        user_agent: navigator.userAgent,
      }).then((_) => {
        this.$message({
          type: 'success',
          message: 'Cookies configuradas con éxito',
          duration: 2000,
        });
      });
      this.dialogShowFirst = false;
      this.dialogShowSecond = false;
      this.dialogShowThird = false;
    },
    handleClose(done) {
      done && done();
    },
    onCancelThird() {
      this.dialogShowThird = false;
    },
    selectAll() {},
  },
};
</script>
