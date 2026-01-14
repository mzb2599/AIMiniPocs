import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Mail, Lightbulb, MessageCircle, Send, Loader, ChevronDown, Sparkles } from 'lucide-react';

const NahjulBalaghaApp = () => {
  const [activeTab, setActiveTab] = useState('sermons');
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [expandedSaying, setExpandedSaying] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages, aiLoading]);

  const sermons = [
    {
      id: 1,
      title: "Sermon of Ash-Shiqshiqiyyah",
      preview: "The sermon of Ash-Shiqshiqiyyah is one of the longest and most eloquent sermons...",
      content: "Full content of sermon 1..."
    },
    {
      id: 2,
      title: "Sermon on Divine Attributes",
      preview: "In this sermon, Ali describes the magnificence of Allah's creation...",
      content: "Full content of sermon 2..."
    },
    {
      id: 3,
      title: "Sermon on Justice and Governance",
      preview: "Ali emphasizes the importance of justice in leadership...",
      content: "Full content of sermon 3..."
    }
  ];

  const letters = [
    {
      id: 1,
      title: "Letter to Malik al-Ashtar",
      recipient: "Malik al-Ashtar",
      preview: "This letter contains comprehensive guidance on governance and justice...",
      content: "Full content of letter 1..."
    },
    {
      id: 2,
      title: "Letter to His Son",
      recipient: "His Son",
      preview: "Fatherly advice and moral guidance for his son...",
      content: "Full content of letter 2..."
    },
    {
      id: 3,
      title: "Letter to Officers",
      recipient: "Government Officers",
      preview: "Instructions and principles for administrative conduct...",
      content: "Full content of letter 3..."
    }
  ];

  const sayings = [
    {
      id: 1,
      text: "The best wealth is the contentment of the soul.",
      category: "Wisdom"
    },
    {
      id: 2,
      text: "Do not delay today's work for tomorrow.",
      category: "Advice"
    },
    {
      id: 3,
      text: "Knowledge is a tree and actions are its fruits.",
      category: "Knowledge"
    },
    {
      id: 4,
      text: "A truthful word is like a strongly rooted tree.",
      category: "Truth"
    },
    {
      id: 5,
      text: "Patience is the raiment of the honorable.",
      category: "Character"
    }
  ];

  const handleAiQuery = async () => {
    if (!aiInput.trim()) return;

    const userMessage = { role: 'user', content: aiInput };
    setAiMessages(prev => [...prev, userMessage]);
    setAiInput('');
    setAiLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are an expert on Nahjul Balagha (The Peak of Eloquence), the collection of sermons, letters, and sayings of Ali ibn Abi Talib. 
          Provide thoughtful, scholarly responses about the contents, themes, teachings, and historical context of Nahjul Balagha.
          Be respectful and educational in your responses. Keep answers concise for mobile readability.`,
          messages: aiMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })).concat([userMessage])
        })
      });

      const data = await response.json();
      const aiResponse = data.content[0].text;
      setAiMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setAiMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      }]);
    } finally {
      setAiLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #020617, #1e1b4b, #0f172a)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    },
    header: {
      background: 'linear-gradient(to right, #1e293b, #312e81, #0f172a)',
      color: 'white',
      padding: '16px',
      boxShadow: '0 20px 25px rgba(0,0,0,0.5)',
      borderBottom: '1px solid rgba(16, 185, 129, 0.25)',
      backdropFilter: 'blur(4px)',
      position: 'relative',
      zIndex: 10
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '4px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #2dd4bf, #10b981, #7c3aed)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      textAlign: 'center',
      fontSize: '12px',
      background: 'linear-gradient(to right, #14b8a6, #10b981)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 'bold'
    },
    contentArea: {
      flex: 1,
      overflowY: 'auto',
      paddingBottom: '80px',
      position: 'relative',
      zIndex: 10
    },
    contentPadding: {
      width: '100%',
      padding: '16px'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #2dd4bf, #10b981)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '12px'
    },
    card: {
      background: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.25)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '12px',
      backdropFilter: 'blur(4px)',
      transition: 'all 0.3s ease'
    },
    cardTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#2dd4bf',
      marginBottom: '8px'
    },
    cardText: {
      fontSize: '14px',
      color: '#bfdbfe'
    },
    navBar: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(to right, #020617, #1e1b4b, #0f172a)',
      borderTop: '1px solid rgba(16, 185, 129, 0.25)',
      boxShadow: '0 -10px 25px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(8px)',
      zIndex: 50
    },
    navGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '4px',
      padding: '8px 4px'
    },
    navButton: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      padding: '8px 4px',
      borderRadius: '8px',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'rgba(139, 92, 246, 0.6)'
    },
    navButtonActive: {
      color: '#10b981',
      background: 'rgba(16, 185, 129, 0.2)',
      border: '1px solid rgba(16, 185, 129, 0.5)'
    },
    inputArea: {
      position: 'fixed',
      bottom: '80px',
      left: 0,
      right: 0,
      background: 'linear-gradient(to right, #020617, #1e1b4b, #0f172a)',
      borderTop: '1px solid rgba(16, 185, 129, 0.25)',
      padding: '12px 16px',
      boxShadow: '0 -10px 25px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(8px)',
      zIndex: 40,
      display: activeTab === 'ask-ai' ? 'block' : 'none'
    },
    inputContainer: {
      display: 'flex',
      gap: '8px'
    },
    input: {
      flex: 1,
      background: 'rgba(16, 185, 129, 0.1)',
      color: '#2dd4bf',
      fontSize: '14px',
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid rgba(16, 185, 129, 0.4)',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    sendButton: {
      background: 'linear-gradient(to right, #14b8a6, #10b981)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid rgba(16, 185, 129, 0.5)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)'
    },
    chatMessage: {
      display: 'flex',
      gap: '12px',
      marginBottom: '12px'
    },
    userMessage: {
      justifyContent: 'flex-end'
    },
    messageBubble: {
      maxWidth: '80%',
      padding: '12px',
      borderRadius: '12px',
      fontSize: '14px',
      backdropFilter: 'blur(4px)',
      boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)'
    },
    userBubble: {
      background: 'rgba(20, 184, 166, 0.6)',
      color: 'white',
      borderBottomRightRadius: '4px',
      boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)'
    },
    aiBubble: {
      background: 'rgba(16, 185, 129, 0.15)',
      color: '#2dd4bf',
      borderBottomLeftRadius: '4px',
      boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <Sparkles size={24} style={{ color: '#10b981', animation: 'spin 3s linear infinite' }} />
          <h1 style={styles.title}>Nahjul Balagha</h1>
          <Sparkles size={24} style={{ color: '#10b981', animation: 'spin 3s linear reverse infinite' }} />
        </div>
        <p style={styles.subtitle}>The Peak of Eloquence</p>
      </div>

      {/* Content Area */}
      <div style={styles.contentArea}>
        <div style={styles.contentPadding}>
          {/* Sermons Tab */}
          {activeTab === 'sermons' && (
            <div>
              <h2 style={styles.sectionTitle}>Sermons</h2>
              {sermons.map(sermon => (
                <div key={sermon.id} style={styles.card}>
                  <h3 style={styles.cardTitle}>{sermon.title}</h3>
                  <p style={styles.cardText}>{sermon.preview}</p>
                  <button style={{ marginTop: '8px', color: '#22d3ee', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    Read Full →
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Letters Tab */}
          {activeTab === 'letters' && (
            <div>
              <h2 style={styles.sectionTitle}>Letters</h2>
              {letters.map(letter => (
                <div key={letter.id} style={styles.card}>
                  <h3 style={styles.cardTitle}>{letter.title}</h3>
                  <p style={{ fontSize: '12px', color: '#d8b4fe', marginBottom: '8px' }}>To: {letter.recipient}</p>
                  <p style={styles.cardText}>{letter.preview}</p>
                  <button style={{ marginTop: '8px', color: '#c084fc', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    Read Full →
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Sayings Tab */}
          {activeTab === 'sayings' && (
            <div>
              <h2 style={styles.sectionTitle}>Sayings & Aphorisms</h2>
              {sayings.map(saying => (
                <div 
                  key={saying.id} 
                  onClick={() => setExpandedSaying(expandedSaying === saying.id ? null : saying.id)}
                  style={{
                    ...styles.card,
                    background: 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.2), rgba(30, 58, 138, 0.2))',
                    cursor: 'pointer',
                    border: '1px solid rgba(34, 211, 238, 0.4)',
                    marginBottom: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <p style={{ fontSize: '14px', color: '#cffafe', fontWeight: '500' }}>"{saying.text}"</p>
                    <ChevronDown size={16} style={{ color: '#22d3ee', flexShrink: 0, transform: expandedSaying === saying.id ? 'rotate(180deg)' : 'rotate(0)' }} />
                  </div>
                  {expandedSaying === saying.id && (
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(34, 211, 238, 0.3)' }}>
                      <span style={{ display: 'inline-block', background: 'rgba(34, 211, 238, 0.4)', color: '#06f6d6', fontSize: '12px', padding: '4px 8px', borderRadius: '12px', border: '1px solid rgba(34, 211, 238, 0.5)' }}>
                        {saying.category}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Ask AI Tab */}
          {activeTab === 'ask-ai' && (
            <div>
              <h2 style={styles.sectionTitle}>Ask the AI</h2>
              <div style={{ minHeight: '200px' }}>
                {aiMessages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'rgba(34, 211, 238, 0.6)', padding: '40px 16px' }}>
                    <p style={{ fontSize: '14px' }}>Ask a question about Nahjul Balagha to get started...</p>
                  </div>
                ) : (
                  <>
                    {aiMessages.map((msg, idx) => (
                      <div key={idx} style={{ ...styles.chatMessage, ...(msg.role === 'user' ? styles.userMessage : {}) }}>
                        <div style={{ ...styles.messageBubble, ...(msg.role === 'user' ? styles.userBubble : styles.aiBubble) }}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {aiLoading && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22d3ee' }}>
                        <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                        <span style={{ fontSize: '12px' }}>Thinking...</span>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div style={styles.inputArea}>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAiQuery()}
            placeholder="Ask something..."
            style={styles.input}
          />
          <button
            onClick={handleAiQuery}
            disabled={aiLoading || !aiInput.trim()}
            style={{ ...styles.sendButton, opacity: aiLoading || !aiInput.trim() ? 0.5 : 1 }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={styles.navBar}>
        <div style={styles.navGrid}>
          {[
            { id: 'sermons', icon: BookOpen, label: 'Sermons' },
            { id: 'letters', icon: Mail, label: 'Letters' },
            { id: 'sayings', icon: Lightbulb, label: 'Sayings' },
            { id: 'ask-ai', icon: MessageCircle, label: 'Ask AI' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.navButton,
                ...(activeTab === tab.id ? styles.navButtonActive : {})
              }}
            >
              <tab.icon size={20} />
              <span style={{ fontSize: '12px', fontWeight: '500' }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder {
          color: rgba(192, 132, 250, 0.5);
        }
      `}</style>
    </div>
  );
};

export default NahjulBalaghaApp;