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
        '한국철학 교육과 연구의 기초',
      ],
      en: [
        "Exploring the possibility of 'Korean philosophy' that can function as universal philosophy while having Korean specificity",
        'Foundation of Korean philosophy education and research',
      ],
    },
    img: '/images/main_card/card01.webp',
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
        'Discover, analyze, and organize the literary materials of Korean philosophy history, and ultimately aim to publish the Korean Philosophy Sourcebook',
      ],
    },
    img: '/images/main_card/card02.webp',
  },
  {
    roman: 'K03',
    title: {
      ko: '한국의 철학자들',
      en: 'Philosophers of Korea',
    },
    content: {
      ko: [
        '대표적 철학자 뿐 아니라 그동안 관심을 받지 못했던 철학자들을 발굴하여 한국철학자 사전 완성을 목표',
      ],
      en: [
        'In addition to representative philosophers, aim to complete a dictionary of Korean philosophers by discovering philosophers who have not received attention so far',
      ],
    },
    img: '/images/main_card/card01.webp',
  },
  {
    roman: 'K04',
    title: {
      ko: '한국 철학의 논쟁',
      en: 'Debate in Korean Philosophy',
    },
    content: {
      ko: [
        "한국철학사에 나타난 `철학적 논쟁'을 통해 한국의 철학 체계가 성립하는 과정을 학습",
        '한국철학 국내 연구 성과의 소개',
      ],
      en: [
        'Learn about the process of establishing the philosophical system of Korea through the `philosophical debate` that appeared in the history of Korean philosophy',
        'Introduction of domestic research results on Korean philosophy',
      ],
    },
    img: '/images/main_card/card02.webp',
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
        'Examine the philosophical thoughts reflected in the lives of Koreans in a religious context and understand their philosophical significance',
      ],
    },
    img: '/images/main_card/card01.webp',
  },
  {
    roman: 'K06',
    title: {
      ko: '문화예술로 본 한국철학',
      en: 'Korean Philosophy in Cultural Arts',
    },
    content: {
      ko: [
        '한국의 문화･예술에서 나타나는 다양한 사고방식과 표현양식을 철학적 지평에서 조명',
        '해외 연구자 및 학습자의 관심에 응답',
      ],
      en: [
        'Illuminate the various ways of thinking and forms of expression found in Korean culture and arts from a philosophical perspective',
        'Respond to the interests of overseas researchers and learners',
      ],
    },
    img: '/images/main_card/card02.webp',
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
        'Analyze various values, ways of thinking, and behavior patterns found in Korean society and the lives of Koreans from a philosophical perspective',
      ],
    },
    img: '/images/main_card/card01.webp',
  },
  {
    roman: 'K08',
    title: {
      ko: '한국철학의 확장성',
      en: 'Expansion of Korean Philosophy',
    },
    content: {
      ko: [
        '한국철학을 다각도의 방법론을 통해 재조명함으로써, 현대사회에서 한국철학의 역할 및 확장성을 타진한국철학 세계의 확장',
      ],
      en: [
        'By re-examining Korean philosophy through various methodologies, the role and expansibility of Korean philosophy in modern society are explored',
      ],
    },
    img: '/images/main_card/card02.webp',
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
        'Examine external perspectives on Korean philosophy, covering Europe, the English-speaking world, China, and Japan',
      ],
    },
    img: '/images/main_card/card01.webp',
  },
  {
    roman: 'K10',
    title: {
      ko: '한국철학 콘텐츠',
      en: 'Korean Philosophy Contents',
    },
    content: {
      ko: [
        "한국의 전통사상에 깃든 다양한 '원형'을 발견하고, 문화콘텐츠 및 융합콘텐츠로서의 발전방안을 모색",
      ],
      en: [
        "Discover various 'prototypes' embedded in Korea's traditional thoughts and explore ways to develop them as cultural contents and fusion contents",
      ],
    },
    img: '/images/main_card/card02.webp',
  },
  {
    roman: 'K11',
    title: {
      ko: '한국철학 필수',
      en: 'Essential Korean Philosophy',
    },
    content: {
      ko: ['한국철학에 입문하기 위한 필수 · 기초 과정', '4개의 강좌로 구성되어 있음'],
      en: ['Essential and basic course to introduce Korean philosophy', 'Consists of 4 courses'],
    },
    img: '/images/main_card/card02.webp',
  },
  {
    roman: 'K12',
    title: {
      ko: '한국철학 선택',
      en: 'Selected Korean Philosophy',
    },
    content: {
      ko: [
        '한국철학에 대해 더 알고 싶은 사람들을 위한 선택 · 심화 과정',
        '5개의 강좌로 구성되어 있음',
      ],
      en: [
        'Selected and advanced course for those who want to know more about Korean philosophy',
        'Consists of 5 courses',
      ],
    },
    img: '/images/main_card/card02.webp',
  },
] as const

export type Course = (typeof courses)[number]

export default courses
