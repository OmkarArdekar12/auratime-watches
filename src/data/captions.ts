export type CaptionPosition = "left" | "center" | "right";

export type Caption = {
  text: string;
  start: number;
  end: number;
  position: CaptionPosition;
};

export const captions: Caption[] = [
  {
    text: `<span class="eyebrow">Aura Watches</span>
           <h1>Time,<br/><em>Perfected.</em></h1>
           <p>Where <strong>timeless craftsmanship</strong> meets modern precision. Every detail is designed to celebrate elegance, excellence, and every passing second.</p>`,
    start: 1,
    end: 60,
    position: "center",
  },

  {
    text: `<span class="eyebrow">Designed with Purpose</span>
           <h2>Every detail,<br/><em>intentionally refined.</em></h2>
           <p>From the polished case to the sculpted crown, every surface is crafted with <strong>precision</strong>, balance, and uncompromising attention to detail.</p>`,
    start: 61,
    end: 95,
    position: "left",
  },

  {
    text: `<span class="eyebrow">Craftsmanship</span>
           <h2>Built to endure.<br/><em>Made to inspire.</em></h2>
           <p>Premium materials, meticulous finishing, and exceptional engineering come together to create a watch worthy of <strong>generations.</strong></p>`,
    start: 96,
    end: 142,
    position: "right",
  },

  {
    text: `<span class="eyebrow">Precision</span>
           <h2>Every movement.<br/><em>Every second.</em></h2>
           <p>Engineered for unwavering reliability, Aura Watches delivers accuracy you can trust and craftsmanship you can feel with every glance.</p>`,
    start: 143,
    end: 190,
    position: "center",
  },

  {
    text: `<span class="eyebrow">Timeless Design</span>
           <h2>Luxury,<br/><em>without excess.</em></h2>
           <p>Minimal lines, refined proportions, and understated elegance create a design that remains <strong>timeless</strong> through every generation.</p>`,
    start: 191,
    end: 238,
    position: "left",
  },

  {
    text: `<span class="eyebrow">Made for Every Occasion</span>
           <h2>Crafted for life's<br/><em>finest moments.</em></h2>
           <p>Whether celebrating milestones or embracing everyday adventures, Aura Watches complements every journey with effortless sophistication.</p>`,
    start: 239,
    end: 280,
    position: "right",
  },

  {
    text: `<span class="eyebrow">Aura Watches</span>
           <h1>Every Moment,<br/><em>Beautifully Measured.</em></h1>
           <p>More than a watch. A symbol of <strong>precision</strong>, craftsmanship, and timeless elegance that stays with you for a lifetime.</p>`,
    start: 281,
    end: 314,
    position: "center",
  },
];

export default captions;
