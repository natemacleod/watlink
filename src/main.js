import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// PrimeVue UI
import PrimeVue from "primevue/config";
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Dialog from 'primevue/dialog';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Checkbox from 'primevue/checkbox';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Divider from 'primevue/divider';
import TabMenu from 'primevue/tabmenu';
import Password from 'primevue/password';
import ScrollPanel from 'primevue/scrollpanel';
import ProgressSpinner from 'primevue/progressspinner';

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {ripple: true});
app.use(ConfirmationService);
app.use(ToastService);

app.component('DialogBox', Dialog);
app.component("CardContainer", Card);
app.component("PrimeButton", Button);
app.component("MenuBar", Menubar);
app.component("InputText", InputText);
app.component("ConfirmDialog", ConfirmDialog);
app.component("ConfirmPopup", ConfirmPopup);
app.component("ToastNotif", Toast);
app.component("DividerLine", Divider);
app.component("InputNumber", InputNumber);
app.component("CheckBox", Checkbox);
app.component("TabMenu", TabMenu);
app.component("PasswordInput", Password);
app.component("ScrollPanel", ScrollPanel);
app.component("ProgressSpinner", ProgressSpinner);

app.mount('#app');

// To-Do List
// Verification and password reset emails
// Style site [IN PROGRESS]
// Readme, site title, favicon, version
// About page
// Profile pictures (Site can work w/o it, possible 1.1 feature)
// Event chat? (Site can work w/o it, possible 1.1 feature)
// Get list of joined people (Will require using 2 arrays to track UIDs and names)