import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import NewsCard from "../../components/shared/NewsCard";
import allNewsData from "../../mockDatas/allNews.json";
import {
  Search,
  TrendingUp,
  Calendar,
  Filter,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Breadcrumb from "../../components/shared/Breadcrumb";

const AllNewsPage = () => {
  // States
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest', 'oldest', 'popular'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const breadcrumbItems = [
    { label: "Ana Səhifə", path: "/" },
    { label: "Xəbərlər" },
  ];

  // Derived Data: Categories with counts
  const categories = useMemo(() => {
    const counts = { All: allNewsData.length };
    allNewsData.forEach((news) => {
      counts[news.category] = (counts[news.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  // Derived Data: Popular News (Top 5)
  const popularNews = useMemo(() => {
    return [...allNewsData]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5);
  }, []);

  // Filtered & Sorted News
  const filteredNews = useMemo(() => {
    let result = [...allNewsData];

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter((news) => news.category === selectedCategory);
    }

    // Filter by Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (news) =>
          news.title.toLowerCase().includes(query) ||
          news.content.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortOrder === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === "popular") {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return result;
  }, [sortOrder, searchQuery, selectedCategory]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder, searchQuery, selectedCategory]);

  // Get current page items
  const currentNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredNews]);

  // Pagination Handler
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bütün Xəbərlər
              </h1>
              <p className="text-gray-500 mt-1">
                Amasya və bölgəmizdən ən son yenilikləri izləyin
              </p>
            </div>
          </div>
        </div>
      </div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content Area (Left) */}
          <div className="lg:w-8/12 xl:w-9/12">
            {/* Toolbar: Sort & Result Count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-semibold text-gray-900">
                  {filteredNews.length}
                </span>
                <span>xəbər tapıldı</span>
                {selectedCategory !== "All" && (
                  <span className="text-sm bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                    #{selectedCategory}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="newest">Ən yeni</option>
                  <option value="oldest">Ən köhnə</option>
                  <option value="popular">Ən çox oxunan</option>
                </select>
              </div>
            </div>

            {/* News Grid */}
            {currentNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentNews.map((news) => (
                  <NewsCard key={news._id} news={news} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Nəticə tapılmadı
                </h3>
                <p className="text-gray-500 mt-2">
                  Axtarış kriteriyalarınıza uyğun xəbər yoxdur.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 text-blue-600 font-medium hover:underline"
                >
                  Bütün xəbərləri göstər
                </button>
              </div>
            )}

            {/* Functional Pagination */}
            {filteredNews.length > itemsPerPage && (
              <div className="mt-10 flex justify-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Əvvəlki</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={cn(
                          "w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="hidden sm:inline">Sonrakı</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (Right) */}
          <aside className="lg:w-4/12 xl:w-3/12 space-y-8">
            {/* Search Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                Axtarış
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Xəbər axtar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-600" />
                Kateqoriyalar
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200",
                      selectedCategory === cat.name
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                    )}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-md text-xs",
                        selectedCategory === cat.name
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular News Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Çox Oxunanlar
              </h3>
              <div className="space-y-6">
                {popularNews.map((news, index) => (
                  <Link
                    key={news._id}
                    to={`/news/${news.slug}`}
                    className="group flex gap-4 items-start"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg">
                        #{index + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                        {news.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <time>
                          {new Date(news.createdAt).toLocaleDateString("az-AZ")}
                        </time>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AllNewsPage;
