<template>
  <header class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__container">
      <RouterLink
        to="/"
        class="navbar__brand"
        aria-label="Ir al inicio"
        @click="closeMenu"
      >
        <img
          class="navbar__logo"
          src="@/assets/img/logos/ipn-navbar-white.png"
          alt="Iglesia Pentecostal Nazareth"
        />
      </RouterLink>

      <nav class="navbar__menu">
        <RouterLink
          to="/"
          class="navbar__link"
          :class="{ 'router-link-active': isRoute('/') }"
          @click="closeMenu"
        >
          Inicio
        </RouterLink>

        <RouterLink
          to="/quienes-somos"
          class="navbar__link"
          :class="{ 'router-link-active': isSection('/quienes-somos') }"
          @click="closeMenu"
        >
          Quiénes Somos
        </RouterLink>

        <!-- DROPDOWN DEPARTAMENTOS -->
        <div
          class="navbar__dropdown"
          @mouseenter="handleDepartamentosEnter"
          @mouseleave="handleDepartamentosLeave"
        >
          <button
            type="button"
            class="navbar__link navbar__dropdown-title"
            :class="{ 'router-link-active': isSection('/departamentos') || dropdownOpen }"
            :aria-expanded="dropdownOpen ? 'true' : 'false'"
            aria-haspopup="true"
            @click="toggleDropdown"
          >
            <span>Departamentos</span>
            <span
              class="navbar__dropdown-icon"
              :class="{ 'navbar__dropdown-icon--open': dropdownOpen }"
              aria-hidden="true"
            >
              <svg viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>

          <transition name="dropdown-fade">
            <div
              v-if="dropdownOpen"
              class="navbar__dropdown-content"
              @mouseenter="handleDepartamentosEnter"
              @mouseleave="handleDepartamentosLeave"
            >
              <RouterLink
                to="/departamentos/varones"
                :class="{ 'dropdown-active': isRoute('/departamentos/varones') }"
                @click="handleDepartmentClick"
              >
                Varones
              </RouterLink>

              <RouterLink
                to="/departamentos/dorcas"
                :class="{ 'dropdown-active': isRoute('/departamentos/dorcas') }"
                @click="handleDepartmentClick"
              >
                Dorcas
              </RouterLink>

              <RouterLink
                to="/departamentos/jumix"
                :class="{ 'dropdown-active': isRoute('/departamentos/jumix') }"
                @click="handleDepartmentClick"
              >
                Jumix
              </RouterLink>
            </div>
          </transition>
        </div>

        <!-- DROPDOWN ACTUALIDAD -->
        <div
          class="navbar__dropdown"
          @mouseenter="handleActualidadEnter"
          @mouseleave="handleActualidadLeave"
        >
          <button
            type="button"
            class="navbar__link navbar__dropdown-title"
            :class="{ 'router-link-active': isSection('/actualidad') || actualidadDropdownOpen }"
            :aria-expanded="actualidadDropdownOpen ? 'true' : 'false'"
            aria-haspopup="true"
            @click="toggleActualidadDropdown"
          >
            <span>Actualidad</span>
            <span
              class="navbar__dropdown-icon"
              :class="{ 'navbar__dropdown-icon--open': actualidadDropdownOpen }"
              aria-hidden="true"
            >
              <svg viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>

          <transition name="dropdown-fade">
            <div
              v-if="actualidadDropdownOpen"
              class="navbar__dropdown-content"
              @mouseenter="handleActualidadEnter"
              @mouseleave="handleActualidadLeave"
            >
              <RouterLink
                to="/actualidad/noticias"
                :class="{ 'dropdown-active': isRoute('/actualidad/noticias') }"
                @click="handleActualidadClick"
              >
                Noticias
              </RouterLink>

              <RouterLink
                to="/actualidad/eventos"
                :class="{ 'dropdown-active': isRoute('/actualidad/eventos') }"
                @click="handleActualidadClick"
              >
                Eventos
              </RouterLink>
            </div>
          </transition>
        </div>

        <RouterLink
          to="/donaciones"
          class="navbar__link"
          :class="{ 'router-link-active': isRoute('/donaciones') }"
          @click="closeMenu"
        >
          Donaciones
        </RouterLink>

        <RouterLink
          to="/contacto"
          class="navbar__link"
          :class="{ 'router-link-active': isRoute('/contacto') }"
          @click="closeMenu"
        >
          Contacto
        </RouterLink>

        <RouterLink
          to="/sumate"
          class="navbar__cta"
          @click="closeMenu"
        >
          Súmate
        </RouterLink>
      </nav>

      <button
        class="navbar__toggle"
        @click="toggleMenu"
        :class="{ 'navbar__toggle--active': menuOpen }"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="menuOpen ? 'true' : 'false'"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <transition name="fade">
      <div v-if="menuOpen" class="navbar__mobile">
        <RouterLink
          @click="closeMenu"
          to="/"
          :class="{ 'router-link-active': isRoute('/') }"
        >
          Inicio
        </RouterLink>

        <RouterLink
          @click="closeMenu"
          to="/quienes-somos"
          :class="{ 'router-link-active': isSection('/quienes-somos') }"
        >
          Quiénes Somos
        </RouterLink>

        <hr class="navbar__mobile-divider" />

        <RouterLink
          @click="closeMenu"
          to="/departamentos/varones"
          :class="{ 'router-link-active': isRoute('/departamentos/varones') }"
        >
          Varones
        </RouterLink>

        <RouterLink
          @click="closeMenu"
          to="/departamentos/dorcas"
          :class="{ 'router-link-active': isRoute('/departamentos/dorcas') }"
        >
          Dorcas
        </RouterLink>

        <RouterLink
          @click="closeMenu"
          to="/departamentos/jumix"
          :class="{ 'router-link-active': isRoute('/departamentos/jumix') }"
        >
          Jumix
        </RouterLink>

        <hr class="navbar__mobile-divider" />

        <RouterLink
          @click="closeMenu"
          to="/actualidad/noticias"
          :class="{ 'router-link-active': isRoute('/actualidad/noticias') }"
        >
          Noticias
        </RouterLink>

        <RouterLink
          @click="closeMenu"
          to="/actualidad/eventos"
          :class="{ 'router-link-active': isRoute('/actualidad/eventos') }"
        >
          Eventos
        </RouterLink>

        <hr class="navbar__mobile-divider" />

        <RouterLink
          @click="closeMenu"
          to="/donaciones"
          :class="{ 'router-link-active': isRoute('/donaciones') }"
        >
          Donaciones
        </RouterLink>

        <RouterLink
          @click="closeMenu"
          to="/contacto"
          :class="{ 'router-link-active': isRoute('/contacto') }"
        >
          Contacto
        </RouterLink>

        <RouterLink
          @click="closeMenu"
          to="/sumate"
          class="navbar__mobile-cta"
        >
          Súmate
        </RouterLink>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()


