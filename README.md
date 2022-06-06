# WatLink

## About
WatLink is a group finder app designed for University of Waterloo students. Need a study group, mock interview session, or just want to hang out? WatLink has you covered. Setting up a listing takes less than a minute, and you can browse the site without even signing up for an account. 

WatLink is a great place to advertise your group. For study groups, you can add class codes to your listings, which will make them easy to find by others taking the same classes. It's hard to organize these groups without a central platform -- WatLink aims to fix this issue and make it easier to meet fellow UWaterloo students.

### FAQ
**How do I set up an event?**
*Simply click the "Add Event" button and enter a title, description, class (if you're making a study group), and set the maximum number of members (or make it unlimited). Be sure to specify a date and time to meet, or an online chat room (i.e. a Discord server) in the description. If you like, you can make this info visible only to those who join your event.*

**How do I join an event?**
*Just click "Join" next to the event! If you can't see the button, the event is probably full.*

**Do I need an account?**
*If you just want to browse the site, you do not need an account. However, to post and join events, you will need to create an account. We do not and will never use the information you give us for any nefarious purposes.*

**Will you send me emails without my consent?**
*No! The only time you will receive emails from us are when you ask to reset your password. You will never receive spam or promotional material.*

**Is my data (email, password, etc.) secure?**
*Yes! WatLink uses Firebase to store authentication details, so your data will be safely stored in Google's servers. The WatLink app does not store your password in any permanent way.*

**Can I delete my data?**
*Yes! Deleting your account completely wipes all your data from the Firebase servers.*

## Development
WatLink was developed in [Vue 3](https://vuejs.org). Vue is a frontend framework based on JavaScript (or TypeScript) that is incredibly easy to learn, and allows you to produce web apps like WatLink extremely quickly. If you're interested in learning Vue, I recommend [this tutorial](https://www.youtube.com/watch?v=qZXt1Aom3Cs) to get started. 

WatLink uses [Firebase](https://firebase.google.com) for its backend. Firebase is a backend-as-a-service tool (run by Google) that provides developers with a premade API to access authentication services, NoSQL databases, cloud storage, and more. It made creating the authentication and database systems much simpler.

WatLink's UX uses some components from [PrimeVue](https://www.primefaces.org/primevue), a UI library designed for easy use with Vue's component-based structure. The components look relatively good out of the box, but it is unfortunately not very easy to customize their CSS. 

## Dev Server Setup
1. Use an editor with Vue support (I recommend VSCode with the Volar extension)
2. Clone (or fork & clone) this repo.
3. Install Node.js and npm.
4. Install the following packages with npm:
  - "firebase": 9.8.1 or newer
  - "primeicons": 5.0.0 or newer
  - "primevue": 3.12.6 or newer
  - "vue": 3.2.13 or newer
  - "vue-router": 4.0.3 or newer
5. In the directory with the project, run `npm install`, then `npm run serve` to start the server.

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
