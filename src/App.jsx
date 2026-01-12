import React, { useState, useMemo } from "react";

// Safetizen Landing — Single-file React component
// TailwindCSS-first. Drop this into a React app (Vite / Create React App) with Tailwind configured.
// Default export: SafetizenLanding

const MODULES = [
  {
    id: 1,
    name: "Work At Height – Roof Sheet Change",
    category: "Work At Height",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/GfuGvQ79Wt4",
    description: "This training module equips workers with knowledge and skills to perform roof sheeting work safely.",
    learningObjective: "Use ladders and fall protection systems, identify roof hazards, manage materials safely, prepare for emergencies, and reinforce safe practices through VR simulations."
  },
  {
    id: 2,
    name: "Fire Safety – General Extinguisher Training V2",
    category: "Fire Safety",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["General", "Corporate", "Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/ft8C4kd73vU",
    description: "This training module teaches employees how to identify fire hazards and use the correct fire extinguisher during emergencies.",
    learningObjective: "Understand fire classes, extinguisher types, evacuation planning, risk assessment, and emergency response using realistic VR fire scenarios."
  },
  {
    id: 3,
    name: "Confined Space Safety (Manufacturing)",
    category: "Confined Space",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: true, assessment: false },
    industries: ["Manufacturing"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/IXd__McjJxE",
    description: "Tank entry storyline with permit reviews, atmospheric testing, and attendant coordination.",
    learningObjective: "Learners enforce confined space permits, maintain comms, and react to gas alarm scenarios."
  },
  {
    id: 4,
    name: "Hot Works – Welding",
    category: "Hot Works",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/EchSPTJs8Jc",
    description: "This VR training module helps learners understand hot work hazards, welding risks, PPE usage, and safe arc-welding procedures.",
    learningObjective: "Identify fire, burn, shock, and fume hazards, inspect welding equipment, assess risks, perform safe welding steps, and reinforce compliance using immersive simulations."
  },
  {
    id: 5,
    name: "Electrical Safety – LOTO",
    category: "Electrical Safety",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/FcBoEBMCQ98",
    description: "This training module ensures workers correctly apply Lockout/Tagout procedures to isolate hazardous electrical energy.",
    learningObjective: "Understand LOTO requirements, identify energy sources, apply locking and tagging, verify zero-energy states, follow communication protocols, and practice procedures in VR."
  },
  {
    id: 6,
    name: "Office Safety – Corporate Office",
    category: "Office Safety",
    runtime: "13 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["General", "Corporate"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/1Hod_L8VnMU",
    description: "The main objective of this training module is to create a safer office environment by educating employees on critical safety practices to prevent injuries and emergencies.",
    learningObjective: "Learn fire evacuation procedures, ergonomics and posture safety, slip-trip-fall prevention, housekeeping practices, electrical safety, and risk assessment through immersive VR scenarios with analytics and multilingual support."
  },
  {
    id: 7,
    name: "Shop Floor Safety – Life Saving Rules",
    category: "Shop Floor Safety",
    runtime: "5 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/VbRdivaGjDk",
    description: "This training module ensures workers understand and follow life-saving rules on shop floors.",
    learningObjective: "Identify machinery hazards, follow safe movement practices, use PPE, maintain housekeeping, and comply with operational safety rules."
  },
  {
    id: 8,
    name: "Excavation Safety – Construction Excavation Training",
    category: "Excavation Safety",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/B3lWSfs1Omo",
    description: "The main objective of this training module is to ensure workers understand excavation hazards and follow safe procedures to prevent cave-ins, utility strikes, and site accidents.",
    learningObjective: "Identify excavation hazards, understand soil classification and protective systems, follow safe entry-exit procedures, avoid underground utilities, manage restricted zones, practice VR-based hazard identification, and respond to emergencies."
  },
  {
    id: 9,
    name: "PPE Orientation – General V1",
    category: "PPE Orientation",
    runtime: "5 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["General", "Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/e3kierOsgxs",
    description: "The main objective of this training module is to ensure employees understand the correct selection, usage, and maintenance of Personal Protective Equipment.",
    learningObjective: "Learn PPE types, correct selection by risk, wearing and inspection procedures, maintenance, storage, and behavior reinforcement through VR scenarios with analytics and multilingual support."
  },
  {
    id: 10,
    name: "Environmental Safety – Waste Segregation",
    category: "Environmental Safety",
    runtime: "5 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/Khas9OMzy_Q",
    description: "This VR module trains employees to identify, segregate, and dispose of waste safely.",
    learningObjective: "Classify waste types, apply color-coded segregation, handle hazardous waste, follow compliance standards, and practice in immersive environments."
  },
  {
    id: 11,
    name: "Electrical Safety – Construction",
    category: "Electrical Safety",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/FcBoEBMCQ98",
    description: "This module prepares workers to identify and avoid electrical hazards common in construction environments.",
    learningObjective: "Recognize temporary power risks, unsafe wiring, grounding issues, wet conditions, and practice safe decision-making and emergency response in VR scenarios."
  },
  {
    id: 12,
    name: "Work At Height – Scaffolding Safety",
    category: "Work At Height",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/GfuGvQ79Wt4",
    description: "This training module ensures workers understand safe practices for erecting, using, and dismantling scaffolding.",
    learningObjective: "Inspect scaffolds, identify hazards, use guardrails and fall protection, manage materials, and apply safe practices in VR-based scenarios."
  },
  {
    id: 13,
    name: "Work At Height – Vertigo Test",
    category: "Work At Height",
    runtime: "5 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/GfuGvQ79Wt4",
    description: "This assessment module evaluates physical and psychological readiness to work at heights.",
    learningObjective: "Assess balance, height tolerance, fitness for duty, PPE awareness, and decision-making using immersive height simulations."
  },
  {
    id: 14,
    name: "Excavation Safety – Power Line Excavation Training",
    category: "Excavation Safety",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/B3lWSfs1Omo",
    description: "The main objective of this training module is to ensure workers understand excavation hazards near underground power lines and utilities.",
    learningObjective: "Learn to identify power-line excavation risks, apply soil protection systems, locate underground services, prevent utility strikes, and respond to emergencies using immersive VR simulations."
  }, {
    id: 15,
    name: "Fire Safety – Fire Evacuation Safety",
    category: "Fire Safety",
    runtime: "15 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["General", "Corporate"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/w5nbfbZwijQ",
    description: "This training module prepares employees to evacuate safely during fire emergencies in office environments.",
    learningObjective: "Follow evacuation routes, assist others, avoid unsafe actions, and make confident decisions under pressure in VR fire drills."
  },
  {
    id: 16,
    name: "Chemical Safety – Hazardous Substances Handling",
    category: "Chemical Safety",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/j1RGESoqhZ4",
    description: "This module ensures workers safely handle, store, and work with hazardous chemicals.",
    learningObjective: "Identify chemical hazards, use SDS, apply PPE, handle spills, manage exposure risks, and respond to emergencies using VR simulations."
  },
  {
    id: 17,
    name: "CPR Training – Basic Life Support",
    category: "CPR Training",
    runtime: "5 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["General", "Corporate"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/Qz1x5s5UJLA",
    description: "This training module equips employees with skills to perform CPR effectively during cardiac emergencies.",
    learningObjective: "Perform CPR with correct technique, recognize cardiac arrest, follow the chain of survival, and respond confidently in VR emergency simulations."
  },
  {
    id: 18,
    name: "Work At Height – Manlifter Safety",
    category: "Work At Height",
    runtime: "5 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: false, assessment: true },
    industries: ["Manufacturing", "Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/GfuGvQ79Wt4",
    description: "This training module prepares workers to safely operate man lifters and elevated work platforms.",
    learningObjective: "Understand inspections, stability risks, fall protection, emergency lowering, communication, and hazard control through VR scenarios."
  },
  {
    id: 19,
    name: "Confined Space Safety (Infrastructure)",
    category: "Confined Space",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: true, assessment: false },
    industries: ["Infrastructure"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/IXd__McjJxE",
    description: "Utility vault inspection module focusing on underground risks, ventilation, and retrieval setups.",
    learningObjective: "Learners adapt confined space controls to linear projects and brief contractors on rescue options."
  },
  {
    id: 20,
    name: "Gas Leakage Response",
    category: "Gas Safety",
    runtime: "10 mins",
    languages: ["English", "Hindi"],
    modes: { guided: true, quiz: true, assessment: false },
    industries: ["Manufacturing"],
    devices: ["Meta Quest 3", "Meta Quest 3S"],
    video: "https://youtu.be/9lA4d_C4mKc",
    description: "Process line leak scenario showing detection cues, emergency ventilation, and isolation valves.",
    learningObjective: "Learners practise raising alarms, executing leak isolation SOPs, and coordinating with emergency response."
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
      languages: ["English", "Hindi"],
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
      video: "9lA4d_C4mKc",
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
      languages: ["English", "Hindi"],

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
const CATEGORIES = [
  "All",
  "Fire Safety",
  "Hot Works",
  "Electrical Safety",
  "Work At Height",
  "Confined Space",
  "Office Safety",
  "Excavation Safety",
  "PPE Orientation",
  "Chemical Safety",
  "Gas Safety",
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
const LOGO_URL = `${import.meta.env.BASE_URL}aatral-logo.png`;

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
    { src: `${import.meta.env.BASE_URL}logos/lnt_construction.jpeg`, name: "L&T Construction" },
    { src: `${import.meta.env.BASE_URL}logos/amnsindia.jpeg`, name: "AMNS India" },
    { src: `${import.meta.env.BASE_URL}logos/ashokleyland.jpeg`, name: "Ashok Leyland" },
    { src: `${import.meta.env.BASE_URL}logos/toyoto.jpeg`, name: "Toyota" },
    { src: `${import.meta.env.BASE_URL}logos/tatapower.jpeg`, name: "Tata Power" },
    { src: `${import.meta.env.BASE_URL}logos/Jindalsteel.jpeg`, name: "Jindal Steel" },
    { src: `${import.meta.env.BASE_URL}logos/tataprojects.jpeg`, name: "Tata Projects" },
    { src: `${import.meta.env.BASE_URL}logos/ey.jpg`, name: "EY" },
    { src: `${import.meta.env.BASE_URL}logos/jsw.jpeg`, name: "JSW" },
    { src: `${import.meta.env.BASE_URL}logos/iaf.jpeg`, name: "Indian Air Force" },
    { src: `${import.meta.env.BASE_URL}logos/indianarmy.jpeg`, name: "Indian Army" },
    { src: `${import.meta.env.BASE_URL}logos/indiannavy.jpeg`, name: "Indian Navy" },
    { src: `${import.meta.env.BASE_URL}logos/toyotoboshoku.jpg`, name: "Toyota Boshoku" },
    { src: `${import.meta.env.BASE_URL}logos/coreehs.jpeg`, name: "Core EHS" },
    { src: `${import.meta.env.BASE_URL}logos/forcetech.jpeg`, name: "Forcetech" },
    { src: `${import.meta.env.BASE_URL}logos/hcc.png`, name: "HCC" },
    { src: `${import.meta.env.BASE_URL}logos/itt.jpeg`, name: "ITT" },
    { src: `${import.meta.env.BASE_URL}logos/jll.jpeg`, name: "JLL" },
    { src: `${import.meta.env.BASE_URL}logos/kitious.jpeg`, name: "Kitious" },
    { src: `${import.meta.env.BASE_URL}logos/lnt-energy-hydrocarbon.jpg`, name: "L&T Energy Hydrocarbon" },
    { src: `${import.meta.env.BASE_URL}logos/lnt.jpeg`, name: "L&T" },
    { src: `${import.meta.env.BASE_URL}logos/msp.jpeg`, name: "MSP" },
    { src: `${import.meta.env.BASE_URL}logos/renfraenergy.jpeg`, name: "Renfra Energy" },
    { src: `${import.meta.env.BASE_URL}logos/saildsp.jpeg`, name: "SAIL DSP" },
    { src: `${import.meta.env.BASE_URL}logos/saintgobain.jpeg`, name: "Saint-Gobain" },
    { src: `${import.meta.env.BASE_URL}logos/tcs.jpg`, name: "TCS" },
    { src: `${import.meta.env.BASE_URL}logos/titan.jpeg`, name: "Titan" },
    { src: `${import.meta.env.BASE_URL}logos/acedesigners.jpeg`, name: "Ace Designers" },
    { src: `${import.meta.env.BASE_URL}logos/allison.jpeg`, name: "Allison" },
    { src: `${import.meta.env.BASE_URL}logos/asp.jpg`, name: "ASP" },
    { src: `${import.meta.env.BASE_URL}logos/tpcodl.jpeg`, name: "TPCODL" },
    { src: `${import.meta.env.BASE_URL}logos/tpsodl.jpg`, name: "TPSODL" },
    { src: `${import.meta.env.BASE_URL}logos/avery.png`, name: "Avery Dennison" },
    { src: `${import.meta.env.BASE_URL}logos/ehsguru.jpeg`, name: "EHS Guru" },
    { src: `${import.meta.env.BASE_URL}logos/gevernova.png`, name: "GE Vernova" },
    { src: `${import.meta.env.BASE_URL}logos/haldia-petrochemical.png`, name: "Haldia Petrochemicals" },
    { src: `${import.meta.env.BASE_URL}logos/nifst.jpeg`, name: "NIFST" },
    { src: `${import.meta.env.BASE_URL}logos/npcil.jpeg`, name: "NPCIL" },
    { src: `${import.meta.env.BASE_URL}logos/pentasafe.jpeg`, name: "Pentasafe" },
    { src: `${import.meta.env.BASE_URL}logos/torrent_power.png`, name: "Torrent Power" },
    { src: `${import.meta.env.BASE_URL}logos/vsl.png`, name: "VSL" }
  ];

  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const img = entry.target.querySelector('img');
          if (img) {
            // Check if logo is in center 50% of viewport
            const rect = entry.boundingClientRect;
            const viewportWidth = window.innerWidth;
            const centerStart = viewportWidth * 0.25;
            const centerEnd = viewportWidth * 0.75;
            const logoCenter = rect.left + rect.width / 2;

            if (logoCenter >= centerStart && logoCenter <= centerEnd) {
              img.style.filter = 'grayscale(0)';
            } else {
              img.style.filter = 'grayscale(1)';
            }
          }
        });
      },
      {
        root: null,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const container = containerRef.current;
    if (container) {
      const logoItems = container.querySelectorAll('.logo-item');
      logoItems.forEach((item) => observer.observe(item));

      // Also update on scroll for smooth transitions
      const handleScroll = () => {
        logoItems.forEach((item) => {
          const img = item.querySelector('img');
          if (img) {
            const rect = item.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const centerStart = viewportWidth * 0.25;
            const centerEnd = viewportWidth * 0.75;
            const logoCenter = rect.left + rect.width / 2;

            if (logoCenter >= centerStart && logoCenter <= centerEnd) {
              img.style.filter = 'grayscale(0)';
            } else {
              img.style.filter = 'grayscale(1)';
            }
          }
        });
      };

      const scrollInterval = setInterval(handleScroll, 100);

      return () => {
        logoItems.forEach((item) => observer.unobserve(item));
        clearInterval(scrollInterval);
      };
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-slate-900 py-8 logo-carousel-wrapper">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />

      {/* Scrolling track */}
      <div ref={containerRef} className="flex animate-scroll">
        {/* First set of logos */}
        {logos.map((logo, idx) => (
          <div key={`logo-1-${idx}`} className="flex-shrink-0 w-64 px-4 logo-item">
            <img
              src={logo.src}
              alt={`${logo.name} logo`}
              className="h-24 w-full object-contain transition-all duration-500 hover:grayscale-0"
              style={{ filter: 'grayscale(1)' }}
            />
          </div>
        ))}
        {/* Duplicate set for infinite scroll */}
        {logos.map((logo, idx) => (
          <div key={`logo-2-${idx}`} className="flex-shrink-0 w-64 px-4 logo-item">
            <img
              src={logo.src}
              alt={`${logo.name} logo`}
              className="h-24 w-full object-contain transition-all duration-500 hover:grayscale-0"
              style={{ filter: 'grayscale(1)' }}
            />
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
        <p className="text-slate-700 dark:text-slate-300 mt-2 transition-opacity duration-300">
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

  // Handle Escape key for modal
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selected) {
        setSelected(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selected]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      {/* NAV */}
      <header className="max-w-7xl mx-auto p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Light mode logo */}
          <img
            src={`${import.meta.env.BASE_URL}aatral-logo.png`}
            alt="Aatral logo"
            className="w-40 h-16 object-contain dark:hidden"
            loading="lazy"
          />
          {/* Dark mode logo */}
          <img
            src={`${import.meta.env.BASE_URL}aatral-dark.png`}
            alt="Aatral logo"
            className="w-40 h-16 object-contain hidden dark:block"
            loading="lazy"
          />
          <div>
            <div className="font-bold text-xl text-slate-900 dark:text-white">Aatral</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Safetizen™ XR Safety Training</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700 dark:text-slate-300">
          <a href="#modules" className="hover:underline">Modules</a>
          <a href="#summary" className="hover:underline">Summary</a>
          <a href="https://aatral.io/" target="_blank" rel="noreferrer" className="hover:underline" aria-label="About Aatral (opens in new tab)">About Aatral</a>
          <a href="https://aatral.io/contact-us" target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition" aria-label="Request Demo (opens in new tab)">Request Demo</a>
        </nav>
        <button
          className="md:hidden inline-flex flex-col justify-center items-center w-11 h-11 border border-slate-200 dark:border-slate-700 rounded-lg"
          onClick={() => setMobileNavOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={mobileNavOpen}
        >
          <span className="w-5 h-0.5 bg-slate-800 dark:bg-slate-100 mb-1 transition-colors" />
          <span className="w-5 h-0.5 bg-slate-800 dark:bg-slate-100 mb-1 transition-colors" />
          <span className="w-5 h-0.5 bg-slate-800 dark:bg-slate-100 transition-colors" />
        </button>
      </header>
      <div className={`md:hidden px-6 transition-all duration-300 ease-in-out overflow-hidden ${mobileNavOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm p-4 flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-300">
          <a href="#modules" onClick={() => setMobileNavOpen(false)} className="py-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Modules</a>
          <a href="#summary" onClick={() => setMobileNavOpen(false)} className="py-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Summary</a>
          <a href="https://aatral.io/" target="_blank" rel="noreferrer" className="py-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition" aria-label="About Aatral (opens in new tab)">About Aatral</a>
          <a href="https://aatral.io/contact-us" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition" aria-label="Request Demo (opens in new tab)">
            Request Demo
          </a>
        </div>
      </div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by 40+ organizations
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Aatral Safetizen™
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                VR Safety Training Platform
              </span>
            </h1>

            {/* Product Tagline */}
            <p className="mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Part of Aatral's Enterprise XR Training Platform Suite
            </p>

            {/* Value Proposition */}
            <p className="mt-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Deploy <strong className="text-slate-900 dark:text-white">21+ ready-to-use VR safety modules</strong> in days, not months.
              Reduce workplace incidents by up to 70% with immersive, measurable training.
            </p>

            {/* Key Benefits */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Deploy in 48 Hours</span>
                  <span className="text-slate-700 dark:text-slate-300"> — No custom development needed</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Measurable Results</span>
                  <span className="text-slate-700 dark:text-slate-300"> — Track competency with built-in assessments</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Multilingual Support</span>
                  <span className="text-slate-700 dark:text-slate-300"> — Train global teams effectively</span>
                </div>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://aatral.io/contact-us"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                aria-label="Book a Free VR Demo (opens in new tab)"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Book Free VR Demo
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
                  Free
                </span>
              </a>
              <a
                href="#modules"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-lg font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Browse 21+ Modules
              </a>
            </div>

            {/* Social Proof / Urgency */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-700 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white dark:border-slate-900"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white dark:border-slate-900"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white dark:border-slate-900"></div>
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">2500+</strong> safety professionals trained this month
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium text-slate-700 dark:text-slate-300">4.9/5 from enterprise clients</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">35,000+</strong> immersive training sessions conducted across industries in just one year in India
                </span>
              </div>
            </div>
          </div>

          {/* Video/Visual */}
          <div className="order-first md:order-last">
            <div className="relative w-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 shadow-2xl">
              {/* Featured Badge */}
              <div className="absolute -top-3 -right-3 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-lg shadow-lg transform rotate-3">
                ⭐ Award Winning
              </div>

              <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-inner">
                <iframe
                  src="https://www.youtube.com/embed/rPZsNqnFfCU"
                  title="Safetizen VR Training Demo"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                  🎥 Watch: How enterprises reduce workplace incidents by 70%
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-4 text-center shadow-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
                >
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DAXR BRIEF INTRO - Option 3 Part 1 - Enhanced */}
      <section className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-800 py-12 md:py-16 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-400 to-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 md:p-10 shadow-xl border border-white/20 dark:border-slate-700/50">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Left: Platform Hierarchy - Enhanced */}
              <div className="flex items-center gap-4 md:gap-6">
                {/* Aatral */}
                <div className="text-center group">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-400 dark:to-slate-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Aatral</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Platform Company</div>
                </div>

                {/* Arrow */}
                <svg className="w-6 h-6 md:w-8 md:h-8 text-teal-600 dark:text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>

                {/* DAXR - Emphasized */}
                <div className="text-center group">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 dark:from-teal-500 dark:to-cyan-500 flex items-center justify-center shadow-xl ring-4 ring-teal-200 dark:ring-teal-900 group-hover:scale-110 group-hover:ring-teal-300 dark:group-hover:ring-teal-800 transition-all duration-300">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="text-sm font-bold text-teal-900 dark:text-teal-100">DAXR</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Control Plane</div>
                </div>

                {/* Arrow */}
                <svg className="w-6 h-6 md:w-8 md:h-8 text-teal-600 dark:text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>

                {/* Safetizen */}
                <div className="text-center group">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Safetizen</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Training Experience</div>
                </div>
              </div>

              {/* Right: Content - Enhanced */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-900 dark:text-teal-100 text-xs font-semibold rounded-full">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Enterprise Platform
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Powered by <span className="bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">DAXR</span>
                </h3>
                <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Comprehensive dashboard for analytics, user management, training management, certificate generation, and ISO compliance reports across your enterprise.
                </p>
                <a
                  href="#daxr-features"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Explore Platform Features
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section id="summary" className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800 shadow">
          <h2 className="text-2xl font-semibold">About Aatral Safetizen™</h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300">Aatral Safetizen™ is an enterprise XR safety training platform providing 21+ modules across General Safety, Killer Risk Safety and a flagship EOT Crane Simulator. Part of Aatral's comprehensive enterprise XR training suite, Safetizen™ modules are short (5–20 mins), available in multiple languages, and built with Guided, Quiz and Assessment learning modes for measurable competence.</p>

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
            <div className="relative w-full sm:w-48">
              <label htmlFor="module-search" className="sr-only">
                Search safety training modules
              </label>
              <input
                id="module-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search modules..."
                className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 w-full"
                aria-label="Search safety training modules by name"
              />
            </div>

            <div className="w-full sm:w-auto">
              <label htmlFor="language-filter" className="sr-only">
                Filter by language
              </label>
              <select
                id="language-filter"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 w-full"
                aria-label="Filter modules by language"
              >
                {languages.map((l) => (
                  <option key={l} value={l}>{l === "All" ? "All languages" : l}</option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-auto">
              <label htmlFor="runtime-filter" className="sr-only">
                Filter by runtime duration
              </label>
              <select
                id="runtime-filter"
                value={runtimeFilter}
                onChange={(e) => setRuntimeFilter(e.target.value)}
                className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 w-full"
                aria-label="Filter modules by runtime duration"
              >
                <option value="All">All runtimes</option>
                <option value="<=10">≤ 10 mins</option>
                <option value=">10">{"> 10 mins"}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4">
          {/* Mobile: Dropdown for categories */}
          <div className="block sm:hidden">
            <label htmlFor="category-filter-mobile" className="sr-only">
              Filter by category
            </label>
            <select
              id="category-filter-mobile"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100"
              aria-label="Filter modules by category"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Desktop/Tablet: Buttons for categories */}
          <div className="hidden sm:flex flex-wrap gap-3 items-center">
            {CATEGORIES.map((c) => {
              const isActive = activeCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3 py-2 rounded border text-sm transition ${isActive
                    ? "bg-indigo-600 text-white border-indigo-500"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700"
                    }`}
                  aria-pressed={isActive}
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
            <p className="text-sm text-slate-700 dark:text-slate-300 max-w-3xl">
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
        <h2 className="text-2xl font-semibold">Why Enterprises Choose Aatral Safetizen™</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-slate-800/70 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Real-world Risk Replication</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">High fidelity scenarios mapped to Life Saving Rules and industry risk.</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800/70 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Assessment & Benchmarking</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">Guided, quiz and assessment modes provide measurable competency scores.</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800/70 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Hardware Integration</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">Seamless hardware integrations for advanced simulators and peripherals.</p>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold">Roadmap (Upcoming)</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-slate-800/70 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Shop Floor Safety</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">February 2025</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800/70 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Chemical Safety</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">April 2025</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800/70 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">Material Handling</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">April 2025</p>
          </div>
        </div>
      </section>

      {/* DAXR DETAILED FEATURES - Option 3 Part 2 */}
      <section id="daxr-features" className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 py-16 md:py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400 to-teal-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-teal-200 dark:border-teal-700 mb-4">
              <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <span className="text-sm font-semibold text-teal-900 dark:text-teal-100">Enterprise Platform Capabilities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">DAXR Platform</span> Features
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive dashboard, analytics, and user management for enterprise XR training deployments
            </p>
          </div>

          {/* Video Preview */}
          <div className="mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 dark:border-slate-700/50">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/k8T8WQNffac"
                    title="DAXR Platform Preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
                Watch how DAXR streamlines enterprise XR training management
              </p>
            </div>
          </div>

          {/* Feature Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Feature 1: User & Device Management */}
            <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Centralized User & Device Management</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Manage learners, roles, access, and XR devices across sites and teams from a single admin console.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2: Training Deployment */}
            <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Training Management & Scheduling</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Schedule, view, and track training programs with real-time status updates. Assign VR modules and assessments across departments with minimal setup.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3: Analytics */}
            <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Analytics & Performance Insights</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Track completion rates, assessment scores, competency gaps, and training effectiveness with actionable analytics.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4: Governance */}
            <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Enterprise-Ready Governance</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Role-based access, audit logs, multilingual support, and scalable architecture built for large organizations.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 5: Certificate Generation */}
            <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Certificate Generation</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Automatically generate and distribute training completion certificates with customizable templates and digital signatures.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 6: ISO Compliance Reports */}
            <div className="group bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">ISO Compliance Reports</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Generate comprehensive compliance reports aligned with ISO standards for safety training documentation and audits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://aatral.io/contact-us"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              aria-label="Request DAXR Platform Demo (opens in new tab)"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Request DAXR Platform Demo
            </a>
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
          <h2 className="text-2xl font-semibold">Transform Your Workplace Safety Training with Aatral</h2>
          <p className="mt-2">Deploy Safetizen™ VR training across your team and begin measurable assessments in days.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a href="https://aatral.io/contact-us" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-3 bg-white text-indigo-600 rounded font-semibold text-center hover:bg-slate-50 transition" aria-label="Book a Live VR Demo (opens in new tab)">Book a Live VR Demo</a>
            <a href="#modules" className="w-full sm:w-auto px-6 py-3 border border-white/30 rounded text-white hover:bg-white/10 text-center transition">Explore Modules</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <a href="https://aatral.io/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 hover:opacity-80 transition" aria-label="Visit Aatral website (opens in new tab)">
              {/* Light mode logo */}
              <img
                src={`${import.meta.env.BASE_URL}aatral-logo.png`}
                alt="Aatral logo"
                className="w-32 h-12 object-contain dark:hidden"
                loading="lazy"
              />
              {/* Dark mode logo */}
              <img
                src={`${import.meta.env.BASE_URL}aatral-dark.png`}
                alt="Aatral logo"
                className="w-32 h-12 object-contain hidden dark:block"
                loading="lazy"
              />
              <div>
                <div className="font-bold text-lg text-slate-900 dark:text-white">Aatral</div>
                <div className="text-sm text-slate-700 dark:text-slate-400 mt-1">Safetizen™ XR Safety Training Platform</div>
              </div>
            </a>
            <div className="text-sm text-slate-700 dark:text-slate-400 mt-3">Enterprise XR training solutions for immersive learning experiences.</div>
          </div>

          <div>
            <div className="font-semibold">Contact</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Head Office</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Padma Vilas, Door No. 3/233, Survey No. 34/1b</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Manapakkam Main Road, Manapakkam</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Chennai - 600125, Tamilnadu, India.</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-3">Landline: 044-43589770</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Mob: (+91)9600067005 / 7338945666 / 9830714314</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">US number: +1(669) 249-5831</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">Mail: <a href="mailto:sales@aatral.io" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">sales@aatral.io</a></div>
          </div>

          <div>
            <div className="font-semibold">Quick Links</div>
            <ul className="mt-2 text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>
                <a href="#modules" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Modules</a>
              </li>
              <li>
                <a
                  href="https://aatral.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                  aria-label="About Aatral (opens in new tab)"
                >
                  About
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Roadmap</a>
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
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 id="modal-title" className="text-xl font-semibold flex-1">{selected.name}</h3>
              <button
                onClick={() => setSelected(null)}
                className="ml-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                aria-label="Close dialog"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mb-3 text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Category:</span> {selected.category}
            </p>
            <div className="mb-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Description</div>
              <p>{selected.description}</p>
            </div>
            <div className="mb-4 text-sm text-slate-700 dark:text-slate-300">
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">Learning Objective</div>
              <p>{selected.learningObjective}</p>
            </div>
            <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Runtime:</span> {selected.runtime}
            </p>
            <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Languages:</span> {selected.languages.join(', ')}
            </p>
            <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Industries:</span> {selected.industries.join(', ')}
            </p>
            <p className="mb-4 text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Devices:</span> {selected.devices.join(', ')}
            </p>
            <div className="flex gap-2 mt-4">
              {selected.video ? (
                <a href={selected.video} target="_blank" rel="noreferrer" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition" aria-label="Watch video (opens in new tab)">Watch Video</a>
              ) : null}
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 dark:border-slate-600 dark:text-white dark:bg-slate-700 dark:hover:bg-slate-600 transition"
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