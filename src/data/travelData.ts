export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'Europe' | 'Asia' | 'Middle East';
  image: string;
  startingPrice: number;
  rating: number;
  reviewsCount: number;
  tagline: string;
  description: string;
  bestSeason: string;
  climate: string;
  currency: string;
  language: string;
  visaPolicy: string;
  highlights: string[];
  gallery: string[];
}

export interface TravelPackage {
  id: string;
  title: string;
  destinationId: string;
  destinationName: string;
  country: string;
  category: 'Luxury' | 'Honeymoon' | 'Family' | 'Adventure' | 'Budget' | 'Weekend';
  durationDays: number;
  durationNights: number;
  destinationsCount: number;
  image: string;
  pricePerPerson: number;
  originalPrice: number;
  accommodationType: string;
  mealsIncluded: string;
  transportation: string;
  rating: number;
  reviewsCount: number;
  availableDates: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
}

export interface Hotel {
  id: string;
  name: string;
  destinationId: string;
  city: string;
  country: string;
  category: 'Luxury Resort' | 'Overwater Villa' | 'Boutique Hotel' | 'Mountain Lodge' | 'Modern Suite';
  image: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  amenities: string[];
  description: string;
  rooms: {
    id: string;
    name: string;
    capacity: number;
    bedType: string;
    sizeSqM: number;
    pricePerNight: number;
    amenities: string[];
  }[];
}

export interface DiningExperience {
  id: string;
  name: string;
  destination: string;
  country: string;
  category: 'Street Food Tour' | 'Fine Dining' | 'Cooking Class' | 'Traditional Feast' | 'Vineyard Tasting';
  image: string;
  pricePerPerson: number;
  duration: string;
  dietary: ('Halal' | 'Vegetarian' | 'Vegan' | 'Gluten-Free')[];
  description: string;
  featuredDishes: string[];
  location: string;
}

export interface Attraction {
  id: string;
  name: string;
  destination: string;
  country: string;
  category: 'Historical Landmark' | 'Natural Wonder' | 'Adventure' | 'Cultural' | 'Scenic Viewpoint';
  ticketPrice: number;
  suggestedDuration: string;
  image: string;
  rating: number;
  familySuitable: boolean;
  description: string;
  travelTips: string;
}

export interface VisaInfo {
  destinationCountry: string;
  visaTypes: {
    type: 'Tourist Visa' | 'Business Visa' | 'E-Visa' | 'Family Visit';
    processingTime: string;
    govFee: number;
    serviceFee: number;
    validity: string;
    checklist: string[];
  }[];
  generalRequirements: string[];
}

export interface BookingRecord {
  id: string;
  type: 'package' | 'hotel' | 'visa' | 'itinerary';
  title: string;
  destination: string;
  bookingDate: string;
  travelDate: string;
  travelersCount: number;
  totalAmount: number;
  status: 'Confirmed' | 'Processing' | 'Completed' | 'Cancelled';
  customerName: string;
  customerEmail: string;
  details: Record<string, any>;
}

// Visual asset imports from generated high-fidelity images
import heroSwissImg from '../assets/images/hero_swiss_alps_1792611749491.jpg';
import maldivesImg from '../assets/images/dest_maldives_resort_1792611750813.jpg';
import kyotoImg from '../assets/images/dest_kyoto_japan_1792611751684.jpg';
import cappadociaImg from '../assets/images/dest_cappadocia_turkey_1792611751342.jpg';
import baliImg from '../assets/images/dest_bali_temple_1792611814231.jpg';
import dubaiImg from '../assets/images/dest_dubai_skyline_1792611815330.jpg';
import skarduImg from '../assets/images/dest_skardu_mountains_1792611814341.jpg';
import culinaryImg from '../assets/images/food_culinary_spread_1792611815116.jpg';

