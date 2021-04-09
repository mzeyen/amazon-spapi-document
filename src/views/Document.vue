<template>
  <div>
    <div id="swagger-ui"></div>
  </div>
</template>

<script>
import SwaggerUI from 'swagger-ui'
import Standalone from 'swagger-ui/dist/swagger-ui-standalone-preset'

export default {
  name: 'Document',
  mounted() {
    SwaggerUI({
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUI.presets.apis,
        Standalone
      ],
      plugins: [
        SwaggerUI.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout",
      displayOperationId: true,
      filter: true,
      showExtensions: true,
      tryItOutEnabled: false
    })
  }
}
</script>