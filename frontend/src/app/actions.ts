"use server"

export async function runSEOAudit(url: string) {
  try {
    const res = await fetch("http://127.0.0.1:3001/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to fetch audit report");
    }
    
    return await res.json();
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function sendChatMessage(report: any, history: any[], message: string) {
  try {
    const res = await fetch("http://127.0.0.1:3001/api/audit/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ report, history, message })
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to fetch chat response");
    }
    
    return await res.json();
  } catch (error: any) {
    return { error: error.message };
  }
}
