import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Keyboard, RotateCcw, Timer, Zap, Target } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. A journey of a thousand miles begins with a single step. All that glitters is not gold.",
  "Web development is the work involved in developing a website for the Internet or an Intranet. Web development can range from developing a simple single static page.",
  "Computer programming is the process of design, writing, testing, debugging, and maintaining the source code of computer programs.",
  "Space is the boundless three-dimensional extent in which objects and events have relative position and direction."
];

export default function TypingSpeedTest() {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setText(SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]);
  }, []);

  useEffect(() => {
    if (startTime && !isFinished) {
      timerRef.current = setInterval(() => {
        setTimer((Date.now() - startTime) / 1000);
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, isFinished]);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());
    
    if (value === text) {
      setIsFinished(true);
    }
    
    setUserInput(value);
    
    // Calculate WPM: (characters / 5) / (seconds / 60)
    const wordsCount = value.length / 5;
    const minutes = (Date.now() - (startTime || Date.now())) / 60000;
    if (minutes > 0) {
      setWpm(Math.round(wordsCount / minutes));
    }
    
    // Calculate Accuracy
    let correctChars = 0;
    for (let i = 0; i < value.length; i++) {
        if (value[i] === text[i]) correctChars++;
    }
    setAccuracy(value.length > 0 ? Math.round((correctChars / value.length) * 100) : 100);
  };

  const resetTest = () => {
    setUserInput('');
    setStartTime(null);
    setTimer(0);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setText(SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]);
  };

  return (
    <ToolPageLayout
      toolId="typing-speed-test"
      title="Typing Speed Test"
      description="Test your typing speed and accuracy (Words Per Minute) with our interactive typing test."
      category="Utility Tools"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Improve Your Typing Efficiency</h2>
          <p className="text-gray-600 mb-4">
            In the digital age, typing speed is a critical productivity skill. Whether you're a developer, writer, or student, being able to type quickly and accurately saves hours of time over the long run.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">How is WPM calculated?</h3>
          <p className="text-gray-600 mb-4">
            Words Per Minute (WPM) is a measure of typing speed. Since words vary in length, it is standardized as 5 characters equaling one word. Our tool calculates your WPM by dividing the number of five-character blocks typed by the time taken in minutes.
          </p>
        </>
      }
    >
      <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="flex justify-center mb-2"><Timer className="h-5 w-5 text-gray-400" /></div>
            <div className="text-2xl font-bold text-gray-900">{timer.toFixed(1)}s</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Time Elapsed</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="flex justify-center mb-2"><Zap className="h-5 w-5 text-blue-600" /></div>
            <div className="text-2xl font-bold text-blue-600">{wpm}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">WPM (Net)</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="flex justify-center mb-2"><Target className="h-5 w-5 text-green-600" /></div>
            <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Accuracy</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="flex justify-center mb-2"><Keyboard className="h-5 w-5 text-purple-600" /></div>
            <div className="text-2xl font-bold text-purple-600">{userInput.length}/{text.length}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Characters</div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-8 relative overflow-hidden">
          <div className="text-xl leading-loose font-mono text-gray-400 p-8 rounded-2xl bg-gray-50 border border-gray-100 select-none">
            {text.split('').map((char, index) => {
              let color = 'inherit';
              if (index < userInput.length) {
                color = userInput[index] === char ? 'text-green-600' : 'text-red-600 bg-red-50';
              }
              return (
                <span key={index} className={`${color} ${index === userInput.length ? 'border-b-2 border-blue-500 animate-pulse' : ''}`}>
                  {char}
                </span>
              );
            })}
          </div>

          <textarea
            value={userInput}
            onChange={handleInput}
            disabled={isFinished}
            className="w-full h-40 p-8 rounded-2xl border-2 border-gray-100 focus:border-blue-500 outline-none resize-none text-xl font-mono transition-all bg-white shadow-inner leading-relaxed"
            placeholder="Start typing here..."
            autoFocus
          />

          <div className="flex justify-center">
            <button 
              onClick={resetTest}
              className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl"
            >
              <RotateCcw className="h-5 w-5" />
              Retake Test
            </button>
          </div>

          {isFinished && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex items-center justify-center p-8">
              <div className="text-center space-y-6 max-w-md">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900">Finish! 🏁</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">{wpm}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">WPM</div>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Accuracy</div>
                   </div>
                </div>
                <p className="text-gray-500">Impressive speed! Feel free to try again to set a new record.</p>
                <button 
                  onClick={resetTest}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Restart Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
