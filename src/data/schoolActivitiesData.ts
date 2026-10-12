import { SchoolActivityCard, SubstitutePlan } from '../types';

export const SCHOOL_HUB_CARDS: SchoolActivityCard[] = [
  {
    id: 'art-studio',
    title: 'مرسمي وإبداعي',
    category: 'فنون ورسم',
    icon: '🎨',
    color: 'from-pink-500 to-rose-400',
    description: 'تحدي الرسم في دقيقة، أكمل الرسمة، تصميم شعارات وبطاقات تشجيعية مبتكرة.',
    targetScreen: 'art-studio',
    duration: '٥-١٥ دقيقة',
    badge: 'إبداع فني',
  },
  {
    id: 'brain-puzzles',
    title: 'تحديات الذكاء والألغاز',
    category: 'تفكير وتركيز',
    icon: '🧠',
    color: 'from-purple-600 to-indigo-500',
    description: 'ألغاز لفظية ومنطقية، فك شفرات، تخمين الكلمة من الإيموجي، ولعبة من أنا؟',
    targetScreen: 'brain-puzzles',
    duration: '١٠-٢٠ دقيقة',
    badge: 'ذكاء وتركيز',
  },
  {
    id: 'talent-stage',
    title: 'مسرح المواهب والتقديم',
    category: 'إلقاء وتعبير',
    icon: '🎭',
    color: 'from-amber-500 to-yellow-400',
    description: 'تحدي الإلقاء في ٦٠ ثانية، المذيعة الصغيرة، وارتجال قصص مشوقة.',
    targetScreen: 'talent-stage',
    duration: '١٠-٢٥ دقيقة',
    badge: 'مواهب واعدة',
  },
  {
    id: 'classroom-games',
    title: 'الألعاب الصفية الجماعية',
    category: 'تفاعل جماعي',
    icon: '🎲',
    color: 'from-emerald-500 to-teal-400',
    description: 'التمثيل الصامت، ممنوع تقولين، الكرسي الساخن، وكنز الصف بدون أجهزة.',
    targetScreen: 'classroom-games',
    duration: '١٥-٣٠ دقيقة',
    badge: 'تعاون ومرح',
  },
  {
    id: 'discover-world',
    title: 'اكتشفي العالم ومعالم عُمان',
    category: 'ثقافة ومعرفة',
    icon: '🌍',
    color: 'from-sky-500 to-cyan-400',
    description: 'معالم سلطنة عُمان، عجائب العالم، مسابقات الأعلام، وأسرار الفضاء والعلوم.',
    targetScreen: 'discover-world',
    duration: '١٠-٢٠ دقيقة',
    badge: 'سفيرة الثقافة',
  },
  {
    id: 'innovation-lab',
    title: 'مختبر الابتكار والتفكير',
    category: 'حل مشكلات',
    icon: '💡',
    color: 'from-yellow-500 to-amber-500',
    description: 'ماذا لو اختفى الإنترنت؟ جسر الورق، مدينة المستقبل، وتحديات تصميم حلول.',
    targetScreen: 'innovation-lab',
    duration: '١٥-٣٠ دقيقة',
    badge: 'عقول مبتكرة',
  },
  {
    id: 'wellness-corner',
    title: 'ركن السعادة والطاقة الإيجابية',
    category: 'صحة نفسية وهدوء',
    icon: '🌸',
    color: 'from-rose-400 to-pink-500',
    description: 'دقيقة تنفس هادئة، عجلة الامتنان، بطاقة مزاج اليوم، وكلمات طيبة لزميلتي.',
    targetScreen: 'wellness-corner',
    duration: '٥-١٠ دقائق',
    badge: 'طاقة إيجابية',
  },
  {
    id: 'story-maker',
    title: 'اصنعي قصتك المشوقة',
    category: 'تأليف وخيال',
    icon: '🎬',
    color: 'from-fuchsia-500 to-purple-600',
    description: 'اختاري البطلة والمكان والمغامرة واكتشفي قصة ملهمة بعبرة تربوية رائعة.',
    targetScreen: 'story-maker',
    duration: '١٠-٢٠ دقيقة',
    badge: 'كاتبة بارعة',
  },
  {
    id: 'substitute-planner',
    title: 'منظّم حصص الاحتياط الشامل',
    category: 'أداة للمعلمة',
    icon: '⏰',
    color: 'from-indigo-600 to-purple-700',
    description: 'توليد خطة صفية جاهزة في ثوانٍ بخطوات متكاملة حسب الوقت والصف والأدوات.',
    targetScreen: 'substitute-planner',
    duration: '٥-٤٠ دقيقة',
    badge: 'تنظيم الحصة',
  },
  {
    id: 'classroom-tournaments',
    title: 'البطولات والمسابقات الصفية',
    category: 'منافسة شريفة',
    icon: '🏆',
    color: 'from-amber-600 to-orange-500',
    description: 'إدارة دوري صفي ممتع بين الفرق، جولات سريعة، واحتفال بجميع المشاركات.',
    targetScreen: 'classroom-tournaments',
    duration: '٢٠-٤٠ دقيقة',
    badge: 'كأس التميز',
  },
  {
    id: 'school-events',
    title: 'فعاليات المناسبات المدرسية',
    category: 'احتفالات وطنية ومدرسية',
    icon: '🎉',
    color: 'from-red-500 via-emerald-600 to-white',
    description: 'العيد الوطني العماني 🇴🇲، يوم المعلم، يوم المرأة العمانية، وتحدي الصداقة.',
    targetScreen: 'school-events',
    duration: '١٥-٣٠ دقيقة',
    badge: 'حب الوطن',
  },
  {
    id: 'lucky-wheel',
    title: 'عجلة الحظ والمهام السرية',
    category: 'مفاجآت وتحديات',
    icon: '🎯',
    color: 'from-teal-500 to-cyan-500',
    description: 'دوران سريع لاختيار مهمة سرية ممتعة، تحديات فنية، ألغاز، ومواقف سريعة.',
    targetScreen: 'lucky-wheel',
    duration: '٥-١٥ دقيقة',
    badge: 'مهمة سرية',
  },
  {
    id: 'speed-game',
    title: 'مملكة الرياضيات – من الأسرع؟',
    category: 'تحدي رياضي',
    icon: '⚡',
    color: 'from-pink-600 to-purple-600',
    description: 'تحديات حسابية متدرجة وفق منهج كامبردج للصفين السابع والثامن.',
    targetScreen: 'speed-game',
    duration: '١٠-٢٠ دقيقة',
    badge: 'بطلة الحساب',
  },
  {
    id: 'escape-castle',
    title: 'الهروب من قلعة الرياضيات',
    category: 'مغامرة وأبواب',
    icon: '🏰',
    color: 'from-amber-500 to-yellow-600',
    description: 'قصة تفاعلية بأربعة أبواب سحرية تتدرج لحل شفرات القلعة ونيل التاج.',
    targetScreen: 'escape-castle',
    duration: '١٥-٣٠ دقيقة',
    badge: 'فارسة القلعة',
  },
  {
    id: 'spot-error',
    title: 'المحققة جود – صائدة الأخطاء',
    category: 'دقة وتفكير نقدي',
    icon: '🔍',
    color: 'from-teal-600 to-emerald-600',
    description: 'اكتشاف الأخطاء الشائعة في الحل وتصحيحها بذكاء المحققة.',
    targetScreen: 'spot-error',
    duration: '١٠-١٥ دقيقة',
    badge: 'صائدة الأخطاء',
  },
  {
    id: 'mystery-boxes',
    title: 'صناديق المفاجآت والكنوز',
    category: 'ألغاز وجواهر',
    icon: '🎁',
    color: 'from-purple-500 to-pink-500',
    description: 'فتح ٦ صناديق كرتونية ملونة للحصول على نجوم وجواهر براقة.',
    targetScreen: 'mystery-boxes',
    duration: '١٠-٢٠ دقيقة',
    badge: 'جوهرة المملكة',
  },
];