const menuOpen = ref(false)
const isScrolled = ref(false)

const dropdownOpen = ref(false)
const actualidadDropdownOpen = ref(false)

let dropdownOpenTimeout = null
let dropdownCloseTimeout = null
let actualidadOpenTimeout = null
let actualidadCloseTimeout = null

function isRoute(path) {
  return route.path === path
}

function isSection(base) {
  return route.path === base || route.path.startsWith(base + "/")
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
    forceCloseDropdown()
    forceCloseActualidadDropdown()
  }
)

watch(menuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : ""
})

function toggleMenu() {
  menuOpen.value = !menuOpen.value

  if (menuOpen.value) {
    forceCloseDropdown()
    forceCloseActualidadDropdown()
  }
}

function closeMenu() {
  menuOpen.value = false
}

/* Departamentos */
function openDropdown() {
  clearTimeout(dropdownCloseTimeout)
  clearTimeout(dropdownOpenTimeout)

  dropdownOpenTimeout = setTimeout(() => {
    forceCloseActualidadDropdown()
    dropdownOpen.value = true
  }, 60)
}

function closeDropdown() {
  clearTimeout(dropdownOpenTimeout)
  clearTimeout(dropdownCloseTimeout)

  dropdownCloseTimeout = setTimeout(() => {
    dropdownOpen.value = false
  }, 220)
}

