<template>
  <main class="section-container section-block privacy-page">
    <article class="glass-panel privacy-panel">
      <p class="section-eyebrow">IPN Chile</p>
      <h1>Privacidad</h1>
      <p>Esta página explica qué información envían los formularios de este sitio y qué servicio se utiliza para recibirla.</p>
      <h2>Formulario de contacto</h2>
      <p>Al enviar una consulta o petición de oración, se transmite el tipo de solicitud, región, nombre, correo electrónico, asunto y mensaje para que el equipo de contacto pueda atenderla.</p>
      <p>Incluya únicamente la información necesaria para su solicitud. Evite incorporar datos sensibles o información personal de otras personas que no sea necesaria.</p>
      <h2>Formulario de donaciones</h2>
      <p>El formulario envía su nombre y correo electrónico como solicitud de información y, cuando el envío se completa, muestra los datos de la cuenta para realizar un aporte. Este formulario no procesa pagos ni solicita datos de tarjetas.</p>
      <h2>Servicio de recepción</h2>
      <p>Los formularios transmiten la información a Formspree, un servicio externo de recepción de formularios. Puede consultar su <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">información de privacidad</a>.</p>
      <h2>Consultas sobre sus datos</h2>
      <p>Si necesita consultar por la información que ha enviado o solicitar su corrección o eliminación, escriba a <a href="mailto:contacto@ipnchile.cl">contacto@ipnchile.cl</a>.</p>
      <RouterLink to="/contacto" class="btn-secondary">Ir a contacto</RouterLink>
    </article>
  </main>
</template>

<style scoped>
.privacy-page { min-height: 70vh; }
.privacy-panel { max-width: 850px; margin: 0 auto; padding: clamp(1.25rem, 4vw, 3rem); }
.privacy-panel h1 { font-size: clamp(2.2rem, 5vw, 3.5rem); }
.privacy-panel h2 { margin-top: 2rem; font-size: 1.5rem; }
.privacy-panel p { color: var(--theme-text-soft); line-height: 1.8; }
.privacy-panel a:not(.btn-secondary) { color: var(--theme-secondary); text-decoration: underline; overflow-wrap: anywhere; }
</style>
