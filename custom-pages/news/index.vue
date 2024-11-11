<script setup lang="ts">

definePageMeta({
  middleware: ("auth2")
})

import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import axios from "axios";

const topic = ref("tesla");
const loading = ref(false);
const page = ref(1);
const news = ref([]);

// Hàm gọi API để lấy tin tức
const fetchNews = async () => {
  try {
    loading.value = true;
    const res = await axios.get(`api/v2/get?topic=${topic.value}&page=${page.value}`);
    if (res) {
      loading.value = false;
      news.value.push(...res.data);
    }
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
};

// Hàm tìm kiếm
const onSearch = async () => {
  page.value = 1;
  news.value = [];
  await fetchNews();
};

// Theo dõi sự thay đổi của số trang để tải dữ liệu mới
watch(page, () => {
  fetchNews();
});

onMounted(() => {
  fetchNews();

  const onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !loading.value) {
      page.value += 1;
    }
  };

  window.addEventListener("scroll", onScroll);

  // clear sự kiên khi bị hủy
  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
  });
});
</script>

<template>
  <div class="max-w-screen-xl mx-auto">
    <!-- Form tìm kiếm -->
    <form @submit.prevent="onSearch" class="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
      <input
          id="topic"
          name="topic"
          v-model="topic"
          type="text"
          placeholder="Search anything"
          class="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0">
      <button type="submit" class="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3">
        Search
      </button>
    </form>

    <section class="text-gray-600 body-font">
      <div class="container px-5 py-5 mx-auto max-w-7x1">
        <div class="flex flex-wrap w-full mb-4 p-4">
          <div class="w-full mb-6 lg:mb-0">
            <h1 class="sm:text-4xl text-5xl font-bold title-font mb-2 text-gray-900">News</h1>
            <div class="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
        </div>

        <div v-show="loading" class="flex-col gap-4 w-full flex items-center justify-center">
          <div class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
        </div>

        <div>
          <div v-if="news.length > 0" class="flex flex-wrap -m-4">
            <div v-for="n in news" :key="n.url" class="xl:w-1/3 md:w-1/2 p-4">
              <a :href="n?.url" class="bg-white p-6 rounded-lg">
                <img class="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6" :src="n.urlToImage ? n.urlToImage : 'https://images.assetsdelivery.com/compings_v2/koblizeek/koblizeek2204/koblizeek220400315.jpg'" alt="Image Size 720x400">
                <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">{{ n.author ? n.author : "Anonymous" }}</h3>
                <h2 class="text-lg text-gray-900 font-medium title-font mb-4 truncate">{{ n.title ? n.title : "no title"}}</h2>
                <p class="leading-relaxed text-base line-clamp-3">{{ n.description ? n.description : "no description" }}</p>
              </a>
            </div>
          </div>
          <div v-else class="text-center text-gray-600 py-10">
            <p>No results found for your search.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>
