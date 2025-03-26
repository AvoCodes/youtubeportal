
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

// Chat messages for simulated live interaction
export const CHAT_MESSAGES = [
  { user: "Sarah J.", message: "Hello everyone! Excited to be here.", time: 120 },
  { user: "Mike C.", message: "Greetings from California! 👋", time: 180 },
  { user: "Host", message: "Welcome everyone! We'll be starting in a few minutes.", time: 240 },
  { user: "Jessica R.", message: "Can't wait to learn these strategies!", time: 300 },
  { user: "David K.", message: "First time here, heard great things about these webinars.", time: 360 },
  { user: "Host", message: "Feel free to ask questions in the chat as we go along.", time: 480 },
  { user: "Emily W.", message: "Is this being recorded?", time: 600 },
  { user: "Host", message: "Yes Emily, all attendees will receive a replay link after the session.", time: 660 },
  { user: "Robert T.", message: "The last point about automation was mind-blowing 🤯", time: 900 },
  { user: "Amanda B.", message: "Exactly what I needed to hear today!", time: 1080 },
  { user: "Host", message: "Glad to hear that, Amanda! Stay tuned for the next section.", time: 1140 },
  { user: "Daniel M.", message: "Question: How long does it typically take to see results?", time: 1320 },
  { user: "Host", message: "Great question Daniel - I'll address that in the next section.", time: 1380 },
  { user: "Olivia D.", message: "This is exactly what I've been looking for!", time: 1500 },
  { user: "James T.", message: "The case studies are really helpful, thanks for sharing these.", time: 1680 },
  { user: "Host", message: "We're about to get to the most important part, everyone ready?", time: 1800 },
  { user: "Sophia J.", message: "Ready! 👍", time: 1860 },
  { user: "Matthew W.", message: "100% ready!", time: 1920 },
  { user: "Emma H.", message: "This special offer looks amazing", time: 2160 },
  { user: "Chris L.", message: "Just signed up! Can't wait to get started", time: 2400 },
  { user: "Host", message: "Congrats Chris! You're going to love the results.", time: 2460 },
  { user: "Ava C.", message: "How much personal support do we get?", time: 2640 },
  { user: "Host", message: "Great question Ava - the premium package includes 1-on-1 coaching calls.", time: 2700 },
  { user: "Tyler R.", message: "Does this work in any niche?", time: 2820 },
  { user: "Host", message: "Yes Tyler, we've seen success across dozens of niches!", time: 2880 },
  { user: "Mia L.", message: "Just joined the program - super excited!", time: 3000 },
  { user: "Host", message: "Welcome aboard Mia! Excited to see your results.", time: 3060 },
  { user: "Noah P.", message: "The AI tool demo was incredible", time: 3180 },
  { user: "Zoe K.", message: "Do we get lifetime access to the software?", time: 3300 },
  { user: "Host", message: "Yes Zoe, lifetime access is included with your purchase today.", time: 3360 },
  { user: "Ethan J.", message: "The testimonials are really inspiring!", time: 3480 },
  { user: "Host", message: "And those are just a small sample of our success stories!", time: 3540 },
  { user: "Lily T.", message: "Do you have a refund policy?", time: 3660 },
  { user: "Host", message: "Absolutely! We offer a 30-day money-back guarantee.", time: 3720 },
  { user: "Alex M.", message: "Just purchased! Looking forward to the bonuses.", time: 3840 },
  { user: "Host", message: "Congrats Alex! You'll get access to everything right away.", time: 3900 },
  { user: "Ryan B.", message: "Will there be any more live training sessions?", time: 4020 },
  { user: "Host", message: "Yes Ryan, we do weekly live Q&As for all members.", time: 4080 },
  { user: "Grace H.", message: "This is so much better than other programs I've tried", time: 4200 },
  { user: "Host", message: "Thanks Grace! We've worked hard to make this comprehensive.", time: 4260 },
  { user: "Leo D.", message: "Just bought the program - when can I access it?", time: 4380 },
  { user: "Host", message: "Right away Leo! You'll receive login details in your email.", time: 4440 },
  { user: "Sophia J.", message: "Is the special price really ending today?", time: 4560 },
  { user: "Host", message: "Yes, this is the lowest price we'll ever offer.", time: 4620 },
  { user: "Nate K.", message: "Can't wait to apply these strategies this weekend!", time: 4740 },
  { user: "Host", message: "Perfect timing Nate! You'll be able to get started right away.", time: 4800 },
  { user: "Mila R.", message: "Thank you for this amazing webinar!", time: 4920 },
  { user: "Host", message: "We're wrapping up soon, last chance to join at this special price!", time: 5040 },
  { user: "Jordan T.", message: "Just signed up! See you in the program!", time: 5160 },
  { user: "Host", message: "Welcome Jordan! And thank you everyone for joining us today!", time: 5220 },
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