export const DESTINATIONS: Destination[] = [
  {
    id: 'switzerland',
    name: 'Swiss Alps & Scenic Valleys',
    country: 'Switzerland',
    region: 'Europe',
    image: heroSwissImg,
    startingPrice: 1850,
    rating: 4.96,
    reviewsCount: 342,
    tagline: 'Snow-capped peaks, glacier express trains & alpine serenity',
    description: 'Experience the pinnacle of European alpine luxury with legendary panoramic train journeys, crystal turquoise lakes, and world-class chalet hospitality in Zermatt, Interlaken, and Lucerne.',
    bestSeason: 'June – September (Summer) & Dec – March (Skiing)',
    climate: 'Alpine continental with crisp mountain air',
    currency: 'CHF (Swiss Franc)',
    language: 'German, French, Italian, English widely spoken',
    visaPolicy: 'Schengen Visa required for non-EU/EEA nationals',
    highlights: ['Glacier Express Scenic Rail', 'Matterhorn Sunrise Viewpoint', 'Lake Lucerne Steamer Cruise', 'Grindelwald First Cliff Walk'],
    gallery: [heroSwissImg, maldivesImg, cappadociaImg]
  },
  {
    id: 'turkey',
    name: 'Istanbul & Cappadocia',
    country: 'Turkey',
    region: 'Europe',
    image: cappadociaImg,
    startingPrice: 1120,
    rating: 4.92,
    reviewsCount: 520,
    tagline: 'Hot air balloon sunrises, fairy chimneys & Ottoman grandeur',
    description: 'A seamless crossroads of continents where Byzantine domes and Ottoman palaces in Istanbul meet the surreal rock valleys and sunrise balloon flights of Cappadocia.',
    bestSeason: 'April – June & September – November',
    climate: 'Mediterranean and semi-arid plateau',
    currency: 'TRY (Turkish Lira)',
    language: 'Turkish (English common in tourist hubs)',
    visaPolicy: 'E-Visa available online for 100+ eligible nationalities',
    highlights: ['Sunrise Balloon Flight in Göreme', 'Hagia Sophia & Blue Mosque', 'Bosphorus Sunset Yacht Cruise', 'Underground Cave Cities'],
    gallery: [cappadociaImg, culinaryImg, heroSwissImg]
  },
  {
    id: 'japan',
    name: 'Kyoto & Tokyo Heritage',
    country: 'Japan',
    region: 'Asia',
    image: kyotoImg,
    startingPrice: 2190,
    rating: 4.98,
    reviewsCount: 489,
    tagline: 'Ancient shrines, cherry blossoms & hyper-modern harmony',
    description: 'Immerse yourself in timeless Japanese aesthetics—from Kyoto’s tranquil bamboo groves and centuries-old wooden pagodas to Tokyo’s Michelin-starred gastronomic districts.',
    bestSeason: 'March – May (Sakura) & Oct – November (Autumn Foliage)',
    climate: 'Temperate with distinct four seasons',
    currency: 'JPY (Japanese Yen)',
    language: 'Japanese (English signage nationwide)',
    visaPolicy: 'Visa waiver for 70+ nations; eVisa available for tourists',
    highlights: ['Fushimi Inari 10,000 Torii Gates', 'Gion Geisha District Walking Tour', 'Shinkansen Bullet Train Experience', 'Kaiseki Multi-course Dining'],
    gallery: [kyotoImg, heroSwissImg, baliImg]
  },
  {
    id: 'maldives',
    name: 'North Atoll Luxury Atolls',
    country: 'Maldives',
    region: 'Asia',
    image: maldivesImg,
    startingPrice: 2450,
    rating: 4.97,
    reviewsCount: 298,
    tagline: 'Private overwater bungalows & pristine turquoise lagoons',
    description: 'The ultimate tropical sanctuary. Private overwater pavilions perched above vibrant coral gardens, world-class marine safaris, and barefoot luxury at its most sublime.',
    bestSeason: 'November – April (Dry Northeast Monsoon)',
    climate: 'Tropical warm marine, 28°C–32°C year-round',
    currency: 'MVR / USD widely accepted',
    language: 'Dhivehi & English',
    visaPolicy: 'Free 30-day tourist visa on arrival for all nationalities',
    highlights: ['Private Sunset Lagoon Cruise', 'Manta Ray & Whale Shark Snorkel', 'Subsurface Coral Dining', 'Couples Spa by the Reef'],
    gallery: [maldivesImg, baliImg, dubaiImg]
  },
  {
    id: 'bali',
    name: 'Ubud Temples & Coastlines',
    country: 'Indonesia',
    region: 'Asia',
    image: baliImg,
    startingPrice: 940,
    rating: 4.89,
    reviewsCount: 610,
    tagline: 'Misty water temples, lush jungle retreats & vibrant surf',
    description: 'Discover the Island of the Gods. Explore terraced emerald rice paddies, sacred water temples shrouded in morning mist, healing wellness sanctuaries, and golden surf beaches.',
    bestSeason: 'April – October (Dry Season)',
    climate: 'Tropical humid with refreshing coastal breezes',
    currency: 'IDR (Indonesian Rupiah)',
    language: 'Indonesian & Balinese (English fluent in tourism)',
    visaPolicy: 'Visa on Arrival (VoA) and e-VoA for 90+ countries ($35 USD)',
    highlights: ['Ulun Danu Beratan Water Temple', 'Tegallalang Stepped Rice Terraces', 'Ubud Royal Palace & Art Markets', 'Jimbaran Bay Sunset Seafood'],
    gallery: [baliImg, maldivesImg, culinaryImg]
  },
  {
    id: 'dubai',
    name: 'Downtown & Arabian Dunes',
    country: 'United Arab Emirates',
    region: 'Middle East',
    image: dubaiImg,
    startingPrice: 1350,
    rating: 4.91,
    reviewsCount: 440,
    tagline: 'Futuristic architectural wonders & Arabian desert safaris',
    description: 'A playground of ambition and luxury. Ascend the world’s tallest tower, shop in premier fashion avenues, sail along Dubai Marina, and dine under desert starlight.',
    bestSeason: 'November – March (Pleasant 24°C weather)',
    climate: 'Desert subtropical with sunshine guaranteed',
    currency: 'AED (UAE Dirham)',
    language: 'Arabic (English is the universal business lingua franca)',
    visaPolicy: 'Visa on arrival for EU, US, UK, GCC & fast eVisa online',
    highlights: ['Burj Khalifa At The Top Observation', 'Luxury Desert Safari & Dune Bashing', 'Dubai Mall Fountain Choreography', 'Marina Yacht Cruise at Dusk'],
    gallery: [dubaiImg, cappadociaImg, skarduImg]
  },
  {
    id: 'skardu',
    name: 'Hunza & Skardu Valleys',
    country: 'Northern Pakistan',
    region: 'Asia',
    image: skarduImg,
    startingPrice: 980,
    rating: 4.95,
    reviewsCount: 275,
    tagline: 'Karakoram giants, apricot blossom valleys & crystal rivers',
    description: 'An untouched mountain wonderland nestled beneath K2 and the Karakoram range. Marvel at snow-draped fortress valleys, high-altitude Deosai plains, and ancient Silk Route hospitality.',
    bestSeason: 'May – October (Blossom in Spring, golden Autumn)',
    climate: 'High-altitude mountain alpine, cool dry summers',
    currency: 'PKR (Pakistani Rupee)',
    language: 'Urdu, Balti, Shina & English',
    visaPolicy: 'Pakistan Online Visa System (e-Visa approved within 48-72h)',
    highlights: ['Shangrila & Upper Kachura Lake', 'Deosai National Park Plateau', 'Altit & Baltit Fortresses in Hunza', 'Attabad Lake Turquoise Waters'],
    gallery: [skarduImg, heroSwissImg, culinaryImg]
  }
];

