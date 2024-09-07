const courses = [
  {
    roman: 'K01',
    title: {
      ko: '한국철학입문',
      en: 'Introduction to Korean Philosophy',
    },
    content: {
      ko: [
        "한국적 특수성을 가지면서 동시에 보편철학으로 기능할 수 있는 '한국철학'의 가능성을 탐구",
      ],
      en: [
        "Exploring the possibility of 'Korean philosophy' that possesses Korean-specific characteristics while also functioning as a universal philosophy",
      ],
    },
    img: '/images/main_card/card1.jpg',
  },
  {
    roman: 'K02',
    title: {
      ko: '한국철학소스북',
      en: 'Korean Philosophy Sourcebook',
    },
    content: {
      ko: ['한국철학사의 문헌자료를 발굴･분석･정리하며, 최종적으로 한국철학 소스북 출간을 목표'],
      en: [
        'Discovering, analyzing, and compiling documentary materials from the history of Korean philosophy, with the ultimate goal of publishing a sourcebook on Korean philosophy',
      ],
    },
    img: '/images/main_card/card2.jpg',
  },
  {
    roman: 'K03',
    title: {
      ko: '한국의 철학자들',
      en: 'Philosophers of Korea',
    },
    content: {
      ko: ['한국 철학자들의 생애와 사상을 소개'],
      en: ['Introducing the lives and thoughts of Korean philosophers'],
    },
    img: '/images/main_card/card3.jpg',
  },
  {
    roman: 'K04',
    title: {
      ko: '한국 철학의 논쟁',
      en: 'Debate in Korean Philosophy',
    },
    content: {
      ko: ["한국철학사에 나타난 `철학적 논쟁'을 통해 한국의 철학 체계가 성립하는 과정을 학습"],
      en: [
        'Learning the process by which the system of Korean philosophy was established through "philosophical debates" found in the history of Korean philosophy',
      ],
    },
    img: '/images/main_card/card4.jpg',
  },
  {
    roman: 'K05',
    title: {
      ko: '종교적 맥락에서 본 한국철학',
      en: 'Korean Philosophy in Religious Context',
    },
    content: {
      ko: ['한국인의 삶에 반영된 철학적 사유를 종교적 맥락에서 짚어보고, 그 사상적 의미를 파악'],
      en: [
        'Examining philosophical thinking reflected in the lives of Koreans within a religious context and understanding its ideological significance',
      ],
    },
    img: '/images/main_card/card5.jpg',
  },
  {
    roman: 'K06',
    title: {
      ko: '문화예술로 본 한국철학',
      en: 'Korean Philosophy in Cultural Arts',
    },
    content: {
      ko: ['한국의 문화예술에서 나타나는 다양한 사고방식과 표현양식을 철학적 지평에서 조명'],
      en: [
        'Illuminating the various ways of thinking and forms of expression found in Korean culture and arts from a philosophical perspective',
      ],
    },
    img: '/images/main_card/card6.jpg',
  },
  {
    roman: 'K07',
    title: {
      ko: '생활세계에서의 한국철학',
      en: 'Korean Philosophy in Everyday Life',
    },
    content: {
      ko: [
        '한국사회와 한국인의 삶에서 발견되는 다양한 가치와 사유방식 및 행동패턴을 철학적 차원에서 분석',
      ],
      en: [
        'Analyzing the diverse values, ways of thinking, and behavioral patterns found in Korean society and the lives of Koreans from a philosophical dimension',
      ],
    },
    img: '/images/main_card/card7.jpg',
  },
  {
    roman: 'K08',
    title: {
      ko: '한국철학의 확장성',
      en: 'Expansion of Korean Philosophy',
    },
    content: {
      ko: [
        '한국철학을 다각도의 방법론을 통해 재조명함으로써, 현대사회에서 한국철학의 역할 및 확장성을 타진',
      ],
      en: [
        'Analyzing the diverse values, ways of thinking, and behavioral patterns found in Korean society and the lives of Koreans from a philosophical dimension',
      ],
    },
    img: '/images/main_card/card8.jpg',
  },
  {
    roman: 'K09',
    title: {
      ko: '글로벌 한국철학',
      en: 'Global Korean Philosophy',
    },
    content: {
      ko: ['한국철학에 대한 외부의 시각을 유럽, 영미권, 중국 및 일본을 포괄하여 살펴봄'],
      en: [
        'Examining external perspectives on Korean philosophy, encompassing views from Europe, the Anglo-American world, China, and Japan',
      ],
    },
    img: '/images/main_card/card9.jpg',
  },
  {
    roman: 'K10',
    title: {
      ko: '한국철학 콘텐츠',
      en: 'Korean Philosophy Contents',
    },
    content: {
      ko: [
        '영상, 문학, 만화, 예술, 문화유산 등 문화콘텐츠를 소재로, 그 속에 담겨 있는 한국의 사상과 한국인의 사유를 소개',
      ],
      en: [
        'Introducing the thoughts of Korea and the thinking of Koreans embedded in cultural content such as films, literature, comics, arts, and cultural heritage',
      ],
    },
    img: '/images/main_card/card10.jpg',
  },
] as const

export type Course = (typeof courses)[number]

export default courses
