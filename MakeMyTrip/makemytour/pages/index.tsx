import SignupDialog from "@/components/ui/signupDialogue";
import { Button } from "@/components/ui/button";
import {
  Bus,
  Calendar,
  Car,
  CreditCard,
  HomeIcon,
  Hotel,
  MapPin,
  Plane,
  QrCode,
  Shield,
  Train,
  Umbrella,
  Users,
} from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

type Flight = {
  id: number;
  flightName: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
};

type HotelData = {
  id: number;
  hotelName: string;
  location: string;
  pricePerNight: number;
};

export default function Home() {
  const router = useRouter();

  const [bookingtype, setbookingtype] = useState("flights");
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [date, setdate] = useState("");
  const [travelers, settravelers] = useState(1);
  const [searchresults, setsearchresult] = useState<any[]>([]);
  const [hotel, sethotel] = useState<HotelData[]>([]);
  const [flight, setflight] = useState<Flight[]>([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const flightD = [
    { id: 1, from: "Delhi", to: "Mumbai", date: "2025-01-15", price: 5000 },
    { id: 2, from: "Mumbai", to: "Bengaluru", date: "2025-01-16", price: 4500 },
    { id: 3, from: "Bengaluru", to: "Delhi", date: "2025-01-17", price: 5500 },
    { id: 4, from: "Delhi", to: "Kolkata", date: "2025-01-18", price: 6000 },
  ];

  const hotelData = [
    { id: 1, name: "Luxury Palace", city: "Mumbai", price: 15000 },
    { id: 2, name: "Comfort Inn", city: "Delhi", price: 8000 },
    { id: 3, name: "Seaside Resort", city: "Goa", price: 12000 },
    { id: 4, name: "Mountain View Hotel", city: "Shimla", price: 10000 },
  ];

  const gethotel = async (): Promise<HotelData[]> => {
    return hotelData.map((h) => ({
      id: h.id,
      hotelName: h.name,
      location: h.city,
      pricePerNight: h.price,
    }));
  };

  const getflight = async (): Promise<Flight[]> => {
    return flightD.map((f) => ({
      id: f.id,
      flightName: `Flight ${f.id}`,
      from: f.from,
      to: f.to,
      departureTime: f.date,
      arrivalTime: new Date(
        new Date(f.date).getTime() + 2 * 60 * 60 * 1000
      ).toISOString(),
      price: f.price,
    }));
  };

  const fetchdata = async () => {
    setError(null);
    try {
      const hoteldata = await gethotel();
      const flightdata = await getflight();

      sethotel(hoteldata);
      setflight(flightdata);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Unable to load travel data."
      );
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const cityOptions = useMemo(() => {
    const cities = new Set<string>();

    flight.forEach((item) => {
      cities.add(item.from);
      cities.add(item.to);
    });

    hotel.forEach((item) => {
      cities.add(item.location);
    });

    return Array.from(cities).map((city) => ({
      value: city,
      label: city,
    }));
  }, [flight, hotel]);

  const handlesearch = () => {
    if (bookingtype === "flights") {
      const results = flight.filter(
        (item) =>
          item.from.toLowerCase() === from.toLowerCase() &&
          item.to.toLowerCase() === to.toLowerCase()
      );

      setsearchresult(results);
    } else {
      const results = hotel.filter(
        (item) => item.location.toLowerCase() === to.toLowerCase()
      );

      setsearchresult(results);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlebooknow = (id: number) => {
    if (bookingtype === "flights") {
      router.push(`/book-flight/${id}`);
    } else {
      router.push(`/book-hotel/${id}`);
    }
  };

  const offers = [
    {
      title: "Domestic Flights",
      description: "Get up to 20% off on domestic flights",
      imageUrl:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800",
    },
    {
      title: "International Hotels",
      description: "Book luxury hotels worldwide",
      imageUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800",
    },
    {
      title: "Holiday Packages",
      description: "Exclusive deals on holiday packages",
      imageUrl:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800",
    },
  ];

  const collections = [
    {
      title: "Stays in & Around Delhi",
      imageUrl:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800",
      tag: "TOP 8",
    },
    {
      title: "Stays in & Around Mumbai",
      imageUrl:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800",
      tag: "TOP 8",
    },
    {
      title: "Stays in & Around Bangalore",
      imageUrl:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800",
      tag: "TOP 9",
    },
    {
      title: "Beach Destinations",
      imageUrl:
        "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?auto=format&fit=crop&w=800",
      tag: "TOP 11",
    },
  ];

  const wonders = [
    {
      title: "Shimla's Best Kept Secret",
      imageUrl:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800",
    },
    {
      title: "Tamil Nadu's Charming Hill Town",
      imageUrl:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800",
    },
    {
      title: "Quaint Little Hill Station in Gujarat",
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800",
    },
    {
      title: "A Pleasant Summer Retreat",
      imageUrl:
        "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800",
    },
  ];

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
        <div className="max-w-xl rounded-xl border border-red-200 bg-white p-8 shadow-lg text-center">
          <p className="text-lg font-semibold text-red-700">Unable to load data</p>
          <p className="mt-2 text-sm text-gray-600">{error}</p>
          <button
            className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => {
              setError(null);
              setloading(true);
              fetchdata();
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=2940&q=80')",
      }}
    >
      <div className="min-h-screen bg-black/40">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-wrap justify-center gap-3">
              <NavItem
                icon={<Plane size={20} />}
                text="Flights"
                active={bookingtype === "flights"}
                onClick={() => {
                  setbookingtype("flights");
                  setsearchresult([]);
                }}
              />

              <NavItem
                icon={<Hotel size={20} />}
                text="Hotels"
                active={bookingtype === "hotels"}
                onClick={() => {
                  setbookingtype("hotels");
                  setsearchresult([]);
                }}
              />

              <NavItem icon={<HomeIcon size={20} />} text="Homestays" />
              <NavItem icon={<Umbrella size={20} />} text="Holiday" />
              <NavItem icon={<Train size={20} />} text="Trains" />
              <NavItem icon={<Bus size={20} />} text="Buses" />
              <NavItem icon={<Car size={20} />} text="Cabs" />
              <NavItem icon={<CreditCard size={20} />} text="Forex" />
              <NavItem icon={<Shield size={20} />} text="Insurance" />
            </div>
          </div>
        </nav>

        <main className="pt-10 pb-20">
          <div className="max-w-7xl mx-auto px-4">

            <div className="text-center text-white mb-10">
              <h1 className="text-4xl md:text-5xl font-bold">
                Book Your Journey
              </h1>
              <p className="mt-3 text-lg">
                Flights, Hotels and more at the best prices
              </p>
              <div className="mt-6 flex justify-center">
                <SignupDialog trigger={<Button className="px-6 py-3">Sign Up</Button>} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg mx-auto max-w-5xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                {bookingtype === "flights" && (
                  <SearchSelect
                    options={cityOptions}
                    placeholder="From"
                    value={from}
                    onChange={setfrom}
                    icon={<MapPin className="text-gray-400" size={20} />}
                    subtitle="Enter city or airport"
                  />
                )}

                <SearchSelect
                  options={cityOptions}
                  placeholder={bookingtype === "flights" ? "To" : "City"}
                  value={to}
                  onChange={setto}
                  icon={<MapPin className="text-gray-400" size={20} />}
                  subtitle={
                    bookingtype === "flights"
                      ? "Enter city or airport"
                      : "Enter city"
                  }
                />

                <SearchInput
                  icon={<Calendar className="text-gray-400" size={20} />}
                  placeholder="Date"
                  value={date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setdate(e.target.value)
                  }
                  subtitle="Select a date"
                  type="date"
                />

                <SearchInput
                  icon={<Users className="text-gray-400" size={20} />}
                  placeholder="Travelers"
                  value={travelers.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    settravelers(parseInt(e.target.value) || 1)
                  }
                  subtitle="Number of travelers"
                  type="number"
                />

                <Button
                  className="h-14 bg-blue-600 hover:bg-blue-700"
                  onClick={handlesearch}
                >
                  SEARCH
                </Button>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Search Results
                </h2>

                {searchresults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchresults.map((result) => (
                      <div
                        key={result.id}
                        className="bg-white rounded-lg shadow p-4 border border-gray-200"
                      >
                        {bookingtype === "flights" ? (
                          <>
                            <p className="font-semibold text-lg">
                              {result.flightName}
                            </p>

                            <h3 className="font-semibold text-lg mt-1">
                              {result.from} → {result.to}
                            </h3>

                            <p className="text-gray-600 mt-2">
                              Departure:{" "}
                              {formatDate(result.departureTime)}
                            </p>

                            <p className="text-gray-600">
                              Arrival: {formatDate(result.arrivalTime)}
                            </p>

                            <p className="text-lg font-bold mt-3">
                              ₹{result.price}
                            </p>

                            <Button
                              className="w-full mt-4"
                              onClick={() => handlebooknow(result.id)}
                            >
                              Book Now
                            </Button>
                          </>
                        ) : (
                          <>
                            <h3 className="font-semibold text-lg">
                              {result.hotelName}
                            </h3>

                            <p className="text-gray-600">
                              City: {result.location}
                            </p>

                            <p className="text-lg font-bold mt-2">
                              ₹{result.pricePerNight} per night
                            </p>

                            <Button
                              className="w-full mt-4"
                              onClick={() => handlebooknow(result.id)}
                            >
                              Book Now
                            </Button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Search for {bookingtype} to see available options.
                  </p>
                )}
              </div>
            </div>

            <section className="my-16">
              <h2 className="text-3xl font-bold mb-8 text-white">
                Best Offers
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offers.map((offer, index) => (
                  <OfferCard key={index} {...offer} />
                ))}
              </div>
            </section>

            <section className="my-16">
              <h2 className="text-3xl font-bold text-white mb-8">
                Handpicked Collections for You
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {collections.map((collection, index) => (
                  <CollectionCard key={index} {...collection} />
                ))}
              </div>
            </section>

            <section className="my-16">
              <h2 className="text-3xl font-bold text-white mb-8">
                Unlock Lesser-Known Wonders of India
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {wonders.map((wonder, index) => (
                  <WonderCard key={index} {...wonder} />
                ))}
              </div>
            </section>

            <DownloadApp />
          </div>
        </main>
      </div>
    </div>
  );
}

function SearchSelect({
  options,
  placeholder,
  value,
  onChange,
  icon,
  subtitle,
}: any) {
  return (
    <div className="border border-gray-300 rounded-lg p-3">
      <div className="flex items-center gap-2">
        {icon}

        <input
          list={`${placeholder}-list`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-semibold w-full bg-transparent outline-none text-gray-800"
          placeholder={placeholder}
        />
      </div>

      <datalist id={`${placeholder}-list`}>
        {options?.map((opt: any, idx: number) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </datalist>

      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function SearchInput({
  icon,
  placeholder,
  value,
  onChange,
  subtitle,
  type = "text",
}: any) {
  return (
    <div className="border border-gray-300 rounded-lg p-3">
      <div className="flex items-center gap-2">
        {icon}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="font-semibold w-full bg-transparent outline-none text-gray-800"
        />
      </div>

      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function NavItem({
  icon,
  text,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
        active
          ? "text-blue-600 bg-blue-50"
          : "text-gray-600 hover:text-blue-600"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm">{text}</span>
    </button>
  );
}

function OfferCard({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">
          {title}
        </h3>

        <p className="text-gray-600 mt-2">
          {description}
        </p>

        <Button className="mt-4">
          Explore Now
        </Button>
      </div>
    </div>
  );
}

function CollectionCard({
  title,
  imageUrl,
  tag,
}: {
  title: string;
  imageUrl: string;
  tag: string;
}) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
        {tag}
      </div>

      <h3 className="absolute bottom-4 left-4 right-4 text-white text-lg font-bold">
        {title}
      </h3>
    </div>
  );
}

function WonderCard({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      <h3 className="absolute bottom-4 left-4 right-4 text-white text-lg font-bold">
        {title}
      </h3>
    </div>
  );
}

function DownloadApp() {
  return (
    <section className="bg-white rounded-xl shadow-lg p-8 my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Download App Now!
          </h2>

          <p className="text-gray-600 mt-3">
            Get India's #1 travel super app with the best deals
            on flights, hotels and holidays.
          </p>

          <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-2">
              <Shield className="text-blue-600" />
              <span>Secure Booking</span>
            </div>

            <div className="flex items-center gap-2">
              <CreditCard className="text-blue-600" />
              <span>Easy Payment</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <QrCode size={120} className="text-gray-800" />

          <p className="mt-3 text-gray-600">
            Scan QR code to download the app
          </p>
        </div>
      </div>
    </section>
  );
}

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />

        <p className="mt-4 text-gray-600">
          Loading MakeMyTour...
        </p>
      </div>
    </div>
  );
}