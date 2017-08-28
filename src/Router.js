import {UIRouterReact, servicesPlugin, pushStateLocationPlugin} from '@uirouter/react';
import Home from './components/Home';
import SignUpLogin from './components/SignUpLogin';
import Dashboard  from './components/Dashboard';
import Matches from './components/Matches';

const states = [{
    name: 'signUp',
    url: '/signUpLogin',
    component: SignUpLogin
},{
    name: 'home',
    url: '/',
    component: Home
},{
    name: 'dashboard',
    url: '/dashboard',
    component: Dashboard
},{
    name: 'matches',
    url: '/matches',
    component: Matches
}];

const router = new UIRouterReact();

router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);
router.urlRouter.otherwise({state: 'home'});

for(let i = 0; i < states.length; i++) {
    router.stateRegistry.register(states[i]);
}

router.start();

export default router;