function forceCloseDropdown() {
  clearTimeout(dropdownOpenTimeout)
  clearTimeout(dropdownCloseTimeout)
  dropdownOpen.value = false
}

function handleDepartamentosEnter() {
  openDropdown()
}

function handleDepartamentosLeave() {
  closeDropdown()
}

function toggleDropdown() {
  if (dropdownOpen.value) {
    forceCloseDropdown()
  } else {
    forceCloseActualidadDropdown()
    clearTimeout(dropdownOpenTimeout)
    clearTimeout(dropdownCloseTimeout)
    dropdownOpen.value = true
  }
}

function handleDepartmentClick() {
  forceCloseDropdown()
  closeMenu()
}

/* Actualidad */
function openActualidadDropdown() {
  clearTimeout(actualidadCloseTimeout)
  clearTimeout(actualidadOpenTimeout)

  actualidadOpenTimeout = setTimeout(() => {
    forceCloseDropdown()
    actualidadDropdownOpen.value = true
  }, 60)
}

function closeActualidadDropdown() {
  clearTimeout(actualidadOpenTimeout)
  clearTimeout(actualidadCloseTimeout)

  actualidadCloseTimeout = setTimeout(() => {
    actualidadDropdownOpen.value = false
  }, 220)
}

function forceCloseActualidadDropdown() {
  clearTimeout(actualidadOpenTimeout)
  clearTimeout(actualidadCloseTimeout)
  actualidadDropdownOpen.value = false
}

function handleActualidadEnter() {
  openActualidadDropdown()
}

function handleActualidadLeave() {
  closeActualidadDropdown()
}

function toggleActualidadDropdown() {
  if (actualidadDropdownOpen.value) {
    forceCloseActualidadDropdown()
  } else {
    forceCloseDropdown()
    clearTimeout(actualidadOpenTimeout)
    clearTimeout(actualidadCloseTimeout)
    actualidadDropdownOpen.value = true
  }
}

function handleActualidadClick() {
  forceCloseActualidadDropdown()
  closeMenu()
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  handleScroll()
  window.addEventListener("scroll", handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll)
  document.body.style.overflow = ""

  clearTimeout(dropdownOpenTimeout)
  clearTimeout(dropdownCloseTimeout)
  clearTimeout(actualidadOpenTimeout)
  clearTimeout(actualidadCloseTimeout)
})
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(14, 30, 46, 0.42);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: all var(--transition-base);
}

.navbar--scrolled {
  background: rgba(14, 30, 46, 0.92);
  box-shadow: var(--shadow-soft);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.navbar__container {
  width: min(1200px, calc(100% - 3rem));
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  transition: height 0.3s ease;
}

.navbar--scrolled .navbar__container {
  height: 68px;
}

.navbar__brand {
  display: flex;
  align-items: center;
}

.navbar__logo {
  height: 40px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.navbar__brand:hover .navbar__logo {
  transform: scale(1.04);
}

.navbar__menu {
  display: flex;
  align-items: center;
  gap: 1.7rem;
}

.navbar__link {
  color: var(--theme-text-soft);
  font-weight: 600;
  font-size: 0.84rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  transition: color 0.28s ease;
  background: transparent;
  border: none;
  outline: none;
  box-shadow: none;
  appearance: none;
  -webkit-appearance: none;
  font-family: var(--font-primary);
  padding: 0;
  text-decoration: none;
}

.navbar__link:hover,
.navbar__link.router-link-active {
  color: var(--theme-text);
}

.navbar__link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -7px;
  width: 0%;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--theme-secondary), rgba(203, 164, 94, 0.35));
  transition: width 0.28s ease;
}

