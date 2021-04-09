<template>
  <div>
    <header class="flex justify-between items-center bg-white border-b p-4 text-gray-700 text-xl font-bold">
      <router-link to="/">Amazon Spapi Document</router-link>
      <a href="https://github.com/mibrsoft/amazon-spapi-document" target="_blank"
         class="text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current w-6 h-6"><title>GitHub</title>
          <path
              d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"></path>
        </svg>
      </a>
    </header>
    <main class="bg-gray-100">
      <div class="pt-8 px-3 flex">
        <div class="hidden md:block flex-none h-full overflow-y-auto top-0 sticky max-h-screen">
          <nav class="w-56 pt-6 pb-12 px-3 h-full">
            <a
                href="javascript:;"
                class="relative flex py-1 px-2 text-white bg-red-400 shadow-sm rounded hover:bg-emerald-700 my-2"
                v-for="(model, idx) in api_array"
                :key="idx"
                @click="navClick(idx)"
            >
              {{ model.name }}
            </a>
          </nav>
        </div>
        <section class="mb-12 max-w-full mx-auto flex-grow" id="swagger-ui-container">
          <div class="flex justify-center" v-if="child_json_collection.length > 0">
            <div
                class="text-white rounded-md flex items-center justify-center bg-red-400 m-2 p-2"
                v-for="(child, idx) in child_json_collection"
                :key="idx"
                @click="childNavClick(idx)"
            >
              {{ child.file_name }}
            </div>
          </div>
          <iframe :src="`/document?url=` + current_url" frameborder="0" class="bg-white p-6 border-gray-300 border h-full w-full"></iframe>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      current_url: '',
      api_array: [],
      child_json_collection: []
    }
  },
  created() {
    fetch('https://api.github.com/repos/amzn/selling-partner-api-models/contents/models').then((modelResponse) => {
      return modelResponse.json()
    }).then((modelResponse) => {
      if (modelResponse.length > 0) {
        let apiArray = [];
        modelResponse.forEach((v, i) => {
          apiArray.push({
            'name': v.name.replace('-api-model', '').replaceAll('-', ' ').replace(/( |^)[a-z]/g, (L) => L.toUpperCase()),
            'path': v.path,
            'json_collection': []
          });
          fetch('https://api.github.com/repos/amzn/selling-partner-api-models/contents/' + v.path).then(jsonResponse => {
            return jsonResponse.json()
          }).then(jsonResponse => {
            if (jsonResponse.length > 0) {
              jsonResponse.forEach((json => {
                if (i == 0) {
                  this.current_url = json.download_url
                }
                apiArray[i].json_collection.push({
                  'download_url': json.download_url,
                  'file_name': json.name
                })
              }))
            }
          });
        })
        this.api_array = apiArray
      }
    });
  },
  methods: {
    navClick(index) {
      let api = this.api_array[index];
      if (api.json_collection.length > 1) {
        this.child_json_collection = api.json_collection;
        return false;
      }
      this.child_json_collection = [];
      this.current_url = api.json_collection[0].download_url
    },
    childNavClick(index) {
      this.current_url = this.child_json_collection[index].download_url
    }
  }
}
</script>