// Art Challenges for Drawing Studio
export interface DrawingChallenge {
  id: string;
  title: string;
  timeLimitSeconds: number;
  description: string;
  inspirationTip: string;
  starterIdea: string;
}

export const ART_CHALLENGES: DrawingChallenge[] = [
  {
    id: 'art-1',
    title: 'تحدي الرسم في دقيقة واحدة ⏱️',
    timeLimitSeconds: 60,
    description: 'ارسمي شيئًا يعبر عن "كوب عصير منعش في يوم صيفي بمسقط" خلال ٦٠ ثانية فقط!',
    inspirationTip: 'ركزي على الخطوط الأساسية السريعة واللون الحيوي دون التدقيق في التفاصيل.',
    starterIdea: 'شريحة برتقال ومصاصة ملونة ومكعبات ثلج.',
  },
  {
    id: 'art-2',
    title: 'أكملي الرسمة المبتكرة ✏️',
    timeLimitSeconds: 120,
    description: 'تخيلي أن هناك نصف دائرة وخطين مائلين، حوّليها إلى كائن فضائي ودود أو قبعة سحرية!',
    inspirationTip: 'لا توجد طريقة خاطئة، أي خط تضيفينه يمنح الرسمة شخصية مميزة.',
    starterIdea: 'أضيفي عيونًا كرتونية كبيرة وابتسامة عريضة.',
  },
  {
    id: 'art-3',
    title: 'تصميم شعار لفريقكِ المدرسي 🛡️',
    timeLimitSeconds: 180,
    description: 'صممي شعارًا لطيفًا يمثل فريق "نجمات عُمان" أو "بطلات المستقبل".',
    inspirationTip: 'استخدمي أشكالًا هندسية بسيطة (نجمة، تاج، قلم، زهرة لوتس).',
    starterIdea: 'دائرة باللون البنفسجي بداخلها شعلة مضيئة أو قلم ذهبي.',
  },
  {
    id: 'art-4',
    title: 'اصنعي بطاقة تشجيعية لزميلتكِ 💌',
    timeLimitSeconds: 120,
    description: 'ارسمي بطاقة تهنئة أو رسالة دعم لطيفة مزينة بالزهور والقلوب والنجوم.',
    inspirationTip: 'اكتبي عبارة ملهمة مثل: "أنتِ قادرة على صنع المستحيل!".',
    starterIdea: 'إطار من أوراق الشجر الوردية مع نجمة لامعة في المنتصف.',
  },
  {
    id: 'art-5',
    title: 'صممي شخصية كرتونية خيالية 🦄',
    timeLimitSeconds: 180,
    description: 'ابتكري شخصية كرتونية لطيفة (مثل قطة خارقة تحب القراءة أو روبوت يعد الحلوى العُمانية).',
    inspirationTip: 'امنحي الشخصية ميزة غريبة تجعلها فريدة وتلفت الانتباه.',
    starterIdea: 'روبوت صغير يرتدي نظارة ويحمل ملعقة خشبية لخلط الحلوى.',
  },
  {
    id: 'art-6',
    title: 'تحدي الألوان الثلاثة 🎨',
    timeLimitSeconds: 120,
    description: 'ارسمي منظرًا طبيعيًا باستخدام ٣ ألوان فقط: الوردي، والبنفسجي، والأخضر النعناعي.',
    inspirationTip: 'تنسيق درجات الألوان المحدودة يبرز مهارة التناسق البصري.',
    starterIdea: 'تلال وردية وسماء بنفسجية وأشجار نعناعية ساحرة.',
  },
];

