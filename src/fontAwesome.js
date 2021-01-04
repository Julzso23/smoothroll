import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight, faEye, faExclamationTriangle, faHistory, faTasks, faSignOutAlt, faFolderOpen, faStream } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronLeft, faChevronRight, faEye, faExclamationTriangle, faHistory, faTasks, faSignOutAlt, faFolderOpen, faStream)

Vue.component('fa-icon', FontAwesomeIcon)
