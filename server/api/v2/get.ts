import axios from "axios";

export default defineEventHandler(async (e) => {
    const API_KEY = process.env.API_KEY;
    const { topic, page = 1, limit = 6 } = getQuery(e);
    const from = "2024-10-09";
    const sortBy = "publishedAt";
    const q = topic || "tesla";

    // url với phân trang
    const URL = `https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=${sortBy}&page=${page}&pageSize=${limit}&apiKey=${API_KEY}`;
    try {
        const res = await axios.get(URL);
        return res.data.articles;
    } catch (error) {
        console.error("Error fetching news:", error);
        return { error: "Failed to fetch news" };
    }
});
