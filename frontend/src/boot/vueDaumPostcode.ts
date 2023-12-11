import { boot } from 'quasar/wrappers';
import VueDaumPostcode from 'vue-daum-postcode';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.use(VueDaumPostcode);
});
