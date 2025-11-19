import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const SelectedRestaurant = () => {
  const { id } = useParams();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const displayReviews = useMemo(() => {
    if (!selectedRestaurant?.reviews) return [];
    if (Array.isArray(selectedRestaurant.reviews)) {
      return selectedRestaurant.reviews.slice(0, 3);
    }
    return [selectedRestaurant.reviews];
  }, [selectedRestaurant]);

  useEffect(() => {
    const getRestaurantById = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get( `${process.env.BASE_URL}/api/restaurants${id}` ||
          `http://localhost:4444/api/restaurants/${id}`
        );
        console.log(response.data.restaurant)
        setSelectedRestaurant(response.data.restaurant);
      } catch (fetchError) {
        setError(
          fetchError.response?.data?.message ||
            "Unable to load restaurant details right now."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getRestaurantById();
    }
  }, [id]);

  const coverImageSrc = selectedRestaurant?.coverImage
    ? `${process.env.BASE_URL}${selectedRestaurant.coverImage}`
    : `http://localhost:4444${selectedRestaurant.coverImage}`;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        {isLoading && (
          <div className="space-y-4 rounded-3xl bg-white p-6 shadow-lg">
            <div className="h-8 w-64 animate-pulse rounded-full bg-slate-200" />
            <div className="h-72 w-full animate-pulse rounded-3xl bg-slate-200" />
            <div className="grid gap-4 md:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="h-40 animate-pulse rounded-2xl bg-slate-200"
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
            {error}
          </div>
        )}

        {!isLoading && !error && selectedRestaurant && (
          <div className="space-y-10">
            <header className="rounded-3xl bg-gradient-to-br from-amber-100 via-white to-orange-100 p-8 shadow-lg">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.3em] text-amber-500">
                    Featured Restaurant
                  </p>
                  <h1 className="text-4xl font-bold capitalize">
                    {selectedRestaurant.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                    <span className="rounded-full bg-red-500 text-white px-3 py-1 capitalize">
                      {selectedRestaurant.cusine || "Multi-cuisine"}
                    </span>
                    <span className="rounded-full bg-green-500 text-white px-3 py-1">
                      {selectedRestaurant.restaurantStatus || "Open Now"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-white transition bg-blue-600 hover:border-slate-900 hover:text-slate-900">
                    Share
                  </button>
                  <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Order Online
                  </button>
                </div>
              </div>
            </header>

            <section className="grid gap-8 lg:grid-cols-[3fr,2fr]">
              <div className="space-y-6 rounded-3xl bg-white p-6 shadow-lg">
                <div className="overflow-hidden rounded-3xl">
                  <img
                    className="h-80 w-full rounded-3xl object-cover"
                    src={coverImageSrc}
                    alt={selectedRestaurant.name}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Address
                    </p>
                    <p className="mt-2 text-sm text-slate-700 capitalize">
                      {selectedRestaurant.address || "Address coming soon"}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Contact
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {selectedRestaurant.contact || "Not available"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {selectedRestaurant.email || "Email not provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl bg-white p-6 shadow-lg">
                  <h2 className="text-lg font-semibold">Quick Facts</h2>
                  <dl className="mt-4 space-y-4 text-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <dt className="text-slate-500">Cuisines</dt>
                      <dd className="font-semibold capitalize">
                        {selectedRestaurant.cusine || "Multi-cuisine"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <dt className="text-slate-500">Status</dt>
                      <dd className="font-semibold">
                        {selectedRestaurant.restaurantStatus || "Open"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-500">Reviews</dt>
                      <dd className="font-semibold">
                        {Array.isArray(selectedRestaurant.reviews)
                          ? `${selectedRestaurant.reviews.length} reviews`
                          : selectedRestaurant.reviews || "No reviews yet"}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
                  <h3 className="text-lg font-semibold">What guests say</h3>
                  {displayReviews.length > 0 ? (
                    <ul className="mt-4 space-y-4 text-sm text-white/80">
                      {displayReviews.map((review, index) => (
                        <li key={index} className="rounded-2xl bg-white/10 p-4">
                          “{review}”
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-white/70">
                      Reviews will appear once guests start sharing their
                      experiences.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {selectedRestaurant.images?.length > 0 && (
              <section className="rounded-3xl bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Gallery
                    </p>
                    <h2 className="text-2xl font-semibold">
                      A quick peek inside
                    </h2>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedRestaurant.images.map((imagePath, index) => (
                    <div
                      key={imagePath}
                      className="group overflow-hidden rounded-2xl"
                    >
                      <img
                        className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                        src={`${process.env.BASE_URL}${imagePath}` || `http://localhost:4444${imagePath}`}
                        alt={`${selectedRestaurant.name} image ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedRestaurant;
