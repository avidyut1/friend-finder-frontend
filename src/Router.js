import {UIRouterReact, servicesPlugin, pushStateLocationPlugin} from '@uirouter/react';
import Home from './components/Home';
import SignUpLogin from './components/SignUpLogin';
import Dashboard  from './components/Dashboard';

const states = [{
    name: 'signUp',
    url: '/signUp',
    component: SignUpLogin
},{
    name: 'home',
    url: '/',
    component: Home
},{
    name: 'dasbhoard',
    url: '/dashboard',
    component: Dashboard
}];

const router = new UIRouterReact();

router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);

for(let i = 0; i < states.length; i++) {
    router.stateRegistry.register(states[i]);
}

router.start();

export default router;