// Brain & Logic Non-Math Puzzles
export interface BrainPuzzle {
  id: string;
  category: 'emoji' | 'logic' | 'riddle' | 'whoami' | 'thinking';
  title: string;
  question: string;
  clues: string[];
  answer: string;
  explanation: string;
  options?: string[];
  correctIndex?: number;
}

export const BRAIN_PUZZLES: BrainPuzzle[] = [
  {
    id: 'bp-1',
    category: 'emoji',
    title: 'خمّني المثل الشعبي من الإيموجي 🧩',
    question: 'ما هو المثل الشعبي المقصود من هذه الرموز: ⏰ 🪙 🥇 ⏳',
    clues: ['المثل يتحدث عن أهمية الساعات والدقائق.', 'يقارن بين الوقت وثمين المعادن.'],
    answer: 'الوقت كالسيف إن لم تقطعه قطعك (أو: الوقت من ذهب)',
    explanation: 'الساعة والعملة والذهب والرمال تشير إلى أن الوقت أغلى من الذهب ويجب استثماره.',
    options: ['الوقت من ذهب', 'الصبر مفتاح الفرج', 'من جد وجد', 'رب اخ لم تلده امك'],
    correctIndex: 0,
  },
  {
    id: 'bp-2',
    category: 'whoami',
    title: 'لعبة «من أنا؟» 🕵️',
    question: 'أمشي بلا أقدام، وأبكي بلا عيون، وأطير في السماء بلا أجنحة، فمن أنا؟',
    clues: ['تظهرين عندما يحل فصل الشتاء أو الخريف.', 'تسقطين قطرات منعشة على الأرض والجبال.'],
    answer: 'السحابة (الغيوم)',
    explanation: 'السحابة تتحرك بالرياح وتمطر دموعًا (ماء المطر) وتطير في الأفق.',
    options: ['السحابة / الغيمة', 'الطائرة الورقية', 'السفينة', 'الريح'],
    correctIndex: 0,
  },
  {
    id: 'bp-3',
    category: 'logic',
    title: 'لغز التفكير المنطقي 💡',
    question: 'شيء يملكه الجميع، لكن الناس يستخدمونه أكثر مما تستخدمه أنت بنفسك. فما هو؟',
    clues: ['ينادونك به دائمًا.', 'سُمّيتِ به منذ ولادتكِ.'],
    answer: 'اسمكِ الشخصي!',
    explanation: 'اسمكِ ملككِ أنتِ، لكن الآخرين هم الذين ينادونك به طوال الوقت.',
    options: ['اسمكِ', 'هاتفكِ', 'حقيبتكِ', 'صوتكِ'],
    correctIndex: 0,
  },
  {
    id: 'bp-4',
    category: 'thinking',
    title: 'لغز خارج الصندوق 📦',
    question: 'ما هو الشيء الذي كلما أخذتِ منه كَبُر وازداد حجمه؟',
    clues: ['تجدينه في الأرض أو الرمل أو الجدران.', 'إذا أزلتِ التراب منها تتسع أكثر.'],
    answer: 'الحفرة!',
    explanation: 'الحفرة كلما أخذتِ وحفرتِ منها رملًا كبرت واتسعت!',
    options: ['الحفرة', 'العمر', 'الكتاب', 'الظل'],
    correctIndex: 0,
  },
  {
    id: 'bp-5',
    category: 'riddle',
    title: 'لغز الظل والأصدقاء 👥',
    question: 'يرافقكِ في النهار المشمس، لكنه يختفي تمامًا إذا دخلتِ غرفة مظلمة، فمن هو؟',
    clues: ['يقلد كل حركاتكِ بدقة.', 'لا يتكلم ولا يصدر صوتًا.'],
    answer: 'ظلكِ',
    explanation: 'الظل يتشكل عند حجب الضوء، ويختفي بغياب مصادر الإضاءة.',
    options: ['ظلكِ', 'صدى صوتكِ', 'مرآتكِ', 'حذاؤكِ'],
    correctIndex: 0,
  },
];

