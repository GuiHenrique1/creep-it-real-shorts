
import { StoryStructure } from "@/types/video";

const horrorStories: StoryStructure[] = [
  {
    hook: "A recording was found in an abandoned house. What you're about to hear should never have been captured on tape.",
    buildUp: [
      "The recording starts with normal conversation between a family. Nothing seems wrong at first.",
      "But if you listen carefully, there's something else in the background. A voice that doesn't belong to anyone in the room.",
      "The family doesn't seem to notice it. They keep talking as this other voice gets clearer and clearer.",
      "The voice starts responding to their conversation. It knows things about them. Personal things."
    ],
    climax: "Suddenly, the family goes completely silent. The only sound left is that mysterious voice... and it's calling YOUR name.",
    ending: "The recording cuts off. But some say if you play it at exactly 3:33 AM, the voice will know you've been listening."
  },
  {
    hook: "Have you ever wondered what happens to your reflection when you're not looking in the mirror?",
    buildUp: [
      "A woman noticed something strange about her bathroom mirror. Her reflection seemed... delayed.",
      "At first, it was just a split second. She'd move her hand, and her reflection would follow just a moment later.",
      "The delay got longer. Sometimes her reflection would continue moving even after she'd stopped.",
      "One night, she stood perfectly still in front of the mirror. But her reflection kept moving."
    ],
    climax: "Her reflection turned to look directly at her, smiled, and whispered 'I'm ready to take over now.'",
    ending: "She never looked in a mirror again. But sometimes, people say they see her reflection in mirrors... even when she's not there."
  },
  {
    hook: "There's a playground that only appears at midnight. Children have been seen playing there... but they've been dead for decades.",
    buildUp: [
      "Local residents started reporting strange sounds from the old vacant lot. Laughter and screaming at midnight.",
      "When they looked outside, they saw playground equipment that wasn't there during the day.",
      "The children playing looked normal from a distance. But their clothes were from different decades.",
      "One brave soul recorded the playground on their phone. The children turned to wave at the camera."
    ],
    climax: "In the recording, you can see their faces clearly. They have no eyes, just dark empty sockets. But they're still smiling and playing.",
    ending: "The playground vanishes at dawn. But if you look carefully at the vacant lot during the day, you can still see the handprints in the dirt."
  }
];

const additionalHooks = [
  "They say if you count backwards from 100 to 1 in an empty room, you won't be alone by the time you reach zero.",
  "A deleted video keeps reappearing on people's phones. No one knows who originally recorded it.",
  "There's a phone number that only works at 3 AM. The person who answers claims to be you from the future.",
  "A music box was found that plays a melody no one recognizes. But people who hear it start humming it in their sleep.",
  "Security cameras in an empty building keep recording the same person walking the halls. The building has been abandoned for 20 years."
];

export const generateHorrorStory = async (): Promise<StoryStructure> => {
  // Simulate AI generation delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Randomly select from pre-written stories or generate variations
  const baseStory = horrorStories[Math.floor(Math.random() * horrorStories.length)];
  
  // Add some randomization to make it feel more generated
  const variations = {
    ...baseStory,
    hook: Math.random() > 0.7 ? additionalHooks[Math.floor(Math.random() * additionalHooks.length)] : baseStory.hook
  };
  
  return variations;
};

export const generateHashtags = (): string[] => {
  const baseHashtags = [
    "#Horror", "#Supernatural", "#Creepy", "#ScaryStories", "#DarkTok", 
    "#UrbanLegends", "#TikTokHorror", "#Mystery", "#Paranormal"
  ];
  
  const additionalHashtags = [
    "#HorrorStory", "#CreepyTok", "#SpookyVibes", "#Haunted", "#Nightmare",
    "#TrueHorror", "#GhostStory", "#DarkTales", "#HorrorFacts", "#Creepypasta",
    "#HorrorCommunity", "#Scary", "#Chilling", "#HorrorTok", "#DarkStories"
  ];
  
  // Combine base hashtags with random additional ones
  const randomAdditional = additionalHashtags
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);
    
  return [...baseHashtags, ...randomAdditional];
};
