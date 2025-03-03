
// Webinar attendee data with timestamps for when they join
export const NEW_ATTENDEES = [
  { name: "Sarah Johnson", time: 90 },
  { name: "Michael Chen", time: 120 },
  { name: "Jessica Rodriguez", time: 180 },
  { name: "David Kim", time: 240 },
  { name: "Emily Wilson", time: 360 },
  { name: "Robert Taylor", time: 420 },
  { name: "Amanda Brown", time: 540 },
  { name: "Daniel Martinez", time: 600 },
  { name: "Olivia Davis", time: 720 },
  { name: "James Thomas", time: 810 },
  { name: "Sophia Jackson", time: 900 },
  { name: "Matthew White", time: 1020 },
  { name: "Emma Harris", time: 1140 },
  { name: "Christopher Lee", time: 1260 },
  { name: "Ava Clark", time: 1380 },
];

// Poll data for interactive webinar engagement
export const POLLS = [
  {
    id: 1,
    time: 300,
    question: "What's your main goal for attending this webinar?",
    options: [
      "Learn new strategies",
      "Find new income sources",
      "See real examples of success",
      "Connect with like-minded people"
    ]
  },
  {
    id: 2,
    time: 600,
    question: "What's been your biggest obstacle so far?",
    options: [
      "Lack of knowledge",
      "Limited time",
      "Financial constraints",
      "Fear of failure"
    ]
  },
  {
    id: 3,
    time: 900,
    question: "Which strategy sounds most appealing to you?",
    options: [
      "Automation tools",
      "Content creation",
      "Targeted advertising",
      "Community building"
    ]
  },
  {
    id: 4,
    time: 1200,
    question: "Are you ready to take action on what you've learned today?",
    options: [
      "Yes, starting today!",
      "Yes, but need to plan first",
      "Maybe, still considering",
      "Need more information"
    ]
  }
];

// Chat messages for simulated live interaction
export const CHAT_MESSAGES = [
  { user: "Sarah J.", message: "Hello everyone! Excited to be here.", time: 60 },
  { user: "Mike C.", message: "Greetings from California! 👋", time: 90 },
  { user: "Host", message: "Welcome everyone! We'll be starting in a few minutes.", time: 120 },
  { user: "Jessica R.", message: "Can't wait to learn these strategies!", time: 150 },
  { user: "David K.", message: "First time here, heard great things about these webinars.", time: 180 },
  { user: "Host", message: "Feel free to ask questions in the chat as we go along.", time: 240 },
  { user: "Emily W.", message: "Is this being recorded?", time: 300 },
  { user: "Host", message: "Yes Emily, all attendees will receive a replay link after the session.", time: 330 },
  { user: "Robert T.", message: "The last point about automation was mind-blowing 🤯", time: 450 },
  { user: "Amanda B.", message: "Exactly what I needed to hear today!", time: 540 },
  { user: "Host", message: "Glad to hear that, Amanda! Stay tuned for the next section.", time: 570 },
  { user: "Daniel M.", message: "Question: How long does it typically take to see results?", time: 660 },
  { user: "Host", message: "Great question Daniel - I'll address that in the next section.", time: 690 },
  { user: "Olivia D.", message: "This is exactly what I've been looking for!", time: 750 },
  { user: "James T.", message: "The case studies are really helpful, thanks for sharing these.", time: 840 },
  { user: "Host", message: "We're about to get to the most important part, everyone ready?", time: 900 },
  { user: "Sophia J.", message: "Ready! 👍", time: 930 },
  { user: "Matthew W.", message: "100% ready!", time: 960 },
  { user: "Emma H.", message: "This special offer looks amazing", time: 1080 },
  { user: "Chris L.", message: "Just signed up! Can't wait to get started", time: 1200 },
  { user: "Host", message: "Congrats Chris! You're going to love the results.", time: 1230 },
  { user: "Ava C.", message: "How much personal support do we get?", time: 1320 },
  { user: "Host", message: "Great question Ava - the premium package includes 1-on-1 coaching calls.", time: 1350 },
];

// Milestone offers that appear at strategic points in the webinar
export const MILESTONES = [
  {
    id: 1,
    time: 1080, // 18 minutes
    title: "Early Bird Bonus",
    description: "First 50 to join get 3 exclusive masterclass sessions ($997 value)",
    highlight: "Limited availability!"
  },
  {
    id: 2,
    time: 1260, // 21 minutes
    title: "Last Chance",
    description: "Final opportunity to join at this special webinar-only rate",
    highlight: "Timer ending soon!"
  }
];
