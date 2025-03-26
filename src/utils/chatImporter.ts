
import { ChatMessage } from '../components/LiveChat';

/**
 * Parse CSV chat log into a structured array of chat messages
 * Expected format: "Hour,Minute,Second,Name,Role,Message,Mode"
 */
export const parseChatCsv = (csvText: string): ChatMessage[] => {
  try {
    const lines = csvText.trim().split('\n');
    
    // Skip header if present
    const startIndex = lines[0].includes('Hour,Minute,Second') ? 1 : 0;
    
    return lines.slice(startIndex).map((line, index) => {
      try {
        // Split by comma, but handle quoted fields properly
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
        
        // Get values, with fallbacks
        const hour = parseInt(parts[0], 10) || 0;
        const minute = parseInt(parts[1], 10) || 0;
        const second = parseInt(parts[2], 10) || 0;
        const name = parts[3] || 'Anonymous';
        const role = parts[4] || undefined;
        const message = parts[5] || '';
        const mode = parts[6] || undefined;
        
        return {
          id: index,
          name,
          role,
          message,
          hour,
          minute,
          second,
          mode,
          likes: Math.floor(Math.random() * 10)
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
  } catch (error) {
    console.error('Error parsing CSV text:', error);
    return [];
  }
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
