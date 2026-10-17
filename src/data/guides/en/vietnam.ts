import { themes } from '../../../lib/themes'
import type { Guide } from '../../../types/guide'

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w}&q=80`

export const vietnam: Guide = {
  slug: 'vietnam',
  country: 'Vietnam',
  title: 'No Hassle, Vietnam!',
  tagline: 'The practical guide',
  description:
    'When to go, region by region, and everything to sort out before you fly: vaccines, the e-visa, airport fast track, the arrival card and money.',
  hub: {
    heading: 'Vietnam Travel Guide: Plan Your Trip Step by Step',
    intro:
      'Vietnam stretches almost 1,650 km from the misty mountains of Sapa to the beaches of Phu Quoc, so a good trip starts with good planning. Our practical guides walk you through it **step by step**: when to go, what to sort out before you fly, and how to handle money once you land.',
    seo: {
      title: 'Vietnam Travel Guide: Plan Your Trip Step by Step',
      description:
        'Plan your Vietnam trip with practical, step-by-step guides: the best time to visit by region, e-visa, vaccines, airport fast track and money tips.',
    },
  },
  coverImage: unsplash('photo-1528127269322-539801943592'),
  icon: 'leaf',
  theme: themes.jade,
  steps: [
    {
      id: 'weather',
      seo: {
        title: 'Best Time to Visit Vietnam: Weather by Region',
        description:
          'When to visit Vietnam: the north, center and south have different seasons. Weather by region, typhoon season and the best months for each.',
      },
      icon: 'weather',
      title: 'Weather & planning',
      heading: 'Best Time to Visit Vietnam: Weather by Region',
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
              title: 'The north: 4 seasons',
              text: 'Best in **Mar-Apr and Sep-Nov**. Avoid the stormy summer and the cold winter.',
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
              title: 'The center: beach weather',
              text: 'Best in **Feb-Aug**. Typhoons and floods from September to January.',
              color: '#fbbf24',
              pin: [108.21, 16.05],
            },
            {
              id: 'south',
              name: 'Southern Vietnam',
              title: 'The south: dry vs. wet',
              text: '25°-36° all year. **Dry:** Nov-Apr. **Wet:** May-Oct, with short afternoon rain.',
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
      id: 'before-you-go',
      seo: {
        title: 'Before You Go to Vietnam: Visa, Money & Vaccines',
        description:
          'What to do before your Vietnam trip: vaccines, the e-visa, airport fast track, the digital arrival card, and how to handle cash, cards and ATMs.',
      },
      icon: 'plane',
      title: 'Before you fly',
      heading: 'Before You Go to Vietnam: Visa, Money & Vaccines',
      subtitle: 'Vaccines, visa, money: what to do and when',
      image: '/images/before-you-go.jpg',
      blocks: [
        {
          type: 'timeline',
          title: 'Your pre-trip timeline',
          description: 'What to prepare and when, before you take off. Tap a task to jump to the details.',
          items: [
            {
              id: 'vaccines',
              when: '6-8 weeks before',
              title: 'Vaccines',
              summary: 'Visit a travel clinic about vaccines.',
              icon: 'vaccine',
              details: [
                {
                  type: 'paragraph',
                  text: 'Make sure to schedule an appointment with a travel clinic about **6 to 8 weeks before departure** for your travel vaccines. They will provide you with an updated list of recommended vaccines based on your specific itinerary.',
                },
                {
                  type: 'callout',
                  tone: 'warning',
                  icon: 'lightbulb',
                  title: 'Pro tip',
                  text: 'The clinic will give you a physical vaccination booklet (often a **yellow card**). **Keep it in your carry-on!** If you ever need medical attention abroad, local doctors will need to see exactly what you are vaccinated against.',
                },
                {
                  type: 'callout',
                  tone: 'neutral',
                  icon: 'info',
                  subtle: true,
                  title: 'Please note',
                  text: "This guide doesn't replace professional medical advice. Always consult your clinic before traveling.",
                },
              ],
            },
            {
              id: 'visa',
              when: '3+ weeks before',
              title: 'E-Visa',
              summary: 'Apply on the official government website.',
              icon: 'visa',
              note: 'Takes about 3-7 business days',
              details: [
                {
                  type: 'paragraph',
                  text: 'Most nationalities require a visa to enter Vietnam. Processing can take time, and if they catch a small mistake in your form, they will send it back for corrections, which delays the whole process.',
                },
                {
                  type: 'facts',
                  items: [
                    { icon: 'calendar', label: 'Valid for', value: 'Up to 90 days' },
                    { icon: 'visa', label: 'Apply', value: '3+ weeks ahead' },
                    { icon: 'money', label: 'Cost', value: '$25 / $50' },
                  ],
                },
                {
                  type: 'list',
                  ordered: true,
                  title: 'How to apply',
                  items: [
                    "Go to the **official Vietnam government website**. You can use travel agencies, but it's highly recommended to do it yourself. Beware: searching online brings up a lot of fake or unreliable third-party websites.",
                    'Fill out the online form and choose your visa: **single-entry ($25)** lets you enter only once, and is no longer valid once you leave. **Multiple-entry ($50)** lets you enter and exit as many times as you want within your chosen timeframe.',
                    'Upload a picture of your passport page and a recent portrait photo. For the portrait: **white background, no glasses, and absolutely no smiling!**',
                    'Double-check every detail before you submit. A small mistake gets the form sent back for corrections.',
                  ],
                  link: { label: 'Official e-visa website', href: 'https://evisa.gov.vn', icon: 'link', sponsored: false },
                },
              ],
            },
            {
              id: 'fast-track',
              when: '1 week before',
              title: 'Airport fast track',
              summary: 'Skip the long immigration lines.',
              icon: 'fast',
              details: [
                {
                  type: 'paragraph',
                  text: "Immigration lines at Vietnam's main airports, especially in **Hanoi and Ho Chi Minh City**, can be notoriously long. If you are arriving on an international flight during peak evening hours, you could easily end up waiting in line for **almost 3 hours**.",
                },
                {
                  type: 'facts',
                  items: [
                    { icon: 'clock', label: 'Peak-hour wait', value: 'Up to 3 hours' },
                    { icon: 'fast', label: 'With fast track', value: 'Minutes' },
                    { icon: 'money', label: 'Early bird', value: 'Book 1+ week ahead' },
                  ],
                },
                {
                  type: 'callout',
                  tone: 'brand',
                  icon: 'fast',
                  title: 'Skip the wait with VIP Fast Track',
                  text: "A representative will greet you with a **nameboard at passport control** and escort you through a priority lane in minutes. It's relatively inexpensive in Vietnam, so it's absolutely worth booking online in advance. Book **at least a week before** your arrival and you can often snag an **early bird discount**, saving you both money and precious vacation time.",
                  link: { label: 'Our recommended fast track in Hanoi', href: 'https://klook.tpx.li/n8ZJr6Et', icon: 'fast' },
                },
              ],
            },
            {
              id: 'arrival-card',
              when: 'Within 72h before landing',
              title: 'Digital arrival card',
              summary: 'Fill in the free online form in the 72 hours before you land.',
              icon: 'qr',
              note: 'Free',
              details: [
                {
                  type: 'paragraph',
                  text: "All travelers must complete a **100% free** Digital Arrival Card. You can only fill it in **during the 72 hours before you land**, not earlier. It's highly recommended to finish it **before you take off**.",
                },
                {
                  type: 'facts',
                  items: [
                    { icon: 'money', label: 'Cost', value: 'Free' },
                    { icon: 'clock', label: 'Submit', value: 'Within 72 hours before landing' },
                    { icon: 'plane', label: 'Best time', value: 'Before take-off' },
                  ],
                },
                {
                  type: 'callout',
                  tone: 'brand',
                  icon: 'info',
                  title: 'Have these ready',
                  text: 'Your **exact flight number** and your **first hotel address** in Vietnam.',
                  link: { label: 'Official arrival card website', href: 'https://prearrival.immigration.gov.vn', icon: 'link', sponsored: false },
                },
              ],
            },
            {
              id: 'money',
              when: 'On arrival',
              title: 'Cash & money',
              summary: 'Cash, cards, QR payments and where to exchange.',
              icon: 'money',
              details: [
                {
                  type: 'paragraph',
                  text: 'The official currency is the **Vietnamese Dong (VND)**. Here is how you should handle your daily spending:',
                },
                {
                  type: 'list',
                  tone: 'brand',
                  title: 'How to pay',
                  items: [
                    '**Cash is king:** you will absolutely need cash for street food, night markets and smaller local vendors.',
                    '**Credit cards:** widely accepted at large chain stores and hotels, and essential for ride-hailing apps like Grab (the local Uber).',
                    "**Digital wallets & QR codes (VNPAY):** you'll see locals scanning QR codes everywhere to pay. Many local apps require a Vietnamese bank account, but tourists can use **VNPAY**. Link your international credit card to it, and you can scan and pay at thousands of shops, restaurants and cafes, just like a local.",
                  ],
                },
                {
                  type: 'list',
                  tone: 'brand',
                  title: 'Exchanging & withdrawing money',
                  items: [
                    "**Bring US dollars:** it's highly recommended to bring **crisp, clean USD bills** to exchange on arrival. Larger bills like $50 or $100 usually get better exchange rates.",
                    '**Where to exchange:** only use authorized banks or official money exchange counters.',
                    '**ATMs:** withdrawing cash is very convenient, but local bank fees add up quickly. We highly recommend downloading the **ATM Fee Saver** app to find nearby ATMs with zero or low withdrawal fees.',
                  ],
                }
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'hanoi',
      seo: {
        title: 'Where to Stay in Hanoi: Quiet Hotels in the Old Quarter',
        description:
          "Hanoi's Old Quarter is loud. Our picks for quiet, soundproofed hotels in the heart of the city, plus family-friendly options away from the noise.",
      },
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
