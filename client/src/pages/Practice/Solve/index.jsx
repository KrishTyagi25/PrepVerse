import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../../../components/layout/Navbar";
import { useCanvasBg } from "../../../hooks/useCanvasBg";
import { useCursor } from "../../../hooks/useCursor";
import { useToast } from "../../../components/ui/Toast";
import { ProblemStatement } from "./ProblemStatement";
import { CodeEditor } from "./CodeEditor";
import { TestCasePanel } from "./TestCasePanel";
import { DiffBadge } from "../../../components/ui/Atoms";
import { Button } from "../../../components/ui/Button";
import { Tabs } from "../../../components/ui/Tabs";
import { problemService } from "../../../api/services/problemService";
import { useToast } from "../../../components/ui/Toast";
import { SkeletonCard } from "../../../components/ui/Skeleton";

const PROBLEMS = {
  1: {
    id: 1,
    title: "Two Sum",
    diff: "Easy",
    tag: "Arrays",
    company: "Google",
    desc: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6",
      },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "Only one valid answer exists"],
    starter:
      "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  // your code here\n};\n",
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]" },
      { input: "[3,2,4], 6", expected: "[1,2]" },
      { input: "[3,3], 6", expected: "[0,1]" },
    ],
  },
  2: {
    id: 2,
    title: "Valid Parentheses",
    diff: "Easy",
    tag: "Stack",
    company: "Amazon",
    desc: "Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if: open brackets are closed by the same type of brackets, and open brackets are closed in the correct order.",
    examples: [
      { input: "s = '()'", output: "true" },
      { input: "s = '()[]{}'", output: "true" },
      { input: "s = '(]'", output: "false" },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only"],
    starter:
      "/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n  // your code here\n};\n",
    testCases: [
      { input: "'()'", expected: "true" },
      { input: "'()[]{}'", expected: "true" },
      { input: "'(]'", expected: "false" },
    ],
  },
  3: {
    id: 3,
    title: "Climbing Stairs",
    diff: "Easy",
    tag: "DP",
    company: "Amazon",
    desc: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "n = 2", output: "2", explanation: "1+1 or 2" },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, or 2+1" },
    ],
    constraints: ["1 ≤ n ≤ 45"],
    starter:
      "/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n  // your code here\n};\n",
    testCases: [
      { input: "2", expected: "2" },
      { input: "3", expected: "3" },
      { input: "5", expected: "8" },
    ],
  },
};

const EDITOR_TABS = [
  { id: "problem", label: "Problem", icon: "📋" },
  { id: "solution", label: "Solution", icon: "💡" },
  { id: "discuss", label: "Discussion", icon: "💬" },
];

