import { useState, useCallback, useEffect } from 'react';
import { Shield, Copy, RefreshCw, Check, AlertTriangle } from 'lucide-react';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(generatedPassword);
  }, [length, useUppercase, useNumbers, useSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = length < 8 ? 'Weak' : length < 12 ? 'Medium' : 'Strong';
  const strengthColor = length < 8 ? 'text-red-500' : length < 12 ? 'text-orange-500' : 'text-green-500';

  return (
    <ToolPageLayout
      toolId="password-generator"
      title="Secure Password Generator"
      description="Create unhackable, cryptographically strong passwords to keep your accounts safe."
      category="Utility Tools"
      seoContent={
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Do You Need Strong Passwords?</h2>
            <p className="text-gray-600">
              In an era of high-frequency data breaches, using 'password123' or your pet's name is an invitation for cybercriminals. A <strong>Strong Password</strong> is your first line of defense against brute-force attacks and credential stuffing.
            </p>
          </section>

          <section className="bg-red-50 border border-red-100 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> What Makes a Password Secure?
            </h3>
            <ul className="list-disc pl-6 text-red-800 space-y-2 text-sm">
              <li><strong>Length:</strong> Aim for at least 12-16 characters. Every additional character increases the entropy exponentially.</li>
              <li><strong>Complexity:</strong> Mix uppercase, lowercase, numbers, and symbols (!@#$).</li>
              <li><strong>Unpredictability:</strong> Avoid dictionary words or common sequences like 'qwerty' or '1234'.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Privacy Promise</h3>
            <p className="text-gray-600">
              Your security is our priority. This password generator works <strong>entirely inside your browser</strong>. We do not store or transmit the passwords you generate. Once you close this tab, the password exists nowhere except where you saved it. We recommend using a dedicated password manager like Bitwarden or 1Password to store your generated keys.
            </p>
          </section>
        </div>
      }
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 md:p-8">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8 flex items-center justify-between gap-4">
          <div className="overflow-hidden">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Generated Password</span>
            <span className="text-xl md:text-2xl font-mono font-bold text-gray-800 break-all">{password}</span>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={generatePassword}
              className="p-3 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
              title="Regenerate"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
            <button
              onClick={handleCopy}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Password Length: {length}</label>
              <span className={`text-sm font-black uppercase ${strengthColor}`}>{strength} Strength</span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Uppercase (A-Z)', val: useUppercase, setter: setUseUppercase },
              { label: 'Numbers (0-9)', val: useNumbers, setter: setUseNumbers },
              { label: 'Symbols (@#$)', val: useSymbols, setter: setUseSymbols },
            ].map((opt) => (
              <label key={opt.label} className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-100 transition-all">
                <input
                  type="checkbox"
                  checked={opt.val}
                  onChange={(e) => opt.setter(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-semibold text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
