import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { saveByokSettings, testByokConnection, type ByokSettings } from '../services/retrievalService';
import { X, Key, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const ByokSettingsModal: React.FC = () => {
  const { isByokOpen, closeByok, byokSettings, updateByokSettings } = useApp();

  const [provider, setProvider] = useState<'groq' | 'openrouter'>(byokSettings.provider);
  const [apiKey, setApiKey] = useState(byokSettings.apiKey);
  const [model, setModel] = useState(byokSettings.model);

  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isByokOpen) return null;

  const handleSave = () => {
    const updated: ByokSettings = {
      provider,
      apiKey: apiKey.trim(),
      model: model.trim(),
    };
    saveByokSettings(updated);
    updateByokSettings(updated);
    closeByok();
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    const result = await testByokConnection({
      provider,
      apiKey: apiKey.trim(),
      model: model.trim(),
    });
    setTesting(false);
    setTestResult(result);
  };

  return (
    <div
      onClick={closeByok}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-paper hairline-border shadow-2xl rounded-lg overflow-hidden text-ink flex flex-col"
      >
        <div className="flex items-center justify-between px-5 py-3.5 hairline-b bg-surface/60">
          <div className="flex items-center gap-2">
            <Key size={16} className="text-vermilion" />
            <h3 className="font-serif font-semibold text-base text-ink">
              BYOK Settings (Bring Your Own Key)
            </h3>
          </div>
          <button
            onClick={closeByok}
            className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5 text-xs">
          <p className="text-ink-muted leading-relaxed">
            Configure an inference endpoint to synthesize responses in the Grounded GraphRAG Q&A (/ask). Keys are stored locally in your browser's <span className="font-mono">localStorage</span> and never transmitted to our servers.
          </p>

          {/* Provider Selection */}
          <div className="space-y-1.5">
            <label className="font-mono uppercase text-[10px] tracking-wider text-ink-subtle font-semibold block">
              Inference Provider
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setProvider('groq');
                  setModel('llama-3.3-70b-versatile');
                }}
                className={`p-2.5 rounded hairline-border text-center font-mono cursor-pointer transition-colors ${
                  provider === 'groq'
                    ? 'bg-vermilion-subtle text-vermilion border-vermilion font-semibold'
                    : 'bg-surface text-ink-muted hover:bg-surface-hover'
                }`}
              >
                Groq (Ultra-fast)
              </button>
              <button
                type="button"
                onClick={() => {
                  setProvider('openrouter');
                  setModel('meta-llama/llama-3.3-70b-instruct');
                }}
                className={`p-2.5 rounded hairline-border text-center font-mono cursor-pointer transition-colors ${
                  provider === 'openrouter'
                    ? 'bg-vermilion-subtle text-vermilion border-vermilion font-semibold'
                    : 'bg-surface text-ink-muted hover:bg-surface-hover'
                }`}
              >
                OpenRouter
              </button>
            </div>
          </div>

          {/* API Key Input */}
          <div className="space-y-1.5">
            <label className="font-mono uppercase text-[10px] tracking-wider text-ink-subtle font-semibold block">
              {provider === 'groq' ? 'Groq API Key (gsk_...)' : 'OpenRouter API Key (sk-or-...)'}
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={provider === 'groq' ? 'gsk_...' : 'sk-or-v1-...'}
              className="w-full px-3 py-2 bg-surface hairline-border rounded font-mono text-xs text-ink focus:outline-none focus:border-vermilion"
            />
          </div>

          {/* Model Name */}
          <div className="space-y-1.5">
            <label className="font-mono uppercase text-[10px] tracking-wider text-ink-subtle font-semibold block">
              Model Identifier
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. llama-3.3-70b-versatile"
              className="w-full px-3 py-2 bg-surface hairline-border rounded font-mono text-xs text-ink focus:outline-none focus:border-vermilion"
            />
            <span className="text-[10px] font-mono text-ink-subtle block">
              {provider === 'groq'
                ? 'Recommended: llama-3.3-70b-versatile, qwen/qwen3-32b'
                : 'Recommended: meta-llama/llama-3.3-70b-instruct, anthropic/claude-3.5-sonnet'}
            </span>
          </div>

          {/* Test Feedback */}
          {testResult && (
            <div
              className={`p-2.5 rounded hairline-border flex items-center gap-2 ${
                testResult.success
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200'
              }`}
            >
              {testResult.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span className="font-mono text-[11px]">{testResult.message}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 hairline-t">
            <button
              type="button"
              disabled={testing || !apiKey}
              onClick={handleTest}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded hairline-border bg-surface hover:bg-surface-hover text-ink font-mono text-xs disabled:opacity-50 cursor-pointer"
            >
              {testing ? <RefreshCw size={12} className="animate-spin" /> : null}
              <span>Test Connection</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeByok}
                className="px-3 py-1.5 rounded hairline-border text-ink-muted hover:text-ink cursor-pointer text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-1.5 rounded bg-vermilion text-paper font-semibold hover:bg-vermilion/90 cursor-pointer text-xs shadow-xs"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
