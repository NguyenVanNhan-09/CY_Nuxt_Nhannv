import type {NuxtPage} from '@nuxt/schema'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-08',
    hooks: {
        'pages:extend'(pages) {
            // add a route
            pages.push(
                {
                    name: 'Product__Index',
                    path: '/product',
                    file: '~/custom-pages/products/index.vue'
                },
                {
                    name: 'News__Index',
                    path: '/news',
                    file: '~/custom-pages/news/index.vue'
                },
                {
                    name: 'login',
                    path: '/login',
                    file: '~/custom-pages/login/Login.vue'
                },
                {
                    name: 'News__Index_Vn',
                    path: '/tin-tuc',
                    file: '~/custom-pages/news/index.vue'
                },
            )

            // remove routes
            function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
                const pagesToRemove: NuxtPage[] = []
                for (const page of pages) {
                    if (page.file && pattern.test(page.file)) {
                        pagesToRemove.push(page)
                    } else {
                        removePagesMatching(pattern, page.children)
                    }
                }
                for (const page of pagesToRemove) {
                    pages.splice(pages.indexOf(page), 1)
                }
            }

            removePagesMatching(/\.ts$/, pages)
        }
    },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
