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
  Info, 
  Sparkles, 
  Check, 
  RotateCw, 
  Lock 
} from "lucide-react";

// D-Day target date: August 25, 2026, 17:00 KST
const TARGET_DATE_KST = "2026-08-25T17:00:00+09:00";

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
          <span>기존 사우고 계정 정지 대비 안심 데이터 이전 안내</span>
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
          기존에 사용하던 학교 계정(@sawoo.hs.kr) 정지에 맞추어, 수업 시간과 과제 수행에 작성했던 
          소중한 구글 드라이브 문서들을 새 경기도교육청 구글 계정으로 안전하고 확실하게 옮기는 구체적인 이행 가이드입니다.
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
                [새 계정 준비] 경기도교육청 구글 계정(@goedu.kr) 생성 및 본인인증
              </h4>
            </div>
            <span className="text-[10px] md:text-xs text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded-full font-medium">
              1단계: 신규 계정 가입
            </span>
          </div>

          <div className="p-6 space-y-5">
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              자료를 옮겨 담을 새 경기도교육청 Google 워크스페이스 계정(@goedu.kr)을 만드는 절차입니다. 
              아래 세부 안내에 따라 웹사이트 접속 후 계정을 생성하고 임시 로그인까지 완료해 주세요.
            </p>

            {/* Structured Step-by-Step Details */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="w-5 h-5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">클라우드 서비스 가입 사이트 접속</span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    하단의 <strong>'경기도교육청 클라우드 서비스'</strong> 또는 <strong>'교육부 에듀패스'</strong> 버튼을 클릭하여 공식 연동 포털에 접속합니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-5 h-5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">학생 인증 및 약관 동의 진행</span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    회원가입 메뉴에서 <strong>'학생 가입'</strong> 단추를 선택하고, 안내 지침에 따라 학교 검색에서 '사우고등학교'를 찾아 등록합니다. 본인의 성명, 생년월일, 학생 식별번호(또는 나이스 학생인증번호)를 올바르게 기입한 뒤 본인 확인 절차를 진행합니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-5 h-5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">영문 아이디(ID) 자유 선택 및 비밀번호 지정</span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    사용할 이메일 앞자리 아이디(ID)는 <strong>중복되지 않는 한 원하는 영문자나 숫자를 사용해 자유롭게 설정</strong>할 수 있습니다. 가입 완료 후 발급되는 계정은 <code className="bg-stone-100 text-slate-800 font-mono px-1 rounded">본인설정ID@goedu.kr</code> 형태가 됩니다. 자신이 로그인할 때 사용할 새 패스워드도 함께 정확히 지정합니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-5 h-5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">로그인 정상 동작 여부 최종 확인</span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    계정 생성이 끝났다면 구글 메인화면(<a href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-slate-800 underline">google.com</a>)에 접속하여 우측 상단 프로필을 누르고, 새로 만든 <code className="bg-stone-100 text-slate-800 font-mono px-1 rounded">@goedu.kr</code> 계정으로 로그인이 완벽히 이루어지는지 실제로 테스트해 봅니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200/50 space-y-2">
              <h5 className="text-xs font-semibold text-amber-900 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                <span>중요 안전 유의사항:</span>
              </h5>
              <ul className="text-xs text-amber-800 space-y-1 list-disc pl-4 leading-relaxed">
                <li>비밀번호는 나중에 잊어버려 파일 업로드가 막히지 않도록, 가입 즉시 다이어리나 휴대폰 메모장 등에 꼭 따로 기재해 두세요.</li>
                <li>2단계 인증(MFA) 연동은 필수가 아니며 본인의 모바일 환경이나 개인 보안 강화를 희망할 때에만 필요 시 선택해서 등록하시면 충분합니다.</li>
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
                  <span>경기도교육청 클라우드 서비스 바로가기</span>
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
                  <span>교육부 에듀패스(EduPass) 포털 바로가기</span>
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
                [데이터 백업] Google Takeout 서비스 활용 드라이브 자료 일괄 다운로드
              </h4>
            </div>
            <span className="text-[10px] md:text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
              2단계: 기존 자료 내려받기
            </span>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              기존 학교 계정(@sawoo.hs.kr) 구글 드라이브에 저장되어 있는 소중한 포트폴리오와 수업 과제 파일을 컴퓨터에 일괄 저장하는 가장 중요한 단계입니다. 아래 가이드라인을 하나씩 따라 진행해 주세요.
            </p>

            {/* Detailed Click-by-Click Step-by-Step */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="w-5 h-5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">구글 테이크아웃 페이지 접속 후 로그인 확인</span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    크롬 브라우저에서 기존 사우고 학교 구글 계정(<code className="bg-stone-50 text-amber-800 font-mono text-[11px] px-1 rounded">@sawoo.hs.kr</code>)으로 정상 로그인된 상태를 먼저 확인합니다. 그 후 아래의 <strong>'Google 테이크아웃 사이트 바로가기'</strong> 단추를 클릭해 백업 페이지로 접속합니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-5 h-5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">데이터 선택 설정 (불필요 항목 필수 해제)</span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    페이지 상단의 <strong>'모두 선택 해제'</strong> 버튼을 클릭하여 모든 체크박스를 비웁니다. 그 후 아래로 스크롤하여 오직 <strong>'드라이브(Google Drive)'</strong> 항목만 찾아서 오른쪽 체크박스를 활성화합니다. (전체를 백업하면 압축 속도가 너무 느려집니다.)
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-5 h-5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">빈도 및 파일 형식 지정하기</span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    맨 아래로 내려가서 <strong>'다음 단계'</strong> 버튼을 누릅니다. 전송 방법은 <strong>'이메일로 다운로드 링크 전송'</strong>으로 그대로 두고, 파일 형식은 <strong>'ZIP'</strong>, 파일 크기는 <strong>'2GB'</strong> 혹은 <strong>'10GB'</strong> 중 컴퓨터 여유 상황에 맞춰 선택한 뒤 '내보내기 생성'을 클릭합니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="w-5 h-5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">이메일 링크 확인 및 PC 다운로드</span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    구글 서버가 백업 압축 작업을 완료하면(수 분 ~ 수 시간 소요), 기존 사우고 학교 지메일 계정으로 다운로드 준비 메일이 도착합니다. 메일 속 <strong>'파일 다운로드'</strong> 링크를 눌러 압축 파일(.zip)을 PC 하드디스크에 최종 다운로드합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/50 space-y-2">
              <h5 className="text-xs font-semibold text-amber-900 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-700" />
                <span>압축 해제 꿀팁 (한글 깨짐 현상 극복):</span>
              </h5>
              <p className="text-xs text-amber-800 leading-relaxed">
                구글 테이크아웃에서 내려받은 ZIP 파일은 다국어 인코딩을 기본으로 하고 있어서, 윈도우 기본 압축 풀기 기능 사용 시 간혹 <strong>한글 파일 이름이 깨지는 증상</strong>이 생길 수 있습니다. 이럴 때는 무료 압축 해제 유틸리티인 <strong>'반디집(Bandizip)'</strong> 등을 설치해 압축을 해제하면, 한글 파일명이 원상 복구되어 한눈에 식별할 수 있습니다.
              </p>
            </div>

            {/* Direct Link to Google Takeout */}
            <div className="pt-2">
              <a
                href="https://takeout.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full flex items-center justify-between p-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs md:text-sm font-semibold transition-all active:scale-[0.99] shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                  <span>Google 테이크아웃 서비스 바로 접속하기</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 group-hover:text-white transition-colors">
                  <span className="text-[10px] font-normal font-mono">takeout.google.com</span>
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


          </div>
        </motion.div>

        {/* Contact Info Card */}
        <div className="p-6 bg-slate-900 text-slate-100 rounded-2xl space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-6">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">OFFICIAL HELPDESK</span>
            <h4 className="text-sm md:text-base font-extrabold text-white">교육용 클라우드 지원시스템 문의처</h4>
            <div className="text-xs text-slate-300 space-y-1">
              <p>• ☎ 전화 상담: <strong>070-4916-0739</strong> (평일 09:00 ~ 18:00, 주말 및 공휴일 제외)</p>
              <p>• ✉ 이메일 접수: <strong className="text-amber-200">goedu@foxsoft.kr</strong></p>
            </div>
          </div>
          <div className="text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700/80 p-3.5 rounded-xl shrink-0 space-y-1 text-center sm:text-left">
            <div className="text-white font-bold mb-1">경기도교육청 클라우드 서비스</div>
            <div>• 가입 연동 신청 및 다중 인증 문의</div>
            <div>• 공식 전문 기술 지원센터 연계 운영</div>
          </div>
        </div>

      </main>
    </div>
  );
}
