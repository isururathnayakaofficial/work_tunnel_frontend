export const generateAIResponse = (message) => {
  const lowerMsg = message.toLowerCase();
  
  // Task management responses
  if (lowerMsg.includes('task') || lowerMsg.includes('todo')) {
    if (lowerMsg.includes('prioritize') || lowerMsg.includes('priority')) {
      return 'To prioritize your tasks effectively, use the Eisenhower Matrix: \n\n1. **Urgent & Important** - Do these first\n2. **Important but Not Urgent** - Schedule these\n3. **Urgent but Not Important** - Delegate if possible\n4. **Neither** - Consider eliminating\n\nFocus on completing 3 high-impact tasks each day.';
    }
    if (lowerMsg.includes('complete') || lowerMsg.includes('finish')) {
      return 'Great job on working through your tasks! Remember:\n- Break large tasks into 15-30 minute chunks\n- Celebrate small wins to stay motivated\n- Review completed tasks at day\'s end to track progress\n- Move unfinished tasks to tomorrow with adjusted priorities';
    }
    return 'I can help you manage your tasks effectively! Here\'s what I recommend:\n\n✓ Start each day by listing your top 3-5 priorities\n✓ Break large tasks into smaller, actionable steps\n✓ Set realistic deadlines for each task\n✓ Use time-blocking to dedicate focused time\n✓ Review and adjust your task list daily\n\nWhat specific task would you like help with?';
  }
  
  // Scheduling responses
  if (lowerMsg.includes('schedule') || lowerMsg.includes('calendar') || lowerMsg.includes('meeting') || lowerMsg.includes('appointment')) {
    return 'Here\'s how to optimize your schedule:\n\n📅 **Morning Block** (8-11 AM) - Your most important deep work\n☕ **Midday** (11-2 PM) - Meetings and collaboration\n⚡ **Afternoon** (2-5 PM) - Administrative tasks and planning\n\n**Pro tips:**\n- Block 90-minute focus sessions with 15-min breaks\n- Schedule meetings back-to-back to preserve focus time\n- Leave 25% of your calendar flexible for urgent items\n- Review tomorrow\'s schedule each evening';
  }
  
  // Productivity responses
  if (lowerMsg.includes('productive') || lowerMsg.includes('focus') || lowerMsg.includes('concentrate')) {
    return 'Here are proven productivity strategies:\n\n🎯 **Deep Focus Techniques:**\n- Pomodoro: 25 min work + 5 min break\n- Disable all notifications during focus time\n- Use website blockers for social media\n- Work in 90-minute cycles with breaks\n\n🚀 **Peak Performance:**\n- Tackle hardest tasks during your peak energy hours\n- Single-task instead of multitasking\n- Keep your workspace clean and organized\n- Take regular movement breaks (every hour)';
  }
  
  if (lowerMsg.includes('distract') || lowerMsg.includes('interruption')) {
    return 'To minimize distractions:\n\n🔇 **Environment:**\n- Use noise-canceling headphones\n- Set "Do Not Disturb" on all devices\n- Close unnecessary browser tabs\n- Work in a dedicated space\n\n✋ **Boundaries:**\n- Communicate your focus hours to others\n- Batch-check emails (not constantly)\n- Keep your phone in another room\n- Use focus mode apps\n\nRemember: it takes 23 minutes to refocus after an interruption!';
  }
  
  // Time management
  if (lowerMsg.includes('time') && (lowerMsg.includes('manage') || lowerMsg.includes('plan'))) {
    return 'Master your time with these strategies:\n\n⏰ **Daily Planning:**\n- Plan tomorrow before ending today (5 mins)\n- Identify your "Big 3" must-dos\n- Schedule tasks based on energy levels\n- Build in buffer time (things take longer than expected)\n\n📊 **Weekly Review:**\n- Review what you accomplished\n- Adjust next week\'s priorities\n- Block time for important projects\n- Schedule self-care and breaks\n\nTime is your most valuable resource - invest it wisely!';
  }
  
  // Goal setting
  if (lowerMsg.includes('goal') || lowerMsg.includes('achieve') || lowerMsg.includes('success')) {
    return 'Let\'s set you up for success with SMART goals:\n\n✨ **SMART Framework:**\n- **S**pecific - Define exactly what you want\n- **M**easurable - Track your progress\n- **A**chievable - Set realistic targets\n- **R**elevant - Align with your bigger vision\n- **T**ime-bound - Set clear deadlines\n\n📈 **Action Steps:**\n1. Write down your goal clearly\n2. Break it into monthly milestones\n3. Create weekly action items\n4. Review progress every Sunday\n5. Adjust as needed\n\nWhat goal are you working towards?';
  }
  
  // Stress or overwhelm
  if (lowerMsg.includes('stress') || lowerMsg.includes('overwhelm') || lowerMsg.includes('anxious') || lowerMsg.includes('tired')) {
    return 'I hear you - feeling overwhelmed is tough. Here\'s how to regain control:\n\n🧘 **Immediate Relief:**\n- Take 5 deep breaths (in for 4, hold for 4, out for 4)\n- Write everything down to clear your mind\n- Take a 10-minute walk\n- Drink water and stretch\n\n📋 **Regain Control:**\n1. List everything stressing you out\n2. Identify what you CAN control\n3. Pick just ONE thing to tackle now\n4. Say no to non-essentials\n5. Ask for help when needed\n\nRemember: You don\'t have to do everything today. What\'s the ONE most important thing?';
  }
  
  if (lowerMsg.includes('busy') || lowerMsg.includes('no time')) {
    return 'When you feel like you have no time:\n\n⚡ **Quick Wins:**\n- Do a "time audit" - track what you do for 2 days\n- Eliminate time-wasting activities\n- Batch similar tasks together\n- Learn to say "no" more often\n- Delegate what others can do\n\n🎯 **Priority Reset:**\n- Ask: "Will this matter in 5 years?"\n- Focus on impact, not busyness\n- 80% of results come from 20% of actions\n- Schedule your priorities, don\'t prioritize your schedule\n\nBusy ≠ Productive. What can you eliminate or delegate?';
  }
  
  // Morning/evening routines
  if (lowerMsg.includes('morning') || lowerMsg.includes('start day') || lowerMsg.includes('wake up')) {
    return '🌅 **Winning Morning Routine:**\n\n6:00 - Wake up (no snooze!)\n6:10 - Hydrate + light movement\n6:30 - Review goals & top 3 priorities\n7:00 - Deep work on hardest task\n8:30 - Breakfast + planning\n\n**Why it works:**\n- Wins the day before distractions start\n- Builds momentum and confidence\n- Tackles important work with fresh energy\n- Sets positive tone for the day\n\nWhat time do you currently wake up?';
  }
  
  if (lowerMsg.includes('evening') || lowerMsg.includes('night') || lowerMsg.includes('end of day')) {
    return '🌙 **Evening Wind-Down Routine:**\n\n**1 Hour Before Bed:**\n- Review today\'s wins (celebrate!)\n- Plan tomorrow\'s top 3 priorities\n- Prep anything needed for morning\n- Digital sunset (no screens 30 min before bed)\n- Reflect in journal (5 mins)\n- Read or meditate\n\n**Benefits:**\n- Reduces morning decision fatigue\n- Improves sleep quality\n- Starts tomorrow with clarity\n- Tracks progress over time\n\nHow you end today sets up tomorrow!';
  }
  
  // Work-life balance
  if (lowerMsg.includes('balance') || lowerMsg.includes('work life') || lowerMsg.includes('burnout')) {
    return 'Work-life balance is essential for long-term success:\n\n⚖️ **Create Boundaries:**\n- Set clear work hours and stick to them\n- Create a shutdown ritual (close laptop, clean desk)\n- Don\'t check emails after hours\n- Protect weekends for rest and family\n\n💪 **Recharge Daily:**\n- Exercise 30+ minutes\n- Spend time with loved ones\n- Pursue hobbies unrelated to work\n- Get 7-8 hours of sleep\n\nRemember: You\'re a human being, not a human doing. Rest is productive!';
  }
  
  // Motivation
  if (lowerMsg.includes('motivat') || lowerMsg.includes('inspire') || lowerMsg.includes('lazy') || lowerMsg.includes('procrastinat')) {
    return 'Let\'s get you motivated! 🔥\n\n**Quick Motivation Boost:**\n1. Start with just 2 minutes (lower the barrier)\n2. Remember your "why" - what\'s your bigger goal?\n3. Visualize completing the task - how will it feel?\n4. Reward yourself after (specific treat)\n5. Get an accountability partner\n\n**Beat Procrastination:**\n- Break tasks into tiny steps\n- Use the "5-minute rule" - just start for 5 mins\n- Remove distractions completely\n- Work during your peak energy time\n\nAction creates motivation, not the other way around. Start now!';
  }
  
  // Habits
  if (lowerMsg.includes('habit') || lowerMsg.includes('routine') || lowerMsg.includes('consistent')) {
    return 'Building lasting habits:\n\n🔄 **Habit Loop:**\n1. **Cue** - What triggers the habit?\n2. **Routine** - The behavior itself\n3. **Reward** - What do you gain?\n\n📅 **Make It Stick:**\n- Start small (2 minutes max)\n- Stack with existing habits\n- Track daily (don\'t break the chain)\n- Be consistent for 66 days minimum\n- Forgive yourself for slip-ups\n\n**Example:** "After I pour my morning coffee (cue), I\'ll write my top 3 priorities (routine), then enjoy my coffee while reviewing them (reward)."\n\nWhat habit do you want to build?';
  }
  
  // Greetings
  if (lowerMsg.match(/^(hi|hello|hey|good morning|good afternoon|good evening|greetings)[\s!.]*$/)) {
    return 'Hello! 👋 I\'m your personal productivity assistant.\n\nI can help you with:\n📋 Task management & prioritization\n⏰ Time management & scheduling\n🎯 Goal setting & achievement\n💪 Productivity tips & focus strategies\n🧘 Stress management & work-life balance\n🔄 Building better habits & routines\n\nWhat would you like help with today?';
  }
  
  // Thanks
  if (lowerMsg.includes('thank') || lowerMsg.includes('thanks') || lowerMsg.includes('appreciate')) {
    return 'You\'re very welcome! 😊\n\nI\'m always here to help you stay organized and reach your goals. Remember: small consistent actions lead to big results!\n\nIs there anything else I can help you with today?';
  }
  
  // Help or confused
  if (lowerMsg.includes('help') && lowerMsg.length < 15) {
    return 'I\'m here to help! I can assist with:\n\n📌 **Popular Topics:**\n- "How do I prioritize my tasks?"\n- "Tips for staying focused"\n- "How to manage my time better"\n- "Help me set a goal"\n- "I\'m feeling overwhelmed"\n- "How to build better habits"\n- "Morning routine tips"\n\nWhat specific challenge are you facing?';
  }
  
  // Default helpful response with context
  return 'I understand you\'re looking for help with managing your day-to-day life. I\'m here to support you!\n\nCould you tell me more about what you\'re working on? For example:\n- Are you trying to organize specific tasks?\n- Do you need help with time management?\n- Are you looking for productivity tips?\n- Would you like help setting goals?\n- Are you feeling overwhelmed?\n\nThe more specific you are, the better I can help!';
};
