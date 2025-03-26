
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
    const [hourStr, minuteStr, secondStr, name, role, message, mode] = line.split(',');
    
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const second = parseInt(secondStr, 10);
    
    return {
      id: index,
      name,
      role,
      message,
      hour,
      minute,
      second,
      mode,
      likes: 0
    };
  });
};

/**
 * Load chat messages from a CSV file
 */
export const loadChatFromCsv = async (csvFilePath: string): Promise<ChatMessage[]> => {
  try {
    const response = await fetch(csvFilePath);
    const csvText = await response.text();
    return parseChatCsv(csvText);
  } catch (error) {
    console.error('Error loading chat CSV:', error);
    return [];
  }
};
