import { fetchConfirmedNews } from '@/pages/News/services/newsService'

export const fetchLatestNews = async () => {
  const news = await fetchConfirmedNews()
  return news
}

