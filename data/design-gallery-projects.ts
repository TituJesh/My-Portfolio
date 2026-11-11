// Migrated from https://titujeshurun-portfolio.vercel.app/all-projects on 2026-11-05.
// All original descriptions and media sets are retained. Videos load only on request.
export type GalleryProject = {
  id: number;
  title: string;
  category: 'Posters' | 'Branding' | 'Motion' | 'Invitations';
  categories: string[];
  year: string;
  client: string;
  description: string;
  image: string;
  media: { type: 'image' | 'video'; src: string }[];
  video?: string;
  link?: string;
};

export const galleryProjects: GalleryProject[] = [
  {
    "id": 1,
    "title": "Short Film Poster & Thumbnail (Meant To Be)",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2021",
    "client": "Chickums TV",
    "description": "Double Exposure , Monochrome & Duotone poster design.",
    "image": "/design-gallery/work/project-1-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-1-1.webp"
      },
      {
        "type": "image",
        "src": "/design-gallery/work/project-1-2.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-1"
  },
  {
    "id": 2,
    "title": "Event Poster (Paper Presentation)",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2025",
    "client": "Synexzia",
    "description": "engaging academic poster for a paper presentation event, blending realistic visuals with clean typography to ensure clarity and impact.",
    "image": "/design-gallery/work/project-2-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-2-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-2"
  },
  {
    "id": 3,
    "title": "Promo Reel (Synexzia Event)",
    "category": "Motion",
    "categories": [
      "Reels"
    ],
    "year": "2025",
    "client": "Synexzia",
    "description": "Event promo reel for Synexzia.",
    "image": "/design-gallery/work/project-3-video.webp",
    "media": [
      {
        "type": "video",
        "src": "https://titujeshurun-portfolio.vercel.app/WhatsApp%20Video%202025-06-18%20at%2019.50.45_96f2204d.mp4"
      }
    ],
    "video": "https://titujeshurun-portfolio.vercel.app/WhatsApp%20Video%202025-06-18%20at%2019.50.45_96f2204d.mp4",
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-3"
  },
  {
    "id": 4,
    "title": "Promo Reel",
    "category": "Motion",
    "categories": [
      "Motion Graphics",
      "Posters",
      "Reels"
    ],
    "year": "2025",
    "client": "Synexzia",
    "description": "Motion Graphics promo and a poster for Synexzia",
    "image": "/design-gallery/work/project-4-video.webp",
    "media": [
      {
        "type": "video",
        "src": "https://titujeshurun-portfolio.vercel.app/WhatsApp%20Video%202025-06-18%20at%2019.51.14_1b377776.mp4"
      },
      {
        "type": "image",
        "src": "/design-gallery/work/project-4-2.webp"
      }
    ],
    "video": "https://titujeshurun-portfolio.vercel.app/WhatsApp%20Video%202025-06-18%20at%2019.51.14_1b377776.mp4",
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-4"
  },
  {
    "id": 5,
    "title": "Elegant Logo for Dance Brand",
    "category": "Branding",
    "categories": [
      "Logos"
    ],
    "year": "2022",
    "client": "Rameeza",
    "description": "A premium 3D logo design created for Rameez Choreography.",
    "image": "/design-gallery/work/project-5-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-5-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-5"
  },
  {
    "id": 6,
    "title": "Invitation poster",
    "category": "Invitations",
    "categories": [
      "Posters",
      "Invitations"
    ],
    "year": "2025",
    "client": "Carlin's Aari Paradise",
    "description": "Elegant & classic 25th wedding anniversary invitation cover poster.",
    "image": "/design-gallery/work/project-6-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-6-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-6"
  },
  {
    "id": 9,
    "title": "Pilot Film Poster & Thumbnail (Singam Oonai Aatukutty)",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2023",
    "client": "Chickums TV",
    "description": "Bold Tamil pilot film poster with gritty textures and manipulation poster which shows intense action-thriller vibe.",
    "image": "/design-gallery/work/project-9-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-9-1.webp"
      },
      {
        "type": "image",
        "src": "/design-gallery/work/project-9-2.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-9"
  },
  {
    "id": 10,
    "title": "Motion Graphics logo & Intro",
    "category": "Motion",
    "categories": [
      "Motion Graphics",
      "Logos"
    ],
    "year": "2022",
    "client": "DCU Productions",
    "description": "A sleek and dynamic intro animation crafted in After Effects for DCU Productions.",
    "image": "/design-gallery/work/project-10-video.webp",
    "media": [
      {
        "type": "video",
        "src": "https://titujeshurun-portfolio.vercel.app/WhatsApp%20Video%202025-06-18%20at%2019.55.41_667e7a5a.mp4"
      },
      {
        "type": "image",
        "src": "/design-gallery/work/project-10-2.webp"
      }
    ],
    "video": "https://titujeshurun-portfolio.vercel.app/WhatsApp%20Video%202025-06-18%20at%2019.55.41_667e7a5a.mp4",
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-10"
  },
  {
    "id": 11,
    "title": "Promotion Poster & Thumbnail (Singam Oonai Aatukutty)",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2023",
    "client": "Chickums TV",
    "description": "promotion poster with smudge painting and manipulation poster for SOA.",
    "image": "/design-gallery/work/project-11-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-11-1.webp"
      },
      {
        "type": "image",
        "src": "/design-gallery/work/project-11-2.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-11"
  },
  {
    "id": 12,
    "title": "Short Film First Look Posters",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2023",
    "client": "Chickums TV",
    "description": "Elegant and classic posters designed for the short film kaadhal irandu ezhuthu with enhanced colours.",
    "image": "/design-gallery/work/project-12-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-12-1.webp"
      },
      {
        "type": "image",
        "src": "/design-gallery/work/project-12-2.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-12"
  },
  {
    "id": 13,
    "title": "Event Poster (Online Gaming)",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2025",
    "client": "Synexzia",
    "description": "Immersive poster crafted for a competitive gaming event, integrating weapon props and lighting to reflect intense shooter gameplay themes.",
    "image": "/design-gallery/work/project-13-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-13-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-13"
  },
  {
    "id": 14,
    "title": "Event Poster (Mission impossible)",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2025",
    "client": "Synexzia",
    "description": "Mystery event poster with noir aesthetics and surreal tunnel design, symbolizing suspense, mind games, and an unraveling hidden truth.",
    "image": "/design-gallery/work/project-14-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-14-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-14"
  },
  {
    "id": 15,
    "title": "Music Event Poster (Makka Mishi)",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2025",
    "client": "Synexzia",
    "description": "Vibrant poster designed for a 3-round music competition, blending energetic typography with audio-themed elements like headphones.",
    "image": "/design-gallery/work/project-15-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-15-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-15"
  },
  {
    "id": 16,
    "title": "Event Poster (Short Film Fest)",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2025",
    "client": "Synexzia",
    "description": "A quirky retro-style poster using vintage TV and bold color blocks to promote a student short film competition.",
    "image": "/design-gallery/work/project-16-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-16-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-16"
  },
  {
    "id": 17,
    "title": "Name Reveal Poster (Synexzia)",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2025",
    "client": "Synexzia",
    "description": "A name reveal elegant and modern poster for the Event Synexzia.",
    "image": "/design-gallery/work/project-17-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-17-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-17"
  },
  {
    "id": 18,
    "title": "Logo for Synexzia",
    "category": "Branding",
    "categories": [
      "Logos"
    ],
    "year": "2025",
    "client": "Synexzia",
    "description": "A sleek 3D logo for SYNEZXIA with bold lines, deep shadows, and spaced serif text, conveying strength and elegance.",
    "image": "/design-gallery/work/project-18-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-18-1.webp"
      },
      {
        "type": "image",
        "src": "/design-gallery/work/project-18-2.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-18"
  },
  {
    "id": 19,
    "title": "Manipulation & typography Short Film Poster",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2022",
    "client": "Rahul",
    "description": "A Manipulation & typography Short Film Poster (Kaadhal Ennum Jaadhi) for Rahul.",
    "image": "/design-gallery/work/project-19-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-19-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-19"
  },
  {
    "id": 21,
    "title": "Promotion Posters of Glimpse reveal (Singam Oonai Aatukutty)",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2023",
    "client": "Chickums TV",
    "description": "Thriller promotion and motion graphics posters for SOA.",
    "image": "/design-gallery/work/project-21-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-21-1.webp"
      },
      {
        "type": "image",
        "src": "/design-gallery/work/project-21-2.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-21"
  },
  {
    "id": 22,
    "title": "Short Film promotion Poster",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2023",
    "client": "Chickums TV",
    "description": "conceptual promotional poster designed for the short film kaadhal irandu ezhuthu.",
    "image": "/design-gallery/work/project-22-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-22-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-22"
  },
  {
    "id": 23,
    "title": "Intercollege Technical Symposium Event Posters",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2025",
    "client": "Synexzia",
    "description": "Modern, vibrant poster with bold typography and dynamic layout, effectively showcasing SYNEZXIA 2K25’s events, theme, and essential details.",
    "image": "/design-gallery/work/project-23-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-23-1.webp"
      },
      {
        "type": "image",
        "src": "/design-gallery/work/project-23-2.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-23"
  },
  {
    "id": 24,
    "title": "Song promo poster",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2024",
    "client": "Ashraf",
    "description": "A romantic poster with warm tones, vintage style, and emotional tension, visually expressing unspoken love through soft design and layout.",
    "image": "/design-gallery/work/project-24-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-24-1.webp"
      },
      {
        "type": "image",
        "src": "/design-gallery/work/project-24-2.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-24"
  },
  {
    "id": 25,
    "title": "V2S Arts & Sports Academy – Promotional Poster",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2025",
    "client": "Arun",
    "description": "A vibrant promotional poster for V2S Arts & Sports Academy, showcasing their diverse arts and sports programs with bold visuals & clear information.",
    "image": "/design-gallery/work/project-25-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-25-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-25"
  },
  {
    "id": 26,
    "title": "Horror Thriller poster",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2020",
    "client": "Ashraf",
    "description": "A horror thriller poster designed for the promotion of the short film pizhaipu.",
    "image": "/design-gallery/work/project-26-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-26-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-26"
  },
  {
    "id": 27,
    "title": "Synexzia Event Poster (IPL Auction)",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2025",
    "client": "Synexzia",
    "description": "A Retro Style Event Poster For the Symposium Event Synexzia.",
    "image": "/design-gallery/work/project-27-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-27-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-27"
  },
  {
    "id": 28,
    "title": "Synexzia's Media Partner Poster",
    "category": "Posters",
    "categories": [
      "Posters"
    ],
    "year": "2025",
    "client": "Synexzia",
    "description": "A vibrant, modern poster with bold typography and neon colors, highlighting a confident media partner For Synexzia Event.",
    "image": "/design-gallery/work/project-28-1.webp",
    "media": [
      {
        "type": "image",
        "src": "/design-gallery/work/project-28-1.webp"
      }
    ],
    "link": "https://titujeshurun-portfolio.vercel.app/all-projects#project-28"
  }
];
