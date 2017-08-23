import {UIRouterReact, servicesPlugin, pushStateLocationPlugin} from '@uirouter/react';
import Home from './components/Home';
import SignUp from './components/SignUp';

const states = [{
    name: 'signUp',
    url: '/signUp',
    component: SignUp
},{
    name: 'home',
    url: '/',
    component: Home
}];

const router = new UIRouterReact();

router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);

for(let i = 0; i < states.length; i++) {
    router.stateRegistry.register(states[i]);
}

router.start();

export default router;


