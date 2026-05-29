import { useState } from 'react';
import { Database, Copy, Check, Scissors, RefreshCw, Layers } from 'lucide-react';
import { format } from 'sql-formatter';
import ToolPageLayout from '@/components/ToolPageLayout';

export default function SQLFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [dialect, setDialect] = useState('sql');

  const handleFormat = () => {
    try {
      const formatted = format(input, {
        language: dialect as any,
        tabWidth: 2,
        keywordCase: 'upper',
        linesBetweenQueries: 2,
      });
      setOutput(formatted);
    } catch (error) {
      setOutput('Error: Could not format SQL. Please check your syntax.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <ToolPageLayout
      toolId="sql-formatter"
      title="SQL Formatter"
      description="Prettify and format your SQL queries for better readability across different dialects."
      category="Developer Tools"
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Beautify Your SQL Queries</h2>
          <p className="text-gray-600 mb-4">
            SQL code can often become messy and hard to read, especially during development or debugging. Our SQL Formatter helps you turn tangled code into clean, structured, and readable SQL instantly.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Supported Dialects</h3>
          <p className="text-gray-600 mb-4">
            We support standard SQL, MySQL, PostgreSQL, MariaDB, and more. Proper indentation and keyword capitalization make it much easier to spot errors and understand complex joins or subqueries.
          </p>
        </>
      }
    >
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Database className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Format Settings</h3>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={dialect}
              onChange={(e) => setDialect(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="sql">Standard SQL</option>
              <option value="mysql">MySQL</option>
              <option value="postgresql">PostgreSQL</option>
              <option value="mariadb">MariaDB</option>
              <option value="tsql">T-SQL (SQL Server)</option>
              <option value="plsql">PL/SQL (Oracle)</option>
            </select>
            <button 
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-red-600 transition-colors font-medium text-sm"
            >
              <Scissors className="h-4 w-4" />
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Input SQL</label>
            <textarea
              className="w-full h-96 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm shadow-inner bg-gray-50 bg-[linear-gradient(#f1f5f9_1px,transparent_1px),linear-gradient(90deg,#f1f5f9_1px,transparent_1px)] bg-[size:20px_20px]"
              placeholder="SELECT * FROM users WHERE id = 1;"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button 
              onClick={handleFormat}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
            >
              <RefreshCw className="h-5 w-5" />
              Format SQL
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Formatted Output</label>
              <button 
                onClick={handleCopy}
                disabled={!output || output.startsWith('Error')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {copied ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Output</>}
              </button>
            </div>
            <div className="relative group">
              <pre className="w-full h-96 p-4 rounded-xl border border-gray-200 font-mono text-sm bg-gray-900 text-blue-400 overflow-auto shadow-xl">
                {output || '-- Your formatted SQL will appear here'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
