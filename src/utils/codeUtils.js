// src/utils/codeUtils.js
export function extractCodeOnly(text) {
  // Remove markdown code fences like ```python ... ```
  const code = text.replace(/```[a-zA-Z]*\n([\s\S]*?)```/g, '$1');
  return code.trim();
}
