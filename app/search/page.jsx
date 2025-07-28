"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header10 from "../../components/header/header-10";
import DefaultFooter from "../../components/footer/default";
import CallToActions from "../../components/common/CallToActions";
import SearchResults from "../../components/search/SearchResults";
import { axiosMLService } from "../../utils/axios/axios";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const searchKeyword = searchParams.get("keyword");
    if (searchKeyword) {
      setKeyword(searchKeyword);
      performSearch(searchKeyword);
    }
  }, [searchParams]);

  const performSearch = async (searchKeyword) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosMLService.get(`/ads/search`, {
        params: {
          keyword: searchKeyword,
          limit: 20,
        },
      });

      // Handle the response - check if it's an array or has a message
      if (response.data && Array.isArray(response.data)) {
        setSearchResults(response.data);
      } else if (response.data && response.data.message) {
        // Backend returned a message indicating no results
        setSearchResults([]);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = (newKeyword) => {
    if (newKeyword.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(newKeyword.trim())}`);
    }
  };

  return (
    <>
      <div className="header-margin"></div>
      <Header10 />

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Search Header */}
              <div className="bg-white shadow-1 rounded-4 p-30 mb-30">
                <div className="row items-center">
                  <div className="col-lg-6">
                    <h2 className="text-22 fw-500 mb-10">
                      {keyword
                        ? `Search Results for "${keyword}"`
                        : "Search Ads"}
                    </h2>
                    {!loading && searchResults.length > 0 && (
                      <p className="text-15 text-light-1">
                        Found {searchResults.length} result
                        {searchResults.length !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                  <div className="col-lg-6">
                    {/* New Search Box */}
                    <div className="searchMenu-date">
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control flex-grow-1"
                          placeholder="Search for ads..."
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleNewSearch(keyword);
                            }
                          }}
                          style={{ height: "50px" }}
                        />
                        <button
                          className="button -blue-1 py-15 px-20 h-50 ml-10 rounded-4 bg-dark-1 text-white"
                          onClick={() => handleNewSearch(keyword)}
                        >
                          <i className="icon-search text-16" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Results */}
              <div className="row">
                <div className="col-12">
                  {loading && (
                    <div className="text-center py-40">
                      <div className="spinner-border text-primary">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-15">Searching...</p>
                    </div>
                  )}

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      <i className="icon-alert-circle mr-10"></i>
                      {error}
                    </div>
                  )}

                  {!loading &&
                    !error &&
                    searchResults.length === 0 &&
                    keyword && (
                      <div className="text-center py-40">
                        <i className="icon-search text-60 text-light-1 mb-20"></i>
                        <h4 className="text-18 fw-500 mb-10">
                          No results found
                        </h4>
                        <p className="text-15 text-light-1">
                          Try adjusting your search keywords or browse our
                          categories
                        </p>
                      </div>
                    )}

                  {!loading && !error && searchResults.length > 0 && (
                    <SearchResults results={searchResults} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToActions />
      <DefaultFooter />
    </>
  );
};

export default SearchPage;