export const PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-swiss-grandeur',
    title: 'Alpine Grandeur & Panoramic Rail Tour',
    destinationId: 'switzerland',
    destinationName: 'Swiss Alps',
    country: 'Switzerland',
    category: 'Luxury',
    durationDays: 7,
    durationNights: 6,
    destinationsCount: 3,
    image: heroSwissImg,
    pricePerPerson: 2850,
    originalPrice: 3300,
    accommodationType: '5-Star Historic Alpine Resorts',
    mealsIncluded: 'Daily Gourmet Breakfast + 4 Fine-Dining Dinners',
    transportation: '1st Class Swiss Rail Pass & Private Airport Transfers',
    rating: 4.98,
    reviewsCount: 114,
    availableDates: ['2026-11-15', '2026-12-05', '2027-01-10', '2027-02-14'],
    inclusions: [
      '6 nights in 5-star mountain chalet resorts (Zermatt & Lucerne)',
      '1st Class Glacier Express and GoldenPass Panoramic train tickets',
      'Daily artisan Swiss breakfast buffet',
      'Matterhorn Glacier Paradise cable car priority pass',
      'Lake Lucerne private vintage steamer cruise with sommelier',
      'Personal bilingual concierge available 24/7'
    ],
    exclusions: [
      'International flights to/from Zurich (ZRH)',
      'Personal travel insurance (available as add-on)',
      'Optional heli-skiing excursions'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zurich & Transfer to Lucerne',
        description: 'Private chauffeur pickup at Zurich Airport, luxury ride to Lucerne lakeside palace hotel, welcome champagne briefing.',
        activities: ['Chauffeur transfer', 'Check-in Lucerne Palace', 'Lakeside promenade stroll']
      },
      {
        day: 2,
        title: 'Mount Pilatus & Vintage Lake Steamer',
        description: 'Ride the world’s steepest cogwheel railway to Pilatus summit, followed by private afternoon cruise on Lake Lucerne.',
        activities: ['Pilatus Cogwheel train', 'Panoramic summit views', 'Fondue tasting on steamer']
      },
      {
        day: 3,
        title: 'The Legendary Glacier Express to Zermatt',
        description: 'Board the iconic Glacier Express in excellence class. Traverse dramatic gorges, 91 tunnels, and 291 bridges.',
        activities: ['First-class scenic train carriage', '3-course lunch on board', 'Check-in Zermatt luxury chalet']
      },
      {
        day: 4,
        title: 'Matterhorn Glacier Paradise Summit',
        description: 'Ascend to Europe’s highest cable car station at 3,883m. Explore glacial ice palaces and panoramic viewing platforms.',
        activities: ['Matterhorn cable car', 'Glacier palace ice sculptures', 'Sunset photography session']
      },
      {
        day: 5,
        title: 'Gornergrat Alpine Vista & Gourmet Tasting',
        description: 'Ride the Gornergrat open-air cogwheel railway for uninterrupted vistas of 29 four-thousand-meter peaks.',
        activities: ['Gornergrat railway', 'Alpine herb tasting lunch', 'Chalet wellness & spa evening']
      },
      {
        day: 6,
        title: 'Interlaken & Valley of 72 Waterfalls',
        description: 'Excursion through Lauterbrunnen valley, surrounded by towering limestone cliffs and cascading falls.',
        activities: ['Lauterbrunnen falls walk', 'Swiss chocolate atelier workshop', 'Farewell gala dinner']
      },
      {
        day: 7,
        title: 'Departure via Zurich',
        description: 'Private first-class rail transfer back to Zurich Airport for international flight departure.',
        activities: ['Breakfast at leisure', 'Scenic rail to Zurich Airport']
      }
    ]
  },
  {
    id: 'pkg-cappadocia-wonders',
    title: 'Cappadocia Sunrise & Ottoman Splendor',
    destinationId: 'turkey',
    destinationName: 'Istanbul & Cappadocia',
    country: 'Turkey',
    category: 'Honeymoon',
    durationDays: 6,
    durationNights: 5,
    destinationsCount: 2,
    image: cappadociaImg,
    pricePerPerson: 1650,
    originalPrice: 1980,
    accommodationType: 'Luxury Cave Suite & Bosphorus Mansion',
    mealsIncluded: 'All Breakfasts, 3 Traditional Lunches & 2 Special Dinners',
    transportation: 'Domestic Flights Included + VIP Mercedes Sprinter',
    rating: 4.95,
    reviewsCount: 188,
    availableDates: ['2026-11-10', '2026-11-24', '2026-12-12', '2027-01-08'],
    inclusions: [
      '3 nights in Museum Cave Hotel (Cappadocia) & 2 nights in Istanbul Bosphorus hotel',
      'VIP sunrise hot air balloon flight with champagne celebration',
      'Domestic flights Istanbul – Kayseri – Istanbul',
      'Private yacht charter sunset cruise along the Bosphorus strait',
      'Private guided tours of Hagia Sophia, Topkapi Palace & Basilica Cistern',
      'Traditional Turkish Hammam spa ritual for two'
    ],
    exclusions: ['International flights', 'Gratuities for guides and drivers', 'Personal shopping expenses'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Istanbul & Sunset Bosphorus Cruise',
        description: 'Arrive at Istanbul Grand Airport, private transfer to historic hotel, board private evening motor yacht on the Bosphorus.',
        activities: ['Airport VIP pickup', 'Check-in', 'Private sunset yacht with meze']
      },
      {
        day: 2,
        title: 'Byzantine & Ottoman Heritage Walking Tour',
        description: 'Explore the storied Hagia Sophia, Blue Mosque, Grand Bazaar spice alleys, and Sultanahmet historical monuments.',
        activities: ['Hagia Sophia private tour', 'Spice Bazaar immersion', 'Traditional Turkish coffee tasting']
      },
      {
        day: 3,
        title: 'Flight to Cappadocia & Sunset Valleys',
        description: 'Fly to Cappadocia, check into carved cliffside cave suite. Sunset champagne toast overlooking Pigeon Valley.',
        activities: ['Domestic flight', 'Cave hotel check-in', 'Valley sunset toast']
      },
      {
        day: 4,
        title: 'Bucket-List Sunrise Hot Air Balloon Flight',
        description: 'Float over fairy chimneys at dawn with hundreds of balloons, followed by exploring underground cities and Göreme open-air museum.',
        activities: ['Sunrise balloon flight', 'Champagne celebration', 'Derinkuyu underground city']
      },
      {
        day: 5,
        title: 'Pottery Ateliers & Turkish Night',
        description: 'Visit artisan terracotta studios in Avanos, hike through Love Valley, and enjoy live folk music & dinner.',
        activities: ['Avanos pottery masterclass', 'Valley hike', 'Anatolian feast dinner']
      },
      {
        day: 6,
        title: 'Return to Istanbul & Departure',
        description: 'Morning flight back to Istanbul for connecting international departure.',
        activities: ['Breakfast on cave terrace', 'Flight to Istanbul airport']
      }
    ]
  },
  {
    id: 'pkg-maldives-serenity',
    title: 'Maldives Overwater Paradise Retreat',
    destinationId: 'maldives',
    destinationName: 'North Atoll',
    country: 'Maldives',
    category: 'Luxury',
    durationDays: 5,
    durationNights: 4,
    destinationsCount: 1,
    image: maldivesImg,
    pricePerPerson: 3200,
    originalPrice: 3800,
    accommodationType: 'Overwater Villa with Private Infinity Plunge Pool',
    mealsIncluded: 'All-Inclusive Fine Dining (Breakfast, Lunch, 4-Course Dinner & Drinks)',
    transportation: 'Scenic Twin-Otter Seaplane Transfers',
    rating: 4.99,
    reviewsCount: 96,
    availableDates: ['2026-11-20', '2026-12-15', '2027-01-20', '2027-02-10'],
    inclusions: [
      '4 nights in Sunset Overwater Villa with glass floor viewing panels',
      'Round-trip seaplane flight between Velana Airport (MLE) and resort island',
      'All-inclusive premium beverages and à la carte dining in 4 specialty restaurants',
      'Guided house-reef snorkeling safari with marine biologist',
      'Complimentary 60-minute ocean-view couples massage',
      'Sunset dolphin spotting cruise with gourmet canapés'
    ],
    exclusions: ['International airfare to Male', 'Scuba diving certification courses'],
    itinerary: [
      {
        day: 1,
        title: 'Seaplane Arrival & Villa Induction',
        description: 'Board seaplane across turquoise lagoons, welcome drums on the jetty, settle into overwater villa.',
        activities: ['Seaplane aerial photography', 'Villa check-in', 'Private pool sunset cocktails']
      },
      {
        day: 2,
        title: 'Reef Snorkeling & Underwater Wonders',
        description: 'Snorkel directly from your villa deck into coral gardens alive with turtles, eagle rays, and vibrant fish.',
        activities: ['Marine biologist guided safari', 'Coral preservation tour', 'Lagoon barbecue']
      },
      {
        day: 3,
        title: 'Overwater Spa & Sandbank Picnic',
        description: 'Private speedboat trip to a secluded uninhabited sandbank with white canopy lunch, followed by sunset massage.',
        activities: ['Deserted sandbank excursion', 'Couples massage over glass floor', 'Starlight beach cinema']
      },
      {
        day: 4,
        title: 'Dolphin Cruise & Subsurface Dining',
        description: 'Afternoon yacht cruise watching spinner dolphins leap alongside the hull, followed by dinner beneath the waves.',
        activities: ['Dolphin cruise', 'Submerged aquarium restaurant reservation', 'Cocktails by the fire pit']
      },
      {
        day: 5,
        title: 'Farewell Lagoon Breakfast & Departure',
        description: 'Floating breakfast delivered to your villa pool before boarding the return seaplane to Male.',
        activities: ['Floating champagne breakfast', 'Seaplane transfer to Male International']
      }
    ]
  },
  {
    id: 'pkg-japan-zen',
    title: 'Imperial Japan: Tokyo, Kyoto & Mt. Fuji',
    destinationId: 'japan',
    destinationName: 'Kyoto & Tokyo',
    country: 'Japan',
    category: 'Family',
    durationDays: 8,
    durationNights: 7,
    destinationsCount: 3,
    image: kyotoImg,
    pricePerPerson: 2550,
    originalPrice: 2950,
    accommodationType: 'Traditional Luxury Ryokan & Modern 5-Star City Hotels',
    mealsIncluded: 'Daily Breakfast, 3 Kaiseki Multi-Course Dinners',
    transportation: '7-Day JR Pass + Private Chauffeur in Kyoto',
    rating: 4.97,
    reviewsCount: 165,
    availableDates: ['2026-11-18', '2026-12-08', '2027-03-25', '2027-04-10'],
    inclusions: [
      '4 nights in Tokyo high-rise luxury hotel + 3 nights in traditional Kyoto Onsen Ryokan',
      '7-Day Green Car (First Class) Japan Rail Shinkansen Pass',
      'Authentic Tea Ceremony masterclass in historic Gion teahouse',
      'Private day tour to Mt. Fuji 5th station and Lake Kawaguchiko',
      'Luggage forward service between Tokyo and Kyoto',
      'Pocket Wi-Fi device with unlimited 5G high-speed connectivity'
    ],
    exclusions: ['International flights to Haneda/Narita', 'Personal shopping'],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Tokyo Metropole',
        description: 'Private transfer from Haneda or Narita airport, check into luxury hotel overlooking Tokyo Tower.',
        activities: ['Airport greeting', 'Check-in', 'Evening dining in Ginza']
      },
      {
        day: 2,
        title: 'Historic Asakusa & Futuristic Shibuya',
        description: 'Senso-ji temple morning exploration, followed by Shibuya Crossing and Meiji Shrine woodland sanctuary.',
        activities: ['Senso-ji incense ritual', 'Shibuya Sky observation deck', 'Ramen tasting tour']
      },
      {
        day: 3,
        title: 'Mt. Fuji & Hakone Hot Spring Oasis',
        description: 'Scenic drive to Mount Fuji with reflection views across Lake Kawaguchiko, cable car over volcanic valley.',
        activities: ['Hakone ropeway', 'Mt. Fuji vista photography', 'Traditional cedar bath onsen']
      },
      {
        day: 4,
        title: 'Bullet Train Shinkansen to Ancient Kyoto',
        description: 'Experience 320 km/h Shinkansen speed to Kyoto. Check into serene Ryokan with private tatami garden.',
        activities: ['Shinkansen ride', 'Ryokan check-in', '10-course Kaiseki banquet']
      },
      {
        day: 5,
        title: 'Fushimi Inari & Arashiyama Bamboo Grove',
        description: 'Early morning stroll through the thousands of vermilion torii gates, followed by Arashiyama bamboo path.',
        activities: ['Fushimi Inari torii hike', 'Bamboo forest walk', 'Matcha tasting ceremony']
      },
      {
        day: 6,
        title: 'Kinkaku-ji Golden Pavilion & Gion Geisha District',
        description: 'Visit the shimmering Golden Pavilion mirrored in its lake, followed by sunset walk in Gion.',
        activities: ['Golden Pavilion tour', 'Gion historic quarter', 'Boutique craft ateliers']
      },
      {
        day: 7,
        title: 'Nara Deer Park & Todai-ji Great Buddha',
        description: 'Short journey to historic Nara. Feed bowing sika deer and stand before the colossal bronze Buddha.',
        activities: ['Nara deer park interaction', 'Todai-ji temple', 'Kyoto farewell dinner']
      },
      {
        day: 8,
        title: 'Return via Kansai or Tokyo',
        description: 'Transfer to Kansai International Airport (KIX) or Shinkansen return to Tokyo for departure.',
        activities: ['Ryokan morning breakfast', 'Airport transfer']
      }
    ]
  },
  {
    id: 'pkg-skardu-expedition',
    title: 'Northern Pakistan: Karakoram & Silk Route Odyssey',
    destinationId: 'skardu',
    destinationName: 'Skardu & Hunza',
    country: 'Northern Pakistan',
    category: 'Adventure',
    durationDays: 8,
    durationNights: 7,
    destinationsCount: 4,
    image: skarduImg,
    pricePerPerson: 1420,
    originalPrice: 1750,
    accommodationType: 'Serena Heritage Lodges & Mountain Boutique Resorts',
    mealsIncluded: 'All Organic Local Meals & Traditional Teas',
    transportation: 'Private 4x4 Prado Land Cruisers + Domestic Mountain Flight',
    rating: 4.96,
    reviewsCount: 142,
    availableDates: ['2026-11-05', '2026-11-20', '2027-04-15', '2027-05-10'],
    inclusions: [
      'Domestic scenic mountain flights Islamabad – Skardu – Islamabad',
      '7 nights in premier mountain lodges (Serena Shigar Fort & Hunza Serena Inn)',
      'Dedicated 4x4 Toyota Land Cruiser with experienced mountain driver',
      'Excursions to Deosai Plains (Roof of the World) & Cold Desert of Sarfaranga',
      'Boat cruise on crystal turquoise Attabad Lake',
      'Government tourist permits and local licensed adventure guide'
    ],
    exclusions: ['International flights to Islamabad (ISB)', 'Personal hiking boots/gear'],
    itinerary: [
      {
        day: 1,
        title: 'Islamabad to Skardu Scenic Mountain Flight',
        description: 'One of the world’s most scenic flights passing Nanga Parbat (8,126m). Transfer to 400-year-old restored Shigar Fort.',
        activities: ['Mountain flight past 8000ers', 'Check-in Shigar Fort', 'Orchard garden walk']
      },
      {
        day: 2,
        title: 'Shangrila Resort & Upper Kachura Lake',
        description: 'Visit the legendary Shangrila pagoda resort and hike to pristine Upper Kachura Lake for trout lunch.',
        activities: ['Shangrila photo stop', 'Upper Kachura boat ride', 'Fresh trout barbecue']
      },
      {
        day: 3,
        title: 'Deosai National Park: Roof of the World',
        description: 'Ascend to the second-highest alpine plateau on Earth at 4,114m. Meadows of wildflowers and Sheosar Lake.',
        activities: ['4x4 crossing', 'Sheosar lake panorama', 'Himalayan wildlife spotting']
      },
      {
        day: 4,
        title: 'Drive through Karakoram Highway to Hunza',
        description: 'Scenic drive along the Indus and Gilgit river gorges with viewpoints of Rakaposhi peak (7,788m).',
        activities: ['Karakoram highway journey', 'Rakaposhi viewpoint lunch', 'Check-in Karimabad Hunza']
      },
      {
        day: 5,
        title: 'Baltit & Altit Ancient Fortresses',
        description: 'Explore 800-year-old Tibetan-influenced palaces perched over the terraced apricot valley.',
        activities: ['Baltit Fort tour', 'Altit royal garden walk', 'Hunza walnut cake tasting']
      },
      {
        day: 6,
        title: 'Attabad Lake & Passu Cones Cathedral',
        description: 'Sail across the deep turquoise waters of Attabad Lake. Stand beneath the iconic jagged serrated Passu Cathedral spires.',
        activities: ['Attabad motorboat cruise', 'Passu suspension bridge walk', 'Glacier viewpoint']
      },
      {
        day: 7,
        title: 'Eagle’s Nest Sunset & Karimabad Bazaar',
        description: 'Sunset panoramic view from Eagle’s Nest overlooking 7 peaks over 7,000m, followed by gemstone bazaar shopping.',
        activities: ['Duikar sunset', 'Local ruby/gemstone bazaar', 'Traditional Balti musical night']
      },
      {
        day: 8,
        title: 'Gilgit/Skardu Flight to Islamabad & Departure',
        description: 'Return flight to Islamabad for international connecting flights.',
        activities: ['Breakfast in valley', 'Flight to Islamabad International']
      }
    ]
  },
  {
    id: 'pkg-bali-escape',
    title: 'Bali Island of the Gods: Ubud Jungle to Uluwatu',
    destinationId: 'bali',
    destinationName: 'Bali',
    country: 'Indonesia',
    category: 'Budget',
    durationDays: 6,
    durationNights: 5,
    destinationsCount: 2,
    image: baliImg,
    pricePerPerson: 1050,
    originalPrice: 1300,
    accommodationType: 'Private Pool Jungle Villa & Coastal Resort',
    mealsIncluded: 'Daily Tropical Breakfast + 2 Cultural Dinners',
    transportation: 'Private Air-Conditioned Van with Local Chauffeur',
    rating: 4.91,
    reviewsCount: 210,
    availableDates: ['2026-11-12', '2026-12-01', '2027-01-15', '2027-02-20'],
    inclusions: [
      '3 nights in private pool villa (Ubud) + 2 nights cliffside resort (Uluwatu)',
      'Private day tour to Ulun Danu Beratan water temple & Handara Gate',
      'Tegallalang rice terrace jungle swing experience',
      'Uluwatu clifftop temple visit with sunset Kecak fire dance performance',
      'Candlelit beachfront seafood feast at Jimbaran Bay',
      'Complimentary airport transfers'
    ],
    exclusions: ['International flights to Denpasar (DPS)', 'Visa on arrival fee ($35)'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Bali & Ubud Jungle Check-in',
        description: 'Warm floral greeting at Denpasar airport, scenic drive through craft villages to private Ubud pool villa.',
        activities: ['Airport pickup', 'Villa check-in', 'Jungle infinity pool relaxation']
      },
      {
        day: 2,
        title: 'Water Temples & High-Altitude Lakes',
        description: 'Visit the misty Ulun Danu temple floating on Lake Beratan, walk through lush botanical gardens.',
        activities: ['Ulun Danu Beratan photo shoot', 'Lake canoe ride', 'Organic coffee plantation tour']
      },
      {
        day: 3,
        title: 'Tegallalang Rice Terraces & Waterfall Trek',
        description: 'Walk through stepped green rice fields, swing over the palm canopy, and swim in Tegenungan waterfall.',
        activities: ['Rice terrace hike', 'Jungle swing', 'Waterfall swim']
      },
      {
        day: 4,
        title: 'Transfer to Uluwatu Cliffs & Beach Club',
        description: 'Travel south to the Bukit Peninsula. Relax at a premier clifftop infinity pool club above the Indian Ocean.',
        activities: ['Transfer to Uluwatu', 'Clifftop beach club', 'Sunset cocktail']
      },
      {
        day: 5,
        title: 'Uluwatu Temple, Kecak Fire Dance & Jimbaran Dinner',
        description: 'Perched 70 meters above crashing waves, watch the hypnotic Kecak dance at sunset, then feast on grilled seafood.',
        activities: ['Uluwatu temple', 'Kecak fire dance', 'Jimbaran seafood dinner on the sand']
      },
      {
        day: 6,
        title: 'Farewell Bali & Airport Transfer',
        description: 'Enjoy a leisurely tropical fruit breakfast before private chauffeur transfer to Denpasar airport.',
        activities: ['Breakfast by the pool', 'Souvenir shopping', 'Airport transfer']
      }
    ]
  }
];

