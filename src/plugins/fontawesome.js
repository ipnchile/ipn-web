import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* ICONOS SOLID */
import {
  faScroll,
  faBookBible,
  faQuoteLeft
} from '@fortawesome/free-solid-svg-icons'

/* ICONOS BRANDS */
import {
  faFacebookF,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'

library.add(
  /* solid */
  faScroll,
  faBookBible,
  faQuoteLeft,

  /* brands */
  faFacebookF,
  faInstagram,
  faYoutube
)

export { FontAwesomeIcon }