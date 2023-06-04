import { Types } from "mongoose";
import { type PlantStateStructure } from "../server/types";

export const plantsMocks: PlantStateStructure[] = [
  {
    _id: new Types.ObjectId(),
    name: "Aleo Vera",
    image: "https://example.png",
    type: "Helianthus annuus",
    size: "medium",
    hasFlowers: false,
    environment: "outdoor",
    user: new Types.ObjectId("647083660ca1f98975830b0b"),
    description:
      "Thrives in indirect light, well-draining soil, moderate watering.",
  },
  {
    _id: new Types.ObjectId(),
    name: "Tulip",
    image: "https://tulip_flower.jpg",
    type: "Liliaceae",
    size: "medium",
    hasFlowers: false,
    environment: "outdoor",
    user: new Types.ObjectId("647083660ca1f98975830b0b"),
    description:
      "Thrives in indirect light, well-draining soil, and moderate watering.",
  },
];