// Talent Stage Prompts
export interface TalentPrompt {
  id: string;
  title: string;
  type: string;
  durationSeconds: number;
  instructions: string;
  topicCard: string;
  tips: string;
}

export const TALENT_PROMPTS: TalentPrompt[] = [
  {
    id: 'talent-1',
    title: 'تحدي الإلقاء في ٦٠ ثانية 🎤',
    type: 'فصاحة وثقة',
    durationSeconds: 60,
    instructions: 'قفي وقدمي كلمة ملهمة لمدة دقيقة واحدة أمام زميلاتكِ عن موضوع البطاقة!',
    topicCard: '«لماذا تُعد القراءة هي القوة الخارقة الحقيقية لأي طالبة؟»',
    tips: 'تحدثي بنبرة واثقة، انظري لزميلاتكِ، وابدئي بمقدمة تشد الانتباه.',
  },
  {
    id: 'talent-2',
    title: 'المذيعة الصغيرة ونشرة الأخبار السعيدة 📺',
    type: 'تقديم إعلامي',
    durationSeconds: 90,
    instructions: 'تقمصي دور مذيعة تلفزيونية تنقل خبرًا سعيدًا وعاجلًا من مدرستكِ!',
    topicCard: '«عاجل: طالبات الصف الثامن يبتكرن حديقة مدرسية روبوتية تنتج الورد وتوزع الابتسامات!»',
    tips: 'استخدمي لغة الجسد، ابتسامة الكاميرا، وعبارة ختامية مميزة.',
  },
  {
    id: 'talent-3',
    title: 'حكاية من ثلاث صور 🖼️',
    type: 'سرد قصصي',
    durationSeconds: 90,
    instructions: 'ألّفي قصة شيقة ومضحكة تربط هذه العناصر الثلاثة معًا:',
    topicCard: 'العناصر الثلاثة: [نظارة شمسية 🕶️ · قطة ترتدي قبعة 🐱 · حلوى عُمانية ساخنة 🍮]',
    tips: 'اصنعي حبكة بسيطة: بداية، مشكلة غير متوقعة، ونهاية مرحة.',
  },
  {
    id: 'talent-4',
    title: 'تحدي التحدث دون قول كلمة معينة 🚫',
    type: 'تركيز لغوي',
    durationSeconds: 60,
    instructions: 'صفي يومكِ المدرسي المفضل لمدة دقيقة كاملة دون أن تنطقي حرف العطف (و) أو كلمة (ثم)!',
    topicCard: '«صفي جدول حصصكِ الممتع دون استخدام كلمة (و)!»',
    tips: 'استخدمي الوقفات القصيرة والجمل التامة للتحكم في الكلمات.',
  },
  {
    id: 'talent-5',
    title: 'إعلان تسويقي لمنتج خيالي عجيب 🛍️',
    type: 'إقناع وابتكار',
    durationSeconds: 60,
    instructions: 'أقنعي زميلاتكِ بشراء اختراع خيالي مفيد للمدرسة!',
    topicCard: '«حقيبة مدرسية تطير وتتحول لمظلة في المطر وتذكركِ بالواجبات!»',
    tips: 'اذكري المشكلة التي يحلها المنتج، سعره الرمزي، وعرضًا خاصًا لليوم فقط.',
  },
];

