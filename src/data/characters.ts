export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  themeColor: string;
  badgeBg: string;
  greetings: string[];
  encouragements: string[];
}

export const CHARACTERS: Record<string, Character> = {
  lulu: {
    id: 'lulu',
    name: 'لولو',
    role: 'مرشدة ومقدمة التحديات',
    description: 'طالبة ذكية ومرحة بالزي المدرسي العُماني الأنيق، تحب إشعال روح الحماس والترحيب بالبطلات!',
    avatar: '/src/assets/images/avatar_lulu_student_1791815761671.jpg',
    themeColor: 'from-pink-500 to-rose-400',
    badgeBg: 'bg-pink-100 text-pink-700 border-pink-200',
    greetings: [
      'أهلًا بكِ يا بطلة الرياضيات! هل أنتِ مستعدة لخوض التحدي؟ 🎀',
      'يا مرحبًا! حصة الاحتياط اليوم مليئة بالمفاجآت والنجوم الذهبية ⭐',
      'معًا نجعل الرياضيات لعبتنا المفضلة ومغامرتنا الممتعة!'
    ],
    encouragements: [
      'رائعة جدًا! إجابتكِ دقيقة كالساعة ⏰✨',
      'ممتازة يا ذكية! خطوة أخرى نحو تاج المملكة 👑',
      'فخورة بكِ، استمري في هذا التألق!'
    ]
  },
  meera: {
    id: 'meera',
    name: 'ميرا',
    role: 'عاشقة الألغاز والأرقام',
    description: 'طالبة متميزة تعشق التحديات الحسابية وحل الشفرات والألعاب الذهنية السريعة.',
    avatar: '/src/assets/images/avatar_meera_puzzle_1791815804813.jpg',
    themeColor: 'from-purple-500 to-indigo-400',
    badgeBg: 'bg-purple-100 text-purple-700 border-purple-200',
    greetings: [
      'الأرقام لغتي وسر قوتي! ما رأيكِ في لغز سريع؟ 🧩',
      'لا يوجد لغز رياضي إلا وله مفتاح ذكي.. فلنكتشفه سويًا!',
      'تحدي اليوم يحتاج إلى تركيز وسرعة بديهة.. أنا واثقة منكِ!'
    ],
    encouragements: [
      'يا للروعة! حللتِ اللغز في غمضة عين 💡',
      'تفكير منطقي سليم 100%! أنتِ عبقرية الألغاز!',
      'تحدٍ صعب؟ لا شيء يصعب على بطلات سلطنة عُمان!'
    ]
  },
  jood: {
    id: 'jood',
    name: 'جود',
    role: 'المحققة وصائدة الأخطاء',
    description: 'طالبة دقيقة الملاحظة تساعد زميلاتها على اكتشاف الأخطاء الشائعة والتعلم منها بثقة.',
    avatar: '/src/assets/images/avatar_jood_detective_1791815814380.jpg',
    themeColor: 'from-teal-500 to-emerald-400',
    badgeBg: 'bg-teal-100 text-teal-700 border-teal-200',
    greetings: [
      'مرحبًا! أنا جود، الخطأ ليس نهاية الطريق بل هو أول خطوة للإتقان 🔍',
      'تعالي نتفحص خطوات الحل بعين المحققة الذكية!',
      'هل لاحظتِ ذلك الفخ الحسابي؟ دعينا نصححه معًا!'
    ],
    encouragements: [
      'عين صقر! اكتشفتِ الخطأ بدقة متناهية 🎯',
      'هكذا يتعلم العلماء الحقيقيون: بفهم أصل الخطأ وتصحيحه!',
      'أحسنتِ، لا فخ رياضي يستطيع خداعكِ بعد اليوم!'
    ]
  },
  noura: {
    id: 'noura',
    name: 'الأستاذة نورة',
    role: 'المرشدة الافتراضية',
    description: 'معلمة حكيمة وداعمة توضح القواعد التربوية وتقدم تلميحات ذكية تُشعل الفهم دون حرق الإجابة.',
    avatar: '/src/assets/images/avatar_teacher_noura_1791815772323.jpg',
    themeColor: 'from-amber-500 to-yellow-400',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    greetings: [
      'أهلًا بنجمات المستقبل! تذكري أن التفكير الرياضي يبني مستقبلكِ المشرق 🌟',
      'خُذي وقتكِ في قراءة المعطيات، فالحل يكمن بين السطور.',
      'إذا احتجتِ لتلميح يضيء لكِ الطريق، فأنا هنا دائمًا بجانبكِ.'
    ],
    encouragements: [
      'بارك الله في همتكِ العالية وفهمكِ العميق يا ابنتي 🌸',
      'هذا هو الفكر الرياضي المنظم الذي نفتخر به في منهج كامبردج!',
      'تدرجكِ في المستويات يُثبت أن الإصرار هو مفتاح النجاح.'
    ]
  }
};

export const PLATFORM_INFO = {
  title: 'مملكة الرياضيات الذكية',
  subtitle: 'مغامرات الأرقام 🎀',
  creator: 'إعداد وتصميم الأستاذة أميمة الحكماني',
  target: 'لتفعيل حصص الاحتياط في مادة الرياضيات – الصفين السابع والثامن (منهج كامبردج – سلطنة عُمان 🇴🇲)',
  heroImage: '/src/assets/images/hero_math_kingdom_1791815749577.jpg',
  castleRoomsImage: '/src/assets/images/math_castle_rooms_1791815783004.jpg',
};
