/**
 * Configuration for Nandini's Proposal Website
 * Easily customize the name, texts, and your WhatsApp phone number below.
 */
const CONFIG = {
  // Recipient Information
  recipientName: "Nandini",

  // WhatsApp Configuration
  // IMPORTANT: Enter your phone number in international format without '+' or spaces.
  // Example for India (+91): "919876543210"
  // Example for US (+1): "1234567890"
  whatsappNumber: "918108839330",

  // The pre-filled message that will be prepared for WhatsApp when she clicks the final button
  whatsappMessage: "Hey! I just went through your little surprise website… and yes, I said yes. ❤️",

  // Preloader Texts
  preloader: {
    introText: "Just something I made for you…",
    subtitle: "Nandini ♡"
  },

  // Hero Section
  hero: {
    greeting: "Hey Nandini…",
    title: "Muje Terko Kuch Bolna Tha.",
    subtitle: "Me terko direct bhi bol sakta tha \nbut Tu Bohot special hai mere liye so, something just for you would be a little more special.",
    buttonText: "ye hai jo me terko bolna chata hu→"
  },

  // Section 2: Personal Letter
  letter: {
    heading: "Tere liye , Nandini.",
    paragraphs: [
      "Muje pata nhi ki ye perfect way hai ki Nhi .\nSo I'll just say it honestly.",
      "Somewhere along the way, you became someone I look forward to talking to,\nsomeone who makes ordinary moments feel a little better.",
      "Aur me Bohot time se Tujhe Ye Bolna Chata Tha"
    ],
    signature: "— Someone who really likes you ♡",
    buttonText: "Continue reading →"
  },

  // Section 3: The Question
  question: {
    title: "Nandini,\n Me Terko Pasand Karta Hu ♡",
    subtitle: "I'd really like to make more memories with you.",
    yesButtonText: "Yes, I will ♡",
    celebrationText1: "Okay… you just made me really happy. ❤️",
    celebrationText2: "I'm glad I finally asked.",
    celebrationButtonText: "One last thing →"
  },

  // Section 4: Final Message
  final: {
    heading: "Thank you, Nandini. ♡",
    message: "No matter what happens next,\nI'm really glad I got to tell you how I feel.",
    note: "There's one message waiting for you… 💌",
    actionButtonText: "Send it to me ♡"
  },

  // Optional background music track (Gentle soft piano)
  music: {
    enabled: true,
    // Soft romantic acoustic/piano lofi ambient URL
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
    labelPlay: "Play music ♫",
    labelPause: "Pause music ⏸"
  }
};

// Export to window for browser script access
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