export const HOTELS: Hotel[] = [
  {
    id: 'hotel-swiss-palace',
    name: 'The Chedi & Alpine Sanctuary Zermatt',
    destinationId: 'switzerland',
    city: 'Zermatt',
    country: 'Switzerland',
    category: 'Luxury Resort',
    image: heroSwissImg,
    rating: 4.98,
    reviewsCount: 245,
    pricePerNight: 720,
    amenities: ['Matterhorn Balcony Views', 'Heated Indoor & Outdoor Pools', 'Alpine Herb Spa', 'Michelin Star Dining', 'Ski Concierge', 'Complimentary Electric Chauffeur'],
    description: 'An architectural masterpiece blending traditional Swiss chalet craftsmanship with sleek contemporary luxury, framed by panoramic views of the Matterhorn.',
    rooms: [
      {
        id: 'room-swiss-1',
        name: 'Deluxe Matterhorn Alpine Suite',
        capacity: 2,
        bedType: '1 King Bed',
        sizeSqM: 65,
        pricePerNight: 720,
        amenities: ['Fireplace', 'Balcony facing Matterhorn', 'Soaking Stone Tub', 'Nespresso Atelier']
      },
      {
        id: 'room-swiss-2',
        name: 'Grand Family Chalet Suite',
        capacity: 4,
        bedType: '2 King Beds',
        sizeSqM: 110,
        pricePerNight: 1250,
        amenities: ['2 Bedrooms', 'Full Kitchenette', 'Sauna in Suite', 'Living Salon']
      }
    ]
  },
  {
    id: 'hotel-maldives-azure',
    name: 'Soneva Azure Haven & Overwater Villas',
    destinationId: 'maldives',
    city: 'Noonu Atoll',
    country: 'Maldives',
    category: 'Overwater Villa',
    image: maldivesImg,
    rating: 4.99,
    reviewsCount: 312,
    pricePerNight: 1100,
    amenities: ['Private Water Slides into Ocean', 'Retractable Roof for Stargazing', 'Glass-Bottom Floors', 'Private Island Host (Butler)', 'Overwater Hammocks', 'Subsurface Spa'],
    description: 'The pinnacle of overwater living. Expansive double-story villas with water slides directly into the turquoise lagoon and master bedrooms featuring retractable roofs for night-sky stargazing.',
    rooms: [
      {
        id: 'room-maldives-1',
        name: '1-Bedroom Sunset Water Reserve with Slide',
        capacity: 2,
        bedType: '1 Emperor King Bed',
        sizeSqM: 140,
        pricePerNight: 1100,
        amenities: ['Lagoon Slide', 'Private Infinity Plunge Pool', 'Outdoor Catamaran Net', 'Wine Cellar']
      },
      {
        id: 'room-maldives-2',
        name: '2-Bedroom Ocean Residence with Lagoon Pool',
        capacity: 4,
        bedType: '2 King Beds',
        sizeSqM: 260,
        pricePerNight: 1950,
        amenities: ['Private Gym', 'Steam Room', '2 Pools', 'Chef Service Available']
      }
    ]
  },
  {
    id: 'hotel-cappadocia-cave',
    name: 'Museum Hotel & Royal Cave Suites',
    destinationId: 'turkey',
    city: 'Uchisar',
    country: 'Turkey',
    category: 'Boutique Hotel',
    image: cappadociaImg,
    rating: 4.94,
    reviewsCount: 420,
    pricePerNight: 480,
    amenities: ['Thermal Heated Roman Pool', 'Sunrise Balloon Terrace', 'Registered Antique Decor', 'Wine Taps in Suites', 'Fine Anatolian Cuisine', 'Panoramic Valley Views'],
    description: 'A living museum carved into thousands-of-years-old rock formations, adorned with registered antiquities from Roman, Seljuk, and Ottoman eras.',
    rooms: [
      {
        id: 'room-turkey-1',
        name: 'Imperial Stone Cave Suite',
        capacity: 2,
        bedType: '1 King Bed',
        sizeSqM: 70,
        pricePerNight: 480,
        amenities: ['Antique Tapestries', 'Jacuzzi with Valley View', 'Complimentary Red Wine Tap', 'Terrace Access']
      },
      {
        id: 'room-turkey-2',
        name: 'Sultan Valley Penthouse Cave',
        capacity: 3,
        bedType: '1 King Bed + 1 Daybed',
        sizeSqM: 95,
        pricePerNight: 750,
        amenities: ['Private Turkish Bath', 'Fireplace', '360° Balloon Panorama', 'Butler Service']
      }
    ]
  },
  {
    id: 'hotel-kyoto-ryokan',
    name: 'Hoshinoya Kyoto Heritage River Ryokan',
    destinationId: 'japan',
    city: 'Arashiyama, Kyoto',
    country: 'Japan',
    category: 'Boutique Hotel',
    image: kyotoImg,
    rating: 4.97,
    reviewsCount: 198,
    pricePerNight: 850,
    amenities: ['Traditional Boat Arrival', 'Hinoki Cypress Bath', 'Private Zen Garden Views', 'Kaiseki Dinner in Room', 'Morning Temple Chant Access', 'Kimono Dressing Service'],
    description: 'Reached exclusively by a traditional wooden riverboat up the Oi River gorge, this 17th-century riverside retreat combines classical sukiya-style architecture with serene minimalist luxury.',
    rooms: [
      {
        id: 'room-japan-1',
        name: 'Tsukihashi River & Maple View Pavilion',
        capacity: 2,
        bedType: '2 Japanese Futons or Twin Beds',
        sizeSqM: 60,
        pricePerNight: 850,
        amenities: ['Hand-printed Karakami Wallpapers', 'Aromatherapy Hinoki Tub', 'Oi River Vista', 'Matcha Set']
      }
    ]
  },
  {
    id: 'hotel-bali-sanctuary',
    name: 'Hanging Gardens & Cascading Pools Rainforest',
    destinationId: 'bali',
    city: 'Payangan, Ubud',
    country: 'Indonesia',
    category: 'Luxury Resort',
    image: baliImg,
    rating: 4.92,
    reviewsCount: 350,
    pricePerNight: 520,
    amenities: ['Multi-Tiered Cascading Pools', 'Ayung River Valley View', 'Jungle Funicular', 'Open-Air Ayurvedic Spa', 'Helipad', 'Private Riverfront Yoga'],
    description: 'Overlooking the Ayung River and the ancient Dalem Segara temple, celebrated worldwide for its iconic bi-level infinity pool suspended over the lush tropical rainforest.',
    rooms: [
      {
        id: 'room-bali-1',
        name: 'Panoramic Jungle Villa with Plunge Pool',
        capacity: 2,
        bedType: '1 King Bed',
        sizeSqM: 85,
        pricePerNight: 520,
        amenities: ['Private Heated Plunge Pool', 'Gazebo Bale', 'Rain Shower', 'Handcrafted Teak Furniture']
      }
    ]
  },
  {
    id: 'hotel-skardu-fort',
    name: 'Serena Shigar Fort 400-Year Palace Lodge',
    destinationId: 'skardu',
    city: 'Shigar Valley, Skardu',
    country: 'Northern Pakistan',
    category: 'Mountain Lodge',
    image: skarduImg,
    rating: 4.96,
    reviewsCount: 160,
    pricePerNight: 290,
    amenities: ['Original Raja Royal Suites', 'Organic Apple Orchards', 'Mountain Stream Dining', 'Balti Culture Museum', 'Karakoram Mountain Treks', 'Courtyard Bonfires'],
    description: 'Known as the Palace on the Rock, a meticulously restored 17th-century fortress once home to the Rajas of Shigar, set amidst rose gardens and mountain streams.',
    rooms: [
      {
        id: 'room-skardu-1',
        name: 'Royal Garden Suite (Old Fort Palace)',
        capacity: 2,
        bedType: '1 Hand-Carved King Bed',
        sizeSqM: 55,
        pricePerNight: 290,
        amenities: ['Hand-Carved Cedar Windows', 'Orchard Vista', 'Underfloor Heating', 'Balti Herbal Teas']
      }
    ]
  }
];

