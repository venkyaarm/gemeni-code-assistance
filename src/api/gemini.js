export const callGemini = async (prompt) => {
  const apiKey = "AIzaSyCGD2drpPxjmro9ZpOW8veYzcYPASHqXEo";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ],
            },
          ],
          // Optionally, configure thinking for Gemini 2.5 Flash
          thinkingConfig: {
            thinkingBudget: 0  // set to 0 to disable “thinking”, or a positive integer to allow reasoning
          }
        }),
      }
    );

    const data = await response.json();

    if (response.ok && data?.candidates?.length > 0) {
      return { text: data.candidates[0].content.parts[0].text };
    } else {
      console.error('Gemini API Error:', data);
      return {
        text: data?.error?.message || 'Gemini API returned no candidates.',
      };
    }
  } catch (error) {
    console.error('Gemini API Request Failed:', error);
    return {
      text: 'Failed to fetch from Gemini API. Check your internet connection or API key.',
    };
  }
};