// Classroom Group Games (Playable on Projector / Single Screen)
export interface GroupGame {
  id: string;
  name: string;
  icon: string;
  players: string;
  instructions: string[];
  rules: string;
  sampleRounds: { prompt: string; answer?: string }[];
}

export const CLASSROOM_GAMES: GroupGame[] = [
  {
    id: 'charades',
    name: 'لعبة التمثيل الصامت (Charades) 🎭',
    icon: '🤐',
    players: 'فريقان أو أكثر',
    instructions: [
      'تخرج ممثلة من كل فريق لتقرأ الكلمة السرية من الشاشة دون أن يراها باقي الفريق.',
      'تمثل الكلمة بالحركات والإشارات فقط دون إصدار أي صوت أو حركة شفتين.',
      'أمام الفريق ٦٠ ثانية لتخمين الكلمة وكسب نقطة الجولة!',
    ],
    rules: 'ممنوع الكلام تمامًا أو الإشارة للأحرف!',
    sampleRounds: [
      { prompt: 'رائدة فضاء تطفو في الفضاء 🚀' },
      { prompt: 'صانعة حلوى عُمانية تحرك المرجل الساخن 🍮' },
      { prompt: 'معلمة تفتش عن قلم مفقود في حقيبتها 🔍' },
      { prompt: 'طالبة تحاول فتح مظلة في عاصفة مطرية ☔' },
      { prompt: 'طبيبة تجري فحصًا بالسماعة الطبية 🩺' },
    ],
  },
  {
    id: 'forbidden-words',
    name: 'لعبة «ممنوع تقولين!» 🚫',
    icon: '🤫',
    players: 'فريقان',
    instructions: [
      'تشرح الطالبة الكلمة الرئيسية لزميلاتها لكي يحزرنها.',
      'هناك ٣ كلمات ممنوعة لا يجوز نطقها أثناء الشرح!',
      'إذا نطقت كلمة ممنوعة يخسر الفريق محاولة الجولة.',
    ],
    rules: 'ممنوع استخدام مرادفات الكلمات المحظورة مباشرة.',
    sampleRounds: [
      { prompt: 'الكلمة: مدرسة 🏫 | الممنوع: [طلاب، معلمة، كتب]' },
      { prompt: 'الكلمة: قلعة نزوى 🏰 | الممنوع: [برج، قديم، عُمان]' },
      { prompt: 'الكلمة: هاتف ذكي 📱 | الممنوع: [اتصال، شاشة، نت]' },
      { prompt: 'الكلمة: شاطئ القرم 🏖️ | الممنوع: [بحر، رمل، ماء]' },
    ],
  },
  {
    id: 'five-seconds',
    name: 'لعبة «كلمة في ٥ ثوانٍ!» ⏱️',
    icon: '⚡',
    players: 'فردي أو فرق',
    instructions: [
      'يُعرض تحدٍ سريع يتطلب ذكر ٣ أشياء محددة خلال ٥ ثوانٍ فقط!',
      'يبدأ المؤقت الصوتي فور قراءة السؤال.',
    ],
    rules: 'التفكير السريع وذكر الإجابات الثلاث قبل رنين الجرس!',
    sampleRounds: [
      { prompt: 'اذكري ٣ ولايات في سلطنة عُمان تبدأ بحرف (ص) أو (ن)!' },
      { prompt: 'اذكري ٣ أشكال هندسية لها زوايا قائمة!' },
      { prompt: 'اذكري ٣ أشياء لونها وردي في غرفتكِ!' },
      { prompt: 'اذكري ٣ حيوانات تعيش في محميات عُمان (المها، الوعل...)!' },
      { prompt: 'اذكري ٣ كتب أو روايات مشهورة للناشئة!' },
    ],
  },
  {
    id: 'hot-seat',
    name: 'لعبة الكرسي الساخن (Hot Seat) 🔥',
    icon: '🪑',
    players: 'الصف بأكمله',
    instructions: [
      'تجلس طالبة متطوعة على كرسي أمام الصف وظهره للشاشة.',
      'تظهر كلمة خلفها على الشاشة يراها جميع الطالبات.',
      'تطرح الطالبة أسئلة بصيغة (نعم / لا) لتكتشف الشيء قبل انتهاء الوقت!',
    ],
    rules: 'الطالبات يجيبن بـ (نعم) أو (لا) فقط.',
    sampleRounds: [
      { prompt: 'الشيء: برج الصحوة بمسقط 🗼' },
      { prompt: 'الشيء: الحلوى العُمانية 🍮' },
      { prompt: 'الشيء: الفلج المائي 💧' },
      { prompt: 'الشيء: الآلة الحاسبة 🧮' },
    ],
  },
];

