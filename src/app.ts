export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('app1 bootstrap', props);
    return await new Promise((resolve) => {
      resolve(true);
    });
  },
  // 应用 render 之前触发
  mount(props: any) {
    console.log('app1 mount', props);
  },
  // 应用卸载之后触发
  unmount(props: any) {
    console.log('app1 unmount', props);
  },
};

export async function render(oldRender: () => void) {
  if (!window.__POWERED_BY_QIANKUN__) {
    // @ts-ignore
    __webpack_public_path__ = '';
  }
  oldRender();
}
