import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronLeft)
library.add(faChevronRight)
library.add(faEye)

Vue.component('fa-icon', FontAwesomeIcon)
