// Webinar attendee data with timestamps for when they join
export const NEW_ATTENDEES = [
  { name: "Sarah Johnson", time: 180 },
  { name: "Michael Chen", time: 240 },
  { name: "Jessica Rodriguez", time: 360 },
  { name: "David Kim", time: 480 },
  { name: "Emily Wilson", time: 720 },
  { name: "Robert Taylor", time: 840 },
  { name: "Amanda Brown", time: 1080 },
  { name: "Daniel Martinez", time: 1200 },
  { name: "Olivia Davis", time: 1440 },
  { name: "James Thomas", time: 1620 },
  { name: "Sophia Jackson", time: 1800 },
  { name: "Matthew White", time: 2040 },
  { name: "Emma Harris", time: 2280 },
  { name: "Christopher Lee", time: 2520 },
  { name: "Ava Clark", time: 2760 },
];

// Poll data for interactive webinar engagement
export const POLLS = [
  {
    id: 1,
    time: 600,
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
    time: 1200,
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
    time: 1800,
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
    time: 2400,
    question: "Are you ready to take action on what you've learned today?",
    options: [
      "Yes, starting today!",
      "Yes, but need to plan first",
      "Maybe, still considering",
      "Need more information"
    ]
  }
];

// Chat messages for simulated live interaction with the new format
// Hour,Minute,Second,Name,Role,Message,Mode
export const CHAT_MESSAGES = [
  { hour: 0, minute: 2, second: 0, name: "Sarah J.", role: "Attendee", message: "Hello everyone! Excited to be here.", mode: "public" },
  { hour: 0, minute: 3, second: 0, name: "Mike C.", role: "Attendee", message: "Greetings from California! 👋", mode: "public" },
  { hour: 0, minute: 4, second: 0, name: "Host", role: "Moderator", message: "Welcome everyone! We'll be starting in a few minutes.", mode: "public" },
  { hour: 0, minute: 5, second: 0, name: "Jessica R.", role: "Attendee", message: "Can't wait to learn these strategies!", mode: "public" },
  { hour: 0, minute: 6, second: 0, name: "David K.", role: "Attendee", message: "First time here, heard great things about these webinars.", mode: "public" },
  { hour: 0, minute: 8, second: 0, name: "Host", role: "Moderator", message: "Feel free to ask questions in the chat as we go along.", mode: "public" },
  { hour: 0, minute: 10, second: 0, name: "Emily W.", role: "Attendee", message: "Is this being recorded?", mode: "public" },
  { hour: 0, minute: 11, second: 0, name: "Host", role: "Moderator", message: "Yes Emily, all attendees will receive a replay link after the session.", mode: "public" },
  { hour: 0, minute: 15, second: 0, name: "Robert T.", role: "Attendee", message: "The last point about automation was mind-blowing 🤯", mode: "public" },
  { hour: 0, minute: 18, second: 0, name: "Amanda B.", role: "Attendee", message: "Exactly what I needed to hear today!", mode: "public" },
  { hour: 0, minute: 19, second: 0, name: "Host", role: "Moderator", message: "Glad to hear that, Amanda! Stay tuned for the next section.", mode: "public" },
  { hour: 0, minute: 22, second: 0, name: "Daniel M.", role: "Attendee", message: "Question: How long does it typically take to see results?", mode: "public" },
  { hour: 0, minute: 23, second: 0, name: "Host", role: "Moderator", message: "Great question Daniel - I'll address that in the next section.", mode: "public" },
  { hour: 0, minute: 25, second: 0, name: "Olivia D.", role: "Attendee", message: "This is exactly what I've been looking for!", mode: "public" },
  { hour: 0, minute: 28, second: 0, name: "James T.", role: "Attendee", message: "The case studies are really helpful, thanks for sharing these.", mode: "public" },
  { hour: 0, minute: 30, second: 0, name: "Host", role: "Moderator", message: "We're about to get to the most important part, everyone ready?", mode: "public" },
  { hour: 0, minute: 31, second: 0, name: "Sophia J.", role: "Attendee", message: "Ready! 👍", mode: "public" },
  { hour: 0, minute: 32, second: 0, name: "Matthew W.", role: "Attendee", message: "100% ready!", mode: "public" },
  { hour: 0, minute: 36, second: 0, name: "Emma H.", role: "Attendee", message: "This special offer looks amazing", mode: "public" },
  { hour: 0, minute: 40, second: 0, name: "Chris L.", role: "Attendee", message: "Just signed up! Can't wait to get started", mode: "public" },
  { hour: 0, minute: 41, second: 0, name: "Host", role: "Moderator", message: "Congrats Chris! You're going to love the results.", mode: "public" },
  { hour: 0, minute: 44, second: 0, name: "Ava C.", role: "Attendee", message: "How much personal support do we get?", mode: "public" },
  { hour: 0, minute: 45, second: 0, name: "Host", role: "Moderator", message: "Great question Ava - the premium package includes 1-on-1 coaching calls.", mode: "public" },
  { hour: 0, minute: 47, second: 0, name: "Tyler R.", role: "Attendee", message: "Does this work in any niche?", mode: "public" },
  { hour: 0, minute: 48, second: 0, name: "Host", role: "Moderator", message: "Yes Tyler, we've seen success across dozens of niches!", mode: "public" },
  { hour: 0, minute: 50, second: 0, name: "Mia L.", role: "Attendee", message: "Just joined the program - super excited!", mode: "public" },
  { hour: 0, minute: 51, second: 0, name: "Host", role: "Moderator", message: "Welcome aboard Mia! Excited to see your results.", mode: "public" },
  { hour: 0, minute: 53, second: 0, name: "Noah P.", role: "Attendee", message: "The AI tool demo was incredible", mode: "public" },
  { hour: 0, minute: 55, second: 0, name: "Zoe K.", role: "Attendee", message: "Do we get lifetime access to the software?", mode: "public" },
  { hour: 0, minute: 56, second: 0, name: "Host", role: "Moderator", message: "Yes Zoe, lifetime access is included with your purchase today.", mode: "public" },
  { hour: 0, minute: 58, second: 0, name: "Ethan J.", role: "Attendee", message: "The testimonials are really inspiring!", mode: "public" },
  { hour: 0, minute: 59, second: 0, name: "Host", role: "Moderator", message: "And those are just a small sample of our success stories!", mode: "public" },
  { hour: 1, minute: 1, second: 0, name: "Lily T.", role: "Attendee", message: "Do you have a refund policy?", mode: "public" },
  { hour: 1, minute: 2, second: 0, name: "Host", role: "Moderator", message: "Absolutely! We offer a 30-day money-back guarantee.", mode: "public" },
  { hour: 1, minute: 4, second: 0, name: "Alex M.", role: "Attendee", message: "Just purchased! Looking forward to the bonuses.", mode: "public" },
  { hour: 1, minute: 5, second: 0, name: "Host", role: "Moderator", message: "Congrats Alex! You'll get access to everything right away.", mode: "public" },
  { hour: 1, minute: 7, second: 0, name: "Ryan B.", role: "Attendee", message: "Will there be any more live training sessions?", mode: "public" },
  { hour: 1, minute: 8, second: 0, name: "Host", role: "Moderator", message: "Yes Ryan, we do weekly live Q&As for all members.", mode: "public" },
  { hour: 1, minute: 10, second: 0, name: "Grace H.", role: "Attendee", message: "This is so much better than other programs I've tried", mode: "public" },
  { hour: 1, minute: 11, second: 0, name: "Host", role: "Moderator", message: "Thanks Grace! We've worked hard to make this comprehensive.", mode: "public" },
  { hour: 1, minute: 13, second: 0, name: "Leo D.", role: "Attendee", message: "Just bought the program - when can I access it?", mode: "public" },
  { hour: 1, minute: 14, second: 0, name: "Host", role: "Moderator", message: "Right away Leo! You'll receive login details in your email.", mode: "public" },
  { hour: 1, minute: 16, second: 0, name: "Sophia J.", role: "Attendee", message: "Is the special price really ending today?", mode: "public" },
  { hour: 1, minute: 17, second: 0, name: "Host", role: "Moderator", message: "Yes, this is the lowest price we'll ever offer.", mode: "public" },
  { hour: 1, minute: 19, second: 0, name: "Nate K.", role: "Attendee", message: "Can't wait to apply these strategies this weekend!", mode: "public" },
  { hour: 1, minute: 20, second: 0, name: "Host", role: "Moderator", message: "Perfect timing Nate! You'll be able to get started right away.", mode: "public" },
  { hour: 1, minute: 22, second: 0, name: "Mila R.", role: "Attendee", message: "Thank you for this amazing webinar!", mode: "public" },
  { hour: 1, minute: 24, second: 0, name: "Host", role: "Moderator", message: "We're wrapping up soon, last chance to join at this special price!", mode: "public" },
  { hour: 1, minute: 26, second: 0, name: "Jordan T.", role: "Attendee", message: "Just signed up! See you in the program!", mode: "public" },
  { hour: 1, minute: 27, second: 0, name: "Host", role: "Moderator", message: "Welcome Jordan! And thank you everyone for joining us today!", mode: "public" },
];

// Milestone offers that appear at strategic points in the webinar
export const MILESTONES = [
  {
    id: 1,
    time: 2160, // 36 minutes
    title: "Early Bird Bonus",
    description: "First 50 to join get 3 exclusive masterclass sessions ($997 value)",
    highlight: "Limited availability!"
  },
  {
    id: 2,
    time: 4320, // 72 minutes
    title: "Last Chance",
    description: "Final opportunity to join at this special webinar-only rate",
    highlight: "Timer ending soon!"
  }
];