// Discover the World (Cultural & Omani Trivia)
export interface WorldTrivia {
  id: string;
  category: 'oman' | 'world' | 'science' | 'arabic';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const DISCOVER_WORLD_TRIVIA: WorldTrivia[] = [
  {
    id: 'dw-1',
    category: 'oman',
    question: 'ما هو أطول فلج مائي في سلطنة عُمان ويُعد من أكبر الأفلاج التاريخية؟',
    options: ['فلج دارس بولاية نزوى', 'فلج الخطمين ببركة الموز', 'فلج الميسر بالرستاق', 'فلج الجيلة بصور'],
    correctIndex: 0,
    explanation: 'فلج دارس في ولاية نزوى من أكبر الأفلاج وأشهرها، ومدرج ضمن قائمة التراث العالمي لليونسكو.',
  },
  {
    id: 'dw-2',
    category: 'oman',
    question: 'أي من الجبال العُمانية التالية يضم أعلى قمة جبلية في السلطنة (قمة جبل شمس)؟',
    options: ['سلسلة جبال الحجر الغربي', 'جبال ظفار', 'جبل سمحان', 'جبل القرا'],
    correctIndex: 0,
    explanation: 'جبل شمس يقع في سلسلة جبال الحجر الغربي ويصل ارتفاعه إلى حوالي ٣٠٠٩ أمتار فوق سطح البحر.',
  },
  {
    id: 'dw-3',
    category: 'world',
    question: 'ما هي عاصمة سلطنة عُمان التاريخية القديمة التي تشتهر بقلعتها الشهيرة وسوقها التراثي؟',
    options: ['نزوى', 'صحار', 'صلالة', 'الرستاق'],
    correctIndex: 0,
    explanation: 'نزوى كانت عاصمة لعُمان في فترات تاريخية هامة وتلقب بـ "بيضة الإسلام" وتشتهر بقلعتها الشهبانية.',
  },
  {
    id: 'dw-4',
    category: 'science',
    question: 'ما الكوكب في مجموعتنا الشمسية الذي يُعرف بلقب "الكوكب الأحمر" بسبب وفرة أكسيد الحديد على سطحه؟',
    options: ['المريخ', 'الزهرة', 'المشتري', 'عطارد'],
    correctIndex: 0,
    explanation: 'كوكب المريخ يظهر باللون الأحمر الصدئ بسبب وفرة مركبات الحديد في تربته وصخوره.',
  },
  {
    id: 'dw-5',
    category: 'arabic',
    question: 'ما هو جمع كلمة "حياة" في اللغة العربية الفصحى السليمة؟',
    options: ['حَيَوات', 'أحياء', 'حياتات', 'حُيُي'],
    correctIndex: 0,
    explanation: 'جمع كلمة "حياة" هو "حَيَوات" (بالألف والتاء مع فتح الحاء والياء).',
  },
  {
    id: 'dw-6',
    category: 'science',
    question: 'حقيقة أم خرافة: النباتات تصنع غذاءها بنفسها بعملية البناء الضوئي وتطلق غاز الأكسجين نهارًا؟',
    options: ['حقيقة علمية مؤكدة', 'خرافة غير صحيحة'],
    correctIndex: 0,
    explanation: 'حقيقة علمية؛ تقوم النباتات بامتصاص ثاني أكسيد الكربون وضوء الشمس والماء لتنتج السكر وتطلق الأكسجين.',
  },
];

// Innovation Lab Scenarios
export interface InnovationScenario {
  id: string;
  title: string;
  problem: string;
  timeMinutes: number;
  steps: string[];
  deliverable: string;
}

export const INNOVATION_SCENARIOS: InnovationScenario[] = [
  {
    id: 'inno-1',
    title: 'تحدي: ماذا لو اختفى الإنترنت لمدة ٢٤ ساعة؟ 🌐',
    problem: 'انقطع الإنترنت في جميع أنحاء العالم ليوم كامل! كيف ستنظم الطالبات يومهن المدرسي والترفيهي بدونه؟',
    timeMinutes: 15,
    steps: [
      'تحديد ٣ أنشطة بديلة ممتعة للتعلم والتواصل دون شاشات.',
      'ابتكار طريقة لنقل الرسائل العاجلة بين الفصول المدرسية.',
      'كتابة جدول زمني ليوم كامل مفعم بالحياة والأنشطة الواقعية.',
    ],
    deliverable: 'خريطة ذهنية تعرض "يومنا الحقيقي الرائع بدون شاشات".',
  },
  {
    id: 'inno-2',
    title: 'ابتكار أداة تسهل الحياة داخل الصف المدرسي 🎒',
    problem: 'الحقائب المدرسية الثقيلة أو ضياع الأدوات الصغيرة مشكلة متكررة للطالبات.',
    timeMinutes: 20,
    steps: [
      'اختيار مشكلة صفية واحدة (تنظيم الأقلام، الوزن، النظافة).',
      'رسم مخطط أولي لأداة أو منظم مصنوع من خامات معاد تدويرها.',
      'تحديد اسم تجاري جذاب ومميزات الاختراع.',
    ],
    deliverable: 'رسم توضيحي للاختراع وشرح طريقة عمله في ٣ أسطر.',
  },
  {
    id: 'inno-3',
    title: 'تحدي جسر الورق المتين 🌉',
    problem: 'باستخدام ورقتين فقط ومسطرة، كيف نصنع جسرًا ورقيًا يحمل ممحاة أو قلمًا دون أن يسقط؟',
    timeMinutes: 10,
    steps: [
      'طي الورق بطريقة مضلعة (الأوكورديون / شكل مثلثات كالمثلثات الهندسية).',
      'اختبار قدرة الهيكل على توزيع الثقل.',
      'استنتاج كيف تفيد الهندسة والزوايا في البناء المعماري الحقيقي.',
    ],
    deliverable: 'هيكل جسر ورقي ناجح وتفسير سر تماسك المثلثات.',
  },
];

// Story Maker Options & Library
export interface StoryTemplate {
  character: string;
  location: string;
  adventureType: string;
  conflict: string;
  fullStory: string;
  moralLesson: string;
  title: string;
}

export const STORY_TEMPLATES: StoryTemplate[] = [
  {
    character: 'مريم، الطالبة الفضولية المحبة للاكتشاف 🌸',
    location: 'المكتبة المدرسية التراثية ببهلاء 📚',
    adventureType: 'البحث عن خريطة قديمة 🗺️',
    conflict: 'العثور على صندوق مقفل بشفرة شعرية غامضة 🗝️',
    title: 'سر الخريطة المنسية بين أرفف بهلاء 📖',
    fullStory: `في ظهيرة يوم هادئ، كانت مريم تتصفح كتابًا قديمًا في زاوية المكتبة المدرسية. انزلقت من بين صفحاته ورقة صفراء رقيقة كُتبت عليها أبيات شعرية تشير إلى قفل سري خلف رف المعاجم! دعت مريم زميلتها ريم، وتشاركتا في فك معاني الأبيات. حين ضغطتا على النقش الصحيح، انفتح درج مخفي كشف عن مذكرات مديرة المدرسة الأولى قبل خمسين عامًا، تدعو فيه طالبات المستقبل للمثابرة ونيل شرف خدمة عُمان الحبيبة!`,
    moralLesson: 'القراءة والتعاون بين الصديقات يفتحان أعظم الكنوز العلمية والتاريخية.',
  },
  {
    character: 'فاطمة، محبة العلوم والروبوتات 🤖',
    location: 'مختبر الابتكار المدرسي بصلالة 🌴',
    adventureType: 'اختراع روبوت صديق للبيئة 🌱',
    conflict: 'نفاد بطارية الروبوت قبل بدء المعرض المدرسي بعشر دقائق! ⏳',
    title: 'شمس ظفار تنقذ المعرض العلمي ☀️',
    fullStory: `كانت فاطمة وفريقها يضعون اللمسات الأخيرة على روبوت يجمع أوراق الشجر المتساقطة ويعيد تدويرها سمادًا للزهور. فجأة، انطفأت شاشة الروبوت معلنة نفاد الطاقة! لم تستسلم فاطمة؛ بل تذكرت لوح الطاقة الشمسية الصغير في حقيبة التجارب. سارعت إلى تثبيته في الجزء العلوي وفتحت ستارة النافذة لتتدفق أشعة الشمس الساطعة. في دقائق، دبت الحياة مجددًا في الروبوت وسط تصفيق المعلمات وتشجيع الزميلات!`,
    moralLesson: 'التفكير الهادئ السريع واستثمار الطاقة البديلة هما طريق المبتكرين نحو النجاح.',
  },
];

// Ready-to-go Substitute Lesson Plans (منظّم حصص الاحتياط الشامل)
export function generateSubstitutePlan(
  grade: 7 | 8,
  durationMinutes: number,
  activityType: 'calm' | 'active' | 'team' | 'individual' | 'creative' | 'knowledge'
): SubstitutePlan {
  const plans: Record<string, SubstitutePlan> = {
    calm: {
      id: `plan-calm-${durationMinutes}`,
      grade,
      durationMinutes,
      activityType: 'calm',
      title: 'واحة الهدوء والتركيز الذهني 🌸',
      introHook: 'ترحيب هادئ وتشغيل موسيقى تنفس طبيعية هادئة مدتها دقيقة لتهيئة الصف.',
      mainActivity: 'تحدي الألغاز الذهنية الفردية ورسم بطاقات الامتنان والتشجيع في دفاتر الطالبات.',
      rules: [
        'العمل بهدوء تام مع احترام خصوصية الزميلات.',
        'رفع اليد للمشاركة بهمس وبشاشة.',
      ],
      stageTiming: [
        { stage: 'التهيئة ودقيقة التنفس الهادئ', minutes: Math.round(durationMinutes * 0.15) },
        { stage: 'تحدي التفكير والألغاز الهادئة', minutes: Math.round(durationMinutes * 0.55) },
        { stage: 'تدوين عبارة شكر وامتنان ختامية', minutes: Math.round(durationMinutes * 0.3) },
      ],
      bonusChallenge: 'كتابة لغز ذكي في ورقة وتبادله مع الزميلة المجاورة لحله.',
      celebrationWrapUp: 'قراءة ٣ رسائل امتنان عشوائية وتبادل الابتسامات الدافئة.',
    },
    active: {
      id: `plan-active-${durationMinutes}`,
      grade,
      durationMinutes,
      activityType: 'active',
      title: 'مغامرة الحماس والتحدي الصفي ⚡',
      introHook: 'إعلان بدء دوري الصف السريع مع تقسيم الطالبات إلى فرق متكافئة وودية.',
      mainActivity: 'لعبة «التمثيل الصامت» ولعبة «كلمة في ٥ ثوانٍ» مع مؤقت صوتي تفاعلي على الشاشة.',
      rules: [
        'المنافسة بروح رياضية وأخلاق متميزة.',
        'التصفيق لكل إجابة صحيحة من أي فريق.',
      ],
      stageTiming: [
        { stage: 'تقسيم الفرق وإعلان الشعار', minutes: Math.round(durationMinutes * 0.15) },
        { stage: 'جولات التمثيل الصامت والسرعة', minutes: Math.round(durationMinutes * 0.6) },
        { stage: 'إعلان لوحة الشرف وتتويج النجمات', minutes: Math.round(durationMinutes * 0.25) },
      ],
      bonusChallenge: 'جولة الحسم الذهبية: لغز عُماني سريع يمنح ٥ نقاط إضافية.',
      celebrationWrapUp: 'احتفال بالفرق جميعًا ومنح شارة التعاون والمرح الصفي.',
    },
    creative: {
      id: `plan-creative-${durationMinutes}`,
      grade,
      durationMinutes,
      activityType: 'creative',
      title: 'ورشة المرسم والمواهب المبتكرة 🎨',
      introHook: 'طرح فكرة ملهمة غير مألوفة تدعو للتفكير الحر دون قيود دراسية تقليدية.',
      mainActivity: 'تحدي الرسم في دقيقة واحدة، ثم كتابة سيناريو قصة قصيرة وعرضها على زميلات الصف.',
      rules: [
        'التقييم قائم على الفكرة والخيال وليس مهارة الرسم فقط.',
        'تشجيع الأفكار الطريفة والغريبة بإيجابية.',
      ],
      stageTiming: [
        { stage: 'عرض بطاقة التحدي الفني', minutes: Math.round(durationMinutes * 0.15) },
        { stage: 'تنفيذ العمل الفني أو القصة', minutes: Math.round(durationMinutes * 0.6) },
        { stage: 'معرض الصف السريع واستعراض الأعمال', minutes: Math.round(durationMinutes * 0.25) },
      ],
      bonusChallenge: 'إضافة تفصيلة خيالية جديدة للرسمة من فكرة تقترحها الزميلة.',
      celebrationWrapUp: 'تعليق أبرز الأعمال في لوحة إبداعات الصف وتشجيع الجميع.',
    },
  };

  return plans[activityType] || plans['calm'];
}
