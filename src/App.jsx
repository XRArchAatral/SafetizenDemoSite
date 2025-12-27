import React, { useState, useMemo } from "react";

// Safetizen Landing — Single-file React component
// TailwindCSS-first. Drop this into a React app (Vite / Create React App) with Tailwind configured.
// Default export: SafetizenLanding

const MODULES = [
  {
    id: 1,
    name: "Office Safety – Corporate Office",
    category: "Office Safety",
    runtime: "13 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["General", "Corporate"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/1Hod_L8VnMU",
    description: "The main objective of this training module is to create a safer office environment by educating employees on critical safety practices to prevent injuries and emergencies.",
    learningObjective: "Learn fire evacuation procedures, ergonomics and posture safety, slip-trip-fall prevention, housekeeping practices, electrical safety, and risk assessment through immersive VR scenarios with analytics and multilingual support."
  },
  {
    id: 2,
    name: "Excavation Safety – Construction Excavation Training",
    category: "Excavation Safety",
    runtime: "10 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/B3lWSfs1Omo",
    description: "The main objective of this training module is to ensure workers understand excavation hazards and follow safe procedures to prevent cave-ins, utility strikes, and site accidents.",
    learningObjective: "Identify excavation hazards, understand soil classification and protective systems, follow safe entry-exit procedures, avoid underground utilities, manage restricted zones, practice VR-based hazard identification, and respond to emergencies."
  },
  {
    id: 3,
    name: "Excavation Safety – Power Line Excavation Training",
    category: "Excavation Safety",
    runtime: "10 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/B3lWSfs1Omo",
    description: "The main objective of this training module is to ensure workers understand excavation hazards near underground power lines and utilities.",
    learningObjective: "Learn to identify power-line excavation risks, apply soil protection systems, locate underground services, prevent utility strikes, and respond to emergencies using immersive VR simulations."
  },
  {
    id: 4,
    name: "PPE Orientation – General V1",
    category: "PPE Orientation",
    runtime: "5 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["General", "Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/e3kierOsgxs",
    description: "The main objective of this training module is to ensure employees understand the correct selection, usage, and maintenance of Personal Protective Equipment.",
    learningObjective: "Learn PPE types, correct selection by risk, wearing and inspection procedures, maintenance, storage, and behavior reinforcement through VR scenarios with analytics and multilingual support."
  },
  {
    id: 5,
    name: "Hot Works – Welding",
    category: "Hot Works",
    runtime: "10 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/EchSPTJs8Jc",
    description: "This VR training module helps learners understand hot work hazards, welding risks, PPE usage, and safe arc-welding procedures.",
    learningObjective: "Identify fire, burn, shock, and fume hazards, inspect welding equipment, assess risks, perform safe welding steps, and reinforce compliance using immersive simulations."
  },
  {
    id: 6,
    name: "Electrical Safety – LOTO",
    category: "Electrical Safety",
    runtime: "10 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/FcBoEBMCQ98",
    description: "This training module ensures workers correctly apply Lockout/Tagout procedures to isolate hazardous electrical energy.",
    learningObjective: "Understand LOTO requirements, identify energy sources, apply locking and tagging, verify zero-energy states, follow communication protocols, and practice procedures in VR."
  },
  {
    id: 7,
    name: "Electrical Safety – Construction",
    category: "Electrical Safety",
    runtime: "10 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/FcBoEBMCQ98",
    description: "This module prepares workers to identify and avoid electrical hazards common in construction environments.",
    learningObjective: "Recognize temporary power risks, unsafe wiring, grounding issues, wet conditions, and practice safe decision-making and emergency response in VR scenarios."
  },
  {
    id: 8,
    name: "Work At Height – Roof Sheet Change",
    category: "Work At Height",
    runtime: "10 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/GfuGvQ79Wt4",
    description: "This training module equips workers with knowledge and skills to perform roof sheeting work safely.",
    learningObjective: "Use ladders and fall protection systems, identify roof hazards, manage materials safely, prepare for emergencies, and reinforce safe practices through VR simulations."
  },
  {
    id: 9,
    name: "Work At Height – Scaffolding Safety",
    category: "Work At Height",
    runtime: "10 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/GfuGvQ79Wt4",
    description: "This training module ensures workers understand safe practices for erecting, using, and dismantling scaffolding.",
    learningObjective: "Inspect scaffolds, identify hazards, use guardrails and fall protection, manage materials, and apply safe practices in VR-based scenarios."
  },
  {
    id: 10,
    name: "Fire Safety – General Extinguisher Training V2",
    category: "Fire Safety",
    runtime: "10 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["General", "Corporate", "Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/ft8C4kd73vU",
    description: "This training module teaches employees how to identify fire hazards and use the correct fire extinguisher during emergencies.",
    learningObjective: "Understand fire classes, extinguisher types, evacuation planning, risk assessment, and emergency response using realistic VR fire scenarios."
  },
  {
    id: 11,
    name: "Work At Height – Vertigo Test",
    category: "Work At Height",
    runtime: "5 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/GfuGvQ79Wt4",
    description: "This assessment module evaluates physical and psychological readiness to work at heights.",
    learningObjective: "Assess balance, height tolerance, fitness for duty, PPE awareness, and decision-making using immersive height simulations."
  },
  {
    id: 12,
    name: "Work At Height – Manlifter Safety",
    category: "Work At Height",
    runtime: "5 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/GfuGvQ79Wt4",
    description: "This training module prepares workers to safely operate man lifters and elevated work platforms.",
    learningObjective: "Understand inspections, stability risks, fall protection, emergency lowering, communication, and hazard control through VR scenarios."
  },
  {
    id: 13,
    name: "Fire Safety – Fire Evacuation Safety",
    category: "Fire Safety",
    runtime: "15 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["General", "Corporate"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/1Hod_L8VnMU",
    description: "This training module prepares employees to evacuate safely during fire emergencies in office environments.",
    learningObjective: "Follow evacuation routes, assist others, avoid unsafe actions, and make confident decisions under pressure in VR fire drills."
  },
  {
    id: 14,
    name: "Chemical Safety – Hazardous Substances Handling",
    category: "Chemical Safety",
    runtime: "10 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/j1RGESoqhZ4",
    description: "This module ensures workers safely handle, store, and work with hazardous chemicals.",
    learningObjective: "Identify chemical hazards, use SDS, apply PPE, handle spills, manage exposure risks, and respond to emergencies using VR simulations."
  },
  {
    id: 15,
    name: "Environmental Safety – Waste Segregation",
    category: "Environmental Safety",
    runtime: "5 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/Khas9OMzy_Q",
    description: "This VR module trains employees to identify, segregate, and dispose of waste safely.",
    learningObjective: "Classify waste types, apply color-coded segregation, handle hazardous waste, follow compliance standards, and practice in immersive environments."
  },
  {
    id: 16,
    name: "CPR Training – Basic Life Support",
    category: "CPR Training",
    runtime: "5 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["General", "Corporate"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/Qz1x5s5UJLA",
    description: "This training module equips employees with skills to perform CPR effectively during cardiac emergencies.",
    learningObjective: "Perform CPR with correct technique, recognize cardiac arrest, follow the chain of survival, and respond confidently in VR emergency simulations."
  },
  {
    id: 17,
    name: "Shop Floor Safety – Life Saving Rules",
    category: "Shop Floor Safety",
    runtime: "5 mins",
    languages: ["English"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/VbRdivaGjDk",
    description: "This training module ensures workers understand and follow life-saving rules on shop floors.",
    learningObjective: "Identify machinery hazards, follow safe movement practices, use PPE, maintain housekeeping, and comply with operational safety rules."
  },
  /* {
      id: 1,
      name: "Fire Safety Awareness",
      category: "General Safety", //11
      runtime: "10 mins",
      languages: ["English", "Hindi", "Kannada"],
      modes: { guided: true, quiz: false, assessment: true },
      industries: ["General", "Corporate"],
      devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"],
      video: "https://youtu.be/EchSPTJs8Jc",
      description: "This module helps learners understand common fire hazards at workplaces and the correct response during fire emergencies.",
      learningObjective: "Enable learners to identify fire risks, understand fire classifications, and follow correct evacuation and extinguisher usage procedures."
    },
    {
      id: 2,
      name: "Corporate Office Safety",
      category: "General Safety", //2
      runtime: "13 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: true, assessment: false },
      industries: ["General", "Corporate"],
      devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"],
      video: "Office Safety.mp4",
      description: "Scenario-driven tour of office risk zones covering slips, electrical clutter, and visitor safety protocols.",
      learningObjective: "Learners learn to audit office floors, escalate unsafe observations, and guide co-workers to muster points."
    },
    {
      id: 3,
      name: "CPR Training",
      category: "General Safety", //basic liife support 17
      runtime: "5 mins",
      languages: ["English"],
      modes: { guided: true, quiz: false, assessment: false },
      industries: ["General", "Corporate"],
      devices: ["Meta Quest 3", "Meta Quest 3S"],
      video: "Aatral_CPR_Safetizen.mp4",
      description: "Guided CPR practice with pacing cues, compression depth prompts, and AED callouts.",
      learningObjective: "Learners memorize the compression/breath cycle and confidently lead basic life support until help arrives."
    },
    {
      id: 4,
      name: "Importance of PPE",
      category: "General Safety", //gen v1 5
      runtime: "5 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: true, assessment: false },
      industries: ["Manufacturing", "Infrastructure"],
      devices: ["Meta Quest 3", "Meta Quest 3S"],
      video: "PPE Importances.mp4",
      description: "Interactive locker room sequence showing how PPE prevents impact, noise, and chemical exposure.",
      learningObjective: "Learners match tasks with the correct PPE kit and perform compliance checks for their teams."
    },
    {
      id: 5,
      name: "Waste Segregation & Environmental Control",
      category: "General Safety", //waste seg0 16
      runtime: "5 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: true, assessment: false },
      industries: ["Infrastructure"],
      devices: ["Meta Quest 3", "Meta Quest 3S"],
      video: "Environment control - english.mp4",
      description: "Plant-floor scenario explaining color-coded bins, spill trays, and clean-down routines.",
      learningObjective: "Learners classify waste streams correctly and respond to minor leaks without escalating production downtime."
    },
    {
      id: 6,
      name: "Emergency Evacuation – Corporate",
      category: "General Safety", //14
      runtime: "15 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: false, assessment: false },
      industries: ["General", "Corporate"],
      devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"],
      video: "Fire emergency evacuation.mp4",
      description: "Multi-floor evacuation drill covering alarms, stairwell etiquette, and headcount validation.",
      learningObjective: "Learners coordinate floor wardens, guide visitors, and complete post-drill reporting templates."
    },
    {
      id: 7,
      name: "Work at Height – Roof Sheet Maintenance",
      category: "Killer Risks", //oof 9
      runtime: "10 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: false, assessment: true },
      industries: ["Manufacturing", "Infrastructure"],
      devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"],
      video: "Work at Height - Roofsheet.mp4",
      description: "Maintenance bay simulation emphasising lifeline anchoring, panel stability, and weather calls.",
      learningObjective: "Learners inspect roof gear, choose the safest access path, and halt work when red flags appear."
    },
    {
      id: 8,
      name: "Work at Height – Scaffold Safety",
      category: "Killer Risks", //s 10
      runtime: "10 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: false, assessment: true },
      industries: ["Manufacturing", "Infrastructure"],
      devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"],
      video: "Scaffolding Safety Training.mp4",
      description: "Scaffold build-up and climb sequence highlighting guardrails, toe boards, and load tags.",
      learningObjective: "Learners verify scaffold readiness, secure tools, and communicate load limits to crews."
    },
    {
      id: 9,
      name: "Confined Space Safety (Manufacturing)",
      category: "Killer Risks",
      runtime: "10 mins",
      languages: ["English", "Hindi", "Kannada"],
      modes: { guided: true, quiz: true, assessment: false },
      industries: ["Manufacturing"],
      devices: ["Meta Quest 3", "Meta Quest 3S"],
      video: "Confined space.mp4",
      description: "Tank entry storyline with permit reviews, atmospheric testing, and attendant coordination.",
      learningObjective: "Learners enforce confined space permits, maintain comms, and react to gas alarm scenarios."
    },
    {
      id: 10,
      name: "Confined Space Safety (Infrastructure)",
      category: "Killer Risks",
      runtime: "10 mins",
      languages: ["English", "Hindi", "Kannada"],
      modes: { guided: true, quiz: true, assessment: false },
      industries: ["Infrastructure"],
      devices: ["Meta Quest 3", "Meta Quest 3S"],
      video: "Confined Space English and Hindi.mp4",
      description: "Utility vault inspection module focusing on underground risks, ventilation, and retrieval setups.",
      learningObjective: "Learners adapt confined space controls to linear projects and brief contractors on rescue options."
    },
    {
      id: 11,
      name: "Hot Works – Welding",
      category: "Killer Risks", //hot works 6
      runtime: "10 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: true, assessment: false },
      industries: ["Manufacturing", "Infrastructure"],
      devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"],
      video: "Hot Works welding.mp4",
      description: "Fabrication shop scene covering spark containment, fire watch duties, and gas cylinder handling.",
      learningObjective: "Learners prep hot-work permits, stage firefighting gear, and close jobs without lingering embers."
    },
    {
      id: 12,
      name: "Electrical Safety – LOTO",
      category: "Killer Risks", //loto 7
      runtime: "10 mins",
      languages: ["English", "Hindi", "Kannada"],
      modes: { guided: true, quiz: true, assessment: false },
      industries: ["Manufacturing"],
      devices: ["Meta Quest 3", "Meta Quest 3S"],
      video: "LOTO SAFETY TRAINING.mp4",
      description: "Hands-on lockout walkthrough with tagging steps, stored energy checks, and reset confirmation.",
      learningObjective: "Learners isolate equipment, verify zero energy, and communicate restarts with maintenance teams."
    },
    {
      id: 13,
      name: "Electrical Safety at Construction Site",// elec scons
      category: "Killer Risks", //8
      runtime: "7 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: true, assessment: false },
      industries: ["Infrastructure"],
      devices: ["Meta Quest 2", "Meta Quest 3", "Meta Quest 3S"],
      video: "Electrical - construction.mp4",
      description: "Outdoor construction feed simulation focusing on temporary panels, moisture risks, and cable routing.",
      learningObjective: "Learners inspect site power, safeguard cords, and brief crews on touch potential controls."
    },
    {
      id: 14,
      name: "Gas Leakage Response",
      category: "Killer Risks",
      runtime: "10 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: true, assessment: false },
      industries: ["Manufacturing"],
      devices: ["Meta Quest 3", "Meta Quest 3S"],
      video: "gas leakage 2.mp4",
      description: "Process line leak scenario showing detection cues, emergency ventilation, and isolation valves.",
      learningObjective: "Learners practise raising alarms, executing leak isolation SOPs, and coordinating with emergency response."
    },
    {
      id: 15,
      name: "Hazardous Substances",
      category: "Killer Risks",
      runtime: "10 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: true, assessment: false },
      industries: ["Manufacturing", "Infrastructure"],
      devices: ["Meta Quest 3", "Meta Quest 3S"],
      video: "Hazardsubstance.mp4",
      description: "Warehouse walkthrough explaining SDS usage, labeling, and spill kit deployment.",
      learningObjective: "Learners interpret hazard pictograms, don the right PPE, and contain spills within golden minutes."
    },
    {
      id: 16,
      name: "Excavation Safety",
      category: "Killer Risks",
      runtime: "10 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: true, assessment: false },
      industries: ["Infrastructure"],
      devices: ["Meta Quest 3", "Meta Quest 3S"],
      video: "Excavation Safety.mp4",
      description: "Trench build simulation covering soil classification, shoring setups, and site traffic controls.",
      learningObjective: "Learners evaluate trench depth, position shielding, and enforce exclusion zones."
    },
    {
      id: 17,
      name: "Excavation Safety – Power Version", ////4
      category: "Killer Risks",
      runtime: "10 mins",
      languages: ["English"],
      modes: { guided: true, quiz: true, assessment: false },
      industries: ["Infrastructure"],
      devices: ["Meta Quest 3S"],
      video: "Excavation Safety - power.mp4",
      description: "High-energy version focusing on energized utilities, fault currents, and emergency pull-outs.",
      learningObjective: "Learners map buried services, monitor manlifter reach, and react to equipment contact incidents."
    },
    {
      id: 18,
      name: "Vertigo Test",
      category: "Killer Risks",//12
      runtime: "5 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: false, assessment: false },
      industries: ["Infrastructure", "Manufacturing"],
      devices: ["Meta Quest 3", "Meta Quest 3S"],
      video: "Vertigo Test -1.mp4",
      description: "Quick assessment loop testing depth perception, balance checks, and acclimatization steps.",
      learningObjective: "Learners self-assess tolerance for height tasks and follow reporting routes when symptoms appear."
    },
    {
      id: 19,
      name: "Construction Site Orientation",
      category: "Killer Risks",
      runtime: "15 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: false, assessment: true },
      industries: ["Infrastructure"],
      devices: ["Meta Quest 3", "Meta Quest 3S"],
      video: "Construction Safety Orientation.mp4",
      description: "Full-site onboarding covering access control, LSR commitments, and machinery interaction zones.",
      learningObjective: "Learners navigate the site map, respect exclusion areas, and mentor new entrants on day one."
    },
    {
      id: 20,
      name: "Work at Height – Manlifter", //13
      category: "Killer Risks",
      runtime: "10 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: true, assessment: true },
      industries: ["Infrastructure", "Manufacturing"],
      devices: ["Meta Quest 3", "Meta Quest 3S"],
      video: "Man lifter (1).mp4",
      description: "Boom lift practice session covering stability checks, ground guide communication, and fall arrest usage.",
      learningObjective: "Learners conduct pre-use inspections, operate within safe envelopes, and manage rescue plans."
    },
    {
      id: 21,
      name: "Chemical Safety (Dec 2025)", //15
      category: "Killer Risks",
      runtime: "10 mins",
      languages: ["English", "Hindi"],
      modes: { guided: true, quiz: true, assessment: false },
      industries: ["Manufacturing"],
      devices: ["Meta Quest 3", "Meta Quest 3S"],
      video: "",
      description: "Placeholder chemical handling lab focusing on storage, transfer hoses, and neutralization.",
      learningObjective: "Learners identify incompatible chemicals, stage response kits, and escalate exposures promptly."
    }, 
  {
    id: 22,
    name: "Material Handling (Dec 2025)",
    category: "Killer Risks",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: true, assessment: false },
    industries: ["Manufacturing"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "",
    description: "Forklift plus manual handling vignette covering ergonomics, stacking, and pedestrian lanes.",
    learningObjective: "Learners plan lifts, select aids, and enforce spotter communication standards."
  },
  {
    id: 23,
    name: "Shop Floor Safety (Dec 2025)",
    category: "Killer Risks",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: true, assessment: false },
    industries: ["Manufacturing"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "",
    description: "General shop floor patrol showing machine guarding, housekeeping, and shift handovers.",
    learningObjective: "Learners run layered safety audits and close the loop on corrective actions."
  },
*/
  // EOT Crane Simulator
  {
    id: 24,
    name: "Pendant EOT Crane VR Simulator",
    category: "EOT Crane Simulator",
    runtime: "20 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: true, assessment: true },
    industries: ["Manufacturing"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://www.youtube.com/watch?v=llm0aTbYTxE",
    description: "End-to-end crane simulator with hook rigging, pendant commands, and emergency shutdown cues.",
    learningObjective: "Learners practice precise load positioning, avoid swing risks, and follow shutdown escalations."
  },
  {
    id: 25,
    name: "Cabin Crane - Slab & Hot Metal Handling",
    category: "EOT Crane Simulator",
    runtime: "30-40 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: true, assessment: true },
    industries: ["Manufacturing"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/t0d-axZjhe0",
    description: "End-to-end crane simulator with hook rigging, pendant commands, and emergency shutdown cues.",
    learningObjective: "Learners practice precise load positioning, avoid swing risks, and follow shutdown escalations."
  },
  {
    id: 26,
    name: "Cabin Crane - Billet Handling",
    category: "EOT Crane Simulator",
    runtime: "25 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: true, assessment: true },
    industries: ["Manufacturing"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/t0d-axZjhe0",
    description: "End-to-end crane simulator with hook rigging, pendant commands, and emergency shutdown cues.",
    learningObjective: "Learners practice precise load positioning, avoid swing risks, and follow shutdown escalations."
  },
  {
    id: 27,
    name: "Cabin Crane - Coil Handling",
    category: "EOT Crane Simulator",
    runtime: "20 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: true, assessment: true },
    industries: ["Manufacturing"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/t0d-axZjhe0",
    description: "End-to-end crane simulator with hook rigging, pendant commands, and emergency shutdown cues.",
    learningObjective: "Learners practice precise load positioning, avoid swing risks, and follow shutdown escalations."
  }
];

const EOT_CATEGORY = "EOT Crane Simulator";
const GENERAL_MODULES = MODULES.filter((m) => m.category !== EOT_CATEGORY);
const EOT_MODULES = MODULES.filter((m) => m.category === EOT_CATEGORY);
//const CATEGORIES = ["All", "General Safety", "Killer Risks"];
const CATEGORIES = [
  "All",
  "Office Safety",
  "Excavation Safety",
  "PPE Orientation",
  "Hot Works",
  "Electrical Safety",
  "Work At Height",
  "Fire Safety",
  "Chemical Safety",
  "Environmental Safety",
  "CPR Training",
  "Shop Floor Safety"
];

const HERO_STATS = [
  { label: "Ready Modules", value: "21+" },
  { label: "Learning Modes", value: "3" },
  { label: "Languages", value: "Multi" },
  { label: "Supported", value: "Quest 3 / 3S" }
];
const DEFAULT_YOUTUBE_EMBED = "https://www.youtube.com/embed/U1xeDRqj2oA";
const SHOW_WATCH_BUTTON = false;
const LOGO_URL = "https://aatral.io/assets/images/home/logo_full.svg";

function getYouTubeEmbedUrl(source) {
  if (!source) return DEFAULT_YOUTUBE_EMBED;
  if (source.includes("youtube.com/embed/")) return source;
  if (source.includes("youtube.com/watch")) {
    const query = source.split("?")[1] || "";
    const params = new URLSearchParams(query);
    const id = params.get("v");
    if (id) return `https://www.youtube.com/embed/${id}`;
  }
  if (source.includes("youtu.be/")) {
    const id = source.split("youtu.be/")[1]?.split("?")[0];
    if (id) return `https://www.youtube.com/embed/${id}`;
  }
  return DEFAULT_YOUTUBE_EMBED;
}

function LogoCarousel() {
  // Logo carousel with infinite scroll animation
  //https://codepen.io/studiojvla/pen/qVbQqW
  const logos = [
    `${import.meta.env.BASE_URL}logos/lnt_construction.jpeg`,
    `${import.meta.env.BASE_URL}logos/amnsindia.jpeg`,
    `${import.meta.env.BASE_URL}logos/ashokleyland.jpeg`,
    `${import.meta.env.BASE_URL}logos/toyoto.jpeg`,
    `${import.meta.env.BASE_URL}logos/tatapower.jpeg`,
    `${import.meta.env.BASE_URL}logos/tataprojects.jpeg`,
    `${import.meta.env.BASE_URL}logos/ey.jpg`,
    `${import.meta.env.BASE_URL}logos/jsw.jpeg`,
    `${import.meta.env.BASE_URL}logos/iaf.jpeg`,
    `${import.meta.env.BASE_URL}logos/indianarmy.jpeg`,
    `${import.meta.env.BASE_URL}logos/indiannavy.jpeg`,
    `${import.meta.env.BASE_URL}logos/toyotoboshoku.jpg`,
    `${import.meta.env.BASE_URL}logos/coreehs.jpeg`,
    `${import.meta.env.BASE_URL}logos/forcetech.jpeg`,
    `${import.meta.env.BASE_URL}logos/hcc.png`,
    `${import.meta.env.BASE_URL}logos/itt.jpeg`,
    `${import.meta.env.BASE_URL}logos/jll.jpeg`,
    `${import.meta.env.BASE_URL}logos/kitious.jpeg`,
    `${import.meta.env.BASE_URL}logos/lnt-energy-hydrocarbon.jpg`,
    `${import.meta.env.BASE_URL}logos/lnt.jpeg`,
    `${import.meta.env.BASE_URL}logos/msp.jpeg`,
    `${import.meta.env.BASE_URL}logos/renfraenergy.jpeg`,
    `${import.meta.env.BASE_URL}logos/saildsp.jpeg`,
    `${import.meta.env.BASE_URL}logos/saintgobain.jpeg`,
    `${import.meta.env.BASE_URL}logos/tcs.jpg`,
    `${import.meta.env.BASE_URL}logos/titan.jpeg`,
    `${import.meta.env.BASE_URL}logos/acedesigners.jpeg`,
    `${import.meta.env.BASE_URL}logos/allison.jpeg`,
    `${import.meta.env.BASE_URL}logos/asp.jpg`,
    `${import.meta.env.BASE_URL}logos/tpcodl.jpeg`,
    `${import.meta.env.BASE_URL}logos/tpsodl.jpg`
  ];

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-slate-900 py-8">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />

      {/* Scrolling track */}
      <div className="flex animate-scroll">
        {/* First set of logos */}
        {logos.map((logo, idx) => (
          <div key={`logo-1-${idx}`} className="flex-shrink-0 w-64 px-4">
            <img src={logo} alt={`Logo ${idx + 1}`} className="h-24 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
        ))}
        {/* Duplicate set for infinite scroll */}
        {logos.map((logo, idx) => (
          <div key={`logo-2-${idx}`} className="flex-shrink-0 w-64 px-4">
            <img src={logo} alt={`Logo ${idx + 1}`} className="h-24 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AwardsCarousel() {
  // 3D Awards Carousel - https://codepen.io/roniee_1993/pen/WbQZjLo
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  const awards = [
    {
      image: `${import.meta.env.BASE_URL}awards/award-1.jpeg`,
      title: "Winner of Sustainable Startup Award",
      subtitle: "XTIC XR Startup award - XR Summit 2024"
    },
    {
      image: `${import.meta.env.BASE_URL}awards/award-2.jpg`,
      title: "GOLD - Best Use of Augmented Reality and Metaverse",
      subtitle: "Brandon Hall HCM Excellence Awards 2025"
    },
    {
      image: `${import.meta.env.BASE_URL}awards/award-3.jpeg`,
      title: "The Emerging innovator in enterprise XR award",
      subtitle: "Startup Maanadu - 2024"
    },
    {
      image: `${import.meta.env.BASE_URL}awards/award-4.jpeg`,
      title: "iDEX 6.0 - Indian Navy Challenge Winner",
      subtitle: "Defence India Starup Challenge"
    },
    {
      image: `${import.meta.env.BASE_URL}awards/award-5.jpeg`,
      title: "iDEX 5.0 - Indian Air Force Challenge Winner",
      subtitle: "Defence India Starup Challenge"
    },
    {
      image: `${import.meta.env.BASE_URL}awards/award-6.jpg`,
      title: "Honarary Award",
      subtitle: "Indian Air Force"
    },
    {
      image: `${import.meta.env.BASE_URL}awards/award-7.jpg`,
      title: "Cohort 4 Winner of the IIMB & NSRCEL",
      subtitle: "Maruti Suzuki Incubation Program"
    },
    {
      image: `${import.meta.env.BASE_URL}awards/award-8.jpg`,
      title: "Winner - Gold Award Towards commitment to improving HSE",
      subtitle: "OHSSAI startup Award "
    }
  ];

  const totalAwards = awards.length;

  const getCardClass = (index) => {
    const diff = (index - currentIndex + totalAwards) % totalAwards;

    if (diff === 0) return "center";
    if (diff === 1 || diff === totalAwards - 1) {
      return diff === 1 ? "right-1" : "left-1";
    }
    if (diff === 2 || diff === totalAwards - 2) {
      return diff === 2 ? "right-2" : "left-2";
    }
    return "hidden";
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    // Pause auto-scroll when user manually navigates
    setIsAutoScrollPaused(true);
    setTimeout(() => setIsAutoScrollPaused(false), 6000); // Resume after 6 seconds
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalAwards);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalAwards) % totalAwards);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoScrollPaused(true);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
    // Resume auto-scroll after 10 seconds
    setTimeout(() => setIsAutoScrollPaused(false), 10000);
  };

  const handleMouseEnter = () => {
    setIsAutoScrollPaused(true);
  };

  const handleMouseLeave = () => {
    setIsAutoScrollPaused(false);
  };

  const handleManualNavigation = () => {
    setIsAutoScrollPaused(true);
    setTimeout(() => setIsAutoScrollPaused(false), 10000);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
        handleManualNavigation();
      }
      if (e.key === "ArrowRight") {
        nextSlide();
        handleManualNavigation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-scroll effect
  React.useEffect(() => {
    if (isAutoScrollPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoScrollPaused]);

  return (
    <div
      className="awards-carousel-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel */}
      <div className="relative h-96 flex items-center justify-center perspective-1000">
        {/* Left Arrow */}
        <button
          onClick={() => {
            prevSlide();
            handleManualNavigation();
          }}
          className="absolute left-4 z-20 w-12 h-12 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all flex items-center justify-center text-2xl text-slate-700 dark:text-white"
          aria-label="Previous award"
        >
          ‹
        </button>

        {/* Cards Track */}
        <div
          className="awards-track relative w-full h-full flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {awards.map((award, index) => (
            <div
              key={index}
              className={`awards-card ${getCardClass(index)}`}
              onClick={() => {
                const cardClass = getCardClass(index);
                if (cardClass === "left-1") prevSlide();
                if (cardClass === "right-1") nextSlide();
              }}
            >
              <img
                src={award.image}
                alt={award.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => {
            nextSlide();
            handleManualNavigation();
          }}
          className="absolute right-4 z-20 w-12 h-12 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all flex items-center justify-center text-2xl text-slate-700 dark:text-white"
          aria-label="Next award"
        >
          ›
        </button>
      </div>

      {/* Award Info */}
      <div className="text-center mt-8">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white transition-opacity duration-300">
          {awards[currentIndex].title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mt-2 transition-opacity duration-300">
          {awards[currentIndex].subtitle}
        </p>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {awards.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
              ? "bg-indigo-600 w-8"
              : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
              }`}
            aria-label={`Go to award ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ModeBadge({ modes }) {
  return (
    <div className="flex gap-2">
      {modes.guided && <span className="px-2 py-1 text-xs bg-sky-100 text-sky-800 rounded">Guided</span>}
      {modes.quiz && <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded">Quiz</span>}
      {modes.assessment && <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded">Assessment</span>}
    </div>
  );
}

function ModuleCard({ m, onDetails }) {
  const embedUrl = getYouTubeEmbedUrl(m.video);
  return (
    <div className="bg-white/80 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold leading-tight text-slate-900 dark:text-white">{m.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">{m.industries.join(" • ")}</p>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-200">{m.runtime}</div>
      </div>

      <div className="mt-3">
        <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-black/10">
          <iframe
            src={embedUrl}
            title={`${m.name} video`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <ModeBadge modes={m.modes} />
        <div className="text-xs text-slate-500 dark:text-slate-300">{m.languages.join(", ")}</div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {SHOW_WATCH_BUTTON && (
          <>
            {m.video ? (
              <a
                href={m.video}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded text-sm"
              >
                ▶ Watch
              </a>
            ) : (
              <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 rounded text-sm" disabled>
                No Preview
              </button>
            )}
          </>
        )}
        <button
          onClick={() => onDetails(m)}
          className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-600 text-sm text-slate-700 dark:text-slate-100 rounded"
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default function SafetizenLanding() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [runtimeFilter, setRuntimeFilter] = useState("All");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const languages = useMemo(() => {
    const s = new Set();
    GENERAL_MODULES.forEach((m) => m.languages.forEach((l) => s.add(l)));
    return ["All", ...Array.from(s)];
  }, []);

  const filtered = useMemo(() => {
    return GENERAL_MODULES.filter((m) => {
      if (activeCategory !== "All" && m.category !== activeCategory) return false;
      if (languageFilter !== "All" && !m.languages.includes(languageFilter)) return false;
      if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (runtimeFilter !== "All") {
        // normalize runtime to number
        const num = parseInt(m.runtime, 10);
        if (runtimeFilter === "<=10" && (isNaN(num) || num > 10)) return false;
        if (runtimeFilter === ">10" && (isNaN(num) || num <= 10)) return false;
      }
      return true;
    });
  }, [activeCategory, search, languageFilter, runtimeFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      {/* NAV */}
      <header className="max-w-7xl mx-auto p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={LOGO_URL}
            alt="Aatral logo"
            className="w-28 h-12 object-contain"
            loading="lazy"
          />
          <div>
            <div className="font-semibold">Safetizen</div>
            <div className="text-xs text-slate-500">VR Safety Training Library</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="#modules" className="hover:underline">Modules</a>
          <a href="#summary" className="hover:underline">Summary</a>
          <a href="https://aatral.io/contact-us" target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-indigo-600 text-white rounded">Request Demo</a>
        </nav>
        <button
          className="md:hidden inline-flex flex-col justify-center items-center w-11 h-11 border border-slate-200 rounded-lg"
          onClick={() => setMobileNavOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="w-5 h-0.5 bg-slate-800 mb-1" />
          <span className="w-5 h-0.5 bg-slate-800 mb-1" />
          <span className="w-5 h-0.5 bg-slate-800" />
        </button>
      </header>
      {mobileNavOpen && (
        <div className="md:hidden px-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex flex-col gap-2 text-sm text-slate-600">
            <a href="#modules" onClick={() => setMobileNavOpen(false)} className="py-1">Modules</a>
            <a href="#summary" onClick={() => setMobileNavOpen(false)} className="py-1">Summary</a>
            <a href="#modules" onClick={() => setMobileNavOpen(false)} className="py-1">Explore Modules</a>
            <a href="https://aatral.io/contact-us" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded">
              Request Demo
            </a>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">Immersive VR Safety Training Library for Enterprises</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Ready-to-deploy, multilingual VR safety modules designed for Manufacturing, Infrastructure & Corporate environments — built for measurable competency.</p>

          <div className="mt-6 flex gap-3">
            <a href="#modules" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg">View Modules</a>
            <a href="https://aatral.io/contact-us" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg">Request Demo</a>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4 text-center shadow-lg bg-gradient-to-br from-white via-indigo-50 to-white dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 border border-white/70 dark:border-slate-700/80"
              >
                <div className="text-2xl sm:text-3xl font-semibold text-indigo-600 dark:text-indigo-300 leading-tight break-words">
                  {stat.value}
                </div>
                <div className="text-[12px] sm:text-sm text-slate-600 dark:text-slate-200 mt-2 leading-tight break-words">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-first md:order-last flex items-center justify-center">
          <div className="w-full max-w-md bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-2xl">
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src="https://www.youtube.com/embed/rPZsNqnFfCU"
                title="Safetizen Module Overview"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4 text-sm text-slate-500">Easily deployable modules, mapped to industry risks and Life Saving Rules.</div>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section id="summary" className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800 shadow">
          <h2 className="text-2xl font-semibold">Executive Summary</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Aatral Safetizen is a mature VR Safety Training Library providing 21+ modules across General Safety, Killer Risk Safety and a flagship EOT Crane Simulator. Modules are short (5–20 mins), available in multiple languages, and built with Guided, Quiz and Assessment learning modes for measurable competence.</p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
              <div className="text-2xl font-bold">21+</div>
              <div className="text-sm text-slate-500">Ready Modules</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
              <div className="text-2xl font-bold">5–20 mins</div>
              <div className="text-sm text-slate-500">Typical Runtime</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-slate-500">Learning Modes</div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded">
              <div className="text-2xl font-bold">Quest 3 / 3S</div>
              <div className="text-sm text-slate-500">Primary Devices</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold">VR Safety Module Library</h2>

          <div className="flex flex-col gap-3 w-full sm:flex-row sm:flex-wrap md:justify-end">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search modules..."
              className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 w-full sm:w-48"
            />

            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 w-full sm:w-auto"
            >
              {languages.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

            <select
              value={runtimeFilter}
              onChange={(e) => setRuntimeFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 w-full sm:w-auto"
            >
              <option value="All">All runtimes</option>
              <option value="<=10">≤ 10 mins</option>
              <option value=">10">{"> 10 mins"}</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-3 items-center">
            {CATEGORIES.map((c) => {
              const isActive = activeCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3 py-1 rounded border text-sm transition ${isActive
                    ? "bg-indigo-600 text-white border-indigo-500"
                    : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
                    }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((m) => (
              <ModuleCard key={m.id} m={m} onDetails={setSelected} />
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center p-12 bg-white/60 dark:bg-slate-800/60 rounded">
                No modules match your filters. Try clearing search or filters.
              </div>
            )}
          </div>
        </div>
      </section>

      {EOT_MODULES.length > 0 && (
        <section id="eot-crane" className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">EOT Crane Simulators</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl">
              Dedicated cabin and pendant crane modules that replicate slab, billet, coin, and hot metal handling environments for steel plants and heavy manufacturing.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EOT_MODULES.map((m) => (
              <ModuleCard key={m.id} m={m} onDetails={setSelected} />
            ))}
          </div>
        </section>
      )}

      {/* DIFFERENTIATORS */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold">Why Enterprises Choose Safetizen</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-slate-800/70 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Real-world Risk Replication</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">High fidelity scenarios mapped to Life Saving Rules and industry risk.</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800/70 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Assessment & Benchmarking</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Guided, quiz and assessment modes provide measurable competency scores.</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800/70 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Hardware Integration</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Seamless hardware integrations for advanced simulators and peripherals.</p>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold">Roadmap (Upcoming)</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-slate-800/70 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Chemical Safety</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">December 2025</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800/70 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Material Handling</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">December 2025</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800/70 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Shop Floor Safety</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">December 2025</p>
          </div>
        </div>
      </section>

      {/* LOGO CAROUSEL */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Trusted By Industry Leaders</h2>
        <LogoCarousel />
      </section>

      {/* AWARDS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-center mb-12">Awards & Recognition</h2>
        <AwardsCarousel />
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-8 text-center">
        <div className="bg-indigo-600 text-white rounded-lg p-10 shadow-lg">
          <h3 className="text-2xl font-semibold">Digitize Your Workplace Safety Training Today</h3>
          <p className="mt-2">Deploy VR training across your team and begin measurable assessments in days.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a href="https://aatral.io/contact-us" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 bg-white text-indigo-600 rounded font-semibold text-center">Book a Live VR Demo</a>
            <a href="#modules" className="w-full sm:w-auto px-6 py-3 border rounded text-white/90 text-center">Explore Modules</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold">Aatral Safetizen</div>
            <div className="text-sm text-slate-500 mt-2">Immersive VR safety training modules for enterprise.</div>
          </div>

          <div>
            <div className="font-semibold">Contact</div>
            <div className="text-sm text-slate-500 mt-2">Head Office</div>
            <div className="text-sm text-slate-500">Padma Vilas, Door No. 3/233, Survey No. 34/1b</div>
            <div className="text-sm text-slate-500">Manapakkam Main Road, Manapakkam</div>
            <div className="text-sm text-slate-500">Chennai - 600125, Tamilnadu, India.</div>
            <div className="text-sm text-slate-500 mt-3">Landline: 044-43589770</div>
            <div className="text-sm text-slate-500">Mob: (+91)7338945666 / 9830714314 / 9600067005</div>
            <div className="text-sm text-slate-500">US number: +1(669) 249-5831</div>
            <div className="text-sm text-slate-500 mt-2">Mail: sales@aatral.io</div>
          </div>

          <div>
            <div className="font-semibold">Quick Links</div>
            <ul className="mt-2 text-sm text-slate-500 space-y-1">
              <li>
                <a href="#modules" className="hover:text-slate-800 transition">Modules</a>
              </li>
              <li>
                <a
                  href="https://aatral.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-800 transition"
                >
                  About
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-slate-800 transition">Roadmap</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-sm text-slate-500 text-center">
          © {new Date().getFullYear()}{" "}
          <a href="https://aatral.io/" target="_blank" rel="noreferrer" className="underline text-slate-600 dark:text-slate-300">
            Aatral
          </a>
          . All rights reserved.
        </div>
      </footer>

      {/* DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-2">{selected.name}</h3>
            <p className="text-sm mb-2">Category: {selected.category}</p>
            <div className="mb-2 text-sm text-slate-600 dark:text-slate-300">
              <div className="font-semibold text-slate-800 dark:text-slate-100">Description</div>
              <p>{selected.description}</p>
            </div>
            <div className="mb-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="font-semibold text-slate-800 dark:text-slate-100">Learning Objective</div>
              <p>{selected.learningObjective}</p>
            </div>
            <p className="text-sm mb-2">Runtime: {selected.runtime}</p>
            <p className="text-sm mb-2">Languages: {selected.languages.join(', ')}</p>
            <p className="text-sm mb-2">Industries: {selected.industries.join(', ')}</p>
            <p className="text-sm mb-4">Devices: {selected.devices.join(', ')}</p>
            <div className="flex gap-2 mt-4">
              {selected.video ? (
                <a href={selected.video} target="_blank" rel="noreferrer" className="px-3 py-2 bg-indigo-600 text-white rounded">Watch Video</a>
              ) : null}
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 dark:border-white/30 dark:text-white dark:bg-transparent dark:hover:bg-white/10 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}