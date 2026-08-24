import { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  School, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  ExternalLink, 
  Download, 
  UploadCloud, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  HelpCircle, 
  Sparkles, 
  Check, 
  RotateCw, 
  Lock 
} from "lucide-react";

// D-Day target date: August 25, 2026, 17:00 KST
const TARGET_DATE_KST = "2026-08-25T17:00:00+09:00";

interface FAQItem {
  question: string;
  answer: string;
}

export default function App() {
  // 1. Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  // Calculate remaining time
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = new Date(TARGET_DATE_KST).getTime();
      const currentTime = Date.now();
      const difference = targetTime - currentTime;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  // 2. Self-Check Tracker State
  const [checklist, setChecklist] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const completedSteps = Object.values(checklist).filter(Boolean).length;
  const progressPercent = (completedSteps / 4) * 100;

  // Reset checklist helper
  const handleResetChecklist = () => {
    setChecklist({
      step1: false,
      step2: false,
      step3: false,
      step4: false,
    });
  };

  // 3. FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const faqs: FAQItem[] = [
    {
      question: "용량이 큰 드라이브 전체를 백업받으면 안 되나요?",
      answer: "용량이 크면 구글 서버가 백업 파일을 구성하는 데 많은 시간이 소요(몇 시간 혹은 하루 이상)되며, 다운로드 중 연결이 끊어져 실패할 가능성도 큽니다. 그렇기 때문에 전체 백업보다는 국어, 수학, 영어, 사회 등 각 수업 시간에 직접 수행평가나 과제물로 만들었던 중요 구글 문서(Docs, Sheets, Slides) 위주로 선택하여 백업하는 방식을 강력히 추천합니다."
    },
    {
      question: "가입할 때 쓰는 계정 아이디(ID)는 제 마음대로 지어도 되나요?",
      answer: "네, 그렇습니다! 경기도교육청 구글 계정(@goedu.kr) 앞부분에 들어갈 ID는 여러분이 직접 원하는 영문이나 숫자, 영문숫자 조합 등을 활용하여 완전히 자유롭게 설정하고 등록할 수 있습니다."
    },
    {
      question: "2단계 인증이나 다중 인증(MFA)을 꼭 설정해야 하나요?",
      answer: "의무가 아닌 개인의 보안을 돕는 권장사항(선택)입니다. 다만 계정 도용이나 외부 해킹 공격을 효과적으로 방어하기 위해 가능하면 스마트폰 번호 등으로 연동을 걸어두는 것을 적극 추천해 드립니다."
    },
    {
      question: "마감 일시(2026년 8월 25일 17:00) 이후에는 백업이 완전히 불가능한가요?",
      answer: "네, 맞습니다. 최근 빈번해진 학교 대상 외부 해킹 공격 및 개인정보 도용 보안 리스크를 차단하기 위해 2026년 8월 25일 화요일 17:00 정각에 기존 학교 구글 계정(@sawoo.hs.kr)이 일괄적으로 영구 비활성화 처리됩니다. 마감 시간 이후에는 로그인 자체가 되지 않고 모든 원본 데이터가 영구 유실되어 복구할 수 없으므로 반드시 기한 내에 완료하셔야 합니다."
    },
    {
      question: "백업받은 압축 파일(ZIP)의 압축을 푸니까 파일 이름이 다 깨져 보여요.",
      answer: "구글 테이크아웃 백업 서버는 다국어 엔코딩 형식을 기본으로 파일을 구성하여 내려보냅니다. 윈도우 기본 탐색기 압축 해제 도구를 이용할 경우 한글 파일명이 글자 깨짐 현상으로 깨져 보일 수 있습니다. 이럴 때는 무료 압축 해제 소프트웨어인 '반디집(Bandizip)' 등을 사용해 해제해 주시면 한글 파일명이 온전하게 원상 복구됩니다."
    },
    {
      question: "다운로드받은 백업 문서를 새 교육청 구글 계정 드라이브에 다시 올리면 바로 편집할 수 있나요?",
      answer: "네, 가능합니다. 구글 문서가 로컬 PC용 확장자(.docx, .xlsx, .pptx 등)로 자동 변환되어 백업되므로, 새 @goedu.kr 드라이브에 업로드한 뒤 더블클릭하면 연동된 구글 온라인 편집기가 자동으로 연결되어 이전과 다름없이 문서를 이어 쓰고 수정할 수 있습니다."
    },
    {
      question: "과정 중 가입 비밀번호를 잊어버렸거나 알 수 없는 오류가 발생하면 어디로 가나요?",
      answer: "경기도교육청 클라우드 서비스 가입 비밀번호를 분실하신 경우 로그인 화면의 '비밀번호 재설정'을 활용해 해결하실 수 있습니다. 그럼에도 가입 진행 오류나 인증번호 미전송 등 막히는 사항이 계속 지속될 시에는 교무실의 '정보 담당 선생님' 혹은 각 학급 담임 선생님을 통해 편하게 도움을 요청해 주세요."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] selection:bg-amber-100 selection:text-amber-800 font-sans">
      {/* Upper Subtle Banner */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <School className="w-3.5 h-3.5 text-amber-400" />
        <span>김포 사우고등학교 학생 안전 가이드 &middot; 소중한 나의 과제물 안전하게 지키기</span>
      </div>

      {/* Hero Header Section */}
      <header className="max-w-4xl mx-auto pt-12 pb-6 px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200/60 mb-4"
        >
          <Sparkles className="w-3 h-3 animate-pulse text-amber-500" />
          <span>보안 사고 예방 및 비활성화 대비 안전 보호 안내</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl md:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight"
        >
          사우고등학교 학생 구글 데이터 백업 &<br />
          <span className="text-slate-800 underline decoration-amber-500 decoration-3 underline-offset-4">
            경기도교육청 계정(@goedu.kr) 이전 가이드
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          개인 계정 도용 및 외부 해킹 등 보안 취약점 사전 차단을 목적으로 기존 사우고 계정(@sawoo.hs.kr)이 전면 비활성화 조치됩니다. 
          소중한 수행평가 및 학습 데이터를 분실하지 않도록 새 교육청 계정으로 수동 이전하는 공식 백업 가이드입니다.
        </motion.p>
      </header>

      {/* Main Grid Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 pb-20 space-y-8">
        
        {/* Deadline & Warning Banner Card (Deadline Card) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`rounded-2xl p-6 md:p-8 border-2 shadow-sm transition-colors duration-500 ${
            timeLeft.days === 0 && !timeLeft.isOver
              ? "bg-amber-50/70 border-amber-300"
              : "bg-white border-slate-100"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
                <Clock className="w-4 h-4 text-amber-600 animate-spin-slow" />
                <span>데이터 백업 및 이전 마감 기한</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                2026년 8월 25일 (화) 17:00 완료 필요
              </h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-lg">
                해당 시각 정각에 기존 학교 구글 계정이 정지되어 모든 데이터가 사라집니다. 
                그 이전에 개인 컴퓨터로 필수 파일을 꼭 다운로드해 주세요!
              </p>
            </div>

            {/* Interactive Timer Block */}
            <div className="flex items-center gap-1.5 justify-center bg-slate-900 text-white p-4 rounded-xl min-w-[240px] md:min-w-[280px]">
              {timeLeft.isOver ? (
                <div className="text-center py-1">
                  <div className="text-red-400 font-bold text-sm flex items-center justify-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>백업 기간 만료됨</span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1">계정이 비활성화되었습니다.</p>
                </div>
              ) : (
                <>
                  <div className="text-center px-1">
                    <span className="block text-2xl font-black font-mono leading-none tracking-tight">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">DAYS</span>
                  </div>
                  <span className="text-lg font-bold text-amber-400 animate-pulse">:</span>
                  <div className="text-center px-1">
                    <span className="block text-2xl font-black font-mono leading-none tracking-tight">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">HRS</span>
                  </div>
                  <span className="text-lg font-bold text-amber-400 animate-pulse">:</span>
                  <div className="text-center px-1">
                    <span className="block text-2xl font-black font-mono leading-none tracking-tight">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">MINS</span>
                  </div>
                  <span className="text-lg font-bold text-amber-400 animate-pulse">:</span>
                  <div className="text-center px-1">
                    <span className="block text-2xl font-black font-mono leading-none tracking-tight">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">SECS</span>
                  </div>
                  <div className="ml-2 pl-2 border-l border-slate-700 text-left">
                    <span className="text-[10px] text-amber-400 block font-bold tracking-tight">D-DAY 남음</span>
                    <span className="text-[9px] text-slate-300 block leading-tight">시간 내 완료 권장</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Core Tip Box with Warm Amber Highlight */}
          <div className="mt-5 p-4 bg-amber-50/50 border border-amber-200/70 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm text-slate-700 leading-relaxed">
              <strong className="text-amber-800 font-semibold block mb-0.5">💡 전체 백업보다는 중요 파일 위주 선택 백업이 현명합니다!</strong>
              백업받은 데이터는 새 계정(@goedu.kr)에 자기가 직접 수동으로 업로드해야 합니다. 
              따라서 용량이 매우 큰 전체 데이터 백업보다는, 수업 시간에 만들었던 중요한 문서나 프레젠테이션(구글 Docs, Sheets, Slides) 위주로 선택하여 가볍고 실속 있게 백업하는 것을 적극 추천합니다.
            </div>
          </div>
        </motion.div>

        {/* Self-Check Progress Tracker Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm"
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-slate-800" />
                <span>나의 이전 단계별 진행도</span>
              </h3>
              <p className="text-xs text-slate-500">각 단계를 마칠 때마다 클릭해서 직접 나의 안전도를 체크해 보세요!</p>
            </div>
            
            {/* Reset Progress Button */}
            {completedSteps > 0 && (
              <button 
                onClick={handleResetChecklist}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 py-1 px-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                title="체크박스 초기화"
              >
                <RotateCw className="w-3 h-3" />
                <span>초기화</span>
              </button>
            )}
          </div>

          {/* Progress Bar Container */}
          <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-6">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-slate-800 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: "spring", stiffness: 80 }}
            />
          </div>

          {/* Checklist Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {[
              { key: "step1", text: "Step 1. 경기도교육청 새 구글 계정 생성 & 로그인 확인" },
              { key: "step2", text: "Step 2. Google Takeout 드라이브 자료 백업 신청 & ZIP 다운로드" },
              { key: "step3", text: "Step 3. 다운로드받은 ZIP 파일 압축 해제 및 핵심문서 확인" },
              { key: "step4", text: "Step 4. 새 교육청 드라이브 로그인 및 [사우고 백업] 폴더로 업로드" }
            ].map((item, idx) => {
              const stepKey = item.key as keyof typeof checklist;
              const isChecked = checklist[stepKey];
              return (
                <button
                  key={item.key}
                  onClick={() => toggleCheck(stepKey)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm flex items-start gap-3 transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer ${
                    isChecked
                      ? "bg-slate-50 border-slate-200 text-slate-900 font-medium"
                      : "bg-white border-stone-100 text-slate-600"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked ? "bg-slate-800 border-slate-800 text-white" : "border-slate-300 bg-white"
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span>{item.text}</span>
                </button>
              );
            })}
          </div>

          {/* Celebration Display when Checklist is 100% Complete */}
          <AnimatePresence>
            {completedSteps === 4 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900">모든 이전을 안전하게 마쳤습니다!</h4>
                    <p className="text-xs text-emerald-700">소중한 나의 교육 자료가 이제 새 계정에 무사히 이동되었습니다 🎓</p>
                  </div>
                </div>
                <div className="text-emerald-500 font-bold text-xs bg-emerald-100/50 px-2.5 py-1 rounded-md shrink-0 hidden sm:block">
                  성공 완료!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Section Division Title */}
        <div className="pt-4 border-t border-slate-200/60">
          <h3 className="text-slate-900 font-extrabold text-xl tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-slate-800 rounded-full block"></span>
            <span>데이터 이전을 위한 3단계 정밀 프로세스</span>
          </h3>
        </div>

        {/* STEP 1: Goedu Account Creation Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden"
        >
          {/* Header Line */}
          <div className="bg-slate-50 border-b border-stone-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 bg-slate-800 text-white text-xs font-bold rounded-full flex items-center justify-center font-mono">
                01
              </span>
              <h4 className="font-bold text-slate-900 tracking-tight">
                경기도교육청 신규 계정(@goedu.kr) 생성 및 확인
              </h4>
            </div>
            <span className="text-[10px] md:text-xs text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded-full font-medium">
              신규 플랫폼 가입
            </span>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              경기도 내 모든 재학생은 무료로 클라우드 연동 수업 계정(@goedu.kr)을 제공받습니다. 
              에듀패스(EduPass) 포털 또는 경기도교육청 클라우드 서비스 공식 웹사이트에서 학생인증과 본인인증을 진행한 뒤, 
              새롭게 발급된 본인의 Google 계정 정보를 확인하고 임시 로그인 테스트를 꼭 마쳐 주시기 바랍니다.
            </p>

            <div className="bg-stone-50/50 rounded-xl p-4 border border-stone-100 space-y-2">
              <h5 className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>계정 확인 및 이용 안내:</span>
              </h5>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4 leading-relaxed">
                <li>새로 발급받는 경기도교육청 구글 계정(@goedu.kr)의 앞부분 아이디(ID)는 학생 본인이 원하는 영문이나 숫자 조합을 활용하여 완전히 자유롭게 설정하실 수 있습니다.</li>
                <li>최초 로그인한 이후에는 본인의 안전한 자료 관리를 위해 비밀번호를 재설정해 주세요. 해킹 방지를 위한 2단계 인증(다중 인증, MFA) 기능은 필수가 아닌 권장사항이므로 필요 시에만 선택하여 간편하게 연결해 두면 안전합니다.</li>
              </ul>
            </div>

            {/* Link Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href="https://www.goedu.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl text-xs md:text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span>경기도교육청 클라우드 서비스</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-800 transition-colors">
                  <span className="text-[10px] font-normal font-mono">goedu.kr</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              <a
                href="https://edupass.neisplus.kr/nxuiPtl/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl text-xs md:text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span>교육부 에듀패스(EduPass)</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-800 transition-colors">
                  <span className="text-[10px] font-normal font-mono">edupass.kr</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* STEP 2: Google Takeout Backup Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden"
        >
          {/* Header Line */}
          <div className="bg-slate-50 border-b border-stone-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 bg-slate-800 text-white text-xs font-bold rounded-full flex items-center justify-center font-mono">
                02
              </span>
              <h4 className="font-bold text-slate-900 tracking-tight">
                Google Takeout 서비스 활용 데이터 일괄 백업
              </h4>
            </div>
            <span className="text-[10px] md:text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
              가장 중요한 단계!
            </span>
          </div>

          <div className="p-6 space-y-5">
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              기존 학교 계정(@sawoo.hs.kr)에 축적된 방대한 구글 드라이브 내용 중, 오직 필요한 수업 문서 및 자료만 다운로드하는 구글 공식 테이크아웃(백업) 서비스 사용법입니다. 아래 3단계를 그대로 따라 하세요!
            </p>

            {/* 3 Step Flow inside Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#FDFBF7] rounded-xl border border-amber-100/40 relative">
                <div className="text-[10px] text-amber-600 font-black font-mono mb-1">STAGE 01</div>
                <h5 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full inline-block"></span>
                  <span>접속 및 로그인</span>
                </h5>
                <p className="text-[11px] md:text-xs text-slate-500 leading-normal">
                  PC 크롬 브라우저에서 기존 사우고 학교 계정(@sawoo.hs.kr)으로 접속 상태를 확인한 후 테이크아웃 링크로 이동합니다.
                </p>
              </div>

              <div className="p-4 bg-[#FDFBF7] rounded-xl border border-amber-100/40 relative">
                <div className="text-[10px] text-amber-600 font-black font-mono mb-1">STAGE 02</div>
                <h5 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full inline-block"></span>
                  <span>문서/드라이브 선택</span>
                </h5>
                <p className="text-[11px] md:text-xs text-slate-500 leading-normal">
                  상단 <strong>'모두 선택 해제'</strong> 버튼을 누른 다음, 아래로 내려 <strong>'드라이브(Drive)'</strong> 항목만 골라 선택합니다.
                </p>
              </div>

              <div className="p-4 bg-[#FDFBF7] rounded-xl border border-amber-100/40 relative">
                <div className="text-[10px] text-amber-600 font-black font-mono mb-1">STAGE 03</div>
                <h5 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full inline-block"></span>
                  <span>백업 파일 저장</span>
                </h5>
                <p className="text-[11px] md:text-xs text-slate-500 leading-normal">
                  전송 방법에서 '이메일로 다운로드 링크 전송' 설정 후 생성 버튼을 누르면 다운로드 링크가 옵니다. ZIP 압축 파일로 PC에 저장하세요!
                </p>
              </div>
            </div>

            {/* Direct Link to Google Takeout */}
            <div className="pt-2">
              <a
                href="https://support.google.com/accounts/answer/3024190?hl=ko"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full flex items-center justify-between p-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs md:text-sm font-semibold transition-all active:scale-[0.99] shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                  <span>Google 테이크아웃 안내 및 접속 (구글 공식 페이지)</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 group-hover:text-white transition-colors">
                  <span className="text-[10px] font-normal font-mono">Google Takeout</span>
                  <ExternalLink className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* STEP 3: Manual Upload Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden"
        >
          {/* Header Line */}
          <div className="bg-slate-50 border-b border-stone-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 bg-slate-800 text-white text-xs font-bold rounded-full flex items-center justify-center font-mono">
                03
              </span>
              <h4 className="font-bold text-slate-900 tracking-tight">
                새 구글 드라이브(@goedu.kr)에 백업자료 수동 업로드
              </h4>
            </div>
            <span className="text-[10px] md:text-xs text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded-full font-medium">
              마무리 절차
            </span>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Google 테이크아웃에서 다운로드받은 소중한 수업용 ZIP 파일(압축 파일)을 개인 PC에서 해제한 다음, 새로 로그인한 경기도교육청 계정 드라이브에 안전하게 올리는 마지막 단계입니다.
            </p>

            {/* Checklist-like flow instructions */}
            <div className="space-y-3.5 bg-stone-50/50 p-5 rounded-xl border border-stone-100">
              <div className="flex gap-3">
                <span className="w-5 h-5 bg-slate-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  <strong>ZIP 압축 파일 우클릭 및 압축 해제하기</strong>: PC 탐색기 다운로드 폴더에서 다운받은 파일의 압축을 풉니다. 압축을 해제하면 교과 과제 파일들이 그대로 노출됩니다.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="w-5 h-5 bg-slate-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  <strong>새 교육청 드라이브 메인 화면에서 신규 폴더 생성</strong>: 
                  <code className="bg-stone-100 text-amber-700 font-mono px-1 py-0.5 rounded text-xs mx-1">우클릭 &gt; 새 폴더 생성</code> 한 뒤, 찾기 쉽도록 폴더명을 <code className="bg-slate-100 text-slate-800 font-semibold px-1 py-0.5 rounded text-xs">[사우고 백업 자료]</code> 로 지어줍니다.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="w-5 h-5 bg-slate-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  <strong>드래그 앤 드롭으로 파일 이동하기</strong>: 압축 해제한 과제 폴더/파일을 새로 만든 폴더 속으로 스윽 드래그하여 끌어다 올리세요. 업로드 표시가 완료(초록색 체크)로 바뀔 때까지 브라우저 창을 닫지 말고 잠시 대기합니다.
                </p>
              </div>
            </div>

            {/* Friendly Warning Alert Box */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5">
              <UploadCloud className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>잠깐!</strong> 무선 인터넷(Wi-Fi) 감도가 불안정하거나 파일 양이 아주 많은 경우 업로드 시간이 길어질 수 있으니, 컴퓨터 전원 설정이 '자동 절전 모드'로 들어가 업로드가 멈추지 않도록 주의하세요.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Section Division FAQ Title */}
        <div className="pt-4 border-t border-slate-200/60">
          <h3 className="text-slate-900 font-extrabold text-xl tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-slate-800 rounded-full block"></span>
            <span>자주 묻는 질문 (FAQ)</span>
          </h3>
        </div>

        {/* FAQ Section (Accordion) */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-2.5"
        >
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-stone-100 rounded-xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FDFBF7]/40 transition-colors focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-slate-400 shrink-0" />
                    <span className="text-xs md:text-sm font-bold text-slate-800 leading-tight">
                      {faq.question}
                    </span>
                  </div>
                  <div className="shrink-0 text-slate-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-stone-50 bg-[#FDFBF7]/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.section>

        {/* Contact Info Card */}
        <div className="p-5 bg-slate-900 text-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">SUPPORT HELPDESK</span>
            <h4 className="text-sm md:text-base font-extrabold text-white">기술 지원 및 로그인 관련 문의처</h4>
            <p className="text-xs text-slate-300">비밀번호 찾기, 학생 번호 조회 등 기술적 도움이 필요할 때 찾아오세요.</p>
          </div>
          <div className="text-xs font-semibold bg-slate-800 text-slate-100 border border-slate-700 px-4 py-2.5 rounded-xl shrink-0">
            사우고등학교 본관 2층 교무실 &middot; 정보실
          </div>
        </div>

      </main>
    </div>
  );
}