export const DINING_EXPERIENCES: DiningExperience[] = [
  {
    id: 'dine-cappadocia-feast',
    name: 'Anatolian Clay-Pot Kebab & Sunset Vineyard Feast',
    destination: 'Cappadocia',
    country: 'Turkey',
    category: 'Traditional Feast',
    image: culinaryImg,
    pricePerPerson: 75,
    duration: '3 Hours',
    dietary: ['Halal', 'Vegetarian'],
    description: 'Watch the ceremonial cracking of the sealed clay pot (Testi Kebab) slow-baked for 6 hours with lamb, shallots, and fragrant bay leaves, paired with crisp local meze and baklava.',
    featuredDishes: ['Testi Testi Kebab', 'Warm Hummus with Pastirma', 'Sigara Boregi', 'Pistachio Baklava with Dondurma'],
    location: 'Uchisar Cliffside Terrace, Cappadocia'
  },
  {
    id: 'dine-kyoto-kaiseki',
    name: 'Imperial Gion Tea Ceremony & Kaiseki Banquet',
    destination: 'Kyoto',
    country: 'Japan',
    category: 'Fine Dining',
    image: kyotoImg,
    pricePerPerson: 160,
    duration: '2.5 Hours',
    dietary: ['Vegetarian', 'Gluten-Free'],
    description: 'A 9-course seasonal journey guided by a 3rd-generation chef. Delicate sashimi, seasonal simmered bamboo shoots, wagyu beef on hoba leaf, and ceremonial matcha.',
    featuredDishes: ['Toro & Sea Bream Sashimi', 'A5 Wagyu on Hoba Leaf', 'Kyoto Yuba (Tofu Skin)', 'Uji Matcha with Wagashi'],
    location: 'Gion Historic Quarter, Kyoto'
  },
  {
    id: 'dine-lahore-spice',
    name: 'Royal Mughlai Biryani & Chapli Kebab Experience',
    destination: 'Hunza & Skardu',
    country: 'Northern Pakistan',
    category: 'Street Food Tour',
    image: skarduImg,
    pricePerPerson: 45,
    duration: '2.5 Hours',
    dietary: ['Halal'],
    description: 'Savor fragrant dum biryani cooked in sealed copper cauldrons with saffron, followed by Peshawari chapli kebabs seared on gigantic cast-iron tawas and warm Roghani naan.',
    featuredDishes: ['Mutton Dum Pukht Biryani', 'Peshawari Chapli Kebab', 'Creamy Chicken Handi', 'Kashmiri Chai with Pistachios'],
    location: 'Heritage Food Street, Skardu & Gilgit'
  },
  {
    id: 'dine-bali-seafood',
    name: 'Jimbaran Sunset Grilled Seafood by Candlelight',
    destination: 'Bali',
    country: 'Indonesia',
    category: 'Traditional Feast',
    image: baliImg,
    pricePerPerson: 65,
    duration: '2 Hours',
    dietary: ['Halal', 'Gluten-Free'],
    description: 'Dine with your feet in the sand as the sun dips into the Indian Ocean. Fresh lobster, red snapper, and king prawns grilled over coconut husks with sambal matah.',
    featuredDishes: ['Coconut-Grilled King Prawns', 'Ikan Bakar (Spiced Snapper)', 'Plecing Kangkung', 'Young Coconut with Lime'],
    location: 'Jimbaran Bay Beach, Bali'
  },
  {
    id: 'dine-maldives-underwater',
    name: 'Sub-Aquatic Coral Cellar Tasting Dinner',
    destination: 'North Atoll',
    country: 'Maldives',
    category: 'Fine Dining',
    image: maldivesImg,
    pricePerPerson: 220,
    duration: '3 Hours',
    dietary: ['Gluten-Free'],
    description: 'Six meters beneath the surface of the Indian Ocean, enclosed in 180° curved acrylic walls surrounded by clownfish, sea turtles, and reef sharks.',
    featuredDishes: ['Maldivian Yellowfin Tuna Tartare', 'Pan-Seared Toothfish', 'Truffle Lobster Bisque', 'Passionfruit Sorbet'],
    location: 'Underwater Dome, Soneva Haven'
  }
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'attr-matterhorn',
    name: 'Matterhorn Glacier Paradise & 3883m Peak',
    destination: 'Swiss Alps',
    country: 'Switzerland',
    category: 'Natural Wonder',
    ticketPrice: 110,
    suggestedDuration: '4–5 Hours',
    image: heroSwissImg,
    rating: 4.98,
    familySuitable: true,
    description: 'Europe’s highest mountain station offering 360-degree panoramas of 38 alpine four-thousanders and 14 glaciers across Switzerland, Italy, and France.',
    travelTips: 'Wear sunglasses and thermal layers. Take the cable car early in the morning for clearest visibility before clouds form.'
  },
  {
    id: 'attr-balloon-turkey',
    name: 'Göreme Sunrise Hot Air Balloon Expedition',
    destination: 'Cappadocia',
    country: 'Turkey',
    category: 'Adventure',
    ticketPrice: 220,
    suggestedDuration: '3 Hours',
    image: cappadociaImg,
    rating: 4.99,
    familySuitable: true,
    description: 'Gently float above the sculpted volcanic fairy chimneys and surreal Rose Valley as the sunrise paints the Anatolian horizon in shades of amber and rose.',
    travelTips: 'Flights are weather-dependent. Always book for your first morning in Cappadocia to allow backup rescheduling.'
  },
  {
    id: 'attr-fushimi-inari',
    name: 'Fushimi Inari Shrine & 10,000 Torii Paths',
    destination: 'Kyoto',
    country: 'Japan',
    category: 'Historical Landmark',
    ticketPrice: 0,
    suggestedDuration: '2.5 Hours',
    image: kyotoImg,
    rating: 4.96,
    familySuitable: true,
    description: 'Dedicated to the Shinto deity of rice and commerce, this iconic shrine features two dense tunnels of vermilion wooden torii gates climbing up sacred Mount Inari.',
    travelTips: 'Free admission 24/7. Arrive at dawn (6:30 AM) to experience the paths in silent contemplation without tour groups.'
  },
  {
    id: 'attr-deosai',
    name: 'Deosai National Park (Roof of the World)',
    destination: 'Skardu',
    country: 'Northern Pakistan',
    category: 'Natural Wonder',
    ticketPrice: 15,
    suggestedDuration: 'Full Day (6–8 Hours)',
    image: skarduImg,
    rating: 4.97,
    familySuitable: true,
    description: 'At an average altitude of 4,114 meters, Deosai is the second highest plateau in the world, home to the endangered Himalayan Brown Bear and crystal-blue Sheosar Lake.',
    travelTips: 'Accessible from late June to late September. Requires a robust 4x4 vehicle and warm windproof jacket.'
  },
  {
    id: 'attr-ulun-danu',
    name: 'Ulun Danu Beratan Floating Water Temple',
    destination: 'Bali',
    country: 'Indonesia',
    category: 'Cultural',
    ticketPrice: 6,
    suggestedDuration: '2 Hours',
    image: baliImg,
    rating: 4.91,
    familySuitable: true,
    description: 'Built in 1633, this 11-tiered multi-roofed shrine sits on the edge of Lake Beratan in Bedugul, looking as if it floats magically on the misty mountain lake.',
    travelTips: 'The lakeside mountain climate is noticeably cooler (18°C–22°C). Rent a traditional swan or wooden paddleboat for the best photo angles.'
  },
  {
    id: 'attr-burj-khalifa',
    name: 'Burj Khalifa Observation Deck & Sky Lounge',
    destination: 'Dubai',
    country: 'United Arab Emirates',
    category: 'Scenic Viewpoint',
    ticketPrice: 65,
    suggestedDuration: '2 Hours',
    image: dubaiImg,
    rating: 4.93,
    familySuitable: true,
    description: 'Stand atop the world’s tallest structure at 828 meters. High-speed double-deck elevators whisk you to level 148 for views across the Arabian Gulf and vast desert dunes.',
    travelTips: 'Book sunset slots 3 weeks in advance. Combine with an evening show of the Dubai Dancing Fountains below.'
  }
];

