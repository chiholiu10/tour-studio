import { Brief, Draft, locations } from "./tour-model";

const passages = {
  canals: [
    "Pause beside the water. Notice how the canal gathers the city into a single reflection: narrow houses, a bridge, a bicycle passing overhead. Amsterdam feels different from this angle. There is no need to rush. Let the water set the pace.",
    "Look along the row of houses. Their different rooflines make a rhythm of their own. Now look down at their reflections. A passing boat turns straight lines into soft shapes. The city is still here, but for a moment it feels like a painting.",
    "As you continue, keep an eye on the next bridge. Stop somewhere safe, away from the cycle path, and take in the view from both sides. The smallest change in perspective can reveal a whole new scene. This is a walk for noticing, rather than collecting landmarks.",
  ],
  jordaan: [
    "Take a breath and look down this small street. The Jordaan invites you to pay attention to things you might otherwise pass: a plant beside a doorway, a window full of books, a quiet corner where two streets meet. Begin with the details.",
    "Listen to the neighbourhood around you. You might hear a bicycle bell or a conversation drifting from a café. This is a living place, so leave room for residents and keep your voice low. A good walk moves with the neighbourhood, rather than through it.",
    "At the next corner, choose a spot where you can pause safely. Look back at the street you have just walked. What caught your attention? Keep that small discovery with you as you continue. There is no perfect route for curiosity.",
  ],
  museum: [
    "Welcome to the Museum Quarter. Before you think about what to see inside, take a moment to look around outside. Notice the space between the buildings, the paths crossing the square, and the way people gather here. The setting is part of the experience.",
    "Find one architectural detail that draws your eye. It might be a doorway, a pattern in the brickwork, or the outline of a roof. You do not need to know its history to notice it. Let your first impression become a question you carry with you.",
    "When you are ready, continue at your own pace. Check current opening hours and ticket requirements with each museum before entering. For now, enjoy the public space and the chance to look slowly. Your visit begins with attention.",
  ],
};

export function createExample(brief: Brief): Draft {
  const introduction =
    brief.tone === "cinematic"
      ? "Let the city become your scene. "
      : brief.tone === "playful"
        ? "Ready for a little city curiosity? "
        : "";
  const count = brief.duration === "30" ? 1 : brief.duration === "60" ? 2 : 3;
  const ending =
    "Before moving on, take one more look around. Pick a detail you would like to remember. " +
    "Let that be your first souvenir from this part of the city.";
  const reflection =
    brief.duration !== "30"
      ? " Imagine describing this place to someone who has never been here. What would you mention first? " +
        "A colour, a sound, or the feeling of being here?"
      : "";
  const pause =
    brief.duration === "90"
      ? " Give yourself a moment without the narration. Listen to the space around you and notice what changes. " +
        "When you are ready, continue with that small discovery in mind."
      : "";
  return {
    title: `${locations[brief.location].label}: a moment to notice`,
    script: introduction + passages[brief.location].slice(0, count).join("\n\n") + "\n\n" + ending + reflection + pause,
    note: "Curated example, not an AI response. Custom directions are used only when live script generation is connected.",
    source: "example",
  };
}
