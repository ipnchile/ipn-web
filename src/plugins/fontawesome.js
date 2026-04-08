import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* ICONOS SOLID */
import {
  faScroll,
  faBookBible,
  faQuoteLeft,
  faChurch,
  faLocationDot,
  faClock,
  faUserTie,
  faUserNurse,
  faUser,
  faEnvelope,
  faCalendarDays
} from '@fortawesome/free-solid-svg-icons'

/* ICONOS BRANDS */
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faFacebook
} from '@fortawesome/free-brands-svg-icons'

library.add(
  /* solid */
  faScroll,
  faBookBible,
  faQuoteLeft,
  faChurch,
  faLocationDot,
  faClock,
  faUserTie,
  faUserNurse,
  faUser,
  faEnvelope,
  faCalendarDays,

  /* brands */
  faFacebookF,
  faInstagram,
  faYoutube,
  faFacebook
)

export { FontAwesomeIcon }