export const VISA_DATA: Record<string, VisaInfo> = {
  Switzerland: {
    destinationCountry: 'Switzerland (Schengen Zone)',
    visaTypes: [
      {
        type: 'Tourist Visa',
        processingTime: '10–15 Business Days',
        govFee: 90,
        serviceFee: 65,
        validity: 'Up to 90 days within 180 days',
        checklist: [
          'Passport valid for at least 3 months beyond intended departure',
          'Completed and signed Schengen Visa application form',
          'Two recent biometric passport photographs (35x45mm, white background)',
          'Confirmed round-trip flight booking and travel itinerary',
          'Hotel reservation confirmation vouchers covering entire stay',
          'Proof of travel health insurance with minimum €30,000 medical coverage',
          'Original 3–6 months bank statements with certified bank stamp',
          'Employment letter or business registration certificate'
        ]
      },
      {
        type: 'Business Visa',
        processingTime: '7–12 Business Days',
        govFee: 90,
        serviceFee: 85,
        validity: 'Up to 90 days (Single or Multiple Entry)',
        checklist: [
          'All Tourist Visa core documents',
          'Official invitation letter from the Swiss company/organization',
          'Letter of dispatch from your employer guaranteeing expenses',
          'Proof of commercial ties or conference registration'
        ]
      }
    ],
    generalRequirements: [
      'Biometrics (fingerprints & photo) are mandatory if not submitted in the past 59 months.',
      'Applications can be submitted up to 6 months before intended departure date.',
      'SkyVoyage concierge provides appointment booking, dossier review, and interview preparation.'
    ]
  },
  Turkey: {
    destinationCountry: 'Turkey',
    visaTypes: [
      {
        type: 'E-Visa',
        processingTime: '24–48 Hours (Instant option available)',
        govFee: 50,
        serviceFee: 35,
        validity: '180 days (Allows 30 or 90 days stay)',
        checklist: [
          'Passport valid for minimum 6 months from entry date',
          'Valid supporting visa/residence permit (Schengen, USA, UK, or Ireland if required for your nationality)',
          'Confirmed return flight ticket and hotel reservation',
          'Credit/debit card for electronic payment'
        ]
      },
      {
        type: 'Tourist Visa',
        processingTime: '7–10 Business Days',
        govFee: 60,
        serviceFee: 55,
        validity: 'Single entry, 30 days',
        checklist: [
          'Original passport with at least 2 blank pages',
          'Two 5x5 cm biometric photographs',
          'Proof of financial means ($50 per day of stay)',
          'Flight & hotel reservations',
          'Travel insurance valid in Turkey'
        ]
      }
    ],
    generalRequirements: [
      'Citizens of EU, UK, USA and many others may qualify for visa-free entry or fast online e-Visa.',
      'Check eligibility with our instant interactive tool before submitting payment.'
    ]
  },
  Japan: {
    destinationCountry: 'Japan',
    visaTypes: [
      {
        type: 'Tourist Visa',
        processingTime: '5–8 Business Days',
        govFee: 25,
        serviceFee: 60,
        validity: 'Single entry 15 or 30 days (valid for 3 months)',
        checklist: [
          'Valid passport with at least 2 blank pages',
          'Visa application form with photo taken within 6 months',
          'Schedule of stay (day-by-day activity itinerary)',
          'Income tax certificate or 3-month stamped bank balance statement',
          'Flight reservation and hotel bookings'
        ]
      },
      {
        type: 'E-Visa',
        processingTime: '5 Business Days',
        govFee: 25,
        serviceFee: 40,
        validity: 'Single entry 90 days',
        checklist: [
          'Digital passport bio-page scan',
          'Digital portrait photo',
          'Travel itinerary and flight tickets'
        ]
      }
    ],
    generalRequirements: [
      'Nationals of 70+ countries (including US, UK, Canada, Australia, Singapore) are visa-exempt for stays up to 90 days.',
      'eVisa system is available for eligible non-exempt residents in selected countries.'
    ]
  },
  Maldives: {
    destinationCountry: 'Maldives',
    visaTypes: [
      {
        type: 'Tourist Visa',
        processingTime: 'On Arrival (30–60 Minutes)',
        govFee: 0,
        serviceFee: 0,
        validity: '30 Days Free on Arrival (Extendable up to 90 days)',
        checklist: [
          'Passport valid for at least 1 month from departure date',
          'Confirmed return or onward flight ticket',
          'Pre-paid hotel reservation voucher or proof of sufficient funds ($100 + $50/day)',
          'Online IMUGA Traveler Declaration submitted within 96 hours of arrival'
        ]
      }
    ],
    generalRequirements: [
      'Maldives grants a free 30-day tourist visa to travelers of all nationalities upon arrival.',
      'SkyVoyage assists travelers with compulsory IMUGA health declarations and resort transfers.'
    ]
  },
  'Northern Pakistan': {
    destinationCountry: 'Pakistan',
    visaTypes: [
      {
        type: 'E-Visa',
        processingTime: '48–72 Hours',
        govFee: 35,
        serviceFee: 45,
        validity: '3 Months (Allows 30-day stay, extendable)',
        checklist: [
          'Passport valid for at least 6 months',
          'Passport-sized digital photograph with white background',
          'SkyVoyage official invitation letter (LOI) & tour booking voucher',
          'Hotel booking confirmation in Islamabad/Skardu/Hunza'
        ]
      }
    ],
    generalRequirements: [
      'Pakistan e-Visa is fully digital and open to 191 nationalities.',
      'SkyVoyage automatically provides the government-required Letter of Invitation (LOI) for your tour.'
    ]
  }
};

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'SV-782914',
    type: 'package',
    title: 'Alpine Grandeur & Panoramic Rail Tour',
    destination: 'Switzerland',
    bookingDate: '2026-10-18',
    travelDate: '2026-12-05',
    travelersCount: 2,
    totalAmount: 5700,
    status: 'Confirmed',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@voyage.demo',
    details: {
      packageId: 'pkg-swiss-grandeur',
      trainClass: 'First Class Excellence',
      hotelPreference: 'Matterhorn Suite',
      flightAddon: false
    }
  },
  {
    id: 'SV-934102',
    type: 'hotel',
    title: 'The Chedi & Alpine Sanctuary Zermatt',
    destination: 'Switzerland',
    bookingDate: '2026-10-15',
    travelDate: '2026-12-05',
    travelersCount: 2,
    totalAmount: 2160,
    status: 'Confirmed',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@voyage.demo',
    details: {
      roomName: 'Deluxe Matterhorn Alpine Suite',
      nights: 3,
      amenities: ['Ski Concierge', 'Alpine Herb Spa']
    }
  },
  {
    id: 'SV-551209',
    type: 'visa',
    title: 'Schengen Tourist Visa Concierge',
    destination: 'Switzerland',
    bookingDate: '2026-10-19',
    travelDate: '2026-12-05',
    travelersCount: 2,
    totalAmount: 310,
    status: 'Processing',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@voyage.demo',
    details: {
      trackingNumber: 'CH-SCHENGEN-8821',
      currentStage: 'Document Verification',
      estimatedCompletion: '2026-11-02'
    }
  }
];
