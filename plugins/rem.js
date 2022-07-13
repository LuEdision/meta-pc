const baseSize = 100; // 基准值
const setRem = () => {
  // 相对于1920像素的缩放比
  let cWidth = document.documentElement.clientWidth;
  if (cWidth > 1920) {
    cWidth = 1920;
  }
  let scale = cWidth / 1920;
  // 根据屏幕变化 1rem 对应的 font-size
  scale = scale > 1 ? 1 : scale;
  const realFont = baseSize * scale;
  document.documentElement.style.fontSize = String(realFont) + 'px';
};

// const baseSize375 = 37.5; // 基准值
const setRem375 = () => {
  // 相对于1920像素的缩放比
  let cWidth = document.documentElement.clientWidth;
  if (cWidth > 375) {
    cWidth = 375;
  }
  let scale = cWidth / 375;
  // 根据屏幕变化 1rem 对应的 font-size
  scale = scale > 1 ? 1 : scale;
  const realFont = baseSize * scale;
  document.documentElement.style.fontSize = String(realFont) + 'px';
};

export const initRem = () => {
  const initScreenWidth = document.body.clientWidth;
  if (initScreenWidth < 769) {
    setRem375();
  } else {
    setRem();
  }
  window.onresize = () => {
    const screenWidth = document.body.clientWidth;
    if (screenWidth < 769) {
      setRem375();
    } else {
      setRem();
    }
  };
};

// export const initRem375 = () => {
//   setRem375();
//   window.onresize = () => {
//     const screenWidth = document.body.clientWidth;
//     if (screenWidth < 769) {
//       initRem375();
//     } else {
//       initRem();
//     }
//   };
// };

if (process.client || process.browser) {
  initRem();
}
