
import { ChatMessage } from '../components/LiveChat';

/**
 * Parse CSV chat log into a structured array of chat messages
 * Expected format: "Hour,Minute,Second,Name,Role,Message,Mode"
 */
export const parseChatCsv = (csvText: string): ChatMessage[] => {
  const lines = csvText.trim().split('\n');
  
  // Skip header if present
  const startIndex = lines[0].includes('Hour,Minute,Second') ? 1 : 0;
  
  return lines.slice(startIndex).map((line, index) => {
    try {
      // Handle CSV escaping for messages that might contain commas
      const parts: string[] = [];
      let currentPart = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          parts.push(currentPart);
          currentPart = '';
        } else {
          currentPart += char;
        }
      }
      
      // Add the last part
      parts.push(currentPart);
      
      // If we couldn't parse correctly, use a simpler approach
      const [hourStr, minuteStr, secondStr, name, role, message, mode] = 
        parts.length >= 7 
          ? parts 
          : line.split(',');
      
      // Parse numeric values, with fallbacks for invalid data
      const hour = parseInt(hourStr, 10) || 0;
      const minute = parseInt(minuteStr, 10) || 0;
      const second = parseInt(secondStr, 10) || 0;
      
      return {
        id: index,
        name: name || 'Anonymous',
        role: role || undefined,
        message: message || '',
        hour,
        minute,
        second,
        mode: mode || undefined,
        likes: 0
      };
    } catch (error) {
      console.error('Error parsing chat line:', line, error);
      return {
        id: index,
        name: 'Error',
        message: 'Failed to parse message',
        hour: 0,
        minute: 0,
        second: 0,
        likes: 0
      };
    }
  });
};

/**
 * Load chat messages from a CSV file
 */
export const loadChatFromCsv = async (csvFilePath: string): Promise<ChatMessage[]> => {
  try {
    console.log('Loading chat from CSV:', csvFilePath);
    const response = await fetch(csvFilePath);
    
    if (!response.ok) {
      throw new Error(`Failed to load chat CSV: ${response.status} ${response.statusText}`);
    }
    
    const csvText = await response.text();
    console.log(`Loaded CSV with ${csvText.length} characters`);
    
    return parseChatCsv(csvText);
  } catch (error) {
    console.error('Error loading chat CSV:', error);
    return [];
  }
};
