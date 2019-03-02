import Sign from '../src/views/sign.vue';
import Manager from '../src/views/manager.vue';

import caseReview from '../src/components/caseReview.vue'
import addAccount from '../src/components/addAccount.vue'
import caseRegistration from '../src/components/caseRegistration.vue'
import historyCase from '../src/components/historyCase.vue'
import manageAccount from '../src/components/manageAccount.vue'
import manageLabel from '../src/components/manageLabel.vue'
import reviewResult from '../src/components/reviewResult.vue'
import setAccount from '../src/components/setAccount.vue'
import stayCase from '../src/components/stayCase.vue'
import workCase from '../src/components/workCase.vue'
import fileCase from '../src/components/fileCase.vue'
import hello from '../src/components/hello.vue'


export default [
    {
        path: '/',
        redirect: '/sign'
    },
    {
        path: '/sign',
        component: Sign
    },
    {
        path: '/manager',
        component: Manager,
        children: [
            {
                path: '/',
                component: hello
            },
            {
                path: 'caseReview',
                component: caseReview
            },
            {
                path: 'addAccount',
                component: addAccount
            },
            {
                path: 'caseRegistration',
                component: caseRegistration
            },
            {
                path: 'historyCase',
                component: historyCase
            },
            {
                path: 'manageAccount',
                component: manageAccount
            },
            {
                path: 'manageLabel',
                component: manageLabel
            },
            {
                path: 'reviewResult',
                component: reviewResult
            },
            {
                path: 'setAccount',
                component: setAccount
            },
            {
                path: 'stayCase',
                component: stayCase
            },
            {
                path: 'workCase',
                component: workCase
            },
            {
                path: 'fileCase',
                component: fileCase
            },
        ]
    },
]