export default function SolvePage() {
  useCanvasBg("solve-canvas");
  useCursor();
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [tab, setTab] = useState("problem");
  const [results, setResults] = useState(null);
  const [running, setRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lang, setLang] = useState("javascript");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await problemService.getProblemById(id);
        setProblem(data.data.problem);
        setCode(data.data.problem.starterCode?.javascript ?? "");
        if (data.data.userSubmission) setSubmitted(true);
      } catch {
        toast("Problem not found", "error");
        navigate("/practice");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleRun = async () => {
    setRunning(true);
    setResults(null);
    try {
      const { data } = await problemService.runCode(id, {
        code,
        language: lang,
      });
      setResults({
        type: "run",
        cases: data.data.results,
        allPassed: data.data.allPassed,
      });
      toast(
        data.data.allPassed ? "All test cases passed!" : "Some cases failed",
        data.data.allPassed ? "success" : "error",
      );
    } catch {
      toast("Run failed", "error");
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    setRunning(true);
    setResults(null);
    try {
      const { data } = await problemService.submitSolution(id, {
        code,
        language: lang,
      });
      const sub = data.data.submission;
      setResults({
        type: "submit",
        cases:
          problem.testCases?.map((tc) => ({
            ...tc,
            passed: sub.status === "accepted",
            output: tc.expected,
          })) ?? [],
        allPassed: sub.status === "accepted",
        runtime: sub.runtime,
        memory: sub.memory,
        beats: sub.status === "accepted" ? "87.4%" : "0%",
      });
      if (sub.status === "accepted") {
        setSubmitted(true);
        toast(`🎉 Accepted! +${sub.xpEarned} XP earned`, "success", 4000);
      } else {
        toast("Wrong answer — check your logic", "error");
      }
    } catch {
      toast("Submission failed", "error");
    } finally {
      setRunning(false);
    }
  };
  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#080909",
          padding: "120px 24px",
        }}
      >
        <SkeletonCard lines={5} />
      </div>
    );

  if (!problem) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        background: "#080909",
        color: "#f8fafc",
        fontFamily: "Geist,sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Geist:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        body{cursor:none;overflow:hidden}
        #cur-dot{width:5px;height:5px;border-radius:50%;background:#00d2ff;box-shadow:0 0 8px #00d2ff;position:fixed;top:0;left:0;pointer-events:none;z-index:9999}
        #cur-ring{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(0,210,255,.5);position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transition:width .2s,height .2s}
        body.hov #cur-ring{width:44px;height:44px;border-color:rgba(124,58,237,.7);margin:-8px}
        ::-webkit-scrollbar{width:4px;height:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:4px}
      `}</style>
      <canvas
        id="solve-canvas"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flexShrink: 0,
          height: 52,
          background: "rgba(8,9,9,.95)",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
        }}
      >
        <button
          onClick={() => navigate("/practice")}
          style={{
            background: "none",
            border: "none",
            color: "#475569",
            cursor: "pointer",
            fontSize: 18,
            padding: "0 4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          ←
        </button>
        <div
          style={{
            fontFamily: "Bricolage Grotesque,sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#f8fafc",
            flex: 1,
          }}
        >
          {problem.title}
        </div>
        <DiffBadge level={problem.diff} />
        <span
          style={{
            fontFamily: "JetBrains Mono,monospace",
            fontSize: 10,
            color: "#475569",
          }}
        >
          {problem.company}
        </span>

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{
            padding: "5px 10px",
            background: "#111214",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 8,
            outline: "none",
            fontFamily: "JetBrains Mono,monospace",
            fontSize: 11,
            color: "#f8fafc",
            cursor: "pointer",
          }}
        >
          {["javascript", "python", "java", "cpp"].map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRun}
          disabled={running}
        >
          ▶ Run
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSubmit}
          disabled={running}
        >
          {running ? "⏳ Running…" : submitted ? "✓ Submitted" : "Submit"}
        </Button>
      </div>

      {/* Main split */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left — problem + tabs */}
        <div
          style={{
            borderRight: "1px solid rgba(255,255,255,.07)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "0 16px",
              borderBottom: "1px solid rgba(255,255,255,.07)",
              flexShrink: 0,
            }}
          >
            <Tabs
              tabs={EDITOR_TABS}
              active={tab}
              onChange={setTab}
              variant="underline"
            />
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px" }}>
            {tab === "problem" && <ProblemStatement problem={problem} />}
            {tab === "solution" && <SolutionTab problem={problem} />}
            {tab === "discuss" && <DiscussTab />}
          </div>
        </div>

        {/* Right — editor + test cases */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div style={{ flex: 1, overflow: "hidden" }}>
            <CodeEditor value={code} onChange={setCode} language={lang} />
          </div>
          <div
            style={{
              flexShrink: 0,
              borderTop: "1px solid rgba(255,255,255,.07)",
              maxHeight: 260,
              overflowY: "auto",
            }}
          >
            <TestCasePanel
              testCases={problem.testCases}
              results={results}
              running={running}
            />
          </div>
        </div>
      </div>

      <div id="cur-dot" />
      <div id="cur-ring" />
    </div>
  );
}

function SolutionTab({ problem }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "Bricolage Grotesque,sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: "#f8fafc",
          marginBottom: 12,
        }}
      >
        Approach
      </div>
      <p
        style={{
          fontFamily: "Geist,sans-serif",
          fontSize: 13,
          color: "#475569",
          lineHeight: 1.7,
          marginBottom: 16,
        }}
      >
        Use a HashMap to store each number's index as you iterate. For each
        number, check if its complement (target - num) already exists in the
        map.
      </p>
      <div
        style={{
          fontFamily: "JetBrains Mono,monospace",
          fontSize: 12,
          color: "#00d2ff",
          background: "rgba(0,210,255,.05)",
          border: "1px solid rgba(0,210,255,.15)",
          borderRadius: 10,
          padding: "14px 16px",
          lineHeight: 1.8,
        }}
      >
        {`function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n}`}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
        {[
          ["Time", "O(n)", "#10b981"],
          ["Space", "O(n)", "#7c3aed"],
        ].map(([k, v, c]) => (
          <div
            key={k}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(255,255,255,.06)",
            }}
          >
            <div
              style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 10,
                color: "#475569",
              }}
            >
              {k} complexity
            </div>
            <div
              style={{
                fontFamily: "Bricolage Grotesque,sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: c,
              }}
            >
              {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscussTab() {
  const COMMENTS = [
    {
      author: "Priya S.",
      time: "2h ago",
      text: "The HashMap approach is the cleanest. O(n) time and space. Just watch out for duplicate keys.",
      likes: 12,
    },
    {
      author: "Rahul V.",
      time: "5h ago",
      text: "You can also do a two-pointer approach after sorting, but you lose the original indices unless you store them.",
      likes: 8,
    },
    {
      author: "Karan M.",
      time: "1d ago",
      text: "Great problem for beginners! Once you understand this, most HashMap problems follow the same pattern.",
      likes: 24,
    },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {COMMENTS.map((c, i) => (
        <div
          key={i}
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            background: "rgba(255,255,255,.03)",
            border: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontFamily: "Bricolage Grotesque,sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: "#f8fafc",
              }}
            >
              {c.author}
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 10,
                color: "#1e293b",
              }}
            >
              {c.time}
            </span>
          </div>
          <p
            style={{
              fontFamily: "Geist,sans-serif",
              fontSize: 13,
              color: "#475569",
              lineHeight: 1.6,
              marginBottom: 8,
            }}
          >
            {c.text}
          </p>
          <span
            style={{
              fontFamily: "JetBrains Mono,monospace",
              fontSize: 10,
              color: "#475569",
            }}
          >
            ♡ {c.likes}
          </span>
        </div>
      ))}
    </div>
  );
}
