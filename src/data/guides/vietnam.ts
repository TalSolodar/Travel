import { themes } from '../../lib/themes'
import type { Guide } from '../../types/guide'

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w}&q=80`

export const vietnam: Guide = {
  slug: 'vietnam',
  country: 'Vietnam',
  title: 'Vietnam, for real!',
  tagline: 'The practical guide',
  description: 'Hanoi, Sapa, Ninh Binh and Ha Long Bay: when to go, where to stay and how to get between them.',
  coverImage: unsplash('photo-1528127269322-539801943592'),
  icon: 'leaf',
  theme: themes.jade,
  steps: [
    {
      id: 'weather',
      icon: 'weather',
      title: 'Weather & planning',
      subtitle: 'When is it worth going?',
      image: '/images/vietnam.jpg',
      blocks: [
        { type: 'heading', text: 'Vietnam splits into 3, and each has its own weather' },
        {
          type: 'paragraph',
          lead: true,
          text: "Vietnam is incredibly long (almost 1,650 km!), so when it comes to weather you have to split it into 3 different regions: north, center and south. Each has its own climate. While the north might be enjoying mild, dry weather, the center can be getting torrential rain at exactly the same time. So the ideal time for your trip depends entirely on which regions you want to include. Here are the regions and their seasons:"
          // text: 'Vietnam is incredibly long (almost 1,650 km!), so when it comes to weather you have to split it into 3 different regions: north, center and south.'
        },
        {
          type: 'map',
          title: 'Three regions, three climates',
          geo: 'vietnam-regions',
          countryCode: 'VN',
          regions: [
            {
              id: 'north',
              name: 'Northern Vietnam',
              title: 'The north and its 4 seasons',
              text: 'The perfect time is the shoulder seasons (**March-April and September-November**). Watch out for the stormy summer (May-August) and the freezing winter (December-February).',
              color: '#34d399',
              pin: [105.85, 21.03],
              places: [
                { name: 'Sapa', coords: [103.84, 22.34] },
                { name: 'Ha Long Bay', coords: [107.08, 20.91] },
              ],
            },
            {
              id: 'center',
              name: 'Central Vietnam',
              title: 'The center',
              text: 'The recommended period is February to August, with pleasant weather that is perfect for the beach. On the other hand, be very careful during typhoon season (September-January), which brings heavy rain and a risk of flooding.',
              color: '#fbbf24',
              pin: [108.21, 16.05],
            },
            {
              id: 'south',
              name: 'Southern Vietnam',
              title: 'The south: dry season and wet season',
              text: "It's 25-36 degrees all year round; the difference is the rain. **Dry season:** November - April. **Wet season:** May - October",
              color: '#fb7185',
              pin: [106.66, 10.78],
              places: [{ name: 'Phu Quoc', coords: [103.96, 10.23] }],
            },
          ],
        },
        {
          type: 'climate',
          title: 'Weather by region',
          description: 'Pick a region to see what awaits you in each season.',
          regions: [
            {
              name: 'Northern Vietnam',
              places: 'Hanoi, Sapa, Ha Long Bay',
              color: '#34d399',
              intro: 'The north has 4 distinct seasons.',
              best: 'March - April | September - November',
              periods: [
                {
                  months: 'March - April | September - November',
                  season: 'Spring & autumn',
                  temp: '20°-28°',
                  rating: 'good',
                  text: 'The shoulder seasons are **the perfect time to travel**. Clear skies, very little rain and very comfortable daytime temperatures.',
                },
                {
                  months: 'May - August',
                  season: 'Summer',
                  temp: '30°-35°+',
                  rating: 'bad',
                  text: 'Hot, humid and rainy. Frequent downpours can disrupt your schedule (**in July-August** Ha Long Bay cruises may be cancelled).',
                },
                {
                  months: 'December - February',
                  season: 'Winter',
                  temp: '15°-20°',
                  rating: 'bad',
                  text: 'Cool, dry and foggy. In the mountains (like Sapa) it gets much harsher, with night temperatures dropping **as low as 4°**, sometimes with frost.',
                },
              ],
            },
            {
              name: 'Central Vietnam',
              places: 'Hoi An and Da Nang',
              color: '#fbbf24',
              intro: 'The region has a long dry season and a stormy rainy season.',
              best: 'February - August',
              periods: [
                {
                  months: 'February - May',
                  season: 'Spring',
                  temp: '25°-30°',
                  rating: 'good',
                  text: 'Comfortable, pleasant temperatures with very little rain.',
                },
                {
                  months: 'May - August',
                  season: 'Summer',
                  temp: '~35°',
                  rating: 'good',
                  text: 'The hottest and driest months of the year. Perfect for the beach.',
                },
                {
                  months: 'September - January',
                  season: 'Typhoon season',
                  temp: '22°-28°',
                  rating: 'bad',
                  text: 'Heavy rain during these months, peaking **between October and November**, with a real risk of flooding and typhoons along the coast.',
                },
              ],
            },
            {
              name: 'Southern Vietnam',
              places: 'Ho Chi Minh City and the Mekong Delta',
              color: '#fb7185',
              intro: 'Temperatures stay stable and summery all year (25°-35°). The only difference is the amount of rain.',
              best: 'November - April',
              periods: [
                {
                  months: 'November - April',
                  season: 'Dry season',
                  temp: '25°-35°',
                  rating: 'good',
                  text: 'Summery, clear days that are ideal for travel.',
                },
                {
                  months: 'May - October',
                  season: 'Wet season',
                  temp: '25°-35°',
                  rating: 'ok',
                  text: 'Brings heavy downpours, but usually just a short, strong rain in the afternoon. The upside: far fewer tourists and lush green nature. **Our tip:** plan outdoor activities for the morning, and always throw a raincoat in your bag.',
                },
              ],
            },
          ],
        },
        {
          type: 'table',
          title: 'The bottom line (for those in a hurry)',
          columns: ['Months', 'Northern Vietnam', 'Central Vietnam', 'Southern Vietnam'],
          rows: [
            [
              'March - April',
              { text: 'Ideal', rating: 'good', note: 'Pleasant, mild spring' },
              { text: 'Ideal', rating: 'good', note: 'Dry and pleasant' },
              { text: 'Ideal', rating: 'good', note: 'Dry season' },
            ],
            [
              'May - August',
              { text: 'Less recommended', rating: 'bad', note: 'Hot, rainy, risk of typhoons' },
              { text: 'Ideal', rating: 'good', note: 'Dry season, very hot' },
              { text: 'Possible', rating: 'ok', note: 'Wet season - short afternoon showers' },
            ],
            [
              'September - October',
              { text: 'Ideal', rating: 'good', note: 'Pleasant, clear autumn' },
              { text: 'Not recommended', rating: 'bad', note: 'Typhoons and flooding' },
              { text: 'Possible', rating: 'ok', note: 'End of the wet season' },
            ],
            [
              'November',
              { text: 'Ideal', rating: 'good', note: 'Pleasant, clear autumn' },
              { text: 'Not recommended', rating: 'bad', note: 'End of typhoon season' },
              { text: 'Ideal', rating: 'good', note: 'Start of the dry season' },
            ],
            [
              'December - February',
              { text: 'Tough', rating: 'bad', note: 'Very cold to freezing in the mountains' },
              { text: 'Mixed', rating: 'ok', note: 'Rainy in December-January, clearing in February' },
              { text: 'Ideal', rating: 'good', note: 'Dry, summery season' },
            ],
          ],
        },
      ],
    },
    {
      id: 'hanoi',
      display: false,
      icon: 'city',
      title: 'Hanoi & where to stay',
      subtitle: 'Finding calm in the chaos',
      image: unsplash('photo-1559592413-7cec4d0cae2b'),
      blocks: [
        { type: 'heading', text: 'Hanoi: the city that never stops' },
        {
          type: 'paragraph',
          lead: true,
          text: 'Hanoi\'s Old Quarter is an electrifying experience, but the sheer number of motorbikes and horns can drive you crazy. The secret here is choosing a hotel that is an "oasis": one tucked away in a quiet alley or fully soundproofed.',
        },
        {
          type: 'places',
          items: [
            {
              name: 'Hanoi Tirant Hotel',
              image: unsplash('photo-1566665797739-1674de7a421a', 600),
              stars: 4,
              badge: "Editor's pick",
              description:
                "A stunning hotel in the heart of the Old Quarter. Why it's here: the windows are exceptionally soundproof, and there's a rooftop pool to escape to at the end of a sweaty day. Breakfast also caters to anyone who doesn't want pho first thing in the morning.",
              tags: [
                { label: 'Extra quiet', icon: 'quiet' },
                { label: 'Central Old Quarter', icon: 'pin' },
              ],
              links: [{ label: 'Check availability and prices on Agoda', href: '#', icon: 'bed' }],
            },
            {
              name: 'JM Marvel Hotel & Spa',
              image: unsplash('photo-1582719508461-905c673771fd', 600),
              description:
                "A luxury boutique (by Vietnamese standards, still super cheap for us). It's a bit further from the party area, which is a huge plus for families or anyone who wants to sleep without hearing bass until 2 a.m.",
              tags: [{ label: 'Family friendly', icon: 'home' }],
              links: [
                { label: 'See photos on Booking', href: '#', icon: 'search', variant: 'outline' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'transit',
      display: false,
      icon: 'train',
      title: 'Getting to Sapa',
      subtitle: 'Train or bus?',
      image: unsplash('photo-1541427468627-a89a96e5ca1d'),
      blocks: [
        { type: 'heading', text: 'From Hanoi to Sapa: the most comfortable way' },
        {
          type: 'paragraph',
          lead: true,
          text: "The trip to Sapa takes about 6 to 8 hours. Every traveler's big dilemma is choosing between the night train and the sleeper bus. Here are the real pros and cons, including the tip that saves your back.",
        },
        {
          type: 'options',
          items: [
            {
              title: 'Night train (Sapaly / Chapa)',
              icon: 'train',
              tone: 'brand',
              pros: ['Real, flat beds.', 'Relatively clean toilets in every carriage.'],
              cons: [
                'Only goes as far as Lao Cai; from there you need a minivan to Sapa (another hour).',
                'Very bumpy, hard to sleep through.',
              ],
              tip: 'Always book the **lower berth**! The upper one is too close to the air conditioning (freezing) and has no proper window.',
            },
            {
              title: 'VIP / Sleeper bus',
              icon: 'bus',
              tone: 'accent',
              pros: [
                'Goes straight to central Sapa, so there are no extra transfers.',
                'Massage chairs or private capsules on VIP buses.',
              ],
              cons: [
                'No toilet on board (only stops along the way).',
                'Not great for people over 1.85 m (cramped legroom).',
              ],
              tip: 'Ask to sit **on the lower deck** to avoid motion sickness on the mountain bends.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Book tickets in advance with 12Go',
          text: 'The most reliable platform in Asia for booking trains and buses, and it helps you avoid scams at the station.',
          link: { label: 'Search tickets to Sapa', href: '#', icon: 'ticket' },
        },
      ],
    },
    {
      id: 'sapa',
      display: false,
      icon: 'mountain',
      title: 'Sapa & the villages',
      subtitle: 'Town center vs. homestay',
      image: unsplash('photo-1549488344-c71591f8933b'),
      blocks: [
        { type: 'heading', text: 'Sapa: where should you actually stay?' },
        {
          type: 'paragraph',
          lead: true,
          text: 'Sapa town itself has seen intense commercial development in recent years: lots of construction, neon lights and Western cafés. If you\'re after the famous rice terraces and some quiet, you need to head out to the villages.',
        },
        {
          type: 'options',
          items: [
            {
              title: 'Staying in town',
              icon: 'city',
              tone: 'neutral',
              description: 'Good for anyone who likes Western comforts.',
              pros: ['Restaurants and cafés within walking distance.', 'Easy access to the Fansipan cable car.'],
              cons: ['Noisy, with no sense of wild nature.'],
              link: { label: 'Our pick: Hotel de la Coupole', href: '#', icon: 'link', variant: 'text' },
            },
            {
              title: 'Homestay in Ta Van village',
              icon: 'home',
              tone: 'brand',
              badge: 'The authentic choice',
              recommended: true,
              description:
                "Half an hour's drive from town. Here you wake up facing the rice fields, eat dinner with a local family and set off on treks right from the door. **A must for nature lovers.**",
              link: { label: 'Our pick: Eco Palms House', href: '#', icon: 'link', variant: 'text' },
            },
          ],
        },
      ],
    },
    {
      id: 'tamcoc',
      display: false,
      icon: 'bike',
      title: 'Tam Coc (Ninh Binh)',
      subtitle: 'Night and dog warning',
      image: unsplash('photo-1555939594-58d7cb561ad1'),
      blocks: [
        { type: 'heading', text: 'Tam Coc: paradise by day, a challenge by night' },
        {
          type: 'paragraph',
          lead: true,
          text: "Ninh Binh, and Tam Coc in particular, is one of the most beautiful places in Vietnam. You cycle between huge karst cliffs and rice fields. **But there's a problem few people talk about:** stray dogs at night.",
        },
        {
          type: 'callout',
          tone: 'danger',
          title: 'Getting around at night: a warning',
          text: "After 8 p.m., the side streets of Tam Coc get very dark. Locals' guard dogs are let loose and tend to defend their territory aggressively against tourists on foot or on bikes. It can be very stressful!",
        },
        { type: 'heading', text: 'How does this affect your choice of hotel?' },
        {
          type: 'paragraph',
          text: 'Don\'t be tempted by hotels that are too isolated, unless you plan to eat dinner only at the hotel or you\'re renting a scooter. If you\'ll be walking to the main restaurant area, choose a hotel in the "safe zone".',
        },
        {
          type: 'list',
          tone: 'brand',
          title: 'Safe zone for walking at night (lit and central)',
          items: [
            '**Tam Coc Rice Fields Resort:** perfect, close to the center but feels like nature.',
            '**Tam Coc Horizon Bungalow:** inside the village, a short and fairly well-lit walk.',
          ],
        },
      ],
    },
    {
      id: 'halong',
      display: false,
      icon: 'ship',
      title: 'Ha Long Bay',
      subtitle: 'Cruise or day trip?',
      image: unsplash('photo-1526481280693-3bfa7568e0f3'),
      blocks: [
        { type: 'heading', text: 'Ha Long Bay: the pricey dilemma of the trip' },
        {
          type: 'paragraph',
          lead: true,
          text: 'Sailing Ha Long Bay is a must, but an overnight cruise (or two) costs hundreds of dollars. Is it worth it, or is a day trip from Hanoi enough?',
        },
        {
          type: 'options',
          items: [
            {
              title: 'Overnight cruise',
              icon: 'ship',
              tone: 'accent',
              recommended: true,
              description:
                "The classic experience. You wake up in the middle of the misty bay and do tai chi on deck in the morning.",
              pros: ['Reaches less touristy areas (like Lan Ha Bay).', 'A romantic, relaxed experience.'],
              cons: ['Significantly more expensive.'],
            },
            {
              title: 'Day trip from Hanoi',
              icon: 'bus',
              tone: 'warning',
              description: 'A two-and-a-half-hour bus ride in the morning, 4-6 hours of sailing and back in the evening.',
              pros: ['Saves lots of money and time on a tight schedule.'],
              cons: ['Crowded, especially on the cheaper boats.', 'Feels like ticking a box and rushing on.'],
            },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          icon: 'fish',
          title: 'Important note about food (dietary restrictions)',
          text: "The standard menu on cruises is almost entirely seafood. If you don't eat seafood (or you're vegetarian), you **must** let them know when you book. They're usually well prepared for it and make separate chicken/tofu dishes, but if you don't tell them, you'll go hungry.",
        },
      ],
    },
  ],
}
