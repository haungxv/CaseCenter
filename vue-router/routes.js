import Sign from '../src/views/sign.vue';
import Manager from '../src/views/manager.vue';

import caseReview from '../src/components/caseReview.vue'
import addAccount from '../src/components/addAccount.vue'
import caseRegistration from '../src/components/caseRegistration.vue'
import historyCase from '../src/components/historyCase.vue'
import manageAccount from '../src/components/manageAccount.vue'
import manageLabel from '../src/components/manageLabel.vue'
import stayCase from '../src/components/stayCase.vue'
import workCase from '../src/components/workCase.vue'
import fileCase from '../src/components/fileCase.vue'
import hello from '../src/components/hello.vue'
import caseStatic from '../src/components/caseStatic.vue'
import trackRecord from '../src/components/trackRecord.vue'
import suspectBank from '../src/components/suspectBank.vue'
import weekSummary from '../src/components/weekSummary.vue'
import changePass from '../src/components/changePass.vue'
import monitorCenter from '../src/components/monitorCenter.vue'
import changeInfo from '../src/components/changeInfo.vue'

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
            {
                path: 'caseStatic',
                component: caseStatic
            },
            {
                path: 'suspectBank',
                component: suspectBank
            },
            {
                path: 'trackRecord',
                component: trackRecord
            },
            {
                path: 'weekSummary',
                component: weekSummary
            },
            {
                path: 'changePass',
                component: changePass
            },
            {
                path: 'monitorCenter',
                component: monitorCenter
            },
            {
                path: 'changeInfo',
                component: changeInfo
            },
        ]
    },
]