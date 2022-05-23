import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// PrimeVue UI
import PrimeVue from "primevue/config";
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/saga-blue/theme.css';       //theme
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';                           //icons
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

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
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

app.mount('#app');

// To-Do List
// Add validation for creating accounts
// Add errors when you get a password wrong
// Add profiles
// Add other needed fields to event object [IN PROGRESS]
// Add security rules for deletion and editing [DONE ON FRONTEND]
// Block joining if it would violate the max number of people
// Create search settings and add logic
// Style site [IN PROGRESS]
// Change passwords
// Ability to delete accounts
// Event chat? (Site can work w/o it, possible 1.1 feature)