.navbar__link:hover::after,
.navbar__link.router-link-active::after {
  width: 100%;
}

.navbar__dropdown {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: -20px;
}

.navbar__dropdown::after {
  content: "";
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  height: 18px;
}

.navbar__dropdown-title {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: none;
  outline: none;
  box-shadow: none;
  appearance: none;
  -webkit-appearance: none;
  font-family: var(--font-primary);
  color: var(--theme-text-soft);
}

.navbar__dropdown-title:hover {
  color: var(--theme-text);
}

.navbar__dropdown-title:focus,
.navbar__dropdown-title:focus-visible,
.navbar__dropdown-title:active {
  background: transparent;
  border: none;
  outline: none;
  box-shadow: none;
}

.navbar__dropdown-icon {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease, color 0.25s ease;
  color: currentColor;
  opacity: 0.9;
}

.navbar__dropdown-icon svg {
  width: 100%;
  height: 100%;
}

.navbar__dropdown-icon--open {
  transform: rotate(180deg);
}

.navbar__dropdown-content {
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 240px;
  padding: 0.65rem 0;
  background: linear-gradient(
    180deg,
    rgba(20, 36, 54, 0.98) 0%,
    rgba(14, 30, 46, 0.97) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  box-shadow:
    0 22px 60px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  overflow: hidden;
  z-index: 100;
}

.navbar__dropdown-content::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(203, 164, 94, 0.06),
    transparent 35%
  );
}

.navbar__dropdown-content a {
  position: relative;
  color: var(--theme-text-soft);
  padding: 0.95rem 1.2rem;
  text-decoration: none;
  display: block;
  font-size: 0.78rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.08em;
  transition: all 0.22s ease;
}

.navbar__dropdown-content a:hover,
.navbar__dropdown-content a.dropdown-active {
  background: rgba(255, 255, 255, 0.05);
  color: var(--theme-secondary);
  padding-left: 1.45rem;
}

.navbar__cta {
  border: 1px solid rgba(203, 164, 94, 0.8);
  border-radius: 999px;
  padding: 0.62rem 1.35rem;
  background: linear-gradient(
    180deg,
    rgba(203, 164, 94, 0.12),
    rgba(203, 164, 94, 0.04)
  );
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--theme-secondary) !important;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
}

.navbar__cta:hover {
  background: var(--theme-secondary);
  color: var(--theme-bg) !important;
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(203, 164, 94, 0.22);
}

.navbar__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
}

.navbar__toggle span {
  width: 24px;
  height: 2px;
  background: white;
  transition: 0.3s;
}

.navbar__toggle--active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.navbar__toggle--active span:nth-child(2) {
  opacity: 0;
}

.navbar__toggle--active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.navbar__mobile {
  display: none;
}

@media (max-width: 1024px) {
  .navbar__menu {
    display: none;
  }

  .navbar__toggle {
    display: flex;
  }

  .navbar__mobile {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100vh - 80px);
    background: rgba(14, 30, 46, 0.98);
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 0.8rem;
    overflow-y: auto;
    z-index: 999;
  }

  .navbar__mobile a {
    font-size: 1.05rem;
    text-transform: uppercase;
    font-weight: 700;
    padding: 0.55rem 0;
    color: var(--theme-text-soft);
    text-decoration: none;
    letter-spacing: 0.05em;
  }

  .navbar__mobile a.router-link-active {
    color: var(--theme-secondary);
  }

  .navbar__mobile-divider {
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    margin: 0.6rem 0;
  }

  .navbar__mobile-cta {
    margin-top: 1rem;
    border: 2px solid var(--theme-secondary);
    color: var(--theme-secondary) !important;
    padding: 1rem !important;
    border-radius: 14px;
    text-align: center;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px) scale(0.98);
}
</style>