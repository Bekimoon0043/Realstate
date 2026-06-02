/* ============================================
   ETHIO REAL ESTATE DATA
   Complete property and content dataset
   ============================================ */

const AppData = {
    // Language configuration
    currentLang: 'en',
    
    // Developers
    developers: [
        { id: 'prime', name: 'Prime Real Estate', logo: '🏗️', color: '#D4AF37' },
        { id: 'legacy', name: 'Legacy Real Estate', logo: '🏛️', color: '#8B4513' },
        { id: 'century', name: 'Century Real Estate', logo: '🏢', color: '#2C3E50' },
        { id: 'taikus', name: 'Taikus Real Estate', logo: '🌆', color: '#E74C3C' },
        { id: 'dmc', name: 'DMC Real Estate', logo: '🏘️', color: '#27AE60' }
    ],
    
    // Properties
    properties: [
        {
            id: 'prime-001',
            name: 'Prime Tower Bole',
            nameAm: 'ፕራይም ታወር ቦሌ',
            developer: 'prime',
            developerName: 'Prime Real Estate',
            location: 'Bole, Addis Ababa',
            locationAm: 'ቦሌ፣ አዲስ አበባ',
            type: 'residential',
            status: 'under-construction',
            priceMin: 180000,
            priceMax: 520000,
            priceRange: '$180,000 - $520,000',
            bedrooms: '2-4',
            bathrooms: '2-3',
            area: '145-380 sqm',
            areaValue: 145,
            floor: '3-18',
            roi: '14.2%',
            completionDate: '2025-08',
            description: 'A landmark mixed-use development featuring luxury apartments with panoramic city views, retail spaces, and world-class amenities. Prime Tower sets a new standard for urban living in Addis Ababa.',
            descriptionAm: 'የከተማ እይታዎችን ከሚያገናኙ የታላቅ አፓርታማዎች፣ የችርቻሮ ቦታዎች፣ እና የዓለም ደረጃ መሰንጠቂያዎች ጋር የታላቅ ማቀናበሪያ ልማት። ፕራይም ታወር በአዲስ አበባ የከተማ ኑሮ አዲስ መስፈርት ይዘረጋል።',
            amenities: ['Swimming Pool', 'Fitness Center', 'Underground Parking', '24/7 Security', 'Smart Home', 'Rooftop Garden', 'Conference Room', 'Kids Play Area'],
            amenitiesAm: ['የዋና መዋኛ', 'የአካል ብቃት ማዕከል', 'የመሬት ስር ፓርኪንግ', '24/7 ደህንነት', 'ስማርት ቤት', 'የጣራ ስፋራ ስፍራ', 'የጉባኤ ማዕከል', 'የህፃናት መጫወቻ ቦታ'],
            images: [
                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
            ],
            modelUrl: null,
            featured: true,
            coordinates: { lat: 9.0054, lng: 38.7636 }
        },
        {
            id: 'prime-002',
            name: 'Prime Villas CMC',
            nameAm: 'ፕራይም ቪላዎች ሲኤምሲ',
            developer: 'prime',
            developerName: 'Prime Real Estate',
            location: 'CMC, Addis Ababa',
            locationAm: 'ሲኤምሲ፣ አዲስ አበባ',
            type: 'residential',
            status: 'completed',
            priceMin: 320000,
            priceMax: 750000,
            priceRange: '$320,000 - $750,000',
            bedrooms: '4-6',
            bathrooms: '3-5',
            area: '380-620 sqm',
            areaValue: 380,
            floor: '2-3',
            roi: '11.8%',
            completionDate: '2023-12',
            description: 'Exclusive gated community of luxury villas with private gardens, swimming pools, and premium finishes. Located in the prestigious CMC area.',
            descriptionAm: 'በግል የተከበቡ የታላቅ ቪላዎች ክፍለ-ከተማ፣ በግል ገነቶች፣ የዋና መዋኛዎች፣ እና ፕሪሚየም ጨረቃዎች። በከበረው ሲኤምሲ አካባቢ የሚገኝ።',
            amenities: ['Private Garden', 'Swimming Pool', 'Home Cinema', 'Wine Cellar', 'Smart Security', 'Guest House', 'Garage (3-car)', 'Servant Quarters'],
            amenitiesAm: ['የግል ገነት', 'የዋና መዋኛ', 'የቤት ሲኒማ', 'የወይን ማከማቻ', 'ስማርት ደህንነት', 'የእንግዳ ቤት', 'ጋራዥ (3-መኪና)', 'የአገልጋይ ክፍሎች'],
            images: [
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
                'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
            ],
            modelUrl: null,
            featured: true,
            coordinates: { lat: 9.0204, lng: 38.8016 }
        },
        {
            id: 'legacy-001',
            name: 'Legacy Heights',
            nameAm: 'ሌጋሲ ሃይትስ',
            developer: 'legacy',
            developerName: 'Legacy Real Estate',
            location: 'Sarbet, Addis Ababa',
            locationAm: 'ሳርቤት፣ አዲስ አበባ',
            type: 'mixed',
            status: 'under-construction',
            priceMin: 150000,
            priceMax: 480000,
            priceRange: '$150,000 - $480,000',
            bedrooms: '1-3',
            bathrooms: '1-2',
            area: '85-280 sqm',
            areaValue: 85,
            floor: '1-12',
            roi: '13.5%',
            completionDate: '2026-03',
            description: 'Modern mixed-use development combining residential apartments with commercial spaces. Features sustainable design and energy-efficient systems.',
            descriptionAm: 'የመኖሪያ አፓርታማዎችን ከንግድ ቦታዎች ጋር የሚያጣመር ዘመናዊ ቅሚላ ልማት። ተገማሚ ዲዛይን እና የኃይል ብቃት ያላቸው ስርዓቶችን ያካትታል።',
            amenities: ['Solar Power', 'Rainwater Harvesting', 'Co-working Space', 'Cafe & Restaurant', 'EV Charging', 'Package Room', 'Pet Friendly', 'Bicycle Storage'],
            amenitiesAm: ['የፀሐይ ኃይል', 'የዝናብ ውሃ ማከማቻ', 'የጋራ ስራ ማዕከል', 'ካፌ እና ሬስቶራንት', 'EV ቻርጅ', 'ጥቅል ክፍል', 'የቤት እንስሳት ወዳጅ', 'የብስክሌት ማከማቻ'],
            images: [
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
                'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800&q=80',
                'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80',
                'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&q=80'
            ],
            modelUrl: null,
            featured: true,
            coordinates: { lat: 9.0104, lng: 38.7416 }
        },
        {
            id: 'legacy-002',
            name: 'Legacy Business Center',
            nameAm: 'ሌጋሲ የንግድ ማዕከል',
            developer: 'legacy',
            developerName: 'Legacy Real Estate',
            location: 'Kazanchis, Addis Ababa',
            locationAm: 'ከዛንቺስ፣ አዲስ አበባ',
            type: 'commercial',
            status: 'completed',
            priceMin: 200000,
            priceMax: 1200000,
            priceRange: '$200,000 - $1,200,000',
            bedrooms: 'N/A',
            bathrooms: '1-2 per unit',
            area: '120-800 sqm',
            areaValue: 120,
            floor: '1-8',
            roi: '16.8%',
            completionDate: '2022-06',
            description: 'Premium commercial complex in the heart of the business district. Ideal for offices, retail, and medical practices with high foot traffic.',
            descriptionAm: 'በልማት ዲስትሪክት ልብ ውስጥ የሚገኝ ፕሪሚየም የንግድ ክምር። ለቢሮዎች፣ ለችርቻሮ፣ እና ለሕክምና ልምምዶች ከከፍተኛ እግር ጉዞ ጋር ተስማሚ።',
            amenities: ['Elevator (4)', 'Backup Generator', 'Fiber Internet', 'CCTV', 'Fire Suppression', 'Parking (200+)', 'Reception Area', 'Meeting Rooms'],
            amenitiesAm: ['ሊፍት (4)', 'ተተኪ ጀነሬተር', 'ፋይበር ኢንተርኔት', 'ሲሲቲቪ', 'የእሳት መከላከያ', 'ፓርኪንግ (200+)', 'የመቀበያ ቦታ', 'የጉባኤ ክፍሎች'],
            images: [
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
                'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
                'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&q=80',
                'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80'
            ],
            modelUrl: null,
            featured: false,
            coordinates: { lat: 9.0154, lng: 38.7516 }
        },
        {
            id: 'century-001',
            name: 'Century Skyline',
            nameAm: 'ሴንቸሪ ስካይላይን',
            developer: 'century',
            developerName: 'Century Real Estate',
            location: 'Mexico, Addis Ababa',
            locationAm: 'ሜክሲኮ፣ አዲስ አበባ',
            type: 'residential',
            status: 'under-construction',
            priceMin: 120000,
            priceMax: 350000,
            priceRange: '$120,000 - $350,000',
            bedrooms: '1-3',
            bathrooms: '1-2',
            area: '75-240 sqm',
            areaValue: 75,
            floor: '1-15',
            roi: '12.4%',
            completionDate: '2025-11',
            description: 'Affordable luxury living with stunning skyline views. Century Skyline offers modern amenities at competitive prices for young professionals and families.',
            descriptionAm: 'በሚስብ ስካይላይን እይታዎች ጋር ተመጣጣኝ የታላቅ ኑሮ። ሴንቸሪ ስካይላይን ለወጣት ባለሙያዎች እና ለቤተሰቦች ዘመናዊ መሰንጠቂያዎችን በተወዳዳሪ ዋጋዎች ያቀርባል።',
            amenities: ['Gym', 'Community Hall', 'Parking', 'Security', 'Laundry Room', 'High-Speed Elevator', 'Balcony (All Units)', 'Storage Room'],
            amenitiesAm: ['ጂም', 'የማህበረሰብ አዳራሽ', 'ፓርኪንግ', 'ደህንነት', 'የታጠቢ ክፍል', 'ከፍተኛ ፍጥነት ሊፍት', 'ባልኮኒ (ሁሉም ዩኒቶች)', 'የማከማቻ ክፍል'],
            images: [
                'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
                'https://images.unsplash.com/photo-1560185007-c5ca92d3c3b8?w=800&q=80',
                'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80'
            ],
            modelUrl: null,
            featured: true,
            coordinates: { lat: 9.0354, lng: 38.7216 }
        },
        {
            id: 'century-002',
            name: 'Century Office Park',
            nameAm: 'ሴንቸሪ የቢሮ ፓርክ',
            developer: 'century',
            developerName: 'Century Real Estate',
            location: 'Bole, Addis Ababa',
            locationAm: 'ቦሌ፣ አዲስ አበባ',
            type: 'commercial',
            status: 'completed',
            priceMin: 180000,
            priceMax: 950000,
            priceRange: '$180,000 - $950,000',
            bedrooms: 'N/A',
            bathrooms: '1-3 per unit',
            area: '100-600 sqm',
            areaValue: 100,
            floor: '1-6',
            roi: '15.2%',
            completionDate: '2021-09',
            description: 'State-of-the-art office complex designed for modern businesses. Features flexible floor plans, ample parking, and premium infrastructure.',
            descriptionAm: 'ለዘመናዊ ቢዝነሶች የተነደፈ የቴክኒክ ደረጃ-በቁምር የቢሮ ክምር። ተለዋዋጭ የክፍል እቅዶችን፣ ብዙ ፓርኪንግ፣ እና ፕሪሚየም መሰረተ ልማትን ያካትታል።',
            amenities: ['Open Floor Plan', 'Server Room', 'Kitchenette', 'Rooftop Terrace', 'Visitor Parking', 'Access Control', 'AC (Central)', 'Backup Power'],
            amenitiesAm: ['ክፍት የክፍል እቅድ', 'ሰርቨር ክፍል', 'የማብሰያ ቦታ', 'የጣራ ተራራ', 'የጎብኝዎች ፓርኪንግ', 'የመግቢያ ቁጥጥር', 'ኤሲ (ማዕከላዊ)', 'ተተኪ ኃይል'],
            images: [
                'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
                'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80',
                'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
                'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80'
            ],
            modelUrl: null,
            featured: false,
            coordinates: { lat: 9.0054, lng: 38.7636 }
        },
        {
            id: 'taikus-001',
            name: 'Taikus Grand Residence',
            nameAm: 'ታይከስ ግራንድ ሬዚዳንስ',
            developer: 'taikus',
            developerName: 'Taikus Real Estate',
            location: 'Ayat, Addis Ababa',
            locationAm: 'አያት፣ አዲስ አበባ',
            type: 'residential',
            status: 'under-construction',
            priceMin: 95000,
            priceMax: 280000,
            priceRange: '$95,000 - $280,000',
            bedrooms: '1-3',
            bathrooms: '1-2',
            area: '65-210 sqm',
            areaValue: 65,
            floor: '1-10',
            roi: '13.8%',
            completionDate: '2025-06',
            description: 'Family-friendly community with spacious apartments, green spaces, and excellent connectivity. Perfect for first-time buyers and investors alike.',
            descriptionAm: 'ከስፋት ያላቸው አፓርታማዎች፣ የአረንጓዴ ቦታዎች፣ እና መልካም ትስስር ጋር ለቤተሰብ ተስማሚ ማህበረሰብ። ለፊርስት-ጊዜ ገዢዎች እና ለኢንቨስተሮች እኩል ተስማሚ።',
            amenities: ['Playground', 'Jogging Track', 'Community Garden', 'Basketball Court', 'Parking', 'Security Gate', 'Water Storage', 'Waste Management'],
            amenitiesAm: ['የመጫወቻ ቦታ', 'የመሮጫ መንገድ', 'የማህበረሰብ ገነት', 'የቅርጫት ኳስ ሜዳ', 'ፓርኪንግ', 'የደህንነት በር', 'የውሃ ማከማቻ', 'የቆሻሻ አስተዳደር'],
            images: [
                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
                'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80',
                'https://images.unsplash.com/photo-1560185007-c5ca92d3c3b8?w=800&q=80',
                'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80'
            ],
            modelUrl: null,
            featured: false,
            coordinates: { lat: 9.0754, lng: 38.8016 }
        },
        {
            id: 'taikus-002',
            name: 'Taikus Plaza',
            nameAm: 'ታይከስ ፕላዛ',
            developer: 'taikus',
            developerName: 'Taikus Real Estate',
            location: 'Piassa, Addis Ababa',
            locationAm: 'ፒያሳ፣ አዲስ አበባ',
            type: 'mixed',
            status: 'completed',
            priceMin: 250000,
            priceMax: 680000,
            priceRange: '$250,000 - $680,000',
            bedrooms: '2-4',
            bathrooms: '2-3',
            area: '140-320 sqm',
            areaValue: 140,
            floor: '2-8',
            roi: '14.5%',
            completionDate: '2022-12',
            description: 'Historic district meets modern luxury. Taikus Plaza offers premium apartments above retail spaces in the vibrant Piassa area.',
            descriptionAm: 'ታሪካዊ ዲስትሪክት ዘመናዊ ታላቅነትን ያገናኛል። ታይከስ ፕላዛ በብዙሀኑ ፒያሳ አካባቢ በችርቻሮ ቦታዎች ላይ ፕሪሚየም አፓርታማዎችን ያቀርባል።',
            amenities: ['Rooftop Cafe', 'Art Gallery', 'Event Space', 'Concierge', 'Valet Parking', 'Smart Entry', 'Double Glazing', 'Underfloor Heating'],
            amenitiesAm: ['የጣራ ካፌ', 'የኪነ-ጥበብ ጋሊሪ', 'የክስተት ቦታ', 'ኮንሲየርጅ', 'ቫሌት ፓርኪንግ', 'ስማርት መግቢያ', 'ድርብ መስኮት', 'የእግር ሙቀት'],
            images: [
                'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
                'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80',
                'https://images.unsplash.com/photo-1565008575389-3caac6f9f6c5?w=800&q=80',
                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'
            ],
            modelUrl: null,
            featured: true,
            coordinates: { lat: 9.0354, lng: 38.7516 }
        },
        {
            id: 'dmc-001',
            name: 'DMC Green Valley',
            nameAm: 'ዲኤምሲ ግሪን ቫሊ',
            developer: 'dmc',
            developerName: 'DMC Real Estate',
            location: 'Lebu, Addis Ababa',
            locationAm: 'ሌቡ፣ አዲስ አበባ',
            type: 'residential',
            status: 'under-construction',
            priceMin: 85000,
            priceMax: 220000,
            priceRange: '$85,000 - $220,000',
            bedrooms: '1-3',
            bathrooms: '1-2',
            area: '55-180 sqm',
            areaValue: 55,
            floor: '1-8',
            roi: '12.9%',
            completionDate: '2025-09',
            description: 'Sustainable living at its finest. DMC Green Valley features eco-friendly design, solar power, and extensive green spaces for healthy living.',
            descriptionAm: 'በጣም ጥሩው ተገማሚ ኑሮ። ዲኤምሲ ግሪን ቫሊ ኢኮ-ወዳጅ ዲዛይን፣ የፀሐይ ኃይል፣ እና ለጤናማ ኑሮ ያረከፈ የአረንጓዴ ቦታዎችን ያካትታል።',
            amenities: ['Solar Panels', 'Organic Garden', 'Recycling Center', 'Electric Car Charging', 'Green Roof', 'Water Filter', 'Air Purification', 'Yoga Deck'],
            amenitiesAm: ['የፀሐይ ፓነሎች', 'የኦርጋኒክ ገነት', 'የዳግም ጥቅም ማዕከል', 'የኤሌክትሪክ መኪና ቻርጅ', 'አረንጓዴ ጣራ', 'የውሃ ማጣሪያ', 'የአየር ማጽዳት', 'የዮጋ ዴክ'],
            images: [
                'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80',
                'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
                'https://images.unsplash.com/photo-1560185007-c5ca92d3c3b8?w=800&q=80'
            ],
            modelUrl: null,
            featured: false,
            coordinates: { lat: 8.9854, lng: 38.7816 }
        },
        {
            id: 'dmc-002',
            name: 'DMC Trade Center',
            nameAm: 'ዲኤምሲ የንግድ ማዕከል',
            developer: 'dmc',
            developerName: 'DMC Real Estate',
            location: 'Merkato, Addis Ababa',
            locationAm: 'መርካቶ፣ አዲስ አበባ',
            type: 'commercial',
            status: 'completed',
            priceMin: 80000,
            priceMax: 450000,
            priceRange: '$80,000 - $450,000',
            bedrooms: 'N/A',
            bathrooms: '1-2 per unit',
            area: '40-300 sqm',
            areaValue: 40,
            floor: '1-5',
            roi: '18.5%',
            completionDate: '2020-03',
            description: 'Strategically located in Africa\'s largest open-air market. DMC Trade Center offers retail and wholesale spaces with unmatched customer traffic.',
            descriptionAm: 'በአፍሪካ ትልቁ ክፍት-አየር ገበያ ውስጥ በትንታኔ የሚገኝ። ዲኤምሲ የንግድ ማዕከል ሽያጭ እና በጅምላ ቦታዎችን ከማይዛመድ የደንበኛ ጉዞ ጋር ያቀርባል።',
            amenities: ['Loading Dock', 'Cold Storage', 'Security (24/7)', 'ATM', 'Food Court', 'Prayer Room', 'Storage Units', 'Display Windows'],
            amenitiesAm: ['የመጫን መድረሻ', 'የቅዝቃዜ ማከማቻ', 'ደህንነት (24/7)', 'ኤቲኤም', 'የምግብ አዳራሽ', 'የጸሎት ክፍል', 'የማከማቻ ዩኒቶች', 'የማሳያ መስኮቶች'],
            images: [
                'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
                'https://images.unsplash.com/photo-1556742111-a301076d9d9a?w=800&q=80',
                'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
            ],
            modelUrl: null,
            featured: false,
            coordinates: { lat: 9.0354, lng: 38.7416 }
        }
    ],
    
    // Awards
    awards: {
        residential: [
            { project: 'Prime Villas CMC', developer: 'Prime Real Estate', year: '2024', rank: 1 },
            { project: 'Century Skyline', developer: 'Century Real Estate', year: '2024', rank: 2 },
            { project: 'Taikus Grand Residence', developer: 'Taikus Real Estate', year: '2023', rank: 3 }
        ],
        commercial: [
            { project: 'Legacy Business Center', developer: 'Legacy Real Estate', year: '2024', rank: 1 },
            { project: 'DMC Trade Center', developer: 'DMC Real Estate', year: '2023', rank: 2 },
            { project: 'Century Office Park', developer: 'Century Real Estate', year: '2023', rank: 3 }
        ],
        sustainable: [
            { project: 'DMC Green Valley', developer: 'DMC Real Estate', year: '2024', rank: 1 },
            { project: 'Legacy Heights', developer: 'Legacy Real Estate', year: '2024', rank: 2 },
            { project: 'Prime Tower Bole', developer: 'Prime Real Estate', year: '2023', rank: 3 }
        ],
        developer: [
            { name: 'Prime Real Estate', projects: 12, units: 850, year: '2024' },
            { name: 'Legacy Real Estate', projects: 8, units: 620, year: '2024' },
            { name: 'Century Real Estate', projects: 15, units: 1200, year: '2023' }
        ],
        topProjects: [
            { name: 'Prime Tower Bole', developer: 'Prime Real Estate', score: 98.5, category: 'Mixed Use' },
            { name: 'Legacy Business Center', developer: 'Legacy Real Estate', score: 97.2, category: 'Commercial' },
            { name: 'Prime Villas CMC', developer: 'Prime Real Estate', score: 96.8, category: 'Residential' },
            { name: 'DMC Green Valley', developer: 'DMC Real Estate', score: 95.4, category: 'Sustainable' },
            { name: 'Taikus Plaza', developer: 'Taikus Real Estate', score: 94.1, category: 'Mixed Use' }
        ]
    },
    
    // Sponsors
    sponsors: {
        platinum: [
            { name: 'Dashen Bank', logo: '🏦', type: 'Banking Partner' },
            { name: 'Ethiopian Airlines', logo: '✈️', type: 'Aviation Partner' },
            { name: 'Safaricom Ethiopia', logo: '📱', type: 'Technology Partner' }
        ],
        gold: [
            { name: 'Awash Bank', logo: '🏛️', type: 'Financial Partner' },
            { name: 'CBE', logo: '🏛️', type: 'Banking Partner' },
            { name: 'Ethio Telecom', logo: '📡', type: 'Connectivity Partner' },
            { name: 'East African Holding', logo: '🏭', type: 'Industrial Partner' }
        ],
        silver: [
            { name: 'Bunna Insurance', logo: '🛡️', type: 'Insurance Partner' },
            { name: 'Nyala Motors', logo: '🚗', type: 'Automotive Partner' },
            { name: 'Messebo Cement', logo: '🏗️', type: 'Construction Partner' },
            { name: 'Ethiopian Construction Works', logo: '⚙️', type: 'Engineering Partner' },
            { name: 'Addis Home Depot', logo: '🏠', type: 'Retail Partner' },
            { name: 'Blue Nile Logistics', logo: '🚚', type: 'Logistics Partner' }
        ]
    },
    
    // Magazine
    magazine: {
        featured: {
            title: 'The Future of Ethiopian Real Estate: 2024 Market Outlook',
            titleAm: 'የኢትዮጵያ ንብረት ወደፊት፡ የ2024 ገበያ እይታ',
            excerpt: 'An in-depth analysis of market trends, investment opportunities, and the growing demand for luxury properties in Addis Ababa and beyond.',
            excerptAm: 'በአዲስ አበባ እና በሌሎች ቦታዎች ለታላቅ ንብረቶች የገበያ ትራንዶች፣ የኢንቨስትሜንት እድሎች፣ እና እያደገ የመጣው ፍላጎት ጥልቅ ትንተና።',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
            category: 'Market Analysis',
            date: '2024-01-15',
            readTime: '8 min read'
        },
        articles: [
            {
                title: 'Sustainable Building Practices in Ethiopia',
                titleAm: 'በኢትዮጵያ ተገማሚ የሕንጻ ልምዶች',
                excerpt: 'How local developers are embracing green building standards and energy-efficient designs.',
                image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&q=80',
                category: 'Sustainability',
                date: '2024-01-10',
                readTime: '5 min read'
            },
            {
                title: 'Investment Guide: Bole vs CMC',
                titleAm: 'የኢንቨስትሜንት መመሪያ፡ ቦሌ ላይ ሲኤምሲ',
                excerpt: 'Comparing two of Addis Ababa\'s most prestigious neighborhoods for real estate investment.',
                image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=600&q=80',
                category: 'Investment',
                date: '2024-01-08',
                readTime: '6 min read'
            },
            {
                title: 'Smart Homes: The New Standard',
                titleAm: 'ስማርት ቤቶች፡ አዲሱ መስፈርት',
                excerpt: 'Technology integration in modern Ethiopian homes is changing how residents live.',
                image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80',
                category: 'Technology',
                date: '2024-01-05',
                readTime: '4 min read'
            },
            {
                title: 'Interview: Prime Real Estate CEO',
                titleAm: 'ቃለመጠይቅ፡ የፕራይም ንብረት ዋና ሥራ አስኪያጅ',
                excerpt: 'Exclusive insights from the leader of one of Ethiopia\'s fastest-growing developers.',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
                category: 'Interview',
                date: '2024-01-02',
                readTime: '10 min read'
            },
            {
                title: 'Commercial Real Estate Boom',
                titleAm: 'የንግድ ንብረት ፍልሰት',
                excerpt: 'Office spaces and retail centers are driving unprecedented growth in the sector.',
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
                category: 'Commercial',
                date: '2023-12-28',
                readTime: '7 min read'
            },
            {
                title: 'Legal Framework for Foreign Investors',
                titleAm: 'ለውጭ ኢንቨስተሮች የሕግ ማዕቀፍ',
                excerpt: 'Understanding the regulations and opportunities for international investment in Ethiopian property.',
                image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
                category: 'Legal',
                date: '2023-12-20',
                readTime: '9 min read'
            }
        ]
    },
    
    // Investor Downloads
    investorDownloads: [
        { title: '2024 Market Report', titleAm: 'የ2024 ገበያ ሪፖርት', size: '4.2 MB', type: 'PDF' },
        { title: 'Investment Guide - Residential', titleAm: 'የኢንቨስትሜንት መመሪያ - መኖሪያ', size: '2.8 MB', type: 'PDF' },
        { title: 'Investment Guide - Commercial', titleAm: 'የኢንቨስትሜንት መመሪያ - ንግድ', size: '3.1 MB', type: 'PDF' },
        { title: 'ROI Calculator Template', titleAm: 'ROI ካልኩሌተር ቴምፕሌት', size: '1.5 MB', type: 'XLSX' },
        { title: 'Developer Comparison Chart', titleAm: 'የአበልጻጅ ውድድር ገበታ', size: '2.2 MB', type: 'PDF' },
        { title: 'Legal Framework Summary', titleAm: 'የሕግ ማዕቀፍ ማጠቃለያ', size: '1.8 MB', type: 'PDF' }
    ]
};

// Make available globally
window.AppData = AppData;