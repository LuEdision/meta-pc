<template>
  <div v-loading="loading" class="pdf-wrapper">
    <div
      id="pdf-wrapper"
      :class="{ warning: success, error: !success }"
      :close-on-click-overlay="false"
    >
      <i v-if="!success" class="el-icon-error"></i>
      <span v-if="!success">Fallo de carga PDF</span>
    </div>
  </div>
</template>
<script>
import { loan } from '@/api/index';
// import pdfjsLib from "pdfjs-dist";

import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.js';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
const { apiGetPdf } = loan;

export default {
  name: 'Pdf',
  props: {
    url: {
      type: String,
      default: '',
    },
    resourceId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: true,
      pdfUrl: '',
      success: true,
    };
  },
  mounted() {
    try {
      //   const pdfjs = await import('pdfjs-dist');
      //   const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
      pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
      const ele = document.getElementById('pdf-wrapper');
      const wrapperW = ele.offsetWidth;
      this.getBlob().then((_r) => {
        const loadingTask = pdfjs.getDocument(this.pdfUrl);
        const CSS_UNITS = 96.0 / 72.0;
        loadingTask.promise
          .then((pdfDocument) => {
            this.success = true;
            this.loading = false;
            const { numPages } = pdfDocument;
            for (let i = 0; i < numPages; i++) {
              const canvas = document.createElement('canvas');
              const cId = `canvas${i + 1}`;
              canvas.setAttribute('id', cId);
              document.getElementById('pdf-wrapper').appendChild(canvas);
              pdfDocument.getPage(i + 1).then(function (pdfPage) {
                // Display page on the existing canvas with 100% scale.
                // const viewport = pdfPage.getViewport({ scale: 4.0 });
                // const canvas = document.createElement("canvas");
                // document.getElementById("pdf-wrapper").appendChild(canvas);
                // canvas.width = viewport.width;
                // canvas.height = viewport.height;
                // canvas.style.width = (wrapperW - 30) + 'px';
                const scale = 2.5;
                const viewport = pdfPage.getViewport({ scale: scale });
                // Support HiDPI-screens.
                const outputScale = window.devicePixelRatio || 1;

                canvas.width = Math.floor(viewport.width * outputScale);
                canvas.height = Math.floor(viewport.height * outputScale);
                canvas.style.width = Math.floor(viewport.width) + 'px';
                canvas.style.height = Math.floor(viewport.height) + 'px';

                // canvas.setAttribute("style", `transform: scale(${1 / CSS_UNITS})`);
                const ctx = canvas.getContext('2d');
                const transform =
                  outputScale !== 1
                    ? [outputScale, 0, 0, outputScale, 0, 0]
                    : null;

                ctx.font = '16px';
                const renderTask = pdfPage.render({
                  canvasContext: ctx,
                  transform: transform,
                  viewport: viewport,
                });
                return renderTask.promise;
              });
            }
            // Request a first page
            return;
          })
          .catch((reason) => {
            this.loading = false;
            this.success = false;
            this.$message({
              type: 'error',
              message: 'Fallo de carga PDF',
              duration: 2000,
            });
          });
      });
    } catch (error) {
      this.$message({
        type: 'error',
        message: 'El plug - in PDF no está soportado en el navegador actual',
        duration: 2000,
      });
    }
  },
  methods: {
    getBlob() {
      return new Promise((resolve, reject) => {
        apiGetPdf({
          paymentId: this.resourceId ?? null,
          responseType: 'arraybuffer',
        })
          .then((res) => {
            const bytes = res;
            try {
              // 处理异常,将ascii码小于0的转换为大于0
              //   const ab = new ArrayBuffer(bytes.length);
              //   const ia = new Uint8Array(ab);
              //   for (let i = 0; i < bytes.length; i++) {
              //     ia[i] = bytes.charCodeAt(i);
              //   }
              const blob = new Blob([bytes], {
                type: 'application/pdf;chartset=UTF-8',
              });
              let fileURL = URL.createObjectURL(blob);
              this.pdfUrl = fileURL;
              resolve(this.pdfUrl);
            } catch (err) {
              this.success = false;
              this.loading = false;
              throw new Error(err);
            }
          })
          .catch((err) => {
            this.success = false;
            this.loading = false;
            reject(err);
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.pdf-wrapper {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
#pdf-wrapper {
  font-size: 18px;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  &.warning {
    color: #e6a23c;
  }
  &.error {
    color: #f56c6c;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    i {
      font-size: 40px;
      width: 40px;
      height: 40px;
      margin-bottom: 10px;
    }
  }
}
.wrapper {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    width: 150px;
    height: 150px;
    background: #fff;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    color: #000;
  }
  i {
    font-size: 30px;
    color: #fff;
  }
}
</style>
